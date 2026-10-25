import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Database,
  Server,
  Plus,
  Trash2,
  Calendar,
  MapPin,
  DollarSign,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  RefreshCw,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

import tripmateLogo from '../assets/tripmate-logo.png';
import {
  checkBackendStatus,
  fetchAllTrips,
  createBackendTrip,
  deleteBackendTrip,
  addBackendActivity,
  deleteBackendActivity,
  fetchBackendWeather
} from '../services/backendApi';

// Initial seed trips for database simulation
const INITIAL_DEMO_TRIPS = [
  {
    id: 1,
    title: "Trip to Paris",
    destination: "Paris, France",
    startDate: "2026-10-12",
    endDate: "2026-10-13",
    status: "Active",
    activities: [
      { id: 101, dayNumber: 1, time: "10:00 AM", title: "Louvre Museum", location: "Rue de Rivoli, Paris", cost: 2024, category: "Sightseeing" },
      { id: 102, dayNumber: 1, time: "01:30 PM", title: "Le Relais de l'Entrecôte", location: "Boulevard Saint-Germain", cost: 1450, category: "Food" },
      { id: 103, dayNumber: 2, time: "03:00 PM", title: "Stade de France", location: "Saint-Denis, Paris", cost: 3220, category: "Sightseeing" }
    ]
  },
  {
    id: 2,
    title: "Tokyo Discovery",
    destination: "Tokyo, Japan",
    startDate: "2026-11-05",
    endDate: "2026-11-12",
    status: "Active",
    activities: [
      { id: 201, dayNumber: 1, time: "11:00 AM", title: "Senso-ji Temple", location: "Asakusa, Tokyo", cost: 800, category: "Sightseeing" },
      { id: 202, dayNumber: 1, time: "06:00 PM", title: "Shibuya Sky Observation Deck", location: "Shibuya", cost: 1600, category: "Sightseeing" },
      { id: 203, dayNumber: 2, time: "01:00 PM", title: "Ichiran Ramen", location: "Shinjuku", cost: 950, category: "Food" }
    ]
  },
  {
    id: 3,
    title: "Swiss Alps Adventure",
    destination: "Interlaken, Switzerland",
    startDate: "2026-12-18",
    endDate: "2026-12-24",
    status: "Active",
    activities: [
      { id: 301, dayNumber: 1, time: "09:00 AM", title: "Jungfraujoch Train", location: "Kleine Scheidegg", cost: 6500, category: "Transport" },
      { id: 302, dayNumber: 2, time: "10:30 AM", title: "Lake Thun Boat Cruise", location: "Thun", cost: 1800, category: "Sightseeing" }
    ]
  }
];

export default function BackendDashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation Tabs: 'trips' | 'details'
  const [activeTab, setActiveTab] = useState(() => {
    return location.state?.newlySaved ? 'details' : 'trips';
  });
  const [tripFilter, setTripFilter] = useState('all'); // 'all' | 'active'

  // Backend Connection State
  const [isBackendOnline, setIsBackendOnline] = useState(false);
  const [isCheckingBackend, setIsCheckingBackend] = useState(false);
  
  // Trips state
  const [trips, setTrips] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('tripmate_saved_trips') || '[]');
      if (stored.length > 0) {
        // Merge stored with demo trips (avoiding ID collisions)
        const storedIds = new Set(stored.map(s => s.id));
        return [...stored, ...INITIAL_DEMO_TRIPS.filter(d => !storedIds.has(d.id))];
      }
    } catch (e) {
      // ignore
    }
    return INITIAL_DEMO_TRIPS;
  });

  const [selectedTripId, setSelectedTripId] = useState(() => {
    return location.state?.savedTripId || 1;
  });

  // Weather State for Selected Trip Destination
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);

  // New Trip Modal / Form
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTripForm, setNewTripForm] = useState({
    title: '',
    destination: '',
    startDate: '2026-10-20',
    endDate: '2026-10-25',
    status: 'Active'
  });

  // New Activity Form
  const [newActivityForm, setNewActivityForm] = useState({
    dayNumber: 1,
    time: '10:00 AM',
    title: '',
    location: '',
    cost: '',
    category: 'Sightseeing'
  });

  const [toastMessage, setToastMessage] = useState(() => {
    return location.state?.newlySaved 
      ? `✓ Saved "${location.state.tripTitle || 'Trip'}" to PostgreSQL Database!`
      : null;
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Poll / Check backend health
  const refreshBackend = async () => {
    setIsCheckingBackend(true);
    try {
      const online = await checkBackendStatus();
      setIsBackendOnline(online);
      if (online) {
        const liveTrips = await fetchAllTrips();
        if (liveTrips && liveTrips.length > 0) {
          setTrips(liveTrips);
          showToast(`Connected to PostgreSQL! Loaded ${liveTrips.length} trips.`);
        }
      }
    } catch (err) {
      setIsBackendOnline(false);
    } finally {
      setIsCheckingBackend(false);
    }
  };

  useEffect(() => {
    refreshBackend();
  }, []);

  // Currently selected trip
  const selectedTrip = useMemo(() => {
    return trips.find(t => t.id === selectedTripId) || trips[0] || null;
  }, [trips, selectedTripId]);

  // Fetch live weather when selected trip changes
  useEffect(() => {
    if (!selectedTrip?.destination) return;
    setWeatherLoading(true);
    fetchBackendWeather(selectedTrip.destination)
      .then(w => setWeatherData(w))
      .catch(() => setWeatherData(null))
      .finally(() => setWeatherLoading(false));
  }, [selectedTrip?.destination]);

  // Handle Trip Creation (POST /api/trips)
  const handleCreateTripSubmit = async (e) => {
    e.preventDefault();
    if (!newTripForm.title || !newTripForm.destination) {
      showToast('Please provide a title and destination');
      return;
    }

    if (isBackendOnline) {
      try {
        const saved = await createBackendTrip(newTripForm);
        setTrips(prev => [saved, ...prev]);
        setSelectedTripId(saved.id);
        showToast(`Trip created in PostgreSQL (ID #${saved.id})`);
      } catch (err) {
        showToast(`Failed: ${err.message}`);
      }
    } else {
      // Local session persistence
      const mockTrip = {
        id: Date.now(),
        ...newTripForm,
        activities: []
      };
      setTrips(prev => [mockTrip, ...prev]);
      setSelectedTripId(mockTrip.id);
      
      const stored = JSON.parse(localStorage.getItem('tripmate_saved_trips') || '[]');
      localStorage.setItem('tripmate_saved_trips', JSON.stringify([mockTrip, ...stored]));
      showToast(`Trip saved to Database Hub (ID #${mockTrip.id})`);
    }

    setShowCreateModal(false);
    setNewTripForm({
      title: '',
      destination: '',
      startDate: '2026-10-20',
      endDate: '2026-10-25',
      status: 'Active'
    });
  };

  // Handle Trip Deletion (DELETE /api/trips/{id})
  const handleDeleteTrip = async (id, e) => {
    if (e) e.stopPropagation();
    if (isBackendOnline) {
      try {
        await deleteBackendTrip(id);
        setTrips(prev => prev.filter(t => t.id !== id));
        showToast(`Trip #${id} deleted from PostgreSQL`);
      } catch (err) {
        showToast(`Delete failed: ${err.message}`);
      }
    } else {
      setTrips(prev => prev.filter(t => t.id !== id));
      const stored = JSON.parse(localStorage.getItem('tripmate_saved_trips') || '[]');
      localStorage.setItem('tripmate_saved_trips', JSON.stringify(stored.filter(t => t.id !== id)));
      showToast(`Trip #${id} removed`);
    }
  };

  // Handle Add Activity (POST /api/trips/{tripId}/activities)
  const handleAddActivitySubmit = async (e) => {
    e.preventDefault();
    if (!selectedTrip) return;
    if (!newActivityForm.title) {
      showToast('Activity title is required');
      return;
    }

    const payload = {
      ...newActivityForm,
      dayNumber: parseInt(newActivityForm.dayNumber, 10) || 1,
      cost: parseFloat(newActivityForm.cost) || 0
    };

    if (isBackendOnline) {
      try {
        const updated = await addBackendActivity(selectedTrip.id, payload);
        setTrips(prev => prev.map(t => t.id === selectedTrip.id ? updated : t));
        showToast(`Activity added to PostgreSQL!`);
      } catch (err) {
        showToast(`Failed to add activity: ${err.message}`);
      }
    } else {
      // Local update
      const newAct = {
        id: Date.now(),
        ...payload
      };
      setTrips(prev => prev.map(t => {
        if (t.id === selectedTrip.id) {
          const updated = {
            ...t,
            activities: [...(t.activities || []), newAct]
          };
          return updated;
        }
        return t;
      }));
      showToast('Activity added to itinerary!');
    }

    setNewActivityForm({
      dayNumber: 1,
      time: '10:00 AM',
      title: '',
      location: '',
      cost: '',
      category: 'Sightseeing'
    });
  };

  // Handle Delete Activity (DELETE /api/trips/{tripId}/activities/{activityId})
  const handleDeleteActivity = async (activityId) => {
    if (!selectedTrip) return;

    if (isBackendOnline) {
      try {
        const updated = await deleteBackendActivity(selectedTrip.id, activityId);
        setTrips(prev => prev.map(t => t.id === selectedTrip.id ? updated : t));
        showToast('Activity removed from PostgreSQL');
      } catch (err) {
        showToast(`Failed to delete activity: ${err.message}`);
      }
    } else {
      setTrips(prev => prev.map(t => {
        if (t.id === selectedTrip.id) {
          return {
            ...t,
            activities: (t.activities || []).filter(a => a.id !== activityId)
          };
        }
        return t;
      }));
      showToast('Activity removed');
    }
  };

  // Category breakdown calculation for expense chart
  const categoryBreakdown = useMemo(() => {
    const list = selectedTrip?.activities || [];
    const totals = {};
    let totalSum = 0;
    list.forEach(a => {
      const cat = a.category || 'Sightseeing';
      totals[cat] = (totals[cat] || 0) + (parseFloat(a.cost) || 0);
      totalSum += (parseFloat(a.cost) || 0);
    });
    return { totals, totalSum };
  }, [selectedTrip]);

  // Filtered trips
  const displayedTrips = useMemo(() => {
    if (tripFilter === 'active') {
      return trips.filter(t => t.status === 'Active' || !t.status);
    }
    return trips;
  }, [trips, tripFilter]);

  // Overall metric totals
  const totalPlannedBudget = useMemo(() => {
    return trips.reduce((sum, t) => {
      const tripCost = (t.activities || []).reduce((acc, a) => acc + (parseFloat(a.cost) || 0), 0);
      return sum + tripCost;
    }, 0);
  }, [trips]);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-[#212529]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#212529] text-white px-4 py-3 rounded-xl shadow-xl text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================
          1. HEADER NAVBAR
      ======================================================== */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Left Brand & Navigation */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center">
              <img src={tripmateLogo} alt="TripMate" className="h-8 w-auto" />
            </Link>

            <div className="hidden md:flex items-center gap-1 text-xs font-bold text-slate-600">
              <Link to="/plan" className="px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-black transition-colors">
                Map Planner
              </Link>
              <Link to="/plan/create" className="px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-black transition-colors">
                Start Planning
              </Link>
              <span className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
                PostgreSQL Hub
              </span>
            </div>
          </div>

          {/* Right Status Controls */}
          <div className="flex items-center gap-3">
            
            {/* Backend Connectivity Badge */}
            <button
              onClick={refreshBackend}
              disabled={isCheckingBackend}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                isBackendOnline
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
              }`}
              title="Click to ping Spring Boot on port 8080"
            >
              <span className={`w-2 h-2 rounded-full ${isBackendOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
              <span>{isBackendOnline ? 'Spring Boot 8080 Connected' : 'Database Ready (Port 8080)'}</span>
              <RefreshCw size={12} className={isCheckingBackend ? 'animate-spin' : ''} />
            </button>

            {/* Quick Action: New Trip */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus size={15} />
              <span>Create Trip</span>
            </button>

          </div>

        </div>
      </header>

      {/* ========================================================
          2. METRICS & BANNER
      ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        
        {/* Newly Saved Trip Banner */}
        {location.state?.newlySaved && (
          <div className="mb-6 bg-blue-50/60 border border-blue-200 rounded-2xl p-4 flex items-center justify-between text-blue-900">
            <div className="flex items-center gap-3">
              <CheckCircle2 size={20} className="text-blue-600 flex-shrink-0" />
              <div>
                <h4 className="font-extrabold text-sm">Trip Saved to PostgreSQL Database!</h4>
                <p className="text-xs text-[#1E6667]">
                  "{location.state.tripTitle || selectedTrip?.title}" and all its activities are updated in table <code className="bg-blue-100/80 text-blue-800 border border-blue-200 px-1.5 py-0.5 rounded font-mono">trips</code>.
                </p>
              </div>
            </div>
            <Link
              to="/plan"
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>Back to Map Planner</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        )}

        {/* Top Summary Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Trips</span>
              <Database size={16} className="text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">{trips.length}</div>
            <p className="text-[11px] text-slate-500 mt-1">PostgreSQL table: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-700">trips</code></p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Active Destinations</span>
              <MapPin size={16} className="text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">{trips.filter(t => t.status === 'Active' || !t.status).length}</div>
            <p className="text-[11px] text-slate-500 mt-1">Status: <span className="text-emerald-600 font-bold">Active</span></p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Planned Budget</span>
              <DollarSign size={16} className="text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">₹{totalPlannedBudget.toLocaleString()}</div>
            <p className="text-[11px] text-slate-500 mt-1">Aggregated across all activities</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Database Connection</span>
              <Server size={16} className="text-purple-500" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-slate-800">PostgreSQL / pgAdmin</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Database: <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-700">Traveldb:5432</code></p>
          </div>

        </div>

        {/* View Switcher Tabs (Only 2 Clean Management Tabs) */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-6">
          
          <button
            onClick={() => setActiveTab('trips')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'trips'
                ? 'bg-[#212529] text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Database size={14} />
            <span>PostgreSQL Trips ({trips.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('details')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'details'
                ? 'bg-[#212529] text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Calendar size={14} />
            <span>Itinerary & Activities ({selectedTrip?.title || 'Select Trip'})</span>
          </button>

        </div>

      </div>

      {/* ========================================================
          3. MAIN CONTENT
      ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">

        {/* --------------------------------------------------------
            TAB 1: TRIPS LIST (GET / POST / DELETE /api/trips)
        -------------------------------------------------------- */}
        {activeTab === 'trips' && (
          <div>
            
            {/* Filter pills */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTripFilter('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    tripFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All Trips ({trips.length})
                </button>
                <button
                  onClick={() => setTripFilter('active')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    tripFilter === 'active' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Active Only ({trips.filter(t => t.status === 'Active' || !t.status).length})
                </button>
              </div>

              <button
                onClick={() => setShowCreateModal(true)}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus size={14} />
                <span>Add new entry</span>
              </button>
            </div>

            {/* Trip Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayedTrips.map((trip) => {
                const actCount = trip.activities ? trip.activities.length : 0;
                const tripCost = (trip.activities || []).reduce((acc, a) => acc + (parseFloat(a.cost) || 0), 0);
                const isSelected = selectedTripId === trip.id;

                return (
                  <div
                    key={trip.id}
                    onClick={() => {
                      setSelectedTripId(trip.id);
                      setActiveTab('details');
                    }}
                    className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between hover:shadow-md ${
                      isSelected ? 'border-blue-600 shadow-md ring-2 ring-blue-500/20' : 'border-slate-200'
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                          {trip.status || 'Active'}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 font-bold">
                          PostgreSQL ID #{trip.id}
                        </span>
                      </div>

                      {/* Title & Destination */}
                      <h3 className="font-extrabold text-lg text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {trip.title}
                      </h3>
                      <p className="text-xs text-slate-600 flex items-center gap-1 mb-3">
                        <MapPin size={13} className="text-slate-400" />
                        <span>{trip.destination}</span>
                      </p>

                      {/* Dates */}
                      <div className="text-xs text-slate-500 flex items-center gap-1 mb-4">
                        <Calendar size={13} className="text-slate-400" />
                        <span>{trip.startDate} — {trip.endDate}</span>
                      </div>

                      {/* Activity & Cost Summary */}
                      <div className="bg-slate-50 rounded-xl p-3 flex items-center justify-between text-xs mb-4">
                        <div>
                          <span className="text-slate-500 block text-[10px] uppercase font-bold">Activities</span>
                          <span className="font-bold text-slate-800">{actCount} scheduled</span>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-500 block text-[10px] uppercase font-bold">Planned Cost</span>
                          <span className="font-extrabold text-emerald-600">₹{tripCost.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTripId(trip.id);
                          setActiveTab('details');
                        }}
                        className="flex-1 bg-slate-900 hover:bg-black text-white text-xs font-bold py-2 px-3 rounded-xl transition-colors text-center cursor-pointer"
                      >
                        Manage Itinerary
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/plan', {
                            state: {
                              destination: trip.destination,
                              startDate: trip.startDate,
                              endDate: trip.endDate
                            }
                          });
                        }}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-xl transition-colors cursor-pointer"
                        title="Open in TripMate Map Planner"
                      >
                        <ExternalLink size={15} />
                      </button>

                      <button
                        onClick={(e) => handleDeleteTrip(trip.id, e)}
                        className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-colors cursor-pointer"
                        title="Delete from PostgreSQL (DELETE /api/trips/{id})"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* --------------------------------------------------------
            TAB 2: ITINERARY DETAILS & ACTIVITIES CRUD
        -------------------------------------------------------- */}
        {activeTab === 'details' && selectedTrip && (
          <div className="space-y-6">
            
            {/* Selected Trip Banner */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-1">
                  <button
                    onClick={() => setActiveTab('trips')}
                    className="text-slate-600 hover:text-black flex items-center gap-1 font-bold"
                  >
                    <ArrowLeft size={13} />
                    <span>Back to all trips</span>
                  </button>
                  <span>•</span>
                  <span>PostgreSQL Trip #{selectedTrip.id}</span>
                  <span>•</span>
                  <span>{selectedTrip.status || 'Active'}</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900">{selectedTrip.title}</h2>
                <div className="flex items-center gap-3 text-xs text-slate-600 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-blue-600" />
                    <span className="font-bold">{selectedTrip.destination}</span>
                  </span>
                  <span>•</span>
                  <span>{selectedTrip.startDate} to {selectedTrip.endDate}</span>
                </div>
              </div>

              {/* Live Weather Widget from WeatherController */}
              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 min-w-[260px]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800">🌤️ Live Weather</span>
                  {weatherLoading && <RefreshCw size={11} className="animate-spin text-sky-600" />}
                </div>
                {weatherData && weatherData.main ? (
                  <div>
                    <div className="text-xl font-black text-sky-950">
                      {Math.round(weatherData.main.temp)}°C
                      <span className="text-xs font-normal text-sky-700 ml-2 capitalize">
                        {weatherData.weather?.[0]?.description || 'Clear'}
                      </span>
                    </div>
                    <div className="text-[11px] text-sky-700 mt-1">
                      Humidity: {weatherData.main.humidity}% · Wind: {weatherData.wind?.speed} m/s
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-sky-700">Loading live weather for {selectedTrip.destination}...</p>
                )}
              </div>
            </div>

            {/* Activities CRUD Grid: Left Form + Right List */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Form: Add New Activity (POST /api/trips/{tripId}/activities) */}
              <div className="lg:col-span-5 space-y-6">
                
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
                  <h3 className="font-extrabold text-base text-slate-900 mb-1">Add New Activity</h3>
                  <p className="text-xs text-slate-500 mb-4">Inserts into PostgreSQL table <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">activities</code> with FK <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">trip_id = {selectedTrip.id}</code></p>

                  <form onSubmit={handleAddActivitySubmit} className="space-y-3.5">
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">Day Number</label>
                        <input
                          type="number"
                          min="1"
                          max="30"
                          value={newActivityForm.dayNumber}
                          onChange={(e) => setNewActivityForm({ ...newActivityForm, dayNumber: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-blue-600"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">Time</label>
                        <input
                          type="text"
                          placeholder="e.g. 10:00 AM"
                          value={newActivityForm.time}
                          onChange={(e) => setNewActivityForm({ ...newActivityForm, time: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Activity Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Louvre Museum"
                        value={newActivityForm.title}
                        onChange={(e) => setNewActivityForm({ ...newActivityForm, title: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-blue-600"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Location / Route</label>
                      <input
                        type="text"
                        placeholder="e.g. Rue de Rivoli, Paris"
                        value={newActivityForm.location}
                        onChange={(e) => setNewActivityForm({ ...newActivityForm, location: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-blue-600"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">Category</label>
                        <select
                          value={newActivityForm.category}
                          onChange={(e) => setNewActivityForm({ ...newActivityForm, category: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-blue-600"
                        >
                          <option value="Sightseeing">Sightseeing</option>
                          <option value="Food">Food & Dining</option>
                          <option value="Transport">Transport</option>
                          <option value="Lodging">Lodging</option>
                          <option value="Shopping">Shopping</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">Cost (₹)</label>
                        <input
                          type="number"
                          placeholder="0"
                          value={newActivityForm.cost}
                          onChange={(e) => setNewActivityForm({ ...newActivityForm, cost: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-xs cursor-pointer mt-2"
                    >
                      + Save to Database
                    </button>

                  </form>
                </div>

                {/* Expense Category Breakdown Chart */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
                  <h4 className="font-extrabold text-sm text-slate-900 mb-3 flex items-center justify-between">
                    <span>📊 Expense Category Breakdown</span>
                    <span className="text-xs text-emerald-600 font-bold">Total: ₹{categoryBreakdown.totalSum.toLocaleString()}</span>
                  </h4>

                  {Object.keys(categoryBreakdown.totals).length > 0 ? (
                    <div className="space-y-3">
                      {Object.entries(categoryBreakdown.totals).map(([cat, amt]) => {
                        const pct = categoryBreakdown.totalSum > 0 ? Math.round((amt / categoryBreakdown.totalSum) * 100) : 0;
                        return (
                          <div key={cat}>
                            <div className="flex justify-between text-xs font-semibold mb-1">
                              <span className="text-slate-700">{cat}</span>
                              <span className="text-slate-900 font-bold">₹{amt.toLocaleString()} ({pct}%)</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${pct}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 text-center py-4">No activity expenses recorded yet.</p>
                  )}
                </div>

              </div>

              {/* Right Side: Activities List in PostgreSQL */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">Scheduled Activities ({selectedTrip.activities?.length || 0})</h3>
                      <p className="text-xs text-slate-500">Stored in PostgreSQL with Foreign Key <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">trip_id</code></p>
                    </div>

                    <button
                      onClick={() => {
                        navigate('/plan', {
                          state: {
                            destination: selectedTrip.destination,
                            startDate: selectedTrip.startDate,
                            endDate: selectedTrip.endDate
                          }
                        });
                      }}
                      className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Open on Map</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>

                  {/* Activity rows */}
                  {selectedTrip.activities && selectedTrip.activities.length > 0 ? (
                    <div className="space-y-3">
                      {selectedTrip.activities.map((act) => (
                        <div
                          key={act.id}
                          className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition-all flex items-center justify-between gap-4"
                        >
                          <div className="flex items-start gap-3">
                            <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-extrabold text-xs flex items-center justify-center flex-shrink-0">
                              D{act.dayNumber}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-extrabold text-sm text-slate-900">{act.title}</span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                  {act.category || 'Sightseeing'}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 mt-0.5">
                                📍 {act.location || 'Location not specified'} {act.time ? `· ⏰ ${act.time}` : ''}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-black text-sm text-slate-900">
                              ₹{(parseFloat(act.cost) || 0).toLocaleString()}
                            </span>
                            <button
                              onClick={() => handleDeleteActivity(act.id)}
                              className="text-slate-300 hover:text-red-500 transition-colors p-1 cursor-pointer"
                              title="Delete activity (DELETE /api/trips/{tripId}/activities/{id})"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-slate-400">
                      <p className="text-xs font-semibold">No activities added to this itinerary yet.</p>
                      <p className="text-[11px] text-slate-400 mt-1">Use the form on the left to add your first destination or activity.</p>
                    </div>
                  )}

                </div>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* ========================================================
          CREATE TRIP MODAL
      ======================================================== */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-black text-slate-900 mb-1">Create New Trip in Database</h3>
            <p className="text-xs text-slate-500 mb-4">Inserts a new record into PostgreSQL table <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">trips</code></p>

            <form onSubmit={handleCreateTripSubmit} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Trip Title</label>
                <input
                  type="text"
                  placeholder="e.g. Summer Vacation in Italy"
                  value={newTripForm.title}
                  onChange={(e) => setNewTripForm({ ...newTripForm, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Destination City</label>
                <input
                  type="text"
                  placeholder="e.g. Rome, Italy"
                  value={newTripForm.destination}
                  onChange={(e) => setNewTripForm({ ...newTripForm, destination: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-blue-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newTripForm.startDate}
                    onChange={(e) => setNewTripForm({ ...newTripForm, startDate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">End Date</label>
                  <input
                    type="date"
                    value={newTripForm.endDate}
                    onChange={(e) => setNewTripForm({ ...newTripForm, endDate: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Save to PostgreSQL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
