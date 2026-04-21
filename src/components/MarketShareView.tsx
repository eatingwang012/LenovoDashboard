import * as React from "react";
import { useMemo, useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "./ui/card";
import {
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { 
  Globe, 
  Info,
  TrendingUp,
  Target,
  Zap,
  Users,
  Briefcase,
  Monitor
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "./ui/select";
import { Badge } from "./ui/badge";
import { motion } from "motion/react";

// --- Types ---
interface ShareData {
  quarter: string;
  brand: string;
  region: string;
  share: number;
}

// --- Constants ---
const BRANDS = ["Lenovo", "HP", "Dell", "Apple", "Others"] as const;
const QUARTERS = ["2024-Q1", "2024-Q2", "2024-Q3", "2024-Q4", "2025-Q1", "2025-Q2", "2025-Q3", "2025-Q4", "2026-Q1"] as const;
const REGIONS = ["Global", "China", "North America", "Europe", "Asia Pacific", "Latin America", "Africa"] as const;

const BRAND_COLORS: Record<string, string> = {
  "Lenovo": "#dc2626", // Red-600
  "HP": "#3b82f6",    // Blue-500
  "Dell": "#10b981",  // Emerald-500
  "Apple": "#6366f1",  // Indigo-500
  "Others": "#94a3b8"  // Slate-400
};

// --- Mock Data Generator ---
const generateShareHistory = () => {
  const data: ShareData[] = [];
  QUARTERS.forEach(q => {
    REGIONS.forEach(r => {
      let total = 0;
      const values = BRANDS.map(b => {
        let baseVal: number;
        // Introduce regional variance
        const regionBias = (r === "China" && b === "Lenovo") ? 15 : (r === "North America" && b === "Apple") ? 10 : 0;
        
        if (b === "Lenovo") baseVal = 23 + regionBias + Math.random() * 3;
        else if (b === "HP") baseVal = 18 + Math.random() * 2;
        else if (b === "Dell") baseVal = 15 + Math.random() * 2;
        else if (b === "Apple") baseVal = 8 + regionBias + Math.random() * 2;
        else baseVal = 30 + Math.random() * 5;
        
        total += baseVal;
        return { brand: b, share: baseVal };
      });
      
      values.forEach(v => {
        data.push({ quarter: q, region: r, brand: v.brand, share: (v.share / total) * 100 });
      });
    });
  });
  return data;
};

const SHARE_HISTORY = generateShareHistory();

const SEGMENT_HOTMAP_DATA = [
  { group: "ToB Commercial", sub: "Enterprise", lenovoShare: 42.5, growth: 5.2, intensity: 0.9 },
  { group: "ToB Commercial", sub: "SME", lenovoShare: 31.8, growth: 3.8, intensity: 0.7 },
  { group: "ToB Commercial", sub: "Gov/Edu", lenovoShare: 28.4, growth: 2.1, intensity: 0.6 },
  { group: "ToC Consumer", sub: "Gaming", lenovoShare: 29.5, growth: 8.4, intensity: 0.8 },
  { group: "ToC Consumer", sub: "Pro/Creative", lenovoShare: 18.2, growth: 12.1, intensity: 0.5 },
  { group: "ToC Consumer", sub: "Mainstream", lenovoShare: 21.6, growth: -1.2, intensity: 0.4 },
];

// --- Components ---

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-slate-200 p-3 rounded-lg shadow-xl">
        <p className="font-bold text-xs mb-2 text-slate-800 uppercase tracking-widest">{label}</p>
        <div className="space-y-1.5">
          {payload.sort((a: any, b: any) => b.value - a.value).map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
                <span className="text-[10px] text-slate-600 font-bold uppercase">{entry.name}</span>
              </div>
              <span className="text-xs font-mono font-bold text-slate-900">{entry.value.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export function MarketShareView() {
  const [selectedQuarter, setSelectedQuarter] = useState<string>("2026-Q1");
  const [selectedRegionEquilibrium, setSelectedRegionEquilibrium] = useState<string>("Global");
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);

  // Derived: Current Quarter Snapshot (Global for overall metrics)
  const currentSnapshotGlobal = useMemo(() => {
    return BRANDS.map(brand => {
      const entry = SHARE_HISTORY.find(d => d.quarter === selectedQuarter && d.brand === brand && d.region === "Global");
      const prevEntry = SHARE_HISTORY.find(d => {
        const idx = QUARTERS.indexOf(selectedQuarter as any);
        return idx > 0 && d.quarter === QUARTERS[idx - 1] && d.brand === brand && d.region === "Global";
      });
      return {
        name: brand,
        value: entry?.share || 0,
        change: entry && prevEntry ? entry.share - prevEntry.share : 0
      };
    }).sort((a, b) => b.value - a.value);
  }, [selectedQuarter]);

  // Specific Snapshot for the Equilibrium module (Section-specific region)
  const equilibriumSnapshot = useMemo(() => {
    return BRANDS.map(brand => {
      const entry = SHARE_HISTORY.find(d => d.quarter === selectedQuarter && d.brand === brand && d.region === selectedRegionEquilibrium);
      const prevEntry = SHARE_HISTORY.find(d => {
        const idx = QUARTERS.indexOf(selectedQuarter as any);
        return idx > 0 && d.quarter === QUARTERS[idx - 1] && d.brand === brand && d.region === selectedRegionEquilibrium;
      });
      return {
        name: brand,
        value: entry?.share || 0,
        change: entry && prevEntry ? entry.share - prevEntry.share : 0
      };
    }).sort((a, b) => b.value - a.value);
  }, [selectedQuarter, selectedRegionEquilibrium]);

  // Strategic Calculation: Relative Market Share (RMS)
  // RMS = (Our Share) / (Nearest Competitor's Share)
  const rmsMetrics = useMemo(() => {
    const lenovo = currentSnapshotGlobal.find(s => s.name === "Lenovo");
    const others = currentSnapshotGlobal.filter(s => s.name !== "Lenovo" && s.name !== "Others");
    const leader = others[0]; // Nearest strong competitor
    
    if (!lenovo || !leader) return { ratio: 0, status: "Unknown" };
    
    const ratio = lenovo.value / leader.value;
    return {
      ratio,
      leaderName: leader.name,
      status: ratio > 1 ? "Market Leader" : "Market Challenger",
      description: ratio > 1 
        ? `Lenovo holds ${ratio.toFixed(2)}x the share of the nearest rival (${leader.name}).`
        : `Lenovo holds ${(ratio * 100).toFixed(1)}% of the leader's (${leader.name}) footprint.`
    };
  }, [currentSnapshotGlobal]);

  const trendsChartData = useMemo(() => {
    return QUARTERS.map(q => {
      const entry: any = { quarter: q };
      BRANDS.forEach(b => {
        entry[b] = SHARE_HISTORY.find(d => d.quarter === q && d.brand === b && d.region === "Global")?.share || 0;
      });
      return entry;
    });
  }, []);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Market Share Index</h1>
          <p className="text-slate-500 font-medium">Strategic positioning and dominance analysis across fiscal cycles.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-2 rounded-xl border shadow-sm">
          <div className="flex items-center gap-2 px-3 border-r border-slate-200">
            <Globe className="w-4 h-4 text-slate-400" />
            <span className="text-[10px] font-black uppercase text-slate-500">Global Focus</span>
          </div>
          <Select value={selectedQuarter} onValueChange={setSelectedQuarter}>
            <SelectTrigger className="w-[140px] border-none shadow-none h-8 font-black text-[11px] uppercase tracking-wider">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {QUARTERS.map(q => <SelectItem key={q} value={q} className="text-[11px] font-bold">{q}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* --- Strategic Dominance (RMS) --- */}
        <Card className="lg:col-span-1 border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
             <Target className="w-20 h-20 text-slate-50 opacity-10" />
          </div>
          <CardHeader>
            <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Target className="w-4 h-4 text-red-600" />
              Strategic Dominance
            </CardTitle>
            <CardDescription className="text-xs font-bold text-slate-500 mt-1">Relative Market Share (RMS) vs nearest rival</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="relative">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                  <circle 
                    cx="64" cy="64" r="58" 
                    stroke="currentColor" strokeWidth="8" fill="transparent" 
                    className={rmsMetrics.ratio > 1 ? 'text-emerald-500' : 'text-amber-500'}
                    strokeDasharray={364}
                    strokeDashoffset={364 - (Math.min(rmsMetrics.ratio / 2, 1) * 364)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <span className="text-3xl font-black font-mono">{rmsMetrics.ratio.toFixed(2)}</span>
                   <span className="text-[10px] font-black uppercase text-slate-400">RMS Index</span>
                </div>
              </div>
              <div className="mt-6 space-y-1">
                <Badge className={rmsMetrics.ratio > 1 ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}>
                  {rmsMetrics.status}
                </Badge>
                <p className="text-[11px] font-bold text-slate-500 mt-2 px-6">{rmsMetrics.description}</p>
              </div>
            </div>

            <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-3 h-3 text-red-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Methodology</span>
              </div>
              <p className="text-[10px] leading-relaxed text-slate-300 italic">
                RMS balances raw share against competitive pressure. A value &gt; 1.0 indicates a dominant position where the firm dictates terms in the market.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* --- Competitive Trajectory --- */}
        <Card className="lg:col-span-2 border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                Market Share Momentum
              </CardTitle>
              <CardDescription className="text-xs font-bold text-slate-500">Historical share percentages across brands (%)</CardDescription>
            </div>
            <div className="flex gap-4">
               {BRANDS.slice(0, 4).map(b => (
                 <div key={b} className="flex items-center gap-1.5 opacity-80">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: BRAND_COLORS[b] }} />
                   <span className="text-[9px] font-black uppercase text-slate-500">{b}</span>
                 </div>
               ))}
            </div>
          </CardHeader>
          <CardContent className="h-[360px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendsChartData}>
                <defs>
                  {BRANDS.map(b => (
                    <linearGradient key={b} id={`color${b}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={BRAND_COLORS[b]} stopOpacity={0.2}/>
                      <stop offset="95%" stopColor={BRAND_COLORS[b]} stopOpacity={0}/>
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="quarter" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#94a3b8', fontFamily: 'monospace' }}
                  domain={[0, 40]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" />
                {BRANDS.map(b => (
                  <Area
                    key={b}
                    type="monotone"
                    dataKey={b}
                    stroke={BRAND_COLORS[b]}
                    fillOpacity={1}
                    fill={`url(#color${b})`}
                    strokeWidth={b === "Lenovo" ? 4 : 1.5}
                    stackId={b === "Others" ? "1" : undefined} // Only Stack others if desired, otherwise overlap
                    activeDot={{ r: 6 }}
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* --- Strategic Pockets: Customer Segment Heatmap --- */}
        <Card className="border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="border-b bg-slate-50/50">
            <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              Strategic Pockets: Segment Penetration
            </CardTitle>
            <CardDescription className="text-xs font-bold text-slate-500 mt-1">Deep-dive into Commercial & Consumer market intensity</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-[1px] bg-slate-100">
               {/* Table Header */}
               <div className="grid grid-cols-4 bg-slate-50 py-3 px-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <div className="col-span-1">Segment</div>
                  <div className="text-center">Lenovo Share</div>
                  <div className="text-center">YoY Growth</div>
                  <div className="text-center">Opportunity Index</div>
               </div>
               {/* Table Rows (Heatmapped) */}
               {SEGMENT_HOTMAP_DATA.map((row, idx) => (
                 <div key={idx} className="glass-row grid grid-cols-4 items-center bg-white hover:bg-slate-50 transition-all cursor-crosshair">
                    <div className="px-6 py-4 flex flex-col border-r border-slate-50">
                       <span className={`text-[9px] font-black uppercase tracking-tighter mb-1 ${row.group.includes("Commercial") ? "text-blue-500" : "text-amber-500"}`}>
                         {row.group}
                       </span>
                       <span className="text-xs font-bold text-slate-900">{row.sub}</span>
                    </div>
                    
                    <div className="flex items-center justify-center h-full border-r border-slate-50" style={{ backgroundColor: `rgba(220, 38, 38, ${row.intensity * 0.15})` }}>
                       <span className="text-sm font-black font-mono text-red-600">{row.lenovoShare}%</span>
                    </div>

                    <div className="flex items-center justify-center gap-1.5 h-full border-r border-slate-50">
                       <TrendingUp className={`w-3 h-3 ${row.growth > 0 ? "text-emerald-500" : "text-red-500"}`} />
                       <span className={`text-xs font-bold font-mono ${row.growth > 0 ? "text-emerald-600" : "text-red-600"}`}>
                         {row.growth > 0 ? "+" : ""}{row.growth}%
                       </span>
                    </div>

                    <div className="px-6 py-4 flex flex-col items-center">
                       <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${row.intensity * 100}%` }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                            className="h-full bg-slate-900 rounded-full" 
                          />
                       </div>
                       <span className="text-[9px] font-black text-slate-400 mt-2 uppercase tracking-tighter">Intensity Level</span>
                    </div>
                 </div>
               ))}
            </div>
          </CardContent>
        </Card>

        {/* --- Snapshot & Composition --- */}
        <Card className="border-slate-200 shadow-sm relative overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-indigo-500" />
                  Market Equilibrium
                </CardTitle>
                <CardDescription className="text-xs font-bold text-slate-500 mt-1">Share composition and volumetric change index</CardDescription>
              </div>
              <Select value={selectedRegionEquilibrium} onValueChange={setSelectedRegionEquilibrium}>
                <SelectTrigger className="w-[100px] h-8 text-[10px] font-black uppercase border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {REGIONS.map(r => <SelectItem key={r} value={r} className="text-[10px] font-bold">{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-6 h-full items-center">
            <div className="w-full h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={equilibriumSnapshot}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                    onMouseEnter={(n) => setHoveredBrand(n.name)}
                    onMouseLeave={() => setHoveredBrand(null)}
                  >
                    {equilibriumSnapshot.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={BRAND_COLORS[entry.name]} 
                        opacity={hoveredBrand && hoveredBrand !== entry.name ? 0.3 : 1}
                        className="transition-all duration-300"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full space-y-3 pb-6">
              {equilibriumSnapshot.map(item => (
                <div key={item.name} className={`flex items-center justify-between p-2 rounded-lg border transition-all ${hoveredBrand === item.name ? 'border-slate-300 bg-slate-50' : 'border-transparent'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: BRAND_COLORS[item.name] }} />
                    <span className="text-xs font-black uppercase tracking-tight text-slate-700">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black font-mono">{item.value.toFixed(1)}%</span>
                    <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${item.change >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                      {item.change >= 0 ? "+" : ""}{item.change.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- Global Performance Rail --- */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-slate-500" />
            Strategic Commentary & Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-4 items-start">
             <div className="p-2 bg-red-600 rounded text-white"><Zap className="w-4 h-4" /></div>
             <div>
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Growth Engine</p>
                <p className="text-xs leading-relaxed font-bold text-slate-800 italic">
                  "Market share expansion in 2026-Q1 is heavily influenced by AI PC adoption and SME hardware refresh cycles."
                </p>
             </div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-4 items-start">
             <div className="p-2 bg-blue-600 rounded text-white"><Monitor className="w-4 h-4" /></div>
             <div>
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Commercial Moat</p>
                <p className="text-xs leading-relaxed font-bold text-slate-800 italic">
                  "Lenovo's dominance in Large Enterprise (42.5% share) continues to serve as a fiscal stabilizer against consumer volatility."
                </p>
             </div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-4 items-start">
             <div className="p-2 bg-amber-600 rounded text-white"><Target className="w-4 h-4" /></div>
             <div>
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Challenge Area</p>
                <p className="text-xs leading-relaxed font-bold text-slate-800 italic">
                  "Consumer Pro/Creative remains a key offensive target, with Apple maintaining high mindshare despite volume parity."
                </p>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
