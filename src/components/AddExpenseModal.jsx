import React, { useState } from 'react';
import { X, DollarSign, Calendar, Tag, User } from 'lucide-react';

export default function AddExpenseModal({ 
  isOpen, 
  onClose, 
  onSave, 
  onSaveExpense,
  currency = '₹' 
}) {
  if (!isOpen) return null;

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food & Drinks');
  const [paidBy, setPaidBy] = useState('You');
  const [date, setDate] = useState('2026-10-12');

  const categories = [
    { label: 'Food & Drinks', emoji: '🍔' },
    { label: 'Attractions', emoji: '🏛️' },
    { label: 'Transport', emoji: '🚆' },
    { label: 'Lodging', emoji: '🏨' },
    { label: 'Shopping', emoji: '🛍️' },
    { label: 'Other', emoji: '🏷️' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim() || !amount) return;

    const saveFn = onSave || onSaveExpense;
    if (saveFn) {
      saveFn({
        id: `exp-${Date.now()}`,
        description: description.trim(),
        amount: parseFloat(amount) || 0,
        category,
        paidBy,
        date
      });
    }

    setDescription('');
    setAmount('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative border border-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
        >
          <X size={18} />
        </button>

        <h3 className="text-xl font-extrabold text-[#212529] mb-1">Add an expense</h3>
        <p className="text-xs text-[#6c757d] mb-5">Track costs and split with tripmates.</p>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          
          {/* Description */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Description
            </label>
            <input
              type="text"
              placeholder="e.g., Dinner at Le Marais Bistro"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#212529] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Amount ({currency})
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">
                {currency}
              </span>
              <input
                type="number"
                step="any"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-8 pr-3.5 py-2.5 text-sm font-bold text-[#212529] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#212529] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
            >
              {categories.map((c) => (
                <option key={c.label} value={c.label}>
                  {c.emoji} {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Paid By */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Paid by
            </label>
            <input
              type="text"
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#212529] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
            />
          </div>

          {/* Date */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-[#212529] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
            >
              Save expense
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
