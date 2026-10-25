import React, { useState } from 'react';
import { X, Users, DollarSign, Scale, Copy, Check, Plus, Minus } from 'lucide-react';

export default function GroupSplitModal({
  isOpen,
  onClose,
  totalCost = 0,
  initialTripmates = 2,
  currencySymbol = '₹',
  onUpdateTripmates
}) {
  const [count, setCount] = useState(initialTripmates);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const perPerson = count > 0 ? (totalCost / count).toFixed(2) : 0;

  const handleCountChange = (delta) => {
    const next = Math.max(1, count + delta);
    setCount(next);
    if (onUpdateTripmates) onUpdateTripmates(next);
  };

  const handleCopy = () => {
    const text = `TripMate Cost Split Summary\nTotal Trip Cost: ${currencySymbol}${totalCost.toLocaleString()}\nNumber of Tripmates: ${count}\nEach Person's Share: ${currencySymbol}${perPerson}\nPlanned with TripMate`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Scale size={18} />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">Group Expense Balances</h3>
              <p className="text-[11px] text-slate-500 font-medium">Split group costs evenly among travel buddies</p>
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
        <div className="p-5 space-y-5">
          
          {/* High-Level Overview Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Total Trip Cost</span>
              <span className="text-lg font-black text-slate-900">{currencySymbol}{totalCost.toLocaleString()}</span>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-center">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">Per Person Share</span>
              <span className="text-lg font-black text-blue-700">{currencySymbol}{perPerson}</span>
            </div>
          </div>

          {/* Tripmates Counter */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-slate-600" />
              <div>
                <span className="text-xs font-bold text-slate-800 block">Number of Tripmates</span>
                <span className="text-[10px] text-slate-500">Including you</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleCountChange(-1)}
                disabled={count <= 1}
                className="w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 disabled:opacity-40 flex items-center justify-center text-slate-700 font-bold cursor-pointer"
              >
                <Minus size={13} />
              </button>
              <span className="w-6 text-center text-sm font-black text-slate-900">{count}</span>
              <button
                type="button"
                onClick={() => handleCountChange(1)}
                className="w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-700 font-bold cursor-pointer"
              >
                <Plus size={13} />
              </button>
            </div>
          </div>

          {/* Tripmate Roster Breakdown */}
          <div>
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Individual Roster
            </span>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {Array.from({ length: count }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                      {i === 0 ? 'You' : `T${i + 1}`}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        {i === 0 ? 'You (Organizer)' : `Tripmate ${i + 1}`}
                      </span>
                      <span className="text-[10px] text-slate-500">Equal split (1/{count})</span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-slate-800">
                    {currencySymbol}{perPerson}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl cursor-pointer"
          >
            Close
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            {copied ? <Check size={13} className="stroke-[3]" /> : <Copy size={13} />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
