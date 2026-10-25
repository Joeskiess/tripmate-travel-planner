import React, { useState } from 'react';
import { Plus, DollarSign, PieChart, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function BudgetTracker({ places, budget = 950 }) {
  // Aggregate expenses from places
  const initialExpenses = places.map(p => ({
    id: p.id,
    name: p.name,
    category: p.expenseCategory || 'Attractions',
    amount: p.cost || 0,
    paidBy: 'You',
    splitCount: 1
  })).filter(e => e.amount > 0);

  const [expenses, setExpenses] = useState(initialExpenses);
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('Food & Drinks');
  const [tripmatesCount, setTripmatesCount] = useState(2);

  const totalSpent = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const remaining = budget - totalSpent;
  const progressPercent = Math.min(100, Math.round((totalSpent / budget) * 100));

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAmount) return;
    const newEntry = {
      id: 'custom-' + Date.now(),
      name: newTitle.trim(),
      category: newCategory,
      amount: parseFloat(newAmount),
      paidBy: 'You',
      splitCount: tripmatesCount
    };
    setExpenses([newEntry, ...expenses]);
    setNewTitle('');
    setNewAmount('');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <DollarSign className="text-emerald-500" />
            Trip Budget & Expense Tracker
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Track costs, convert currencies, and split expenses with tripmates automatically.
          </p>
        </div>

        {/* Tripmates split selector */}
        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs">
          <Users size={14} className="text-slate-500" />
          <span className="text-slate-600 font-medium">Split with:</span>
          <select 
            value={tripmatesCount} 
            onChange={(e) => setTripmatesCount(Number(e.target.value))}
            className="bg-transparent font-bold text-slate-900 outline-none cursor-pointer"
          >
            <option value={1}>Solo (1 person)</option>
            <option value={2}>2 tripmates</option>
            <option value={3}>3 tripmates</option>
            <option value={4}>4 tripmates</option>
          </select>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
          <span className="text-xs font-semibold text-slate-500 uppercase">Total Budget</span>
          <div className="text-2xl font-bold text-slate-900 mt-1">€{budget}</div>
          <span className="text-[11px] text-slate-400">Target for 5 days</span>
        </div>

        <div className="bg-emerald-50/60 rounded-xl p-4 border border-emerald-200/60">
          <span className="text-xs font-semibold text-emerald-700 uppercase">Total Spent</span>
          <div className="text-2xl font-bold text-emerald-900 mt-1">€{totalSpent.toFixed(2)}</div>
          <span className="text-[11px] text-emerald-700">
            {tripmatesCount > 1 ? `€${(totalSpent / tripmatesCount).toFixed(2)} per person` : 'Solo expenditure'}
          </span>
        </div>

        <div className={`rounded-xl p-4 border ${remaining >= 0 ? 'bg-blue-50/60 border-blue-200/60' : 'bg-rose-50/60 border-rose-200/60'}`}>
          <span className={`text-xs font-semibold uppercase ${remaining >= 0 ? 'text-blue-700' : 'text-rose-700'}`}>
            {remaining >= 0 ? 'Remaining' : 'Over Budget'}
          </span>
          <div className={`text-2xl font-bold mt-1 ${remaining >= 0 ? 'text-blue-900' : 'text-rose-900'}`}>
            €{Math.abs(remaining).toFixed(2)}
          </div>
          <span className={`text-[11px] ${remaining >= 0 ? 'text-blue-600' : 'text-rose-600'}`}>
            {progressPercent}% of budget used
          </span>
        </div>
      </div>

      {/* Budget Bar */}
      <div className="mb-8">
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${progressPercent > 90 ? 'bg-rose-500' : progressPercent > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Quick Add Expense Form */}
      <form onSubmit={handleAddExpense} className="flex flex-wrap md:flex-nowrap gap-3 items-center bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
        <input 
          type="text" 
          placeholder="e.g. Metro 5-Day Pass or Hotel" 
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input 
          type="number" 
          step="0.01" 
          placeholder="Amount (€)" 
          value={newAmount}
          onChange={(e) => setNewAmount(e.target.value)}
          className="w-28 bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <select 
          value={newCategory} 
          onChange={(e) => setNewCategory(e.target.value)}
          className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none cursor-pointer"
        >
          <option value="Food & Drinks">Food & Drinks</option>
          <option value="Attractions">Attractions</option>
          <option value="Transportation">Transportation</option>
          <option value="Lodging">Lodging</option>
          <option value="Shopping">Shopping</option>
        </select>
        <button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Plus size={16} /> Add Expense
        </button>
      </form>

      {/* Expenses Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase text-slate-400 font-semibold border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Item</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Your Share</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {expenses.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-900">{item.name}</td>
                <td className="py-3 px-4">
                  <span className="inline-block text-[11px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                </td>
                <td className="py-3 px-4 font-bold text-slate-900">€{Number(item.amount).toFixed(2)}</td>
                <td className="py-3 px-4 text-emerald-600 font-semibold">
                  €{(Number(item.amount) / tripmatesCount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
