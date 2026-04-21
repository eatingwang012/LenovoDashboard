import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Cpu,
  Monitor,
  HardDrive,
  BatteryCharging,
  Microchip,
  ExternalLink
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { motion, AnimatePresence } from 'motion/react';

// === Global Helper for Format ===
const formatDateOffset = (offset: number) => {
  // Base month is 2026-04 (0 offset)
  const baseYear = 2026;
  const baseMonth = 4; // April
  let targetMonth = baseMonth + offset;
  let targetYear = baseYear;
  
  while (targetMonth <= 0) {
    targetMonth += 12;
    targetYear -= 1;
  }
  while (targetMonth > 12) {
    targetMonth -= 12;
    targetYear += 1;
  }
  
  return `${targetYear}-${targetMonth.toString().padStart(2, '0')}`;
};

// === Tooltips (Top Level) ===
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-200 shadow-xl rounded-lg text-xs">
        <p className="font-bold text-slate-900 mb-2">{label}</p>
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-slate-500">{item.name}:</span>
            <span className="font-black text-slate-900 ml-auto">{item.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// === Mock Data ===

const brands = ["All", "HP", "Dell", "Apple"];

const timelineEvents = [
  // Products
  { id: 2, brand: "HP", product: "OmniBook Ultra", monthOffset: -7, specs: "AMD Ryzen AI 300, 32GB RAM", pricing: "¥8,999", sellingPoints: "Premium AI PC, 30% battery life improvement", type: "product", date: "2025-09", link: "https://www.hp.com/" },
  { id: 3, brand: "Dell", product: "XPS 13", monthOffset: -3, specs: "Snapdragon X Elite, Seamless Trackpad", pricing: "¥9,999", sellingPoints: "All-day battery, Ultra-portable", type: "product", date: "2026-01", link: "https://www.dell.com/" },
  { id: 4, brand: "Apple", product: "MacBook Air M4", monthOffset: -1, specs: "M4 Chip, Enhanced Efficiency", pricing: "From ¥8,999", sellingPoints: "Efficiency benchmark, improved thermal threshold", type: "product", date: "2026-03", link: "https://www.apple.com/" },
  { id: 6, brand: "Apple", product: "MacBook Pro M5", monthOffset: 6, specs: "M5 Chip Debut, Peak Performance", pricing: "Est. From ¥14,999", sellingPoints: "Dedicated AI Nucleus, Professional-grade Productivity Engine", type: "product", date: "2026-10", link: "https://www.apple.com/" },
  
  // Supply Chain
  { id: 7, brand: "Supply Chain", product: "DDR5 Spot Price Hike", monthOffset: -10, specs: "Hynix/Samsung 15% Production Cut", pricing: "Cost Increase 8%", sellingPoints: "Impacts Commercial Model Margins in H2", type: "supply", date: "2025-06", link: "#" },
  { id: 8, brand: "Supply Chain", product: "High-end Panel Capacity Released", monthOffset: -2, specs: "BOE Gen 8.6 partially operational", pricing: "Cost Decrease 5%", sellingPoints: "Speeding up OLED penetration in mainstream models", type: "supply", date: "2026-02", link: "#" },
  { id: 9, brand: "Supply Chain", product: "AI PC Chip Shortage Warning", monthOffset: 3, specs: "Insufficient NPU Packaging Capacity", pricing: "Spot Price Premium Risk", sellingPoints: "Estimated to impact Q3 premium thin-and-light shipments", type: "supply", date: "2026-07", link: "#" }
];

const supplyCategories = [
  {
    id: "cpu",
    name: "CPU / Processors",
    icon: Cpu,
    metric: "Procurement Cost Δ",
    past3m: "+2.5%",
    future3m: "+1.0%",
    trend: "Rising", 
    driver: "Premium caused by advanced packaging capacity shortage for AI chips",
    priceTrend: [
      { period: "25Q1", actual: 100 }, { period: "25Q2", actual: 102 },
      { period: "25Q3", actual: 103 }, { period: "25Q4", actual: 105 },
      { period: "26Q1", actual: 108 }, { period: "26Q2", actual: 110, forecast: 110 },
      { period: "26Q3", forecast: 112 }, { period: "26Q4", forecast: 113 }
    ]
  },
  {
    id: "panel",
    name: "Display Panels",
    icon: Monitor,
    metric: "Procurement Cost Δ",
    past3m: "-3.2%",
    future3m: "-1.5%",
    trend: "Falling",
    driver: "Increased yield from Gen 8.x OLED lines across major fabs",
    priceTrend: [
      { period: "25Q1", actual: 100 }, { period: "25Q2", actual: 98 },
      { period: "25Q3", actual: 96 }, { period: "25Q4", actual: 93 },
      { period: "26Q1", actual: 90 }, { period: "26Q2", actual: 88, forecast: 88 },
      { period: "26Q3", forecast: 86 }, { period: "26Q4", forecast: 85 }
    ]
  },
  {
    id: "memory",
    name: "Memory",
    icon: HardDrive,
    metric: "Procurement Cost Δ",
    past3m: "+15.0%",
    future3m: "+8.5%",
    trend: "Rising",
    driver: "Strict production control for price protection, HBM demand crowding out standard PC DRAM",
    priceTrend: [
      { period: "25Q1", actual: 100 }, { period: "25Q2", actual: 105 },
      { period: "25Q3", actual: 115 }, { period: "25Q4", actual: 125 },
      { period: "26Q1", actual: 140 }, { period: "26Q2", actual: 152, forecast: 152 },
      { period: "26Q3", forecast: 160 }, { period: "26Q4", forecast: 165 }
    ]
  },
  {
    id: "battery",
    name: "Power",
    icon: BatteryCharging,
    metric: "Procurement Cost Δ",
    past3m: "0.0%",
    future3m: "0.0%",
    trend: "Stable",
    driver: "Lithium and cell materials prices stabilizing at a low level",
    priceTrend: [
      { period: "25Q1", actual: 100 }, { period: "25Q2", actual: 100 },
      { period: "25Q3", actual: 98 }, { period: "25Q4", actual: 99 },
      { period: "26Q1", actual: 99 }, { period: "26Q2", actual: 99, forecast: 99 },
      { period: "26Q3", forecast: 99 }, { period: "26Q4", forecast: 100 }
    ]
  },
  {
    id: "chipset",
    name: "Core Chipsets",
    icon: Microchip,
    metric: "Procurement Cost Δ",
    past3m: "-1.0%",
    future3m: "0.0%",
    trend: "Stable",
    driver: "Mature node foundry capacity remains ample, price equilibrium reached",
    priceTrend: [
      { period: "25Q1", actual: 100 }, { period: "25Q2", actual: 99 },
      { period: "25Q3", actual: 98 }, { period: "25Q4", actual: 98 },
      { period: "26Q1", actual: 97 }, { period: "26Q2", actual: 96, forecast: 96 },
      { period: "26Q3", forecast: 96 }, { period: "26Q4", forecast: 96 }
    ]
  }
];

export function MarketOutlookView() {
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [startYear, setStartYear] = useState("2024");
  const [startMonth, setStartMonth] = useState("10");
  const [endYear, setEndYear] = useState("2026");
  const [endMonth, setEndMonth] = useState("12");
  const [activeEventId, setActiveEventId] = useState<number | null>(3);
  const [activeSupplyId, setActiveSupplyId] = useState("cpu");

  const selectedRange = React.useMemo(() => {
    return [
      (parseInt(startYear) - 2026) * 12 + (parseInt(startMonth) - 4),
      (parseInt(endYear) - 2026) * 12 + (parseInt(endMonth) - 4)
    ];
  }, [startYear, startMonth, endYear, endMonth]);

  // Filtering events based on brand and range
  const filteredEvents = timelineEvents.filter(e => {
    const matchBrand = selectedBrand === "All" || e.brand === selectedBrand || e.brand === "Supply Chain";
    const matchRange = e.monthOffset >= selectedRange[0] && e.monthOffset <= selectedRange[1];
    return matchBrand && matchRange;
  });
  
  const productEvents = filteredEvents.filter(e => e.type === "product");
  const supplyEvents = filteredEvents.filter(e => e.type === "supply");

  const activeEvent = timelineEvents.find(e => e.id === activeEventId);
  const activeSupply = supplyCategories.find(s => s.id === activeSupplyId);

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "Rising": return "text-red-600";
      case "Falling": return "text-emerald-600";
      default: return "text-slate-800";
    }
  };

  const getBorderColor = (trend: string) => {
    switch (trend) {
      case "Rising": return "border-red-200 ring-red-100 hover:ring-red-200";
      case "Falling": return "border-emerald-200 ring-emerald-100 hover:ring-emerald-200";
      default: return "border-slate-200 ring-slate-100 hover:ring-slate-200";
    }
  };

  const getIconColor = (trend: string) => {
    switch (trend) {
      case "Rising": return "text-red-500 bg-red-50";
      case "Falling": return "text-emerald-500 bg-emerald-50";
      default: return "text-slate-500 bg-slate-100";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "Rising": return <TrendingUp className="h-4 w-4" />;
      case "Falling": return <TrendingDown className="h-4 w-4" />;
      default: return <Minus className="h-4 w-4" />;
    }
  };

  const renderTimelineNodes = (events: typeof timelineEvents, trackType: "product" | "supply") => {
    const totalMonths = selectedRange[1] - selectedRange[0];
    
    return events.map((item) => {
      // Calculate absolute position based on start/end range offsets
      const positionPct = ((item.monthOffset - selectedRange[0]) / (totalMonths || 1)) * 100;
      const isActive = activeEventId === item.id;
      const isSupply = trackType === "supply";
      const isFuture = item.monthOffset > 0;
      
      let bgClass = "bg-blue-500";
      if (isSupply) bgClass = "bg-amber-500";
      else if (isFuture) bgClass = "bg-slate-300";

      if (isActive) {
         bgClass += " ring-4 ring-offset-2 z-20 " + (isSupply ? "ring-amber-200" : isFuture ? "ring-slate-200" : "ring-blue-200");
      }

      return (
        <div 
          key={item.id}
          onClick={() => setActiveEventId(item.id)}
          className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full shadow-sm z-10 transition-all transform hover:scale-125 cursor-pointer ${bgClass}`}
          style={{ left: `calc(${positionPct}% - 8px)` }} 
        >
           {/* Tooltip on hover */}
           <div className={`absolute opacity-0 group-hover:opacity-100 hover:opacity-100 bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white text-[10px] px-2 py-1.5 rounded whitespace-nowrap transition-opacity shadow-lg cursor-default pointer-events-none ${isActive ? 'opacity-100' : ''}`}>
             <p className="font-bold">{item.brand}: {item.product}</p>
             <p className="text-slate-300 text-[9px]">{item.date}</p>
             <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900/95" />
           </div>
        </div>
      );
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="space-y-6 pb-10"
    >
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900">Market Dynamics & Supply Chain</h2>
        </div>
      </div>

      {/* 1. Competitor Releases and Industry Events */}
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
           <div className="flex items-center gap-6">
              <h3 className="text-base font-bold flex items-center gap-2">
                 <div className="w-1 h-5 bg-blue-600 rounded-full" />
                 Activity Tracking View
              </h3>
              
              <div className="h-6 w-px bg-slate-200" />
              
              {/* Brand Filters */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">Brand:</span>
                {brands.map(brand => (
                  <button 
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`px-3 py-1 text-[11px] font-bold rounded-full transition-all border ${
                      selectedBrand === brand 
                      ? 'bg-slate-900 text-white border-slate-900' 
                      : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
           </div>

           {/* Time Range Filters */}
           <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Start:</span>
               <select 
                 value={startYear}
                 onChange={(e) => setStartYear(e.target.value)}
                 className="text-[11px] font-bold border border-slate-200 rounded px-2 py-1 bg-white text-slate-700 outline-none focus:border-blue-400 cursor-pointer"
               >
                 {["2024", "2025", "2026"].map(y => <option key={y} value={y}>{y}</option>)}
               </select>
               <select 
                 value={startMonth}
                 onChange={(e) => setStartMonth(e.target.value)}
                 className="text-[11px] font-bold border border-slate-200 rounded px-2 py-1 bg-white text-slate-700 outline-none focus:border-blue-400 cursor-pointer"
               >
                 {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')).map(m => <option key={m} value={m}>{m}</option>)}
               </select>
             </div>

             <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">End:</span>
               <select 
                 value={endYear}
                 onChange={(e) => setEndYear(e.target.value)}
                 className="text-[11px] font-bold border border-slate-200 rounded px-2 py-1 bg-white text-slate-700 outline-none focus:border-blue-400 cursor-pointer"
               >
                 {["2024", "2025", "2026", "2027"].map(y => <option key={y} value={y}>{y}</option>)}
               </select>
               <select 
                 value={endMonth}
                 onChange={(e) => setEndMonth(e.target.value)}
                 className="text-[11px] font-bold border border-slate-200 rounded px-2 py-1 bg-white text-slate-700 outline-none focus:border-blue-400 cursor-pointer"
               >
                 {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')).map(m => <option key={m} value={m}>{m}</option>)}
               </select>
             </div>
           </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 border-none shadow-sm ring-1 ring-slate-200 bg-white overflow-hidden">
            <CardHeader className="pb-0 pt-5 px-6">
               <div className="flex justify-between items-end">
                 <div>
                   <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">Timeline Projections</CardTitle>
                   <CardDescription className="text-xs font-serif italic">Competitor Releases (Top) vs. Supply Chain Events (Bottom)</CardDescription>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div><span className="text-[10px] text-slate-500">Historical Releases</span></div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-300"></div><span className="text-[10px] text-slate-500">Future Projections</span></div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div><span className="text-[10px] text-slate-500">Supply Chain Events</span></div>
                 </div>
               </div>
            </CardHeader>
            <CardContent className="pt-8 pb-6 px-10">
              <div className="relative w-full">
                
                {/* Track 1: Competitor Products */}
                <div className="relative h-14 w-full mb-8 group">
                  <span className="absolute -top-4 left-0 text-[10px] font-black text-blue-800 bg-blue-50 px-2 py-0.5 rounded">Brand Releases</span>
                  <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-slate-100 rounded-full -translate-y-1/2" />
                  
                  {/* Current Month vertical marker extending across both tracks */}
                  {selectedRange[0] <= 0 && selectedRange[1] >= 0 && (
                    <div 
                      className="absolute top-0 w-px h-36 bg-red-400 border-r border-dashed border-red-200 z-0" 
                      style={{ left: `calc(${((0 - selectedRange[0]) / (selectedRange[1] - selectedRange[0])) * 100}%)` }}
                    >
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-red-50 text-red-600 px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap shadow-sm border border-red-100">
                        Now (26/04)
                      </div>
                    </div>
                  )}

                  {renderTimelineNodes(productEvents, "product")}
                </div>

                {/* Track 2: Supply Chain */}
                <div className="relative h-14 w-full mb-6 group">
                  <span className="absolute -top-4 left-0 text-[10px] font-black text-amber-800 bg-amber-50 px-2 py-0.5 rounded">Supply Chain Volatility</span>
                  <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-slate-100 rounded-full -translate-y-1/2" />
                  {renderTimelineNodes(supplyEvents, "supply")}
                </div>

                {/* Shared Axis Labels */}
                <div className="relative h-6 w-full border-t border-slate-200 pt-2 flex justify-between">
                   <span className="absolute left-0 -translate-x-1/2 text-[10px] font-bold text-slate-400">
                      {formatDateOffset(selectedRange[0])}
                   </span>
                   <span className="absolute left-1/2 -translate-x-1/2 text-[10px] font-medium text-slate-300">
                      {formatDateOffset(Math.floor((selectedRange[0] + selectedRange[1]) / 2))}
                   </span>
                   <span className="absolute right-0 translate-x-1/2 text-[10px] font-bold text-slate-400">
                      {formatDateOffset(selectedRange[1])}
                   </span>
                </div>

              </div>
            </CardContent>
          </Card>

          {/* Event Details Card */}
          <AnimatePresence mode="wait">
            {activeEvent ? (
               <motion.div 
                 key={activeEvent.id}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 transition={{ duration: 0.2 }}
               >
                 <Card className={`h-full border-none shadow-sm ring-1 ${activeEvent.type === 'supply' ? 'ring-amber-200 bg-amber-50/20' : 'ring-blue-200 bg-blue-50/20'}`}>
                    <CardHeader className="pb-3">
                       <div className="flex items-start justify-between">
                         <Badge variant="outline" className={`text-[10px] uppercase font-bold tracking-widest ${activeEvent.type === 'supply' ? 'text-amber-700 border-amber-200 bg-amber-50' : 'text-blue-700 border-blue-200 bg-blue-50'}`}>
                           {activeEvent.type === 'supply' ? 'Supply Chain Brief' : 'Product Release Dossier'}
                         </Badge>
                         {activeEvent.link !== '#' && (
                           <a href={activeEvent.link} target="_blank" rel="noopener noreferrer" className="text-[10px] flex items-center gap-1 font-bold text-slate-500 hover:text-blue-600 transition-colors bg-white border border-slate-200 px-2 py-0.5 rounded">
                              <ExternalLink className="w-3 h-3" />
                              Official Link
                           </a>
                         )}
                       </div>
                       
                       <CardTitle className="text-xl font-black mt-3 text-slate-900 leading-tight">{activeEvent.product}</CardTitle>
                       <CardDescription className="text-xs font-black text-slate-500 flex items-center gap-2 mt-1">
                          <span className={`px-1.5 py-0.5 rounded text-white ${activeEvent.type === 'supply' ? 'bg-amber-600' : 'bg-slate-800'}`}>
                             {activeEvent.brand}
                          </span>
                          <span>{activeEvent.date}</span>
                       </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                       <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                         <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1.5">Key Specifications / Information</p>
                         <p className="text-sm font-bold text-slate-800">{activeEvent.specs}</p>
                       </div>
                       
                       <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                         <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1.5 flex justify-between">
                            <span>Market Outlook / Key Highlights</span>
                         </p>
                         <p className="text-xs font-medium text-slate-600 leading-relaxed">
                           {activeEvent.sellingPoints}
                         </p>
                       </div>

                       <div className="pt-2 border-t border-slate-200/60">
                         <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Pricing & Cost Impact</p>
                         <p className="text-lg font-black text-slate-900 mt-1">{activeEvent.pricing}</p>
                       </div>
                    </CardContent>
                 </Card>
               </motion.div>
            ) : (
               <Card className="h-full border-dashed border-2 shadow-none border-slate-200 flex items-center justify-center bg-slate-50">
                  <p className="text-sm text-slate-400 font-medium tracking-wide">Select events on the timeline for details</p>
               </Card>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 2. Supply Chain Insights */}
      <div className="space-y-4 pt-8 border-t border-slate-200">
         <h3 className="text-xl font-bold flex items-center gap-2">
            <div className="w-1.5 h-6 bg-emerald-600 rounded-full" />
            Supply Chain Indicators & Alerts
         </h3>
         <p className="text-xs text-slate-500 font-medium mb-4">Monitor procurement cost fluctuations of core components to identify upstream supply chain risks and opportunities.</p>

         <div className="grid md:grid-cols-5 gap-4">
            {supplyCategories.map(cat => {
               const Icon = cat.icon;
               const isActive = activeSupplyId === cat.id;
               
               return (
                 <Card 
                   key={cat.id} 
                   onClick={() => setActiveSupplyId(cat.id)}
                   className={`cursor-pointer transition-all border shadow-sm ring-1 
                     ${getBorderColor(cat.trend)} 
                     ${isActive ? 'bg-white shadow-md transform -translate-y-1 scale-105 z-10 ring-2' : 'bg-slate-50 opacity-90 hover:opacity-100'}`}
                 >
                    <CardContent className="p-4">
                       <div className="flex items-center gap-3 mb-4">
                          <div className={`p-2 rounded-lg ${getIconColor(cat.trend)}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="font-bold text-slate-900 text-sm">{cat.name}</span>
                       </div>
                       
                       <div className="space-y-3">
                          <div className="bg-slate-100/50 p-2 rounded-md border border-slate-100">
                            <div className="flex justify-between items-center mb-1">
                               <span className="text-[10px] text-slate-500 font-bold">{cat.metric} (Past 3M)</span>
                               <span className="text-xs font-black text-slate-800">{cat.past3m}</span>
                            </div>
                            <div className="flex justify-between items-center">
                               <span className="text-[10px] text-slate-500 font-bold">Forecast MoM (Future 3M)</span>
                               <span className={`text-xs font-black flex items-center gap-1 ${getTrendColor(cat.trend)}`}>
                                 {cat.future3m} {getTrendIcon(cat.trend)}
                               </span>
                            </div>
                          </div>
                          
                          <div className={`pt-2 border-t ${isActive ? 'border-slate-100' : 'border-slate-200/50'}`}>
                             <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase mb-1">Key Drivers</p>
                             <p className="text-[10px] text-slate-600 leading-tight font-medium h-8 line-clamp-2" title={cat.driver}>
                               {cat.driver}
                             </p>
                          </div>
                       </div>
                    </CardContent>
                 </Card>
               );
            })}
         </div>

         {/* Price Trend Chart Container */}
         <Card className="border-none shadow-sm ring-1 ring-slate-200 mt-6 bg-slate-900 text-slate-100 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-800 bg-slate-950/50">
               <div>
                 <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    Core Component Procurement Cost Index ({activeSupply?.name})
                 </CardTitle>
                 <CardDescription className="text-xs font-serif italic text-slate-400 mt-1">2025 – 2026E Quarterly Index (Base 100 at 25Q1)</CardDescription>
               </div>
               <Badge className="bg-slate-800 text-slate-300 hover:bg-slate-700">Live Data Powered</Badge>
            </CardHeader>
            <CardContent className="pt-6">
               <div className="h-[280px] w-full">
                 <AnimatePresence mode="wait">
                    <motion.div
                       key={activeSupplyId}
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: -10 }}
                       transition={{ duration: 0.3 }}
                       className="w-full h-full"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                         <LineChart 
                           data={activeSupply?.priceTrend || []} 
                           margin={{ top: 20, right: 30, bottom: 0, left: 0 }}
                         >
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                            <XAxis 
                              dataKey="period" 
                              tick={{ fontSize: 11, fontWeight: 500, fill: '#94a3b8' }} 
                              axisLine={false} 
                              tickLine={false} 
                            />
                            <YAxis 
                              domain={['auto', 'auto']}
                              tick={{ fontSize: 11, fill: '#64748b' }} 
                              axisLine={false} 
                              tickLine={false} 
                              tickFormatter={(val) => `${val}`}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#475569', strokeWidth: 1, strokeDasharray: '4 4' }} />
                            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} align="right" verticalAlign="top" iconType="circle" />
                            
                            {/* Actual historical line */}
                            <Line 
                               type="monotone"
                               name="Actual Index" 
                               dataKey="actual" 
                               stroke="#38bdf8" 
                               strokeWidth={3}
                               dot={{ r: 4, strokeWidth: 2, fill: '#0f172a' }}
                               activeDot={{ r: 6, fill: '#38bdf8' }}
                            />
                            {/* Forecast line */}
                            <Line 
                               type="monotone"
                               name="Forecast Index" 
                               dataKey="forecast" 
                               stroke="#fbbf24" 
                               strokeWidth={3}
                               strokeDasharray="5 5"
                               dot={{ r: 4, strokeWidth: 2, fill: '#0f172a' }}
                               activeDot={{ r: 6, fill: '#fbbf24' }}
                            />
                         </LineChart>
                      </ResponsiveContainer>
                    </motion.div>
                 </AnimatePresence>
               </div>
            </CardContent>
         </Card>
      </div>
    </motion.div>
  );
}
