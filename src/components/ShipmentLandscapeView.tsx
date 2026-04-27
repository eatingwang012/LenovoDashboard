import { useMemo } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Line,
  Treemap,
  ComposedChart
} from "recharts";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "./ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "./ui/select";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { 
  Info, 
  TrendingUp, 
  TrendingDown, 
  Map as MapIcon, 
  Box, 
  DollarSign, 
  LayoutGrid,
  ExternalLink
} from "lucide-react";
import { AnimatePresence } from 'motion/react';
import {
  SHIPMENT_AUR_SEGMENTS as AUR_SEGMENTS,
  SHIPMENT_BRANDS as BRANDS,
  SHIPMENT_BRAND_COLORS as BRAND_COLORS,
  SHIPMENT_QUARTERS as QUARTERS,
  SHIPMENT_RAW_DATA as RAW_DATA,
  SHIPMENT_REGIONS as REGIONS,
} from "../mock/shipmentLandscape";
import { useShipmentLandscapeData } from "../hooks/useShipmentLandscapeData";
// --- Components ---

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border rounded-lg shadow-lg">
        <p className="font-bold mb-2">{label}</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
              <span className="text-muted-foreground">{entry.name}:</span>
              <span className="font-mono font-bold">
                {entry.value.toLocaleString()}
                {entry.payload.percent ? ` (${entry.payload.percent}%)` : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export function ShipmentLandscapeView() {
  const {
    selectedBrands,
    selectedModel,
    selectedQuarter,
    selectedRegion,
    selectedPriceSegment,
    hoveredBrand,
    drillDownBrand,
    filteredData,
    marketContextTotal,
    availableModels,
    summaryMetrics,
    treemapData,
    priceData,
    regionalPerformance,
    setSelectedModel,
    setSelectedQuarter,
    setSelectedRegion,
    setSelectedPriceSegment,
    setHoveredBrand,
    setDrillDownBrand,
    toggleBrand,
  } = useShipmentLandscapeData();
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      {/* Title & Metadata */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Shipment Landscape</h1>
          <p className="text-muted-foreground">Comprehensive cross-brand shipment analysis and competitive benchmarking.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-lg border border-slate-200">
          <Badge variant="outline" className="bg-white shadow-sm">Live Analysis Feed</Badge>
          <span className="text-xs text-muted-foreground px-2 font-medium">Updated: 2025-Q1 Final Rel.</span>
        </div>
      </div>

      {/* --- Filter Bar --- */}
      <Card className="bg-slate-50 border-slate-200 shadow-sm sticky top-0 z-20">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Brands</Label>
              <div className="flex flex-wrap gap-1.5">
                {BRANDS.map(brand => (
                  <button
                    key={brand}
                    onClick={() => toggleBrand(brand)}
                    onMouseEnter={() => setHoveredBrand(brand)}
                    onMouseLeave={() => setHoveredBrand(null)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                      selectedBrands.includes(brand) 
                        ? 'bg-slate-900 text-white shadow-sm' 
                        : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Regional Focus</Label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="bg-white h-8 text-[11px] font-medium">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  {REGIONS.map(r => <SelectItem key={r} value={r} className="text-[11px]">{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Fiscal Period</Label>
              <Select value={selectedQuarter} onValueChange={setSelectedQuarter}>
                <SelectTrigger className="bg-white h-8 text-[11px] font-medium">
                  <SelectValue placeholder="Quarter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Time" className="text-[11px]">All Time</SelectItem>
                  {QUARTERS.map(q => <SelectItem key={q} value={q} className="text-[11px]">{q}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Model Range</Label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="bg-white h-8 text-[11px] font-medium">
                  <SelectValue placeholder="Model Selection" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map(m => <SelectItem key={m} value={m} className="text-[11px]">{m}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Price Band (AUR)</Label>
              <Select value={selectedPriceSegment} onValueChange={setSelectedPriceSegment}>
                <SelectTrigger className="bg-white h-8 text-[11px] font-medium">
                  <SelectValue placeholder="Price Segment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Segments" className="text-[11px]">All Segments</SelectItem>
                  {AUR_SEGMENTS.map(s => <SelectItem key={s} value={s} className="text-[11px]">{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* --- Module 1: Market Performance Matrix --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Market Summary */}
        <Card className="border-l-4 border-l-slate-900 bg-slate-50/30">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-1 uppercase tracking-tighter text-[10px] font-black text-slate-400">
              <Box className="w-3 h-3" /> Selected Market Volume
            </CardDescription>
            <CardTitle className="text-3xl lg:text-4xl font-black font-mono tabular-nums tracking-tighter">
              {summaryMetrics.current.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span className={`text-sm font-bold font-mono ${summaryMetrics.yoy >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {summaryMetrics.yoy >= 0 ? '+' : ''}{summaryMetrics.yoy.toFixed(1)}%
                </span>
                <span className="text-[9px] uppercase font-bold text-slate-400 ml-1">YoY</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-slate-400" />
                <span className={`text-sm font-bold font-mono ${summaryMetrics.qoq >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {summaryMetrics.qoq >= 0 ? '+' : ''}{summaryMetrics.qoq.toFixed(1)}%
                </span>
                <span className="text-[9px] uppercase font-bold text-slate-400 ml-1">QoQ</span>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100 flex justify-between">
              {summaryMetrics.brandShares.map(s => (
                <div key={s.brand} className="text-center">
                  <div className="w-1.5 h-1.5 rounded-full mx-auto mb-1" style={{ backgroundColor: BRAND_COLORS[s.brand] }} />
                  <span className="text-[9px] font-mono font-bold">{(s.volume / (summaryMetrics.current || 1) * 100).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Brand Focus Cards */}
        {BRANDS.map(brand => {
          const stats = summaryMetrics.brandShares.find(b => b.brand === brand);
          if (!stats) return null;
          
          let lenovoBenchmark = null;
          if (brand !== "Lenovo") {
            const lenovoData = summaryMetrics.brandShares.find(b => b.brand === "Lenovo");
            if (lenovoData && lenovoData.volume > 0) {
              lenovoBenchmark = (stats.volume / lenovoData.volume) * 100;
            }
          }

          return (
            <Card 
              key={brand} 
              className={`transition-all duration-300 border-l-4 ${hoveredBrand === brand ? 'scale-[1.02] shadow-md ring-1 ring-slate-100' : filteredData.length === 0 || !selectedBrands.includes(brand) ? 'opacity-30 grayscale' : ''}`}
              style={{ borderLeftColor: BRAND_COLORS[brand] }}
              onMouseEnter={() => setHoveredBrand(brand)}
              onMouseLeave={() => setHoveredBrand(null)}
            >
              <CardHeader className="pb-1">
                <div className="flex justify-between items-start">
                  <CardDescription className="uppercase tracking-tighter text-[10px] font-black text-slate-400">{brand} Market Index</CardDescription>
                  <Badge variant="secondary" className="text-[9px] font-mono py-0">{stats.share.toFixed(1)}%</Badge>
                </div>
                <CardTitle className="text-3xl lg:text-4xl font-black font-mono tabular-nums leading-none mt-1">{stats.volume.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-700 ease-out" 
                    style={{ backgroundColor: BRAND_COLORS[brand], width: `${(stats.volume / (marketContextTotal || 1) * 100)}%` }} 
                  />
                </div>
                
                <div className="flex justify-between items-center bg-slate-50/50 p-2 rounded border border-slate-100/50">
                   <div className="flex flex-col">
                     <span className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">Growth (QoQ)</span>
                     <span className={`text-xs font-mono font-bold ${stats.qoq >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                       {stats.qoq >= 0 ? '+' : ''}{stats.qoq.toFixed(1)}%
                     </span>
                   </div>
                   <div className="text-right flex flex-col">
                     {brand === "Lenovo" ? (
                        <>
                          <span className="text-[9px] font-black text-emerald-500 uppercase leading-none mb-1">Status</span>
                          <span className="text-[10px] font-bold uppercase text-emerald-600">Core Focus</span>
                        </>
                     ) : (
                        <>
                          <span className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">vs Lenovo</span>
                          <span className="text-xs font-mono font-bold text-slate-600">{lenovoBenchmark?.toFixed(1)}%</span>
                        </>
                     )}
                   </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* --- Module 2: Shipment Dynamics --- */}
        <Card className="lg:col-span-2 shadow-sm border-slate-200 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b bg-slate-50/50 py-3">
            <div>
              <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500">
                <TrendingUp className="w-4 h-4" />
                Quarterly Trajectory
              </CardTitle>
            </div>
            <div className="flex gap-4">
               <div className="flex items-center gap-1.5">
                 <div className="w-2 h-2 rounded-full bg-red-600" />
                 <span className="text-[10px] font-black uppercase text-slate-600">Lenovo Intensity</span>
               </div>
               <div className="flex items-center gap-1.5">
                 <div className="w-2 h-2 rounded-full bg-slate-200 border border-slate-300" />
                 <span className="text-[10px] font-black uppercase text-slate-400">Peer Muted</span>
               </div>
            </div>
          </CardHeader>
          <CardContent className="h-[380px] pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={useMemo(() => {
                return QUARTERS.map(q => {
                  const entry: any = { quarter: q };
                  BRANDS.forEach(b => {
                    // We calculate volume for ALL brands regardless of selection for the background context
                    entry[b] = RAW_DATA
                      .filter(d => d.quarter === q && d.brand === b && (selectedRegion === "Global" ? true : d.region === selectedRegion))
                      .reduce((acc, curr) => acc + curr.volume, 0);
                  });
                  return entry;
                });
              }, [selectedRegion])}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="quarter" 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                  axisLine={false} 
                  tickLine={false} 
                />
                <YAxis 
                  tick={{ fontSize: 10, fill: '#94a3b8', fontFamily: 'monospace' }} 
                  axisLine={false} 
                  tickLine={false} 
                  tickFormatter={(v) => `${(v/1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  iconType="circle" 
                  onMouseEnter={(e: any) => setHoveredBrand(e.value)} 
                  onMouseLeave={() => setHoveredBrand(null)}
                />
                
                {BRANDS.map(brand => {
                  const isSelected = selectedBrands.includes(brand);
                  const isHovered = hoveredBrand === brand;
                  
                  return (
                    <Line
                      key={brand}
                      type="monotone"
                      dataKey={brand}
                      stroke={BRAND_COLORS[brand]}
                      strokeWidth={isSelected || isHovered ? (brand === "Lenovo" ? 5 : 4) : 1.5}
                      dot={brand === "Lenovo" || isHovered || isSelected ? { 
                        r: isHovered || (brand === "Lenovo" && isSelected) ? 6 : 4, 
                        fill: BRAND_COLORS[brand], 
                        strokeWidth: 2, 
                        stroke: '#fff' 
                      } : false}
                      activeDot={{ r: 8, strokeWidth: 0 }}
                      // Interaction logic: Selected brands are fully opaque, others are dimmed but visible (darkened "muted" color)
                      strokeOpacity={isSelected || isHovered ? 1 : 0.25}
                      strokeDasharray={isSelected || isHovered ? "0" : "4 4"}
                      connectNulls
                    />
                  );
                })}
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* --- Module 4: Price Segment Analysis --- */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="border-b bg-slate-50/50 py-3">
            <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500">
              <DollarSign className="w-4 h-4" />
              AUR Positioning 
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[380px] pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceData} layout="vertical" margin={{ left: 10, right: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="aur" 
                  type="category" 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#64748b' }} 
                  width={80}
                  axisLine={false} 
                  tickLine={false} 
                />
                <Tooltip content={<CustomTooltip />} />
                {BRANDS.map(brand => (
                  <Bar 
                    key={brand} 
                    dataKey={brand} 
                    stackId="a" 
                    fill={BRAND_COLORS[brand]} 
                    radius={[0, 0, 0, 0]}
                    opacity={hoveredBrand && hoveredBrand !== brand ? 0.1 : 1}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* --- Module 3: Strategic Portfolio Matrix (Treemap) --- */}
      <Card className="shadow-sm border-slate-200 overflow-hidden">
        <CardHeader className="border-b bg-slate-50/50 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-500">
              <LayoutGrid className="w-4 h-4" />
              Portfolio Distribution Index
            </CardTitle>
            <CardDescription className="text-[10px] font-bold text-slate-400 mt-1 italic">
              Click a brand to drill-down into specific series data
            </CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <AnimatePresence>
              {drillDownBrand && (
                <button 
                  onClick={() => setDrillDownBrand(null)}
                  className="text-[10px] font-black uppercase px-4 py-1.5 bg-slate-900 text-white rounded-full hover:bg-black transition-all flex items-center gap-2 shadow-lg"
                >
                  <Box className="w-3 h-3" /> Reset Viewport
                </button>
              )}
            </AnimatePresence>
            <div className="text-[11px] font-mono text-slate-400 bg-white border border-slate-200 px-3 py-1 rounded hidden sm:block">
              {drillDownBrand ? `Focus: ${drillDownBrand}` : 'Master Level View'}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-[480px] w-full p-4 bg-slate-50/10">
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={treemapData}
                dataKey="size"
                nameKey="name"
                aspectRatio={21 / 9}
                stroke="#fff"
                onClick={(node: any) => {
                  if (node && node.name && (BRANDS as any).includes(node.name)) {
                    setDrillDownBrand(node.name);
                  }
                }}
                /* @ts-expect-error custom content required complex props type */
                content={<CustomizedTreeMapContent />}
              >
                <Tooltip content={<CustomTooltip />} />
              </Treemap>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* --- Module 5: Battleground Performance --- */}
      <div className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2 pl-1">
          <MapIcon className="w-4 h-4" />
          Regional Battleground Monitoring
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {regionalPerformance.map((item, index) => (
            <Card key={index} className={`overflow-hidden border-slate-200 transition-all duration-300 ${item.isLenovoLeader ? 'ring-2 ring-emerald-500/20 shadow-lg' : ''}`}>
              <div className={`px-4 py-2.5 text-xs font-black uppercase tracking-widest flex justify-between items-center ${item.isLenovoLeader ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white'}`}>
                {item.region}
                {item.isLenovoLeader ? (
                  <Badge className="bg-white text-emerald-600 border-none px-2 h-4 text-[9px] font-black">Dominant</Badge>
                ) : (
                   <span className="text-[9px] text-slate-400 flex items-center gap-1">
                     <TrendingUp className="w-3 h-3" /> Challenger
                   </span>
                )}
              </div>
              <CardContent className="p-4 space-y-5">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col justify-center items-center text-center shadow-inner">
                   <p className="text-[9px] uppercase font-black text-slate-400 mb-1 tracking-tighter">Market Delta (vs Avg)</p>
                   {item.isLenovoLeader ? (
                     <div className="flex items-center gap-1.5 text-emerald-600">
                       <TrendingUp className="w-5 h-5" />
                       <span className="text-xl font-mono font-black">+{item.lenovoGap.toFixed(1)}%</span>
                     </div>
                   ) : (
                     <div className="flex items-center gap-1.5 text-red-600">
                        <TrendingDown className="w-5 h-5" />
                        <span className="text-xl font-mono font-black">-{item.lenovoGap.toFixed(1)}%</span>
                     </div>
                   )}
                </div>

                <div className="space-y-3 px-1">
                  {item.brands.sort((a,b) => b.share - a.share).map(b => (
                    <div key={b.brand} className="space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className={b.brand === "Lenovo" ? "font-black text-red-600 underline underline-offset-4 decoration-red-600/30" : "text-slate-500"}>{b.brand}</span>
                        <span className="font-mono bg-slate-100 px-1.5 rounded">{b.share.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1 rounded-full relative">
                        <div 
                          className="h-full rounded-full transition-all duration-1000" 
                          style={{ 
                            backgroundColor: hoveredBrand === b.brand ? BRAND_COLORS[b.brand] : (b.brand === "Lenovo" ? "#dc2626" : "#cbd5e1"), 
                            width: `${b.share}%` 
                          }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <footer className="mt-14 bg-slate-900 text-white rounded-2xl p-8 border border-white/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5 transition-opacity group-hover:opacity-10 pointer-events-none">
          <ChartDecoration />
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 relative z-10">
          <div className="space-y-3">
            <h4 className="text-sm font-black flex items-center gap-2 text-slate-100 uppercase tracking-[0.3em]">
              <Info className="w-4 h-4 text-red-500" />
              Intelligence Methodology
            </h4>
            <p className="text-xs text-slate-400 max-w-3xl leading-relaxed font-medium">
              This landscape aggregates sell-in shipment volumes sourced from authorized market tracking services. 
              Data is calibrated quarterly using proprietary triangulation across ODM yields and channel sell-out velocity. 
              All financial values are AUR (Average Unit Revenue) normalized to USD.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full md:w-auto">
            {[
              { name: "IDC Quarterly Tracker", url: "https://www.idc.com" },
              { name: "Gartner Infrastructure", url: "https://www.gartner.com" },
              { name: "Canalys Pulse", url: "https://www.canalys.com" },
              { name: "Amazon Retail Index", url: "https://www.amazon.com" }
            ].map(source => (
              <a 
                key={source.name} 
                href={source.url} 
                target="_blank" 
                rel="no-referrer"
                className="flex items-center justify-between gap-10 px-4 py-2 text-[10px] font-black uppercase text-slate-300 hover:text-white transition-all bg-white/5 border border-white/10 rounded-lg hover:border-red-500/50 hover:bg-white/10"
              >
                {source.name}
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-500 uppercase tracking-widest font-black gap-4">
          <div className="flex items-center gap-4">
            <span className="text-red-500">Classification: Highly Confidential</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>Project: RED-WAVE-2025</span>
          </div>
          <span>© Lenovo Global Market Intelligence Group</span>
        </div>
      </footer>
    </div>
  );
}

// --- Specialized Internal Components ---

const CustomizedTreeMapContent = (props: any) => {
  const { depth, x, y, width, height, name, brand } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: depth < 2 ? 'transparent' : BRAND_COLORS[brand] || '#ddd',
          stroke: '#fff',
          strokeWidth: 2 / (depth + 1),
          strokeOpacity: 1,
          opacity: depth < 2 ? 1 : 0.85
        }}
        className="transition-all duration-300 hover:opacity-100 cursor-pointer"
      />
      {depth === 1 ? (
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill="none"
          stroke="#000"
          strokeOpacity={0.08}
          strokeWidth={1}
        />
      ) : null}
      {width > 60 && height > 30 ? (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          fill="#fff"
          fontSize={Math.min(width / 10, 11)}
          fontWeight={900}
          className="pointer-events-none select-none drop-shadow-sm uppercase tracking-tighter"
        >
          {name}
        </text>
      ) : null}
      {depth === 1 && width > 100 ? (
        <text
          x={x + 10}
          y={y + 18}
          fill="#000"
          fontSize={11}
          fontWeight={900}
          className="pointer-events-none select-none uppercase opacity-30 tracking-[0.2em]"
        >
          {name}
        </text>
      ) : null}
    </g>
  );
};

const ChartDecoration = () => (
  <svg width="400" height="200" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 200C50 150 100 180 150 100C200 20 250 80 300 40C350 0 400 50 400 50V200H0Z" fill="white" fillOpacity="0.1" />
    <circle cx="150" cy="100" r="40" stroke="white" strokeOpacity="0.1" strokeWidth="20" />
  </svg>
);

