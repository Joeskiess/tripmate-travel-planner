import React, { useState } from 'react';
import { CheckSquare, Square, Plus, CheckCircle2, Sparkles } from 'lucide-react';

export default function PackingChecklist({ initialItems = [] }) {
  const [items, setItems] = useState(initialItems);
  const [newItemText, setNewItemText] = useState('');
  const [category, setCategory] = useState('Clothing');

  const toggleItem = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, packed: !item.packed } : item));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    setItems([
      ...items,
      {
        id: 'pack-' + Date.now(),
        item: newItemText.trim(),
        category,
        packed: false
      }
    ]);
    setNewItemText('');
  };

  const packedCount = items.filter(i => i.packed).length;
  const progressPercent = items.length ? Math.round((packedCount / items.length) * 100) : 0;

  const categories = ['Documents', 'Clothing', 'Electronics', 'Gear'];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="text-blue-600" />
            Packing Lists & Checklists
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Stay organized before departure. Preset TripMate packing essentials for Paris.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-sm font-bold text-slate-900">{packedCount} of {items.length} packed</span>
            <div className="w-32 bg-slate-100 rounded-full h-2 mt-1 overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add new packing item */}
      <form onSubmit={handleAdd} className="flex gap-3 my-6">
        <input 
          type="text" 
          placeholder="Add an item (e.g. Scarf, Metro Card, Sunscreen)" 
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-sm outline-none cursor-pointer"
        >
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl text-sm flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Plus size={16} /> Add
        </button>
      </form>

      {/* Categorized List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(cat => {
          const catItems = items.filter(i => i.category === cat);
          if (catItems.length === 0) return null;

          return (
            <div key={cat} className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/70">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center justify-between">
                <span>{cat}</span>
                <span className="text-[11px] font-semibold text-slate-400">
                  {catItems.filter(i => i.packed).length}/{catItems.length}
                </span>
              </h3>
              <div className="space-y-2">
                {catItems.map(item => (
                  <div 
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className="flex items-center gap-3 p-2 rounded-lg bg-white border border-slate-200/60 cursor-pointer hover:border-slate-300 transition-all"
                  >
                    <button 
                      type="button" 
                      className={`text-slate-400 hover:text-blue-600 transition-colors ${item.packed ? 'text-emerald-500 hover:text-emerald-600' : ''}`}
                    >
                      {item.packed ? <CheckSquare size={18} /> : <Square size={18} />}
                    </button>
                    <span className={`text-sm ${item.packed ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}`}>
                      {item.item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
