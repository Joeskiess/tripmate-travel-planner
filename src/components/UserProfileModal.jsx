import React from 'react';
import { X, User, Database, Printer, Settings, LogOut, Check, Globe, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import facelessAvatar from '../assets/faceless-avatar.png';

export default function UserProfileModal({
  isOpen,
  onClose,
  currencySymbol = '₹',
  onCurrencyChange,
  distanceUnit = 'km',
  onDistanceUnitChange,
  savedTripsCount = 1,
  onExportPdf,
  onOpenHub
}) {
  if (!isOpen) return null;

  const currencies = [
    { sym: '₹', label: 'INR (₹)' },
    { sym: '$', label: 'USD ($)' },
    { sym: '€', label: 'EUR (€)' },
    { sym: '£', label: 'GBP (£)' }
  ];

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header with Avatar */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/80 shadow-md bg-white">
              <img src={facelessAvatar} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-black leading-tight">Joe Traveler</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
              <p className="text-xs text-blue-100 font-mono">traveler@tripmate.io</p>
              <span className="inline-block text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider mt-1">
                Verified Explorer
              </span>
            </div>
          </div>
        </div>

        {/* Travel Stats */}
        <div className="grid grid-cols-3 border-b border-slate-100 text-center py-3 bg-slate-50">
          <div>
            <span className="text-base font-black text-slate-900 block">{savedTripsCount}</span>
            <span className="text-[10px] text-slate-500 font-semibold uppercase">Trips</span>
          </div>
          <div className="border-x border-slate-200/80">
            <span className="text-base font-black text-slate-900 block">12</span>
            <span className="text-[10px] text-slate-500 font-semibold uppercase">Stops</span>
          </div>
          <div>
            <span className="text-base font-black text-slate-900 block">4</span>
            <span className="text-[10px] text-slate-500 font-semibold uppercase">Countries</span>
          </div>
        </div>

        {/* Body Preferences */}
        <div className="p-5 space-y-4">
          
          {/* Currency Preference */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Globe size={13} className="text-blue-600" />
              <span>Preferred Currency</span>
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {currencies.map(c => (
                <button
                  key={c.sym}
                  type="button"
                  onClick={() => onCurrencyChange && onCurrencyChange(c.sym)}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer ${
                    currencySymbol === c.sym
                      ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-200'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {c.sym} {c.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Distance Unit Preference */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <MapPin size={13} className="text-blue-600" />
              <span>Distance Display Units</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onDistanceUnitChange && onDistanceUnitChange('km')}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  distanceUnit === 'km'
                    ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-200'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Metric (km / meters)
              </button>
              <button
                type="button"
                onClick={() => onDistanceUnitChange && onDistanceUnitChange('mi')}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  distanceUnit === 'mi'
                    ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-200'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                Imperial (miles / feet)
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <Link
              to="/dashboard"
              onClick={onClose}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors"
            >
              <div className="flex items-center gap-2">
                <Database size={15} className="text-blue-600" />
                <span>PostgreSQL Database Hub</span>
              </div>
              <span className="text-[10px] text-slate-400">Open ↗</span>
            </Link>

            <button
              type="button"
              onClick={() => {
                onClose();
                if (onExportPdf) onExportPdf();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Printer size={15} className="text-blue-600" />
                <span>Export Itinerary as PDF</span>
              </div>
              <span className="text-[10px] text-slate-400">Print ↗</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              alert("Signed out from session. Reloading guest traveler workspace...");
              window.location.reload();
            }}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <LogOut size={13} />
            <span>Switch Account</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 px-4 py-1.5 rounded-xl cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
