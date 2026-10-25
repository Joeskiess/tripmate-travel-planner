import React, { useState } from 'react';
import { X, Image, Check, Sparkles, ExternalLink } from 'lucide-react';

const DESTINATION_PRESETS = {
  rome: [
    { title: 'Colosseum at Dusk', url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1600&fit=crop' },
    { title: 'Trevi Fountain by Night', url: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?w=1600&fit=crop' },
    { title: 'Vatican & St. Peter Basilica', url: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=1600&fit=crop' },
    { title: 'Roman Forum Ancient Ruins', url: 'https://images.unsplash.com/photo-1555992828-ca4cbe005b68?w=1600&fit=crop' },
    { title: 'Pantheon & Piazza della Rotonda', url: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?w=1600&fit=crop' },
    { title: 'Piazza Navona Baroque Fountains', url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1600&fit=crop' }
  ],
  paris: [
    { title: 'Eiffel Tower Golden Hour', url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&fit=crop' },
    { title: 'Louvre Museum Glass Pyramid', url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1600&fit=crop' },
    { title: 'Montmartre Cobblestone Alley', url: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=1600&fit=crop' },
    { title: 'Seine River Bridges at Sunset', url: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=1600&fit=crop' }
  ],
  london: [
    { title: 'Big Ben & Westminster Palace', url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&fit=crop' },
    { title: 'Tower Bridge over the Thames', url: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=1600&fit=crop' },
    { title: 'London Eye & South Bank Dusk', url: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=1600&fit=crop' }
  ],
  newyork: [
    { title: 'Manhattan Skyline Dusk', url: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1600&fit=crop' },
    { title: 'Central Park Autumn Panorama', url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1600&fit=crop' },
    { title: 'Brooklyn Bridge Sunset', url: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1600&fit=crop' }
  ],
  switzerland: [
    { title: 'Matterhorn Alpine Peak', url: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1600&fit=crop' },
    { title: 'Interlaken Mountain Valley', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&fit=crop' },
    { title: 'Lauterbrunnen Waterfalls', url: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=1600&fit=crop' }
  ],
  bali: [
    { title: 'Uluwatu Sunset Cliffs', url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&fit=crop' },
    { title: 'Tegallalang Rice Terraces', url: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1600&fit=crop' },
    { title: 'Tanah Lot Ocean Temple', url: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1600&fit=crop' }
  ]
};

const DEFAULT_PRESETS = [
  { title: 'Scenic Mountain Sunset', url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&fit=crop' },
  { title: 'Tropical Azure Coastline', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&fit=crop' },
  { title: 'Historic European Alley', url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1600&fit=crop' },
  { title: 'Alpine Forest Lake', url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&fit=crop' }
];

export default function CoverPhotoModal({ isOpen, onClose, destination = '', currentCover = '', onSelectCover }) {
  const [customUrl, setCustomUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);

  if (!isOpen) return null;

  const destKey = destination.toLowerCase().replace(/[^a-z]/g, '');
  const matchingKey = Object.keys(DESTINATION_PRESETS).find(k => destKey.includes(k));
  const presets = matchingKey ? DESTINATION_PRESETS[matchingKey] : DEFAULT_PRESETS;

  const handleApply = (url) => {
    onSelectCover(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Image size={18} />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">Change Cover Photo</h3>
              <p className="text-[11px] text-slate-500 font-medium">Select a curated photo for {destination || 'your trip'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Custom URL Input */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Paste Custom Image URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={customUrl}
                onChange={(e) => {
                  setCustomUrl(e.target.value);
                  setPreviewUrl(e.target.value);
                }}
                className="flex-1 text-xs border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="button"
                disabled={!customUrl.trim()}
                onClick={() => handleApply(customUrl.trim())}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer flex-shrink-0"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Curated Presets Grid */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Curated Presets ({presets.length})
              </span>
              <span className="text-[10px] text-blue-600 font-bold flex items-center gap-1">
                <Sparkles size={11} /> High Resolution
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {presets.map((preset, idx) => {
                const isSelected = currentCover === preset.url;
                return (
                  <div
                    key={idx}
                    onClick={() => handleApply(preset.url)}
                    className={`group relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all aspect-video ${
                      isSelected ? 'border-blue-600 ring-2 ring-blue-300' : 'border-slate-200 hover:border-blue-400'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-2 text-white">
                      <span className="text-[11px] font-bold leading-tight drop-shadow-xs">{preset.title}</span>
                    </div>
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 bg-blue-600 text-white rounded-full p-0.5">
                        <Check size={12} className="stroke-[3]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 px-4 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
