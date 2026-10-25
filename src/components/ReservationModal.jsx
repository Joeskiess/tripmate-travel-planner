import React, { useState, useEffect } from 'react';
import { X, Plane, Bed, Car, Train, Paperclip, MoreHorizontal, Plus, Check, DollarSign, Calendar, FileText } from 'lucide-react';

const CATEGORIES = [
  { key: 'Flight', icon: Plane, label: 'Flight', color: 'text-sky-600 bg-sky-50' },
  { key: 'Lodging', icon: Bed, label: 'Lodging', color: 'text-amber-600 bg-amber-50' },
  { key: 'Rental car', icon: Car, label: 'Rental Car', color: 'text-emerald-600 bg-emerald-50' },
  { key: 'Train', icon: Train, label: 'Train', color: 'text-indigo-600 bg-indigo-50' },
  { key: 'Attachment', icon: Paperclip, label: 'Attachment', color: 'text-purple-600 bg-purple-50' },
  { key: 'Other', icon: MoreHorizontal, label: 'Other', color: 'text-slate-600 bg-slate-50' }
];

export default function ReservationModal({
  isOpen,
  onClose,
  initialType = 'Flight',
  currencySymbol = '₹',
  onSaveReservation
}) {
  const [type, setType] = useState(initialType);
  const [title, setTitle] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [cost, setCost] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialType) setType(initialType);
  }, [initialType, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newRes = {
      id: `res-${Date.now()}`,
      type,
      title: title.trim(),
      confirmationCode: confirmationCode.trim() || `RES-${Math.floor(100000 + Math.random() * 900000)}`,
      dateTime: dateTime.trim() || 'Scheduled',
      cost: parseFloat(cost) || 0,
      notes: notes.trim(),
      createdAt: new Date().toISOString()
    };

    onSaveReservation(newRes);
    setTitle('');
    setConfirmationCode('');
    setDateTime('');
    setCost('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Plus size={18} />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">Add Reservation or Booking</h3>
              <p className="text-[11px] text-slate-500 font-medium">Keep your travel confirmations in one place</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          
          {/* Category Tabs */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Reservation Category
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              {CATEGORIES.map(cat => {
                const Icon = cat.icon;
                const isSelected = type === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setType(cat.key)}
                    className={`flex flex-col items-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 text-blue-700 font-bold ring-2 ring-blue-200'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Icon size={16} className={`mb-1 ${isSelected ? 'text-blue-600' : 'text-slate-500'}`} />
                    <span className="text-[10px] truncate max-w-full">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Provider / Title */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Title / Provider / Carrier *
            </label>
            <input
              type="text"
              required
              placeholder={
                type === 'Flight' ? 'e.g. Air France AF 1234 (CDG to FCO)' :
                type === 'Lodging' ? 'e.g. Hotel Artemide Rome (Deluxe Room)' :
                type === 'Rental car' ? 'e.g. Hertz Compact SUV (Airport Pickup)' :
                type === 'Train' ? 'e.g. Frecciarossa Fast Train 9512' :
                type === 'Attachment' ? 'e.g. Schengen Visa Document / Museum Voucher' :
                'e.g. Guided Vatican Tour Booking'
              }
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Code & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Confirmation / PNR Code
              </label>
              <input
                type="text"
                placeholder="e.g. AF-982401"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                Date & Timing
              </label>
              <input
                type="text"
                placeholder="e.g. Oct 27, 10:30 AM"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Cost */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Cost ({currencySymbol})
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                {currencySymbol}
              </span>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="0.00"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-xl pl-7 pr-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 font-bold"
              />
            </div>
          </div>

          {/* Notes / Details */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
              Important Notes / PDF Attachment Reference
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Terminal 2E, Check-in counter 4. Passport and barcode required at gate."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 px-4 py-2 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <Check size={14} className="stroke-[3]" />
              <span>Save Reservation</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
