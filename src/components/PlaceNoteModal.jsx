import React, { useState, useEffect } from 'react';
import { X, MessageSquare, CheckSquare, Plus, Trash2, Check, FileText } from 'lucide-react';

export default function PlaceNoteModal({
  isOpen,
  onClose,
  place,
  onSave
}) {
  const [note, setNote] = useState('');
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtaskInput, setNewSubtaskInput] = useState('');

  useEffect(() => {
    if (place) {
      setNote(place.userNote || '');
      setSubtasks(place.subtasks || [
        { id: '1', text: 'Check admission requirements', done: false },
        { id: '2', text: 'Download offline map/directions', done: true }
      ]);
    }
  }, [place, isOpen]);

  if (!isOpen || !place) return null;

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (!newSubtaskInput.trim()) return;
    setSubtasks([
      ...subtasks,
      { id: `st-${Date.now()}`, text: newSubtaskInput.trim(), done: false }
    ]);
    setNewSubtaskInput('');
  };

  const handleToggleSubtask = (id) => {
    setSubtasks(subtasks.map(st => st.id === id ? { ...st, done: !st.done } : st));
  };

  const handleDeleteSubtask = (id) => {
    setSubtasks(subtasks.filter(st => st.id !== id));
  };

  const handleSave = () => {
    onSave(place.id, {
      userNote: note.trim(),
      subtasks
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <FileText size={18} />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-black text-slate-900 truncate">Notes & Subtasks</h3>
              <p className="text-[11px] text-slate-500 font-medium truncate">{place.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          
          {/* Note Section */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <MessageSquare size={13} className="text-blue-600" />
              <span>Personal Visit Notes</span>
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Pre-booked tickets for 10:00 AM slot. Remember to carry ID and avoid large backpacks..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full text-xs border border-slate-200 rounded-xl p-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Subtasks Section */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <CheckSquare size={13} className="text-blue-600" />
              <span>Checklist Subtasks ({subtasks.filter(s => s.done).length}/{subtasks.length})</span>
            </label>

            {/* List */}
            <div className="space-y-1.5 max-h-40 overflow-y-auto mb-2.5">
              {subtasks.map(st => (
                <div
                  key={st.id}
                  className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition-colors"
                >
                  <label className="flex items-center gap-2 cursor-pointer flex-1 min-w-0">
                    <input
                      type="checkbox"
                      checked={st.done}
                      onChange={() => handleToggleSubtask(st.id)}
                      className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                    />
                    <span className={`text-xs truncate ${st.done ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}`}>
                      {st.text}
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleDeleteSubtask(st.id)}
                    className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Subtask Input */}
            <form onSubmit={handleAddSubtask} className="flex gap-2">
              <input
                type="text"
                placeholder="Add subtask (e.g. 'Pack sunscreen')..."
                value={newSubtaskInput}
                onChange={(e) => setNewSubtaskInput(e.target.value)}
                className="flex-1 text-xs border border-slate-200 rounded-xl px-3 py-1.5 outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={!newSubtaskInput.trim()}
                className="bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 disabled:opacity-50 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              >
                + Add
              </button>
            </form>
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 px-4 py-2 rounded-xl cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold px-5 py-2 rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <Check size={14} className="stroke-[3]" />
            <span>Save Changes</span>
          </button>
        </div>

      </div>
    </div>
  );
}
