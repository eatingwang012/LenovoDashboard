import * as React from "react";
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
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { 
  Globe, 
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "./ui/select";
import { motion } from "motion/react";

// --- Mock Data ---

const globalMarketShare = [
  { name: "联想 (Lenovo)", value: 25.5, color: "#e11d48", yoy: "+0.5pct", qoq: "+0.3pct" },
  { name: "惠普 (HP)", value: 18.3, color: "#8b5cf6", yoy: "-0.2pct", qoq: "-0.1pct" },
  { name: "戴尔 (Dell)", value: 15.7, color: "#3b82f6", yoy: "-0.4pct", qoq: "-0.2pct" },
  { name: "苹果 (Apple)", value: 9.2, color: "#6b7280", yoy: "+0.3pct", qoq: "+0.1pct" },
  { name: "华硕 (ASUS)", value: 8.0, color: "#0ea5e9", yoy: "+0.1pct", qoq: "+0.0pct" },
  { name: "其他 (Others)", value: 23.3, color: "#d1d5db", yoy: "-0.3pct", qoq: "-0.1pct" },
];

const brandTrends = [
  { month: "2024-10", lenovo: 23.1, hp: 19.5, dell: 16.5, apple: 8.5 },
  { month: "2024-11", lenovo: 23.4, hp: 19.2, dell: 16.3, apple: 8.7 },
  { month: "2024-12", lenovo: 23.8, hp: 19.0, dell: 16.0, apple: 8.9 },
  { month: "2025-01", lenovo: 24.2, hp: 18.8, dell: 15.8, apple: 9.0 },
  { month: "2025-02", lenovo: 24.5, hp: 18.7, dell: 15.6, apple: 9.1 },
  { month: "2025-03", lenovo: 24.8, hp: 18.5, dell: 15.6, apple: 9.2 },
  { month: "2025-04", lenovo: 25.0, hp: 18.4, dell: 15.5, apple: 9.3 },
  { month: "2025-05", lenovo: 25.1, hp: 18.4, dell: 15.7, apple: 9.2 },
  { month: "2025-06", lenovo: 25.2, hp: 18.4, dell: 15.8, apple: 9.1 },
  { month: "2025-07", lenovo: 25.3, hp: 18.3, dell: 15.7, apple: 9.2 },
  { month: "2025-08", lenovo: 25.4, hp: 18.2, dell: 15.8, apple: 9.2 },
  { month: "2025-09", lenovo: 25.5, hp: 18.3, dell: 15.7, apple: 9.2 },
];

const regionalShare = [
  { region: "中国", share: 38.2, change: "+0.4", growth: 5.2 },
  { region: "欧洲", share: 25.6, change: "+0.7", growth: 3.1 },
  { region: "北美", share: 19.5, change: "+0.2", growth: 2.8 },
  { region: "亚太(其他)", share: 21.3, change: "+0.5", growth: 4.5 },
  { region: "拉美", share: 18.3, change: "+1.2", growth: 6.8 },
  { region: "中东/非洲", share: 17.8, change: "+0.8", growth: 3.5 },
];

const priceBandData = [
  { band: "入门 (<$500)", lenovo: 22.5, competitors: 19.8, change: "+0.5" },
  { band: "主流 ($500-$850)", lenovo: 26.8, competitors: 21.2, change: "+0.6" },
  { band: "高端 ($850-$1400)", lenovo: 18.4, competitors: 24.5, change: "+1.2" },
  { band: "旗舰 (>$1400)", lenovo: 12.5, competitors: 28.3, change: "+1.8" },
];

// --- Sub-components ---

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-slate-200 p-3 rounded-lg shadow-xl animate-in fade-in zoom-in duration-200">
        <p className="font-semibold text-sm mb-2 text-slate-800">{label}</p>
        <div className="space-y-1.5">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-xs text-slate-600 font-medium">{entry.name}</span>
              </div>
              <span className="text-xs font-bold text-slate-900">{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export function MarketShareView() {
  const [selectedBrand, setSelectedBrand] = React.useState("all");

  return (
    <div className="space-y-8 pb-12">
      {/* Header with Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">市占率分析</h2>
          <p className="text-slate-500 mt-1.5 flex items-center gap-2">
            <Globe className="h-4 w-4" />
            全球市场地位与增长动能
          </p>
        </motion.div>
        
        <div className="flex items-center gap-3">
          <Select defaultValue="2025-q3">
            <SelectTrigger className="w-[140px] h-10 border-slate-200 bg-white">
              <SelectValue placeholder="周期" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025-q3">2025 Q3</SelectItem>
              <SelectItem value="2025-q2">2025 Q2</SelectItem>
              <SelectItem value="2025-q1">2025 Q1</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Global Structure Donut */}
        <Card className="lg:col-span-1 shadow-sm border-slate-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">全球份额结构</CardTitle>
            <CardDescription>2025 Q3 厂商占比 (含变动详情)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={globalMarketShare}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {globalMarketShare.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white/95 backdrop-blur-sm border border-slate-200 p-3 rounded-lg shadow-xl animate-in fade-in zoom-in duration-200">
                            <p className="font-bold text-sm mb-2 text-slate-800">{data.name}</p>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between gap-4">
                                <span className="text-slate-500">市场份额:</span>
                                <span className="font-bold text-slate-900">{data.value}%</span>
                              </div>
                              <div className="flex justify-between gap-4">
                                <span className="text-slate-500">同比变动:</span>
                                <span className={`font-bold ${data.yoy.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{data.yoy}</span>
                              </div>
                              <div className="flex justify-between gap-4">
                                <span className="text-slate-500">环比变动:</span>
                                <span className="font-bold text-slate-700">{data.qoq}</span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {globalMarketShare.slice(0, 5).map((item) => (
                <div key={item.name} className="flex items-center justify-between p-2 rounded hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-slate-700 font-bold">{item.name.split(' ')[0]}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-900">{item.value}%</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      item.yoy.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      {item.yoy}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Brand Trend Line Chart */}
        <Card className="lg:col-span-2 shadow-sm border-slate-100">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold">品牌份额趋势</CardTitle>
                <CardDescription>月度市占率波动 (重点跟踪联想)</CardDescription>
              </div>
              <Select defaultValue="all" onValueChange={setSelectedBrand}>
                <SelectTrigger className="w-[120px] h-8 text-xs border-slate-200 shadow-none">
                  <SelectValue placeholder="筛选品牌" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有厂商</SelectItem>
                  <SelectItem value="lenovo">联想</SelectItem>
                  <SelectItem value="hp">惠普</SelectItem>
                  <SelectItem value="dell">戴尔</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[340px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={brandTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8' }}
                    domain={[0, 30]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '20px' }} />
                  {(selectedBrand === "all" || selectedBrand === "lenovo") && (
                    <Line 
                      type="monotone" 
                      dataKey="lenovo" 
                      name="联想 (Lenovo)" 
                      stroke="#e11d48" 
                      strokeWidth={4} 
                      dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                    />
                  )}
                  {(selectedBrand === "all" || selectedBrand === "hp") && (
                    <Line 
                      type="monotone" 
                      dataKey="hp" 
                      name="惠普 (HP)" 
                      stroke="#8b5cf6" 
                      strokeWidth={2} 
                      strokeDasharray="5 5"
                      dot={false}
                    />
                  )}
                  {selectedBrand === "all" && (
                     <Line 
                        type="monotone" 
                        dataKey="dell" 
                        name="戴尔 (Dell)" 
                        stroke="#3b82f6" 
                        strokeWidth={2} 
                        strokeDasharray="5 5"
                        dot={false}
                     />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Segment & Price Band */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Customer Segment (Migrated from Competitors) */}
        <Card className="shadow-sm border-slate-100">
           <CardHeader>
              <CardTitle className="text-lg font-bold">客户群市占率</CardTitle>
              <CardDescription>ToB 商业 vs ToC 消费市场渗透</CardDescription>
           </CardHeader>
           <CardContent className="space-y-6">
              {[
                { name: "ToB 商业办公", lenovo: 32.5, yoy: "+1.2pct", others: 67.5 },
                { name: "ToC 个人消费", lenovo: 22.8, yoy: "+0.8pct", others: 77.2 }
              ].map((seg, idx) => (
                <div key={idx} className="space-y-3">
                   <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-700">{seg.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">同比</span>
                        <span className="text-xs font-bold text-emerald-600">{seg.yoy}</span>
                      </div>
                   </div>
                   <div className="h-6 w-full bg-slate-100 rounded-lg overflow-hidden flex">
                      <div 
                        className={`h-full flex items-center px-2 text-[10px] font-bold text-white ${idx === 0 ? 'bg-blue-600' : 'bg-red-600'}`} 
                        style={{ width: `${seg.lenovo}%` }}
                      >
                         联想 {seg.lenovo}%
                      </div>
                      <div className="h-full bg-slate-200" style={{ width: `${seg.others}%` }} />
                   </div>
                </div>
              ))}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                 <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">细分领域领先</h4>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <div className="text-[10px] text-slate-400">大型企业 (Global 500)</div>
                       <div className="text-lg font-extrabold text-slate-900">42.5%</div>
                    </div>
                    <div>
                       <div className="text-[10px] text-slate-400">游戏电竞 (Legion)</div>
                       <div className="text-lg font-extrabold text-slate-900">28.4%</div>
                    </div>
                 </div>
              </div>
           </CardContent>
        </Card>

        {/* Price Band Market Share */}
        <Card className="shadow-sm border-slate-100">
          <CardHeader>
             <CardTitle className="text-lg font-bold">价格带竞争力</CardTitle>
             <CardDescription>各价位段联想与核心竞品份额对比</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={priceBandData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                     <XAxis 
                        dataKey="band" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fill: '#64748b' }} 
                     />
                     <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                     <Tooltip cursor={{ fill: '#f8fafc' }} content={<CustomTooltip />} />
                     <Bar dataKey="lenovo" name="联想" fill="#e11d48" radius={[4, 4, 0, 0]} barSize={20} />
                     <Bar dataKey="competitors" name="核心竞品" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={20} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 rounded-xl bg-slate-900 text-white">
                <p className="text-xs leading-relaxed text-slate-300">
                   高端及旗舰价位段（$850+）份额显著提升，主要受 AI PC 核心技术溢价拉动。
                </p>
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Share & Change */}
      <Card className="shadow-sm border-slate-100">
        <CardHeader>
          <CardTitle className="text-lg font-bold">区域市占详情</CardTitle>
          <CardDescription>区域覆盖率与年度增幅</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {regionalShare.map((item) => (
                <div key={item.region} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50">
                   <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">{item.region}</div>
                   <div className="text-xl font-black text-slate-900">{item.share}%</div>
                   <div className="text-[10px] font-bold text-emerald-500 mt-1">+{item.change}pct</div>
                </div>
              ))}
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
