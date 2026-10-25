import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Calendar, Users, Plus, ChevronDown, Sparkles, MapPin } from 'lucide-react';
import tripmateLogo from '../assets/tripmate-logo.png';

export default function CreateTripPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [destination, setDestination] = useState(() => location.state?.destination || 'Paris, France');
  const [startDate, setStartDate] = useState(() => location.state?.startDate || '2026-10-13');
  const [endDate, setEndDate] = useState(() => location.state?.endDate || '2026-10-16');
  const [isInviteOpen, setIsInviteOpen] = useState(() => !!location.state?.inviteOpen);
  const [inviteEmail, setInviteEmail] = useState('');
  const [tripmates, setTripmates] = useState([]);
  const [visibility, setVisibility] = useState('Friends'); // 'Friends' | 'Public' | 'Only me'
  const [isVisibilityOpen, setIsVisibilityOpen] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);

  const popularDestinations = [
    { city: 'Mexico City', country: 'Mexico', full: 'Mexico City, Mexico' },
    { city: 'Mumbai', country: 'India', full: 'Mumbai, India' },
    { city: 'Paris', country: 'France', full: 'Paris, France' },
    { city: 'Tokyo', country: 'Japan', full: 'Tokyo, Japan' },
    { city: 'New York', country: 'United States', full: 'New York, NY, USA' },
    { city: 'Rome', country: 'Italy', full: 'Rome, Italy' },
    { city: 'London', country: 'United Kingdom', full: 'London, UK' },
    { city: 'Oahu', country: 'Hawaii, USA', full: 'Oahu, Hawaii, USA' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate directly into the trip planner workspace with the chosen destination and dates
    navigate('/plan', { 
      state: { 
        destination: destination || 'Paris, France', 
        startDate, 
        endDate,
        tripmates 
      } 
    });
  };

  const handleAddTripmate = (e) => {
    e.preventDefault();
    if (inviteEmail.trim() && !tripmates.includes(inviteEmail.trim())) {
      setTripmates([...tripmates, inviteEmail.trim()]);
      setInviteEmail('');
      setIsInviteOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 font-sans text-slate-900 flex flex-col justify-between selection:bg-blue-600/20 selection:text-blue-600">
      
      {/* ========================================================
          1. HEADER NAVBAR (EXACT TRIPMATE MATCH)
      ======================================================== */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-4">
          
          {/* Left: Brand Logo & Links */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center">
              <img 
                src={tripmateLogo} 
                alt="TripMate" 
                className="h-[32px] w-auto object-contain"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-[#495057]">
              <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/#features" className="hover:text-blue-600 transition-colors">Travel guides</Link>
              <Link to="/#explore" className="hover:text-blue-600 transition-colors">Hotels</Link>
            </div>
          </div>

          {/* Center Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-4">
            <div className="relative w-full">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#adb5bd]" />
              <input
                type="text"
                placeholder="Explore by destination"
                className="w-full bg-white hover:bg-slate-50 focus:bg-white border border-[#ced4da] focus:border-blue-600 rounded-full pl-9 pr-4 py-2 text-sm outline-none transition-all placeholder:text-[#6c757d]"
              />
            </div>
          </div>

          {/* Right: Auth buttons */}
          <div className="flex items-center gap-3">
            <button className="text-sm font-bold text-slate-900 hover:text-blue-600 px-3 py-2 transition-colors cursor-pointer">
              Log in
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-xs transition-colors cursor-pointer">
              Sign up
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================
          2. MAIN BODY: "Plan a new trip" FORM (SCREENSHOT 1)
      ======================================================== */}
      <main className="flex-1 max-w-[560px] w-full mx-auto px-4 py-16 sm:py-24 flex flex-col items-center">
        
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 text-center mb-8 tracking-tight">
          Plan a new trip
        </h1>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          
          {/* Destination Field with dropdown */}
          <div className="relative">
            <div className="border border-slate-200 rounded-2xl p-3 bg-white focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 transition-all">
              <label className="text-[11px] font-bold text-[#6c757d] block uppercase tracking-wider mb-0.5">
                Where to?
              </label>
              <input
                type="text"
                placeholder="e.g. Paris, Hawaii, Japan"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setShowDestinationSuggestions(true);
                }}
                onFocus={() => setShowDestinationSuggestions(true)}
                className="w-full text-base font-semibold text-slate-900 outline-none placeholder:text-[#adb5bd]"
                required
              />
            </div>

            {/* Suggestions dropdown */}
            {showDestinationSuggestions && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#ced4da] rounded-2xl shadow-xl z-20 overflow-hidden">
                <div className="p-2 text-[11px] font-bold text-[#adb5bd] uppercase tracking-wider">
                  Popular destinations
                </div>
                {popularDestinations.map((d, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setDestination(d.full);
                      setShowDestinationSuggestions(false);
                    }}
                    className="w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-[#f8f9fa] transition-colors cursor-pointer text-sm font-semibold text-slate-900"
                  >
                    <MapPin size={16} className="text-blue-600" />
                    <span>{d.city}</span>
                    <span className="text-xs text-[#adb5bd]">{d.country}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dates Field */}
          <div className="border border-slate-200 rounded-2xl p-3 bg-white focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 transition-all">
            <label className="text-[11px] font-bold text-[#6c757d] block uppercase tracking-wider mb-0.5">
              Dates (optional)
            </label>
            <div className="grid grid-cols-2 gap-2 items-center">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[#adb5bd]" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full text-sm font-semibold text-slate-900 outline-none bg-transparent"
                />
              </div>
              <div className="flex items-center gap-2 border-l border-[#dee2e6] pl-2">
                <Calendar size={16} className="text-[#adb5bd]" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full text-sm font-semibold text-slate-900 outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

          {/* Sub-actions Row: + Invite tripmates & Friends dropdown */}
          <div className="flex items-center justify-between text-xs font-semibold pt-1">
            
            {/* Invite Tripmates Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsInviteOpen(!isInviteOpen)}
                className="text-[#6c757d] hover:text-slate-900 flex items-center gap-1.5 cursor-pointer py-1"
              >
                <Plus size={14} />
                <span>Invite tripmates</span>
                {tripmates.length > 0 && (
                  <span className="bg-blue-600 text-white rounded-full px-1.5 py-0.2 text-[10px]">
                    {tripmates.length}
                  </span>
                )}
              </button>

              {/* Invite Modal Popover */}
              {isInviteOpen && (
                <div className="absolute left-0 top-full mt-2 w-72 bg-white border border-[#ced4da] rounded-2xl p-4 shadow-xl z-20">
                  <h4 className="font-bold text-xs text-slate-900 mb-2">Invite friends to plan together</h4>
                  <div className="flex gap-1.5">
                    <input
                      type="email"
                      placeholder="friend@example.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="flex-1 bg-slate-50 border border-[#ced4da] rounded-xl px-2.5 py-1.5 text-xs outline-none focus:border-blue-600"
                    />
                    <button
                      type="button"
                      onClick={handleAddTripmate}
                      className="bg-blue-600 text-white font-bold text-xs px-3 py-1.5 rounded-xl cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Visibility Dropdown (Friends ▾) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsVisibilityOpen(!isVisibilityOpen)}
                className="text-[#495057] hover:text-slate-900 flex items-center gap-1.5 border border-[#ced4da] rounded-full px-3 py-1 bg-white cursor-pointer"
              >
                <Users size={13} className="text-[#6c757d]" />
                <span>{visibility}</span>
                <ChevronDown size={12} className="text-[#6c757d]" />
              </button>

              {isVisibilityOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-36 bg-white border border-[#ced4da] rounded-xl shadow-lg z-20 overflow-hidden py-1">
                  {['Friends', 'Public', 'Only me'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setVisibility(opt);
                        setIsVisibilityOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-slate-50 text-slate-900"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Big Coral CTA Button: "Start planning" */}
          <div className="pt-6 text-center">
            <button
              type="submit"
              className="bg-[#FA5A46] hover:bg-[#E04835] text-white font-bold text-base px-10 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Start planning</span>
            </button>
          </div>

          {/* Sublink: "Or write a new guide" */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={handleSubmit}
              className="text-xs text-[#6c757d] hover:text-slate-900 hover:underline cursor-pointer"
            >
              Or write a new guide
            </button>
          </div>

        </form>

      </main>

      {/* ========================================================
          3. COMPREHENSIVE FOOTER (SCREENSHOT 1 MATCH)
      ======================================================== */}
      <footer className="bg-[#f8f9fa] border-t border-[#e9ecef] pt-14 pb-10 text-xs text-[#6c757d] mt-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#dee2e6]">
            
            {/* Column 1: Language & Info */}
            <div className="space-y-4">
              <p className="text-xs text-[#6c757d] leading-relaxed">
                Made with 🖤 in SF & more<br />
                © 2026 Travelchime Inc.
              </p>
              <button className="flex items-center gap-1.5 border border-[#ced4da] rounded-full px-3.5 py-1.5 text-xs font-semibold text-[#495057] bg-white">
                <span>文A Change language</span>
                <span>▾</span>
              </button>
            </div>

            {/* Column 2: TripMate */}
            <div>
              <h5 className="font-bold text-sm text-slate-900 mb-3">TripMate</h5>
              <ul className="space-y-2">
                <li><Link to="/plan" className="hover:text-blue-600">Hotels</Link></li>
                <li><Link to="/plan" className="hover:text-blue-600">Road trip planner</Link></li>
                <li><Link to="/plan" className="hover:text-blue-600">Trip planner AI</Link></li>
                <li><Link to="/plan" className="hover:text-blue-600">Plan a trip</Link></li>
                <li><Link to="/plan" className="hover:text-blue-600">Trip planner mobile app</Link></li>
                <li><Link to="/plan" className="hover:text-blue-600">Travel maps</Link></li>
                <li><Link to="/plan" className="hover:text-blue-600">Blog</Link></li>
                <li><Link to="/plan" className="hover:text-blue-600">Report security issue</Link></li>
                <li><Link to="/plan" className="hover:text-blue-600">Terms, Privacy policy & Copyright</Link></li>
                <li><Link to="/plan" className="hover:text-blue-600">Browser extension</Link></li>
                <li><Link to="/plan" className="hover:text-blue-600">Travel budgeting & cost tracking</Link></li>
                <li><Link to="/plan" className="hover:text-blue-600">How to embed a map on your travel blog</Link></li>
              </ul>
            </div>

            {/* Column 3: Guides and resources */}
            <div>
              <h5 className="font-bold text-sm text-slate-900 mb-3">Guides and resources</h5>
              <ul className="space-y-2">
                <li><Link to="/plan" className="hover:text-blue-600">Trip planners by destination</Link></li>
                <li><Link to="/plan" className="hover:text-blue-600">Explore cities and countries</Link></li>
                <li><Link to="/plan" className="hover:text-blue-600">Road trips by destination</Link></li>
                <li><Link to="/plan" className="hover:text-blue-600">Best places to visit by category</Link></li>
                <li><Link to="/plan" className="hover:text-blue-600">Popular search terms by destination</Link></li>
                <li><Link to="/plan" className="hover:text-blue-600">Weather around the world</Link></li>
                <li><Link to="/plan" className="hover:text-blue-600">Travel questions & answers</Link></li>
                <li><Link to="/plan" className="hover:text-blue-600">Travel itinerary guides</Link></li>
                <li><Link to="/plan" className="hover:text-blue-600">Maps of cities and national parks</Link></li>
                <li><Link to="/plan" className="hover:text-blue-600">Destinations at different times of the year</Link></li>
                <li><Link to="/plan" className="hover:text-blue-600">Places to visit by destination</Link></li>
              </ul>
            </div>

            {/* Column 4: Get the app */}
            <div>
              <h5 className="font-bold text-sm text-slate-900 mb-3">Get the app</h5>
              <div className="space-y-2.5">
                <a 
                  href="https://www.apple.com/app-store/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="block p-2.5 rounded-xl border border-[#ced4da] bg-white hover:bg-slate-50 font-bold text-xs text-slate-900"
                >
                   Download on App Store
                </a>
                <a 
                  href="https://play.google.com/store/apps" 
                  target="_blank" 
                  rel="noreferrer"
                  className="block p-2.5 rounded-xl border border-[#ced4da] bg-white hover:bg-slate-50 font-bold text-xs text-slate-900"
                >
                  ▶ Get it on Google Play
                </a>
              </div>
            </div>

          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#adb5bd]">
            <p>© 2026 TripMate · All rights reserved.</p>
          </div>

        </div>
      </footer>

    </div>
  );
}