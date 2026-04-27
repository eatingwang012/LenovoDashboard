import { 
  TrendingUp, 
  Globe
} from "lucide-react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "./ui/select";

const globalTrendData = [
  { period: "2024 Q1", lenovo: 14.8, hp: 12.8, dell: 10.1, apple: 5.5, others: 16.6 },
  { period: "2024 Q2", lenovo: 16.1, hp: 13.5, dell: 10.4, apple: 5.9, others: 19.0 },
  { period: "2024 Q3", lenovo: 17.5, hp: 14.0, dell: 10.6, apple: 6.3, others: 22.2 },
  { period: "2024 Q4", lenovo: 18.6, hp: 14.2, dell: 11.0, apple: 6.2, others: 24.9 },
  { period: "2025 Q1", lenovo: 16.2, hp: 14.4, dell: 10.9, apple: 6.6, others: 17.7 },
  { period: "2025 Q2", lenovo: 17.1, hp: 14.9, dell: 11.2, apple: 7.0, others: 19.0 },
  { period: "2025 Q3", lenovo: 19.4, hp: 15.3, dell: 11.7, apple: 7.3, others: 22.2 },
];

const regionalShippingData = [
  { region: "中国", total: 12.5, lenovo: 4.8, hp: 1.2, dell: 0.8, apple: 1.5, others: 4.2 },
  { region: "北美", total: 15.8, lenovo: 2.8, hp: 3.5, dell: 3.2, apple: 2.4, others: 3.9 },
  { region: "EMEA", total: 18.2, lenovo: 3.8, hp: 3.2, dell: 2.9, apple: 1.8, others: 6.5 },
  { region: "亚太(不含中)", total: 14.1, lenovo: 2.2, hp: 2.1, dell: 1.9, apple: 1.1, others: 6.8 },
  { region: "拉美", total: 6.5, lenovo: 0.8, hp: 0.9, dell: 1.0, apple: 0.3, others: 3.5 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-slate-200 p-2 rounded shadow-lg">
        <p className="font-bold text-[11px] text-slate-800 mb-1.5 border-b pb-1">{label}</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
                <span className="text-[10px] text-slate-500 font-medium">{entry.name}:</span>
              </div>
              <span className="text-[10px] text-slate-900 font-bold">{entry.value}M</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export function CompetitorsView() {
  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">竞品分析</h2>
          <p className="text-slate-500 mt-1 flex items-center gap-1.5">
            <Globe className="h-4 w-4" />
            各厂商出货走势与区域竞争位次
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select defaultValue="2025-q3">
            <SelectTrigger className="w-[120px] h-9 border-slate-200 bg-white">
              <SelectValue placeholder="周期" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025-q3">2025 Q3</SelectItem>
              <SelectItem value="2025-q2">2025 Q2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      <div className="grid gap-6">
        {/* Summary Metric */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-none shadow-sm ring-1 ring-slate-200">
            <CardHeader className="pb-2 text-slate-900">
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                2025 Q3 全球总出货
              </CardDescription>
              <CardTitle className="text-2xl font-black">75.9M</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1 text-emerald-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-bold">+2.4% 同比</span>
              </div>
            </CardContent>
          </Card>
          
          {[
            { name: "惠普", vol: 15.3, rank: 2 },
            { name: "戴尔", vol: 11.7, rank: 3 },
            { name: "苹果", vol: 7.3, rank: 4 }
          ].map((item) => (
             <Card key={item.name} className="border-none shadow-sm ring-1 ring-slate-200">
               <CardHeader className="pb-2">
                 <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                   {item.name} 出货量 (Q3)
                 </CardDescription>
                 <CardTitle className="text-lg font-bold text-slate-900">{item.vol}M</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="flex items-center gap-1 text-slate-500">
                   <TrendingUp className="h-3 w-3" />
                   <span className="text-xs font-medium">排名全球 {item.rank}</span>
                 </div>
               </CardContent>
             </Card>
          ))}
        </div>

        {/* Global Shipping Trends */}
        <Card className="border-none shadow-sm ring-1 ring-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">全球出货趋势</CardTitle>
            <CardDescription>2024-2025 季度各厂商出货量对比 (百万台)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[360px] mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={globalTrendData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorlenovo" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#dc2626" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorhp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colordell" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} unit="M" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '15px' }} />
                  <Area type="monotone" dataKey="lenovo" name="联想" stackId="1" stroke="#dc2626" fill="url(#colorlenovo)" strokeWidth={2} />
                  <Area type="monotone" dataKey="hp" name="惠普" stackId="1" stroke="#8b5cf6" fill="url(#colorhp)" strokeWidth={2} />
                  <Area type="monotone" dataKey="dell" name="戴尔" stackId="1" stroke="#3b82f6" fill="url(#colordell)" strokeWidth={2} />
                  <Area type="monotone" dataKey="apple" name="苹果" stackId="1" stroke="#1f2937" fill="#1f2937" fillOpacity={0.05} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Regional Shipping & Competitor Detail */}
        <Card className="border-none shadow-sm ring-1 ring-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold">地区出货分布与品牌表现</CardTitle>
            <CardDescription>核心市场中主要厂商的出货情况 (百万台)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-12 items-start">
              <div className="md:col-span-8 h-[340px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regionalShippingData} margin={{ left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="region" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="rect" wrapperStyle={{ fontSize: '10px' }} />
                    <Bar dataKey="lenovo" name="联想" fill="#dc2626" radius={[2, 2, 0, 0]} barSize={12} />
                    <Bar dataKey="hp" name="惠普" fill="#8b5cf6" radius={[2, 2, 0, 0]} barSize={12} />
                    <Bar dataKey="dell" name="戴尔" fill="#3b82f6" radius={[2, 2, 0, 0]} barSize={12} />
                    <Bar dataKey="apple" name="苹果" fill="#1f2937" radius={[2, 2, 0, 0]} barSize={12} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="md:col-span-4 space-y-3">
                {regionalShippingData.slice(0, 4).map((item) => (
                  <div key={item.region} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.region}表现</span>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-[9px] h-4 border-none">
                         {item.region === "中国" ? "绝对优势" : "竞争格局均衡"}
                      </Badge>
                    </div>
                    <div className="space-y-1.5">
                       <div className="flex items-center justify-between">
                          <span className="text-[11px] text-slate-500">联想出货</span>
                          <span className="text-xs font-bold text-slate-900">{item.lenovo}M</span>
                       </div>
                       <div className="flex items-center justify-between">
                          <span className="text-[11px] text-slate-500">最大竞品</span>
                          <span className="text-xs font-bold text-slate-700">{item.region === "北美" ? "惠普" : "惠普"}</span>
                       </div>
                    </div>
                  </div>
                ))}
                <div className="p-3 rounded-xl bg-slate-900 text-white mt-1">
                   <p className="text-[10px] leading-relaxed text-slate-400">
                      联想在中国区继续领跑；在北美及EMEA市场，与惠普、戴尔保持胶着竞争姿态。
                   </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
