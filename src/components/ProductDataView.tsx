import * as React from "react";

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Label } from "./ui/label";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  FunnelChart,
  Funnel,
  LabelList,
} from "recharts";
import { 
  Laptop, 
  TrendingUp, 
  ArrowUp, 
  ArrowDown, 
  Box, 
  Target, 
  CreditCard,
  Percent,
  Wallet,
  ShoppingBag,
  Store,
  ChevronRight
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { motion } from "motion/react";
import { useProductBusinessData } from "../hooks/useProductBusinessData";

// --- Components ---

const ICON_MAP = {
  Laptop,
  TrendingUp,
  Box,
  Target,
  CreditCard,
  Percent,
  Wallet,
  ShoppingBag,
  Store,
};
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-slate-200 p-3 rounded-lg shadow-xl animate-in fade-in zoom-in duration-200">
        <p className="font-bold text-sm mb-2 text-slate-800">{label}</p>
        <div className="space-y-1.5">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
                <span className="text-xs text-slate-600 font-medium">{entry.name}</span>
              </div>
              <span className="text-xs font-bold text-slate-900">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const ChannelTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-md border border-slate-200 p-4 rounded-xl shadow-2xl min-w-[180px]">
        <p className="font-extrabold text-sm mb-3 border-b pb-2 text-slate-900">{data.name || data.channel}</p>
        <div className="space-y-2">
           <div className="flex justify-between text-xs"><span className="text-slate-500">Vol:</span><span className="font-bold text-slate-900">{data.value}M</span></div>
           <div className="flex justify-between text-xs"><span className="text-slate-500">REV:</span><span className="font-bold text-slate-900">${data.rev}B</span></div>
           <div className="flex justify-between text-xs"><span className="text-slate-500">AUR:</span><span className="font-bold text-slate-900">${data.aur}</span></div>
           <div className="flex justify-between text-xs"><span className="text-slate-500">Margin:</span><span className="font-bold text-emerald-600">{data.margin}%</span></div>
           <div className="flex justify-between text-xs"><span className="text-slate-500">Growth:</span><span className="font-bold text-blue-600">{data.yoy}</span></div>
           <div className="flex justify-between text-xs"><span className="text-slate-500">Conv:</span><span className="font-bold text-amber-600">{data.conv}</span></div>
        </div>
      </div>
    );
  }
  return null;
};

export function ProductDataView() {
  const {
    selectedYear,
    selectedMonth,
    selectedSeries,
    seriesOptions,
    years,
    monthsByYear,
    derivedData,
    setSelectedYear,
    setSelectedMonth,
    toggleSeries,
  } = useProductBusinessData();
  return (
    <div className="space-y-6 pb-12 overflow-x-hidden">
      {/* Header & Panoramic Operational KPI Cards (Always at Top) */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Product Business Analysis</h2>
            <p className="text-slate-500 mt-1.5 flex items-center gap-2 font-medium">
              <Target className="h-4 w-4 text-orange-500" />
              Real-time monitoring of targets, revenue, and market performance.
            </p>
          </motion.div>
          
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-lg border border-slate-200 self-start md:self-center">
             <Badge variant="outline" className="bg-white shadow-sm border-slate-200">System Ready</Badge>
             <span className="text-[10px] text-muted-foreground px-2 font-black uppercase italic">Internal Data Only</span>
          </div>
        </div>

        {/* Panoramic Operational KPI Cards (STATIC as requested) */}
        <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar -mx-1 px-1">
           {derivedData.kpiCards.map((kpi, idx) => { const Icon = ICON_MAP[kpi.icon as keyof typeof ICON_MAP] ?? Box; return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="min-w-[280px] flex-shrink-0"
              >
                 <Card className="shadow-sm border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all h-full flex flex-col justify-between group">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                       <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none">{kpi.title}</p>
                       <div className={`p-2.5 rounded-xl transition-colors ${kpi.bgColor} ${kpi.color} group-hover:bg-slate-900 group-hover:text-white`}>
                          <Icon className="h-4 w-4" />
                       </div>
                    </CardHeader>
                    <CardContent>
                       <div className="flex items-baseline gap-1.5">
                          <h3 className="text-3xl font-black text-slate-900 leading-tight">{kpi.value}</h3>
                          <span className="text-xs text-slate-400 font-black uppercase tracking-tighter">{kpi.unit}</span>
                       </div>
                       <div className="mt-4 flex items-center gap-3">
                          <div className={`flex items-center gap-0.5 text-[10px] font-black px-2 py-0.5 rounded-full ${
                             kpi.yoy.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                          }`}>
                             {kpi.yoy.startsWith('+') ? <ArrowUp className="h-2 w-2" /> : <ArrowDown className="h-2 w-2" />}
                             {kpi.yoy}
                          </div>
                          <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                             <TrendingUp className="h-2 w-2" />
                             {kpi.qoq} Qoq
                          </div>
                       </div>
                       { (kpi.target || kpi.isCompletion) && (
                          <div className="mt-6 space-y-2.5 pt-4 border-t border-slate-100/60">
                             <div className="flex justify-between items-center text-[10px] font-bold tracking-tight">
                                <span className="text-slate-400">
                                  {kpi.isCompletion ? "Fiscal Year Milestone" : "Target Achievement"}
                                </span>
                                <span className={kpi.isPositive ? "text-slate-900 font-black" : "text-rose-600 font-black"}>
                                   {kpi.isCompletion ? kpi.value : `${((kpi.current as any / (kpi.target as any)) * 100).toFixed(1)}%`}
                                </span>
                             </div>
                             <Progress 
                                value={kpi.isCompletion ? kpi.completion : ((kpi.current as any) / (kpi.target as any)) * 100} 
                                className={`h-2 bg-slate-100 rounded-full`}
                                indicatorClassName={kpi.isCompletion && kpi.completion! < 100 && !kpi.isPositive ? "bg-orange-500" : "bg-slate-900"}
                             />
                             {kpi.isCompletion && (
                               <div className="space-y-1.5">
                                  <p className="text-[10px] font-bold text-slate-600 leading-snug">
                                    {kpi.target}
                                  </p>
                                  <p className="text-[9px] text-slate-400 font-medium leading-relaxed italic">
                                    {kpi.description}
                                  </p>
                               </div>
                             )}
                          </div>
                       )}
                    </CardContent>
                 </Card>
              </motion.div>
           ); })}
        </div>
      </div>

      {/* --- Floating Filter Bar (Starts below KPIs) --- */}
      <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl sticky top-2 z-50 rounded-2xl overflow-hidden ring-1 ring-slate-100">
        <CardContent className="p-4">
           <div className="flex flex-col lg:flex-row lg:items-center gap-8 justify-between">
              {/* Product Series Filter */}
              <div className="space-y-3 flex-1">
                 <div className="flex items-center gap-2">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Portfolio</Label>
                    <Badge variant="secondary" className="text-[9px] font-bold py-0 h-4 bg-slate-100 text-slate-600 border-none px-2">{selectedSeries.length} Selected</Badge>
                 </div>
                 <div className="flex flex-wrap gap-2">
                    {seriesOptions.map(series => (
                       <button
                          key={series}
                          onClick={() => toggleSeries(series)}
                          className={`px-4 py-1.5 rounded-full text-[11px] font-black transition-all border ${
                             selectedSeries.includes(series) 
                                ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200' 
                                : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                       >
                          {series}
                       </button>
                    ))}
                 </div>
              </div>

              {/* Two-Level Time Dimension Filter */}
              <div className="flex items-center gap-6 border-l border-slate-100 pl-8 h-12">
                 {/* Year Selection */}
                 <div className="space-y-2 min-w-[100px]">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-1.5">
                       Year
                    </Label>
                    <Select value={selectedYear} onValueChange={(v) => {
                       setSelectedYear(v);
                       setSelectedMonth(monthsByYear[v][0]);
                    }}>
                       <SelectTrigger className="bg-slate-50 h-9 text-[11px] font-bold border-transparent focus:ring-1 focus:ring-slate-900 transition-all rounded-lg">
                          <SelectValue placeholder="Year" />
                       </SelectTrigger>
                       <SelectContent className="border-slate-200 shadow-2xl">
                          {years.map(y => <SelectItem key={y} value={y} className="text-[11px] font-bold">{y}</SelectItem>)}
                       </SelectContent>
                    </Select>
                 </div>

                 {/* Month Selection (Cascading) */}
                 <div className="space-y-2 min-w-[100px]">
                    <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Month</Label>
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                       <SelectTrigger className="bg-slate-50 h-9 text-[11px] font-bold border-transparent focus:ring-1 focus:ring-slate-900 transition-all rounded-lg">
                          <SelectValue placeholder="Month" />
                       </SelectTrigger>
                       <SelectContent className="border-slate-200 shadow-2xl">
                          {monthsByYear[selectedYear].map(m => (
                             <SelectItem key={m} value={m} className="text-[11px] font-bold">
                                {m}
                             </SelectItem>
                          ))}
                       </SelectContent>
                    </Select>
                 </div>
              </div>
           </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
         {/* Performance Indicators Trend */}
         <Card className="lg:col-span-2 shadow-sm border-slate-100">
            <CardHeader className="pb-4 border-b border-slate-50">
               <div>
                  <CardTitle className="text-lg font-bold">Performance Indicators Trend</CardTitle>
                  <CardDescription>Multi-dimensional operational trends over the last 12 months</CardDescription>
               </div>
            </CardHeader>
            <CardContent className="pt-6">
               <div className="grid grid-cols-2 gap-6">
                  {[
                    { title: "Shipment (M Units)", dataKey: "shipment", color: "#1e293b", unit: "M" },
                    { title: "Total Revenue (B USD)", dataKey: "rev", color: "#10b981", unit: "B" },
                    { title: "Avg. Unit Retail (USD)", dataKey: "aur", color: "#f59e0b", unit: "" },
                    { title: "Gross Margin (%)", dataKey: "margin", color: "#dc2626", unit: "%" },
                  ].map((chart, idx) => (
                    <div key={idx} className="h-[180px] border border-slate-100 p-3 rounded-xl bg-slate-50/20 shadow-inner">
                       <h4 className="text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest">{chart.title}</h4>
                       <ResponsiveContainer width="100%" height="85%">
                          <LineChart data={derivedData.trends}>
                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                             <XAxis dataKey="month" hide />
                             <YAxis hide domain={['auto', 'auto']} />
                             <Tooltip content={<CustomTooltip />} />
                             <Line 
                                type="monotone" 
                                dataKey={chart.dataKey} 
                                stroke={chart.color} 
                                strokeWidth={3} 
                                dot={false}
                                activeDot={{ r: 5, strokeWidth: 0 }}
                             />
                          </LineChart>
                       </ResponsiveContainer>
                    </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         {/* Hot Selling Products */}
         <Card className="lg:col-span-1 shadow-sm border-slate-100">
            <CardHeader className="pb-2">
               <CardTitle className="text-lg font-bold">Top Selling Products</CardTitle>
               <CardDescription>Sales ranking for the current cycle ({selectedYear}-{selectedMonth})</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               {derivedData.topProducts.length > 0 ? derivedData.topProducts.map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-50 hover:border-slate-200 hover:bg-slate-50 transition-all group cursor-default">
                     <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white text-xs font-black shadow-lg shadow-slate-200 group-hover:rotate-12 transition-transform">
                           #{idx + 1}
                        </div>
                        <div>
                           <div className="text-xs font-black text-slate-900 uppercase tracking-tight">{p.name}</div>
                           <Badge variant="secondary" className="mt-1 text-[9px] font-black tracking-widest py-0.5 px-2 bg-slate-200/50 text-slate-600 border-none uppercase">
                              {p.series}
                           </Badge>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="text-xs font-black text-slate-900">{p.sales}</div>
                        <div className="text-[10px] font-bold text-emerald-600">{p.growth}</div>
                     </div>
                  </div>
               )) : (
                 <div className="text-center py-12 text-slate-400 text-xs font-medium">No products match current filters</div>
               )}
            </CardContent>
         </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
         {/* Cost Structure */}
         <Card className="shadow-sm border-slate-100">
            <CardHeader className="py-4 border-b border-slate-50">
               <CardTitle className="text-lg font-bold">Cost Structure Analysis</CardTitle>
               <CardDescription>Systematic cost allocation for consumer PC electronics</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center py-10">
               <div className="h-[300px] w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                           data={derivedData.cost}
                           cx="50%" cy="50%"
                           innerRadius={80}
                           outerRadius={110}
                           paddingAngle={5}
                           dataKey="value"
                        >
                           {derivedData.cost.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                           ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" wrapperStyle={{ fontSize: '11px', paddingLeft: '30px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.05em' }} />
                     </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ left: '-60px' }}>
                     <div className="text-center">
                        <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Total Cost</div>
                        <div className="text-2xl font-black text-slate-900">100%</div>
                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Profit Conversion Funnel */}
         <Card className="shadow-sm border-slate-100">
            <CardHeader className="py-4 border-b border-slate-50">
              <CardTitle className="text-lg font-bold">Profit Performance Overview</CardTitle>
              <CardDescription>Value chain conversion from Revenue to Net Profit</CardDescription>
            </CardHeader>
            <CardContent className="py-6">
               <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <FunnelChart>
                        <Tooltip content={<CustomTooltip />} />
                        <Funnel
                           data={derivedData.funnel}
                           dataKey="value"
                           labelKey="name"
                           isAnimationActive
                        >
                           <LabelList position="right" fill="#64748b" content={(props: any) => {
                              const { x, y, value, name } = props;
                              return (
                                 <text x={x + 10} y={y + 20} fill="#64748b" fontSize={10} fontWeight={900}>
                                    {name}: ${value}B
                                 </text>
                              );
                           }} />
                        </Funnel>
                     </FunnelChart>
                  </ResponsiveContainer>
               </div>
               <div className="mt-6 grid grid-cols-3 gap-4 px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-center">
                     <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Gross Margin</div>
                     <div className="text-sm font-black text-slate-900">{(derivedData.funnel[2].value / derivedData.funnel[0].value * 100).toFixed(1)}%</div>
                  </div>
                  <div className="text-center border-l border-slate-200 pl-4">
                     <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Expense Ratio</div>
                     <div className="text-sm font-black text-slate-900">{(derivedData.funnel[3].value / derivedData.funnel[0].value * 100).toFixed(1)}%</div>
                  </div>
                  <div className="text-center border-l border-slate-200 pl-4">
                     <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Net Margin</div>
                     <div className="text-sm font-black text-rose-600">{(derivedData.funnel[4].value / derivedData.funnel[0].value * 100).toFixed(1)}%</div>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>

      {/* Omni-Channel Analysis Section (Flat, Tabs Removed) */}
      <Card className="shadow-sm border-slate-100 overflow-hidden">
         <CardHeader className="pb-6 border-b border-slate-100 bg-slate-900 text-white">
            <div className="flex items-center justify-between">
               <div>
                  <CardTitle className="text-lg font-bold">Omnichannel Business Operations</CardTitle>
                  <CardDescription className="text-slate-400">Integrated view of online penetration and offline distribution efficiency</CardDescription>
               </div>
               <div className="flex gap-2">
                 <Badge className="bg-slate-800 text-slate-200 border-none px-3 font-bold tracking-widest">ECOMMERCE</Badge>
                 <Badge className="bg-white text-slate-900 border-none px-3 font-bold tracking-widest">RETAIL</Badge>
               </div>
            </div>
         </CardHeader>
         <CardContent className="py-10 space-y-16">
            <div className="grid md:grid-cols-12 gap-12 items-center">
               {/* Shipment Distribution Graph */}
               <div className="md:col-span-6">
                  <h4 className="text-xs font-black text-slate-500 mb-10 flex items-center gap-3 uppercase tracking-[0.2em]">
                     <TrendingUp className="h-4 w-4 text-slate-900" /> Shipment Volume Spread (M Units)
                  </h4>
                  <div className="h-[250px]">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={derivedData.channelSummary} margin={{ left: 40, right: 80 }}>
                           <XAxis type="number" hide />
                           <YAxis dataKey="channel" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 900, fill: '#1e293b' }} width={120} />
                           <Tooltip content={<ChannelTooltip />} cursor={{ fill: '#f8fafc' }} />
                           <Bar dataKey="value" fill="#1e293b" radius={[0, 6, 6, 0]} barSize={45}>
                              <LabelList dataKey="value" position="right" fontSize={13} fontWeight={900} fill="#1e293b" formatter={(v: any) => `${v}M`} />
                           </Bar>
                        </BarChart>
                     </ResponsiveContainer>
                  </div>
               </div>

               {/* Detailed Channel Weights */}
               <div className="md:col-span-6 border-l border-slate-100 pl-12">
                  <h4 className="text-xs font-black text-slate-500 mb-10 flex items-center gap-3 uppercase tracking-[0.2em]">
                     <ShoppingBag className="h-4 w-4 text-slate-900" /> Segmented Channel Weighting
                  </h4>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="h-[180px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                           <PieChart>
                              <Pie
                                 data={derivedData.channelDetail}
                                 cx="50%" cy="50%"
                                 innerRadius={55}
                                 outerRadius={80}
                                 paddingAngle={3}
                                 dataKey="value"
                              >
                                 {derivedData.channelDetail.map((entry, index) => (
                                    <Cell key={index} fill={entry.color} />
                                 ))}
                              </Pie>
                              <Tooltip />
                           </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col justify-center space-y-3">
                       {derivedData.channelDetail.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-[11px] font-black group">
                             <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full ring-2 ring-offset-2 ring-transparent group-hover:ring-slate-100 transition-all" style={{ backgroundColor: item.color }} />
                                <span className="text-slate-600 uppercase tracking-tight">{item.name}</span>
                             </div>
                             <span className="text-slate-900 tabular-nums px-2 border-l border-slate-100 ml-2">{item.value}%</span>
                          </div>
                       ))}
                    </div>
                  </div>
               </div>
            </div>

            {/* Bottom KPI Grid for Multi-Channel Performance */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-slate-100">
               {derivedData.bottomKPIs.map((item, idx) => (
                  <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-2xl hover:border-slate-200 transition-all duration-500">
                     <div className="flex items-center justify-between mb-4">
                        <div className={`p-2.5 rounded-xl bg-white shadow-sm ring-1 ring-slate-100 group-hover:scale-110 transition-transform`}>
                           {React.createElement(ICON_MAP[item.icon as keyof typeof ICON_MAP] ?? Box, { className: `h-4 w-4 ${item.color}` })}
                        </div>
                        <ChevronRight className="h-3 w-3 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                     </div>
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] mb-1">{item.label}</div>
                     <div className="text-2xl font-black text-slate-900 mb-1">{item.value}</div>
                     <p className="text-[10px] text-slate-400 font-medium mb-3 italic leading-none">{item.desc}</p>
                     <div className={`text-[11px] font-black ${item.yoy.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'} flex items-center gap-1.5`}>
                       <span className="text-[8px]">{item.yoy.startsWith('+') ? '+' : '-'}</span>
                       {item.yoy} 
                       <span className="text-slate-300 font-bold uppercase tracking-widest text-[9px] px-1 ml-auto">YoY Delta</span>
                     </div>
                  </div>
               ))}
            </div>
         </CardContent>
      </Card>
    </div>
  );
}



