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

const brands = ["全部", "惠普", "戴尔", "苹果", "华为", "华硕"];

const timelineEvents = [
  // Products
  { id: 1, brand: "华为", product: "MateBook X Pro", monthOffset: -11, specs: "酷睿 Ultra 9, 柔性OLED", pricing: "¥10,999", sellingPoints: "全球最轻14寸, 盘古大模型集成", type: "product", link: "https://consumer.huawei.com/" },
  { id: 2, brand: "惠普", product: "OmniBook Ultra", monthOffset: -7, specs: "AMD Ryzen AI 300, 32GB RAM", pricing: "¥8,999", sellingPoints: "高端AI PC, 续航提升30%", type: "product", link: "https://www.hp.com/" },
  { id: 3, brand: "戴尔", product: "XPS 13", monthOffset: -3, specs: "骁龙 X Elite, 无缝触控板", pricing: "¥9,999", sellingPoints: "全天候续航, 极致便携", type: "product", link: "https://www.dell.com/" },
  { id: 4, brand: "苹果", product: "MacBook Air M4", monthOffset: -1, specs: "M4芯片, 增强效能", pricing: "¥8,999起", sellingPoints: "能效标杆, 静音散热门槛提升", type: "product", link: "https://www.apple.com/" },
  { id: 5, brand: "华硕", product: "无畏Pro 15", monthOffset: 2, specs: "AMD Ryzen 9, RTX 4060", pricing: "¥8,499", sellingPoints: "全能高性价比, 华硕好屏", type: "product", link: "https://www.asus.com/" },
  { id: 6, brand: "苹果", product: "MacBook Pro M5", monthOffset: 6, specs: "M5芯片首发, 巅峰性能", pricing: "预测 ¥14,999起", sellingPoints: "AI专用加速核, 专业级生产力引擎", type: "product", link: "https://www.apple.com/" },
  
  // Supply Chain
  { id: 7, brand: "供应链", product: "DDR5 现货价上调", monthOffset: -10, specs: "海力士/三星减产15%", pricing: "成本上涨8%", sellingPoints: "影响下半年商用机型毛利", type: "supply", link: "#" },
  { id: 8, brand: "供应链", product: "高配面板产能释放", monthOffset: -2, specs: "京东方8.6代线部分投产", pricing: "成本下调5%", sellingPoints: "OLED屏幕在主流机型加速渗透", type: "supply", link: "#" },
  { id: 9, brand: "供应链", product: "AI PC 算力芯片短缺预警", monthOffset: 3, specs: "NPU 封装产能不足", pricing: "现货溢价风险", sellingPoints: "预计影响Q3高端轻薄本出货进度", type: "supply", link: "#" }
];

const supplyCategories = [
  {
    id: "cpu",
    name: "CPU 处理器",
    icon: Cpu,
    metric: "采购成本变动",
    past3m: "+2.5%",
    future3m: "+1.0%",
    trend: "上涨", 
    driver: "AI芯片先进封装产能短缺导致的溢价",
    priceTrend: [
      { period: "25Q1", actual: 100 }, { period: "25Q2", actual: 102 },
      { period: "25Q3", actual: 103 }, { period: "25Q4", actual: 105 },
      { period: "26Q1", actual: 108 }, { period: "26Q2", actual: 110, forecast: 110 },
      { period: "26Q3", forecast: 112 }, { period: "26Q4", forecast: 113 }
    ]
  },
  {
    id: "panel",
    name: "显示面板",
    icon: Monitor,
    metric: "采购成本变动",
    past3m: "-3.2%",
    future3m: "-1.5%",
    trend: "下跌",
    driver: "各大厂8.x代OLED新产线良率提升释放产能",
    priceTrend: [
      { period: "25Q1", actual: 100 }, { period: "25Q2", actual: 98 },
      { period: "25Q3", actual: 96 }, { period: "25Q4", actual: 93 },
      { period: "26Q1", actual: 90 }, { period: "26Q2", actual: 88, forecast: 88 },
      { period: "26Q3", forecast: 86 }, { period: "26Q4", forecast: 85 }
    ]
  },
  {
    id: "memory",
    name: "内存 / 存储",
    icon: HardDrive,
    metric: "采购成本变动",
    past3m: "+15.0%",
    future3m: "+8.5%",
    trend: "上涨",
    driver: "原厂严格控产保价，叠加HBM需求排挤标准PC DRAM产能",
    priceTrend: [
      { period: "25Q1", actual: 100 }, { period: "25Q2", actual: 105 },
      { period: "25Q3", actual: 115 }, { period: "25Q4", actual: 125 },
      { period: "26Q1", actual: 140 }, { period: "26Q2", actual: 152, forecast: 152 },
      { period: "26Q3", forecast: 160 }, { period: "26Q4", forecast: 165 }
    ]
  },
  {
    id: "battery",
    name: "电池 / 电源",
    icon: BatteryCharging,
    metric: "采购成本变动",
    past3m: "0.0%",
    future3m: "0.0%",
    trend: "持平",
    driver: "上游锂矿及电芯原材料价格低位震荡企稳",
    priceTrend: [
      { period: "25Q1", actual: 100 }, { period: "25Q2", actual: 100 },
      { period: "25Q3", actual: 98 }, { period: "25Q4", actual: 99 },
      { period: "26Q1", actual: 99 }, { period: "26Q2", actual: 99, forecast: 99 },
      { period: "26Q3", forecast: 99 }, { period: "26Q4", forecast: 100 }
    ]
  },
  {
    id: "chipset",
    name: "核心芯片组",
    icon: Microchip,
    metric: "采购成本变动",
    past3m: "-1.0%",
    future3m: "0.0%",
    trend: "持平",
    driver: "成熟制程晶圆代工厂产能充裕，价格博弈均衡",
    priceTrend: [
      { period: "25Q1", actual: 100 }, { period: "25Q2", actual: 99 },
      { period: "25Q3", actual: 98 }, { period: "25Q4", actual: 98 },
      { period: "26Q1", actual: 97 }, { period: "26Q2", actual: 96, forecast: 96 },
      { period: "26Q3", forecast: 96 }, { period: "26Q4", forecast: 96 }
    ]
  }
];

export function MarketOutlookView() {
  const [selectedBrand, setSelectedBrand] = useState("全部");
  const [selectedRange, setSelectedRange] = useState([-15, 6]);
  const [activeEventId, setActiveEventId] = useState<number | null>(3);
  const [activeSupplyId, setActiveSupplyId] = useState("cpu");

  // Filtering events based on brand and range
  const filteredEvents = timelineEvents.filter(e => {
    const matchBrand = selectedBrand === "全部" || e.brand === selectedBrand || e.brand === "供应链";
    const matchRange = e.monthOffset >= selectedRange[0] && e.monthOffset <= selectedRange[1];
    return matchBrand && matchRange;
  });
  
  const productEvents = filteredEvents.filter(e => e.type === "product");
  const supplyEvents = filteredEvents.filter(e => e.type === "supply");

  const activeEvent = timelineEvents.find(e => e.id === activeEventId);
  const activeSupply = supplyCategories.find(s => s.id === activeSupplyId);

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "上涨": return "text-red-600";
      case "下跌": return "text-emerald-600";
      default: return "text-slate-800";
    }
  };

  const getBorderColor = (trend: string) => {
    switch (trend) {
      case "上涨": return "border-red-200 ring-red-100 hover:ring-red-200";
      case "下跌": return "border-emerald-200 ring-emerald-100 hover:ring-emerald-200";
      default: return "border-slate-200 ring-slate-100 hover:ring-slate-200";
    }
  };

  const getIconColor = (trend: string) => {
    switch (trend) {
      case "上涨": return "text-red-500 bg-red-50";
      case "下跌": return "text-emerald-500 bg-emerald-50";
      default: return "text-slate-500 bg-slate-100";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "上涨": return <TrendingUp className="h-4 w-4" />;
      case "下跌": return <TrendingDown className="h-4 w-4" />;
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
          <h2 className="text-3xl font-black tracking-tight text-slate-900">市场动态与供应链</h2>
        </div>
      </div>

      {/* 1. 竞品新品发布与行业事件动态 */}
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
           <div className="flex items-center gap-6">
              <h3 className="text-base font-bold flex items-center gap-2">
                 <div className="w-1 h-5 bg-blue-600 rounded-full" />
                 动态追踪视图
              </h3>
              
              <div className="h-6 w-px bg-slate-200" />
              
              {/* Brand Filters */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">品牌:</span>
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
           <div className="flex items-center gap-2">
             <span className="text-xs font-bold text-slate-400">时间窗口:</span>
             <select 
               value={selectedRange[0]}
               onChange={(e) => {
                 const val = parseInt(e.target.value, 10);
                 setSelectedRange([val, Math.max(val, selectedRange[1])]);
               }}
               className="text-[11px] font-bold border border-slate-200 rounded px-2 py-1 bg-white text-slate-700 outline-none focus:border-blue-400 cursor-pointer"
             >
               {Array.from({ length: 24 }, (_, i) => i - 15).map(offset => (
                 <option key={`start-${offset}`} value={offset}>{formatDateOffset(offset)}</option>
               ))}
             </select>
             <span className="text-slate-400 text-xs font-medium">-</span>
             <select 
               value={selectedRange[1]}
               onChange={(e) => {
                 const val = parseInt(e.target.value, 10);
                 setSelectedRange([Math.min(selectedRange[0], val), val]);
               }}
               className="text-[11px] font-bold border border-slate-200 rounded px-2 py-1 bg-white text-slate-700 outline-none focus:border-blue-400 cursor-pointer"
             >
               {Array.from({ length: 24 }, (_, i) => i - 15).map(offset => (
                 <option key={`end-${offset}`} value={offset}>{formatDateOffset(offset)}</option>
               ))}
             </select>
           </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 border-none shadow-sm ring-1 ring-slate-200 bg-white overflow-hidden">
            <CardHeader className="pb-0 pt-5 px-6">
               <div className="flex justify-between items-end">
                 <div>
                   <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">双轨时间轴推演</CardTitle>
                   <CardDescription className="text-xs font-serif italic">竞品发布 (上) vs 行业关键事件 (下)</CardDescription>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div><span className="text-[10px] text-slate-500">竞品历史发布</span></div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-300"></div><span className="text-[10px] text-slate-500">竞品未来预测</span></div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"></div><span className="text-[10px] text-slate-500">供应链事件</span></div>
                 </div>
               </div>
            </CardHeader>
            <CardContent className="pt-8 pb-6 px-10">
              <div className="relative w-full">
                
                {/* Track 1: Competitor Products */}
                <div className="relative h-14 w-full mb-8 group">
                  <span className="absolute -top-4 left-0 text-[10px] font-black text-blue-800 bg-blue-50 px-2 py-0.5 rounded">终端品牌发行</span>
                  <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-slate-100 rounded-full -translate-y-1/2" />
                  
                  {/* Current Month vertical marker extending across both tracks */}
                  {selectedRange[0] <= 0 && selectedRange[1] >= 0 && (
                    <div 
                      className="absolute top-0 w-px h-36 bg-red-400 border-r border-dashed border-red-200 z-0" 
                      style={{ left: `calc(${((0 - selectedRange[0]) / (selectedRange[1] - selectedRange[0])) * 100}%)` }}
                    >
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-red-50 text-red-600 px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap shadow-sm border border-red-100">
                        当前 (26/04)
                      </div>
                    </div>
                  )}

                  {renderTimelineNodes(productEvents, "product")}
                </div>

                {/* Track 2: Supply Chain */}
                <div className="relative h-14 w-full mb-6 group">
                  <span className="absolute -top-4 left-0 text-[10px] font-black text-amber-800 bg-amber-50 px-2 py-0.5 rounded">上游行业波动</span>
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
                           {activeEvent.type === 'supply' ? '产业链事件简报' : '新品发布档案'}
                         </Badge>
                         {activeEvent.link !== '#' && (
                           <a href={activeEvent.link} target="_blank" rel="noopener noreferrer" className="text-[10px] flex items-center gap-1 font-bold text-slate-500 hover:text-blue-600 transition-colors bg-white border border-slate-200 px-2 py-0.5 rounded">
                              <ExternalLink className="w-3 h-3" />
                              官网信息
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
                         <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1.5">核心参数 / 关键信息</p>
                         <p className="text-sm font-bold text-slate-800">{activeEvent.specs}</p>
                       </div>
                       
                       <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                         <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1.5 flex justify-between">
                            <span>关键卖点 / 市场预判</span>
                         </p>
                         <p className="text-xs font-medium text-slate-600 leading-relaxed">
                           {activeEvent.sellingPoints}
                         </p>
                       </div>

                       <div className="pt-2 border-t border-slate-200/60">
                         <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">定价与成本影响</p>
                         <p className="text-lg font-black text-slate-900 mt-1">{activeEvent.pricing}</p>
                       </div>
                    </CardContent>
                 </Card>
               </motion.div>
            ) : (
               <Card className="h-full border-dashed border-2 shadow-none border-slate-200 flex items-center justify-center bg-slate-50">
                  <p className="text-sm text-slate-400 font-medium tracking-wide">点击时间轴节点查看详情</p>
               </Card>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 2. 供应链资讯 */}
      <div className="space-y-4 pt-8 border-t border-slate-200">
         <h3 className="text-xl font-bold flex items-center gap-2">
            <div className="w-1.5 h-6 bg-emerald-600 rounded-full" />
            供应链指标监控与预警
         </h3>
         <p className="text-xs text-slate-500 font-medium mb-4">通过跟踪核心物料的采购成本波动（环比百分比），识别上游供应端的风险与机会因素。</p>

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
                               <span className="text-[10px] text-slate-500 font-bold">{cat.metric} (过去3个月)</span>
                               <span className="text-xs font-black text-slate-800">{cat.past3m}</span>
                            </div>
                            <div className="flex justify-between items-center">
                               <span className="text-[10px] text-slate-500 font-bold">预测环比 (未来3个月)</span>
                               <span className={`text-xs font-black flex items-center gap-1 ${getTrendColor(cat.trend)}`}>
                                 {cat.future3m} {getTrendIcon(cat.trend)}
                               </span>
                            </div>
                          </div>
                          
                          <div className={`pt-2 border-t ${isActive ? 'border-slate-100' : 'border-slate-200/50'}`}>
                             <p className="text-[10px] text-slate-400 font-black tracking-widest uppercase mb-1">影响因素</p>
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
                    核心零部件采购成本指数走势 ({activeSupply?.name})
                 </CardTitle>
                 <CardDescription className="text-xs font-serif italic text-slate-400 mt-1">2025 – 2026E 季度指数数据 (以25Q1为基准 100)</CardDescription>
               </div>
               <Badge className="bg-slate-800 text-slate-300 hover:bg-slate-700">实时数据驱动</Badge>
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
                               name="实际成本指数" 
                               dataKey="actual" 
                               stroke="#38bdf8" 
                               strokeWidth={3}
                               dot={{ r: 4, strokeWidth: 2, fill: '#0f172a' }}
                               activeDot={{ r: 6, fill: '#38bdf8' }}
                            />
                            {/* Forecast line */}
                            <Line 
                               type="monotone"
                               name="未来预测指数" 
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
