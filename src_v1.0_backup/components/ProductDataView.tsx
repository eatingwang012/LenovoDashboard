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
  ChevronRight,
  Filter
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { motion } from "motion/react";

// --- Mock Data ---

const kpiData = [
  { 
    title: "总出货量", 
    value: "19.4M", 
    unit: "台",
    target: 20000000,
    current: 19400000,
    yoy: "+10.2%", 
    qoq: "+2.5%", 
    isPositive: true,
    icon: Laptop,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  { 
    title: "总营收 REV", 
    value: "1,219", 
    unit: "亿",
    target: 130000000000,
    current: 121900000000,
    yoy: "+11.0%", 
    qoq: "+3.1%", 
    isPositive: true,
    icon: Wallet,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50"
  },
  { 
    title: "平均单价 AUR", 
    value: "6,286", 
    unit: "元",
    yoy: "-6.8%", 
    qoq: "-1.2%", 
    isPositive: false,
    icon: CreditCard,
    color: "text-amber-600",
    bgColor: "bg-amber-50"
  },
  { 
    title: "整体毛利率", 
    value: "18.2%", 
    unit: "%",
    yoy: "+0.5pct", 
    qoq: "+0.1pct", 
    isPositive: true,
    icon: Percent,
    color: "text-violet-600",
    bgColor: "bg-violet-50"
  },
  { 
    title: "净利润额", 
    value: "97.5", 
    unit: "亿",
    yoy: "+36.0%", 
    qoq: "+5.2%", 
    isPositive: true,
    icon: TrendingUp,
    color: "text-rose-600",
    bgColor: "bg-rose-50"
  },
  { 
    title: "活跃 SKU 总数", 
    value: "248", 
    unit: "个",
    yoy: "+5", 
    qoq: "+2", 
    isPositive: true,
    icon: Box,
    color: "text-slate-600",
    bgColor: "bg-slate-50"
  },
  { 
    title: "目标完成率", 
    value: "97.0%", 
    unit: "%",
    yoy: "-0.5pct", 
    qoq: "+1.2pct", 
    isPositive: false,
    icon: Target,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    isCompletion: true,
    completion: 97
  },
];

const performanceTrends = [
  { month: "24-10", shipment: 1.45, rev: 92, aur: 6340, margin: 17.8 },
  { month: "24-11", shipment: 1.58, rev: 101, aur: 6390, margin: 17.9 },
  { month: "24-12", shipment: 1.82, rev: 115, aur: 6320, margin: 18.1 },
  { month: "25-01", shipment: 1.52, rev: 95, aur: 6250, margin: 18.2 },
  { month: "25-02", shipment: 1.48, rev: 92, aur: 6215, margin: 18.0 },
  { month: "25-03", shipment: 1.65, rev: 103, aur: 6245, margin: 18.1 },
  { month: "25-04", shipment: 1.62, rev: 102, aur: 6300, margin: 18.3 },
  { month: "25-05", shipment: 1.70, rev: 108, aur: 6350, margin: 18.4 },
  { month: "25-06", shipment: 1.95, rev: 122, aur: 6255, margin: 18.2 },
  { month: "25-07", shipment: 1.68, rev: 104, aur: 6190, margin: 18.0 },
  { month: "25-08", shipment: 1.75, rev: 110, aur: 6285, margin: 18.1 },
  { month: "25-09", shipment: 1.94, rev: 121.9, aur: 6286, margin: 18.2 },
];

const costData = [
  { name: "核心组件", value: 72, color: "#ef4444" },
  { name: "组装制造", value: 10, color: "#3b82f6" },
  { name: "营销费用", value: 8, color: "#10b981" },
  { name: "研发投入", value: 7, color: "#f59e0b" },
  { name: "物流仓储", value: 3, color: "#6366f1" },
];

const profitFunnelData = [
  { value: 121.9, name: "营收 (REV)", fill: "#1e293b" },
  { value: 99.7, name: "主营成本 (COGS)", fill: "#475569" },
  { value: 22.2, name: "毛利 (GP)", fill: "#dc2626" },
  { value: 12.5, name: "期间费用 (Exp)", fill: "#f87171" },
  { value: 9.75, name: "净利润 (NP)", fill: "#ef4444" },
];

const channelComparison = [
  { channel: "线上直营 / 电商", value: 8.7, rev: 54.8, aur: 6300, margin: 19.5, yoy: "+14%", conv: "4.2%" },
  { channel: "线下零售 / 代理", value: 10.7, rev: 67.1, aur: 6270, margin: 17.1, yoy: "+7%", conv: "12.5%" },
];

const channelDetailed = [
  { name: "京东自营", value: 35, color: "#ef4444" },
  { name: "联想官网", value: 5, color: "#1e293b" },
  { name: "天猫旗舰店", value: 12, color: "#ff0036" },
  { name: "线下体验店", value: 28, color: "#3b82f6" },
  { name: "大客户集采", value: 20, color: "#6366f1" },
];

const topProducts = [
  { name: "ThinkPad X1 Carbon Gen 12", series: "ThinkPad", sales: "852K", growth: "+12%", price: "¥9,999" },
  { name: "拯救者 Y9000P 2025", series: "LEGION", sales: "642K", growth: "+45%", price: "¥8,999" },
  { name: "小新 Pro 16 AI版", series: "小新", sales: "520K", growth: "+22%", price: "¥5,499" },
  { name: "ThinkBook 14p Gen 5", series: "THINKBOOK", sales: "428K", growth: "+18%", price: "¥5,299" },
  { name: "YOGA Book 9i", series: "YOGA", sales: "156K", growth: "+35%", price: "¥16,999" },
];

// --- Components ---

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
           <div className="flex justify-between text-xs"><span className="text-slate-500">出货量:</span><span className="font-bold text-slate-900">{data.value}M</span></div>
           <div className="flex justify-between text-xs"><span className="text-slate-500">营收 (REV):</span><span className="font-bold text-slate-900">¥{data.rev}亿</span></div>
           <div className="flex justify-between text-xs"><span className="text-slate-500">平均单价 (AUR):</span><span className="font-bold text-slate-900">¥{data.aur}</span></div>
           <div className="flex justify-between text-xs"><span className="text-slate-500">毛利率:</span><span className="font-bold text-emerald-600">{data.margin}%</span></div>
           <div className="flex justify-between text-xs"><span className="text-slate-500">同比增速:</span><span className="font-bold text-blue-600">{data.yoy}</span></div>
           <div className="flex justify-between text-xs"><span className="text-slate-500">转化率:</span><span className="font-bold text-amber-600">{data.conv}</span></div>
        </div>
      </div>
    );
  }
  return null;
};

export function ProductDataView() {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">产品经营分析</h2>
          <p className="text-slate-500 mt-1.5 flex items-center gap-2">
            <Filter className="h-4 w-4" />
            联想PC业务全周期运营指标追踪
          </p>
        </motion.div>
        
        <div className="flex items-center gap-3">
          <Select defaultValue="2025-09">
            <SelectTrigger className="w-[160px] h-10 border-slate-200 bg-white">
              <SelectValue placeholder="选择月份" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025-09">2025年9月</SelectItem>
              <SelectItem value="2025-08">2025年8月</SelectItem>
              <SelectItem value="2025-07">2025年7月</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Panoramic Operational KPI Cards */}
      <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar">
         {kpiData.map((kpi, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="min-w-[240px] flex-shrink-0"
            >
               <Card className="shadow-sm border-slate-100 hover:shadow-md transition-all">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{kpi.title}</p>
                     <div className={`p-2 rounded-lg ${kpi.bgColor} ${kpi.color}`}>
                        <kpi.icon className="h-4 w-4" />
                     </div>
                  </CardHeader>
                  <CardContent>
                     <div className="flex items-baseline gap-1">
                        <h3 className="text-2xl font-black text-slate-900">{kpi.value}</h3>
                        <span className="text-xs text-slate-400 font-medium">{kpi.unit}</span>
                     </div>
                     <div className="mt-3 flex items-center gap-2">
                        <div className={`flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                           kpi.yoy.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                        }`}>
                           {kpi.yoy.startsWith('+') ? <ArrowUp className="h-2 w-2" /> : <ArrowDown className="h-2 w-2" />}
                           YoY {kpi.yoy}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 flex items-center gap-0.5">
                           {kpi.qoq.startsWith('+') ? <ArrowUp className="h-2 w-2" /> : <ArrowDown className="h-2 w-2" />}
                           {kpi.qoq}
                        </div>
                     </div>
                     { (kpi.target || kpi.isCompletion) && (
                        <div className="mt-4 space-y-1.5">
                           <div className="flex justify-between text-[10px] font-bold">
                              <span className="text-slate-400">完成率</span>
                              <span className={kpi.isPositive ? "text-slate-600" : "text-rose-600"}>
                                 {kpi.isCompletion ? kpi.value : `${((kpi.current! / kpi.target!) * 100).toFixed(1)}%`}
                              </span>
                           </div>
                           <Progress 
                              value={kpi.isCompletion ? kpi.completion : (kpi.current! / kpi.target!) * 100} 
                              className={`h-1 ${kpi.completion && kpi.completion < 100 && !kpi.isPositive ? "bg-rose-100" : "bg-slate-100"}`}
                              indicatorClassName={kpi.isCompletion && kpi.completion! < 100 && !kpi.isPositive ? "bg-rose-500" : "bg-slate-900"}
                           />
                        </div>
                     )}
                  </CardContent>
               </Card>
            </motion.div>
         ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
         {/* Shipping Volume & Revenue Trends (4 Sub-charts) */}
         <Card className="lg:col-span-2 shadow-sm border-slate-100">
            <CardHeader className="pb-4">
               <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold">经营指标趋势</CardTitle>
                    <CardDescription>各产品线近 12 个月多维度走势</CardDescription>
                  </div>
                  <Select defaultValue="pc-total">
                    <SelectTrigger className="w-[120px] h-8 text-xs border-slate-200">
                      <SelectValue placeholder="产品线" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pc-total">全PC业务线</SelectItem>
                      <SelectItem value="thinkpad">ThinkPad</SelectItem>
                      <SelectItem value="legion">拯救者</SelectItem>
                      <SelectItem value="xiaoxin">小新</SelectItem>
                    </SelectContent>
                  </Select>
               </div>
            </CardHeader>
            <CardContent>
               <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: "出货量 (百万台)", dataKey: "shipment", color: "#1e293b", unit: "M" },
                    { title: "总营收 REV (亿)", dataKey: "rev", color: "#10b981", unit: "B" },
                    { title: "平均单价 AUR (元)", dataKey: "aur", color: "#f59e0b", unit: "" },
                    { title: "整体毛利率 (%)", dataKey: "margin", color: "#dc2626", unit: "%" },
                  ].map((chart, idx) => (
                    <div key={idx} className="h-[180px] border border-slate-50 p-2 rounded-lg bg-slate-50/30">
                       <h4 className="text-[10px] font-bold text-slate-500 mb-2 uppercase">{chart.title}</h4>
                       <ResponsiveContainer width="100%" height="85%">
                          <LineChart data={performanceTrends}>
                             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                             <XAxis dataKey="month" hide />
                             <YAxis hide domain={['auto', 'auto']} />
                             <Tooltip content={<CustomTooltip />} />
                             <Line 
                                type="monotone" 
                                dataKey={chart.dataKey} 
                                stroke={chart.color} 
                                strokeWidth={2.5} 
                                dot={false}
                                activeDot={{ r: 4, strokeWidth: 0 }}
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
               <CardTitle className="text-lg font-bold">热销产品榜</CardTitle>
               <CardDescription>当前周期销量 Top 5 型号</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               {topProducts.map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-slate-100 hover:bg-slate-50 transition-all group">
                     <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white text-xs font-black">
                           #{idx + 1}
                        </div>
                        <div>
                           <div className="text-xs font-bold text-slate-900 group-hover:text-red-600 transition-colors">{p.name}</div>
                           <Badge variant="secondary" className="mt-1 text-[9px] font-bold tracking-tight py-0 px-1.5 h-4 bg-slate-100 text-slate-500 border-none">
                              {p.series}
                           </Badge>
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="text-xs font-black text-slate-900">{p.sales}</div>
                        <div className="text-[10px] font-bold text-emerald-600">{p.growth}</div>
                     </div>
                  </div>
               ))}
            </CardContent>
         </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
         {/* Cost Analysis Pie Chart */}
         <Card className="shadow-sm border-slate-100">
            <CardHeader className="flex flex-row items-center justify-between py-4">
               <div>
                  <CardTitle className="text-lg font-bold">成本构成解析</CardTitle>
                  <CardDescription>PC消费电子结构化成本分布</CardDescription>
               </div>
               <Select defaultValue="all">
                  <SelectTrigger className="w-[110px] h-8 text-xs border-slate-200">
                     <SelectValue placeholder="产品线" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="all">全系列</SelectItem>
                     <SelectItem value="pro">Pro 系列</SelectItem>
                  </SelectContent>
               </Select>
            </CardHeader>
            <CardContent className="flex items-center justify-center py-6">
               <div className="h-[280px] w-full relative">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                           data={costData}
                           cx="50%" cy="50%"
                           innerRadius={70}
                           outerRadius={100}
                           paddingAngle={4}
                           dataKey="value"
                        >
                           {costData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                           ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" wrapperStyle={{ fontSize: '11px', paddingLeft: '20px' }} />
                     </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ left: '-50px' }}>
                     <div className="text-center">
                        <div className="text-[10px] text-slate-400 font-bold uppercase">合计成本</div>
                        <div className="text-xl font-black text-slate-900">100%</div>
                     </div>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Profit Funnel Chart */}
         <Card className="shadow-sm border-slate-100">
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <div>
                <CardTitle className="text-lg font-bold">利润表现纵览</CardTitle>
                <CardDescription>从营收至净利润的各级转化模型</CardDescription>
              </div>
              <Select defaultValue="all">
                  <SelectTrigger className="w-[110px] h-8 text-xs border-slate-200">
                     <SelectValue placeholder="产品线" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="all">全系列</SelectItem>
                     <SelectItem value="commercial">商用</SelectItem>
                  </SelectContent>
               </Select>
            </CardHeader>
            <CardContent className="py-2">
               <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <FunnelChart>
                        <Tooltip content={<CustomTooltip />} />
                        <Funnel
                           data={profitFunnelData}
                           dataKey="value"
                           labelKey="name"
                           isAnimationActive
                        >
                           <LabelList position="right" fill="#64748b" content={(props: any) => {
                              const { x, y, value, name } = props;
                              return (
                                 <text x={x + 10} y={y + 20} fill="#64748b" fontSize={10} fontWeight={700}>
                                    {name}: ¥{value}亿
                                 </text>
                              );
                           }} />
                        </Funnel>
                     </FunnelChart>
                  </ResponsiveContainer>
               </div>
               <div className="mt-2 flex justify-between px-6">
                  <div className="text-center">
                     <div className="text-[10px] text-slate-400 font-bold">整体毛利率</div>
                     <div className="text-sm font-black text-slate-900">18.2%</div>
                  </div>
                  <div className="text-center border-l border-slate-100 pl-8">
                     <div className="text-[10px] text-slate-400 font-bold">期间费用率</div>
                     <div className="text-sm font-black text-slate-900">10.2%</div>
                  </div>
                  <div className="text-center border-l border-slate-100 pl-8">
                     <div className="text-[10px] text-slate-400 font-bold">最终净利率</div>
                     <div className="text-sm font-black text-rose-600">8.0%</div>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>

      {/* Channel Section */}
      <Card className="shadow-sm border-slate-100">
         <CardHeader className="pb-0 border-b border-slate-50">
            <div className="flex items-center justify-between mb-2">
               <div>
                  <CardTitle className="text-lg font-bold">全渠道经营透视</CardTitle>
                  <CardDescription>线上线下渗透率与运营效益对比</CardDescription>
               </div>
            </div>
            <Tabs defaultValue="overview" className="w-full">
               <TabsList className="bg-transparent h-12 gap-6 p-0">
                  <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-slate-900 data-[state=active]:bg-transparent px-2 h-full text-slate-500 data-[state=active]:text-slate-900 font-bold">概览对比</TabsTrigger>
                  <TabsTrigger value="online" className="rounded-none border-b-2 border-transparent data-[state=active]:border-slate-900 data-[state=active]:bg-transparent px-2 h-full text-slate-500 data-[state=active]:text-slate-900 font-bold">线上直营</TabsTrigger>
                  <TabsTrigger value="offline" className="rounded-none border-b-2 border-transparent data-[state=active]:border-slate-900 data-[state=active]:bg-transparent px-2 h-full text-slate-500 data-[state=active]:text-slate-900 font-bold">线下渠道</TabsTrigger>
               </TabsList>

               <TabsContent value="overview" className="py-6 space-y-8">
                  <div className="grid md:grid-cols-12 gap-8">
                     {/* Horizontal Bar Chart */}
                     <div className="md:col-span-7">
                        <h4 className="text-xs font-black text-slate-500 mb-6 flex items-center gap-2">
                           <TrendingUp className="h-4 w-4" /> 出货量分布对比 (百万台)
                        </h4>
                        <div className="h-[200px]">
                           <ResponsiveContainer width="100%" height="100%">
                              <BarChart layout="vertical" data={channelComparison} margin={{ left: 40, right: 40 }}>
                                 <XAxis type="number" hide />
                                 <YAxis dataKey="channel" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 700, fill: '#1e293b' }} width={100} />
                                 <Tooltip content={<ChannelTooltip />} cursor={{ fill: '#f8fafc' }} />
                                 <Bar dataKey="value" fill="#1e293b" radius={[0, 4, 4, 0]} barSize={40}>
                                    <LabelList dataKey="value" position="right" fontSize={12} fontWeight={800} fill="#1e293b" formatter={(v: any) => `${v}M`} />
                                 </Bar>
                              </BarChart>
                           </ResponsiveContainer>
                        </div>
                     </div>

                     {/* Pie Chart Detailed Distribution */}
                     <div className="md:col-span-5 border-l border-slate-100 pl-8">
                        <h4 className="text-xs font-black text-slate-500 mb-6 flex items-center gap-2">
                           <ShoppingBag className="h-4 w-4" /> 细分渠道权重分布
                        </h4>
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                               <PieChart>
                                  <Pie
                                     data={channelDetailed}
                                     cx="50%" cy="50%"
                                     innerRadius={50}
                                     outerRadius={75}
                                     paddingAngle={2}
                                     dataKey="value"
                                  >
                                     {channelDetailed.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                     ))}
                                  </Pie>
                                  <Tooltip />
                               </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
                           {channelDetailed.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                 <span className="text-[10px] font-bold text-slate-600">{item.name}</span>
                                 <span className="text-[10px] font-black text-slate-900">{item.value}%</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  {/* Summary Cards for Channels */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {[
                        { label: "线上 AUR", value: "¥6,300", yoy: "+4.2%", icon: ShoppingBag, color: "text-blue-600" },
                        { label: "线下 AUR", value: "¥6,270", yoy: "-2.5%", icon: Store, color: "text-amber-600" },
                        { label: "线上毛利", value: "19.5%", yoy: "+1.2pct", icon: Percent, color: "text-emerald-600" },
                        { label: "线下毛利", value: "17.1%", yoy: "-0.5pct", icon: Percent, color: "text-rose-600" },
                     ].map((item, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 group hover:shadow-lg transition-all cursor-default">
                           <div className="flex items-center justify-between mb-2">
                              <item.icon className={`h-4 w-4 ${item.color}`} />
                              <ChevronRight className="h-3 w-3 text-slate-200 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
                           </div>
                           <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">{item.label}</div>
                           <div className="text-lg font-black text-slate-900">{item.value}</div>
                           <div className={`text-[10px] font-bold ${item.yoy.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'} mt-1`}>{item.yoy} YoY</div>
                        </div>
                     ))}
                  </div>
               </TabsContent>
               <TabsContent value="online" className="py-6">
                  <div className="h-40 flex items-center justify-center text-slate-400 text-sm font-medium">线上专场详情加载中...</div>
               </TabsContent>
               <TabsContent value="offline" className="py-6">
                  <div className="h-40 flex items-center justify-center text-slate-400 text-sm font-medium">线下专场详情加载中...</div>
               </TabsContent>
            </Tabs>
         </CardHeader>
      </Card>
    </div>
  );
}
