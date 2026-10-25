import React, { useRef } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Calendar, 
  MapPin, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle,
  FileText,
  Share2
} from 'lucide-react';
import tripmateLogo from '../assets/tripmate-logo.png';

export default function ExportPdfModal({
  isOpen,
  onClose,
  tripTitle = 'Trip to Paris',
  destination = 'Paris, France',
  dates = '10/12 - 10/13',
  trip,
  currencySymbol = '₹',
  totalTripCost = 10580,
  budgetLimit = 12000,
  isOverBudget = false,
  notesText = '',
  expenses = []
}) {
  const printContentRef = useRef(null);

  if (!isOpen) return null;

  const placesToVisit = trip?.placesToVisit || [];
  const daySections = trip?.sections || [];

  // Total stops
  const totalStops = placesToVisit.length + daySections.reduce((sum, s) => sum + (s.places?.length || 0), 0);

  // Trigger browser print to Save as PDF
  const handlePrintPdf = () => {
    // Add print class to body temporarily
    document.body.classList.add('printing-itinerary');
    window.print();
    setTimeout(() => {
      document.body.classList.remove('printing-itinerary');
    }, 1000);
  };

  // Download standalone printable HTML/Doc
  const handleDownloadHtml = () => {
    if (!printContentRef.current) return;
    const content = printContentRef.current.innerHTML;
    const fullHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>TripMate - ${tripTitle}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #212529; padding: 30px; line-height: 1.5; }
          .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e9ecef; padding-bottom: 20px; margin-bottom: 25px; }
          .badge { display: inline-block; background: #2563eb; color: white; border-radius: 50%; width: 24px; height: 24px; text-align: center; line-height: 24px; font-weight: bold; font-size: 12px; margin-right: 8px; }
          .place-card { border: 1px solid #e9ecef; border-radius: 12px; padding: 15px; margin-bottom: 12px; page-break-inside: avoid; }
          .meta { color: #6c757d; font-size: 12px; margin-top: 4px; }
          .stats { display: flex; gap: 20px; margin-bottom: 25px; }
          .stat-card { background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 12px; padding: 15px; flex: 1; }
          h1 { margin: 0; font-size: 26px; }
          h2 { font-size: 18px; border-bottom: 1px solid #dee2e6; padding-bottom: 8px; margin-top: 25px; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>
        ${content}
      </body>
      </html>
    `;
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TripMate-${tripTitle.replace(/\s+/g, '-')}-Itinerary.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-[#e9ecef] flex items-center justify-between bg-white flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Printer size={18} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-[#212529]">Export Travel Itinerary</h3>
              <p className="text-[11px] text-[#6c757d]">Clean, printable PDF summary created with TripMate</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintPdf}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <Printer size={14} />
              <span>Print / Save as PDF</span>
            </button>

            <button
              onClick={handleDownloadHtml}
              className="bg-slate-100 hover:bg-slate-200 text-[#212529] text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download offline HTML document"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Download file</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer ml-1"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Itinerary Document Preview */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-100/60">
          <div 
            id="printable-itinerary"
            ref={printContentRef}
            className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-6 text-[#212529]"
          >
            
            {/* 1. Header with TripMate Logo & Title */}
            <div className="flex items-start justify-between border-b border-[#e9ecef] pb-6">
              <div>
                <img 
                  src={tripmateLogo} 
                  alt="TripMate" 
                  className="h-8 w-auto mb-3"
                />
                <h1 className="text-2xl font-black text-[#212529] leading-tight">
                  {tripTitle}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#6c757d] font-semibold mt-1.5">
                  <span className="flex items-center gap-1 text-[#212529]">
                    <MapPin size={13} className="text-blue-600" />
                    <span>{destination}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar size={13} />
                    <span>{dates}</span>
                  </span>
                  <span>•</span>
                  <span>{totalStops} planned stops</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-right">
                <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${
                  isOverBudget 
                    ? 'bg-rose-50 text-rose-700 border border-rose-200' 
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}>
                  {isOverBudget ? <AlertTriangle size={13} /> : <CheckCircle2 size={13} />}
                  <span>{isOverBudget ? 'Over Budget' : 'Within Budget'}</span>
                </span>
                <div className="text-[11px] text-[#6c757d] mt-1 font-semibold">
                  TripMate Verified Plan
                </div>
              </div>
            </div>

            {/* 2. Highlights / Summary Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#f8f9fa] rounded-xl p-3 border border-[#e9ecef]">
                <span className="text-[10px] font-bold text-[#6c757d] uppercase tracking-wider block">
                  Total Planned Cost
                </span>
                <span className="text-xl font-black text-[#212529]">
                  {currencySymbol}{totalTripCost.toLocaleString()}
                </span>
                <span className="text-[10px] text-[#6c757d] block mt-0.5">Places + logged costs</span>
              </div>

              <div className="bg-[#f8f9fa] rounded-xl p-3 border border-[#e9ecef]">
                <span className="text-[10px] font-bold text-[#6c757d] uppercase tracking-wider block">
                  Trip Budget
                </span>
                <span className="text-xl font-black text-[#212529]">
                  {currencySymbol}{budgetLimit.toLocaleString()}
                </span>
                <span className="text-[10px] text-[#6c757d] block mt-0.5">Target limit</span>
              </div>

              <div className={`rounded-xl p-3 border ${
                isOverBudget ? 'bg-rose-50/70 border-rose-200' : 'bg-emerald-50/70 border-emerald-200'
              }`}>
                <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                  isOverBudget ? 'text-rose-700' : 'text-emerald-700'
                }`}>
                  {isOverBudget ? 'Exceeded by' : 'Remaining'}
                </span>
                <span className={`text-xl font-black ${
                  isOverBudget ? 'text-rose-700' : 'text-emerald-700'
                }`}>
                  {currencySymbol}{Math.abs(budgetLimit - totalTripCost).toLocaleString()}
                </span>
                <span className={`text-[10px] block mt-0.5 ${
                  isOverBudget ? 'text-rose-600' : 'text-emerald-600'
                }`}>
                  {isOverBudget ? 'Action needed' : 'On track'}
                </span>
              </div>
            </div>

            {/* 3. Section: Places to Visit */}
            <div>
              <h2 className="text-base font-extrabold text-[#212529] border-b border-[#dee2e6] pb-2 mb-3 flex items-center justify-between">
                <span>Places to visit</span>
                <span className="text-xs font-semibold text-[#6c757d]">{placesToVisit.length} stops</span>
              </h2>

              <div className="space-y-3">
                {placesToVisit.map((p, idx) => (
                  <div key={p.id || idx} className="p-3.5 bg-white border border-[#e9ecef] rounded-xl flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-6 h-6 rounded-full bg-[#2563eb] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {p.number || idx + 1}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-sm text-[#212529]">
                          {p.name}
                        </h3>
                        <p className="text-xs text-[#495057] mt-0.5 leading-relaxed">
                          {p.subtitle || p.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#6c757d] mt-1.5">
                          <span className="font-semibold text-[#212529]">{p.category}</span>
                          <span>•</span>
                          <span>{p.address || 'Paris, France'}</span>
                          {p.phone && (
                            <>
                              <span>•</span>
                              <span>{p.phone}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="text-xs font-bold text-[#212529] bg-[#f8f9fa] border border-[#dee2e6] px-2 py-0.5 rounded-md">
                        {p.cost === 0 ? 'Free' : `${currencySymbol}${Math.round((p.cost || 15) * (currencySymbol === '₹' ? 92 : 1)).toLocaleString()}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Section: Day-by-Day Schedule */}
            <div>
              <h2 className="text-base font-extrabold text-[#212529] border-b border-[#dee2e6] pb-2 mb-3">
                Daily Itinerary Schedule
              </h2>

              <div className="space-y-5">
                {daySections.map((sec, secIdx) => (
                  <div key={sec.id || secIdx} className="space-y-2.5">
                    <div className="flex items-center justify-between bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                      <h4 className="font-bold text-xs text-[#212529]">
                        {sec.title}
                      </h4>
                      <span className="text-[11px] text-[#6c757d] font-semibold">
                        {sec.places?.length || 0} stops
                      </span>
                    </div>

                    <div className="space-y-2 pl-2 border-l-2 border-slate-200 ml-3">
                      {(sec.places || []).map((stop, sIdx) => (
                        <div key={stop.id || sIdx} className="bg-white p-3 border border-[#e9ecef] rounded-xl flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                              {sIdx + 1}
                            </span>
                            <div>
                              <h5 className="font-bold text-xs text-[#212529]">{stop.name}</h5>
                              <p className="text-[11px] text-[#6c757d] mt-0.5 leading-snug">{stop.subtitle || stop.description}</p>
                              {stop.duration && (
                                <span className="text-[10px] text-[#2563eb] font-semibold mt-1 block">
                                  ⏱ Typically spend {stop.duration}
                                </span>
                              )}
                            </div>
                          </div>

                          <span className="text-[11px] font-semibold text-[#6c757d]">
                            {stop.cost === 0 ? 'Free' : `${currencySymbol}${Math.round((stop.cost || 15) * (currencySymbol === '₹' ? 92 : 1)).toLocaleString()}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Notes & Packing Guidelines */}
            {notesText && (
              <div>
                <h2 className="text-base font-extrabold text-[#212529] border-b border-[#dee2e6] pb-2 mb-2">
                  Trip Notes & Tips
                </h2>
                <div className="bg-[#f8f9fa] border border-[#e9ecef] rounded-xl p-3.5 text-xs text-[#495057] leading-relaxed whitespace-pre-wrap">
                  {notesText}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="pt-6 border-t border-[#dee2e6] flex items-center justify-between text-[11px] text-[#adb5bd]">
              <span>Planned with TripMate • www.tripmate.com</span>
              <span>Generated on {new Date().toLocaleDateString()}</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
