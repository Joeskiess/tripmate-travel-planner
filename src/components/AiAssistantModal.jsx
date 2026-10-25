import React, { useState } from 'react';
import { 
  ChevronDown, 
  Minus, 
  X, 
  Plus, 
  ArrowUp, 
  Sparkles, 
  Info, 
  CornerDownRight, 
  Check, 
  MapPin, 
  Calendar 
} from 'lucide-react';

export default function AiAssistantModal({ isOpen, onClose, onAddPlaceToTrip }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('examples'); // 'examples' | 'chat'
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [freeMessagesLeft, setFreeMessagesLeft] = useState(10);
  const [isMinimized, setIsMinimized] = useState(false);

  const examplePrompts = [
    { id: 'eat', text: 'Best places to eat in Paris', query: 'Best places to eat in Paris' },
    { id: 'itin', text: '3 day itinerary to Paris', query: '3 day itinerary to Paris' },
    { id: 'attract', text: 'Top attractions in Paris', query: 'Top attractions in Paris' }
  ];

  const handleSelectExample = (query) => {
    setActiveTab('chat');
    sendMessage(query);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    sendMessage(inputValue.trim());
    setInputValue('');
  };

  const sendMessage = (text) => {
    const userMsg = { sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setFreeMessagesLeft((prev) => Math.max(0, prev - 1));

    // Generate intelligent Paris travel answer
    setTimeout(() => {
      let aiResponse = {};
      const lower = text.toLowerCase();

      if (lower.includes('eat') || lower.includes('food') || lower.includes('restaurant') || lower.includes('café')) {
        aiResponse = {
          sender: 'assistant',
          text: `Here are the top consensus places to eat in Paris for your itinerary:`,
          places: [
            {
              name: "L'As du Fallafel",
              category: "Casual Dining • Le Marais",
              desc: "World-famous falafel pita with crispy chickpea balls, grilled eggplants, and tahini.",
              price: "€",
              rating: 4.8,
              coords: [48.857470, 2.359140]
            },
            {
              name: "Le Comptoir du Relais",
              category: "Bistro • Saint-Germain",
              desc: "Celebrated chef Yves Camdeborde's iconic art-deco bistro serving classic coq au vin and terrines.",
              price: "€€€",
              rating: 4.7,
              coords: [48.8522, 2.3385]
            },
            {
              name: "Berthillon Glacier",
              category: "Ice Cream • Île Saint-Louis",
              desc: "Artisanal Parisian gelato and sorbets with legendary salted butter caramel and wild strawberry.",
              price: "€€",
              rating: 4.8,
              coords: [48.851720, 2.356500]
            }
          ]
        };
      } else if (lower.includes('3 day') || lower.includes('itinerary')) {
        aiResponse = {
          sender: 'assistant',
          text: `Here is a curated 3-day Paris itinerary designed to minimize travel time:`,
          places: [
            {
              name: "Notre-Dame & Sainte-Chapelle",
              category: "Day 1 • Historic Heart",
              desc: "Explore Île de la Cité, stained glass marvels, and walk along the Seine River.",
              price: "Free",
              rating: 4.9,
              coords: [48.852968, 2.349902]
            },
            {
              name: "Louvre & Tuileries Garden",
              category: "Day 2 • Art & Royal Parks",
              desc: "World-class art collections, glass pyramid, and open-air sculpture walks.",
              price: "€€",
              rating: 4.8,
              coords: [48.8606, 2.3376]
            },
            {
              name: "Eiffel Tower & Seine Cruise",
              category: "Day 3 • Landmark & Sunset",
              desc: "Summit panoramic vistas followed by a sunset cruise illuminated by Paris bridges.",
              price: "€€",
              rating: 4.9,
              coords: [48.8584, 2.2945]
            }
          ]
        };
      } else {
        aiResponse = {
          sender: 'assistant',
          text: `Here are the top attractions in Paris you shouldn't miss:`,
          places: [
            {
              name: "Eiffel Tower",
              category: "Iconic Landmark",
              desc: "Built for the 1889 World's Fair, offering breathtaking views from the 3rd floor summit.",
              price: "€€",
              rating: 4.9,
              coords: [48.8584, 2.2945]
            },
            {
              name: "Louvre Museum",
              category: "Art Museum",
              desc: "Former royal palace housing the Mona Lisa, Venus de Milo, and over 35,000 works of art.",
              price: "€€",
              rating: 4.8,
              coords: [48.8606, 2.3376]
            },
            {
              name: "Sacré-Cœur & Montmartre",
              category: "Basilica & Bohemian Village",
              desc: "White-domed basilica on the highest hill of Paris, surrounded by painter studios.",
              price: "Free",
              rating: 4.8,
              coords: [48.8867, 2.3431]
            }
          ]
        };
      }

      setMessages((prev) => [...prev, aiResponse]);
    }, 500);
  };

  const handleStartNewChat = () => {
    setActiveTab('examples');
    setMessages([]);
    setInputValue('');
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      
      {/* Modal Dialog (Exact Match to User's Uploaded Screenshot) */}
      <div 
        className={`bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-[620px] overflow-hidden flex flex-col transition-all duration-200 ${
          isMinimized ? 'h-[60px]' : 'max-h-[85vh] h-[640px]'
        }`}
      >
        
        {/* Top Header Bar */}
        <div className="h-12 border-b border-slate-100 px-5 flex items-center justify-between bg-white flex-shrink-0">
          
          {/* Left: New chat ▾ */}
          <button
            onClick={handleStartNewChat}
            className="text-[#2563eb] hover:text-blue-700 font-bold text-sm flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>New chat</span>
            <ChevronDown size={14} className="text-[#2563eb]" />
          </button>

          {/* Right Window Controls: Minimize & Close */}
          <div className="flex items-center gap-3 text-slate-400">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="hover:text-slate-700 transition-colors cursor-pointer"
              title={isMinimized ? "Restore" : "Minimize"}
            >
              <Minus size={16} />
            </button>
            <button
              onClick={onClose}
              className="hover:text-slate-700 transition-colors cursor-pointer"
              title="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content Body (When not minimized) */}
        {!isMinimized && (
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Scrollable Conversation or Examples View */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              
              {/* Information disclaimer box */}
              <div className="bg-[#f8f9fa] border border-[#e9ecef] rounded-xl px-4 py-3 flex items-center gap-2.5 text-xs text-[#6c757d]">
                <Info size={16} className="text-[#6c757d] flex-shrink-0" />
                <span>Information generated by AI Assistant may not be fully accurate.</span>
              </div>

              {/* View 1: Examples Mode (Screenshot Match) */}
              {activeTab === 'examples' && (
                <div className="pt-2 animate-in fade-in duration-200">
                  <h2 className="text-2xl sm:text-[26px] font-black text-[#212529] tracking-tight mb-6">
                    Don’t know what to ask? Try these examples:
                  </h2>

                  <div className="space-y-3">
                    {examplePrompts.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelectExample(item.query)}
                        className="group bg-[#eef2ff] hover:bg-[#e0e7ff] text-[#4338ca] hover:text-[#3730a3] font-semibold text-sm px-4 py-2.5 rounded-full flex items-center gap-2.5 transition-all cursor-pointer shadow-xs w-fit text-left"
                      >
                        <span className="text-base text-[#4338ca] leading-none">↳</span>
                        <span>{item.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* View 2: Active Chat Messages */}
              {activeTab === 'chat' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  {messages.map((m, idx) => (
                    <div key={idx} className="space-y-3">
                      {m.sender === 'user' ? (
                        <div className="flex justify-end">
                          <div className="bg-[#212529] text-white px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-semibold max-w-[80%] shadow-xs">
                            {m.text}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-[#f8f9fa] border border-[#e9ecef] p-4 rounded-2xl rounded-tl-xs space-y-3 shadow-xs">
                          <p className="text-xs font-semibold text-[#212529] leading-relaxed">
                            {m.text}
                          </p>

                          {m.places && (
                            <div className="space-y-2.5 pt-1">
                              {m.places.map((place, pIdx) => (
                                <div 
                                  key={pIdx}
                                  className="bg-white border border-[#e9ecef] p-3 rounded-xl flex items-center justify-between gap-3 shadow-xs hover:border-[#ced4da] transition-all"
                                >
                                  <div className="min-w-0">
                                    <div className="flex items-center gap-2">
                                      <h5 className="font-bold text-xs text-[#212529] truncate">{place.name}</h5>
                                      <span className="text-[10px] text-amber-600 font-bold">★ {place.rating}</span>
                                    </div>
                                    <p className="text-[11px] text-[#6c757d] line-clamp-1 mt-0.5">{place.desc}</p>
                                  </div>

                                  <button
                                    onClick={() => {
                                      if (onAddPlaceToTrip) {
                                        onAddPlaceToTrip({
                                          id: `ai-${Date.now()}-${pIdx}`,
                                          name: place.name,
                                          category: place.category,
                                          price: place.price,
                                          rating: place.rating,
                                          coords: place.coords,
                                          image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80",
                                          tips: [place.desc],
                                          cost: 0,
                                          expenseCategory: "Attractions",
                                          visited: false
                                        });
                                      }
                                    }}
                                    className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer flex-shrink-0"
                                  >
                                    + Add to trip
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Bottom Input Area (Exact match to Screenshot) */}
            <div className="p-4 bg-white border-t border-slate-100 flex-shrink-0">
              
              <div className="bg-[#f1f5f9] rounded-2xl p-2.5 border border-[#e2e8f0]">
                
                {/* Header inside input container: "10 free messages left" | "Get more" */}
                <div className="flex items-center justify-between px-1 mb-1.5 text-xs">
                  <span className="text-[#64748b] font-medium">{freeMessagesLeft} free messages left</span>
                  <button 
                    onClick={() => setFreeMessagesLeft(10)}
                    className="text-[#334155] hover:text-black font-bold hover:underline cursor-pointer"
                  >
                    Get more
                  </button>
                </div>

                {/* White Input Box with + and ↑ buttons */}
                <form 
                  onSubmit={handleFormSubmit}
                  className="bg-white rounded-xl p-1.5 pl-3 border border-slate-200 flex items-center gap-2 shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setActiveTab('examples')}
                    className="w-7 h-7 rounded-full border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
                    title="See examples"
                  >
                    <Plus size={15} />
                  </button>

                  <input
                    type="text"
                    placeholder='Ask travel related questions like "Best food in Paris?"'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 text-xs text-[#212529] placeholder:text-[#94a3b8] outline-none bg-transparent"
                  />

                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all flex-shrink-0 cursor-pointer ${
                      inputValue.trim()
                        ? 'bg-[#6366f1] text-white shadow-xs'
                        : 'bg-[#a5b4fc] text-white/80 cursor-not-allowed'
                    }`}
                  >
                    <ArrowUp size={15} />
                  </button>
                </form>

              </div>

              {/* Bottom Footnote */}
              <div className="text-[10px] text-[#94a3b8] text-center mt-2.5">
                Information generated by AI Assistant may not be fully accurate.
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}