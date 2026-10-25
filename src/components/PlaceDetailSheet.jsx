import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Check, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Phone, 
  Globe, 
  ExternalLink, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  Bookmark, 
  Camera, 
  MessageSquare, 
  Ticket,
  Hourglass,
  DollarSign
} from 'lucide-react';

export default function PlaceDetailSheet({ 
  place, 
  onClose, 
  onAskAi, 
  onToggleVisited,
  isVisited = false,
  onAddToTrip,
  isAdded = true,
  currencySymbol = '₹'
}) {
  const [activeTab, setActiveTab] = useState('about');
  const [showHoursDropdown, setShowHoursDropdown] = useState(false);
  const [bookingToast, setBookingToast] = useState(null);

  const handleBookTickets = (type) => {
    const query = encodeURIComponent((place?.name || '') + ' tickets tours');
    window.open('https://www.getyourguide.com/s/?q=' + query, '_blank');
    setBookingToast('Opening verified ticket provider for ' + (place?.name || 'this location') + '...');
    setTimeout(() => setBookingToast(null), 3500);
  };

  if (!place) return null;

  // AI preset questions for quick interactive answers
  const aiQuestions = [
    "Tour guide",
    "What are the admission fees?",
    "Are there any free entry days?",
    "Is the museum wheelchair accessible?",
    "How to get here by public transit?"
  ];

  // Weekly hours schedule
  const weeklyHours = [
    { day: "Monday", hours: place.name?.includes("Louvre") ? "9:00 AM – 6:00 PM" : (place.name?.includes("Air") ? "Closed" : "9:30 AM – 5:30 PM") },
    { day: "Tuesday", hours: place.name?.includes("Louvre") ? "Closed" : "10:00 AM – 5:00 PM" },
    { day: "Wednesday", hours: "10:00 AM – 5:00 PM" },
    { day: "Thursday", hours: "10:00 AM – 5:00 PM" },
    { day: "Friday", hours: place.name?.includes("Louvre") ? "9:00 AM – 9:45 PM" : "10:00 AM – 5:00 PM" },
    { day: "Saturday", hours: "10:00 AM – 5:00 PM" },
    { day: "Sunday", hours: "10:00 AM – 5:00 PM" },
  ];

  // Dynamic defaults tailored to active destination
  const defaultDesc = place.description || place.subtitle || 
    `Iconic premier destination in ${place.city || 'the region'} offering an unforgettable cultural and scenic experience.`;

  const categories = place.categories || [place.category || "Sightseeing", "Top Landmark", "Popular Attraction"];
  const address = place.address || (place.coords ? `${place.coords[0].toFixed(4)}° N, ${place.coords[1].toFixed(4)}° E` : "Central District");
  const phone = place.phone || "+1 (800) 555-0199";
  const website = place.website || (place.name ? `https://www.google.com/search?q=${encodeURIComponent(place.name)}` : "#");
  const reviewCount = place.reviewsCount || 42800;
  const rating = place.rating || 4.8;
  const duration = place.duration || "People typically spend 2 hr to 3 hr here";

  const baseCost = place.cost !== undefined ? place.cost : 15;
  const formattedCost = baseCost === 0 
    ? 'Free' 
    : currencySymbol === '₹' 
      ? `₹${Math.round(baseCost * 92).toLocaleString()}` 
      : currencySymbol === '€' 
        ? `€${baseCost.toFixed(2)}` 
        : `$${Math.round(baseCost * 1.08).toFixed(2)}`;

  return (
    <div className="absolute bottom-0 left-0 right-0 max-h-[88%] bg-white rounded-t-3xl shadow-2xl border-t border-x border-[#ced4da] z-[500] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
      
      {/* 1. Header Drag / Close & Tabs */}
      <div className="border-b border-[#e9ecef] bg-white sticky top-0 z-20">
        <div className="flex items-center justify-between px-5 pt-3 pb-1">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-6 text-xs font-bold">
            {['About', 'Book', 'Reviews', 'Photos', 'Mentions'].map((tab) => {
              const tabKey = tab.toLowerCase();
              const isActive = activeTab === tabKey;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tabKey)}
                  className={`pb-2.5 transition-colors relative cursor-pointer ${
                    isActive ? 'text-[#212529]' : 'text-[#6c757d] hover:text-[#212529]'
                  }`}
                >
                  <span>{tab}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#212529] rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Action dock: Delete & Close buttons */}
          <div className="flex items-center gap-1.5">
            {onDeletePlace && (
              <button
                type="button"
                onClick={() => {
                  onDeletePlace(place.id);
                  onClose();
                }}
                className="w-7 h-7 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-colors cursor-pointer"
                title="Delete stop from trip"
              >
                <Trash2 size={13} />
              </button>
            )}
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-[#495057] flex items-center justify-center transition-colors cursor-pointer"
              title="Close details"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Scrollable Body */}
      <div className="overflow-y-auto p-5 space-y-4">
        
        {/* ========================================================
            TAB 1: ABOUT (EXACT SCREENSHOT 5 MATCH)
        ======================================================== */}
        {activeTab === 'about' && (
          <div className="space-y-4">
            
            {/* Title & Photo Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-2.5 flex-1 min-w-0">
                <div className="w-7 h-7 rounded-full bg-[#2563eb] text-white font-extrabold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  {place.number || 3}
                </div>
                <div>
                  <h2 className="text-xl font-black text-[#212529] leading-tight">
                    {place.name}
                  </h2>
                </div>
              </div>

              {/* Right Photo Thumbnail */}
              <div className="w-24 h-18 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200 shadow-sm">
                <img 
                  src={place.image} 
                  alt={place.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Description Paragraph */}
            <p className="text-xs text-[#495057] leading-relaxed">
              {defaultDesc}
            </p>

            {/* Action Buttons: "Added ✓", "Mark as visited" & "Delete Stop" */}
            <div className="flex items-center gap-2.5 pt-1 flex-wrap">
              <button
                onClick={() => onAddToTrip && onAddToTrip(place)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                  isAdded 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <Check size={14} className="stroke-[3]" />
                <span>{isAdded ? "Added" : "+ Add to trip"}</span>
              </button>

              <button
                onClick={() => onToggleVisited && onToggleVisited(place.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                  isVisited
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-[#ced4da] bg-white hover:bg-slate-50 text-[#212529]'
                }`}
              >
                <CheckCircle2 size={14} className={isVisited ? "text-emerald-600" : "text-[#adb5bd]"} />
                <span>{isVisited ? "Visited" : "Mark as visited"}</span>
              </button>

              {onDeletePlace && (
                <button
                  type="button"
                  onClick={() => {
                    onDeletePlace(place.id);
                    onClose();
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                  title="Delete stop from trip"
                >
                  <Trash2 size={13} />
                  <span>Delete Stop</span>
                </button>
              )}
            </div>

            {/* Budgeting & Cost Info Box */}
            <div className="flex items-center justify-between p-2.5 bg-[#f8f9fa] rounded-xl border border-[#e9ecef] text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[#6c757d] font-semibold">Estimated cost:</span>
                <span className="font-extrabold text-[#212529]">{formattedCost}</span>
              </div>
              <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px] bg-emerald-50 px-2 py-0.5 rounded-md">
                <Check size={12} className="stroke-[2.5]" />
                <span>Tracked in budget</span>
              </span>
            </div>

            {/* AI Suggestion Question Chips */}
            <div className="pt-1">
              <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none">
                <button
                  onClick={() => onAskAi && onAskAi(`Tell me interesting insider tips and costs for ${place.name}`)}
                  className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] text-white font-extrabold text-xs px-3 py-1.5 rounded-full flex-shrink-0 hover:opacity-90 shadow-xs cursor-pointer"
                >
                  <Sparkles size={13} />
                  <span>Ask AI</span>
                </button>

                {aiQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => onAskAi && onAskAi(`${q} for ${place.name}`)}
                    className="inline-flex items-center bg-[#f8f9fa] hover:bg-slate-100 border border-[#dee2e6] text-[#212529] font-medium text-xs px-3 py-1.5 rounded-full flex-shrink-0 transition-colors cursor-pointer"
                  >
                    <span>{q}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="bg-[#f1f3f5] text-[#495057] text-[11px] font-semibold px-2.5 py-1 rounded-lg"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Detailed Meta Information List */}
            <div className="border-t border-[#f1f3f5] pt-3 space-y-2.5 text-xs text-[#212529]">
              
              {/* Rating & Mentions */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 font-bold">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  <span>{rating}</span>
                  <span className="text-[#6c757d] font-normal">({reviewCount.toLocaleString()})</span>
                  <span className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white text-[9px] font-extrabold flex items-center justify-center ml-0.5">G</span>
                </div>
                <span className="text-[#dee2e6]">•</span>
                <div className="flex items-center gap-1 text-[#495057]">
                  <Bookmark size={13} className="text-[#6c757d]" />
                  <span>Mentioned on 2 lists</span>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2 text-[#495057]">
                <MapPin size={14} className="text-[#adb5bd] flex-shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>

              {/* Opening Hours Accordion */}
              <div>
                <button
                  onClick={() => setShowHoursDropdown(!showHoursDropdown)}
                  className="flex items-center gap-2 text-[#495057] hover:text-[#212529] font-medium cursor-pointer w-full text-left"
                >
                  <Clock size={14} className="text-[#adb5bd] flex-shrink-0" />
                  <span className="font-semibold text-emerald-700">Open now</span>
                  <span>•</span>
                  <span>Saturday: 10AM–5PM</span>
                  {showHoursDropdown ? <ChevronUp size={13} className="text-[#adb5bd]" /> : <ChevronDown size={13} className="text-[#adb5bd]" />}
                </button>

                {showHoursDropdown && (
                  <div className="mt-2 ml-5 p-2.5 bg-[#f8f9fa] rounded-xl border border-[#e9ecef] space-y-1 text-[11px] text-[#495057]">
                    {weeklyHours.map((wh) => (
                      <div key={wh.day} className="flex justify-between">
                        <span className="font-semibold">{wh.day}</span>
                        <span>{wh.hours}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Duration */}
              <div className="flex items-center gap-2 text-[#495057]">
                <Hourglass size={14} className="text-[#adb5bd] flex-shrink-0" />
                <span>{duration}</span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2 text-[#495057]">
                <Phone size={14} className="text-[#adb5bd] flex-shrink-0" />
                <span>{phone}</span>
              </div>

              {/* Official Website */}
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-[#adb5bd] flex-shrink-0" />
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2563eb] hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Official website</span>
                  <ExternalLink size={11} />
                </a>
              </div>

            </div>

            {/* External Links */}
            <div className="border-t border-[#f1f3f5] pt-3 flex items-center gap-3 text-xs">
              <span className="text-[#6c757d] font-semibold">Open in:</span>
              <a
                href={`https://www.tripadvisor.com/Search?q=${encodeURIComponent(place.name + ' Paris')}`}
                target="_blank"
                rel="noreferrer"
                className="text-[#2563eb] hover:underline font-bold"
              >
                <span>Tripadvisor</span>
              </a>
              <span className="text-[#dee2e6]">•</span>
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(place.name + ' Paris')}`}
                target="_blank"
                rel="noreferrer"
                className="text-[#2563eb] hover:underline font-bold"
              >
                <span>Google</span>
              </a>
              <span className="text-[#dee2e6]">•</span>
              <a
                href={`https://maps.google.com/?q=${place.coords ? place.coords[0] + ',' + place.coords[1] : encodeURIComponent(place.name)}`}
                target="_blank"
                rel="noreferrer"
                className="text-[#2563eb] hover:underline font-bold"
              >
                <span>Google Maps</span>
              </a>
            </div>

          </div>
        )}

        {/* ========================================================
            TAB 2: BOOK
        ======================================================== */}
        {activeTab === 'book' && (
          <div className="space-y-3">
            {bookingToast && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-2 mb-3">
                <Check size={14} className="text-emerald-600" />
                <span>{bookingToast}</span>
              </div>
            )}
            <h4 className="text-xs font-bold text-[#212529]">Available Tickets & Tours</h4>
            <div className="p-3 bg-[#f8f9fa] border border-[#e9ecef] rounded-xl flex items-center justify-between">
              <div>
                <h5 className="font-bold text-xs text-[#212529]">Skip-the-line Admission</h5>
                <p className="text-[11px] text-[#6c757d]">Permanent collections + audio guide access</p>
                <span className="text-xs font-extrabold text-[#212529]">{formattedCost} per person</span>
              </div>
              <button 
                onClick={() => handleBookTickets("admission")}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer"
              >
                Book
              </button>
            </div>

            <div className="p-3 bg-[#f8f9fa] border border-[#e9ecef] rounded-xl flex items-center justify-between">
              <div>
                <h5 className="font-bold text-xs text-[#212529]">Guided Highlights Tour</h5>
                <p className="text-[11px] text-[#6c757d]">2-hour expert guided walk through history</p>
                <span className="text-xs font-extrabold text-[#212529]">
                  {currencySymbol === '₹' ? '₹2,600 per person' : '€28.00 per person'}
                </span>
              </div>
              <button 
                onClick={() => handleBookTickets("tour")}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer"
              >
                Book
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: REVIEWS
        ======================================================== */}
        {activeTab === 'reviews' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-[#212529]">{rating}</span>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400" />
                ))}
              </div>
              <span className="text-xs text-[#6c757d]">({reviewCount.toLocaleString()} reviews on Google)</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-[#f8f9fa] rounded-xl border border-[#e9ecef]">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[#212529]">Marc Dupont</span>
                  <span className="text-[10px] text-[#adb5bd]">3 days ago</span>
                </div>
                <p className="text-[#495057] leading-relaxed">
                  "Incredible collection! Seeing the two Concordes parked side by side is unbelievable. An absolute must-visit when in Paris."
                </p>
              </div>

              <div className="p-3 bg-[#f8f9fa] rounded-xl border border-[#e9ecef]">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[#212529]">Sarah Jenkins</span>
                  <span className="text-[10px] text-[#adb5bd]">1 week ago</span>
                </div>
                <p className="text-[#495057] leading-relaxed">
                  "Extremely well preserved exhibits and great interactive simulators for kids and adults. Easily 3 to 4 hours well spent."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: PHOTOS
        ======================================================== */}
        {activeTab === 'photos' && (
          <div className="grid grid-cols-3 gap-2">
            {[
              place.image,
              "https://images.unsplash.com/photo-1543349689-9a4d426bee8e?w=500&fit=crop",
              "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=500&fit=crop",
              "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&fit=crop",
              "https://images.unsplash.com/photo-1565099824688-e93eb20fe622?w=500&fit=crop",
              "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=500&fit=crop"
            ].map((imgUrl, i) => (
              <div key={i} className="h-24 rounded-xl overflow-hidden bg-slate-100">
                <img src={imgUrl} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
            ))}
          </div>
        )}

        {/* ========================================================
            TAB 5: MENTIONS
        ======================================================== */}
        {activeTab === 'mentions' && (
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-xs text-[#212529]">Featured in guides</h4>
            <div className="p-3 bg-[#f8f9fa] rounded-xl border border-[#e9ecef] flex items-center justify-between">
              <div>
                <h5 className="font-bold text-[#212529]">Top 10 Aviation Museums in the World</h5>
                <p className="text-[11px] text-[#6c757d]">Curated by TripMate Editorial</p>
              </div>
              <span className="text-blue-600 font-bold">#2</span>
            </div>
            <div className="p-3 bg-[#f8f9fa] rounded-xl border border-[#e9ecef] flex items-center justify-between">
              <div>
                <h5 className="font-bold text-[#212529]">Best Hidden Gems Near Paris</h5>
                <p className="text-[11px] text-[#6c757d]">45,000 saves</p>
              </div>
              <span className="text-blue-600 font-bold">#4</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
