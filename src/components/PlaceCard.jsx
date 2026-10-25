import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Lightbulb, 
  X,
  Clock,
  ChevronUp,
  ChevronDown,
  Star
} from 'lucide-react';

export default function PlaceCard({ 
  place, 
  color = '#2563EB', 
  isSelected, 
  onSelect, 
  onToggleVisited, 
  onDelete,
  currencySymbol = '₹',
  isIncludedInBudget = true,
  onToggleBudgetInclude,
  onMoveUp,
  onMoveDown
}) {
  const [showWarning, setShowWarning] = useState(true);

  // Subtitle / summary text fallback
  const subtitle = place.subtitle || place.description || place.tips?.[0] || 'Top curated attraction';

  // Cost formatting
  const getFormattedCost = () => {
    const baseCost = place.cost !== undefined ? place.cost : 15;
    if (baseCost === 0) return 'Free';
    if (currencySymbol === '₹') return `₹${Math.round(baseCost * 92).toLocaleString()}`;
    if (currencySymbol === '€') return `€${baseCost.toFixed(2)}`;
    return `$${Math.round(baseCost * 1.08).toFixed(2)}`;
  };

  const ratingVal = place.rating || 4.8;
  const priceTier = place.price || '$$';
  const durationEst = place.timeSpent || '1.5 - 2 hrs';

  return (
    <div 
      onClick={() => onSelect && onSelect(place.id)}
      className={`group relative bg-white border rounded-2xl p-4 transition-all duration-300 cursor-pointer ${
        isSelected 
          ? 'border-blue-600 ring-4 ring-blue-500/15 shadow-lg bg-blue-50/[0.15]' 
          : 'border-slate-200/90 hover:border-blue-400 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.06)] hover:shadow-[0_10px_25px_-5px_rgba(15,23,42,0.1)] hover:-translate-y-0.5'
      } ${place.visited ? 'opacity-70 bg-slate-50/70' : ''}`}
    >
      <div className="flex items-start justify-between gap-4">
        
        {/* Left Side: Number Badge & Place Information */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          
          {/* Circular Number Badge */}
          <div 
            className="w-7 h-7 rounded-full text-white font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm ring-2 ring-white"
            style={{ backgroundColor: color }}
          >
            {place.number || 1}
          </div>

          <div className="flex-1 min-w-0">
            {/* Top Category & Rating Micro-Bar */}
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="inline-flex items-center text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                {place.category || 'Sightseeing'}
              </span>

              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                <Star size={10} className="fill-amber-400 text-amber-500" />
                <span>{ratingVal}</span>
                <span className="text-[10px] text-amber-600/70">({place.reviewsCount || '1.4k'})</span>
              </div>

              <span className="text-[11px] font-bold text-slate-400">
                {priceTier}
              </span>
            </div>

            {/* Title & Interactive Reorder / Action Dock */}
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                {place.name}
              </h4>

              {/* Hover Actions & Reorder Controls */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 bg-slate-50/90 backdrop-blur-xs px-1.5 py-0.5 rounded-lg border border-slate-200 shadow-2xs">
                {onMoveUp && (
                  <button
                    type="button"
                    title="Move stop earlier in route"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveUp();
                    }}
                    className="p-1 text-slate-500 hover:text-blue-600 rounded-md hover:bg-white transition-colors"
                  >
                    <ChevronUp size={13} className="stroke-[2.5]" />
                  </button>
                )}
                {onMoveDown && (
                  <button
                    type="button"
                    title="Move stop later in route"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveDown();
                    }}
                    className="p-1 text-slate-500 hover:text-blue-600 rounded-md hover:bg-white transition-colors"
                  >
                    <ChevronDown size={13} className="stroke-[2.5]" />
                  </button>
                )}
                <button
                  type="button"
                  title={place.visited ? "Mark as unvisited" : "Mark as visited"}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleVisited && onToggleVisited(place.id);
                  }}
                  className={`p-1 rounded-md transition-colors ${
                    place.visited ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-slate-700 hover:bg-white'
                  }`}
                >
                  {place.visited ? <CheckCircle2 size={13} className="stroke-[2.5]" /> : <Circle size={13} />}
                </button>
                <button
                  type="button"
                  title="Remove from itinerary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete && onDelete(place.id);
                  }}
                  className="p-1 text-slate-400 hover:text-rose-500 rounded-md hover:bg-rose-50 transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>

            {/* Subtitle / Description text */}
            <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
              {subtitle}
            </p>

            {/* Badges Row: Time Spent, Estimated Cost, Booking Warning */}
            <div className="flex flex-wrap items-center gap-2 mt-2.5">
              
              {/* Estimated Place Cost (counts toward budget) */}
              <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-lg transition-colors ${
                isIncludedInBudget 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : 'bg-slate-100 text-slate-400 line-through'
              }`}>
                <span>{getFormattedCost()}</span>
                {isIncludedInBudget && <span className="text-[9px] text-emerald-600/80 font-semibold">in budget</span>}
              </span>

              {/* Recommended Duration Pill */}
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-lg">
                <Clock size={11} className="text-slate-500" />
                <span>{durationEst}</span>
              </span>

              {/* Booking Warning */}
              {place.bookingWarning && showWarning && (
                <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 text-[11px] font-bold px-2.5 py-0.5 rounded-lg border border-amber-200">
                  <Lightbulb size={11} className="stroke-[2.5] text-amber-600" />
                  <span>{place.bookingWarning}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowWarning(false);
                    }}
                    className="hover:opacity-70 ml-0.5 p-0.5"
                    title="Dismiss warning"
                  >
                    <X size={11} />
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Right Side: Photo Thumbnail */}
        <div className="w-24 sm:w-28 h-20 sm:h-22 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200 shadow-xs group-hover:shadow-sm">
          <img 
            src={place.image} 
            alt={place.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80";
            }}
          />
        </div>

      </div>
    </div>
  );
}
