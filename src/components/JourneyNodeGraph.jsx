import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Workflow, 
  MapPin, 
  Clock, 
  Calendar, 
  Sparkles, 
  Zap, 
  Compass, 
  ArrowRight, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Layers, 
  DollarSign, 
  Utensils, 
  Hotel, 
  Plane, 
  Car, 
  Train, 
  CheckCircle2, 
  MoreHorizontal, 
  ChevronUp, 
  ChevronDown, 
  X, 
  ExternalLink, 
  Search, 
  Plus, 
  Eye, 
  Share2, 
  SlidersHorizontal,
  Info,
  RotateCcw,
  GripVertical,
  Trash2
} from 'lucide-react';

/**
 * Calculates geodesic distance in kilometers between two coordinate pairs
 */
function calculateHaversine(coord1, coord2) {
  if (!coord1 || !coord2 || !Array.isArray(coord1) || !Array.isArray(coord2)) return 1.8;
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const dist = R * c;
  return isNaN(dist) || dist <= 0 ? 1.4 : dist;
}

/**
 * Generates realistic transit estimate based on distance
 */
function getTransitEstimate(distKm) {
  if (distKm < 1.0) {
    const mins = Math.max(3, Math.round(distKm * 15));
    return { mode: 'walk', label: `${(distKm * 1000).toFixed(0)}m • ${mins} min walk`, icon: '🚶' };
  } else if (distKm < 14) {
    const mins = Math.max(6, Math.round(distKm * 2.5 + 4));
    return { mode: 'car', label: `${distKm.toFixed(1)} km • ${mins} min drive`, icon: '🚗' };
  } else {
    const mins = Math.max(15, Math.round(distKm * 1.3 + 8));
    return { mode: 'transit', label: `${distKm.toFixed(1)} km • ${mins} min transit`, icon: '🚇' };
  }
}

/**
 * Maps categories to distinct badge colors and styling
 */
function getCategoryTheme(category = '') {
  const cat = category.toLowerCase();
  if (cat.includes('food') || cat.includes('restaurant') || cat.includes('café') || cat.includes('bistro') || cat.includes('dining')) {
    return {
      name: 'Food & Dining',
      bg: 'bg-amber-50',
      text: 'text-amber-800',
      border: 'border-amber-200',
      dot: 'bg-amber-500',
      icon: Utensils
    };
  }
  if (cat.includes('hotel') || cat.includes('lodging') || cat.includes('stay') || cat.includes('resort')) {
    return {
      name: 'Lodging & Stay',
      bg: 'bg-emerald-50',
      text: 'text-emerald-800',
      border: 'border-emerald-200',
      dot: 'bg-emerald-500',
      icon: Hotel
    };
  }
  if (cat.includes('transit') || cat.includes('airport') || cat.includes('station') || cat.includes('transport')) {
    return {
      name: 'Transit Hub',
      bg: 'bg-purple-50',
      text: 'text-purple-800',
      border: 'border-purple-200',
      dot: 'bg-purple-500',
      icon: Train
    };
  }
  return {
    name: category || 'Sightseeing',
    bg: 'bg-blue-50',
    text: 'text-blue-800',
    border: 'border-blue-200',
    dot: 'bg-blue-500',
    icon: Compass
  };
}

export default function JourneyNodeGraph({
  trip,
  tripStartDate = '10/1',
  tripEndDate = '10/10',
  currencySymbol = '₹',
  currencyRate = 92,
  onSelectPlace,
  onOpenOptimizer,
  onMovePlace,
  onMovePlaceToDay,
  onReorderPlaces,
  onSwitchToOverview,
  onDeletePlace
}) {
  // Graph Canvas View States
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Filtering & Display mode
  const [selectedDayFilter, setSelectedDayFilter] = useState('all'); // 'all' or day.id
  const [includeUnscheduled, setIncludeUnscheduled] = useState(true);
  const [graphLayout, setGraphLayout] = useState('pipeline'); // 'pipeline' | 'constellation'
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [inspectedPlace, setInspectedPlace] = useState(null);
  const [showMetricsOverlay, setShowMetricsOverlay] = useState(true);

  // Drag-and-drop state for cards and drop zones
  const [draggedPlaceInfo, setDraggedPlaceInfo] = useState(null); // { place, sourceDayId, sourceIndex }
  const [dropTarget, setDropTarget] = useState(null); // { dayId, index }
  const [isDraggingNode, setIsDraggingNode] = useState(false);

  // Quick inline add stop state
  const [addingToDayId, setAddingToDayId] = useState(null);
  const [newPlaceName, setNewPlaceName] = useState('');

  const containerRef = useRef(null);

  // Prepare Days data
  const daysList = useMemo(() => {
    return trip?.sections || [];
  }, [trip]);

  // Filtered days based on active filter
  const activeDays = useMemo(() => {
    if (selectedDayFilter === 'all') return daysList;
    return daysList.filter(d => d.id === selectedDayFilter);
  }, [daysList, selectedDayFilter]);

  // Aggregate Journey Statistics across nodes
  const stats = useMemo(() => {
    let totalWaypoints = 0;
    let totalConnections = 0;
    let totalDistanceKm = 0;
    let totalCostEur = 0;

    let previousCoord = null;

    daysList.forEach((day) => {
      const places = day.places || [];
      totalWaypoints += places.length;
      if (places.length > 1) {
        totalConnections += places.length - 1;
      }

      places.forEach((place, idx) => {
        totalCostEur += (place.cost || place.numericCost || 20);
        if (previousCoord && place.coords) {
          totalDistanceKm += calculateHaversine(previousCoord, place.coords);
        }
        if (place.coords) {
          previousCoord = place.coords;
        }
      });
    });

    // Add inter-day transit connections
    if (daysList.length > 1) {
      totalConnections += (daysList.length - 1);
    }

    return {
      waypoints: totalWaypoints,
      connections: totalConnections,
      distanceKm: totalDistanceKm.toFixed(1),
      costFormatted: `${currencySymbol}${Math.round(totalCostEur * currencyRate).toLocaleString()}`,
      estDurationHours: Math.round(totalWaypoints * 2.2 + totalDistanceKm * 0.08)
    };
  }, [daysList, currencySymbol, currencyRate]);

  // Mouse pan event handlers
  const handleMouseDown = (e) => {
    // Only drag when clicking canvas background, not inside interactive buttons or cards
    if (e.target.closest('.interactive-node') || e.target.closest('.interactive-control')) {
      return;
    }
    setIsDraggingCanvas(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDraggingCanvas) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDraggingCanvas(false);
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleZoom = (delta) => {
    setZoomLevel(prev => Math.min(1.8, Math.max(0.6, parseFloat((prev + delta).toFixed(2)))));
  };

  // Node Click handler
  const handleNodeClick = (place) => {
    setInspectedPlace(place);
    if (onSelectPlace) {
      onSelectPlace(place.id);
    }
  };

  // ==========================================================
  // DRAG AND DROP REORDERING & TRANSFER HANDLERS
  // ==========================================================
  const handleDragStart = (e, place, sourceDayId, sourceIndex) => {
    e.stopPropagation();
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', JSON.stringify({ placeId: place.id, sourceDayId, sourceIndex }));
    setDraggedPlaceInfo({ place, sourceDayId, sourceIndex });
    setIsDraggingNode(true);
  };

  const handleDragEnd = () => {
    setDraggedPlaceInfo(null);
    setDropTarget(null);
    setIsDraggingNode(false);
  };

  const handleDragOverCard = (e, dayId, index) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    if (!dropTarget || dropTarget.dayId !== dayId || dropTarget.index !== index) {
      setDropTarget({ dayId, index });
    }
  };

  const handleDragOverColumn = (e, dayId, count) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    if (!dropTarget || dropTarget.dayId !== dayId || dropTarget.index !== count) {
      setDropTarget({ dayId, index: count });
    }
  };

  const handleDropOnSlot = (e, targetDayId, targetIndex) => {
    e.preventDefault();
    e.stopPropagation();
    if (!draggedPlaceInfo) return;
    const { sourceDayId, sourceIndex } = draggedPlaceInfo;

    // Avoid no-op drops
    if (sourceDayId === targetDayId && sourceIndex === targetIndex) {
      setDraggedPlaceInfo(null);
      setDropTarget(null);
      setIsDraggingNode(false);
      return;
    }

    if (onReorderPlaces) {
      onReorderPlaces(sourceDayId, sourceIndex, targetDayId, targetIndex);
    } else if (onMovePlaceToDay) {
      onMovePlaceToDay(sourceDayId, draggedPlaceInfo.place.id, targetDayId);
    }

    setDraggedPlaceInfo(null);
    setDropTarget(null);
    setIsDraggingNode(false);
  };

  // Inline add stop submit
  const handleQuickAddSubmit = (dayId) => {
    if (!newPlaceName.trim()) return;
    const newPlace = {
      id: `graph-p-${Date.now()}`,
      name: newPlaceName.trim(),
      category: 'Sightseeing',
      subtitle: 'Added via Journey Topology Graph',
      rating: 4.8,
      cost: 15,
      coords: [
        (trip.center?.[0] || 48.8566) + (Math.random() - 0.5) * 0.03,
        (trip.center?.[1] || 2.3522) + (Math.random() - 0.5) * 0.03
      ],
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80'
    };
    if (onMovePlaceToDay) {
      onMovePlaceToDay('places-to-visit', newPlace.id, dayId);
    }
    setNewPlaceName('');
    setAddingToDayId(null);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F7F5EF] relative overflow-hidden select-none font-sans">
      
      {/* ========================================================
          1. TOP GRAPH NAVIGATION & METRICS HUD
      ======================================================== */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-6 py-3 flex flex-wrap items-center justify-between gap-4 z-20 shadow-2xs">
        
        {/* Left: Branding & Day Filters */}
        <div className="flex items-center gap-3">
          {onSwitchToOverview && (
            <button
              onClick={onSwitchToOverview}
              className="interactive-control flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold transition-all shadow-2xs cursor-pointer mr-1"
              title="Return to Canvas Studio Itinerary"
            >
              <ArrowRight size={13} className="rotate-180" />
              <span>Canvas Studio</span>
            </button>
          )}

          <div className="flex items-center gap-2 pr-3 border-r border-slate-200">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#124C40] to-emerald-600 flex items-center justify-center text-white shadow-xs">
              <Workflow size={17} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">Journey Topology Graph</h2>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Drag & Drop Connected Network
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                <span>Multi-day waypoint vectors & route flow</span>
                <span className="text-slate-300">•</span>
                <span className="font-bold text-emerald-800 flex items-center gap-1">
                  <Calendar size={11} className="text-emerald-700" />
                  <span>{tripStartDate} - {tripEndDate}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Day Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold interactive-control">
            <button
              onClick={() => setSelectedDayFilter('all')}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                selectedDayFilter === 'all' 
                  ? 'bg-white text-emerald-800 shadow-xs font-extrabold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Days ({daysList.length})
            </button>
            {daysList.map((day, idx) => (
              <button
                key={day.id}
                onClick={() => setSelectedDayFilter(day.id)}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  selectedDayFilter === day.id 
                    ? 'bg-white text-emerald-800 shadow-xs font-extrabold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Day {idx + 1}
              </button>
            ))}
          </div>

          {/* Toggle Unscheduled Bucket */}
          <button
            onClick={() => setIncludeUnscheduled(!includeUnscheduled)}
            className={`interactive-control px-2.5 py-1 rounded-lg border text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
              includeUnscheduled 
                ? 'bg-blue-50 text-blue-700 border-blue-200' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${includeUnscheduled ? 'bg-blue-600 animate-pulse' : 'bg-slate-300'}`}></span>
            <span>Unscheduled Bucket ({trip.placesToVisit?.length || 0})</span>
          </button>
        </div>

        {/* Right: Layout Switcher & Zoom HUD */}
        <div className="flex items-center gap-3">
          
          {/* Layout Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold interactive-control">
            <button
              onClick={() => setGraphLayout('pipeline')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                graphLayout === 'pipeline' 
                  ? 'bg-white text-slate-900 shadow-xs font-extrabold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Sequential multi-day pipeline flow"
            >
              <Layers size={13} />
              <span>Pipeline Flow</span>
            </button>
            <button
              onClick={() => setGraphLayout('constellation')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                graphLayout === 'constellation' 
                  ? 'bg-white text-slate-900 shadow-xs font-extrabold' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Radial constellation network"
            >
              <Compass size={13} />
              <span>Constellation Web</span>
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-2xs interactive-control">
            <button
              onClick={() => handleZoom(-0.15)}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>
            <button
              onClick={handleResetZoom}
              className="px-2 py-1 text-xs font-mono font-bold text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              title="Reset to 100%"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              onClick={() => handleZoom(0.15)}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-600 cursor-pointer border-l border-slate-200 ml-1"
              title="Center Canvas"
            >
              <RotateCcw size={13} />
            </button>
          </div>

          {/* Toggle Metrics Pill */}
          <button
            onClick={() => setShowMetricsOverlay(!showMetricsOverlay)}
            className={`interactive-control p-2 rounded-xl border transition-colors cursor-pointer ${
              showMetricsOverlay ? 'bg-[#124C40] text-white border-[#124C40]' : 'bg-white text-slate-600 border-slate-200'
            }`}
            title="Toggle Route Metrics HUD"
          >
            <SlidersHorizontal size={14} />
          </button>
        </div>
      </div>

      {/* Floating Route Metrics HUD Strip */}
      {showMetricsOverlay && (
        <div className="absolute top-16 left-6 z-10 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-md p-3 flex items-center gap-6 text-xs transition-all">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <MapPin size={14} />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Waypoints</span>
              <span className="font-extrabold text-slate-900">{stats.waypoints} stops</span>
            </div>
          </div>

          <div className="w-px h-6 bg-slate-200"></div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Zap size={14} />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Transit Legs</span>
              <span className="font-extrabold text-slate-900">{stats.connections} vectors</span>
            </div>
          </div>

          <div className="w-px h-6 bg-slate-200"></div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
              <Compass size={14} />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Total Distance</span>
              <span className="font-extrabold text-slate-900">{stats.distanceKm} km</span>
            </div>
          </div>

          <div className="w-px h-6 bg-slate-200"></div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Clock size={14} />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Est. Duration</span>
              <span className="font-extrabold text-slate-900">~{stats.estDurationHours} hours</span>
            </div>
          </div>

          <div className="w-px h-6 bg-slate-200"></div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
              <DollarSign size={14} />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Node Budget</span>
              <span className="font-extrabold text-slate-900">{stats.costFormatted}</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Canvas Navigation Hint & Drag Cue */}
      <div className="absolute bottom-6 left-6 z-10 pointer-events-none bg-slate-900/85 backdrop-blur-xs text-white px-4 py-2 rounded-full text-[11px] font-semibold flex items-center gap-3 shadow-md border border-slate-800">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <GripVertical size={13} />
          <span>Simple Drag: grab any place card to reposition or move between days</span>
        </div>
        <span className="text-slate-500">•</span>
        <span className="text-slate-300">Canvas: drag background to pan • scroll to zoom</span>
      </div>

      {/* ========================================================
          2. INTERACTIVE GRAPH CANVAS SURFACE
      ======================================================== */}
      <div 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className={`flex-1 relative overflow-auto cursor-${isDraggingCanvas ? 'grabbing' : 'grab'} transition-colors`}
        style={{
          backgroundImage: `
            radial-gradient(circle, #cbd5e1 1.2px, transparent 1.2px),
            linear-gradient(to right, rgba(226, 232, 240, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(226, 232, 240, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px, 120px 120px, 120px 120px',
          backgroundColor: '#F8FAFC'
        }}
      >
        <div 
          className="min-w-max min-h-max p-16 transition-transform duration-75 origin-top-left"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`
          }}
        >
          {/* ----------------------------------------------------
              LAYOUT OPTION A: SEQUENTIAL MULTI-DAY PIPELINE
          ---------------------------------------------------- */}
          {graphLayout === 'pipeline' && (
            <div className="flex gap-14 items-start relative">
              
              {/* Optional Unscheduled Pool Column */}
              {includeUnscheduled && (trip.placesToVisit?.length || 0) > 0 && (
                <div 
                  className={`w-80 flex-shrink-0 flex flex-col gap-5 p-2 rounded-3xl transition-all ${
                    dropTarget?.dayId === 'places-to-visit' 
                      ? 'bg-blue-50/60 ring-2 ring-blue-500/50 border-2 border-dashed border-blue-400' 
                      : ''
                  }`}
                  onDragOver={(e) => handleDragOverColumn(e, 'places-to-visit', (trip.placesToVisit?.length || 0))}
                  onDrop={(e) => handleDropOnSlot(e, 'places-to-visit', (trip.placesToVisit?.length || 0))}
                >
                  <div className="bg-white/90 backdrop-blur-xs border border-blue-200/90 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-blue-50">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                        <h3 className="font-black text-sm text-slate-900">Unscheduled Bucket</h3>
                      </div>
                      <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                        {trip.placesToVisit?.length || 0}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">Drag any card directly into a day, or drag back here to unassign</p>
                  </div>

                  {/* Unscheduled Candidate Cards */}
                  <div className="space-y-4">
                    {trip.placesToVisit?.map((place, idx) => {
                      const isDragged = draggedPlaceInfo?.place.id === place.id;
                      const isTarget = dropTarget?.dayId === 'places-to-visit' && dropTarget?.index === idx;

                      return (
                        <div key={place.id} className="relative">
                          {/* Drop Indicator Bar */}
                          {isTarget && (
                            <div className="h-2.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 rounded-full my-2 ring-2 ring-blue-300 shadow-md animate-pulse flex items-center justify-center text-[9px] font-mono font-bold text-white uppercase">
                              Drop here
                            </div>
                          )}

                          <div
                            draggable={true}
                            onDragStart={(e) => handleDragStart(e, place, 'places-to-visit', idx)}
                            onDragEnd={handleDragEnd}
                            onDragOver={(e) => handleDragOverCard(e, 'places-to-visit', idx)}
                            onDrop={(e) => handleDropOnSlot(e, 'places-to-visit', idx)}
                            onClick={() => handleNodeClick(place)}
                            onMouseEnter={() => setHoveredNodeId(place.id)}
                            onMouseLeave={() => setHoveredNodeId(null)}
                            className={`interactive-node group bg-white rounded-2xl p-4 border transition-all cursor-grab active:cursor-grabbing shadow-xs hover:shadow-md overflow-hidden ${
                              isDragged
                                ? 'opacity-30 border-dashed border-blue-500 scale-95'
                                : inspectedPlace?.id === place.id 
                                ? 'border-blue-600 ring-2 ring-blue-500/20' 
                                : 'border-slate-200/80 hover:border-blue-300'
                            }`}
                          >
                            <div className="flex gap-3">
                              {/* Drag Handle Grip */}
                              <div className="flex items-center text-slate-400 group-hover:text-blue-600 transition-colors cursor-grab active:cursor-grabbing">
                                <GripVertical size={16} />
                              </div>

                              <img 
                                src={place.image} 
                                alt={place.name} 
                                className="w-14 h-14 rounded-xl object-cover flex-shrink-0 border border-slate-100" 
                              />
                              <div className="flex-1 min-w-0">
                                <span className="text-[10px] font-extrabold uppercase tracking-wide text-blue-600 block truncate">
                                  {place.category || 'Sight'}
                                </span>
                                <h4 className="font-extrabold text-xs text-slate-900 leading-tight truncate group-hover:text-blue-600">
                                  {place.name}
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded font-bold">
                                    ★ {place.rating || 4.8}
                                  </span>
                                  <span className="text-[10px] font-mono text-slate-500">
                                    {currencySymbol}{Math.round((place.cost || 15) * currencyRate)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Fast Link to Day Buttons - Responsive and always stays inside box */}
                            <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-1 text-[11px]">
                              <span className="text-slate-400 font-bold text-[10px] flex-shrink-0">Or quick move:</span>
                              <div className="flex flex-wrap items-center gap-1 max-w-full">
                                {daysList.map((d, dIdx) => (
                                  <button
                                    key={d.id}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onMovePlaceToDay('places-to-visit', place.id, d.id);
                                    }}
                                    className="px-1.5 py-0.5 rounded-md bg-slate-50 hover:bg-emerald-600 hover:text-white border border-slate-200 text-slate-700 text-[10px] font-bold transition-colors cursor-pointer whitespace-nowrap"
                                    title={`Move stop to ${d.title || `Day ${dIdx + 1}`}`}
                                  >
                                    {daysList.length > 5 ? `D${dIdx + 1}` : `Day ${dIdx + 1}`}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Day Pipeline Stages */}
              {activeDays.map((day, dIdx) => {
                const places = day.places || [];
                const dayThemeColor = day.color || '#124C40';
                const isColumnDropTarget = dropTarget?.dayId === day.id;

                return (
                  <div 
                    key={day.id} 
                    className={`w-88 flex-shrink-0 flex flex-col relative p-2 rounded-3xl transition-all ${
                      isColumnDropTarget 
                        ? 'bg-emerald-50/50 ring-2 ring-emerald-500/40 border-2 border-dashed border-emerald-400' 
                        : ''
                    }`}
                    onDragOver={(e) => handleDragOverColumn(e, day.id, places.length)}
                    onDrop={(e) => handleDropOnSlot(e, day.id, places.length)}
                  >
                    {/* Day Anchor Header Pillar */}
                    <div className="bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-2xl p-4 shadow-sm mb-6 relative">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span 
                            className="w-3 h-3 rounded-full shadow-2xs" 
                            style={{ backgroundColor: dayThemeColor }}
                          ></span>
                          <h3 className="font-black text-sm text-slate-900 tracking-tight">
                            {day.title || `Day ${dIdx + 1}`}
                          </h3>
                        </div>
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono">
                          STAGE 0{dIdx + 1}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                        <span>{day.shortTitle || day.dateStr || `Day ${dIdx + 1}`} • {places.length} waypoints</span>
                        
                        {/* Day Route Optimizer Trigger */}
                        <button
                          onClick={() => onOpenOptimizer && onOpenOptimizer(day)}
                          className="interactive-control flex items-center gap-1 text-[11px] font-extrabold text-blue-600 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                          title="Solve traveling salesperson problem for this day"
                        >
                          <Zap size={12} />
                          <span>Optimize</span>
                        </button>
                      </div>

                      {/* Port Connector Anchor Dot on Right of Header */}
                      {dIdx < activeDays.length - 1 && (
                        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 border-emerald-500 shadow-sm flex items-center justify-center text-emerald-600 z-10">
                          <ArrowRight size={11} />
                        </div>
                      )}
                    </div>

                    {/* Nodes Column */}
                    <div className="space-y-6 relative">
                      {places.map((place, pIdx) => {
                        const theme = getCategoryTheme(place.category);
                        const isHovered = hoveredNodeId === place.id;
                        const isInspected = inspectedPlace?.id === place.id;
                        const isDragged = draggedPlaceInfo?.place.id === place.id;
                        const isSlotTarget = dropTarget?.dayId === day.id && dropTarget?.index === pIdx;
                        const nextPlace = places[pIdx + 1];

                        // Calculate transit vector to next place
                        let transit = null;
                        if (nextPlace) {
                          const dist = calculateHaversine(place.coords, nextPlace.coords);
                          transit = getTransitEstimate(dist);
                        }

                        return (
                          <div key={place.id} className="relative">
                            
                            {/* Visual Drop Slot Indicator */}
                            {isSlotTarget && (
                              <div className="h-3 bg-gradient-to-r from-[#124C40] via-emerald-500 to-teal-400 rounded-full my-3 ring-2 ring-emerald-300 shadow-md animate-pulse flex items-center justify-center text-[9px] font-mono font-bold text-white uppercase tracking-wider">
                                Drop here to insert waypoint
                              </div>
                            )}

                            {/* Topological Waypoint Card (Draggable) */}
                            <div
                              draggable={true}
                              onDragStart={(e) => handleDragStart(e, place, day.id, pIdx)}
                              onDragEnd={handleDragEnd}
                              onDragOver={(e) => handleDragOverCard(e, day.id, pIdx)}
                              onDrop={(e) => handleDropOnSlot(e, day.id, pIdx)}
                              onClick={() => handleNodeClick(place)}
                              onMouseEnter={() => setHoveredNodeId(place.id)}
                              onMouseLeave={() => setHoveredNodeId(null)}
                              className={`interactive-node group relative bg-white rounded-2xl p-4 border transition-all cursor-grab active:cursor-grabbing shadow-xs hover:shadow-xl ${
                                isDragged
                                  ? 'opacity-30 border-dashed border-emerald-500 scale-95'
                                  : isInspected 
                                  ? 'border-[#124C40] ring-3 ring-[#124C40]/20 shadow-lg' 
                                  : isHovered 
                                  ? 'border-emerald-400 -translate-y-0.5 shadow-md' 
                                  : 'border-slate-200/90'
                              }`}
                            >
                              {/* Top Anchor Port */}
                              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-slate-400 group-hover:border-emerald-500 z-10 shadow-2xs"></div>

                              {/* Card Header with Drag Grip */}
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="text-slate-400 group-hover:text-emerald-700 transition-colors">
                                    <GripVertical size={15} />
                                  </div>
                                  <span className="w-5 h-5 rounded-full bg-[#124C40] text-white font-mono font-extrabold text-[11px] flex items-center justify-center shadow-2xs">
                                    {pIdx + 1}
                                  </span>
                                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${theme.bg} ${theme.text} ${theme.border}`}>
                                    {place.category || 'Sight'}
                                  </span>
                                </div>
                                <span className="text-[10px] font-mono text-slate-400 font-bold">
                                  {place.timeSpent || '1.5 hrs'}
                                </span>
                              </div>

                              {/* Card Body */}
                              <div className="flex gap-3">
                                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100 bg-slate-100 relative">
                                  <img 
                                    src={place.image} 
                                    alt={place.name} 
                                    className="w-full h-full object-cover" 
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-extrabold text-xs text-slate-900 leading-snug truncate">
                                    {place.name}
                                  </h4>
                                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                                    {place.subtitle || place.description || place.address}
                                  </p>
                                </div>
                              </div>

                              {/* Card Footer: Cost + Rating + Quick Reorder Buttons */}
                              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded font-bold">
                                    ★ {place.rating || 4.8}
                                  </span>
                                  <span className="text-[11px] font-mono font-bold text-slate-700">
                                    {place.cost === 0 ? 'Free' : `${currencySymbol}${Math.round((place.cost || 20) * currencyRate)}`}
                                  </span>
                                </div>

                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onMovePlace && onMovePlace(day.id, pIdx, 'up');
                                    }}
                                    disabled={pIdx === 0}
                                    className="p-1 rounded hover:bg-slate-100 text-slate-500 disabled:opacity-20 cursor-pointer"
                                    title="Move Earlier in Day Sequence"
                                  >
                                    <ChevronUp size={13} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onMovePlace && onMovePlace(day.id, pIdx, 'down');
                                    }}
                                    disabled={pIdx === places.length - 1}
                                    className="p-1 rounded hover:bg-slate-100 text-slate-500 disabled:opacity-20 cursor-pointer"
                                    title="Move Later in Day Sequence"
                                  >
                                    <ChevronDown size={13} />
                                  </button>
                                  {onDeletePlace && (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onDeletePlace(place.id);
                                      }}
                                      className="p-1 rounded hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                                      title="Delete stop from trip"
                                    >
                                      <Trash2 size={13} />
                                    </button>
                                  )}
                                </div>
                              </div>

                              {/* Bottom Anchor Port */}
                              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-slate-400 group-hover:border-emerald-500 z-10 shadow-2xs"></div>
                            </div>

                            {/* ====================================================
                                CONNECTOR 1: INTRA-DAY TRANSIT VECTOR TO NEXT STOP
                            ==================================================== */}
                            {nextPlace && transit && (
                              <div className="flex flex-col items-center justify-center my-3 relative py-2">
                                {/* Vertical SVG Conduit */}
                                <div className="w-0.5 h-10 bg-gradient-to-b from-[#124C40] to-emerald-600 relative">
                                  <div className="absolute inset-0 bg-white/40 animate-pulse"></div>
                                </div>

                                {/* Floating Transit Chip */}
                                <div className="my-1 px-2.5 py-1 rounded-full bg-white border border-slate-200/90 text-[10px] font-bold text-slate-700 shadow-2xs flex items-center gap-1.5 hover:border-emerald-400 hover:text-emerald-800 transition-colors z-10">
                                  <span>{transit.icon}</span>
                                  <span className="font-mono">{transit.label}</span>
                                </div>

                                <div className="w-0.5 h-4 bg-gradient-to-b from-emerald-600 to-slate-400"></div>
                              </div>
                            )}

                            {/* ====================================================
                                CONNECTOR 2: INTER-DAY TRANSIT BRIDGE (LAST STOP)
                            ==================================================== */}
                            {!nextPlace && dIdx < activeDays.length - 1 && (
                              <div className="mt-6 p-3 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/90 text-xs text-emerald-900 shadow-xs relative">
                                <div className="flex items-center gap-2 font-bold mb-1">
                                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                                  <span>Overnight Transit Bridge</span>
                                </div>
                                <p className="text-[11px] text-emerald-700 leading-snug">
                                  Rest & transition conduit to Day {dIdx + 2} ({activeDays[dIdx + 1]?.shortTitle || `Day ${dIdx + 2}`})
                                </p>
                                
                                {/* Conduit Line to Next Column */}
                                <div className="mt-2 flex items-center justify-between text-[10px] font-mono font-bold text-emerald-800 pt-1.5 border-t border-emerald-200/60">
                                  <span>🌙 Evening Rest</span>
                                  <div className="flex items-center gap-1 text-emerald-600">
                                    <span className="h-px w-10 bg-emerald-300"></span>
                                    <ArrowRight size={12} />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* Drop Zone to append to end of Day */}
                      {dropTarget?.dayId === day.id && dropTarget?.index === places.length && (
                        <div className="p-3.5 rounded-2xl border-2 border-dashed border-emerald-500 bg-emerald-50/50 text-center text-xs font-black text-emerald-800 animate-pulse my-2">
                          Drop here to append stop to Day {dIdx + 1}
                        </div>
                      )}

                      {/* Inline Add Waypoint Button for Day */}
                      {addingToDayId === day.id ? (
                        <div className="bg-white p-3 rounded-2xl border border-emerald-300 shadow-sm space-y-2">
                          <input
                            type="text"
                            value={newPlaceName}
                            onChange={(e) => setNewPlaceName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleQuickAddSubmit(day.id)}
                            placeholder="Enter place or activity name..."
                            autoFocus
                            className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-emerald-600"
                          />
                          <div className="flex items-center justify-end gap-1.5 text-xs">
                            <button
                              type="button"
                              onClick={() => {
                                setAddingToDayId(null);
                                setNewPlaceName('');
                              }}
                              className="px-2 py-1 text-slate-500 hover:text-slate-800 text-[11px] cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => handleQuickAddSubmit(day.id)}
                              className="px-3 py-1 bg-[#124C40] text-white rounded-lg font-bold text-[11px] hover:bg-emerald-800 cursor-pointer"
                            >
                              Add Stop
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setAddingToDayId(day.id)}
                          className="interactive-control w-full py-2.5 rounded-2xl border border-dashed border-slate-300 hover:border-emerald-600 hover:bg-emerald-50/50 text-slate-500 hover:text-emerald-800 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Plus size={14} />
                          <span>Add Waypoint to Day {dIdx + 1}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ----------------------------------------------------
              LAYOUT OPTION B: TOPOLOGICAL CONSTELLATION WEB
          ---------------------------------------------------- */}
          {graphLayout === 'constellation' && (
            <div className="relative min-w-[950px] min-h-[620px] flex items-center justify-center p-8">
              
              {/* Journey Central Core Hub */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-[#124C40] via-teal-700 to-emerald-600 p-1 shadow-2xl text-white flex flex-col items-center justify-center text-center ring-8 ring-emerald-500/10">
                  <Compass size={28} className="animate-spin-slow mb-1" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-200">Trip Core</span>
                  <span className="font-black text-xs px-2 truncate max-w-full leading-tight">
                    {trip.name || 'Expedition'}
                  </span>
                </div>
                <span className="mt-2 px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-[10px] font-extrabold text-slate-700 shadow-2xs font-mono">
                  {stats.waypoints} TOTAL STOPS
                </span>
              </div>

              {/* Day Star Clusters Orbiting Central Core */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-16 w-full max-w-4xl z-10">
                {activeDays.map((day, dIdx) => (
                  <div key={day.id} className="bg-white/95 backdrop-blur-xs rounded-3xl border border-slate-200/90 p-4 shadow-md flex flex-col gap-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                        <h4 className="font-black text-xs text-slate-900">{day.title || `Day ${dIdx + 1}`}</h4>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">
                        {day.places?.length || 0} nodes
                      </span>
                    </div>

                    <div className="space-y-2">
                      {day.places?.map((place, pIdx) => (
                        <div
                          key={place.id}
                          draggable={true}
                          onDragStart={(e) => handleDragStart(e, place, day.id, pIdx)}
                          onDragEnd={handleDragEnd}
                          onDragOver={(e) => handleDragOverCard(e, day.id, pIdx)}
                          onDrop={(e) => handleDropOnSlot(e, day.id, pIdx)}
                          onClick={() => handleNodeClick(place)}
                          className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200/60 text-xs transition-colors cursor-grab active:cursor-grabbing flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <GripVertical size={13} className="text-slate-400 flex-shrink-0" />
                            <span className="w-5 h-5 rounded-md bg-white border border-slate-200 text-[10px] font-mono font-bold flex items-center justify-center flex-shrink-0">
                              {pIdx + 1}
                            </span>
                            <span className="font-bold text-slate-800 truncate text-[11px]">{place.name}</span>
                          </div>
                          <span className="text-[10px] text-amber-700 font-bold ml-2">★{place.rating || 4.8}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================
          3. SLIDE-OVER NODE INSPECTION DRAWER
      ======================================================== */}
      {inspectedPlace && (
        <div className="absolute top-0 right-0 bottom-0 w-96 bg-white border-l border-slate-200/90 shadow-2xl z-30 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200">
          
          {/* Drawer Header with Photo Hero */}
          <div className="relative h-48 bg-slate-900 flex-shrink-0">
            <img 
              src={inspectedPlace.image} 
              alt={inspectedPlace.name} 
              className="w-full h-full object-cover opacity-90" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
            
            {/* Close Button */}
            <button
              onClick={() => setInspectedPlace(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-xs"
            >
              <X size={16} />
            </button>

            {/* Title & Category over Hero */}
            <div className="absolute bottom-3 left-4 right-4">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500 text-white font-mono">
                {inspectedPlace.category || 'Sightseeing'}
              </span>
              <h3 className="text-lg font-black text-white mt-1 leading-tight truncate">
                {inspectedPlace.name}
              </h3>
            </div>
          </div>

          {/* Drawer Details Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            
            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Rating</span>
                <span className="text-xs font-black text-amber-800">★ {inspectedPlace.rating || 4.8}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Est. Cost</span>
                <span className="text-xs font-black text-slate-900">
                  {inspectedPlace.cost === 0 ? 'Free' : `${currencySymbol}${Math.round((inspectedPlace.cost || 20) * currencyRate)}`}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Duration</span>
                <span className="text-xs font-black text-slate-900">{inspectedPlace.timeSpent || '1.5-2 hrs'}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-1">About this Waypoint</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {inspectedPlace.description || inspectedPlace.subtitle || 'Essential landmark featured in curated expedition trajectory.'}
              </p>
            </div>

            {/* Address & Geographic Coordinates */}
            {inspectedPlace.address && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2 text-xs">
                <MapPin size={15} className="text-emerald-700 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700 font-medium">{inspectedPlace.address}</span>
              </div>
            )}

            {/* AI Route Advisory */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                <Sparkles size={13} className="text-emerald-600" />
                <span>AI Sequence Advisory</span>
              </div>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                Optimal morning arrival recommended to minimize congestion. Topological connection provides direct transit to subsequent stops.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  if (onSwitchToOverview) onSwitchToOverview();
                  setInspectedPlace(null);
                }}
                className="w-full py-2.5 bg-[#124C40] hover:bg-emerald-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Compass size={14} />
                <span>View on Interactive Studio Map</span>
              </button>

              {inspectedPlace.website && (
                <a
                  href={inspectedPlace.website}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ExternalLink size={13} />
                  <span>Official Landmark Website</span>
                </a>
              )}

              {onDeletePlace && (
                <button
                  type="button"
                  onClick={() => {
                    onDeletePlace(inspectedPlace.id);
                    setInspectedPlace(null);
                  }}
                  className="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Trash2 size={13} />
                  <span>Remove Stop from Trip</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
