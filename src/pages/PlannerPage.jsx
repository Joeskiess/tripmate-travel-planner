import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Workflow,
  Kanban,
  Search, 
  Plus, 
  MapPin, 
  Calendar, 
  Users, 
  Sparkles, 
  Layers, 
  Share2, 
  Smartphone, 
  Undo, 
  Redo, 
  ChevronUp,
  ChevronDown, 
  ChevronRight, 
  ChevronLeft, 
  MoreHorizontal, 
  Edit3, 
  Download, 
  X, 
  ExternalLink, 
  Check, 
  DollarSign, 
  Compass, 
  Plane, 
  Bed, 
  Car, 
  Train, 
  Paperclip, 
  HelpCircle, 
  Eye, 
  Send,
  Zap,
  Info,
  Trash2,
  PieChart,
  MessageSquare,
  ListFilter,
  CheckSquare,
  SlidersHorizontal,
  Settings,
  UserPlus,
  Scale,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Printer,
  Database,
  Utensils,
  Hotel,
  Navigation,
  RefreshCw,
  GripVertical
} from 'lucide-react';

import { initialTripData } from '../data/tripData';
import { resolveDestinationData, DESTINATIONS_REGISTRY } from '../data/destinationsData';
import { fetchLivePlacesForDestination } from '../services/placesApiService';
import { movePlaceInSequence } from '../services/quantumRouteOptimizer';
import TripMap from '../components/TripMap';
import PlaceCard from '../components/PlaceCard';
import PlaceDetailSheet from '../components/PlaceDetailSheet';
import AiAssistantModal from '../components/AiAssistantModal';
import AddExpenseModal from '../components/AddExpenseModal';
import OnboardingTourModal from '../components/OnboardingTourModal';
import ExportPdfModal from '../components/ExportPdfModal';
import RouteOptimizerModal from '../components/RouteOptimizerModal';
import PackingChecklist from '../components/PackingChecklist';
import BudgetTracker from '../components/BudgetTracker';
import JourneyNodeGraph from '../components/JourneyNodeGraph';
import CoverPhotoModal from '../components/CoverPhotoModal';
import TravelGuideModal from '../components/TravelGuideModal';
import ReservationModal from '../components/ReservationModal';
import PlaceNoteModal from '../components/PlaceNoteModal';
import GroupSplitModal from '../components/GroupSplitModal';
import UserProfileModal from '../components/UserProfileModal';

import tripmateLogo from '../assets/tripmate-logo.png';
import facelessAvatar from '../assets/faceless-avatar.png';
import { 
  checkBackendStatus, 
  createBackendTrip, 
  addBackendActivity, 
  deleteBackendActivity, 
  deleteBackendTrip, 
  fetchBackendWeather 
} from '../services/backendApi';

export default function PlannerPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Dynamic destination handling across Singapore, Mexico, Mumbai, Paris, Tokyo, etc.
  const [currentDestination, setCurrentDestination] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('destination') || location.state?.destination || 'Switzerland';
  });

  const [trip, setTrip] = useState(() => {
    const params = new URLSearchParams(location.search);
    const dest = params.get('destination') || location.state?.destination || 'Switzerland';
    const s = params.get('startDate') || location.state?.rawStartDate || location.state?.startDate;
    const e = params.get('endDate') || location.state?.rawEndDate || location.state?.endDate;
    return resolveDestinationData(dest, s, e);
  });

  const [tripStartDate, setTripStartDate] = useState(() => location.state?.startDate || trip.startDate || '10/1');
  const [tripEndDate, setTripEndDate] = useState(() => location.state?.endDate || trip.endDate || '10/10');
  const [tempStartDate, setTempStartDate] = useState(tripStartDate);
  const [tempEndDate, setTempEndDate] = useState(tripEndDate);
  const [isEditingDatesModalOpen, setIsEditingDatesModalOpen] = useState(false);

  const [tripTitle, setTripTitle] = useState(() => trip.fullTitle || `Trip to ${trip.name}`);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Backend & PostgreSQL Database state
  const [backendStatus, setBackendStatus] = useState({ online: false, tripId: null });
  const [weatherInfo, setWeatherInfo] = useState(null);

  // Navigation View: 'overview' (itinerary & places), 'board' (Kanban), 'graph' (Journey Node Graph), 'budget', 'packing'
  const [activeView, setActiveView] = useState('overview');

  // Active filter for map: 'places-to-visit' | 'day-1' | 'day-2' | 'all'
  const [activeDayId, setActiveDayId] = useState('places-to-visit');

  // Explore Category: 'all' | 'restaurants' | 'hotels' | 'attractions'
  const [exploreCategory, setExploreCategory] = useState('all');

  // Quantum Route Optimizer Modal State
  const [optimizerModalState, setOptimizerModalState] = useState({
    isOpen: false,
    dayId: null,
    dayTitle: '',
    places: []
  });

  // Selected place for bottom sheet detail drawer
  const [selectedPlaceId, setSelectedPlaceId] = useState(() => {
    return trip.sections?.[0]?.places?.[0]?.id || trip.placesToVisit?.[0]?.id || null;
  });
  const [showPlaceDetailSheet, setShowPlaceDetailSheet] = useState(false);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Modals & Assistant
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiPresetPrompt, setAiPresetPrompt] = useState(null);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isGetAppModalOpen, setIsGetAppModalOpen] = useState(false);
  const [isTripMenuOpen, setIsTripMenuOpen] = useState(false);
  const [isExportPdfOpen, setIsExportPdfOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Live Places & Media API State
  const [isFetchingLivePlaces, setIsFetchingLivePlaces] = useState(false);
  const [isLiveApiActive, setIsLiveApiActive] = useState(() => !!trip.isLiveEnriched);

  // 5-Step Interactive Onboarding Guide
  const [tourStep, setTourStep] = useState(null);
  const [chromeBannerVisible, setChromeBannerVisible] = useState(true);

  // Custom Place & Notes inputs
  const [newPlaceInput, setNewPlaceInput] = useState('');
  const [newSublistPlaceInput, setNewSublistPlaceInput] = useState('');
  const [notesText, setNotesText] = useState('');
  const [customListTitle, setCustomListTitle] = useState('Add a title (e.g., "Restaurants")');
  const [isEditingCustomListTitle, setIsEditingCustomListTitle] = useState(false);

  // Currency selection: 'INR' (₹), 'EUR' (€), 'USD' ($)
  const [currencySymbol, setCurrencySymbol] = useState('₹');

  // Currency exchange rates relative to EUR base cost
  const currencyRate = useMemo(() => {
    if (currencySymbol === '₹') return 92;
    if (currencySymbol === '$') return 1.08;
    return 1;
  }, [currencySymbol]);

  // Set default budget limit based on currency
  const [budgetLimit, setBudgetLimit] = useState(12000);
  const [isEditingBudgetLimit, setIsEditingBudgetLimit] = useState(false);
  const [tempBudgetInput, setTempBudgetInput] = useState('12000');

  // Set of place IDs that user excluded from budget calculation (all included by default)
  const [excludedPlaceIds, setExcludedPlaceIds] = useState(new Set());

  // Tripmates count for splitting expenses
  const [tripmatesCount, setTripmatesCount] = useState(2);

  // Category breakdown toggle
  const [showBudgetBreakdown, setShowBudgetBreakdown] = useState(false);

  // Additional logged expenses
  const [expenses, setExpenses] = useState([]);

  // Kanban Drag and Drop States
  const [kanbanDrag, setKanbanDrag] = useState(null); // { dayId, index, place }
  const [kanbanOver, setKanbanOver] = useState(null); // { dayId, index }

  // Kanban Mouse Grab-to-Pan (Hold mouse to pan board horizontally)
  const kanbanContainerRef = useRef(null);
  const [isPanningKanban, setIsPanningKanban] = useState(false);
  const isPanningKanbanRef = useRef(false);
  const kanbanPanStartXRef = useRef(0);
  const kanbanScrollLeftRef = useRef(0);

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!isPanningKanbanRef.current || !kanbanContainerRef.current) return;
      const walk = (e.pageX - kanbanPanStartXRef.current) * 1.4;
      kanbanContainerRef.current.scrollLeft = kanbanScrollLeftRef.current - walk;
    };

    const handleGlobalMouseUp = () => {
      if (isPanningKanbanRef.current) {
        isPanningKanbanRef.current = false;
        setIsPanningKanban(false);
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  const handleKanbanMouseDown = (e) => {
    // If clicked on an interactive or draggable card element, don't start board panning
    if (
      e.target.closest('[draggable="true"]') ||
      e.target.closest('button') ||
      e.target.closest('input') ||
      e.target.closest('a') ||
      e.target.closest('textarea') ||
      e.target.closest('.no-pan')
    ) {
      return;
    }

    if (e.button !== 0) return; // Only primary mouse button

    isPanningKanbanRef.current = true;
    setIsPanningKanban(true);
    kanbanPanStartXRef.current = e.pageX;
    if (kanbanContainerRef.current) {
      kanbanScrollLeftRef.current = kanbanContainerRef.current.scrollLeft;
    }
  };

  const handleKanbanWheel = (e) => {
    if (!kanbanContainerRef.current) return;
    // If mouse wheel is scrolled vertically on board canvas/gutters (not inside a card list with its own scroll), scroll horizontally
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && !e.target.closest('.overflow-y-auto')) {
      kanbanContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  // --- UNDO / REDO ENGINE ---
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const recordHistory = (description) => {
    setUndoStack(prev => [{
      trip: JSON.parse(JSON.stringify(trip)),
      tripStartDate,
      tripEndDate,
      tripTitle,
      description
    }, ...prev.slice(0, 25)]);
    setRedoStack([]);
  };

  const handleUndo = () => {
    if (undoStack.length === 0) {
      showToast("Nothing to undo");
      return;
    }
    const [lastState, ...remainingUndo] = undoStack;
    setRedoStack(prev => [{
      trip: JSON.parse(JSON.stringify(trip)),
      tripStartDate,
      tripEndDate,
      tripTitle
    }, ...prev]);
    setTrip(lastState.trip);
    setTripStartDate(lastState.tripStartDate);
    setTripEndDate(lastState.tripEndDate);
    setTripTitle(lastState.tripTitle);
    setUndoStack(remainingUndo);
    showToast(`↺ Undid: ${lastState.description || 'action'}`);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) {
      showToast("Nothing to redo");
      return;
    }
    const [nextState, ...remainingRedo] = redoStack;
    setUndoStack(prev => [{
      trip: JSON.parse(JSON.stringify(trip)),
      tripStartDate,
      tripEndDate,
      tripTitle
    }, ...prev]);
    setTrip(nextState.trip);
    setTripStartDate(nextState.tripStartDate);
    setTripEndDate(nextState.tripEndDate);
    setTripTitle(nextState.tripTitle);
    setRedoStack(remainingRedo);
    showToast("↻ Redid action");
  };

  // --- MODAL & MENU STATES ---
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [distanceUnit, setDistanceUnit] = useState('km');
  const [isCoverPhotoModalOpen, setIsCoverPhotoModalOpen] = useState(false);
  const [activeGuideModal, setActiveGuideModal] = useState(null);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [reservationModalType, setReservationModalType] = useState('Flight');
  const [reservations, setReservations] = useState(() => [
    {
      id: 'res-default-1',
      type: 'Flight',
      title: `Direct Flight to ${trip.city || trip.name || 'Destination'}`,
      confirmationCode: 'TM-782914',
      dateTime: '10:30 AM Departure',
      cost: 180,
      notes: 'Terminal 2, includes 1 cabin bag + 1 personal item'
    }
  ]);
  const [activePlaceNoteModal, setActivePlaceNoteModal] = useState(null);
  const [isGroupSplitModalOpen, setIsGroupSplitModalOpen] = useState(false);
  const [customLists, setCustomLists] = useState([
    { id: 'list-1', title: 'Must-Try Restaurants & Local Dining', places: [] }
  ]);
  const [isCustomListMenuOpen, setIsCustomListMenuOpen] = useState(false);

  // Quick Action Handlers
  const handleOpenReservationModal = (type) => {
    setReservationModalType(type);
    setIsReservationModalOpen(true);
  };

  const handleSaveReservation = (res) => {
    recordHistory(`Add ${res.type} booking`);
    setReservations(prev => [res, ...prev]);
    if (res.cost > 0) {
      setExpenses(prev => [{
        id: `exp-res-${Date.now()}`,
        category: res.type === 'Lodging' ? 'Lodging' : 'Transport',
        description: `${res.type}: ${res.title}`,
        amount: res.cost,
        currency: currencySymbol,
        date: res.dateTime || 'Reservation'
      }, ...prev]);
    }
    showToast(`Saved ${res.type} booking (${res.confirmationCode})`);
  };

  const handleDeleteReservation = (id) => {
    recordHistory('Remove booking');
    setReservations(prev => prev.filter(r => r.id !== id));
    showToast("Booking removed");
  };

  const handleSavePlaceNote = (placeId, updates) => {
    recordHistory('Update place notes');
    setTrip(prev => ({
      ...prev,
      placesToVisit: (prev.placesToVisit || []).map(p => p.id === placeId ? { ...p, ...updates } : p),
      sections: (prev.sections || []).map(s => ({
        ...s,
        places: (s.places || []).map(p => p.id === placeId ? { ...p, ...updates } : p)
      }))
    }));
    showToast("Saved place notes & checklist!");
  };

  const handleAddCustomList = () => {
    const title = prompt("Enter a title for your new list (e.g., 'Rooftop Cafes & Bars', 'Shopping'):");
    if (title && title.trim()) {
      recordHistory('Add custom list');
      setCustomLists(prev => [...prev, { id: `custom-list-${Date.now()}`, title: title.trim(), places: [] }]);
      showToast(`Created list: ${title.trim()}!`);
    }
  };

  const handleDuplicateTrip = () => {
    const clone = JSON.parse(JSON.stringify(trip));
    const newTitle = `${tripTitle} (Copy)`;
    const newId = `trip-clone-${Date.now()}`;
    const stored = JSON.parse(localStorage.getItem('tripmate_saved_trips') || '[]');
    localStorage.setItem('tripmate_saved_trips', JSON.stringify([
      { id: newId, title: newTitle, destination: currentDestination, dates: `${tripStartDate} - ${tripEndDate}`, updatedAt: new Date().toISOString() },
      ...stored
    ]));
    showToast(`Duplicated trip as "${newTitle}"!`);
  };

  const handleSwitchDestination = (newDestQuery) => {
    recordHistory(`Switch destination to ${newDestQuery}`);
    setCurrentDestination(newDestQuery);
    const freshTrip = resolveDestinationData(newDestQuery, tripStartDate, tripEndDate);
    setTrip(freshTrip);
    setTripTitle(freshTrip.fullTitle || `Trip to ${freshTrip.name}`);
    showToast(`Switched destination to ${freshTrip.name}!`);
  };

  const handleResetToDefaults = () => {
    recordHistory('Reset itinerary');
    const fresh = resolveDestinationData(currentDestination, tripStartDate, tripEndDate);
    setTrip(fresh);
    showToast(`Reset itinerary stops to curated defaults for ${fresh.name}!`);
  };

  const handleClearAllStops = () => {
    if (confirm("Are you sure you want to clear all stops from the itinerary? (You can Undo this)")) {
      recordHistory('Clear all stops');
      setTrip(prev => ({
        ...prev,
        placesToVisit: [],
        sections: (prev.sections || []).map(s => ({ ...s, places: [] }))
      }));
      showToast("Cleared all stops from itinerary. Click Undo to restore.");
    }
  };

  // Query live Wikipedia/Wikimedia & OpenStreetMap APIs for authentic places & photos
  const handleRefreshLivePlaces = async () => {
    if (!currentDestination) return;
    try {
      setIsFetchingLivePlaces(true);
      const liveData = await fetchLivePlacesForDestination(currentDestination, tripStartDate, tripEndDate);
      if (liveData && liveData.allCuratedPlaces && liveData.allCuratedPlaces.length > 0) {
        setTrip(prevTrip => ({
          ...prevTrip,
          ...liveData,
          id: prevTrip.id,
          fullTitle: prevTrip.fullTitle || `Trip to ${liveData.name}`,
          center: liveData.center || prevTrip.center,
          coverImage: liveData.coverImage || prevTrip.coverImage,
          sections: liveData.sections,
          placesToVisit: liveData.placesToVisit,
          allCuratedPlaces: liveData.allCuratedPlaces,
          nearbyRestaurants: liveData.nearbyRestaurants?.length > 0 ? liveData.nearbyRestaurants : prevTrip.nearbyRestaurants,
          nearbyHotels: liveData.nearbyHotels?.length > 0 ? liveData.nearbyHotels : prevTrip.nearbyHotels,
          recommendedPlaces: liveData.recommendedPlaces,
          sublistRecommendations: liveData.sublistRecommendations,
          isLiveEnriched: true
        }));
        setIsLiveApiActive(true);
        showToast(`✓ Live Places API: Retrieved authentic places & images for ${liveData.name}`);
      }
    } catch (err) {
      console.warn('[LiveAPI] Fetch notice:', err);
    } finally {
      setIsFetchingLivePlaces(false);
    }
  };

  // Automatically fetch live places & images if destination is custom or not yet live-enriched
  useEffect(() => {
    let active = true;
    const destKey = (currentDestination || '').toLowerCase();
    const isTopPrebuilt = ['switzerland', 'bali', 'goa', 'rome', 'london', 'newyork', 'barcelona', 'dubai', 'paris', 'tokyo', 'mumbai', 'mexico', 'singapore']
      .some(k => destKey.includes(k));

    if (!isTopPrebuilt) {
      handleRefreshLivePlaces();
    }
    return () => { active = false; };
  }, [currentDestination]);

  const passedStartDate = tripStartDate;
  const passedEndDate = tripEndDate;
  const passedDestination = trip?.passedDestination || currentDestination || trip?.name || 'Mexico City, Mexico';

  // Reorder places in Graph and Itinerary
  const handleReorderPlaces = (sourceDayId, sourceIndex, targetDayId, targetIndex) => {
    setTrip(prev => {
      let targetPlace = null;
      let newPlacesToVisit = [...(prev.placesToVisit || [])];
      let newSections = prev.sections.map(s => ({
        ...s,
        places: [...(s.places || [])]
      }));

      // 1. Remove from source
      if (sourceDayId === 'places-to-visit') {
        targetPlace = newPlacesToVisit[sourceIndex];
        newPlacesToVisit.splice(sourceIndex, 1);
      } else {
        const srcSec = newSections.find(s => s.id === sourceDayId);
        if (srcSec && srcSec.places) {
          targetPlace = srcSec.places[sourceIndex];
          srcSec.places.splice(sourceIndex, 1);
        }
      }

      if (!targetPlace) return prev;

      // 2. Insert into target
      if (targetDayId === 'places-to-visit') {
        const insertIdx = (targetIndex !== undefined && targetIndex !== null) ? targetIndex : newPlacesToVisit.length;
        newPlacesToVisit.splice(insertIdx, 0, targetPlace);
      } else {
        const destSec = newSections.find(s => s.id === targetDayId);
        if (destSec) {
          const insertIdx = (targetIndex !== undefined && targetIndex !== null) ? targetIndex : destSec.places.length;
          destSec.places.splice(insertIdx, 0, targetPlace);
        }
      }

      // 3. Recalculate sequence numbers
      newPlacesToVisit = newPlacesToVisit.map((p, idx) => ({ ...p, number: idx + 1 }));
      newSections = newSections.map(s => ({
        ...s,
        places: (s.places || []).map((p, idx) => ({ ...p, number: idx + 1 }))
      }));

      return {
        ...prev,
        placesToVisit: newPlacesToVisit,
        sections: newSections
      };
    });

    const targetTitle = targetDayId === 'places-to-visit' ? 'Places to Visit' : `Day ${trip.sections.findIndex(s => s.id === targetDayId) + 1}`;
    showToast(`✓ Repositioned stop in ${targetTitle}`);
  };

  // Universal Synchronized Deletion across entire site
  const handleDeletePlace = (placeId) => {
    setTrip(prev => {
      // 1. Remove from placesToVisit & re-index numbers
      const newPlacesToVisit = (prev.placesToVisit || [])
        .filter(p => p.id !== placeId)
        .map((p, idx) => ({ ...p, number: idx + 1 }));

      // 2. Remove from all itinerary day sections & re-index numbers
      const newSections = (prev.sections || []).map(sec => ({
        ...sec,
        places: (sec.places || [])
          .filter(p => p.id !== placeId)
          .map((p, idx) => ({ ...p, number: idx + 1 }))
      }));

      // 3. Remove from custom sub-lists
      const newCustomLists = (prev.customLists || []).map(cl => ({
        ...cl,
        places: (cl.places || []).filter(p => p.id !== placeId)
      }));

      return {
        ...prev,
        placesToVisit: newPlacesToVisit,
        sections: newSections,
        customLists: newCustomLists
      };
    });

    if (selectedPlaceId === placeId) {
      setSelectedPlaceId(null);
      setShowPlaceDetailSheet(false);
    }

    showToast("✓ Removed stop from trip");
  };

  const handleSaveTripDates = () => {
    if (!tempStartDate) return;
    const s = new Date(tempStartDate);
    let e = new Date(tempEndDate);
    if (isNaN(e.getTime()) || e < s) {
      e = new Date(s);
      e.setDate(s.getDate() + 3);
    }
    const diff = Math.max(1, Math.min(14, Math.round((e - s) / (1000 * 60 * 60 * 24)) + 1));
    const sStr = isNaN(s.getTime()) ? tempStartDate : s.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const eStr = isNaN(e.getTime()) ? tempEndDate : e.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    setTripStartDate(sStr);
    setTripEndDate(eStr);

    // Preserve all current places and rebalance across newly generated days
    const colors = ['#2563EB', '#059669', '#7C3AED', '#D97706', '#DC2626', '#0891B2', '#4F46E5', '#0D9488'];
    const pool = [];
    (trip.sections || []).forEach(sec => {
      (sec.places || []).forEach(p => {
        if (!pool.some(x => x.name === p.name)) pool.push(p);
      });
    });
    (trip.placesToVisit || []).forEach(p => {
      if (!pool.some(x => x.name === p.name)) pool.push(p);
    });
    (trip.allCuratedPlaces || []).forEach(p => {
      if (!pool.some(x => x.name === p.name)) pool.push(p);
    });

    const newSections = [];
    let counter = 0;
    for (let d = 0; d < diff; d++) {
      const curDate = new Date(s);
      curDate.setDate(s.getDate() + d);
      const dayShort = curDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      const dayFull = curDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

      const stops = [];
      const stopsForDay = Math.max(1, Math.min(3, Math.ceil((pool.length || 6) / diff)));
      for (let k = 0; k < stopsForDay && counter < pool.length; k++) {
        stops.push({
          ...pool[counter],
          id: `d${d + 1}-s${k + 1}-${pool[counter].id || counter}`,
          number: k + 1
        });
        counter++;
      }

      newSections.push({
        id: `day-${d + 1}`,
        title: dayFull,
        shortTitle: `Day ${d + 1} (${dayShort})`,
        dateStr: dayShort,
        color: colors[d % colors.length],
        places: stops
      });
    }

    setTrip(prev => ({
      ...prev,
      sections: newSections,
      startDate: sStr,
      endDate: eStr
    }));
    setIsEditingDatesModalOpen(false);
    showToast(`Travel dates updated to ${sStr} - ${eStr} (${diff} days generated)`);
  };

  // Reorder stops in day itinerary
  
  // Move place between unassigned bucket and any specific day
  const handleMovePlaceToDay = (fromDayId, placeId, toDayId) => {
    if (fromDayId === toDayId) return;
    setTrip(prev => {
      let targetPlace = null;
      let newPlacesToVisit = [...(prev.placesToVisit || [])];
      let newSections = prev.sections.map(s => ({
        ...s,
        places: [...(s.places || [])]
      }));

      if (fromDayId === 'places-to-visit') {
        targetPlace = newPlacesToVisit.find(p => p.id === placeId);
        newPlacesToVisit = newPlacesToVisit.filter(p => p.id !== placeId);
      } else {
        const sourceSec = newSections.find(s => s.id === fromDayId);
        if (sourceSec) {
          targetPlace = sourceSec.places.find(p => p.id === placeId);
          sourceSec.places = sourceSec.places.filter(p => p.id !== placeId);
        }
      }

      if (!targetPlace) return prev;

      if (toDayId === 'places-to-visit') {
        newPlacesToVisit.push({ ...targetPlace, number: newPlacesToVisit.length + 1 });
      } else {
        const destSec = newSections.find(s => s.id === toDayId);
        if (destSec) {
          destSec.places.push({ ...targetPlace, number: destSec.places.length + 1 });
        }
      }

      return {
        ...prev,
        placesToVisit: newPlacesToVisit,
        sections: newSections
      };
    });
    showToast(`Moved place to ${toDayId === 'places-to-visit' ? 'Places to Visit' : toDayId}`);
  };

  const handleMovePlace = (dayId, placeIndex, direction) => {
    setTrip(prev => ({
      ...prev,
      sections: prev.sections.map(sec => {
        if (sec.id === dayId) {
          const reordered = movePlaceInSequence(sec.places, placeIndex, direction);
          return { ...sec, places: reordered };
        }
        return sec;
      })
    }));
    showToast(`Reordered stop in itinerary`);
  };

  // Open Quantum Route Optimizer Modal for a specific day
  const handleOpenOptimizer = (sec) => {
    if (!sec || !sec.places || sec.places.length === 0) {
      showToast("No stops in this day to optimize.");
      return;
    }
    setOptimizerModalState({
      isOpen: true,
      dayId: sec.id,
      dayTitle: sec.title || 'Day Itinerary',
      places: sec.places
    });
  };

  // Apply Quantum Optimized Sequence
  const handleApplyQuantumOptimization = (optimizedPlaces) => {
    setTrip(prev => ({
      ...prev,
      sections: prev.sections.map(s => {
        if (s.id === optimizerModalState.dayId) {
          return { ...s, places: optimizedPlaces };
        }
        return s;
      })
    }));
    showToast(`✓ Quantum-optimized route applied to map!`);
  };

  // Add a nearby place (restaurant, hotel, sight) directly to the trip plan
  const handleAddNearbyToPlan = (place, targetDayId = null) => {
    const newPlace = {
      ...place,
      id: `nearby-${Date.now()}`,
      visited: false,
      cost: place.cost || (place.price === '$$$$' ? 80 : place.price === '$$$' ? 40 : 15)
    };

    if (targetDayId && targetDayId !== 'places-to-visit') {
      setTrip(prev => ({
        ...prev,
        sections: prev.sections.map(s => {
          if (s.id === targetDayId) {
            const nextList = [...(s.places || []), { ...newPlace, number: (s.places?.length || 0) + 1 }];
            return { ...s, places: nextList };
          }
          return s;
        })
      }));
      showToast(`Added ${place.name} to ${targetDayId === 'day-1' ? 'Day 1' : 'Day 2'}!`);
    } else {
      handleAddPlaceToBucket(newPlace);
    }
  };

  // Curated Days definitions (Dynamic from trip.sections)
  const days = useMemo(() => {
    const list = [
      { 
        id: 'places-to-visit', 
        title: 'Places to visit', 
        shortTitle: `Places (${trip.placesToVisit?.length || 0})`, 
        placesCount: trip.placesToVisit?.length || 0 
      }
    ];
    (trip.sections || []).forEach((sec) => {
      list.push({
        id: sec.id,
        title: sec.title,
        shortTitle: sec.shortTitle || sec.title,
        placesCount: sec.places?.length || 0
      });
    });
    return list;
  }, [trip]);

  // All places combined pool
  const allPlacesPool = useMemo(() => {
    const list = [...(trip.placesToVisit || [])];
    trip.sections.forEach(sec => {
      list.push(...(sec.places || []));
    });
    return list;
  }, [trip]);

  // ==========================================================
  // REAL-TIME BUDGET & COST CALCULATIONS FOR SELECTED PLACES
  // ==========================================================

  // All planned places with individual converted costs
  const plannedPlacesWithCost = useMemo(() => {
    return allPlacesPool.map(place => {
      const baseEur = place.cost !== undefined ? place.cost : 15;
      const convertedCost = Math.round(baseEur * currencyRate);
      const isIncluded = !excludedPlaceIds.has(place.id);
      return {
        ...place,
        baseEur,
        convertedCost,
        isIncluded
      };
    });
  }, [allPlacesPool, currencyRate, excludedPlaceIds]);

  // Total cost for all included places
  const placesCost = useMemo(() => {
    return plannedPlacesWithCost
      .filter(p => p.isIncluded)
      .reduce((sum, p) => sum + p.convertedCost, 0);
  }, [plannedPlacesWithCost]);

  // Total cost for custom logged expenses
  const loggedExpensesCost = useMemo(() => {
    return expenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
  }, [expenses]);

  // Total trip estimated cost (Places + Expenses)
  const totalTripCost = useMemo(() => {
    return placesCost + loggedExpensesCost;
  }, [placesCost, loggedExpensesCost]);

  // Budget Variance and Health Status
  const remainingBudget = useMemo(() => {
    return budgetLimit - totalTripCost;
  }, [budgetLimit, totalTripCost]);

  const isOverBudget = remainingBudget < 0;
  const budgetUsagePercent = budgetLimit > 0 
    ? Math.round((totalTripCost / budgetLimit) * 100) 
    : 100;

  // Change currency symbol and adjust budget limit proportionally
  const handleCurrencyChange = (newSym) => {
    if (newSym === currencySymbol) return;
    let newLim = budgetLimit;
    if (currencySymbol === '₹') {
      if (newSym === '€') newLim = Math.round(budgetLimit / 92);
      if (newSym === '$') newLim = Math.round((budgetLimit / 92) * 1.08);
    } else if (currencySymbol === '€') {
      if (newSym === '₹') newLim = Math.round(budgetLimit * 92);
      if (newSym === '$') newLim = Math.round(budgetLimit * 1.08);
    } else if (currencySymbol === '$') {
      if (newSym === '₹') newLim = Math.round((budgetLimit / 1.08) * 92);
      if (newSym === '€') newLim = Math.round(budgetLimit / 1.08);
    }
    setCurrencySymbol(newSym);
    setBudgetLimit(newLim);
    setTempBudgetInput(newLim.toString());
  };

  // Toggle whether a place is included in budget calculation
  const handleTogglePlaceInBudget = (placeId) => {
    setExcludedPlaceIds(prev => {
      const next = new Set(prev);
      if (next.has(placeId)) {
        next.delete(placeId);
      } else {
        next.add(placeId);
      }
      return next;
    });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Places filtered for map display
  const displayedMapPlaces = useMemo(() => {
    if (activeDayId === 'places-to-visit') {
      return (trip.placesToVisit || []).map((p, idx) => ({
        ...p,
        number: idx + 1
      }));
    }

    if (activeDayId === 'all') {
      return allPlacesPool.map((p, idx) => ({
        ...p,
        number: idx + 1
      }));
    }

    const currentSection = trip.sections.find(s => s.id === activeDayId) || trip.sections[0];
    return (currentSection.places || []).map((p, idx) => ({
      ...p,
      number: idx + 1
    }));
  }, [trip, activeDayId, allPlacesPool]);

  // Selected place object for the PlaceDetailSheet
  const selectedPlace = useMemo(() => {
    return allPlacesPool.find(p => p.id === selectedPlaceId) || displayedMapPlaces[0] || trip.placesToVisit?.[0];
  }, [allPlacesPool, displayedMapPlaces, selectedPlaceId, trip]);

  // Filtered Nearby Places for the Explore Section (Google Maps verified)
  const displayedNearbyList = useMemo(() => {
    if (exploreCategory === 'restaurants') return trip.nearbyRestaurants || [];
    if (exploreCategory === 'hotels') return trip.nearbyHotels || [];
    if (exploreCategory === 'attractions') return (trip.nearbyAttractions && trip.nearbyAttractions.length > 0) ? trip.nearbyAttractions : (trip.allCuratedPlaces || trip.placesToVisit || []);
    // 'all': blend restaurants, hotels, and sights
    return [
      ...(trip.nearbyRestaurants || []).slice(0, 3),
      ...(trip.nearbyHotels || []).slice(0, 2),
      ...(trip.placesToVisit || []).slice(0, 1)
    ];
  }, [trip, exploreCategory]);

  // Recommended places dynamically resolved for the active destination
  const recommendedPlaces = useMemo(() => {
    if (trip?.recommendedPlaces && trip.recommendedPlaces.length > 0) {
      return trip.recommendedPlaces;
    }
    const pool = trip?.allCuratedPlaces || trip?.placesToVisit || [];
    if (pool.length > 0) return pool.slice(0, 5);
    return [];
  }, [trip]);

  // Recommended dining / sublist spots dynamically resolved for the active destination
  const sublistRecommendedPlaces = useMemo(() => {
    if (trip?.sublistRecommendations && trip.sublistRecommendations.length > 0) {
      return trip.sublistRecommendations;
    }
    if (trip?.nearbyRestaurants && trip.nearbyRestaurants.length > 0) {
      return trip.nearbyRestaurants.slice(0, 4);
    }
    return (trip?.placesToVisit || []).slice(0, 4);
  }, [trip]);

  // Add place to "Places to visit"
  const handleAddPlaceToBucket = (place) => {
    recordHistory(`Add ${place.name} to Places to visit`);
    const newPlace = {
      ...place,
      id: place.id || `custom-${Date.now()}`,
      number: (trip.placesToVisit?.length || 0) + 1
    };
    setTrip(prev => ({
      ...prev,
      placesToVisit: [
        ...(prev.placesToVisit || []),
        newPlace
      ]
    }));
    setSelectedPlaceId(newPlace.id);
    showToast(`Added ${place.name} to Places to visit!`);

    // Sync to PostgreSQL database if Spring Boot backend is online
    if (backendStatus.online && backendStatus.tripId) {
      addBackendActivity(backendStatus.tripId, {
        dayNumber: 1,
        time: '10:00 AM',
        title: place.name,
        location: place.address || place.location || passedDestination,
        cost: place.cost || place.numericCost || 0,
        category: place.category || 'Sightseeing'
      }).then(res => {
        const lastAct = res.activities?.[res.activities.length - 1];
        if (lastAct?.id) newPlace.backendId = lastAct.id;
      }).catch(err => console.warn("Place PostgreSQL sync failed:", err));
    }
  };

  // Add custom place from text input
  const handleAddCustomPlace = (e) => {
    e.preventDefault();
    if (!newPlaceInput.trim()) return;
    const newPlace = {
      id: `custom-${Date.now()}`,
      name: newPlaceInput.trim(),
      category: 'Sightseeing & Landmark',
      price: '€€',
      rating: 4.7,
      coords: [48.8566 + (Math.random() - 0.5) * 0.04, 2.3522 + (Math.random() - 0.5) * 0.04],
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80',
      subtitle: 'Added from custom search',
      cost: 15,
      expenseCategory: 'Attractions',
      visited: false
    };
    handleAddPlaceToBucket(newPlace);
    setNewPlaceInput('');
  };

  // Save new expense
  const handleSaveExpense = (newExp) => {
    setExpenses(prev => [newExp, ...prev]);
    showToast(`Logged ${currencySymbol}${newExp.amount.toFixed(2)} for ${newExp.description}`);

    // Sync to PostgreSQL database if Spring Boot backend is online
    if (backendStatus.online && backendStatus.tripId) {
      addBackendActivity(backendStatus.tripId, {
        dayNumber: 1,
        time: '12:00 PM',
        title: newExp.description,
        location: passedDestination,
        cost: newExp.amount,
        category: newExp.category || 'Expense'
      }).then(res => {
        const lastAct = res.activities?.[res.activities.length - 1];
        if (lastAct?.id) newExp.backendId = lastAct.id;
      }).catch(err => console.warn("Expense PostgreSQL sync failed:", err));
    }
  };

  // Delete expense
  const handleDeleteExpense = (id) => {
    const target = expenses.find(e => e.id === id);
    setExpenses(prev => prev.filter(e => e.id !== id));
    showToast("Expense removed");

    // Sync deletion to PostgreSQL database if Spring Boot backend is online
    if (backendStatus.online && backendStatus.tripId && target?.backendId) {
      deleteBackendActivity(backendStatus.tripId, target.backendId)
        .catch(err => console.warn("Expense PostgreSQL deletion failed:", err));
    }
  };

  // Save Trip to PostgreSQL database & navigate to PostgreSQL Hub
  const handleSaveTripToDatabase = async () => {
    try {
      showToast('Saving trip to PostgreSQL database...');

      // 1. Compile all places and activities from Places to Visit, Scheduled Days, and custom Expenses
      const compiledActivities = [];

      // Places to visit bucket
      (trip.placesToVisit || []).forEach((p, idx) => {
        compiledActivities.push({
          id: p.backendId || `act-pv-${p.id || idx}`,
          dayNumber: 1,
          time: `${9 + (idx % 6)}:00 AM`,
          title: p.name || 'Sightseeing',
          location: p.address || p.location || passedDestination,
          cost: Math.round((p.cost || p.numericCost || 20) * (currencySymbol === '₹' ? 92 : currencySymbol === '$' ? 1.08 : 1)),
          category: p.expenseCategory || p.category || 'Sightseeing'
        });
      });

      // Scheduled sections
      (trip.sections || []).forEach((sec, sIdx) => {
        (sec.places || []).forEach((p, idx) => {
          compiledActivities.push({
            id: p.backendId || `act-sec-${sec.id || sIdx}-${p.id || idx}`,
            dayNumber: sIdx + 1,
            time: `${10 + (idx % 8)}:00 AM`,
            title: p.name || 'Activity',
            location: p.address || p.location || passedDestination,
            cost: Math.round((p.cost || p.numericCost || 25) * (currencySymbol === '₹' ? 92 : currencySymbol === '$' ? 1.08 : 1)),
            category: p.expenseCategory || p.category || 'Sightseeing'
          });
        });
      });

      // Logged custom expenses
      (expenses || []).forEach((exp, idx) => {
        compiledActivities.push({
          id: exp.backendId || `act-exp-${exp.id || idx}`,
          dayNumber: 1,
          time: '12:30 PM',
          title: exp.description || 'Expense',
          location: passedDestination,
          cost: Math.round(exp.amount || 0),
          category: exp.category || 'Food & Dining'
        });
      });

      let savedTripId = backendStatus.tripId || Date.now();

      // Check if Spring Boot backend server is live on port 8080
      const isOnline = await checkBackendStatus();
      if (isOnline) {
        try {
          const backendTrip = await createBackendTrip({
            title: tripTitle,
            destination: passedDestination,
            startDate: passedStartDate,
            endDate: passedEndDate,
            status: 'Active'
          });
          savedTripId = backendTrip.id;

          // Sync activities to PostgreSQL
          for (const act of compiledActivities) {
            try {
              await addBackendActivity(backendTrip.id, act);
            } catch (actErr) {
              console.warn("Activity sync notice:", actErr);
            }
          }
        } catch (dbErr) {
          console.warn("Direct PostgreSQL sync notice:", dbErr);
        }
      }

      // Always persist to local database store for instantaneous access and offline reliability
      const tripRecord = {
        id: savedTripId,
        title: tripTitle,
        destination: passedDestination,
        startDate: passedStartDate,
        endDate: passedEndDate,
        status: 'Active',
        activities: compiledActivities
      };

      const existingStored = JSON.parse(localStorage.getItem('tripmate_saved_trips') || '[]');
      const filtered = existingStored.filter(t => t.id !== savedTripId && t.title !== tripTitle);
      localStorage.setItem('tripmate_saved_trips', JSON.stringify([tripRecord, ...filtered]));

      // Navigate to PostgreSQL Hub with saved trip state
      navigate('/dashboard', {
        state: {
          newlySaved: true,
          savedTripId: savedTripId,
          tripTitle: tripTitle
        }
      });
    } catch (err) {
      console.error("Save trip error:", err);
      showToast("Error saving trip: " + err.message);
    }
  };

  // Open AI Assistant with a specific question from PlaceDetailSheet
  const handleAskAiQuestion = (questionText) => {
    setAiPresetPrompt(questionText);
    setIsAiModalOpen(true);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-50/50 font-sans text-slate-900 overflow-hidden selection:bg-blue-600/20 selection:text-blue-600">
      
      {/* ========================================================
          1. TOP NAVIGATION BAR (EXACT SCREENSHOT 1 & TRIPMATE MATCH)
      ======================================================== */}
      <header className="h-[52px] bg-white border-b border-[#e9ecef] px-4 flex items-center justify-between gap-4 z-40 flex-shrink-0">
        
        {/* Left Controls */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center hover:opacity-85 transition-opacity">
            <img 
              src={tripmateLogo} 
              alt="TripMate" 
              className="h-7 w-auto"
            />
          </Link>

          <div className="hidden sm:flex items-center gap-1 border-l border-[#dee2e6] pl-3 text-[#6c757d]">
            <button 
              type="button"
              onClick={handleUndo}
              disabled={undoStack.length === 0}
              title={undoStack.length > 0 ? `Undo: ${undoStack[0].description}` : 'Nothing to undo'} 
              className={`p-1 rounded-md transition-colors ${
                undoStack.length > 0 
                  ? 'hover:text-[#212529] hover:bg-slate-100 text-[#495057] cursor-pointer' 
                  : 'text-slate-300 cursor-not-allowed'
              }`}
            >
              <Undo size={14} />
            </button>
            <button 
              type="button"
              onClick={handleRedo}
              disabled={redoStack.length === 0}
              title={redoStack.length > 0 ? 'Redo last undone action' : 'Nothing to redo'} 
              className={`p-1 rounded-md transition-colors ${
                redoStack.length > 0 
                  ? 'hover:text-[#212529] hover:bg-slate-100 text-[#495057] cursor-pointer' 
                  : 'text-slate-300 cursor-not-allowed'
              }`}
            >
              <Redo size={14} />
            </button>
          </div>

          {/* Trip Plan Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsTripMenuOpen(!isTripMenuOpen)}
              className="flex items-center gap-1 text-xs font-bold text-[#212529] hover:bg-slate-100 px-2 py-1 rounded-lg transition-colors cursor-pointer"
            >
              <span>Trip plan</span>
              <ChevronDown size={13} className="text-[#6c757d]" />
            </button>

            {isTripMenuOpen && (
              <div className="absolute left-0 top-full mt-1 w-48 bg-white border border-[#ced4da] rounded-xl shadow-xl z-50 overflow-hidden py-1">
                <button
                  onClick={() => {
                    setIsEditingTitle(true);
                    setIsTripMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-50 text-[#212529] cursor-pointer"
                >
                  Rename trip
                </button>
                <button
                  onClick={() => {
                    navigate('/plan/create');
                    setIsTripMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs font-bold hover:bg-slate-50 text-blue-600 cursor-pointer"
                >
                  + Plan a new trip
                </button>
                <div className="border-t border-slate-200/80 my-1"></div>
                <button
                  onClick={() => {
                    navigate('/dashboard');
                    setIsTripMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs font-bold hover:bg-slate-50 text-slate-800 cursor-pointer flex items-center justify-between"
                >
                  <span>PostgreSQL Database Hub</span>
                  <Database size={13} className="text-blue-600" />
                </button>
                <button
                  onClick={() => {
                    setIsExportPdfOpen(true);
                    setIsTripMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs font-bold hover:bg-slate-50 text-blue-600 cursor-pointer flex items-center justify-between"
                >
                  <span>Export Itinerary (PDF)</span>
                  <Printer size={13} />
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsShareModalOpen(true)}
            className="hidden md:flex items-center gap-1.5 text-xs font-bold text-[#495057] hover:bg-slate-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
          >
            <Share2 size={13} />
            <span>Share</span>
          </button>

          <button
            onClick={() => setIsGetAppModalOpen(true)}
            className="hidden md:flex items-center gap-1.5 text-xs font-bold text-[#495057] hover:bg-slate-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
          >
            <Smartphone size={13} />
            <span>Get app</span>
          </button>

          <div className="relative">
            <button 
              type="button"
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              className="text-[#6c757d] hover:text-[#212529] p-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
              title="More trip options"
            >
              <MoreHorizontal size={15} />
            </button>

            {isMoreMenuOpen && (
              <div className="absolute left-0 top-full mt-1 w-52 bg-white border border-[#ced4da] rounded-xl shadow-xl z-50 overflow-hidden py-1">
                <button
                  type="button"
                  onClick={() => {
                    handleDuplicateTrip();
                    setIsMoreMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-50 text-[#212529] cursor-pointer flex items-center gap-2"
                >
                  <Sparkles size={13} className="text-blue-600" />
                  <span>Duplicate Trip</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsCoverPhotoModalOpen(true);
                    setIsMoreMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-50 text-[#212529] cursor-pointer flex items-center gap-2"
                >
                  <Image size={13} className="text-blue-600" />
                  <span>Change Cover Photo</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileMenuOpen(true);
                    setIsMoreMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-50 text-[#212529] cursor-pointer flex items-center gap-2"
                >
                  <Settings size={13} className="text-slate-600" />
                  <span>Trip Settings & Units</span>
                </button>
                <div className="border-t border-slate-100 my-1"></div>
                <button
                  type="button"
                  onClick={() => {
                    handleResetToDefaults();
                    setIsMoreMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-slate-50 text-amber-700 cursor-pointer flex items-center gap-2"
                >
                  <RefreshCw size={13} className="text-amber-600" />
                  <span>Reset Curated Stops</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleClearAllStops();
                    setIsMoreMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-rose-50 text-rose-600 cursor-pointer flex items-center gap-2"
                >
                  <Trash2 size={13} />
                  <span>Clear All Stops</span>
                </button>
              </div>
            )}
          </div>
        </div>

                {/* Center Master View Switcher Capsule (Pro Max UX) */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold overflow-x-auto">
          <button
            id="header-tab-overview"
            onClick={() => setActiveView('overview')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'overview' ? 'bg-white text-blue-600 shadow-xs font-extrabold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers size={13} />
            <span>Canvas Studio</span>
          </button>
          <button
            id="header-tab-board"
            onClick={() => setActiveView('board')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'board' ? 'bg-white text-blue-600 shadow-xs font-extrabold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Kanban size={13} />
            <span>Kanban Board</span>
          </button>
          <button
            id="header-tab-graph"
            onClick={() => setActiveView('graph')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'graph' ? 'bg-white text-emerald-800 shadow-xs font-extrabold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Workflow size={13} />
            <span>Journey Graph</span>
          </button>
          <button
            onClick={() => setActiveView('budget')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'budget' ? 'bg-white text-blue-600 shadow-xs font-extrabold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <DollarSign size={13} />
            <span>Financial Radar</span>
          </button>
          <button
            onClick={() => setActiveView('packing')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeView === 'packing' ? 'bg-white text-blue-600 shadow-xs font-extrabold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckSquare size={13} />
            <span>Checklist</span>
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          
          {/* Live Places & Actual Images API Status Pill */}
          <button
            type="button"
            onClick={handleRefreshLivePlaces}
            disabled={isFetchingLivePlaces}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
              isLiveApiActive
                ? 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
            title="Fetch actual live images and landmarks near this location via Wikimedia & OpenStreetMap Places API"
          >
            <RefreshCw size={11} className={isFetchingLivePlaces ? "animate-spin text-blue-600" : (isLiveApiActive ? "text-blue-600" : "text-slate-500")} />
            <span>{isFetchingLivePlaces ? "Fetching Real Photos..." : (isLiveApiActive ? "Live Places API ✓" : "Live Places API")}</span>
          </button>

          {/* PostgreSQL Live Database Sync Status Pill */}
          <Link
            to="/dashboard"
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
              backendStatus.online 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100' 
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
            title="Click to open PostgreSQL & Java Backend Management Hub"
          >
            <span className={`w-2 h-2 rounded-full ${backendStatus.online ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
            <span>{backendStatus.online ? `PostgreSQL Live (#${backendStatus.tripId})` : 'PostgreSQL Hub'}</span>
          </Link>

          {/* Guide / Tour Button */}
          <button
            onClick={() => setTourStep(tourStep ? null : 2)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50/80 hover:bg-blue-100/80 text-blue-700 text-xs font-bold transition-colors cursor-pointer"
            title="Step-by-step Onboarding Guide"
          >
            <Sparkles size={13} />
            <span>{tourStep ? "Hide Guide" : "Step-by-Step Guide"}</span>
          </button>

          {/* Export PDF Button (Working Itinerary PDF) */}
          <button
            onClick={() => setIsExportPdfOpen(true)}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer border border-slate-200"
            title="Export clean PDF of travel itinerary"
          >
            <Printer size={13} />
            <span>Export PDF</span>
          </button>

          {/* Save Trip Button (PostgreSQL Database Hub) */}
          <button
            id="save-trip-header-btn"
            onClick={handleSaveTripToDatabase}
            className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg px-3.5 py-1.5 text-xs font-bold transition-colors cursor-pointer shadow-xs"
            title="Save trip and sync to PostgreSQL Database Hub"
          >
            <Database size={13} />
            <span>Save trip</span>
          </button>

          {/* Profile icon with Traveler Modal */}
          <button
            type="button"
            onClick={() => setIsProfileMenuOpen(true)}
            className="w-7 h-7 rounded-full overflow-hidden border border-slate-300 flex items-center justify-center cursor-pointer bg-slate-100 shadow-2xs hover:ring-2 hover:ring-blue-400 transition-all"
            title="Open Traveler Profile & Preferences"
          >
            <img src={facelessAvatar} alt="Profile" className="w-full h-full object-cover" />
          </button>
        </div>

      </header>

      {/* ========================================================
          2. WORKSPACE BODY (3 PANELS: SIDEBAR, MIDDLE PANE, MAP)
      ======================================================== */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* ========================================================
            VIEW 3: MULTI-DAY KANBAN BOARD (LINEAR / NOTION STYLE)
        ======================================================== */}
        {/* ========================================================
            VIEW 5: TOPOLOGICAL JOURNEY NODE GRAPH ACROSS ALL DAYS
        ======================================================== */}
        {activeView === 'graph' && (
          <JourneyNodeGraph
            trip={trip}
            tripStartDate={tripStartDate}
            tripEndDate={tripEndDate}
            currencySymbol={currencySymbol}
            currencyRate={currencyRate}
            onSelectPlace={(placeId) => {
              setSelectedPlaceId(placeId);
              setShowPlaceDetailSheet(true);
            }}
            onOpenOptimizer={(sec) => handleOpenOptimizer(sec)}
            onMovePlace={(dayId, pIdx, dir) => handleMovePlace(dayId, pIdx, dir)}
            onMovePlaceToDay={(fromDayId, placeId, toDayId) => handleMovePlaceToDay(fromDayId, placeId, toDayId)}
            onReorderPlaces={handleReorderPlaces}
            onSwitchToOverview={() => setActiveView('overview')}
            onDeletePlace={handleDeletePlace}
          />
        )}

        {activeView === 'board' && (
          <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-100/70">
            {/* Kanban Header Bar with Pan Hint & Trip Meta */}
            <div className="bg-white/95 backdrop-blur-xs border-b border-slate-200/80 px-6 py-2.5 flex items-center justify-between flex-shrink-0 z-10 select-none shadow-2xs">
              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                  <Kanban size={14} className="text-blue-600" />
                  <span>Interactive Kanban Board</span>
                </span>
                <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                  • {trip.sections?.length || 0} Days • {(trip.sections?.reduce((sum, s) => sum + (s.places?.length || 0), 0) || 0) + (trip.placesToVisit?.length || 0)} Total Stops
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[11px] font-bold border border-blue-200/60 flex items-center gap-2 shadow-2xs">
                  <span>✋ Hold mouse anywhere to pan board</span>
                  <span className="text-blue-300">|</span>
                  <span>↕ Drag cards to reorder</span>
                </span>
              </div>
            </div>

            {/* Scrollable & Mouse-Draggable Kanban Canvas */}
            <div 
              ref={kanbanContainerRef}
              onMouseDown={handleKanbanMouseDown}
              onWheel={handleKanbanWheel}
              className={`flex-1 p-6 overflow-x-auto flex gap-6 items-start min-h-0 select-none transition-colors ${
                isPanningKanban ? 'cursor-grabbing select-none' : 'cursor-grab'
              }`}
            >
              {/* Column 0: Places to Visit (Unassigned Bucket) */}
              <div 
                className={`w-80 flex-shrink-0 bg-white rounded-3xl p-4 border shadow-sm flex flex-col max-h-[calc(100vh-190px)] transition-all ${
                  kanbanOver?.dayId === 'places-to-visit' ? 'border-blue-400 bg-blue-50/20 ring-2 ring-blue-500/30' : 'border-slate-200/90'
                }`}
              onDragOver={(e) => {
                e.preventDefault();
                setKanbanOver({ dayId: 'places-to-visit', index: trip.placesToVisit?.length || 0 });
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (kanbanDrag) {
                  handleReorderPlaces(kanbanDrag.dayId, kanbanDrag.index, 'places-to-visit', trip.placesToVisit?.length || 0);
                  setKanbanDrag(null);
                  setKanbanOver(null);
                }
              }}
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  <h3 className="font-black text-sm text-slate-900">Places to Visit</h3>
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {trip.placesToVisit?.length || 0}
                </span>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-none">
                {trip.placesToVisit?.map((place, pIdx) => (
                  <div key={place.id || pIdx}>
                    {/* Visual Drop Slot Indicator */}
                    {kanbanOver?.dayId === 'places-to-visit' && kanbanOver?.index === pIdx && (
                      <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full my-1.5 animate-pulse shadow-sm" />
                    )}
                    <div 
                      draggable={true}
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', JSON.stringify({ dayId: 'places-to-visit', index: pIdx }));
                        setKanbanDrag({ dayId: 'places-to-visit', index: pIdx, place });
                      }}
                      onDragEnd={() => {
                        setKanbanDrag(null);
                        setKanbanOver(null);
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setKanbanOver({ dayId: 'places-to-visit', index: pIdx });
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (kanbanDrag) {
                          handleReorderPlaces(kanbanDrag.dayId, kanbanDrag.index, 'places-to-visit', pIdx);
                          setKanbanDrag(null);
                          setKanbanOver(null);
                        }
                      }}
                      className={`bg-slate-50 hover:bg-blue-50/40 p-3.5 rounded-2xl border transition-all relative group cursor-grab active:cursor-grabbing overflow-hidden ${
                        kanbanDrag?.place?.id === place.id 
                          ? 'opacity-40 scale-95 border-dashed border-blue-500 shadow-none' 
                          : 'border-slate-200/80 shadow-2xs hover:shadow-md'
                      }`}
                    >
                      <div className="flex gap-3 items-start">
                        <GripVertical size={16} className="text-slate-400 group-hover:text-blue-600 flex-shrink-0 mt-2" />
                        <img src={place.image} alt={place.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <span className="text-[10px] font-bold text-blue-600 uppercase block truncate">{place.category || 'Sight'}</span>
                            <button
                              onClick={() => handleDeletePlace(place.id)}
                              className="text-slate-400 hover:text-rose-600 p-0.5 rounded hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Delete stop from trip"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                          <h4 className="font-extrabold text-xs text-slate-900 leading-tight truncate">{place.name}</h4>
                          <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded font-bold mt-1 inline-block">★ {place.rating || 4.8}</span>
                        </div>
                      </div>
                      {/* Move to Day Shortcuts */}
                      <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-1 text-[11px] font-bold">
                        <span className="text-slate-400 text-[10px] flex-shrink-0">Move to:</span>
                        <div className="flex flex-wrap items-center gap-1 max-w-full">
                          {trip.sections?.map((sec, sIdx) => (
                            <button
                              key={sec.id}
                              onClick={() => handleMovePlaceToDay('places-to-visit', place.id, sec.id)}
                              className="px-1.5 py-0.5 rounded-md bg-white hover:bg-blue-600 hover:text-white border border-slate-200 text-slate-700 transition-colors cursor-pointer text-[10px] whitespace-nowrap"
                              title={`Move to ${sec.title || `Day ${sIdx + 1}`}`}
                            >
                              {trip.sections.length > 5 ? `D${sIdx + 1}` : `Day ${sIdx + 1}`}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Drop Zone at bottom of column */}
                <div 
                  className="py-2 text-center border-2 border-dashed border-slate-200 rounded-xl text-[11px] text-slate-400 hover:border-blue-400 hover:text-blue-600 transition-colors"
                  onDragOver={(e) => {
                    e.preventDefault();
                    setKanbanOver({ dayId: 'places-to-visit', index: trip.placesToVisit?.length || 0 });
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (kanbanDrag) {
                      handleReorderPlaces(kanbanDrag.dayId, kanbanDrag.index, 'places-to-visit', trip.placesToVisit?.length || 0);
                      setKanbanDrag(null);
                      setKanbanOver(null);
                    }
                  }}
                >
                  Drop here to place stop
                </div>
              </div>
            </div>

            {/* Day Columns */}
            {trip.sections?.map((sec, sIdx) => (
              <div 
                key={sec.id} 
                className={`w-84 flex-shrink-0 bg-white rounded-3xl p-4 border shadow-sm flex flex-col max-h-[calc(100vh-190px)] transition-all ${
                  kanbanOver?.dayId === sec.id ? 'border-blue-400 bg-blue-50/20 ring-2 ring-blue-500/30' : 'border-slate-200/90'
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setKanbanOver({ dayId: sec.id, index: sec.places?.length || 0 });
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  if (kanbanDrag) {
                    handleReorderPlaces(kanbanDrag.dayId, kanbanDrag.index, sec.id, sec.places?.length || 0);
                    setKanbanDrag(null);
                    setKanbanOver(null);
                  }
                }}
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                      <h3 className="font-black text-sm text-slate-900">{sec.title || `Day ${sIdx + 1}`}</h3>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium block mt-0.5">{sec.date || `Day ${sIdx + 1}`} • {sec.places?.length || 0} stops</span>
                  </div>
                  
                  {/* Optimize button */}
                  <button
                    onClick={() => handleOpenOptimizer(sec)}
                    className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer"
                    title="Optimize Day Route"
                  >
                    <Zap size={14} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-none">
                  {sec.places?.map((place, pIdx) => (
                    <div key={place.id || pIdx}>
                      {/* Visual Drop Slot Indicator */}
                      {kanbanOver?.dayId === sec.id && kanbanOver?.index === pIdx && (
                        <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full my-1.5 animate-pulse shadow-sm" />
                      )}
                      <div 
                        draggable={true}
                        onDragStart={(e) => {
                          e.dataTransfer.setData('text/plain', JSON.stringify({ dayId: sec.id, index: pIdx }));
                          setKanbanDrag({ dayId: sec.id, index: pIdx, place });
                        }}
                        onDragEnd={() => {
                          setKanbanDrag(null);
                          setKanbanOver(null);
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setKanbanOver({ dayId: sec.id, index: pIdx });
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (kanbanDrag) {
                            handleReorderPlaces(kanbanDrag.dayId, kanbanDrag.index, sec.id, pIdx);
                            setKanbanDrag(null);
                            setKanbanOver(null);
                          }
                        }}
                        className={`bg-slate-50 hover:bg-blue-50/40 p-3.5 rounded-2xl border transition-all cursor-grab active:cursor-grabbing group overflow-hidden ${
                          kanbanDrag?.place?.id === place.id 
                            ? 'opacity-40 scale-95 border-dashed border-blue-500 shadow-none' 
                            : 'border-slate-200/80 shadow-2xs hover:shadow-md'
                        }`}
                      >
                        <div className="flex gap-2.5 items-start">
                          <GripVertical size={16} className="text-slate-400 group-hover:text-blue-600 flex-shrink-0 mt-1" />
                          <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center flex-shrink-0">
                            {pIdx + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-bold text-blue-600 uppercase block truncate">{place.category || 'Sight'}</span>
                            <h4 className="font-extrabold text-xs text-slate-900 leading-tight truncate">{place.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded font-bold">★ {place.rating || 4.8}</span>
                              <span className="text-[10px] text-slate-500 font-mono">{place.timeSpent || '1.5 hrs'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Controls */}
                        <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-1 text-[11px] font-bold">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleMovePlace(sec.id, pIdx, 'up')}
                              disabled={pIdx === 0}
                              className="p-1 rounded hover:bg-slate-200 text-slate-600 disabled:opacity-30 cursor-pointer"
                              title="Move Up"
                            >
                              <ChevronUp size={13} />
                            </button>
                            <button
                              onClick={() => handleMovePlace(sec.id, pIdx, 'down')}
                              disabled={pIdx === (sec.places?.length || 0) - 1}
                              className="p-1 rounded hover:bg-slate-200 text-slate-600 disabled:opacity-30 cursor-pointer"
                              title="Move Down"
                            >
                              <ChevronDown size={13} />
                            </button>
                            <button
                              onClick={() => handleDeletePlace(place.id)}
                              className="p-1 rounded hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                              title="Delete stop from trip"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>

                          {/* Move between days */}
                          <div className="flex flex-wrap items-center gap-1 max-w-full">
                            <button
                              onClick={() => handleMovePlaceToDay(sec.id, place.id, 'places-to-visit')}
                              className="px-1.5 py-0.5 rounded-md bg-white hover:bg-slate-200 border border-slate-200 text-slate-600 text-[10px] cursor-pointer whitespace-nowrap"
                            >
                              Unassign
                            </button>
                            {trip.sections?.filter(s => s.id !== sec.id).map(otherSec => {
                              const dayNum = trip.sections.indexOf(otherSec) + 1;
                              return (
                                <button
                                  key={otherSec.id}
                                  onClick={() => handleMovePlaceToDay(sec.id, place.id, otherSec.id)}
                                  className="px-1.5 py-0.5 rounded-md bg-white hover:bg-blue-600 hover:text-white border border-slate-200 text-slate-700 text-[10px] transition-colors cursor-pointer whitespace-nowrap"
                                  title={`Move to ${otherSec.title || `Day ${dayNum}`}`}
                                >
                                  {trip.sections.length > 5 ? `D${dayNum}` : `Day ${dayNum}`}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Drop Zone at bottom of column */}
                  <div 
                    className="py-2 text-center border-2 border-dashed border-slate-200 rounded-xl text-[11px] text-slate-400 hover:border-blue-400 hover:text-blue-600 transition-colors"
                    onDragOver={(e) => {
                      e.preventDefault();
                      setKanbanOver({ dayId: sec.id, index: sec.places?.length || 0 });
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (kanbanDrag) {
                        handleReorderPlaces(kanbanDrag.dayId, kanbanDrag.index, sec.id, sec.places?.length || 0);
                        setKanbanDrag(null);
                        setKanbanOver(null);
                      }
                    }}
                  >
                    Drop here to place stop
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        )}

        {/* ========================================================
            VIEW 4: CHECKLIST & PREPARATION MATRIX
        ======================================================== */}
        {activeView === 'packing' && (
          <div className="flex-1 bg-slate-50/50 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              <PackingChecklist 
                initialItems={[
                  { id: 'p1', item: 'Passport & Travel Visa', category: 'Documents', packed: true },
                  { id: 'p2', item: 'Flight Tickets & Hotel Confirmations', category: 'Documents', packed: true },
                  { id: 'p3', item: 'Universal Power Adapter & Cable Hub', category: 'Electronics', packed: false },
                  { id: 'p4', item: 'Comfortable Walking Shoes for Itinerary Tours', category: 'Clothing', packed: false },
                  { id: 'p5', item: 'Light Rain Jacket & Umbrella', category: 'Clothing', packed: true },
                  { id: 'p6', item: 'First Aid & Prescription Medications', category: 'Gear', packed: false },
                ]} 
              />
            </div>
          </div>
        )}

        {(activeView === 'overview' || activeView === 'budget') && (
          <>
        
        {/* --------------------------------------------------------
            PANEL A: COLLAPSIBLE LEFT SIDEBAR
        -------------------------------------------------------- */}
        {!sidebarCollapsed && (
          <aside className="w-[195px] border-r border-slate-200 bg-white flex flex-col justify-between p-3 flex-shrink-0 overflow-y-auto">
            <div>
              
              {/* Gradient AI Assistant Button */}
              <button
                onClick={() => {
                  setAiPresetPrompt(null);
                  setIsAiModalOpen(true);
                }}
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-extrabold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer mb-3"
              >
                <Sparkles size={14} className="animate-pulse" />
                <span>AI Assistant</span>
              </button>

              {/* Navigation Categories */}
              <div className="space-y-4">
                
                {/* Overview Header */}
                <div>
                  <button 
                    onClick={() => setActiveView('overview')}
                    className={`w-full font-bold text-xs px-3 py-1.5 rounded-xl flex items-center justify-between mb-1.5 transition-colors cursor-pointer ${
                      activeView === 'overview' ? 'bg-blue-600 text-white shadow-xs' : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span>Overview</span>
                    <ChevronDown size={13} />
                  </button>
                  <ul className="space-y-0.5 text-xs text-[#495057]">
                    <li>
                      <a 
                        href="#explore-section" 
                        onClick={() => setActiveView('overview')}
                        className="block py-1 px-3 rounded-lg hover:bg-slate-100 hover:text-black font-semibold"
                      >
                        Explore
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#notes-section" 
                        onClick={() => setActiveView('overview')}
                        className="block py-1 px-3 rounded-lg hover:bg-slate-100 hover:text-black font-semibold"
                      >
                        Notes
                      </a>
                    </li>
                    <li>
                      <button 
                        onClick={() => {
                          setActiveView('overview');
                          setActiveDayId('places-to-visit');
                          const el = document.getElementById('places-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full text-left py-1 px-3 rounded-lg hover:bg-slate-100 hover:text-black font-semibold flex items-center justify-between"
                      >
                        <span>Places to visit</span>
                        <span className="text-[10px] text-[#adb5bd]">{trip.placesToVisit?.length || 3}</span>
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={handleSaveTripToDatabase}
                        className="w-full text-left py-1 px-3 rounded-lg hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold flex items-center justify-between cursor-pointer"
                        title="Save trip and sync places to PostgreSQL Hub"
                      >
                        <span className="flex items-center gap-1.5">
                          <Database size={12} className="text-emerald-600" />
                          <span>Save trip</span>
                        </span>
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 py-0.5 rounded font-mono font-bold">SQL</span>
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Itinerary Section */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#212529] px-2 py-1 mb-1">
                    <span>Itinerary</span>
                    <ChevronDown size={13} className="text-[#6c757d]" />
                  </div>
                  <ul className="space-y-0.5 text-xs text-[#495057]">
                    {days.slice(1).map((d) => (
                      <li key={d.id}>
                        <button id={'day-nav-' + d.id}
                          onClick={() => {
                            setActiveView('overview');
                            setActiveDayId(d.id);
                            const el = document.getElementById(d.id);
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className={`w-full text-left py-1 px-3 rounded-lg font-semibold flex items-center justify-between transition-colors ${
                            activeDayId === d.id && activeView === 'overview' ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:bg-slate-100 hover:text-black'
                          }`}
                        >
                          <span>{d.shortTitle}</span>
                          <span className="text-[10px] text-[#adb5bd]">{d.placesCount}</span>
                        </button>
                      </li>
                    ))}
                    {/* Visual Views in Itinerary Sidebar */}
                    <li className="pt-2">
                      <button
                        onClick={() => setActiveView('graph')}
                        className={`w-full text-left py-1.5 px-3 rounded-xl font-bold flex items-center justify-between transition-all cursor-pointer ${
                          activeView === 'graph' 
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs' 
                            : 'hover:bg-emerald-50 text-emerald-800 border border-emerald-200/60 bg-emerald-50/40'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <Workflow size={13} className={activeView === 'graph' ? 'text-white' : 'text-emerald-700'} />
                          <span>Journey Graph</span>
                        </span>
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase ${
                          activeView === 'graph' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                        }`}>Topology</span>
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setActiveView('board')}
                        className={`w-full text-left py-1.5 px-3 rounded-xl font-bold flex items-center justify-between transition-all cursor-pointer mt-1 ${
                          activeView === 'board' 
                            ? 'bg-blue-600 text-white shadow-xs' 
                            : 'hover:bg-slate-100 text-slate-700 border border-slate-200/60'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <Kanban size={13} className={activeView === 'board' ? 'text-white' : 'text-blue-600'} />
                          <span>Kanban Board</span>
                        </span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                          activeView === 'board' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>Drag/Drop</span>
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Budget Section with In/Out Status */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#212529] px-2 py-1 mb-1">
                    <span>Budget</span>
                    <ChevronDown size={13} className="text-[#6c757d]" />
                  </div>
                  <ul className="space-y-1 text-xs text-[#495057]">
                    <li>
                      <button 
                        onClick={() => setActiveView('budget')}
                        className={`w-full text-left py-1 px-3 rounded-lg font-semibold flex items-center justify-between transition-colors ${
                          activeView === 'budget' ? 'bg-blue-600 text-white font-bold' : 'hover:bg-slate-100 hover:text-slate-700'
                        }`}
                      >
                        <span>Overview</span>
                        <span className="text-[10px] font-bold">{currencySymbol}{totalTripCost.toLocaleString()}</span>
                      </button>
                    </li>
                    <li className="px-3">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                        isOverBudget ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {isOverBudget ? '⚠️ Out of budget' : '✓ In budget'}
                      </span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Bottom Sidebar actions */}
            <div className="pt-4 border-t border-slate-200/80 space-y-1 text-xs text-[#6c757d]">
              <button 
                onClick={() => setTourStep(2)}
                className="w-full flex items-center gap-2 px-2 py-1.5 hover:text-black hover:bg-slate-50 rounded-lg cursor-pointer"
              >
                <HelpCircle size={13} />
                <span>Onboarding guide</span>
              </button>
              <button 
                onClick={() => setSidebarCollapsed(true)}
                className="w-full flex items-center gap-2 px-2 py-1.5 hover:text-black hover:bg-slate-50 rounded-lg cursor-pointer"
              >
                <span>«</span>
                <span>Hide sidebar</span>
              </button>
            </div>
          </aside>
        )}

        {/* --------------------------------------------------------
            PANEL B: MIDDLE SCROLLABLE WORKSPACE
        -------------------------------------------------------- */}
        <div id="middle-pane" className="flex-1 max-w-[620px] bg-slate-50/50 border-r border-slate-200 overflow-y-auto overflow-x-hidden flex flex-col">
          
          {/* ========================================================
              VIEW 1: ITINERARY & PLACES (SCREENSHOTS 1, 2, 3)
          ======================================================== */}
          {activeView === 'overview' && (
            <div>
              {/* Modern Horizontal Day Navigation Deck */}
              <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-none shadow-2xs">
                <button
                  onClick={() => {
                    setActiveDayId('overview');
                    const el = document.getElementById('middle-pane');
                    if (el) el.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeDayId === 'overview' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Compass size={13} />
                  <span>Passport & Overview</span>
                </button>
                <button
                  onClick={() => {
                    setActiveDayId('places-to-visit');
                    const el = document.getElementById('places-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeDayId === 'places-to-visit' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <MapPin size={13} />
                  <span>Places to visit ({trip.placesToVisit?.length || 0})</span>
                </button>
                {trip.sections?.map((sec, sIdx) => (
                  <button
                    key={sec.id}
                    onClick={() => {
                      setActiveDayId(sec.id);
                      const el = document.getElementById(sec.id);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeDayId === sec.id ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Calendar size={13} />
                    <span>Day {sIdx + 1} ({sec.places?.length || 0})</span>
                  </button>
                ))}
              </div>
              {/* Cover Header Image */}
              <div className="h-44 sm:h-52 w-full relative overflow-hidden bg-slate-900 group">
                <img 
                  src={trip.coverImage || "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&auto=format&fit=crop&q=80"} 
                  alt={trip.name || "Destination"} 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
                <button 
                  type="button"
                  onClick={() => setIsCoverPhotoModalOpen(true)}
                  className="absolute top-3 right-3 p-1.5 bg-black/50 hover:bg-black/70 text-white rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  title="Click to change cover photo"
                >
                  <Edit3 size={13} />
                  <span className="hidden sm:inline text-[11px] font-bold">Change Cover</span>
                </button>
              </div>

              {/* Floating Trip Info Card (Boutique Travel Passport UI/UX Pro Max) */}
              <div className="px-6 -mt-10 relative z-10 mb-6">
                <div className="bg-white backdrop-blur-md rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden">
                  
                  {/* Subtle Passport Header Pill */}
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 mb-3.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
                      <span className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-700">
                        TRIPMATE PASSPORT • INTELLIGENT TRAVEL ITINERARY
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-blue-700 font-bold bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      CURATED EDITION
                    </span>
                  </div>

                  {/* Connected Journey Node Graph Banner - TripMate Signature Forest Green */}
                  <div className="mb-4 bg-gradient-to-r from-[#124C40] via-[#165B4D] to-[#1C6B5C] rounded-2xl p-4.5 text-white shadow-sm border border-[#0D382F]/20 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">Interactive Journey Map</span>
                        </div>
                        <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                          <span>Multi-Day Interactive Node Graph</span>
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/15 text-white border border-white/20">
                            {((trip.sections || []).reduce((acc, s) => acc + (s.places?.length || 0), 0) + (trip.placesToVisit?.length || 0))} Stops Connected
                          </span>
                        </h3>
                        <p className="text-xs text-emerald-50/90 max-w-xl leading-relaxed">
                          Visualize your trip day by day with walking and driving transit times, sequence your daily stops, and drag to reorganize your route effortlessly.
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveView('graph')}
                        className="px-4 py-2.5 rounded-xl bg-[#F7F5EF] hover:bg-white text-[#124C40] font-black text-xs shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap self-start sm:self-center"
                      >
                        <Workflow size={15} className="text-[#124C40]" />
                        <span>Inspect Journey Graph ↗</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {isEditingTitle ? (
                        <input
                          type="text"
                          value={tripTitle}
                          onChange={(e) => setTripTitle(e.target.value)}
                          onBlur={() => setIsEditingTitle(false)}
                          autoFocus
                          className="text-2xl sm:text-3xl font-black text-slate-900 outline-none border-b-2 border-blue-600 bg-transparent w-full"
                        />
                      ) : (
                        <h1 
                          onClick={() => setIsEditingTitle(true)}
                          className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight hover:text-blue-600 transition-colors cursor-pointer truncate"
                          title="Click to rename trip"
                        >
                          {tripTitle}
                        </h1>
                      )}

                      {/* Travel Badges Row: Dates, Destination, Live Weather & Quantum Status */}
                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold mt-2.5 text-slate-600">
                        <button
                          type="button"
                          onClick={() => {
                            setTempStartDate(tripStartDate);
                            setTempEndDate(tripEndDate);
                            setIsEditingDatesModalOpen(true);
                          }}
                          className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 px-2.5 py-1 rounded-lg text-slate-700 hover:text-blue-700 font-bold cursor-pointer transition-all shadow-2xs group"
                          title="Click to edit travel dates"
                        >
                          <Calendar size={12} className="text-blue-600" />
                          <span>{tripStartDate} - {tripEndDate}</span>
                          <Edit3 size={11} className="text-slate-400 group-hover:text-blue-600 ml-0.5" />
                        </button>
                        
                        <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg text-slate-700 font-bold">
                          <MapPin size={12} className="text-blue-600" />
                          <span>{trip.passedDestination || currentDestination}</span>
                        </span>

                        {weatherInfo && (
                          <span className="inline-flex items-center gap-1.5 bg-amber-50/80 text-amber-900 border border-amber-200/60 px-2.5 py-1 rounded-lg font-bold">
                            🌤️ {Math.round(weatherInfo.main?.temp || 0)}°C {weatherInfo.weather?.[0]?.description || ''}
                          </span>
                        )}

                        <span className="inline-flex items-center gap-1 text-[10px] bg-blue-50 text-blue-700 font-mono font-bold px-2 py-1 rounded-lg border border-blue-200">
                          ⚡ AI QUANTUM GRAPH ACTIVE
                        </span>
                      </div>

                      {/* Dynamic Destination Switcher Pills */}
                      <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider mr-1">Switch Destination:</span>
                        {[
                          { key: 'singapore', label: '🇸🇬 Singapore', query: 'Singapore' },
                          { key: 'mexico', label: '🇲🇽 Mexico', query: 'Mexico City, Mexico' },
                          { key: 'mumbai', label: '🇮🇳 Mumbai', query: 'Mumbai, India' },
                          { key: 'paris', label: '🇫🇷 Paris', query: 'Paris, France' },
                          { key: 'tokyo', label: '🇯🇵 Tokyo', query: 'Tokyo, Japan' }
                        ].map(d => (
                          <button
                            key={d.key}
                            id={`switch-city-${d.key}`}
                            type="button"
                            onClick={() => handleSwitchDestination(d.query)}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                              currentDestination.toLowerCase().includes(d.key)
                                ? 'bg-blue-600 text-white shadow-xs scale-102 ring-2 ring-blue-300'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                            }`}
                          >
                            {d.label}
                          </button>
                        ))}
                      </div>

                      {/* Save Trip Option in Overview */}
                      <div className="mt-3.5 flex flex-wrap items-center gap-3">
                        <button
                          id="save-trip-overview-btn"
                          onClick={handleSaveTripToDatabase}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-black px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer hover:shadow-md hover:-translate-y-0.5"
                          title="Save this trip to PostgreSQL Database Hub"
                        >
                          <Database size={14} />
                          <span>Save trip to PostgreSQL</span>
                        </button>
                        <span className="text-[11px] text-slate-600 font-medium flex items-center gap-1">
                          <CheckCircle2 size={12} className="text-blue-600" />
                          Syncs itinerary & opens Hub
                        </span>
                      </div>
                    </div>

                    {/* Tripmates / Avatars with Faceless Avatar */}
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <div className="flex items-center -space-x-2">
                        <img 
                          src={facelessAvatar} 
                          alt="Trip Owner" 
                          className="w-9 h-9 rounded-full border-2 border-white object-cover bg-slate-100 shadow-sm" 
                        />
                        <button 
                          onClick={() => setIsShareModalOpen(true)}
                          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-black text-slate-700 transition-colors shadow-2xs cursor-pointer"
                          title="Invite Tripmates to collaborate"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-[10px] font-bold text-slate-600/80">1 Tripmate</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 space-y-8 pb-20">
                
                {/* ----------------------------------------------------
                    SECTION 1: EXPLORE CAROUSEL & NEARBY PLACES (IMAGE 1 MATCH)
                ---------------------------------------------------- */}
                <div id="explore-section">
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="font-bold text-base text-[#212529] flex items-center gap-1.5">
                      <span>▾</span>
                      <span>Explore</span>
                    </h3>
                    <button 
                      onClick={() => setActiveGuideModal(trip.guides?.[0] || { title: `Top Highlights & Guides in ${trip.name}`, subtitle: 'Hand-picked landmarks, hidden gems, and local dining', image: trip.coverImage, source: 'TripMate Curated' })}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs cursor-pointer"
                    >
                      Browse all
                    </button>
                  </div>

                  {/* Distance Indicator (Image 1 Match: 14 mi (23 km) away from Mexico) */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-3">
                    <MapPin size={13} className="text-blue-600" />
                    <span>{trip.distanceInfo || `14 mi (23 km) away from ${trip.city || trip.name}`}</span>
                  </div>

                  {/* 3 Dynamic Guide Cards Carousel */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {(trip.guides || [
                      { title: `Top attractions in ${trip.name}`, subtitle: 'Most often seen on the web', source: 'TripMate', image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400&fit=crop' },
                      { title: `Best restaurants in ${trip.name}`, subtitle: 'Tripadvisor Top 20', source: 'Tripadvisor', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400&fit=crop' },
                      { title: `Curated hotels in ${trip.name}`, subtitle: 'No hidden commissions', source: 'TripMate', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&fit=crop' }
                    ]).map((guide, gIdx) => (
                      <div 
                        key={gIdx}
                        onClick={() => setActiveGuideModal(guide)}
                        className="group bg-white rounded-xl border border-[#e9ecef] overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                      >
                        <div className="h-24 overflow-hidden relative">
                          <img 
                            src={guide.image} 
                            alt={guide.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                          />
                        </div>
                        <div className="p-2.5">
                          <h4 className="font-bold text-xs text-[#212529] line-clamp-1 leading-tight mb-1">
                            {guide.title}
                          </h4>
                          <p className="text-[10px] text-[#6c757d] line-clamp-1 mb-2">{guide.subtitle}</p>
                          <div className="flex items-center gap-1 text-[9px] font-bold text-blue-600">
                            <span>●</span>
                            <span>{guide.source || 'TripMate'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Nearby Places Explorer (Restaurants, Hotels, Attractions) */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Navigation size={13} className="text-blue-600" />
                        <span>Nearby Locations & Services ({trip.name})</span>
                      </span>
                      <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full font-bold border border-blue-100 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>Live Places & Photos API</span>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-3 scrollbar-none">
                      {[
                        { key: 'all', label: 'All Nearby' },
                        { key: 'restaurants', label: `🍽️ Restaurants (${trip.nearbyRestaurants?.length || 0})` },
                        { key: 'hotels', label: `🏨 Hotels (${trip.nearbyHotels?.length || 0})` },
                        { key: 'attractions', label: `🏛️ Attractions (${trip.nearbyAttractions?.length || trip.allCuratedPlaces?.length || trip.placesToVisit?.length || 0})` }
                      ].map(cat => (
                        <button
                          key={cat.key}
                          type="button"
                          onClick={() => setExploreCategory(cat.key)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex-shrink-0 ${
                            exploreCategory === cat.key
                              ? 'bg-slate-900 text-white shadow-xs'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    {/* Nearby Place Cards Grid with "+ Add to plan" */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {displayedNearbyList.map(place => {
                          const isAlreadyInTrip = (trip.placesToVisit || []).some(p => p.name?.toLowerCase() === place.name?.toLowerCase() || p.id === place.id) ||
                            (trip.sections || []).some(s => (s.places || []).some(p => p.name?.toLowerCase() === place.name?.toLowerCase() || p.id === place.id));
                          
                          return (
                            <div 
                              key={place.id}
                              className={`bg-white rounded-xl border p-3 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between ${
                                isAlreadyInTrip ? 'border-emerald-300 bg-emerald-50/20' : 'border-slate-200 hover:border-blue-500'
                              }`}
                            >
                              <div className="flex gap-2.5">
                                <img 
                                  src={place.image} 
                                  alt={place.name} 
                                  className="w-18 h-18 rounded-lg object-cover flex-shrink-0"
                                  loading="lazy"
                                />
                                <div className="flex-1 min-w-0">
                                  <span className="text-[9px] font-bold text-blue-600 uppercase block truncate">{place.category || 'Nearby Place'}</span>
                                  <h5 className="font-extrabold text-xs text-slate-900 truncate leading-tight">{place.name}</h5>
                                  <div className="flex items-center gap-1.5 text-[10px] text-slate-600 font-semibold my-0.5">
                                    <span className="text-amber-500 font-bold">★ {place.rating || 4.8}</span>
                                    <span>•</span>
                                    <span className="text-slate-800 font-bold">{place.price || '$'}</span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 line-clamp-1">{place.address || place.subtitle}</p>
                                </div>
                              </div>

                              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                                <button
                                  onClick={() => {
                                    setSelectedPlaceId(place.id);
                                    setShowPlaceDetailSheet(true);
                                  }}
                                  className="text-[10px] text-slate-500 hover:text-black font-semibold"
                                >
                                  View Details
                                </button>

                                {isAlreadyInTrip ? (
                                  <div className="flex items-center gap-1.5">
                                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold px-2.5 py-1 rounded-lg">
                                      <CheckCircle2 size={12} className="text-emerald-600" />
                                      <span>Added ✓</span>
                                    </span>
                                    {trip.sections?.slice(0, 2).map((sec, sIdx) => (
                                      <button
                                        key={sec.id}
                                        type="button"
                                        onClick={() => handleAddNearbyToPlan(place, sec.id)}
                                        className="bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-[10px] font-bold px-1.5 py-1 rounded-lg transition-colors cursor-pointer"
                                        title={`Add another stop to ${sec.shortTitle || `Day ${sIdx + 1}`}`}
                                      >
                                        +D{sIdx + 1}
                                      </button>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      onClick={() => handleAddNearbyToPlan(place, 'places-to-visit')}
                                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-xs flex items-center gap-1 cursor-pointer transition-colors"
                                      title="Add to Places to visit"
                                    >
                                      <Plus size={12} />
                                      <span>Add to plan</span>
                                    </button>
                                    {trip.sections?.[0] && (
                                      <button
                                        type="button"
                                        onClick={() => handleAddNearbyToPlan(place, trip.sections[0].id)}
                                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-1 rounded-lg cursor-pointer"
                                        title={`Add directly to ${trip.sections[0].shortTitle || 'Day 1'}`}
                                      >
                                        +{trip.sections[0].shortTitle?.split(' ')?.[0] || 'Day 1'}
                                      </button>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>

                {/* ----------------------------------------------------
                    SECTION 2: RESERVATIONS & WORKING BUDGET SUMMARY WIDGET
                ---------------------------------------------------- */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-7 bg-white rounded-2xl p-3.5 border border-slate-200">
                    <h4 className="text-xs font-bold text-[#212529] mb-2.5">Reservations and attachments</h4>
                    <div className="grid grid-cols-6 gap-1 text-center">
                      <button type="button" onClick={() => handleOpenReservationModal('Flight')} className="flex flex-col items-center p-1.5 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer" title="Add flight booking">
                        <Plane size={16} className="text-[#495057] mb-1" />
                        <span className="text-[10px] text-[#6c757d]">Flight</span>
                      </button>
                      <button type="button" onClick={() => handleOpenReservationModal('Lodging')} className="flex flex-col items-center p-1.5 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer" title="Add lodging reservation">
                        <Bed size={16} className="text-[#495057] mb-1" />
                        <span className="text-[10px] text-[#6c757d]">Lodging</span>
                      </button>
                      <button type="button" onClick={() => handleOpenReservationModal('Rental car')} className="flex flex-col items-center p-1.5 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer" title="Add rental car booking">
                        <Car size={16} className="text-[#495057] mb-1" />
                        <span className="text-[10px] text-[#6c757d]">Rental car</span>
                      </button>
                      <button type="button" onClick={() => handleOpenReservationModal('Train')} className="flex flex-col items-center p-1.5 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer" title="Add train tickets">
                        <Train size={16} className="text-[#495057] mb-1" />
                        <span className="text-[10px] text-[#6c757d]">Train</span>
                      </button>
                      <button type="button" onClick={() => handleOpenReservationModal('Attachment')} className="flex flex-col items-center p-1.5 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer" title="Add PDF/document attachment">
                        <Paperclip size={16} className="text-[#495057] mb-1" />
                        <span className="text-[10px] text-[#6c757d]">Attachment</span>
                      </button>
                      <button type="button" onClick={() => handleOpenReservationModal('Other')} className="flex flex-col items-center p-1.5 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer" title="Add other booking">
                        <MoreHorizontal size={16} className="text-[#495057] mb-1" />
                        <span className="text-[10px] text-[#6c757d]">Other</span>
                      </button>
                    </div>

                    {/* Booked Reservations Display List */}
                    {reservations && reservations.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1.5 max-h-36 overflow-y-auto">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Active Bookings & Confirmations ({reservations.length})
                        </span>
                        {reservations.map(res => (
                          <div key={res.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                                {res.type}
                              </span>
                              <div className="min-w-0">
                                <span className="text-xs font-bold text-slate-900 truncate block">{res.title}</span>
                                <span className="text-[10px] text-slate-500 font-mono">Code: {res.confirmationCode} {res.dateTime ? `• ${res.dateTime}` : ''}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {res.cost > 0 && (
                                <span className="text-xs font-extrabold text-slate-800">
                                  {currencySymbol}{res.cost}
                                </span>
                              )}
                              <button
                                type="button"
                                onClick={() => handleDeleteReservation(res.id)}
                                className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                                title="Remove booking"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Multi-Segment Category Budget Health Gauge (UI/UX Pro Max) */}
                  <div className="sm:col-span-5 bg-slate-100 rounded-2xl p-4 border-2 border-slate-200 flex flex-col justify-between shadow-2xs">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <DollarSign size={13} className="text-blue-600" />
                          <h4 className="text-xs font-black text-slate-900">Budget Health</h4>
                        </div>
                        <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                          isOverBudget 
                            ? 'bg-rose-100 text-rose-700 border border-rose-200' 
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {isOverBudget ? (
                            <>
                              <AlertTriangle size={11} className="stroke-[2.5]" />
                              <span>Exceeded</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 size={11} className="stroke-[2.5]" />
                              <span>Within Budget</span>
                            </>
                          )}
                        </span>
                      </div>

                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900">
                          {currencySymbol}{totalTripCost.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-600 font-semibold">
                          of {currencySymbol}{budgetLimit.toLocaleString()} cap
                        </span>
                      </div>
                      
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        {isOverBudget ? (
                          <span className="text-rose-600 font-bold">
                            ⚠️ Exceeds cap by {currencySymbol}{Math.abs(remainingBudget).toLocaleString()}
                          </span>
                        ) : (
                          <span className="text-slate-700 font-semibold">
                            ✓ {currencySymbol}{remainingBudget.toLocaleString()} cushion remaining ({Math.round(100 - budgetUsagePercent)}%)
                          </span>
                        )}
                      </div>

                      {/* Multi-Segment Stacked Gauge: Lodging (Teal), Dining (Coral), Sights (Mint) */}
                      <div className="w-full bg-slate-200/80 rounded-full h-2.5 overflow-hidden mt-3 flex shadow-inner">
                        <div 
                          className="h-full bg-blue-600 transition-all duration-300"
                          style={{ width: `${Math.min(42, budgetUsagePercent * 0.42)}%` }}
                          title="Lodging ~42%"
                        />
                        <div 
                          className="h-full bg-violet-600 transition-all duration-300"
                          style={{ width: `${Math.min(33, budgetUsagePercent * 0.33)}%` }}
                          title="Dining ~33%"
                        />
                        <div 
                          className="h-full bg-emerald-500 transition-all duration-300"
                          style={{ width: `${Math.min(25, budgetUsagePercent * 0.25)}%` }}
                          title="Sights & Tours ~25%"
                        />
                      </div>

                      {/* Segment Legend Pill Row */}
                      <div className="flex items-center justify-between text-[10px] font-bold mt-2 pt-1 border-t border-slate-200/60">
                        <span className="flex items-center gap-1 text-slate-700">
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          <span>Stay</span>
                        </span>
                        <span className="flex items-center gap-1 text-slate-700">
                          <span className="w-2 h-2 rounded-full bg-violet-600"></span>
                          <span>Dining</span>
                        </span>
                        <span className="flex items-center gap-1 text-slate-700">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span>Sights</span>
                        </span>
                      </div>
                    </div>

                    <button 
                      onClick={() => setActiveView('budget')}
                      className="text-[11px] font-black text-blue-600 hover:text-blue-800 hover:underline text-left cursor-pointer pt-2 flex items-center gap-1 transition-colors"
                    >
                      <span>Analyze full budget breakdown →</span>
                    </button>
                  </div>
                </div>

                {/* ----------------------------------------------------
                    SECTION 3: NOTES SECTION
                ---------------------------------------------------- */}
                <div id="notes-section">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-base text-[#212529] flex items-center gap-1.5">
                      <span>▾</span>
                      <span>Notes</span>
                    </h3>
                    <button className="text-[#adb5bd] hover:text-[#495057] p-1">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>

                  <textarea
                    placeholder="Write or paste anything here: how to get around, tips and tricks"
                    value={notesText}
                    onChange={(e) => setNotesText(e.target.value)}
                    rows={3}
                    className="w-full bg-white hover:bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-2xl p-3.5 text-xs text-[#212529] outline-none transition-all placeholder:text-[#adb5bd] leading-relaxed resize-none"
                  />
                </div>

                {/* ----------------------------------------------------
                    SECTION 4: PLACES TO VISIT (EXACT SCREENSHOT 2 MATCH)
                ---------------------------------------------------- */}
                <div id="places-section">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-base text-[#212529] flex items-center gap-1.5">
                      <span>▾</span>
                      <span>Places to visit</span>
                    </h3>
                    <div className="flex items-center gap-1 text-[#adb5bd]">
                      <button className="p-1 hover:text-[#212529]"><Edit3 size={14} /></button>
                      <button className="p-1 hover:text-[#212529]"><MoreHorizontal size={16} /></button>
                    </div>
                  </div>

                  {/* 3 Numbered Cards in Horizontal Layout (Screenshot 2 Match) */}
                  <div className="space-y-3 mb-3">
                    {(trip.placesToVisit || []).map((place) => (
                      <div
                        key={place.id}
                        onClick={() => {
                          setSelectedPlaceId(place.id);
                          setShowPlaceDetailSheet(true);
                        }}
                      >
                        <PlaceCard
                          place={place}
                          color="#2563EB"
                          isSelected={selectedPlaceId === place.id}
                          currencySymbol={currencySymbol}
                          isIncludedInBudget={!excludedPlaceIds.has(place.id)}
                          onSelect={(id) => {
                            setSelectedPlaceId(id);
                            setShowPlaceDetailSheet(true);
                          }}
                          onToggleVisited={(id) => {
                            setTrip(prev => ({
                              ...prev,
                              placesToVisit: prev.placesToVisit.map(p => p.id === id ? { ...p, visited: !p.visited } : p)
                            }));
                          }}
                          onDelete={handleDeletePlace}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Add a Place Input Field with Comment & Checklist Icons */}
                  <form onSubmit={handleAddCustomPlace} className="relative mb-3">
                    <Plus size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#adb5bd]" />
                    <input
                      type="text"
                      placeholder="Add a place"
                      value={newPlaceInput}
                      onChange={(e) => setNewPlaceInput(e.target.value)}
                      className="w-full bg-white hover:bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl pl-9 pr-20 py-2.5 text-xs font-semibold text-[#212529] outline-none transition-all placeholder:text-[#adb5bd]"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-[#adb5bd]">
                      <button 
                        type="button" 
                        onClick={() => {
                          const targetPlace = trip.sections?.[0]?.places?.[0] || trip.placesToVisit?.[0];
                          if (targetPlace) setActivePlaceNoteModal(targetPlace);
                          else showToast("Add a stop first to attach notes");
                        }} 
                        className="hover:text-blue-600 transition-colors cursor-pointer"
                        title="Add personal visit notes"
                      >
                        <MessageSquare size={14} />
                      </button>
                      <button 
                        type="button" 
                        onClick={() => {
                          const targetPlace = trip.sections?.[0]?.places?.[0] || trip.placesToVisit?.[0];
                          if (targetPlace) setActivePlaceNoteModal(targetPlace);
                          else showToast("Add a stop first to manage subtasks");
                        }} 
                        className="hover:text-blue-600 transition-colors cursor-pointer"
                        title="Manage checklist subtasks"
                      >
                        <CheckSquare size={14} />
                      </button>
                    </div>
                  </form>

                  {/* Recommended Places Chips Carousel (Screenshot 2 Match) */}
                  <div className="mb-6">
                    <span className="text-[11px] font-bold text-[#adb5bd] uppercase tracking-wider block mb-2">
                      RECOMMENDED PLACES
                    </span>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {recommendedPlaces.map((rec) => {
                          const isRecInTrip = (trip.placesToVisit || []).some(x => x.name?.toLowerCase() === rec.name?.toLowerCase() || x.id === rec.id) ||
                            (trip.sections || []).some(s => (s.places || []).some(x => x.name?.toLowerCase() === rec.name?.toLowerCase() || x.id === rec.id));
                          return (
                            <button
                              key={rec.id}
                              onClick={() => {
                                if (!isRecInTrip) {
                                  handleAddPlaceToBucket(rec);
                                } else {
                                  showToast(`${rec.name} is already in your itinerary`);
                                }
                              }}
                              className={`inline-flex items-center gap-2 border rounded-xl pl-1.5 pr-3 py-1 text-xs font-semibold flex-shrink-0 transition-all cursor-pointer group ${
                                isRecInTrip 
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                                  : 'bg-[#f8f9fa] hover:bg-blue-600/10 hover:border-blue-500 border-[#e9ecef] text-[#212529]'
                              }`}
                            >
                              <img src={rec.image} alt={rec.name} className="w-5 h-5 rounded-lg object-cover" />
                              <span>{rec.name}</span>
                              {isRecInTrip ? (
                                <CheckCircle2 size={12} className="text-emerald-600 font-bold" />
                              ) : (
                                <span className="text-xs text-blue-600 font-bold group-hover:scale-125 transition-transform">+</span>
                              )}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                </div>

                {/* ----------------------------------------------------
                    SECTION 5: CUSTOM SUB-LIST (SCREENSHOT 3 MATCH)
                ---------------------------------------------------- */}
                <div className="border-t border-slate-200/80 pt-6">
                  <div className="flex items-center justify-between mb-3">
                    {isEditingCustomListTitle ? (
                      <input
                        type="text"
                        value={customListTitle}
                        onChange={(e) => setCustomListTitle(e.target.value)}
                        onBlur={() => setIsEditingCustomListTitle(false)}
                        autoFocus
                        className="font-bold text-base text-[#212529] border-b border-blue-500 outline-none"
                      />
                    ) : (
                      <h4 
                        onClick={() => setIsEditingCustomListTitle(true)}
                        className="font-bold text-base text-[#212529] flex items-center gap-1.5 cursor-pointer hover:opacity-80"
                      >
                        <span>▾</span>
                        <span>{customListTitle}</span>
                      </h4>
                    )}

                    <div className="flex items-center gap-1 text-[#adb5bd]">
                      <button onClick={() => setIsEditingCustomListTitle(true)} className="p-1 hover:text-[#212529]">
                        <Edit3 size={14} />
                      </button>
                      <button className="p-1 hover:text-[#212529]">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Add a place input for sub-list */}
                  <div className="relative mb-3">
                    <Plus size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#adb5bd]" />
                    <input
                      type="text"
                      placeholder="Add a place"
                      value={newSublistPlaceInput}
                      onChange={(e) => setNewSublistPlaceInput(e.target.value)}
                      className="w-full bg-white hover:bg-slate-50/50 focus:bg-white border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl pl-9 pr-20 py-2.5 text-xs font-semibold text-[#212529] outline-none transition-all placeholder:text-[#adb5bd]"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-[#adb5bd]">
                      <MessageSquare size={14} />
                      <CheckSquare size={14} />
                    </div>
                  </div>

                  {/* Sub-list Recommended Places Chips */}
                  <div className="mb-4">
                    <span className="text-[11px] font-bold text-[#adb5bd] uppercase tracking-wider block mb-2">
                      RECOMMENDED PLACES
                    </span>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {sublistRecommendedPlaces.map((rec, i) => (
                        <button
                          key={i}
                          onClick={() => handleAddPlaceToBucket(rec)}
                          className="inline-flex items-center gap-2 bg-[#f8f9fa] hover:bg-blue-600/10 hover:border-blue-500 border border-[#e9ecef] rounded-xl pl-1.5 pr-3 py-1 text-xs font-semibold text-[#212529] flex-shrink-0 transition-colors cursor-pointer group"
                        >
                          <img src={rec.image} alt="" className="w-5 h-5 rounded-lg object-cover" />
                          <span>{rec.name}</span>
                          <span className="text-xs text-blue-600 font-bold group-hover:scale-125 transition-transform">+</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* + New list Button */}
                  <button
                    onClick={handleAddCustomList}
                    className="text-blue-600 hover:text-blue-800 font-bold text-xs flex items-center gap-1.5 py-1.5 px-3 rounded-xl hover:bg-blue-600/5 transition-colors cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>New list</span>
                  </button>
                </div>

                {/* ----------------------------------------------------
                    SECTION 6: ITINERARY (SCREENSHOT 3 MATCH)
                ---------------------------------------------------- */}
                <div id="itinerary-section" className="border-t border-slate-200/80 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg text-[#212529] flex items-center gap-2">
                      <span>▾</span>
                      <span>Itinerary</span>
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-[#f8f9fa] border border-[#dee2e6] px-2.5 py-1 rounded-lg text-[#495057] font-semibold flex items-center gap-1.5">
                        <Calendar size={13} />
                        <span>10/12 - 10/13</span>
                      </span>
                      <button className="text-[#adb5bd] hover:text-[#495057] p-1">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Day-by-Day Itinerary Sections */}
                  {(trip.sections || []).map((sec, sIdx) => (
                    <div key={sec.id || sIdx} id={sec.id} className="mb-6 pt-4 border-t border-slate-200/80">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-extrabold text-sm text-[#212529] flex items-center gap-1.5">
                            <span>▾</span>
                            <span>{sec.title}</span>
                          </h4>
                          <span className="text-[11px] text-slate-400 font-medium ml-4">
                            {sec.places?.length || 0} scheduled stops
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs">
                          <button 
                            onClick={() => handleOpenOptimizer(sec)}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
                            title="Optimize route using Simulated Quantum Annealing & Graph TSP algorithm"
                          >
                            <Zap size={13} className="text-amber-300 animate-pulse" />
                            <span>Optimize route</span>
                            <span className="text-[9px] bg-white/20 px-1 py-0.5 rounded font-mono font-bold">QUANTUM</span>
                          </button>
                        </div>
                      </div>

                      {/* Day Places List with Manual Reordering & Smart Inter-Stop Travel Leg Connectors (UI/UX Pro Max) */}
                      <div className="space-y-2 mb-3">
                        {(sec.places || []).map((place, pIdx) => (
                          <React.Fragment key={place.id || pIdx}>
                            {/* Smart Inter-Stop Travel Leg Connector */}
                            {pIdx > 0 && (
                              <div className="flex items-center gap-3 my-1.5 pl-3 py-0.5">
                                <div className="flex flex-col items-center ml-2.5">
                                  <div className="w-0.5 h-6 bg-gradient-to-b from-blue-600 via-indigo-500 to-blue-600 rounded-full"></div>
                                </div>
                                <div className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-100 border border-slate-200 px-3 py-1 rounded-full shadow-2xs transition-all text-[11px] font-bold text-slate-700">
                                  <Car size={12} className="text-blue-600" />
                                  <span>{5 + ((pIdx * 6) % 15)} min drive • {(1.1 + ((pIdx * 1.8) % 3.5)).toFixed(1)} km</span>
                                  <span className="text-blue-600/50">•</span>
                                  <span className="text-[10px] text-slate-600/80 font-semibold">Scenic route</span>
                                </div>
                              </div>
                            )}

                            <div 
                              onClick={() => {
                                setSelectedPlaceId(place.id);
                                setShowPlaceDetailSheet(true);
                              }}
                            >
                              <PlaceCard
                                place={place}
                                color={sec.color || (sIdx % 2 === 0 ? '#2563EB' : '#4F46E5')}
                                isSelected={selectedPlaceId === place.id}
                                currencySymbol={currencySymbol}
                                isIncludedInBudget={!excludedPlaceIds.has(place.id)}
                                onSelect={(id) => {
                                  setSelectedPlaceId(id);
                                  setShowPlaceDetailSheet(true);
                                }}
                                onMoveUp={pIdx > 0 ? () => handleMovePlace(sec.id, pIdx, 'up') : null}
                                onMoveDown={pIdx < (sec.places || []).length - 1 ? () => handleMovePlace(sec.id, pIdx, 'down') : null}
                                onToggleVisited={(id) => {
                                  setTrip(prev => ({
                                    ...prev,
                                    sections: prev.sections.map(s => s.id === sec.id ? {
                                      ...s,
                                      places: s.places.map(p => p.id === id ? { ...p, visited: !p.visited } : p)
                                    } : s)
                                  }));
                                }}
                                onDelete={handleDeletePlace}
                              />
                            </div>
                          </React.Fragment>
                        ))}
                      </div>

                      {/* Quick Add Place to Day */}
                      <div className="relative mb-3">
                        <Plus size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#adb5bd]" />
                        <input
                          type="text"
                          placeholder={`Add a stop to ${sec.shortTitle || sec.title}`}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.target.value.trim()) {
                              handleAddNearbyToPlan({
                                name: e.target.value.trim(),
                                category: 'Activity',
                                coords: [trip.center[0] + (Math.random() - 0.5) * 0.03, trip.center[1] + (Math.random() - 0.5) * 0.03],
                                image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80',
                                cost: 15
                              }, sec.id);
                              e.target.value = '';
                            }
                          }}
                          className="w-full bg-[#f8f9fa] border border-[#e9ecef] rounded-xl pl-9 pr-16 py-2 text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>
                  ))}

                </div>

              </div>
            </div>
          )}

          {/* ========================================================
              VIEW 2: DEDICATED BUDGETING VIEW WITH SELECTED PLACES BREAKDOWN
          ======================================================== */}
          {activeView === 'budget' && (
            <div className="p-6 space-y-6">
              
              {/* Back to itinerary pill */}
              <button
                onClick={() => setActiveView('overview')}
                className="text-xs text-blue-600 hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                ← Back to trip overview
              </button>

              {/* Title Header with In/Out Status & "+ Add expense" */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-black text-[#212529]">Budgeting</h2>
                  
                  {/* Status Indicator Pill */}
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs ${
                    isOverBudget 
                      ? 'bg-rose-100 text-rose-700 border border-rose-300' 
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}>
                    {isOverBudget ? (
                      <>
                        <AlertTriangle size={13} className="stroke-[2.5]" />
                        <span>OUT OF BUDGET</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={13} className="stroke-[2.5]" />
                        <span>IN BUDGET</span>
                      </>
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Currency Switcher */}
                  <div className="flex items-center border border-[#dee2e6] rounded-xl p-0.5 text-xs font-bold text-[#495057] bg-white">
                    {['₹', '€', '$'].map((sym) => (
                      <button
                        key={sym}
                        onClick={() => handleCurrencyChange(sym)}
                        className={`px-2.5 py-1 rounded-lg cursor-pointer transition-colors ${
                          currencySymbol === sym ? 'bg-[#212529] text-white' : 'hover:bg-slate-100'
                        }`}
                      >
                        {sym}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsAddExpenseModalOpen(true)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors cursor-pointer shadow-xs flex items-center gap-1"
                  >
                    <Plus size={14} />
                    <span>Add expense</span>
                  </button>
                </div>
              </div>

              {/* 3 Summary Cards: Total Spend, Target Budget, Variance */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* 1. Total Estimated Spend */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4">
                  <span className="text-[11px] font-bold text-[#6c757d] uppercase tracking-wider block mb-1">
                    Total Estimated Cost
                  </span>
                  <div className="text-2xl font-black text-[#212529]">
                    {currencySymbol}{totalTripCost.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-[#495057] mt-1">
                    {plannedPlacesWithCost.filter(p => p.isIncluded).length} places ({currencySymbol}{placesCost.toLocaleString()}) + {expenses.length} expenses
                  </div>
                </div>

                {/* 2. Target Budget Limit (Clickable to edit!) */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 relative group">
                  <span className="text-[11px] font-bold text-[#6c757d] uppercase tracking-wider block mb-1">
                    Trip Budget Limit
                  </span>
                  
                  {isEditingBudgetLimit ? (
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-lg font-bold text-[#212529]">{currencySymbol}</span>
                      <input
                        type="number"
                        value={tempBudgetInput}
                        onChange={(e) => setTempBudgetInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const val = parseFloat(tempBudgetInput);
                            if (!isNaN(val)) setBudgetLimit(val);
                            setIsEditingBudgetLimit(false);
                          }
                        }}
                        onBlur={() => {
                          const val = parseFloat(tempBudgetInput);
                          if (!isNaN(val)) setBudgetLimit(val);
                          setIsEditingBudgetLimit(false);
                        }}
                        autoFocus
                        className="w-24 bg-white border border-blue-500 rounded-lg px-2 py-0.5 text-base font-extrabold outline-none"
                      />
                    </div>
                  ) : (
                    <div 
                      onClick={() => setIsEditingBudgetLimit(true)}
                      className="text-2xl font-black text-[#212529] flex items-center gap-1 cursor-pointer hover:text-blue-600"
                      title="Click to edit budget"
                    >
                      <span>{currencySymbol}{budgetLimit.toLocaleString()}</span>
                      <Edit3 size={13} className="text-[#adb5bd] group-hover:text-blue-600" />
                    </div>
                  )}

                  <button
                    onClick={() => setIsEditingBudgetLimit(true)}
                    className="text-[10px] font-bold text-blue-600 hover:underline mt-1 block"
                  >
                    Change budget limit
                  </button>
                </div>

                {/* 3. Budget Status & Variance */}
                <div className={`border rounded-2xl p-4 ${
                  isOverBudget 
                    ? 'bg-rose-50/70 border-rose-200' 
                    : 'bg-emerald-50/70 border-emerald-200'
                }`}>
                  <span className={`text-[11px] font-bold uppercase tracking-wider block mb-1 ${
                    isOverBudget ? 'text-rose-700' : 'text-emerald-700'
                  }`}>
                    {isOverBudget ? 'Over Budget' : 'Remaining Budget'}
                  </span>
                  <div className={`text-2xl font-black ${
                    isOverBudget ? 'text-rose-700' : 'text-emerald-700'
                  }`}>
                    {isOverBudget ? '-' : '+'}{currencySymbol}{Math.abs(remainingBudget).toLocaleString()}
                  </div>
                  <div className={`text-[10px] font-semibold mt-1 ${
                    isOverBudget ? 'text-rose-600' : 'text-emerald-600'
                  }`}>
                    {isOverBudget 
                      ? `Exceeded limit by ${(budgetUsagePercent - 100)}%` 
                      : `${budgetUsagePercent}% of budget used`}
                  </div>
                </div>

              </div>

              {/* Visual Health Progress Bar */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4">
                <div className="flex items-center justify-between text-xs font-bold text-[#495057] mb-2">
                  <span>Budget Utilization ({budgetUsagePercent}%)</span>
                  <span>{currencySymbol}{totalTripCost.toLocaleString()} / {currencySymbol}{budgetLimit.toLocaleString()}</span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden relative">
                  <div 
                    className={`h-full transition-all duration-500 rounded-full ${
                      isOverBudget 
                        ? 'bg-gradient-to-r from-amber-500 to-rose-600' 
                        : budgetUsagePercent > 80 
                          ? 'bg-amber-500' 
                          : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, budgetUsagePercent)}%` }}
                  />
                </div>
                
                {isOverBudget && (
                  <p className="text-xs text-rose-600 font-semibold mt-2.5 flex items-center gap-1.5">
                    <AlertTriangle size={14} className="stroke-[2.5]" />
                    <span>Your selected places exceed the budget by {currencySymbol}{Math.abs(remainingBudget).toLocaleString()}. Consider unchecking optional places below or raising your budget target.</span>
                  </p>
                )}
              </div>

              {/* Sub-actions Row (Screenshot 4 Match) */}
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-[#495057]">
                <button 
                  onClick={() => setShowBudgetBreakdown(!showBudgetBreakdown)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 cursor-pointer"
                >
                  <PieChart size={13} />
                  <span>{showBudgetBreakdown ? "Hide chart breakdown" : "View breakdown"}</span>
                </button>

                <button 
                  onClick={() => {
                    const count = prompt("How many tripmates are sharing costs?", tripmatesCount);
                    if (count && !isNaN(parseInt(count))) {
                      setTripmatesCount(parseInt(count));
                      showToast(`Splitting costs among ${parseInt(count)} tripmates`);
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 cursor-pointer"
                >
                  <UserPlus size={13} />
                  <span>Split ({tripmatesCount} tripmates)</span>
                </button>

                <button 
                  onClick={() => {
                    const lim = prompt(`Enter new trip budget target in ${currencySymbol}:`, budgetLimit);
                    if (lim && !isNaN(parseFloat(lim))) {
                      setBudgetLimit(parseFloat(lim));
                      showToast(`Budget limit updated to ${currencySymbol}${parseFloat(lim).toLocaleString()}`);
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 cursor-pointer"
                >
                  <SlidersHorizontal size={13} />
                  <span>Set budget</span>
                </button>

                <button 
                  onClick={() => setIsGroupSplitModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 cursor-pointer"
                >
                  <Scale size={13} />
                  <span>Group balances ({currencySymbol}${(totalTripCost / tripmatesCount).toFixed(0)}/person)</span>
                </button>
              </div>

              {/* Category Breakdown Card */}
              {showBudgetBreakdown && (
                <div className="bg-white rounded-2xl p-4 border border-slate-200 animate-in fade-in duration-200">
                  <h5 className="font-bold text-xs text-[#212529] mb-3">Expenses by Category</h5>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200 font-bold">
                      <span className="text-[#212529]">Planned Places & Activities ({plannedPlacesWithCost.filter(p => p.isIncluded).length})</span>
                      <span className="text-blue-600">{currencySymbol}{placesCost.toLocaleString()} ({totalTripCost > 0 ? Math.round((placesCost / totalTripCost) * 100) : 0}%)</span>
                    </div>
                    {['Food & Drinks', 'Transport', 'Lodging', 'Shopping', 'Other'].map((cat) => {
                      const catTotal = expenses
                        .filter(e => e.category === cat)
                        .reduce((sum, e) => sum + e.amount, 0);
                      const pct = totalTripCost > 0 ? (catTotal / totalTripCost) * 100 : 0;
                      return (
                        <div key={cat} className="flex items-center justify-between">
                          <span className="text-[#495057]">{cat}</span>
                          <span className="font-bold text-[#212529]">{currencySymbol}{catTotal.toFixed(2)} ({pct.toFixed(0)}%)</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ========================================================
                  SECTION A: PLANNED PLACES COST BREAKDOWN TABLE
              ======================================================== */}
              <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-4 shadow-xs">
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#f1f3f5]">
                  <div>
                    <h4 className="font-bold text-sm text-[#212529]">
                      Planned Places & Admission Costs ({plannedPlacesWithCost.length} places)
                    </h4>
                    <p className="text-[11px] text-[#6c757d]">
                      Check or uncheck places to see how they impact your budget in real time
                    </p>
                  </div>
                  <span className="text-sm font-black text-blue-600">
                    {currencySymbol}{placesCost.toLocaleString()}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {plannedPlacesWithCost.map((place) => (
                    <div 
                      key={place.id}
                      className={`flex items-center justify-between p-2.5 rounded-xl border transition-colors ${
                        place.isIncluded 
                          ? 'bg-white border-slate-200/90' 
                          : 'bg-slate-100/40 border-slate-200/50 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Checkbox to include/exclude in budget */}
                        <input
                          type="checkbox"
                          checked={place.isIncluded}
                          onChange={() => handleTogglePlaceInBudget(place.id)}
                          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                          title={place.isIncluded ? "Uncheck to exclude from budget" : "Check to include in budget"}
                        />

                        {/* Thumbnail */}
                        <img 
                          src={place.image} 
                          alt="" 
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                        />

                        <div className="min-w-0">
                          <h5 className="font-bold text-xs text-[#212529] truncate">
                            {place.name}
                          </h5>
                          <div className="flex items-center gap-1.5 text-[10px] text-[#6c757d]">
                            <span>{place.category}</span>
                            <span>•</span>
                            <span className={place.isIncluded ? "text-emerald-700 font-semibold" : "text-slate-400"}>
                              {place.isIncluded ? "Counted in budget" : "Excluded"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0 ml-3">
                        <span className={`font-extrabold text-xs block ${
                          place.isIncluded ? 'text-[#212529]' : 'text-slate-400 line-through'
                        }`}>
                          {place.convertedCost === 0 ? 'Free' : `${currencySymbol}${place.convertedCost.toLocaleString()}`}
                        </span>
                        <span className="text-[10px] text-[#adb5bd]">
                          (€{place.baseEur} base)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ========================================================
                  SECTION B: ADDITIONAL LOGGED EXPENSES (SCREENSHOT 4 MATCH)
              ======================================================== */}
              <div className="border-t border-[#e9ecef] pt-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-sm text-[#212529] flex items-center gap-1">
                    <span>▾</span>
                    <span>Additional Expenses ({expenses.length})</span>
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-[#6c757d] cursor-pointer hover:text-black">
                    <span>Sort: Date (newest first)</span>
                    <ChevronDown size={13} />
                  </div>
                </div>

                {expenses.length === 0 ? (
                  /* Exact Screenshot 4 Empty State */
                  <div className="text-center py-10 px-4 bg-[#f8f9fa] rounded-2xl border border-dashed border-[#dee2e6]">
                    <div className="w-12 h-12 rounded-full bg-slate-200 text-[#6c757d] flex items-center justify-center mx-auto mb-3">
                      <DollarSign size={24} />
                    </div>
                    <h5 className="font-extrabold text-sm text-[#212529] mb-1">
                      You haven’t added any expenses yet.
                    </h5>
                    <p className="text-xs text-[#6c757d] max-w-sm mx-auto mb-4 leading-relaxed">
                      Track food, transport, lodging, and split balances automatically with tripmates.
                    </p>
                    <button
                      onClick={() => setIsAddExpenseModalOpen(true)}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                    >
                      + Add expense
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {expenses.map((exp) => (
                      <div 
                        key={exp.id} 
                        className="p-3 bg-white border border-[#e9ecef] rounded-xl flex items-center justify-between hover:shadow-xs transition-shadow"
                      >
                        <div>
                          <h5 className="font-bold text-xs text-[#212529]">{exp.description}</h5>
                          <div className="flex items-center gap-2 text-[10px] text-[#6c757d] mt-0.5">
                            <span className="bg-slate-100 px-1.5 py-0.5 rounded font-medium">{exp.category}</span>
                            <span>•</span>
                            <span>Paid by {exp.paidBy}</span>
                            <span>•</span>
                            <span>{exp.date}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-black text-sm text-[#212529]">{currencySymbol}{exp.amount.toFixed(2)}</span>
                          <button
                            onClick={() => handleDeleteExpense(exp.id)}
                            className="text-slate-300 hover:text-red-500 transition-colors p-1 cursor-pointer"
                            title="Delete expense"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

        {/* --------------------------------------------------------
            PANEL C: RIGHT INTERACTIVE OPENSTREETMAP (PARIS)
        -------------------------------------------------------- */}
        <div className="flex-1 h-full relative overflow-hidden bg-slate-100">
          
          {/* Floating Journey Graph Quick Switch Button */}
            <button
              onClick={() => setActiveView(activeView === 'graph' ? 'overview' : 'graph')}
              className="absolute top-4 right-4 z-[400] bg-white/95 hover:bg-white text-emerald-900 border border-emerald-300 shadow-md hover:shadow-lg px-3.5 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer hover:scale-103"
              title="Switch between Geographic Map and Topological Journey Graph"
            >
              <Workflow size={14} className="text-emerald-700 animate-pulse" />
              <span>{activeView === 'graph' ? 'Geographic Map View' : 'Journey Graph ↗'}</span>
            </button>

            {/* TripMap with Day Filters */}
            <TripMap
            places={displayedMapPlaces}
            activeDayColor={activeDayId === 'day-2' ? '#059669' : '#1d4ed8'}
            selectedPlaceId={selectedPlaceId}
            onSelectPlace={(id) => {
              setSelectedPlaceId(id);
              setShowPlaceDetailSheet(true);
            }}
            days={days}
            activeDayId={activeDayId}
            onSelectDay={(dayId) => {
              setActiveDayId(dayId);
              showToast(`Switched map to ${days.find(d => d.id === dayId)?.title || 'Selected stops'}`);
            }}
            center={trip.center || [19.4326, -99.1332]}
            zoom={trip.zoom || 12}
            onOpenOptimizer={() => {
              const targetSec = trip.sections?.find(s => s.id === activeDayId) || trip.sections?.[0];
              if (targetSec) {
                handleOpenOptimizer(targetSec);
              } else {
                showToast("Select a day itinerary to optimize its route");
              }
            }}
          />

        {/* Interactive Place Detail Bottom Sheet (Screenshot 5 Match!) */}
          {showPlaceDetailSheet && selectedPlace && (
            <div className="absolute inset-x-0 bottom-0 z-[500] pointer-events-auto">
              <PlaceDetailSheet
                place={selectedPlace}
                onClose={() => setShowPlaceDetailSheet(false)}
                onAskAi={handleAskAiQuestion}
                currencySymbol={currencySymbol}
                isVisited={selectedPlace.visited}
                onToggleVisited={(id) => {
                  setTrip(prev => ({
                    ...prev,
                    placesToVisit: prev.placesToVisit.map(p => p.id === id ? { ...p, visited: !p.visited } : p),
                    sections: prev.sections.map(s => ({
                      ...s,
                      places: s.places.map(p => p.id === id ? { ...p, visited: !p.visited } : p)
                    }))
                  }));
                }}
                onAddToTrip={(p) => {
                  const isAlreadyInTrip = (trip.placesToVisit || []).some(x => x.id === p.id) ||
                    (trip.sections || []).some(s => (s.places || []).some(x => x.id === p.id));
                  if (!isAlreadyInTrip) {
                    handleAddPlaceToBucket(p);
                  } else {
                    showToast(`${p.name} is already in your itinerary`);
                  }
                }}
                isAdded={(trip.placesToVisit || []).some(x => x.id === selectedPlace?.id) ||
                  (trip.sections || []).some(s => (s.places || []).some(x => x.id === selectedPlace?.id))}
              />
            </div>
          )}

          {/* Bottom Right Floating Action Button (Magic Wand) */}
          <button
            onClick={() => {
              setAiPresetPrompt(null);
              setIsAiModalOpen(true);
            }}
            className="absolute bottom-6 right-6 z-[400] w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 hover:scale-105 active:scale-95 text-white flex items-center justify-center shadow-xl transition-all cursor-pointer"
            title="Open AI Assistant"
          >
            <Sparkles size={22} className="animate-spin-slow" />
          </button>

        </div>
        </>
      )}

      </div>

      {/* ========================================================
          3. INTERACTIVE 5-STEP ONBOARDING TOOLTIP TOUR
      ======================================================== */}
      <OnboardingTourModal
        currentStep={tourStep}
        onNext={() => setTourStep(prev => prev < 5 ? prev + 1 : null)}
        onBack={() => setTourStep(prev => prev > 1 ? prev - 1 : 1)}
        onClose={() => setTourStep(null)}
      />

      {/* ========================================================
          4. AI ASSISTANT MODAL
      ======================================================== */}
      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        initialPrompt={aiPresetPrompt}
        onAddPlace={(place) => {
          handleAddPlaceToBucket(place);
          showToast(`Added ${place.name} to Places to visit!`);
        }}
      />

      {/* ========================================================
          5. ADD EXPENSE MODAL (WORKING BUDGET SYSTEM)
      ======================================================== */}
      <AddExpenseModal
        isOpen={isAddExpenseModalOpen}
        onClose={() => setIsAddExpenseModalOpen(false)}
        onSave={handleSaveExpense}
        currency={currencySymbol}
      />

      {/* ========================================================
          6. CLEAN TRAVEL ITINERARY PDF EXPORT MODAL
      ======================================================== */}
      {/* Edit Travel Dates Modal */}
      {isEditingDatesModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                  <Calendar size={18} />
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-wider">Change Travel Dates</h3>
                  <p className="text-xs text-slate-400 font-medium">Configure departure and return itinerary schedule</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingDatesModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 focus-within:border-blue-600 focus-within:bg-white transition-all">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Start Date
                    </label>
                    <input
                      type="text"
                      value={tempStartDate}
                      onChange={(e) => setTempStartDate(e.target.value)}
                      placeholder="e.g. 10/1 or 2026-10-12"
                      className="w-full text-xs font-extrabold text-slate-900 bg-transparent outline-none"
                    />
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 focus-within:border-blue-600 focus-within:bg-white transition-all">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      End Date
                    </label>
                    <input
                      type="text"
                      value={tempEndDate}
                      onChange={(e) => setTempEndDate(e.target.value)}
                      placeholder="e.g. 10/10 or 2026-10-16"
                      className="w-full text-xs font-extrabold text-slate-900 bg-transparent outline-none"
                    />
                  </div>
                </div>

                {/* Quick Preset Buttons */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Quick Duration Presets</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: '3 Days Weekend', s: 'Fri 10/12', e: 'Sun 10/14' },
                    { label: '5 Days Gateway', s: 'Mon 10/12', e: 'Fri 10/16' },
                    { label: '7 Days Week', s: '10/12', e: '10/19' },
                    { label: '10 Days Grand Tour', s: '10/1', e: '10/10' }
                  ].map(preset => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setTempStartDate(preset.s);
                        setTempEndDate(preset.e);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setIsEditingDatesModalOpen(false)}
                  className="px-4 py-2 text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveTripDates}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-colors cursor-pointer font-extrabold"
                >
                  Apply Dates
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ExportPdfModal
        isOpen={isExportPdfOpen}
        onClose={() => setIsExportPdfOpen(false)}
        tripTitle={tripTitle}
        destination={trip.passedDestination || currentDestination}
        dates={`${passedStartDate} - ${passedEndDate}`}
        trip={trip}
        currencySymbol={currencySymbol}
        totalTripCost={totalTripCost}
        budgetLimit={budgetLimit}
        isOverBudget={isOverBudget}
        notesText={notesText}
        expenses={expenses}
      />

      {/* ========================================================
          7. QUANTUM ROUTE OPTIMIZER MODAL (TSP GRAPH ALGORITHM)
      ======================================================== */}
      <RouteOptimizerModal
        isOpen={optimizerModalState.isOpen}
        onClose={() => setOptimizerModalState({ isOpen: false, dayId: null, dayTitle: '', places: [] })}
        dayTitle={optimizerModalState.dayTitle}
        places={optimizerModalState.places}
        onApplyOptimization={handleApplyQuantumOptimization}
      />

      {/* ========================================================
          8. TOAST NOTIFICATIONS
      ======================================================== */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] bg-[#212529] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200 flex items-center gap-2">
          <Check size={14} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
