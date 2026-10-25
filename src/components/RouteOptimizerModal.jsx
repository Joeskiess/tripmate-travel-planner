import React, { useState, useEffect } from 'react';
import { X, Zap, ArrowRight, Route, Clock, Check, Cpu, Sparkles, MoveRight, Layers, BarChart3 } from 'lucide-react';
import { optimizeRouteWithQuantumGraph } from '../services/quantumRouteOptimizer';

export default function RouteOptimizerModal({ 
  isOpen, 
  onClose, 
  onApplyOptimization, 
  dayTitle = 'Day Itinerary', 
  places = []
}) {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (isOpen && places && places.length > 0) {
      setIsOptimizing(true);
      setApplied(false);

      // Run Simulated Quantum Annealing on the Graph
      const timer = setTimeout(() => {
        try {
          const result = optimizeRouteWithQuantumGraph(places);
          setOptimizationResult(result);
        } catch (e) {
          console.error("Quantum optimization error:", e);
        } finally {
          setIsOptimizing(false);
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isOpen, places]);

  if (!isOpen) return null;

  const handleApply = () => {
    if (!optimizationResult) return;
    setApplied(true);
    setTimeout(() => {
      onApplyOptimization(optimizationResult.optimizedPlaces);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
              <Zap size={18} className="text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base leading-tight">
                Quantum Route Optimizer
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Graph Data Structure + Simulated Quantum Annealing (TSP)
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6">
          
          {/* Day & Stops Summary */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{dayTitle}</span>
              <span className="text-sm font-extrabold text-slate-900">{places.length} Waypoint Stops in Graph</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
              <Cpu size={13} className="text-blue-600" />
              <span>Ising Spin QUBO</span>
            </div>
          </div>

          {/* Calculating State */}
          {isOptimizing ? (
            <div className="py-10 text-center space-y-3">
              <div className="inline-block w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <h4 className="font-bold text-sm text-slate-800">Simulating Quantum Annealing...</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Relaxing transverse magnetic field Γ and executing 2-opt graph edge inversions across high-barrier state space.
              </p>
            </div>
          ) : optimizationResult && (
            <div>
              {/* Savings Comparison Cards */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                
                <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-center">
                  <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider">Distance Reduction</span>
                  <div className="text-xl font-black text-blue-800 mt-0.5 flex items-center justify-center gap-1">
                    <Route size={16} className="text-blue-600" />
                    <span>-{optimizationResult.distanceSavedKm} km</span>
                  </div>
                  <span className="text-[11px] text-blue-600 font-bold">
                    {optimizationResult.percentageSaved}% shorter path
                  </span>
                </div>

                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Time Saved</span>
                  <div className="text-xl font-black text-emerald-800 mt-0.5 flex items-center justify-center gap-1">
                    <Clock size={16} className="text-emerald-600" />
                    <span>~{optimizationResult.timeSavedMinutes} mins</span>
                  </div>
                  <span className="text-[11px] text-emerald-600 font-bold">
                    Reduced backtracking
                  </span>
                </div>

              </div>

              {/* Quantum Engine Diagnostics */}
              <div className="bg-slate-900 text-slate-200 rounded-xl p-3.5 mb-5 text-xs space-y-1.5 font-mono shadow-inner">
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>Quantum Annealing Iterations</span>
                  <span className="text-cyan-400 font-bold">{optimizationResult.quantumSteps} steps</span>
                </div>
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>Quantum Tunneling Transitions</span>
                  <span className="text-amber-300 font-bold">{optimizationResult.tunnelingEvents} barrier tunnels</span>
                </div>
                <div className="flex items-center justify-between text-slate-400 text-[11px] pt-1 border-t border-slate-800">
                  <span>Initial Tour Length: <b className="text-white">{optimizationResult.originalDistanceKm} km</b></span>
                  <span>Optimal Tour: <b className="text-cyan-400">{optimizationResult.optimizedDistanceKm} km</b></span>
                </div>
              </div>

              {/* Optimized Sequence Preview */}
              <div className="mb-6">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Optimal Visiting Sequence:
                </span>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {optimizationResult.optimizedPlaces.map((p, idx) => (
                    <div 
                      key={p.id || idx}
                      className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200/60 rounded-lg text-xs"
                    >
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-black text-[10px] flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-slate-800 truncate flex-1">{p.name}</span>
                      <span className="text-[10px] text-slate-400">{p.category || 'Stop'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Apply Action Button */}
              <button
                onClick={handleApply}
                disabled={applied}
                className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                  applied 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:opacity-95 text-white'
                }`}
              >
                {applied ? (
                  <>
                    <Check size={16} /> Route Successfully Applied to Map!
                  </>
                ) : (
                  <>
                    <Zap size={15} className="text-amber-300" /> Apply Quantum-Optimized Sequence ({optimizationResult.percentageSaved}% Faster)
                  </>
                )}
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
