import React from 'react';
import { X, ChevronRight, ChevronLeft, Check, Sparkles, MapPin } from 'lucide-react';

export default function OnboardingTourModal({ currentStep, onNext, onPrev, onClose }) {
  if (!currentStep) return null;

  return (
    <div className="fixed inset-0 z-[900] pointer-events-none flex items-center justify-center p-4">
      
      {/* Centered/Floating Tour Box (Clickable, pointer-events-auto) */}
      <div 
        className="pointer-events-auto bg-white rounded-3xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)] border border-slate-200 w-full max-w-[340px] relative animate-in fade-in zoom-in-95 duration-200"
        style={{
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)'
        }}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          title="Dismiss tour"
        >
          <X size={16} />
        </button>

        {/* Top Progress Indicator */}
        <div className="flex items-center gap-1.5 mb-4 pr-6">
          {[1, 2, 3, 4, 5].map((s) => (
            <div 
              key={s} 
              className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
                s === currentStep 
                  ? 'bg-[#2563eb]' 
                  : s < currentStep 
                    ? 'bg-blue-300' 
                    : 'bg-slate-200'
              }`}
            />
          ))}
        </div>

        {/* STEP 1: Add Places */}
        {currentStep === 1 && (
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#2563eb] mb-1">
              <MapPin size={14} />
              <span>Step 1 of 5</span>
            </div>
            <h4 className="font-extrabold text-base text-[#212529] mb-1.5 leading-snug">
              Add places to your trip
            </h4>
            <p className="text-xs text-[#6c757d] leading-relaxed mb-4">
              Type any museum, café, or landmark into the search bar, or pick from our curated Paris recommendations.
            </p>

            {/* Illustration */}
            <div className="h-28 bg-[#fafbfc] rounded-2xl flex items-center justify-center p-3 mb-4 border border-[#f1f3f5]">
              <div className="w-44 bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-2 text-xs">
                <span className="text-blue-600 font-bold">+</span>
                <span className="text-slate-400">Search "Eiffel Tower"...</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Leave notes or comments (SCREENSHOT 3 MATCH) */}
        {currentStep === 2 && (
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#2563eb] mb-1">
              <span>Step 2 of 5</span>
            </div>
            <h4 className="font-extrabold text-base text-[#212529] mb-1.5 leading-snug">
              Leave notes or comments
            </h4>
            <p className="text-xs text-[#6c757d] leading-relaxed mb-4">
              Share your thoughts so everyone is on the same page! Comment on a place or even make new notes.
            </p>

            {/* Graphic Illustration with Speech Bubbles (Exact Screenshot 3 Match) */}
            <div className="h-28 bg-[#fafbfc] rounded-2xl flex items-center justify-center p-3 mb-4 border border-[#f1f3f5]">
              <div className="relative w-32 bg-white p-2.5 rounded-xl shadow-xs border border-slate-200">
                <div className="bg-[#8b5cf6] text-white text-[9px] font-bold py-1 px-2.5 rounded-lg mb-1.5 text-center shadow-xs">
                  What do you think?
                </div>
                <div className="bg-[#06b6d4] text-white text-[9px] font-bold py-1 px-2.5 rounded-lg text-center shadow-xs">
                  Let's do it!
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Discover things to do (SCREENSHOT 4 MATCH) */}
        {currentStep === 3 && (
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#2563eb] mb-1">
              <span>Step 3 of 5</span>
            </div>
            <h4 className="font-extrabold text-base text-[#212529] mb-1.5 leading-snug">
              Discover things to do
            </h4>
            <p className="text-xs text-[#6c757d] leading-relaxed mb-4">
              Don't know where to start? Add places from top guides and blogs.
            </p>

            {/* Guide Card Preview Illustration (Exact Screenshot 4 Match) */}
            <div className="h-28 bg-[#fafbfc] rounded-2xl flex items-center justify-center p-3 mb-4 border border-[#f1f3f5]">
              <div className="w-36 bg-white p-2.5 rounded-xl shadow-xs border border-slate-200 text-left">
                <div className="text-[7px] text-[#adb5bd] uppercase font-bold">1.00 • Explore</div>
                <div className="text-[11px] font-black text-[#212529]">New York City</div>
                <div className="w-full h-1 bg-slate-100 rounded mt-1"></div>
                <div className="flex gap-1 mt-2">
                  <span className="w-8 h-2.5 bg-red-100 rounded text-[7px] text-red-500 font-bold px-1 flex items-center justify-center">Food</span>
                  <span className="w-8 h-2.5 bg-blue-100 rounded text-[7px] text-blue-500 font-bold px-1 flex items-center justify-center">Sights</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Visualize on the map */}
        {currentStep === 4 && (
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#2563eb] mb-1">
              <span>Step 4 of 5</span>
            </div>
            <h4 className="font-extrabold text-base text-[#212529] mb-1.5 leading-snug">
              Visualize on the map
            </h4>
            <p className="text-xs text-[#6c757d] leading-relaxed mb-4">
              See all your stops plotted on an interactive map. Filter by day to see clear routes without duplicate numbers.
            </p>

            {/* Map Pins Illustration */}
            <div className="h-28 bg-[#fafbfc] rounded-2xl flex items-center justify-center p-3 mb-4 border border-[#f1f3f5]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2563eb] text-white font-black text-xs flex items-center justify-center shadow-md">
                  1
                </div>
                <div className="w-10 border-t-2 border-dashed border-[#2563eb]"></div>
                <div className="w-8 h-8 rounded-full bg-[#2563eb] text-white font-black text-xs flex items-center justify-center shadow-md">
                  2
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Plan out your days (SCREENSHOT 5 MATCH) */}
        {currentStep === 5 && (
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#2563eb] mb-1">
              <span>Step 5 of 5</span>
            </div>
            <h4 className="font-extrabold text-base text-[#212529] mb-1.5 leading-snug">
              Plan out your days
            </h4>
            <p className="text-xs text-[#6c757d] leading-relaxed mb-4">
              Organize your trip by date and time. See distance info between places too.
            </p>

            {/* Timeline Cards Illustration (Exact Screenshot 5 Match) */}
            <div className="h-28 bg-[#fafbfc] rounded-2xl flex items-center justify-center p-2 mb-4 border border-[#f1f3f5]">
              <div className="w-full space-y-1.5">
                <div className="bg-white p-2 rounded-xl border border-slate-200 flex items-center gap-2 text-[9px] font-bold shadow-xs">
                  <span className="w-4 h-4 rounded-full bg-[#2563eb] text-white flex items-center justify-center text-[8px]">1</span>
                  <span className="truncate">The Metropolitan Museum of Art</span>
                </div>
                <div className="bg-white p-2 rounded-xl border border-slate-200 flex items-center gap-2 text-[9px] font-bold shadow-xs">
                  <span className="w-4 h-4 rounded-full bg-[#2563eb] text-white flex items-center justify-center text-[8px]">2</span>
                  <span className="truncate">The High Line</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Actions Row */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-bold">
          
          {/* Back or Step Counter */}
          {currentStep > 1 ? (
            <button
              onClick={onPrev}
              className="text-slate-500 hover:text-slate-800 transition-colors cursor-pointer py-1"
            >
              ← Back
            </button>
          ) : (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer py-1"
            >
              Skip tour
            </button>
          )}

          {/* Next tip or Got it */}
          {currentStep < 5 ? (
            <button
              onClick={onNext}
              className="text-[#2563eb] hover:text-blue-800 transition-colors cursor-pointer py-1"
            >
              Next tip →
            </button>
          ) : (
            <button
              onClick={onClose}
              className="bg-[#2563eb] hover:bg-blue-700 text-white px-4 py-1.5 rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              Got it
            </button>
          )}

        </div>

      </div>
    </div>
  );
}