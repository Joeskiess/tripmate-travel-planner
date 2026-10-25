import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Zap, Navigation, MapPin } from 'lucide-react';

export default function TripMap({ 
  places = [], 
  activeDayColor = '#2563EB', // Modern Royal Blue
  selectedPlaceId, 
  onSelectPlace,
  days = [],
  activeDayId = 'day-1',
  onSelectDay,
  center = [48.8566, 2.3522],
  zoom = 12,
  onOpenOptimizer
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const routeLayersRef = useRef([]);
  const [isFetchingRoads, setIsFetchingRoads] = useState(false);

  // Initialize or re-center map instance
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: center || [48.8566, 2.3522],
        zoom: zoom || 12,
        zoomControl: false,
      });

      // Carto / OpenStreetMap clean tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);
      mapInstanceRef.current = map;
    } else if (center) {
      mapInstanceRef.current.setView(center, zoom || 12);
    }
  }, [center, zoom]);

  // Render Markers and Google Maps Styled Navigation Route
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clean up previous markers and route lines
    Object.values(markersRef.current).forEach(m => m.remove());
    markersRef.current = {};

    routeLayersRef.current.forEach(layer => layer.remove());
    routeLayersRef.current = [];

    if (!places || places.length === 0) return;

    const latlngs = [];

    // Render Markers with sequential numbering
    places.forEach((place, index) => {
      if (!place.coords || place.coords.length < 2) return;
      latlngs.push(place.coords);

      const displayNumber = place.number || (index + 1);
      const isSelected = selectedPlaceId === place.id;
      const isLast = index === places.length - 1 && places.length > 1;

      // Google Maps style pin HTML
      const pinColor = isLast ? '#F43F5E' : activeDayColor;
      const markerHtml = `
        <div class="custom-tripmate-pin ${isSelected ? 'selected' : ''} ${isLast ? 'destination-pin' : ''}" style="--pin-color: ${pinColor};">
          <div class="pin-badge" style="background-color: ${pinColor};">
            <span class="pin-number">${isLast ? '★' : displayNumber}</span>
          </div>
          <div class="pin-pulse"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'tripmate-marker-container',
        html: markerHtml,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
        popupAnchor: [0, -18],
      });

      const marker = L.marker(place.coords, { icon: customIcon }).addTo(map);

      // Popup card with real image and metadata
      const popupContent = `
        <div class="map-popup-card">
          <img src="${place.image}" alt="${place.name}" class="popup-img" />
          <div class="popup-info">
            <span class="popup-category">${place.category || 'Sightseeing'}</span>
            <h4 class="popup-title">${place.name}</h4>
            <div class="popup-meta">
              <span class="popup-rating">★ ${place.rating || 4.8}</span>
              <span class="popup-price">${place.price || '$$'}</span>
            </div>
            ${place.address ? `<p class="popup-tip">📍 ${place.address}</p>` : ''}
          </div>
        </div>
      `;
      marker.bindPopup(popupContent, { maxWidth: 280, className: 'tripmate-leaflet-popup' });

      marker.on('click', () => {
        if (onSelectPlace) onSelectPlace(place.id);
      });

      markersRef.current[place.id] = marker;
    });

    // Draw Google Maps Styled Navigation Path
    if (latlngs.length > 1) {
      let isCancelled = false;

      const drawGoogleMapsPath = (roadCoordinates) => {
        if (isCancelled || !map) return;

        // Layer 1: Outer casing in deep Royal Navy
        const outerBorder = L.polyline(roadCoordinates, {
          color: '#1E3A8A',
          weight: 7,
          opacity: 0.95,
          lineCap: 'round',
          lineJoin: 'round'
        }).addTo(map);

        // Layer 2: Core vivid Royal Blue line (#2563EB)
        const coreLine = L.polyline(roadCoordinates, {
          color: '#2563EB',
          weight: 4.5,
          opacity: 1.0,
          lineCap: 'round',
          lineJoin: 'round'
        }).addTo(map);

        routeLayersRef.current.push(outerBorder, coreLine);

        // Layer 3: Waypoint Turn Beads
        roadCoordinates.forEach((coord, i) => {
          if (i > 0 && i < roadCoordinates.length - 1 && i % 4 === 0) {
            const beadIcon = L.divIcon({
              className: 'gmap-waypoint-bead',
              html: '<div style="width: 8px; height: 8px; background: #ffffff; border: 2.5px solid #2563EB; border-radius: 50%; box-shadow: 0 1px 4px rgba(37,99,235,0.5);"></div>',
              iconSize: [8, 8],
              iconAnchor: [4, 4]
            });
            const bead = L.marker(coord, { icon: beadIcon, interactive: false }).addTo(map);
            routeLayersRef.current.push(bead);
          }
        });

        // Layer 4: Dashed connector for transit/walking leg in Cyan (#06B6D4)
        if (roadCoordinates.length > 8) {
          const transitConnector = L.polyline(roadCoordinates.slice(0, 5), {
            color: '#06B6D4',
            weight: 3.5,
            opacity: 0.95,
            dashArray: '4, 6',
            lineCap: 'round'
          }).addTo(map);
          routeLayersRef.current.push(transitConnector);
        }
      };

      // Street-following road geometry from public OSRM router
      const coordinatesQuery = latlngs.map(c => `${c[1]},${c[0]}`).join(';');
      const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${coordinatesQuery}?overview=full&geometries=geojson`;

      setIsFetchingRoads(true);
      fetch(osrmUrl)
        .then(res => res.json())
        .then(data => {
          if (!isCancelled && data?.routes?.[0]?.geometry?.coordinates) {
            const rawCoords = data.routes[0].geometry.coordinates;
            const roadLatLngs = rawCoords.map(pt => [pt[1], pt[0]]);
            drawGoogleMapsPath(roadLatLngs);
          } else {
            drawGoogleMapsPath(latlngs);
          }
        })
        .catch(() => {
          if (!isCancelled) drawGoogleMapsPath(latlngs);
        })
        .finally(() => {
          if (!isCancelled) setIsFetchingRoads(false);
        });

      return () => {
        isCancelled = true;
      };
    }

    // Auto-fit map bounds with padding
    if (latlngs.length > 0) {
      const bounds = L.latLngBounds(latlngs);
      map.fitBounds(bounds, { padding: [70, 70], maxZoom: 15 });
    }
  }, [places, activeDayColor]);

  // Focus selected place on click
  useEffect(() => {
    if (!selectedPlaceId || !markersRef.current[selectedPlaceId] || !mapInstanceRef.current) return;
    const marker = markersRef.current[selectedPlaceId];
    const place = places.find(p => p.id === selectedPlaceId);
    if (place?.coords) {
      mapInstanceRef.current.flyTo(place.coords, 15, { duration: 1.0 });
      marker.openPopup();
    }
  }, [selectedPlaceId, places]);

  return (
    <div className="relative w-full h-full min-h-[400px]">
      <div ref={mapContainerRef} className="w-full h-full rounded-none overflow-hidden" />
      
      {/* Top Map Day Filter Bar & Optimize Route Trigger */}
      <div className="absolute top-4 left-4 z-[400] flex flex-wrap items-center gap-1.5 max-w-[92%]">
        
        {/* Day Pills */}
        {days.map((day) => {
          const isActive = activeDayId === day.id;
          return (
            <button
              key={day.id}
              onClick={() => onSelectDay && onSelectDay(day.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-blue-600 text-white ring-2 ring-blue-300 scale-102 shadow-blue-500/25'
                  : 'bg-white/95 backdrop-blur-xl text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-slate-300'}`}></span>
              <span>{day.shortTitle || day.title}</span>
              <span className="text-[10px] opacity-80">({day.placesCount})</span>
            </button>
          );
        })}

        {/* All stops toggle */}
        <button
          onClick={() => onSelectDay && onSelectDay('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-md cursor-pointer ${
            activeDayId === 'all'
              ? 'bg-blue-600 text-white ring-2 ring-blue-300 scale-102 shadow-blue-500/25'
              : 'bg-white/95 backdrop-blur-xl text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
          }`}
        >
          All stops
        </button>

        {/* Quantum Route Optimizer Quick Button */}
        {onOpenOptimizer && (
          <button
            id="quantum-optimize-btn"
            onClick={onOpenOptimizer}
            className="ml-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-1.5 rounded-full text-xs font-black shadow-lg shadow-blue-500/25 flex items-center gap-1.5 transition-all cursor-pointer hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
            title="Optimize Route using Graph Data Structures & Quantum Annealing"
          >
            <Zap size={13} className="text-amber-300 animate-pulse" />
            <span>Optimize route</span>
            <span className="text-[9px] bg-white/20 px-1 py-0.2 rounded font-mono">QUANTUM</span>
          </button>
        )}

      </div>

      {/* Road Snapping Indicator Pill & Google Maps Launcher */}
      <button
        type="button"
        onClick={() => {
          if (places && places.length > 0) {
            const waypoints = places.map(p => `${p.lat},${p.lng}`).join('/');
            window.open(`https://www.google.com/maps/dir/${waypoints}`, '_blank');
          } else {
            window.open(`https://www.google.com/maps/search/?api=1&query=${center[0]},${center[1]}`, '_blank');
          }
        }}
        className="absolute bottom-4 left-4 z-[400] bg-white/95 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-slate-700 hover:text-blue-700 shadow-md flex items-center gap-2 transition-all cursor-pointer group backdrop-blur-xl"
        title="Open route in Google Maps Directions"
      >
        <Navigation size={12} className="text-blue-600 group-hover:scale-110 transition-transform" />
        <span>Google Maps Route {isFetchingRoads ? '(Snapping roads...)' : 'Active'} ↗</span>
      </button>
    </div>
  );
}
