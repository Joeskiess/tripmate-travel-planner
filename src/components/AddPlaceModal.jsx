import React, { useState } from 'react';
import { X, MapPin, Sparkles, Tag, Euro } from 'lucide-react';

export default function AddPlaceModal({ isOpen, onClose, onAddPlace, currentDayIndex }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Attractions');
  const [price, setPrice] = useState('Free');
  const [cost, setCost] = useState('');
  const [tip, setTip] = useState('');
  const [image, setImage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Default coordinates in Paris center slightly randomized if not custom
    const lat = 48.8566 + (Math.random() - 0.5) * 0.03;
    const lng = 2.3522 + (Math.random() - 0.5) * 0.04;

    const defaultImages = [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1549144511-f099e773c147?w=600&auto=format&fit=crop&q=80"
    ];

    const placeObj = {
      id: 'place-' + Date.now(),
      name: name.trim(),
      category,
      price,
      cost: cost ? parseFloat(cost) : 0,
      rating: 4.8,
      coords: [lat, lng],
      image: image.trim() || defaultImages[Math.floor(Math.random() * defaultImages.length)],
      tips: tip.trim() ? [tip.trim()] : ["Recommended stop in Paris"],
      transitToNext: "10 min walk · 0.45 mi",
      visited: false
    };

    onAddPlace(placeObj);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-lg">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <MapPin size={18} />
            </div>
            Add Place to Itinerary
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Place Name</label>
            <input 
              type="text" 
              placeholder="e.g. Sainte-Chapelle, Le Marais Bakery" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm outline-none"
              >
                <option value="Monument">Monument</option>
                <option value="Museum">Museum</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Café">Café</option>
                <option value="Bakery">Bakery</option>
                <option value="Park & Garden">Park & Garden</option>
                <option value="Shopping">Shopping</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Price Tier</label>
              <select 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm outline-none"
              >
                <option value="Free">Free</option>
                <option value="€">€ (Budget)</option>
                <option value="€€">€€ (Moderate)</option>
                <option value="€€€">€€€ (Expensive)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Est. Cost (€)</label>
              <input 
                type="number" 
                placeholder="0" 
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Image URL (Optional)</label>
              <input 
                type="url" 
                placeholder="https://..." 
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Traveler Tip / Secret</label>
            <textarea 
              rows={2}
              placeholder="e.g. Best light at sunset, reserve tickets 2 days in advance"
              value={tip}
              onChange={(e) => setTip(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-3">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md transition-colors"
            >
              Add to Trip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
