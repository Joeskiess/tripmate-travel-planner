import React from 'react';
import { X, BookOpen, Star, MapPin, Plus, Check, ExternalLink, Calendar, Compass } from 'lucide-react';

export default function TravelGuideModal({ guide, isOpen, onClose, destination = '', onAddPlaceToPlan, onAddAllToPlan }) {
  if (!isOpen || !guide) return null;

  // Curated highlights for the guide
  const sampleHighlights = [
    {
      name: `Historic Landmark & Center of ${destination || 'the City'}`,
      category: 'Sightseeing',
      rating: 4.9,
      tip: 'Arrive early in the morning before 9:00 AM to beat the tour bus queues.',
      image: guide.image || 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&fit=crop'
    },
    {
      name: `Artisan Culinary District & Local Market`,
      category: 'Food & Dining',
      rating: 4.8,
      tip: 'Try the signature regional specialty tasting menu paired with local wines.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&fit=crop'
    },
    {
      name: `Panoramic Sunset Vista & Hillside Lookout`,
      category: 'Viewpoint',
      rating: 4.9,
      tip: 'The golden hour light illuminates the historic rooftops for breathtaking photography.',
      image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&fit=crop'
    }
  ];

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Hero Header with Close */}
        <div className="relative h-44 sm:h-52 overflow-hidden flex-shrink-0">
          <img
            src={guide.image}
            alt={guide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>

          <div className="absolute bottom-4 left-5 right-5 text-white">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-600/90 text-white px-2 py-0.5 rounded">
                {guide.source || 'TripMate Curated'}
              </span>
              <span className="text-[10px] text-slate-300 font-semibold flex items-center gap-1">
                <Compass size={11} /> Expert Editorial Guide
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black leading-tight drop-shadow-sm">{guide.title}</h2>
            <p className="text-xs text-slate-200 mt-1 line-clamp-1">{guide.subtitle}</p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Overview Section */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
              <BookOpen size={14} className="text-blue-600" />
              <span>Editorial Overview</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore the rich culture, timeless architecture, and world-renowned gastronomy of {destination || 'this region'}.
              This curated guide brings together top-rated monuments, hidden courtyards, and insider culinary stops,
              ensuring an unforgettable, zero-backtracking journey.
            </p>
          </div>

          {/* Practical Tips Callout */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5">
            <h4 className="text-xs font-black text-blue-900 mb-1 flex items-center gap-1.5">
              <span>💡</span>
              <span>TripMate Insider Advice</span>
            </h4>
            <ul className="text-[11px] text-blue-800 space-y-1 list-disc list-inside">
              <li>Book skip-the-line admissions 24–48 hours in advance during high season.</li>
              <li>Public metro and transit passes offer seamless connectivity across key sightseeing districts.</li>
              <li>Comfortable walking shoes are essential for cobblestone historic quarters.</li>
            </ul>
          </div>

          {/* Curated Stops List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <MapPin size={14} className="text-blue-600" />
                <span>Featured Stops in this Guide</span>
              </h3>
              <span className="text-[11px] text-slate-500 font-semibold">{sampleHighlights.length} stops</span>
            </div>

            <div className="space-y-2.5">
              {sampleHighlights.map((stop, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-3 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={stop.image}
                      alt={stop.name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-xs text-slate-900 truncate">{stop.name}</h4>
                        <span className="text-[10px] text-amber-500 font-bold flex items-center gap-0.5">
                          <Star size={10} className="fill-amber-400" /> {stop.rating}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">{stop.tip}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (onAddPlaceToPlan) {
                        onAddPlaceToPlan({
                          id: `guide-stop-${idx}-${Date.now()}`,
                          name: stop.name,
                          subtitle: stop.category,
                          image: stop.image,
                          rating: stop.rating,
                          cost: 18,
                          category: 'Sightseeing'
                        });
                      }
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 flex-shrink-0 shadow-2xs"
                  >
                    <Plus size={12} />
                    <span>Add</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl cursor-pointer"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => {
              if (onAddAllToPlan) {
                onAddAllToPlan(sampleHighlights.map((s, i) => ({
                  id: `guide-all-${i}-${Date.now()}`,
                  name: s.name,
                  subtitle: s.category,
                  image: s.image,
                  rating: s.rating,
                  cost: 18,
                  category: 'Sightseeing'
                })));
              }
              onClose();
            }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-extrabold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <Plus size={14} />
            <span>Add All Stops to Itinerary</span>
          </button>
        </div>

      </div>
    </div>
  );
}
