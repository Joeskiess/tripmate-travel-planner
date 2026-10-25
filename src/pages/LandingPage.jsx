import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Database, 
  Route, 
  Users, 
  Star, 
  Globe, 
  UserPlus, 
  DollarSign, 
  CheckCircle2, 
  ChevronRight, 
  ChevronDown, 
  Menu, 
  X, 
  Compass, 
  Zap, 
  Check, 
  Clock,
  PieChart,
  CloudSun,
  ShieldCheck,
  ArrowUpDown,
  Layers,
  Sparkles,
  Move,
  RefreshCw,
  Eye,
  Sliders
} from 'lucide-react';

// Hero Product Showcase Assets (Exact User Uploaded Reference Images)
import heroDashboardImg from '../assets/hero-dashboard.jpg';
import heroScrapbookImg from '../assets/hero-scrapbook.png';
import tripmateLogo from '../assets/tripmate-logo.png';

// 10 Features Visual Showcase Assets (From Travel Itinerary Architecture)
import tabItineraryImg from '../assets/tab_itinerary.png';
import tabMapImg from '../assets/tab_map.jpg';
import tabRouteImg from '../assets/tab_route.jpg';
import tabBudgetingImg from '../assets/tab_budgeting.jpg';
import tabCollabImg from '../assets/tab_collab.jpg';
import tabFlightImg from '../assets/tab_flight.jpg';
import tabPackingImg from '../assets/tab_packing.jpg';
import tabGuidesImg from '../assets/tab_guides.jpg';
import tabAiImg from '../assets/tab_ai.png';
import tabOfflineImg from '../assets/tab_offline.png';

export default function LandingPage() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchDestination, setSearchDestination] = useState('');
  const [pendingDestination, setPendingDestination] = useState('Switzerland');
  const [datePromptMessage, setDatePromptMessage] = useState('');
  const [travelDates, setTravelDates] = useState('');
  const [startDateInput, setStartDateInput] = useState('');
  const [endDateInput, setEndDateInput] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const applyDatePreset = (daysOffset, durationDays, targetDest = null) => {
    const start = new Date();
    start.setDate(start.getDate() + daysOffset);
    const end = new Date(start);
    end.setDate(end.getDate() + durationDays - 1);

    const sStr = start.toISOString().split('T')[0];
    const eStr = end.toISOString().split('T')[0];
    setStartDateInput(sStr);
    setEndDateInput(eStr);
    
    const options = { month: 'short', day: 'numeric' };
    const sFormatted = start.toLocaleDateString('en-US', options);
    const eFormatted = end.toLocaleDateString('en-US', options);
    setTravelDates(`${sFormatted} - ${eFormatted}`);
    setIsDatePickerOpen(false);

    const finalDest = targetDest || searchDestination.trim() || pendingDestination || 'Switzerland';
    navigate('/plan', { 
      state: { 
        destination: finalDest, 
        rawStartDate: sStr,
        rawEndDate: eStr,
        startDate: sFormatted, 
        endDate: eFormatted 
      } 
    });
  };

  const handleConfirmDatesAndLaunch = () => {
    const targetDest = searchDestination.trim() || pendingDestination || 'Switzerland';
    if (!startDateInput) {
      alert("Please select departure date to plan your itinerary");
      return;
    }
    let eStr = endDateInput;
    if (!eStr || eStr < startDateInput) {
      const s = new Date(startDateInput);
      s.setDate(s.getDate() + 3);
      eStr = s.toISOString().split('T')[0];
      setEndDateInput(eStr);
    }
    const sDate = new Date(startDateInput);
    const eDate = new Date(eStr);
    const options = { month: 'short', day: 'numeric' };
    const sFormatted = sDate.toLocaleDateString('en-US', options);
    const eFormatted = eDate.toLocaleDateString('en-US', options);
    setTravelDates(`${sFormatted} - ${eFormatted}`);
    setIsDatePickerOpen(false);

    navigate('/plan', {
      state: {
        destination: targetDest,
        rawStartDate: startDateInput,
        rawEndDate: eStr,
        startDate: sFormatted,
        endDate: eFormatted
      }
    });
  };

  const handleApplyCustomDates = () => {
    handleConfirmDatesAndLaunch();
  };

  // Interactive Route Optimizer Sandbox State
  const [sandboxNodes, setSandboxNodes] = useState([
    { id: 1, name: 'Zurich Old Town', dist: '3.8 km', order: 1, lat: 47.3769, lng: 8.5417, time: '09:00 AM' },
    { id: 2, name: 'Chapel Bridge & Lucerne', dist: '52.4 km', order: 2, lat: 47.0502, lng: 8.3093, time: '12:30 PM' },
    { id: 3, name: 'Interlaken Harder Kulm', dist: '68.1 km', order: 3, lat: 46.6863, lng: 7.8632, time: '04:00 PM' },
    { id: 4, name: 'Jungfraujoch Sphinx Observatory', dist: '21.5 km', order: 4, lat: 46.5475, lng: 7.9854, time: '06:30 PM' },
  ]);
  const [isOptimized, setIsOptimized] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);

  // Auth modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signup');
  const [emailInput, setEmailInput] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLaunchPlanner = (destination = null) => {
    const dest = destination || searchDestination.trim() || 'Switzerland';
    if (destination) {
      setSearchDestination(destination);
    }
    setPendingDestination(dest);

    // If both dates are confirmed, navigate immediately
    if (startDateInput && endDateInput) {
      const sDate = new Date(startDateInput);
      const eDate = new Date(endDateInput);
      const options = { month: 'short', day: 'numeric' };
      navigate('/plan', {
        state: {
          destination: dest,
          rawStartDate: startDateInput,
          rawEndDate: endDateInput,
          startDate: sDate.toLocaleDateString('en-US', options),
          endDate: eDate.toLocaleDateString('en-US', options)
        }
      });
      return;
    }

    // Otherwise, block navigation and open date picker with destination guidance
    setDatePromptMessage(`Please confirm your travel dates for ${dest} before continuing`);
    setIsDatePickerOpen(true);
  };

  const runSandboxOptimization = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      const sorted = [...sandboxNodes].sort((a, b) => a.order - b.order);
      setSandboxNodes(sorted);
      setIsOptimized(true);
      setIsOptimizing(false);
    }, 600);
  };

  // Popular destination chips (with authentic circular thumbnails)
  const popularChips = [
    { name: 'Bali', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=100&h=100&fit=crop' },
    { name: 'Japan', img: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=100&h=100&fit=crop' },
    { name: 'Switzerland', img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=100&h=100&fit=crop' },
    { name: 'Goa', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=100&h=100&fit=crop' }
  ];

  // ==========================================
  // 10 CORE FEATURES INTERACTIVE SHOWCASE STATE
  // (Derived from Travel Itinerary Architecture & Zip Reference)
  // ==========================================
  const [activeFeatureTab, setActiveFeatureTab] = useState(0);

  // Interactive Live Weather Demo State (OpenWeatherMap)
  const [weatherCity, setWeatherCity] = useState('Zurich');
  const [weatherData, setWeatherData] = useState({
    city: 'Zurich',
    country: 'CH',
    temp: 14,
    condition: 'Partly Cloudy',
    humidity: 62,
    wind: 11,
    icon: '⛅'
  });

  const weatherPresets = [
    { city: 'Zurich', country: 'CH', temp: 14, condition: 'Alpine Breeze', humidity: 58, wind: 9, icon: '⛅' },
    { city: 'Paris', country: 'FR', temp: 17, condition: 'Clear Sky', humidity: 65, wind: 12, icon: '☀️' },
    { city: 'Tokyo', country: 'JP', temp: 21, condition: 'Mild Spring', humidity: 70, wind: 8, icon: '🌸' },
    { city: 'Goa', country: 'IN', temp: 29, condition: 'Tropical Sun', humidity: 78, wind: 14, icon: '🌴' }
  ];

  const handleSelectWeatherCity = (preset) => {
    setWeatherCity(preset.city);
    setWeatherData(preset);
  };

  // Interactive Drag & Drop Reorder Schedule Demo State
  const [demoSchedule, setDemoSchedule] = useState([
    { id: 'act-1', time: '09:00 AM', title: 'Gateway of India & Harbor Walk', cat: 'Sightseeing', cost: '$15' },
    { id: 'act-2', time: '01:30 PM', title: 'Marine Drive Waterfront Promenade', cat: 'Sightseeing', cost: '$0' },
    { id: 'act-3', time: '06:00 PM', title: 'Taj Mahal Palace High Tea', cat: 'Food & Dining', cost: '$45' }
  ]);

  const moveDemoScheduleItem = (index, direction) => {
    const newIdx = index + direction;
    if (newIdx < 0 || newIdx >= demoSchedule.length) return;
    const items = [...demoSchedule];
    const temp = items[index];
    items[index] = items[newIdx];
    items[newIdx] = temp;
    setDemoSchedule(items);
  };

  // Interactive Expense Donut Category Filter State
  const [activeExpenseCategory, setActiveExpenseCategory] = useState('all');
  const expenseCategories = [
    { name: 'Sightseeing', amount: 2024, percent: 34, color: '#124C40', badge: '34%' },
    { name: 'Food & Dining', amount: 1450, percent: 24, color: '#2E9E86', badge: '24%' },
    { name: 'Transport', amount: 1800, percent: 30, color: '#D4A373', badge: '30%' },
    { name: 'Lodging', amount: 720, percent: 12, color: '#6B7280', badge: '12%' }
  ];

  // 10 Features Master Specification
  const tenFeaturesList = [
    {
      id: 0,
      num: "01",
      tag: "CORE ITINERARY",
      title: "Interactive Day-by-Day Itinerary Builder",
      summary: "Plan every day of your expedition with precision. Add activities, assign start times, specify locations, and categorize each event with timeline markers.",
      sourceFile: "ItineraryDetails.jsx",
      techBadge: "Spring Boot Entity Cascade",
      icon: Calendar,
      bullets: [
        "Structured day tabs with timestamps and activity markers",
        "Dynamic activity addition with real-time budget calculations",
        "Seamless synchronization with PostgreSQL database"
      ],
      asset: tabItineraryImg,
      ctaText: "Launch Itinerary Planner",
      ctaAction: () => handleLaunchPlanner('Switzerland')
    },
    {
      id: 1,
      num: "02",
      tag: "DRAG & DROP",
      title: "Fluid Drag-and-Drop Activity Scheduling",
      summary: "Reorder stops and change daily timing effortlessly. Powered by @hello-pangea/dnd with smooth physics, tactile handle grabs, and instant persistent updates.",
      sourceFile: "DragDropSchedule.jsx",
      techBadge: "@hello-pangea/dnd Touch-Ready",
      icon: ArrowUpDown,
      bullets: [
        "Tactile drag handle with visual drop indicators",
        "Automatic sequence and schedule re-calculation",
        "Zero-latency state update with backend REST dispatch"
      ],
      asset: tabRouteImg,
      ctaText: "Try Schedule Drag & Drop",
      ctaAction: () => handleLaunchPlanner('Switzerland')
    },
    {
      id: 2,
      num: "03",
      tag: "LIVE CLIMATE",
      title: "Real-Time Weather Intelligence & Forecasts",
      summary: "Never get caught in an alpine storm. Integrated OpenWeatherMap REST service fetches real-time temperatures, sky conditions, wind, and humidity for your destination.",
      sourceFile: "WeatherWidget.jsx & /api/weather",
      techBadge: "OpenWeatherMap REST API",
      icon: CloudSun,
      bullets: [
        "Live temperature (°C/°F), humidity, and wind velocity",
        "Smart weather condition icons with dynamic background tints",
        "Automatic URL encoding for multi-word destination queries"
      ],
      asset: tabItineraryImg,
      ctaText: "Check Destination Weather",
      ctaAction: () => handleLaunchPlanner('Switzerland')
    },
    {
      id: 3,
      num: "04",
      tag: "EXPENSE TRACKING",
      title: "Visual Expense Analytics & Category Budgeting",
      summary: "Keep every dollar accounted for. Interactive Chart.js donut graphs categorize costs across Sightseeing, Food & Dining, Transport, and Lodging with real-time totals.",
      sourceFile: "ExpenseChart.jsx",
      techBadge: "Chart.js Arc Elements",
      icon: PieChart,
      bullets: [
        "Multi-color category breakdown (Sightseeing, Food, Transport, Lodging)",
        "Dynamic total expenditure calculation across all days",
        "Instant reactive chart updates when activities are modified"
      ],
      asset: tabBudgetingImg,
      ctaText: "Open Budget Tracker",
      ctaAction: () => handleLaunchPlanner('Switzerland')
    },
    {
      id: 4,
      num: "05",
      tag: "RELATIONAL BACKEND",
      title: "Spring Boot 3 & PostgreSQL Relational Hub",
      summary: "Production-grade enterprise backend. Connects React on port 5173 to Spring Boot on port 8080 and PostgreSQL on port 5432 with JPA entity relationships and ACID safety.",
      sourceFile: "Backend/TripController.java",
      techBadge: "Spring Boot 3.2 + PostgreSQL 16",
      icon: Database,
      bullets: [
        "Relational mapping: Trip (1) -> (N) Activities with orphan removal",
        "CORS-configured Spring Security with non-blocking REST endpoints",
        "PostgreSQL connection pooling with automated schema migration"
      ],
      asset: tabOfflineImg,
      ctaText: "Explore PostgreSQL Hub",
      ctaAction: () => navigate('/dashboard')
    },
    {
      id: 5,
      num: "06",
      tag: "EXPEDITION MANAGER",
      title: "Active Expeditions & Multi-Trip Management",
      summary: "Seamlessly organize concurrent journeys. Switch between Active Trips and All Expeditions with high-level metric cards showing total trips, destinations, and costs.",
      sourceFile: "TripList.jsx",
      techBadge: "Multi-Trip State Filter",
      icon: Layers,
      bullets: [
        "Active vs All Trips status filtering with count badges",
        "High-level telemetry banner (Total Trips, Active Places, Total Budget)",
        "One-click trip deletion and quick-launch inspection"
      ],
      asset: tabFlightImg,
      ctaText: "View Saved Expeditions",
      ctaAction: () => navigate('/dashboard')
    },
    {
      id: 6,
      num: "07",
      tag: "ROUTE INTELLIGENCE",
      title: "Zero-Backtracking Satellite Route Optimizer",
      summary: "Eliminate wasted travel hours. Intelligent routing algorithms analyze distances between itinerary waypoints to generate the shortest, zero-backtracking sequence.",
      sourceFile: "quantumRouteOptimizer.js",
      techBadge: "Matrix Distance Optimization",
      icon: Route,
      bullets: [
        "Up to 36% reduction in daily driving and transit time",
        "Turn-by-turn route sequencing with waypoint distance badges",
        "Multi-modal transit support (train, driving, walking)"
      ],
      asset: tabRouteImg,
      ctaText: "Run Route Optimizer",
      ctaAction: () => {
        const el = document.getElementById('optimizer');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 7,
      num: "08",
      tag: "COLLABORATION",
      title: "Real-Time Tripmates & Group Planning",
      summary: "Turn group trips from chaotic group chats into harmonious adventures. Invite friends with live collaborator avatars, shared itinerary notes, and activity voting.",
      sourceFile: "TripController.java & AuthModal",
      techBadge: "Multi-User Live Collaboration",
      icon: Users,
      bullets: [
        "Live collaborator avatars with role permissions",
        "Shared expense splitting across tripmates",
        "Co-editing with instant multi-device synchronization"
      ],
      asset: tabCollabImg,
      ctaText: "Invite Tripmates",
      ctaAction: () => {
        setAuthMode('login');
        setIsAuthModalOpen(true);
      }
    },
    {
      id: 8,
      num: "09",
      tag: "GEOGRAPHIC MAPPING",
      title: "Interactive Geographic Map & Landmark Pins",
      summary: "Visualize your entire trip in space. High-fidelity map integration pins every hotel, restaurant, and sightseeing landmark with interactive popups and route lines.",
      sourceFile: "TripMap.jsx",
      techBadge: "Leaflet & Coordinate Pins",
      icon: MapPin,
      bullets: [
        "Interactive zoomable map with custom category markers",
        "Synchronized map bounds that auto-fit all daily stops",
        "Direct transit links with route polylines connecting waypoints"
      ],
      asset: tabMapImg,
      ctaText: "Explore Map View",
      ctaAction: () => handleLaunchPlanner('Switzerland')
    },
    {
      id: 9,
      num: "10",
      tag: "SECURITY & AUTH",
      title: "Secure JWT Traveler Authentication & Session Sync",
      summary: "Peace of mind for your travel data. Clean token-based authentication with persistent localStorage sessions, protected profile attributes, and seamless guest transitions.",
      sourceFile: "AuthModal.jsx & SecurityConfig.java",
      techBadge: "JWT Token-Based Auth",
      icon: ShieldCheck,
      bullets: [
        "Token storage in localStorage with automatic header injection",
        "Instant sign-in / sign-up modal with traveler avatar preview",
        "Secure logout with clean local cache clearing"
      ],
      asset: tabAiImg,
      ctaText: "Sign In / Register",
      ctaAction: () => {
        setAuthMode('signup');
        setIsAuthModalOpen(true);
      }
    }
  ];

  // Curated Expeditions
  const curatedDestinations = [
    {
      city: 'Switzerland (Jungfrau & Lucerne)',
      country: 'Switzerland',
      vibe: 'Alpine Peaks & Panoramic Trains',
      season: 'April - October • Scenic Season',
      temp: '14°C',
      cost: 'CHF 220/day',
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&auto=format&fit=crop&q=80',
      highlights: ['Zurich Old Town', 'Chapel Bridge', 'Interlaken Views', 'Jungfraujoch Glacier']
    },
    {
      city: 'Tokyo',
      country: 'Japan',
      vibe: 'Culture & Modern Gastronomy',
      season: 'March - May • Spring Bloom',
      temp: '21°C',
      cost: '$145/day',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80',
      highlights: ['Senso-ji Temple', 'Tsukiji Market', 'TeamLab Planets', 'Shibuya Sky']
    },
    {
      city: 'Paris',
      country: 'France',
      vibe: 'Art, Architecture & Cafés',
      season: 'April - October • Golden Season',
      temp: '17°C',
      cost: '€180/day',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop&q=80',
      highlights: ['Musée du Louvre', 'Eiffel Tower', 'Montmartre Steps', 'Le Marais Bistros']
    },
    {
      city: 'Amalfi Coast',
      country: 'Italy',
      vibe: 'Coastal Views & Seafood',
      season: 'May - September • Summer Sun',
      temp: '25°C',
      cost: '€210/day',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&auto=format&fit=crop&q=80',
      highlights: ['Positano Cliffside', 'Capri Day Boat', 'Ravello Gardens', 'Path of the Gods']
    },
    {
      city: 'New York City',
      country: 'United States',
      vibe: 'Skyline, Broadway & Museums',
      season: 'September - November • Fall',
      temp: '19°C',
      cost: '$220/day',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&auto=format&fit=crop&q=80',
      highlights: ['Central Park Walk', 'Summit One Vanderbilt', 'High Line & Chelsea', 'Broadway Theatre']
    },
    {
      city: 'Reykjavik',
      country: 'Iceland',
      vibe: 'Hot Springs & Northern Lights',
      season: 'October - March • Aurora',
      temp: '5°C',
      cost: '$190/day',
      image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&auto=format&fit=crop&q=80',
      highlights: ['Blue Lagoon Geothermal', 'Golden Circle Falls', 'Black Sand Beach', 'Aurora Hunt']
    }
  ];

  return (
    <div className="min-h-screen font-sans text-[#17211F] bg-[#F7F5EF] selection:bg-[#124C40]/15 selection:text-[#124C40] antialiased">
      
      {/* ========================================================
          1. EDITORIAL HEADER & BRAND NAVIGATION
      ======================================================== */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#F7F5EF]/95 backdrop-blur-md border-b border-[#E5E2D9] shadow-xs py-3.5' 
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Brand Logo (Official TripMate with Plane Graphic) */}
          <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
            <img 
              src={tripmateLogo} 
              alt="TripMate" 
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-semibold text-[#5A6663]">
            <a href="#destinations" className="hover:text-[#124C40] transition-colors">Destinations</a>
            <a href="#features" className="hover:text-[#124C40] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#124C40] transition-colors">How it works</a>
            <a href="#optimizer" className="hover:text-[#124C40] transition-colors">Pricing</a>
            <Link to="/dashboard" className="hover:text-[#124C40] transition-colors">PostgreSQL Hub</Link>
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/plan/create', { state: { destination: searchDestination || '', inviteOpen: true } })}
              className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-[#5A6663] hover:text-[#17211F] transition-colors cursor-pointer"
            >
              <UserPlus size={15} className="text-[#124C40]" />
              <span>Plan with friends</span>
            </button>

            <button
              onClick={() => {
                if (startDateInput && endDateInput) {
                  handleLaunchPlanner(searchDestination || 'Switzerland');
                } else {
                  navigate('/plan/create', { state: { destination: searchDestination || '' } });
                }
              }}
              className="bg-[#17211F] hover:bg-[#124C40] text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>Get started</span>
              <ArrowRight size={13} />
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-[#5A6663] hover:text-[#17211F] rounded-lg hover:bg-black/5"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-20 z-50 bg-[#F7F5EF] border border-[#E5E2D9] rounded-3xl p-6 shadow-2xl flex flex-col gap-4 text-sm font-bold lg:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <Link to="/plan" onClick={() => setMobileMenuOpen(false)} className="text-[#124C40] flex items-center justify-between">
            <span>Explore Swiss Itinerary</span>
            <ArrowRight size={16} />
          </Link>
          <a href="#destinations" onClick={() => setMobileMenuOpen(false)} className="text-[#5A6663]">Destinations</a>
          <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-[#5A6663]">Features</a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-[#5A6663]">How it works</a>
          <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-[#5A6663] flex items-center gap-2">
            <Database size={15} className="text-[#124C40]" />
            <span>PostgreSQL Database Hub</span>
          </Link>
        </div>
      )}

      {/* ========================================================
          2. MASTER EDITORIAL HERO SECTION (MATCHING REFERENCE 1)
      ======================================================== */}
      <section className="relative pt-6 pb-20 sm:pt-10 sm:pb-28 overflow-x-clip">
        
        {/* Soft Background Photographic Alpine Texture on Right, Fading Smoothly to Ivory on Left */}
        <div 
          className="absolute top-0 right-0 w-full lg:w-3/5 h-full opacity-35 lg:opacity-45 pointer-events-none bg-cover bg-right-top"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1800&auto=format&fit=crop&q=80')",
            maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.85) 60%, black 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.85) 60%, black 100%)"
          }}
        ></div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* ----------------------------------------------------
                LEFT COLUMN: EDITORIAL CONTENT & SEARCH
            ---------------------------------------------------- */}
            <div className="lg:col-span-6 xl:col-span-6 text-left pt-2 lg:pt-4">
              
              {/* Eyebrow */}
              <div className="text-[11px] font-bold tracking-[0.22em] text-[#124C40] uppercase mb-4 sm:mb-5">
                PLAN TOGETHER · TRAVEL BETTER
              </div>

              {/* Master Headline in Sophisticated Serif */}
              <h1 className="font-editorial-serif text-[44px] sm:text-6xl lg:text-[66px] font-bold text-[#17211F] leading-[1.08] tracking-tight mb-5">
                Your next<br />
                adventure,<br />
                <span className="text-[#124C40] relative inline-block">
                  made simple.
                  {/* Subtle hand-drawn curved flourish underline under made simple */}
                  <svg 
                    className="absolute -bottom-1.5 left-0 w-full h-3 text-[#124C40] pointer-events-none" 
                    viewBox="0 0 250 12" 
                    fill="none" 
                    preserveAspectRatio="none"
                  >
                    <path d="M3 8.5C65 3.5 160 2.5 247 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-sm sm:text-base text-[#5A6663] max-w-lg mb-8 leading-relaxed font-normal">
                Build itineraries, find the best routes, track your budget and plan with friends — all in one place.
              </p>

              {/* Destination Search & Date Selector Capsule */}
              <div className="relative max-w-xl mb-4.5 z-30">
                <div className="bg-white rounded-full p-1.5 sm:p-2 pl-3.5 sm:pl-5 pr-1.5 sm:pr-2 border border-[#E5E2D9] shadow-[0_4px_25px_-4px_rgba(23,33,31,0.08)] flex items-center justify-between gap-1.5 sm:gap-3">
                  
                  {/* Destination Input */}
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <MapPin size={16} className="text-[#5A6663] flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Where to? (e.g. Switzerland)"
                      value={searchDestination}
                      onChange={(e) => setSearchDestination(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleLaunchPlanner();
                      }}
                      className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#17211F] outline-none placeholder:text-[#8C9693]"
                    />
                  </div>

                  {/* Vertical Hairline Divider */}
                  <div className="w-px h-5 sm:h-6 bg-[#E5E2D9] flex-shrink-0"></div>

                  {/* Interactive Date Selector */}
                  <button 
                    type="button"
                    onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                    className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 px-2 sm:px-3 py-1.5 rounded-full hover:bg-[#F7F5EF] cursor-pointer text-xs sm:text-sm font-medium text-[#5A6663] hover:text-[#17211F] transition-colors border border-transparent hover:border-[#E5E2D9]"
                    title="Click to enter travel dates"
                  >
                    <Calendar size={15} className={travelDates ? "text-[#124C40]" : "text-[#5A6663]"} />
                    <span className="hidden sm:inline font-semibold text-[#17211F]">{travelDates || "Select dates"}</span>
                    <span className="sm:hidden text-xs font-semibold text-[#17211F]">{travelDates || "Dates"}</span>
                    <ChevronDown size={12} className={`text-[#5A6663] transition-transform ${isDatePickerOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Circular Action Button */}
                  <button
                    onClick={() => handleLaunchPlanner()}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#17211F] hover:bg-[#124C40] text-white flex items-center justify-center transition-all cursor-pointer flex-shrink-0 shadow-sm hover:scale-103"
                    title="Search destination and plan"
                  >
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>

              {/* Interactive Travel Dates Modal - Guaranteed 100% in-frame & responsive */}
              {isDatePickerOpen && (
                <div 
                  className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-150"
                  onClick={() => setIsDatePickerOpen(false)}
                >
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-md bg-white border border-[#E5E2D9] rounded-3xl p-5 sm:p-6 shadow-2xl text-[#17211F] max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150 relative"
                  >
                    <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-[#E5E2D9]/80">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#124C40]/10 flex items-center justify-center text-[#124C40]">
                          <Calendar size={18} />
                        </div>
                        <div>
                          <h4 className="text-sm font-black uppercase tracking-wider text-[#17211F]">Choose Travel Dates</h4>
                          <p className="text-[11px] text-[#73807D] font-medium">Please confirm travel dates before continuing</p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setIsDatePickerOpen(false)} 
                        className="text-[#73807D] hover:text-[#17211F] p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Close modal"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {datePromptMessage && (
                      <div className="mb-4 p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs font-bold text-amber-900 animate-in fade-in">
                        <span className="text-base leading-none mt-0.5">📅</span>
                        <span className="leading-tight">{datePromptMessage}</span>
                      </div>
                    )}

                    {/* Inputs: Departure & Return */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-[#F7F5EF] p-3 rounded-2xl border border-[#E5E2D9] focus-within:border-[#124C40] transition-colors">
                        <label className="text-[10px] font-bold text-[#73807D] uppercase block mb-1">Departure</label>
                        <input 
                          type="date"
                          value={startDateInput}
                          onChange={(e) => setStartDateInput(e.target.value)}
                          className="w-full text-xs font-bold text-[#17211F] bg-transparent outline-none cursor-pointer"
                        />
                      </div>
                      <div className="bg-[#F7F5EF] p-3 rounded-2xl border border-[#E5E2D9] focus-within:border-[#124C40] transition-colors">
                        <label className="text-[10px] font-bold text-[#73807D] uppercase block mb-1">Return</label>
                        <input 
                          type="date"
                          value={endDateInput}
                          min={startDateInput}
                          onChange={(e) => setEndDateInput(e.target.value)}
                          className="w-full text-xs font-bold text-[#17211F] bg-transparent outline-none cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Quick Presets */}
                    <div className="mb-5">
                      <span className="text-[10px] font-bold text-[#73807D] block mb-2 uppercase tracking-wider">Quick Presets</span>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => applyDatePreset(2, 3)}
                          className="py-2.5 px-2 rounded-xl bg-slate-100 hover:bg-[#124C40] hover:text-white text-xs font-bold text-[#5A6663] transition-all text-center cursor-pointer shadow-2xs hover:shadow-xs"
                        >
                          This Weekend
                        </button>
                        <button
                          type="button"
                          onClick={() => applyDatePreset(7, 7)}
                          className="py-2.5 px-2 rounded-xl bg-slate-100 hover:bg-[#124C40] hover:text-white text-xs font-bold text-[#5A6663] transition-all text-center cursor-pointer shadow-2xs hover:shadow-xs"
                        >
                          Next Week (7d)
                        </button>
                        <button
                          type="button"
                          onClick={() => applyDatePreset(14, 10)}
                          className="py-2.5 px-2 rounded-xl bg-slate-100 hover:bg-[#124C40] hover:text-white text-xs font-bold text-[#5A6663] transition-all text-center cursor-pointer shadow-2xs hover:shadow-xs"
                        >
                          Vacation (10d)
                        </button>
                      </div>
                    </div>

                    {/* Popover Action Buttons */}
                    <div className="flex items-center justify-between pt-3.5 border-t border-[#E5E2D9] text-xs font-bold">
                      <button
                        type="button"
                        onClick={() => {
                          setStartDateInput('');
                          setEndDateInput('');
                          setTravelDates('');
                          setIsDatePickerOpen(false);
                        }}
                        className="text-[#73807D] hover:text-[#17211F] px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        Clear Dates
                      </button>
                      <button
                        type="button"
                        onClick={handleConfirmDatesAndLaunch}
                        className="px-5 py-2.5 rounded-xl bg-[#124C40] hover:bg-[#17211F] text-white transition-all cursor-pointer shadow-md flex items-center gap-2 font-bold hover:shadow-lg"
                      >
                        <span>Confirm Dates & Plan</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Compact Destination Chips: Bali, Japan, Switzerland, Goa */}
              <div className="flex flex-wrap items-center gap-2.5 mb-9">
                <span className="text-xs font-semibold text-[#73807D]">Popular right now</span>
                {popularChips.map((chip) => (
                  <button
                    key={chip.name}
                    onClick={() => {
                      setSearchDestination(chip.name);
                      handleLaunchPlanner(chip.name);
                    }}
                    className="bg-white hover:bg-white/90 border border-[#E5E2D9] hover:border-[#124C40]/40 text-[#17211F] pl-1.5 pr-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 shadow-2xs hover:shadow-xs"
                  >
                    <img 
                      src={chip.img} 
                      alt={chip.name} 
                      className="w-5 h-5 rounded-full object-cover flex-shrink-0" 
                    />
                    <span>{chip.name}</span>
                  </button>
                ))}
              </div>

              {/* Small Row of Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-2 border-t border-[#E5E2D9]/70 text-xs text-[#5A6663] font-medium">
                <div className="flex items-center gap-2.5">
                  <Users size={17} className="text-[#124C40]" />
                  <div>
                    <strong className="font-extrabold text-[#17211F] block text-sm leading-tight">50K+</strong>
                    <span>Trips planned</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Star size={17} className="text-[#124C40] fill-[#124C40]" />
                  <div>
                    <strong className="font-extrabold text-[#17211F] block text-sm leading-tight">4.8/5</strong>
                    <span>User rating</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Globe size={17} className="text-[#124C40]" />
                  <div>
                    <strong className="font-extrabold text-[#17211F] block text-sm leading-tight">150+</strong>
                    <span>Destinations</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ----------------------------------------------------
                RIGHT COLUMN: PRODUCT SHOWCASE (IMAGE 2 & IMAGE 3)
            ---------------------------------------------------- */}
            <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end relative mt-4 lg:mt-0">
              
              <div className="relative w-full max-w-[530px] xl:max-w-[570px]">
                
                {/* Main Product Showcase: Isolated Swiss Itinerary, Route Map & Budget Dashboard (Image 2) */}
                <div className="relative rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(18,76,64,0.25)] border border-white/70 bg-white group transition-all duration-300">
                  <img 
                    src={heroDashboardImg} 
                    alt="TripMate Swiss Escape Itinerary Dashboard & Route Map" 
                    className="w-full h-auto object-contain block"
                  />
                </div>

                {/* Decorative Foreground Element: Overlapping Polaroid Travel Scrapbook Collage (Image 3) */}
                <div className="absolute -bottom-4 sm:-bottom-6 left-0 sm:-left-6 w-[88%] sm:w-[80%] max-w-[440px] z-20 pointer-events-none drop-shadow-[0_16px_30px_rgba(23,33,31,0.22)] transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src={heroScrapbookImg} 
                    alt="Travel Scrapbook Collage — Good Places, Better People" 
                    className="w-full h-auto object-contain block"
                  />
                </div>

              </div>

            </div>

          </div>
        </div>

      </section>

      {/* ========================================================
          3. "HOW IT WORKS" CURVED SECTION (EXACT MATCH REFERENCE 1)
      ======================================================== */}
      <section className="bg-white rounded-t-[40px] sm:rounded-t-[56px] pt-16 pb-20 sm:pt-20 sm:pb-24 shadow-[0_-10px_35px_-10px_rgba(23,33,31,0.05)] border-t border-[#EAE7DF]" id="how-it-works">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          
          <div className="text-left mb-12 sm:mb-14">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#124C40] uppercase block mb-2">
              HOW IT WORKS
            </span>
            <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#17211F] tracking-tight">
              From idea to itinerary in minutes.
            </h2>
          </div>

          {/* 4 Linear Steps with Crisp Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            {/* Step 1 */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-[#EBF4F0] text-[#124C40] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Search size={18} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#17211F] mb-1">1. Choose a destination</h4>
                <p className="text-xs text-[#5A6663] leading-relaxed">
                  Search or get inspired by trending trips and curated city guides.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-[#EBF4F0] text-[#124C40] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Users size={18} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#17211F] mb-1">2. Plan together</h4>
                <p className="text-xs text-[#5A6663] leading-relaxed">
                  Add places, reorder days, and invite friends to collaborate live.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-[#EBF4F0] text-[#124C40] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Route size={18} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#17211F] mb-1">3. Optimize your route</h4>
                <p className="text-xs text-[#5A6663] leading-relaxed">
                  Get the best routes and travel times calculated automatically.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-[#EBF4F0] text-[#124C40] flex items-center justify-center flex-shrink-0 mt-0.5">
                <DollarSign size={18} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#17211F] mb-1">4. Track your budget</h4>
                <p className="text-xs text-[#5A6663] leading-relaxed">
                  Keep expenses in check and split costs with tripmates easily.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          4. 10 CORE FEATURES SHOWCASE (FROM TRAVEL ITINERARY ARCHITECTURE)
      ======================================================== */}
      <section className="py-20 sm:py-28 bg-[#F7F5EF] border-t border-[#E5E2D9]" id="features">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          
          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-14 text-left">
            <span className="text-[11px] font-bold tracking-[0.22em] text-[#124C40] uppercase block mb-3">
              COMPREHENSIVE ITINERARY PLATFORM · 10 INTEGRATED CAPABILITIES
            </span>
            <h2 className="font-editorial-serif text-3xl sm:text-5xl font-bold text-[#17211F] tracking-tight leading-[1.15] mb-4">
              Everything you need to plan, organize, and travel.
            </h2>
            <p className="text-sm sm:text-base text-[#5A6663] leading-relaxed">
              Built from our complete Spring Boot & React architecture: drag-and-drop daily schedules, 
              live OpenWeatherMap forecasts, Chart.js budget analytics, zero-backtracking routes, 
              and PostgreSQL 16 relational persistence.
            </p>
          </div>

          {/* 10-Feature Horizontal Tab Switcher Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 mb-8 no-scrollbar scroll-smooth">
            {tenFeaturesList.map((feat) => {
              const IconComponent = feat.icon;
              const isActive = activeFeatureTab === feat.id;
              return (
                <button
                  key={feat.id}
                  onClick={() => setActiveFeatureTab(feat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#124C40] text-white shadow-sm ring-2 ring-[#124C40]/25'
                      : 'bg-white text-[#5A6663] hover:text-[#17211F] border border-[#E5E2D9] hover:border-[#124C40]/40'
                  }`}
                >
                  <IconComponent size={14} className={isActive ? 'text-white' : 'text-[#124C40]'} />
                  <span>{feat.num}. {feat.title.split(' ')[0]} {feat.title.split(' ')[1]}</span>
                </button>
              );
            })}
          </div>

          {/* Active Feature Interactive Showcase Deck */}
          {(() => {
            const current = tenFeaturesList[activeFeatureTab];
            const IconComp = current.icon;

            return (
              <div className="bg-white rounded-3xl sm:rounded-[36px] p-6 sm:p-10 lg:p-12 border border-[#E5E2D9] shadow-sm transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Left Column: Feature Specifications & Live Mini Demo */}
                  <div className="lg:col-span-6 text-left">
                    
                    {/* Category & Tech Header Badges */}
                    <div className="flex flex-wrap items-center gap-2.5 mb-4">
                      <span className="bg-[#EBF4F0] text-[#124C40] font-mono font-bold text-xs px-3 py-1 rounded-full">
                        FEATURE {current.num} / 10
                      </span>
                      <span className="bg-[#F7F5EF] text-[#5A6663] font-mono text-[11px] px-2.5 py-1 rounded-md border border-[#E5E2D9]">
                        {current.techBadge}
                      </span>
                      <span className="text-[#8C9693] font-mono text-[11px] hidden sm:inline">
                        ref: {current.sourceFile}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="font-editorial-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#17211F] leading-tight mb-3">
                      {current.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-sm text-[#5A6663] leading-relaxed mb-6 font-normal">
                      {current.summary}
                    </p>

                    {/* Bullets */}
                    <ul className="space-y-2.5 mb-7">
                      {current.bullets.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-[#17211F]">
                          <CheckCircle2 size={16} className="text-[#124C40] flex-shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* ===================================================
                        DYNAMIC EMBEDDED MINI-DEMO PER FEATURE
                    =================================================== */}
                    <div className="bg-[#F7F5EF] rounded-2xl p-4 sm:p-5 border border-[#E5E2D9] mb-6">
                      
                      {/* Mini Demo 0: Day-by-Day Itinerary Builder */}
                      {current.id === 0 && (
                        <div>
                          <div className="flex items-center justify-between text-xs font-bold text-[#17211F] mb-3">
                            <span className="flex items-center gap-1.5">
                              <Calendar size={14} className="text-[#124C40]" />
                              <span>Live Day 1 Itinerary Timeline (Zurich)</span>
                            </span>
                            <span className="text-[10px] text-[#124C40] font-mono">3 Activities Scheduled</span>
                          </div>
                          <div className="space-y-2">
                            <div className="bg-white p-2.5 rounded-xl border border-[#E5E2D9] flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[11px] text-[#124C40] font-bold">09:00 AM</span>
                                <span className="font-semibold text-[#17211F]">Zurich Old Town Walking Tour</span>
                              </div>
                              <span className="bg-[#EBF4F0] text-[#124C40] text-[10px] px-2 py-0.5 rounded font-bold">Sightseeing</span>
                            </div>
                            <div className="bg-white p-2.5 rounded-xl border border-[#E5E2D9] flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[11px] text-[#124C40] font-bold">12:30 PM</span>
                                <span className="font-semibold text-[#17211F]">Fondue Lunch at Kronenhalle</span>
                              </div>
                              <span className="bg-[#FFF4E5] text-[#B45309] text-[10px] px-2 py-0.5 rounded font-bold">Food & Dining</span>
                            </div>
                            <div className="bg-white p-2.5 rounded-xl border border-[#E5E2D9] flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[11px] text-[#124C40] font-bold">03:00 PM</span>
                                <span className="font-semibold text-[#17211F]">Lake Zurich Scenic Boat Cruise</span>
                              </div>
                              <span className="bg-[#EBF4F0] text-[#124C40] text-[10px] px-2 py-0.5 rounded font-bold">Transport</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Mini Demo 1: Drag & Drop Schedule Reordering */}
                      {current.id === 1 && (
                        <div>
                          <div className="flex items-center justify-between text-xs font-bold text-[#17211F] mb-3">
                            <span className="flex items-center gap-1.5">
                              <ArrowUpDown size={14} className="text-[#124C40]" />
                              <span>Tactile Schedule Reorder Sandbox</span>
                            </span>
                            <span className="text-[10px] text-[#5A6663]">Click arrows to reorder stops</span>
                          </div>
                          <div className="space-y-2">
                            {demoSchedule.map((item, idx) => (
                              <div key={item.id} className="bg-white p-2.5 rounded-xl border border-[#E5E2D9] flex items-center justify-between text-xs shadow-2xs">
                                <div className="flex items-center gap-2 min-w-0">
                                  <span className="w-5 h-5 rounded-full bg-[#124C40] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                                    {idx + 1}
                                  </span>
                                  <span className="font-mono text-[10px] text-[#5A6663]">{item.time}</span>
                                  <span className="font-bold text-[#17211F] truncate">{item.title}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => moveDemoScheduleItem(idx, -1)}
                                    disabled={idx === 0}
                                    className="p-1 rounded bg-[#F7F5EF] hover:bg-[#E5E2D9] disabled:opacity-30 cursor-pointer"
                                    title="Move Up"
                                  >
                                    ▲
                                  </button>
                                  <button
                                    onClick={() => moveDemoScheduleItem(idx, 1)}
                                    disabled={idx === demoSchedule.length - 1}
                                    className="p-1 rounded bg-[#F7F5EF] hover:bg-[#E5E2D9] disabled:opacity-30 cursor-pointer"
                                    title="Move Down"
                                  >
                                    ▼
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Mini Demo 2: Live Weather Forecast */}
                      {current.id === 2 && (
                        <div>
                          <div className="flex items-center justify-between text-xs font-bold text-[#17211F] mb-3">
                            <span className="flex items-center gap-1.5">
                              <CloudSun size={15} className="text-[#124C40]" />
                              <span>Live OpenWeather REST Tester</span>
                            </span>
                            <span className="text-[10px] font-mono text-[#124C40]">API: /api/weather</span>
                          </div>
                          
                          {/* City Presets */}
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {weatherPresets.map(p => (
                              <button
                                key={p.city}
                                onClick={() => handleSelectWeatherCity(p)}
                                className={`text-[11px] font-bold px-2.5 py-1 rounded-full cursor-pointer transition-colors ${
                                  weatherCity === p.city 
                                    ? 'bg-[#124C40] text-white' 
                                    : 'bg-white text-[#5A6663] border border-[#E5E2D9]'
                                }`}
                              >
                                {p.city}
                              </button>
                            ))}
                          </div>

                          {/* Live Weather Card */}
                          <div className="bg-white p-3.5 rounded-xl border border-[#E5E2D9] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-3xl">{weatherData.icon}</span>
                              <div>
                                <h5 className="font-extrabold text-sm text-[#17211F]">
                                  {weatherData.city}, {weatherData.country}
                                </h5>
                                <span className="text-xs text-[#5A6663]">{weatherData.condition}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-2xl font-bold font-mono text-[#124C40]">
                                {weatherData.temp}°C
                              </span>
                              <div className="text-[10px] text-[#8C9693] font-mono">
                                Humidity: {weatherData.humidity}% • Wind: {weatherData.wind} km/h
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Mini Demo 3: Expense Chart & Category Budgeting */}
                      {current.id === 3 && (
                        <div>
                          <div className="flex items-center justify-between text-xs font-bold text-[#17211F] mb-2.5">
                            <span className="flex items-center gap-1.5">
                              <PieChart size={14} className="text-[#124C40]" />
                              <span>Live Category Expense Breakdown</span>
                            </span>
                            <span className="font-mono text-xs font-bold text-[#17211F]">Total: $5,994</span>
                          </div>

                          {/* Category Pills */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                            {expenseCategories.map(cat => (
                              <div key={cat.name} className="bg-white p-2 rounded-xl border border-[#E5E2D9] text-center">
                                <span className="text-[10px] font-bold text-[#5A6663] block truncate">{cat.name}</span>
                                <span className="font-extrabold text-xs text-[#17211F] font-mono">${cat.amount}</span>
                                <span className="text-[9px] text-[#124C40] font-bold block">{cat.badge}</span>
                              </div>
                            ))}
                          </div>

                          {/* Visual Multi-Segment Bar */}
                          <div className="w-full h-3 rounded-full overflow-hidden flex bg-gray-200">
                            <div style={{ width: '34%' }} className="bg-[#124C40]" title="Sightseeing: 34%"></div>
                            <div style={{ width: '24%' }} className="bg-[#2E9E86]" title="Food: 24%"></div>
                            <div style={{ width: '30%' }} className="bg-[#D4A373]" title="Transport: 30%"></div>
                            <div style={{ width: '12%' }} className="bg-[#6B7280]" title="Lodging: 12%"></div>
                          </div>
                        </div>
                      )}

                      {/* Mini Demo 4: Spring Boot & PostgreSQL Hub */}
                      {current.id === 4 && (
                        <div>
                          <div className="flex items-center justify-between text-xs font-bold text-[#17211F] mb-3">
                            <span className="flex items-center gap-1.5">
                              <Database size={14} className="text-[#124C40]" />
                              <span>PostgreSQL & Spring Boot Architecture</span>
                            </span>
                            <span className="bg-[#DCEBE3] text-[#124C40] px-2 py-0.5 rounded text-[10px] font-bold">
                              ● Port 8080 Active
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            <div className="bg-white p-2.5 rounded-xl border border-[#E5E2D9]">
                              <span className="text-[10px] font-bold text-[#8C9693] uppercase block">Database Engine</span>
                              <strong className="text-[#17211F] font-mono text-xs">PostgreSQL 16 (Port 5432)</strong>
                              <span className="text-[10px] text-[#5A6663] block mt-0.5">Schema: travel_itinerary</span>
                            </div>
                            <div className="bg-white p-2.5 rounded-xl border border-[#E5E2D9]">
                              <span className="text-[10px] font-bold text-[#8C9693] uppercase block">REST Service</span>
                              <strong className="text-[#17211F] font-mono text-xs">Spring Boot 3.2 (Port 8080)</strong>
                              <span className="text-[10px] text-[#5A6663] block mt-0.5">JPA Cascade + Hibernate</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Mini Demo 5: Active Expeditions Manager */}
                      {current.id === 5 && (
                        <div>
                          <div className="flex items-center justify-between text-xs font-bold text-[#17211F] mb-3">
                            <span className="flex items-center gap-1.5">
                              <Layers size={14} className="text-[#124C40]" />
                              <span>Expedition Filter & Metrics</span>
                            </span>
                            <span className="text-[10px] font-mono text-[#124C40]">3 Expeditions Saved</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="bg-white p-2.5 rounded-xl border border-[#E5E2D9] text-center">
                              <span className="text-[10px] font-bold text-[#8C9693] block">ALL TRIPS</span>
                              <strong className="text-sm font-bold text-[#17211F]">3</strong>
                            </div>
                            <div className="bg-white p-2.5 rounded-xl border border-[#124C40]/40 text-center bg-[#EBF4F0]">
                              <span className="text-[10px] font-bold text-[#124C40] block">ACTIVE</span>
                              <strong className="text-sm font-bold text-[#124C40]">2</strong>
                            </div>
                            <div className="bg-white p-2.5 rounded-xl border border-[#E5E2D9] text-center">
                              <span className="text-[10px] font-bold text-[#8C9693] block">BUDGET SUM</span>
                              <strong className="text-sm font-bold text-[#17211F]">$17,450</strong>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Mini Demo 6: Route Optimizer */}
                      {current.id === 6 && (
                        <div>
                          <div className="flex items-center justify-between text-xs font-bold text-[#17211F] mb-2.5">
                            <span className="flex items-center gap-1.5">
                              <Route size={14} className="text-[#124C40]" />
                              <span>Zero-Backtracking Route Compression</span>
                            </span>
                            <span className="text-[10px] font-bold text-[#124C40] bg-[#DCEBE3] px-2 py-0.5 rounded">
                              36% Less Driving
                            </span>
                          </div>
                          <div className="bg-white p-3 rounded-xl border border-[#E5E2D9] flex items-center justify-between text-xs">
                            <div>
                              <span className="text-[10px] text-[#8C9693] block line-through">Standard Route: 210.4 km (4h 15m)</span>
                              <strong className="text-[#124C40] text-sm">Optimized Route: 145.8 km (2h 40m)</strong>
                            </div>
                            <span className="font-mono text-xs font-bold bg-[#124C40] text-white px-2.5 py-1 rounded-lg">
                              -64.6 km saved
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Mini Demo 7: Group Collaboration */}
                      {current.id === 7 && (
                        <div>
                          <div className="flex items-center justify-between text-xs font-bold text-[#17211F] mb-2.5">
                            <span className="flex items-center gap-1.5">
                              <Users size={14} className="text-[#124C40]" />
                              <span>Live Tripmates Shared Workspace</span>
                            </span>
                            <span className="text-[10px] font-mono text-[#124C40]">3 Collaborators</span>
                          </div>
                          <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#E5E2D9]">
                            <div className="flex items-center -space-x-2">
                              <div className="w-7 h-7 rounded-full bg-[#124C40] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">AV</div>
                              <div className="w-7 h-7 rounded-full bg-[#2E9E86] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">ER</div>
                              <div className="w-7 h-7 rounded-full bg-[#D4A373] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">JM</div>
                            </div>
                            <span className="text-xs text-[#5A6663]">Real-time editing & activity voting</span>
                          </div>
                        </div>
                      )}

                      {/* Mini Demo 8: Geographic Mapping */}
                      {current.id === 8 && (
                        <div>
                          <div className="flex items-center justify-between text-xs font-bold text-[#17211F] mb-2.5">
                            <span className="flex items-center gap-1.5">
                              <MapPin size={14} className="text-[#124C40]" />
                              <span>Interactive Coordinate Markers</span>
                            </span>
                            <span className="text-[10px] font-mono text-[#5A6663]">Leaflet GPS Map</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-[#E5E2D9] flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#124C40]"></span>
                              <span className="font-semibold text-[#17211F]">Zurich (47.37°N, 8.54°E)</span>
                            </div>
                            <span className="text-[10px] font-mono text-[#8C9693]">Marker ID #101</span>
                          </div>
                        </div>
                      )}

                      {/* Mini Demo 9: JWT Authentication */}
                      {current.id === 9 && (
                        <div>
                          <div className="flex items-center justify-between text-xs font-bold text-[#17211F] mb-2.5">
                            <span className="flex items-center gap-1.5">
                              <ShieldCheck size={14} className="text-[#124C40]" />
                              <span>JWT Token Session Security</span>
                            </span>
                            <span className="bg-[#DCEBE3] text-[#124C40] px-2 py-0.5 rounded text-[10px] font-bold">
                              ● Session Verified
                            </span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-[#E5E2D9] font-mono text-[11px] text-[#5A6663] truncate">
                            Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.traveler...
                          </div>
                        </div>
                      )}

                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={current.ctaAction}
                      className="bg-[#17211F] hover:bg-[#124C40] text-white text-xs font-bold px-6 py-3 rounded-full transition-all shadow-xs cursor-pointer flex items-center gap-2"
                    >
                      <span>{current.ctaText}</span>
                      <ArrowRight size={14} />
                    </button>

                  </div>

                  {/* Right Column: Visual Feature Showcase Image */}
                  <div className="lg:col-span-6 flex justify-center">
                    <div className="relative w-full max-w-[500px] rounded-3xl overflow-hidden shadow-lg border border-[#E5E2D9] bg-white group">
                      
                      {/* Top Header Bar on Feature Card */}
                      <div className="bg-[#F7F5EF] px-4 py-2.5 border-b border-[#E5E2D9] flex items-center justify-between text-xs text-[#5A6663]">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/70"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/70"></span>
                          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/70"></span>
                          <span className="text-[11px] font-mono font-bold text-[#17211F] ml-2">TripMate UI / {current.tag}</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#8C9693]">LIVE PREVIEW</span>
                      </div>

                      {/* Feature Asset Image */}
                      <div className="relative h-[320px] sm:h-[380px] bg-slate-100 flex items-center justify-center overflow-hidden">
                        <img 
                          src={current.asset} 
                          alt={current.title} 
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-4 left-4 right-4 text-white text-left pointer-events-none">
                          <span className="bg-[#124C40] text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider mb-1 inline-block">
                            {current.techBadge}
                          </span>
                          <h4 className="font-editorial-serif text-lg font-bold drop-shadow-sm">{current.title}</h4>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            );
          })()}



        </div>
      </section>

      {/* ========================================================
          5. POPULAR DESTINATIONS DIRECTORY
      ======================================================== */}
      <section className="py-20 bg-[#F7F5EF] border-t border-[#E5E2D9]" id="destinations">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#124C40] uppercase block mb-2">
                CURATED EXPEDITIONS
              </span>
              <h2 className="font-editorial-serif text-3xl sm:text-4xl font-bold text-[#17211F] tracking-tight">
                Trending Destinations
              </h2>
            </div>
            <p className="text-sm text-[#5A6663] max-w-md">
              Start with a structured, verified itinerary featuring top sights, scenic routes, and budget breakdowns.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {curatedDestinations.map((exp) => (
              <div 
                key={exp.city}
                className="bg-white rounded-3xl border border-[#E5E2D9] shadow-xs hover:shadow-lg hover:border-[#124C40]/40 transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={exp.image} 
                      alt={exp.city} 
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20"></div>
                    
                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-bold">
                      <span className="bg-white/95 backdrop-blur-md text-[#17211F] px-2.5 py-1 rounded-full text-[10px] uppercase font-bold shadow-2xs">
                        {exp.country}
                      </span>
                      <span className="bg-black/50 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[11px]">
                        🌤️ {exp.temp}
                      </span>
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-xs font-medium text-slate-200">{exp.vibe}</span>
                      <h3 className="text-2xl font-bold leading-tight font-editorial-serif">{exp.city}</h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-[#5A6663]">
                      <span>{exp.season}</span>
                      <span className="font-bold text-[#17211F] font-mono">{exp.cost}</span>
                    </div>

                    <div className="pt-2 border-t border-[#F0EEE6]">
                      <span className="text-[10px] font-bold text-[#8C9693] uppercase tracking-wider block mb-1.5">Includes:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.highlights.slice(0, 3).map(h => (
                          <span key={h} className="text-[11px] font-medium bg-[#F7F5EF] text-[#5A6663] px-2 py-0.5 rounded-md">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleLaunchPlanner(exp.city)}
                    className="w-full bg-[#F7F5EF] hover:bg-[#124C40] hover:text-white text-[#17211F] font-bold text-xs py-2.5 rounded-xl border border-[#E5E2D9] hover:border-transparent transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Plan a trip to {exp.city}</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          5. INTERACTIVE ROUTE OPTIMIZER DEMO
      ======================================================== */}
      <section className="py-20 bg-white border-t border-[#E5E2D9]" id="optimizer">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#124C40] uppercase block mb-2">
              ROUTE INTELLIGENCE
            </span>
            <h2 className="font-editorial-serif text-3xl sm:text-4xl font-bold text-[#17211F] tracking-tight mb-3">
              See how route optimization saves time.
            </h2>
            <p className="text-sm text-[#5A6663]">
              Click the button below to watch the route re-order 4 Switzerland landmarks into the shortest, zero-backtracking sequence.
            </p>
          </div>

          <div className="bg-[#F7F5EF] rounded-3xl p-6 sm:p-8 border border-[#E5E2D9] shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E2D9]">
              <div>
                <h4 className="text-sm font-extrabold text-[#17211F]">Swiss Escape Day 1 Waypoints</h4>
                <p className="text-xs text-[#5A6663]">Stops spread across Zurich, Lucerne, Interlaken and Jungfraujoch</p>
              </div>

              <button
                onClick={runSandboxOptimization}
                disabled={isOptimizing}
                className={`px-5 py-2.5 rounded-full font-bold text-xs transition-all shadow-xs flex items-center gap-2 cursor-pointer ${
                  isOptimized 
                    ? 'bg-[#124C40] text-white' 
                    : 'bg-[#17211F] hover:bg-[#124C40] text-white'
                }`}
              >
                <Zap size={14} className={isOptimizing ? 'animate-spin' : ''} />
                <span>{isOptimizing ? 'Optimizing Waypoints...' : isOptimized ? '✓ Route Optimized' : 'Run Route Optimizer'}</span>
              </button>
            </div>

            {/* Sequence Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {sandboxNodes.map((node, idx) => (
                <div 
                  key={node.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isOptimized 
                      ? 'bg-[#EBF4F0] border-[#124C40]/30 shadow-2xs' 
                      : 'bg-white border-[#E5E2D9]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-7 h-7 rounded-full font-bold text-xs flex items-center justify-center text-white ${
                      isOptimized ? 'bg-[#124C40]' : 'bg-[#17211F]'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="text-[10px] font-mono text-[#8C9693]">{node.dist}</span>
                  </div>
                  <h5 className="font-extrabold text-xs text-[#17211F] truncate">{node.name}</h5>
                  <span className="text-[10px] text-[#5A6663] font-mono mt-1 block">Scheduled: {node.time}</span>
                </div>
              ))}
            </div>

            {/* Stats Footer */}
            <div className="mt-6 pt-4 border-t border-[#E5E2D9] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-6">
                <span className="text-[#5A6663]">Total Distance: <strong className="text-[#17211F]">{isOptimized ? '145.8 km' : '210.4 km'}</strong></span>
                <span className="text-[#5A6663]">Transit Duration: <strong className="text-[#17211F]">{isOptimized ? '2 hrs 40 mins' : '4 hrs 15 mins'}</strong></span>
                {isOptimized && (
                  <span className="text-[#124C40] font-bold bg-[#DCEBE3] px-2.5 py-0.5 rounded-md">
                    ⚡ 36% Less Driving Time
                  </span>
                )}
              </div>

              <Link
                to="/plan"
                state={{ destination: 'Switzerland' }}
                className="text-[#124C40] hover:underline font-bold text-xs flex items-center gap-1"
              >
                <span>Customize in TripMate Planner</span>
                <ChevronRight size={14} />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          6. EDITORIAL CALL TO ACTION
      ======================================================== */}
      <section className="py-20 bg-[#F7F5EF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E5E2D9] shadow-sm text-center">
            
            <div className="max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-[#124C40] block mb-2">
                START PLANNING TODAY
              </span>
              <h2 className="font-editorial-serif text-3xl sm:text-4xl font-bold text-[#17211F] tracking-tight mb-4">
                Ready to plan your next adventure?
              </h2>
              <p className="text-sm sm:text-base text-[#5A6663] leading-relaxed mb-8 font-normal">
                Build your itinerary, optimize daily routes, track budgets, and invite tripmates. Completely free.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    if (startDateInput && endDateInput) {
                      handleLaunchPlanner(searchDestination || 'Switzerland');
                    } else {
                      navigate('/plan/create', { state: { destination: searchDestination || '' } });
                    }
                  }}
                  className="w-full sm:w-auto bg-[#17211F] hover:bg-[#124C40] text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Start planning free</span>
                  <ArrowRight size={15} />
                </button>
                <Link
                  to="/dashboard"
                  className="w-full sm:w-auto bg-[#F7F5EF] hover:bg-[#EAE7DF] text-[#17211F] font-bold text-sm px-6 py-3.5 rounded-full border border-[#E5E2D9] transition-colors"
                >
                  PostgreSQL Hub
                </Link>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#73807D] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#124C40]"></span>
                <span>PostgreSQL 16 Persistence • Multi-Currency • Google Maps Route Support</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          7. CLEAN EDITORIAL FOOTER
      ======================================================== */}
      <footer className="border-t border-[#E5E2D9] py-10 text-xs text-[#5A6663] bg-[#F7F5EF]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img 
              src={tripmateLogo} 
              alt="TripMate" 
              className="h-7 w-auto object-contain"
            />
            <span className="text-[#8C9693]">•</span>
            <span>Plan together, travel better</span>
          </div>

          <div className="flex items-center gap-6 font-semibold">
            <a href="#destinations" className="hover:text-[#124C40] transition-colors">Destinations</a>
            <a href="#features" className="hover:text-[#124C40] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#124C40] transition-colors">How it works</a>
            <Link to="/dashboard" className="hover:text-[#124C40] transition-colors">PostgreSQL Database</Link>
          </div>

          <span className="text-[#8C9693]">© 2026 TripMate. All rights reserved.</span>
        </div>
      </footer>

      {/* ========================================================
          8. AUTH MODAL
      ======================================================== */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#17211F]/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative border border-[#E5E2D9]">
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#8C9693] hover:text-[#17211F] hover:bg-slate-100"
            >
              <X size={18} />
            </button>

            <div className="text-center mb-5">
              <div className="flex justify-center mb-3">
                <img 
                  src={tripmateLogo} 
                  alt="TripMate" 
                  className="h-9 w-auto object-contain"
                />
              </div>
              <h3 className="font-extrabold text-lg text-[#17211F]">
                {authMode === 'signup' ? 'Create Your Account' : 'Welcome to TripMate'}
              </h3>
              <p className="text-xs text-[#5A6663] mt-1">
                Plan itineraries, optimize routes, and travel together
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleLaunchPlanner(); }} className="space-y-3">
              <input
                type="email"
                placeholder="name@example.com"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full bg-[#F7F5EF] border border-[#E5E2D9] rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-[#124C40] transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-[#17211F] hover:bg-[#124C40] text-white font-bold text-xs py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                {authMode === 'signup' ? 'Continue with Email' : 'Log In'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
