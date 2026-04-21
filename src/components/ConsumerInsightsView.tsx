import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  FunnelChart,
  Funnel,
  LabelList,
} from "recharts";
import { Search, Users, ShoppingCart, Activity, ExternalLink, TrendingUp } from "lucide-react";
import { motion } from 'motion/react';

// Filter states
const products = ["All Products", "ThinkBook", "IdeaPad", "Legion", "ThinkPad", "Yoga"];
const regions = ["All Regions", "East China", "South China", "North China", "Central China", "Southwest", "Northeast", "Northwest"];

// TOC Data - Consumer Structure
const ageDistribution = [
  { age: "18-24", male: 1250, female: 980 },
  { age: "25-34", male: 2850, female: 2420 },
  { age: "35-44", male: 1980, female: 1650 },
  { age: "45-54", male: 850, female: 720 },
  { age: "55+", male: 420, female: 380 },
];

const occupationData = [
  { name: "Students", value: 2850, percentage: 28.5 },
  { name: "Office Workers", value: 3420, percentage: 34.2 },
  { name: "Freelancers", value: 1280, percentage: 12.8 },
  { name: "Entrepreneurs", value: 980, percentage: 9.8 },
  { name: "Creatives", value: 850, percentage: 8.5 },
  { name: "Others", value: 620, percentage: 6.2 },
];

// Usage Scenarios by Segment (Radar Data)
const usageRadarData = [
  { 
    subject: "Office & Productivity",
    "Overall": 75,
    "High Value Customers": 90,
    "Growth Potential": 65,
    "Loyal Customers": 85,
    "At Risk": 50
  },
  { 
    subject: "Gaming & Esports",
    "Overall": 60,
    "High Value Customers": 85,
    "Growth Potential": 80,
    "Loyal Customers": 40,
    "At Risk": 30
  },
  { 
    subject: "Content Creation",
    "Overall": 50,
    "High Value Customers": 80,
    "Growth Potential": 45,
    "Loyal Customers": 55,
    "At Risk": 20
  },
  { 
    subject: "Study & Learning",
    "Overall": 65,
    "High Value Customers": 40,
    "Growth Potential": 90,
    "Loyal Customers": 60,
    "At Risk": 55
  },
  { 
    subject: "Entertainment",
    "Overall": 70,
    "High Value Customers": 50,
    "Growth Potential": 70,
    "Loyal Customers": 80,
    "At Risk": 90
  }
];

// User Segmentation (RFM Model)
const userSegments = [
  { 
    segment: "High Value Customers",
    count: 1850,
    percentage: 18.5,
    avgSpend: "$3,250",
    frequency: "4.2 times",
    recency: "< 3 months",
    color: "#dc2626", // red-600
    description: "Frequent buyers with high spending"
  },
  { 
    segment: "Growth Potential",
    count: 2420,
    percentage: 24.2,
    avgSpend: "$1,850",
    frequency: "2.1 times",
    recency: "3-6 months",
    color: "#3b82f6", // blue-500
    description: "Recent buyers, potential for growth"
  },
  { 
    segment: "Loyal Customers",
    count: 3280,
    percentage: 32.8,
    avgSpend: "$1,420",
    frequency: "3.5 times",
    recency: "6-12 months",
    color: "#10b981", // emerald-500
    description: "Stable repeat customers"
  },
  { 
    segment: "At Risk",
    count: 2450,
    percentage: 24.5,
    avgSpend: "$980",
    frequency: "1.2 times",
    recency: "> 12 months",
    color: "#f59e0b", // amber-500
    description: "Risk of churn, need reactivation"
  },
];

// Product Bundles (Top Combinations)
const topBundles = [
  { bundle: "Laptop + Mouse + Keyboard", sales: 3420, revenue: "$2.8M", percentage: 34.2 },
  { bundle: "Laptop + Docking Station", sales: 2850, revenue: "$3.2M", percentage: 28.5 },
  { bundle: "Laptop + Monitor", sales: 2180, revenue: "$4.1M", percentage: 21.8 },
  { bundle: "Laptop + Extended Warranty", sales: 1650, revenue: "$1.2M", percentage: 16.5 },
  { bundle: "Laptop + Software Bundle", sales: 980, revenue: "$0.8M", percentage: 9.8 },
];

// Purchase Drivers (Positive & Negative)
const positiveDrivers = [
  { factor: "Performance", mentions: 4850, sentiment: 95 },
  { factor: "Build Quality", mentions: 3920, sentiment: 92 },
  { factor: "Value for Money", mentions: 3680, sentiment: 88 },
  { factor: "Battery Life", mentions: 3250, sentiment: 85 },
  { factor: "Brand Trust", mentions: 2980, sentiment: 90 },
  { factor: "After-sales Service", mentions: 2650, sentiment: 87 },
];

const negativeDrivers = [
  { factor: "Price Too High", mentions: 1850, sentiment: -65 },
  { factor: "Weight/Portability", mentions: 1420, sentiment: -58 },
  { factor: "Limited Ports", mentions: 980, sentiment: -52 },
  { factor: "Fan Noise", mentions: 850, sentiment: -48 },
  { factor: "Screen Brightness", mentions: 680, sentiment: -45 },
];

// Decision Funnel
const decisionFunnel = [
  { stage: "Awareness", value: 10000, conversion: 100 },
  { stage: "Interest", value: 7500, conversion: 75 },
  { stage: "Consideration", value: 5200, conversion: 52 },
  { stage: "Intent", value: 3800, conversion: 38 },
  { stage: "Purchase", value: 2500, conversion: 25 },
];

// Purchase Channels - Online
const onlineChannels = [
  { name: "JD.com", value: 42.5, traffic: "2.8M", conversion: "3.2%", aov: "$1,250", revenue: "$112M" },
  { name: "Tmall", value: 28.8, traffic: "2.1M", conversion: "2.8%", aov: "$1,180", revenue: "$69M" },
  { name: "Official Website", value: 15.2, traffic: "850K", conversion: "4.5%", aov: "$1,420", revenue: "$54M" },
  { name: "Pinduoduo", value: 8.5, traffic: "1.2M", conversion: "1.8%", aov: "$980", revenue: "$21M" },
  { name: "Others", value: 5.0, traffic: "420K", conversion: "2.2%", aov: "$1,050", revenue: "$10M" },
];

// Purchase Channels - Offline
const offlineChannels = [
  { name: "Authorized Dealers", value: 58.5, traffic: "N/A", conversion: "12.5%", aov: "$1,580", revenue: "$185M" },
  { name: "Retail Stores", value: 25.8, traffic: "N/A", conversion: "8.2%", aov: "$1,350", revenue: "$82M" },
  { name: "Electronics Markets", value: 10.2, traffic: "N/A", conversion: "6.5%", aov: "$1,180", revenue: "$32M" },
  { name: "Brand Experience Centers", value: 5.5, traffic: "N/A", conversion: "15.8%", aov: "$2,150", revenue: "$17M" },
];

// Brand Loyalty
const replacementCycle = [
  { years: "< 2 years", percentage: 12.5, count: 1250 },
  { years: "2-3 years", percentage: 35.8, count: 3580 },
  { years: "3-4 years", percentage: 28.2, count: 2820 },
  { years: "4-5 years", percentage: 15.5, count: 1550 },
  { years: "> 5 years", percentage: 8.0, count: 800 },
];

const replacementFactors = [
  { factor: "Performance Upgrade", score: 92 },
  { factor: "Hardware Failure", score: 78 },
  { factor: "New Features", score: 85 },
  { factor: "Work/Study Needs", score: 88 },
  { factor: "Gaming Requirements", score: 82 },
  { factor: "Design Preferences", score: 68 },
];

// User Review Sentiment Words
const sentimentWords = [
  { word: "High Performance", sentiment: "positive", value: 92 },
  { word: "Excellent Screen", sentiment: "positive", value: 88 },
  { word: "Fast Shipping", sentiment: "positive", value: 85 },
  { word: "Good Keypad", sentiment: "positive", value: 82 },
  { word: "Premium Build", sentiment: "positive", value: 80 },
  { word: "Pricey", sentiment: "negative", value: 75 },
  { word: "Fan Noise", sentiment: "negative", value: 68 },
  { word: "Heavy Weight", sentiment: "negative", value: 62 },
  { word: "Average Battery", sentiment: "negative", value: 58 },
  { word: "Limited Ports", sentiment: "negative", value: 55 },
];

const replacementDriversDefinitions: Record<string, string> = {
  "Performance Upgrade": "Shift towards higher processing power and AI capabilities.",
  "Hardware Failure": "Lifecycle end due to physical component degradation.",
  "New Features": "Adoption of innovative form factors and OLED displays.",
  "Work/Study Needs": "Demand for improved productivity and collaboration tools.",
  "Gaming Requirements": "Evolving need for higher refresh rates and GPU power.",
  "Design Preferences": "Aesthetic shifts towards ultra-slim and premium finishes.",
};

const MigrationDriverTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const factor = payload[0].payload.factor;
    const definition = replacementDriversDefinitions[factor] || "";
    return (
      <div className="bg-white/95 backdrop-blur-md p-4 border border-slate-200 shadow-2xl rounded-xl max-w-[240px]">
        <p className="font-black text-slate-900 border-b border-slate-100 pb-2 mb-2 uppercase tracking-widest text-xs flex justify-between">
          <span>{factor}</span>
          <span className="text-red-600 font-mono">{payload[0].value}</span>
        </p>
        <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
          {definition}
        </p>
      </div>
    );
  }
  return null;
};

const COLORS = ["#dc2626", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-200 shadow-xl rounded-lg text-xs">
        <p className="font-bold text-slate-900 mb-1">{label || payload[0].payload.stage || payload[0].payload.factor || payload[0].name}</p>
        <div className="space-y-1">
          {payload.map((item: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill || item.color }} />
              <span className="text-slate-500 whitespace-nowrap">{item.name}:</span>
              <span className="font-black text-slate-900 ml-auto">
                {item.value.toLocaleString()}{item.name.includes('%') || item.dataKey === 'percentage' || item.dataKey === 'sentiment' ? '%' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export function ConsumerInsightsView() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("06");
  const [selectedProduct, setSelectedProduct] = useState("All Products");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  const years = ["2025", "2024"];
  const monthsByYear: Record<string, string[]> = {
    "2025": ["04", "03", "02", "01"],
    "2024": ["12", "11", "10", "09", "08", "07", "06", "05", "04", "03", "02", "01"],
  };

  /**
   * Data Simulation & Filtering Logic
   */
  const derivedData = useMemo(() => {
    // Basic scaling based on year/month
    const monthNum = parseInt(selectedMonth);
    const timeFactor = (selectedYear === "2025" ? 1.1 : 0.9) * (0.9 + (monthNum / 12) * 0.2);
    
    // Scale based on product
    const productFactor = selectedProduct === "All Products" ? 1 : 0.4;
    
    // Scale based on region
    const regionFactor = selectedRegion === "All Regions" ? 1 : 0.15;
    
    const combinedFactor = timeFactor * productFactor * regionFactor;

    return {
      ageDistribution: ageDistribution.map(d => ({
        ...d,
        male: Math.round(d.male * combinedFactor),
        female: Math.round(d.female * combinedFactor),
      })),
      occupationData: occupationData.map(d => ({
        ...d,
        value: Math.round(d.value * combinedFactor),
      })),
      userSegments: userSegments.map(s => ({
        ...s,
        count: Math.round(s.count * combinedFactor),
        // Adjust avg spend slightly based on product mix
        avgSpend: `$${Math.round(parseInt(s.avgSpend.replace(/[$,]/g, '')) * (selectedProduct === "Legion" ? 1.2 : 0.95)).toLocaleString()}`
      })),
      topBundles: topBundles.map(b => ({
        ...b,
        sales: Math.round(b.sales * combinedFactor),
      })),
      decisionFunnel: decisionFunnel.map(st => ({
        ...st,
        value: Math.round(st.value * combinedFactor),
      })),
      onlineChannels: onlineChannels.map(c => ({
        ...c,
        revenue: `$${Math.round(parseInt(c.revenue.replace(/[$,M]/g, '')) * combinedFactor)}M`
      })),
      offlineChannels: offlineChannels.map(c => ({
        ...c,
        revenue: `$${Math.round(parseInt(c.revenue.replace(/[$,M]/g, '')) * combinedFactor)}M`
      })),
      replacementCycle: replacementCycle.map(c => ({
        ...c,
        count: Math.round(c.count * combinedFactor),
      })),
      positiveDrivers: positiveDrivers.map(d => ({
        ...d,
        mentions: Math.round(d.mentions * combinedFactor),
        sentiment: Math.min(100, Math.max(0, d.sentiment * (0.95 + ((parseInt(selectedMonth) % 10) / 100))))
      })),
      negativeDrivers: negativeDrivers.map(d => ({
        ...d,
        mentions: Math.round(d.mentions * combinedFactor),
        sentiment: Math.min(-10, Math.max(-100, d.sentiment * (0.95 + ((parseInt(selectedMonth) % 10) / 100))))
      })),
      sentimentWords: sentimentWords.map(w => ({
        ...w,
        value: Math.round(w.value * combinedFactor),
      })),
      replacementFactors: replacementFactors.map(f => ({
        ...f,
        score: Math.min(100, Math.max(0, f.score * (0.9 + ((parseInt(selectedMonth) % 10) / 50))))
      }))
    };
  }, [selectedYear, selectedMonth, selectedProduct, selectedRegion]);

  const activeSegmentData = hoveredSegment ? derivedData.userSegments.find(s => s.segment === hoveredSegment) : null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Page Title */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 uppercase">Consumer Insights</h2>
          <p className="text-slate-500 font-medium font-serif italic">In-depth behavioral analysis & strategic intelligence</p>
        </div>
        <div className="hidden md:flex items-center gap-4 p-2 bg-slate-100 rounded-lg">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 px-2">
             <Activity className="h-3 w-3" />
             LIVE UPDATES
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl sticky top-2 z-50 rounded-2xl overflow-hidden ring-1 ring-slate-100">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Year</label>
              <Select value={selectedYear} onValueChange={(v) => {
                setSelectedYear(v);
                setSelectedMonth(monthsByYear[v][0]);
              }}>
                <SelectTrigger className="bg-slate-50 h-9 text-[11px] font-bold border-transparent focus:ring-1 focus:ring-slate-900 transition-all rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map(y => <SelectItem key={y} value={y} className="text-[11px] font-bold">{y}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Month</label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="bg-slate-50 h-9 text-[11px] font-bold border-transparent focus:ring-1 focus:ring-slate-900 transition-all rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {monthsByYear[selectedYear].map(m => (
                    <SelectItem key={m} value={m} className="text-[11px] font-bold">
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Product</label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger className="bg-slate-50 h-9 text-[11px] font-bold border-transparent focus:ring-1 focus:ring-slate-900 transition-all rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product} value={product} className="text-[11px] font-bold">
                      {product}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Region</label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="bg-slate-50 h-9 text-[11px] font-bold border-transparent focus:ring-1 focus:ring-slate-900 transition-all rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region} className="text-[11px] font-bold">
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex h-9">
              <Button className="w-full bg-slate-900 hover:bg-slate-800 text-[11px] font-black uppercase tracking-widest h-full rounded-lg">
                <Search className="h-4 w-4 mr-2" />
                Query
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Area (TOC Analysis by Default) */}
      <div className="space-y-6 mt-6">
        {/* Consumer Structure */}
        <div className="pt-4">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
             <div className="w-2 h-6 bg-red-600 rounded-full" />
             Consumer Structure
          </h3>
          
          <div className="grid gap-4 md:grid-cols-2">
            {/* Age & Gender Distribution */}
            <Card className="border-none shadow-sm ring-1 ring-slate-200">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Age & Gender Distribution</CardTitle>
                <CardDescription className="text-xs">Consumer demographics by age groups</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={derivedData.ageDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis dataKey="age" tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 10, fontWeight: 700 }} />
                    <Bar dataKey="male" name="Male" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="female" name="Female" fill="#ec4899" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Occupation Distribution */}
            <Card className="border-none shadow-sm ring-1 ring-slate-200">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Occupation Distribution</CardTitle>
                <CardDescription className="text-xs">Consumer segmentation by profession</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={derivedData.occupationData}
                      cx="50%"
                      cy="40%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      labelLine={false}
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                      dataKey="value"
                    >
                      {derivedData.occupationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: 10, fontWeight: 700, paddingTop: '20px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* User Segmentation (RFM) & Usage Scenarios Matrix */}
        <div className="pt-4">
          <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-6 bg-slate-900 rounded-full" />
              Segmentation & Scenarios
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:inline">Hover/Tap a segment for detailed usage analysis</span>
          </h3>
          
          <div className="grid gap-6 lg:grid-cols-12 mb-4">
            
            {/* Left Column: Segments */}
            <div className="lg:col-span-8 grid gap-4 md:grid-cols-2">
              {derivedData.userSegments.map((segment, index) => {
                const isActive = hoveredSegment === segment.segment;
                const isDull = hoveredSegment !== null && !isActive;

                return (
                  <Card 
                    key={index} 
                    className={`border-t-4 transition-all duration-500 cursor-pointer overflow-hidden ${
                      isActive ? 'shadow-2xl scale-[1.03] bg-white ring-2 ring-slate-900 border-t-8' : 
                      isDull ? 'opacity-30 grayscale scale-[0.98]' : 'bg-slate-50/50'
                    }`}
                    style={{ borderTopColor: segment.color }}
                    onClick={() => setHoveredSegment(isActive ? null : segment.segment)}
                    onMouseEnter={() => setHoveredSegment(segment.segment)}
                    onMouseLeave={() => setHoveredSegment(null)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className={`text-lg font-black transition-colors ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>{segment.segment}</CardTitle>
                          <CardDescription className="text-xs font-medium">{segment.description}</CardDescription>
                        </div>
                        <div className={`p-2 rounded-lg transition-all ${isActive ? 'scale-110 shadow-lg' : ''}`} style={{ backgroundColor: segment.color + '20' }}>
                           <Users className="h-4 w-4" style={{ color: segment.color }} />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mt-2">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="font-bold text-slate-400 uppercase tracking-tighter">Scale</span>
                          <span className={`font-black ${isActive ? 'text-lg text-slate-900' : 'text-slate-700'}`}>{segment.count.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="font-bold text-slate-400 uppercase tracking-tighter">Share</span>
                          <Badge className="font-black text-[10px]" style={{ backgroundColor: segment.color }}>{segment.percentage}%</Badge>
                        </div>
                        <div className="h-px bg-slate-100 my-2" />
                        <div className="grid grid-cols-3 gap-2">
                           <div className="text-center">
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Spending</p>
                              <p className="text-[11px] font-black text-slate-900">{segment.avgSpend}</p>
                           </div>
                           <div className="text-center border-l border-slate-100">
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Frequency</p>
                              <p className="text-[11px] font-black text-slate-900">{segment.frequency}</p>
                           </div>
                           <div className="text-center border-l border-slate-100">
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Recency</p>
                              <p className="text-[11px] font-black text-slate-900">{segment.recency}</p>
                           </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Right Column: Radar Chart */}
            <Card className={`lg:col-span-4 flex flex-col justify-center border-slate-200 transition-all duration-700 ${hoveredSegment ? 'shadow-2xl ring-1 ring-slate-900 bg-white' : 'shadow-inner bg-slate-50'} relative overflow-hidden`}>
              <CardHeader className="pb-2 absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-white to-transparent">
                <CardTitle className="text-xs font-black text-center uppercase tracking-widest text-slate-400">
                  {hoveredSegment ? `${hoveredSegment} Profile` : "Aggregate Usage Matrix"}
                </CardTitle>
                <p className="text-[10px] text-center font-bold text-slate-900">
                   {hoveredSegment ? "Dominant Needs Analysis" : "Portfolio Performance"}
                </p>
              </CardHeader>
              <CardContent className="p-0 pt-16 flex-1">
                <ResponsiveContainer width="100%" height={360}>
                  <RadarChart cx="50%" cy="50%" outerRadius="65%" data={usageRadarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 9, fontWeight: 800 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    {/* Overall shape (faded if something is hovered) */}
                    <Radar
                      name="Overall"
                      dataKey="Overall"
                      stroke="#94a3b8"
                      fill="#cbd5e1"
                      fillOpacity={hoveredSegment ? 0.05 : 0.4}
                      strokeOpacity={hoveredSegment ? 0.2 : 0.8}
                      strokeWidth={1}
                    />
                    {/* Hovered segment shape */}
                    {hoveredSegment && activeSegmentData && (
                      <Radar
                        name={hoveredSegment}
                        dataKey={hoveredSegment}
                        stroke={activeSegmentData.color}
                        fill={activeSegmentData.color}
                        fillOpacity={0.6}
                        strokeWidth={4}
                        animationDuration={500}
                        animationBegin={0}
                      />
                    )}
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 text-[9px] font-black text-slate-400">
                 <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                    BASELINE
                 </div>
                 {hoveredSegment && (
                    <div className="flex items-center gap-1.5 animate-pulse">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: activeSegmentData?.color }} />
                        SELECTED SEGMENT
                    </div>
                 )}
              </div>
            </Card>

          </div>

          {/* Top Product Bundles */}
          <Card className="border-none shadow-sm ring-1 ring-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Associated Purchase Patterns</CardTitle>
              <CardDescription className="text-xs">Top product bundles and cross-sell combinations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {derivedData.topBundles.map((bundle, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 hover:shadow-xl transition-all duration-300 group cursor-default">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 group-hover:rotate-12 transition-transform">
                        <ShoppingCart className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-tighter leading-tight italic">{bundle.bundle}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-bold text-slate-500">{bundle.sales.toLocaleString()} sales</span>
                          <span className="text-[10px] font-black text-slate-400">·</span>
                          <span className="text-[10px] font-black text-emerald-600">{bundle.revenue}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="text-sm font-black text-slate-900">{bundle.percentage}%</p>
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Share</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Review Analysis (Formerly Decision Drivers Analysis) */}
        <div className="pt-4 relative">
          <h3 className="text-xl font-bold flex items-center gap-3">
            <div className="w-2 h-6 bg-emerald-600 rounded-full" />
            User Review Analysis
          </h3>
          
          <div className="absolute right-0 top-4 flex items-center gap-3 bg-white/50 px-3 py-1.5 rounded-full border border-slate-100 shadow-sm backdrop-blur-sm z-10">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Data Sources:</span>
            <div className="flex items-center gap-3">
              <a href="#" className="flex items-center gap-1 text-[10px] font-black text-slate-800 hover:text-emerald-600 transition-colors">
                <ExternalLink className="h-2.5 w-2.5" />
                AMAZON
              </a>
              <span className="text-slate-200 text-xs">|</span>
              <a href="#" className="flex items-center gap-1 text-[10px] font-black text-slate-800 hover:text-emerald-600 transition-colors">
                <ExternalLink className="h-2.5 w-2.5" />
                JD.COM
              </a>
              <span className="text-slate-200 text-xs">|</span>
              <a href="#" className="flex items-center gap-1 text-[10px] font-black text-slate-800 hover:text-emerald-600 transition-colors">
                <ExternalLink className="h-2.5 w-2.5" />
                TMALL
              </a>
            </div>
          </div>

          <Tabs defaultValue="positive" className="w-full mt-4">
            <TabsList className="bg-slate-100/50 p-1 border-none rounded-xl mb-4">
              <TabsTrigger value="positive" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-bold px-6 border-none">Positive Factors</TabsTrigger>
              <TabsTrigger value="negative" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-bold px-6 border-none">Negative Factors</TabsTrigger>
            </TabsList>

            <TabsContent value="positive" className="mt-0">
                <div className="grid gap-6 md:grid-cols-3">
                  <Card className="md:col-span-2 border-none shadow-sm ring-1 ring-slate-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">Positive Purchase Drivers</CardTitle>
                      <CardDescription className="text-xs italic serif font-serif italic">Sentiment vs. Mention Frequency Analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                            <XAxis 
                              type="number" 
                              dataKey="mentions" 
                              name="Mentions" 
                              tick={{ fontSize: 10, fill: '#64748b' }}
                              axisLine={false}
                              tickLine={false}
                              label={{ value: "Number of Mentions", position: "insideBottom", offset: -10, fontSize: 10, fill: '#94a3b8' }}
                            />
                            <YAxis 
                              type="number" 
                              dataKey="sentiment" 
                              name="Sentiment" 
                              domain={[80, 100]}
                              tick={{ fontSize: 10, fill: '#64748b' }}
                              axisLine={false}
                              tickLine={false}
                              label={{ value: "Sentiment Score", angle: -90, position: "insideLeft", fontSize: 10, fill: '#94a3b8' }}
                            />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                            <Scatter name="Positive Drivers" data={derivedData.positiveDrivers} fill="#10b981">
                              {derivedData.positiveDrivers.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.sentiment > 90 ? '#059669' : '#10b981'} />
                              ))}
                              <LabelList dataKey="factor" position="top" style={{ fontSize: 10, fontWeight: 500, fill: '#1e293b' }} />
                            </Scatter>
                          </ScatterChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    <Card className="border-none shadow-sm ring-1 ring-slate-200 bg-emerald-50/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-bold text-emerald-700 uppercase tracking-tighter">Core Strengths</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {derivedData.positiveDrivers.slice(0, 3).map((driver, i) => (
                          <div key={i} className="flex justify-between items-center group">
                            <span className="text-xs font-medium text-slate-700">{driver.factor}</span>
                            <div className="flex items-center gap-2">
                              <div className="h-1 w-16 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500" style={{ width: `${driver.sentiment}%` }} />
                              </div>
                              <span className="text-[10px] font-bold text-emerald-600">{driver.sentiment}%</span>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                    <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm space-y-2">
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sentiment Insight</p>
                       <p className="text-xs text-slate-600 leading-relaxed">
                         Performance and build quality are the primary motivators. Brand trust remains high, with 90% sentiment consistency.
                       </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="negative" className="mt-4">
                <div className="grid gap-6 md:grid-cols-3">
                  <Card className="md:col-span-2 border-none shadow-sm ring-1 ring-slate-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">Negative Purchase Barriers</CardTitle>
                      <CardDescription className="text-xs font-serif italic">Critical Pain Points & Friction Analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                            <XAxis 
                              type="number" 
                              dataKey="mentions" 
                              name="Mentions" 
                              tick={{ fontSize: 10, fill: '#64748b' }}
                              axisLine={false}
                              tickLine={false}
                              label={{ value: "Frequency of Complaints", position: "insideBottom", offset: -10, fontSize: 10, fill: '#94a3b8' }}
                            />
                            <YAxis 
                              type="number" 
                              dataKey="sentiment" 
                              name="Sentiment" 
                              domain={[-70, -40]}
                              tick={{ fontSize: 10, fill: '#64748b' }}
                              axisLine={false}
                              tickLine={false}
                              label={{ value: "Severity Score", angle: -90, position: "insideLeft", fontSize: 10, fill: '#94a3b8' }}
                            />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                            <Scatter name="Negative Barriers" data={derivedData.negativeDrivers} fill="#ef4444">
                              <LabelList dataKey="factor" position="top" style={{ fontSize: 10, fontWeight: 500, fill: '#1e293b' }} />
                            </Scatter>
                          </ScatterChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    <Card className="border-none shadow-sm ring-1 ring-slate-200 bg-red-50/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-bold text-red-700 uppercase tracking-tighter">Primary Barriers</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {derivedData.negativeDrivers.slice(0, 3).map((driver, i) => (
                          <div key={i} className="flex justify-between items-center">
                            <span className="text-xs font-medium text-slate-700">{driver.factor}</span>
                            <div className="flex items-center gap-2">
                              <div className="h-1 w-16 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-red-500" style={{ width: `${Math.abs(driver.sentiment)}%` }} />
                              </div>
                              <span className="text-[10px] font-bold text-red-600">{driver.sentiment}%</span>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                    <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm space-y-2">
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Correction Alert</p>
                       <p className="text-xs text-slate-600 leading-relaxed">
                         Price sensitivity is the the major hurdle. Focus on premium value communication to offset "high price" perceptions.
                       </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Decision Funnel */}
          <div className="space-y-6 pt-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <div className="w-1.5 h-6 bg-slate-900 rounded-full" />
              Decision Funnel
            </h3>
            
            <Card className="border-none shadow-sm ring-1 ring-slate-200 overflow-hidden">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                <div className="flex justify-between items-end">
                  <div>
                    <CardTitle className="text-lg font-bold">Purchase Decision Funnel</CardTitle>
                    <CardDescription className="text-xs">End-to-end journey conversion analytics</CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Overall Efficiency</p>
                    <p className="text-2xl font-black text-slate-900">25.0%</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid md:grid-cols-12">
                  <div className="md:col-span-7 p-6 min-h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <FunnelChart>
                        <Tooltip content={<CustomTooltip />} />
                        <Funnel dataKey="value" data={derivedData.decisionFunnel} isAnimationActive>
                          <LabelList position="right" fill="#64748b" stroke="none" dataKey="stage" style={{ fontSize: 10, fontWeight: 600 }} />
                          {derivedData.decisionFunnel.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fillOpacity={0.85} />
                          ))}
                        </Funnel>
                      </FunnelChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="md:col-span-5 bg-slate-50/30 border-l border-slate-100 p-6 space-y-3">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Stage Analytics</h4>
                    {derivedData.decisionFunnel.map((stage, index) => (
                      <div key={index} className="flex items-center gap-4 group">
                        <div className="flex flex-col items-center gap-1 w-8">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                          {index < derivedData.decisionFunnel.length - 1 && <div className="w-px h-10 bg-slate-200" />}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex justify-between items-baseline">
                            <span className="text-xs font-bold text-slate-700">{stage.stage}</span>
                            <span className="text-xs font-black text-slate-900">{(stage.value / 1000).toFixed(1)}k</span>
                          </div>
                          <div className="flex justify-between items-center mt-1">
                             <div className="h-1 flex-1 bg-slate-100 rounded-full overflow-hidden mr-3">
                                <div className="h-full bg-slate-900" style={{ width: `${stage.conversion}%` }} />
                             </div>
                             <span className="text-[10px] font-medium text-slate-500">{stage.conversion}% YIELD</span>
                          </div>
                          {index > 0 && (
                            <p className="text-[9px] text-red-500 font-medium mt-1">
                              ↓ {((1 - stage.value / derivedData.decisionFunnel[index-1].value) * 100).toFixed(1)}% Drop-off
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Purchase Channels */}
          <div className="space-y-6 pt-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
              Purchase Channels
            </h3>
            
            <Tabs defaultValue="online" className="w-full">
              <TabsList className="bg-slate-100/50 p-1 border-none">
                <TabsTrigger value="online" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Online Channels</TabsTrigger>
                <TabsTrigger value="offline" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Offline Channels</TabsTrigger>
              </TabsList>

              <TabsContent value="online" className="mt-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="border-none shadow-sm ring-1 ring-slate-200">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold">Online Share Distribution</CardTitle>
                      <CardDescription className="text-xs">Market contribution by platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={derivedData.onlineChannels}
                              cx="50%" cy="50%"
                              innerRadius={60}
                              outerRadius={100}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {derivedData.onlineChannels.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend verticalAlign="middle" align="right" layout="vertical" iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    {derivedData.onlineChannels.slice(0, 4).map((channel, index) => (
                      <Card key={index} className="border-none shadow-sm ring-1 ring-slate-200 hover:ring-slate-300 transition-all bg-white/50 cursor-pointer group">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-8 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                              <div>
                                <p className="text-xs font-bold text-slate-900 uppercase tracking-tighter">{channel.name}</p>
                                <p className="text-[10px] text-slate-500">CVR: {channel.conversion} | AOV: {channel.aov}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-black text-slate-900">{channel.revenue}</p>
                              <Badge className="text-[9px] h-4" variant="secondary">{channel.value}% Share</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="offline" className="mt-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="border-none shadow-sm ring-1 ring-slate-200">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold">Offline Share Distribution</CardTitle>
                      <CardDescription className="text-xs">Physical retail & dealer contribution</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={derivedData.offlineChannels}
                              cx="50%" cy="50%"
                              innerRadius={60}
                              outerRadius={100}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {derivedData.offlineChannels.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend verticalAlign="middle" align="right" layout="vertical" iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    {derivedData.offlineChannels.map((channel, index) => (
                      <Card key={index} className="border-none shadow-sm ring-1 ring-slate-200 hover:ring-slate-300 transition-all bg-white/50 cursor-pointer group">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-8 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                              <div>
                                <p className="text-xs font-bold text-slate-900 uppercase tracking-tighter">{channel.name}</p>
                                <p className="text-[10px] text-slate-500">CVR: {channel.conversion} | AOV: {channel.aov}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-black text-slate-900">{channel.revenue}</p>
                              <Badge className="text-[9px] h-4" variant="secondary">{channel.value}% Share</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Brand Loyalty */}
          <div className="space-y-6 pt-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <div className="w-1.5 h-6 bg-red-600 rounded-full" />
              Brand Loyalty
            </h3>
            
            <div className="grid gap-6 md:grid-cols-2">
              {/* Replacement Cycle */}
              <Card className="border-none shadow-sm ring-1 ring-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Device Replacement Cycle</CardTitle>
                  <CardDescription className="text-xs">Time frequency between consumer hardware upgrades</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={derivedData.replacementCycle} margin={{ top: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis dataKey="years" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} hide />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="percentage" name="Share %" fill="#0f172a" radius={[6, 6, 0, 0]} barSize={40}>
                           <LabelList dataKey="percentage" position="top" formatter={(v: number) => `${v}%`} style={{ fontSize: 11, fontWeight: 700 }} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 p-4 bg-slate-900 rounded-xl flex justify-between items-center text-white">
                    <p className="text-xs font-medium opacity-80">Avg. Cycle</p>
                    <p className="text-xl font-bold">3.2 Years</p>
                  </div>
                </CardContent>
              </Card>

              {/* Replacement Factors */}
              <Card className="border-none shadow-sm ring-1 ring-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Migration Drivers</CardTitle>
                  <CardDescription className="text-xs">Primary reasons for brand switching or upgrading</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={derivedData.replacementFactors}>
                        <PolarGrid stroke="#f1f5f9" />
                        <PolarAngleAxis dataKey="factor" tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar 
                          name="Impact Score" 
                          dataKey="score" 
                          stroke="#ef4444" 
                          fill="#ef4444" 
                          fillOpacity={0.6} 
                          strokeWidth={2}
                        />
                        <Tooltip content={<MigrationDriverTooltip />} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Brand Flow */}
            <Card className="border-none shadow-sm ring-1 ring-slate-200 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-12">
                   {/* Left Highlight: 78.5% Retention */}
                   <div className="md:col-span-4 bg-emerald-950 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                      <div className="absolute inset-0 opacity-10">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-3xl -mr-10 -mt-10 animate-pulse" />
                      </div>
                      
                      <div className="relative z-10 space-y-6">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Master Retention KPI</p>
                        
                        <div className="relative inline-flex items-center justify-center">
                          <svg className="w-40 h-40 transform -rotate-90">
                            <circle
                              cx="80"
                              cy="80"
                              r="72"
                              stroke="currentColor"
                              strokeWidth="8"
                              fill="transparent"
                              className="text-emerald-900/50"
                            />
                            <motion.circle
                              initial={{ strokeDashoffset: 452 }}
                              animate={{ strokeDashoffset: 452 * (1 - 0.785) }}
                              transition={{ duration: 2, ease: "easeOut" }}
                              cx="80"
                              cy="80"
                              r="72"
                              stroke="currentColor"
                              strokeWidth="10"
                              fill="transparent"
                              strokeDasharray={452}
                              className="text-emerald-500"
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-black text-white leading-none">78.5%</span>
                            <span className="text-[9px] font-bold text-emerald-400 uppercase mt-1">Loyalty Rate</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <h4 className="text-xl font-bold text-white uppercase italic">Market Leader</h4>
                          <p className="text-[10px] text-emerald-400/70 font-medium px-4">
                            Dominant retention index compared to industry average (avg: 62%).
                          </p>
                        </div>
                      </div>
                   </div>

                   {/* Right: Detailed Flows */}
                   <div className="md:col-span-8 p-8 space-y-8 bg-white">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                        <div>
                          <CardTitle className="text-lg font-black uppercase">Migration Detail</CardTitle>
                          <p className="text-xs text-slate-500 font-medium font-serif italic">Inflow & Outflow dynamics analysis</p>
                        </div>
                        <Badge variant="secondary" className="bg-slate-100 text-slate-900 font-black border-none px-3">2024-Q2 CYCLE</Badge>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                             <TrendingUp className="h-4 w-4 text-emerald-500" />
                             <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Inflow: Acquisitions</p>
                          </div>
                          <div className="space-y-3">
                             {[
                               { brand: "FROM DELL", value: "1.2k", color: "blue" },
                               { brand: "FROM HP", value: "0.9k", color: "sky" },
                               { brand: "FROM APPLE", value: "0.4k", color: "indigo" }
                             ].map((item, i) => (
                               <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-blue-50/50 border border-blue-100/50 group hover:border-blue-300 transition-all">
                                  <span className="text-[10px] font-black text-blue-700">{item.brand}</span>
                                  <span className="text-sm font-black text-blue-900">{item.value}</span>
                               </div>
                             ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                             <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
                             <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Outflow: Churn</p>
                          </div>
                          <div className="space-y-3">
                             {[
                               { brand: "TO APPLE", value: "980", color: "red" },
                               { brand: "TO DELL", value: "580", color: "rose" },
                               { brand: "TO HP", value: "420", color: "orange" }
                             ].map((item, i) => (
                               <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-red-50/50 border border-red-100/50 group hover:border-red-300 transition-all">
                                  <span className="text-[10px] font-black text-red-700">{item.brand}</span>
                                  <span className="text-sm font-black text-red-900">{item.value}</span>
                               </div>
                             ))}
                          </div>
                        </div>
                      </div>
                   </div>
                </div>
              </CardContent>
            </Card>
          </div>
      </div>
    </motion.div>
  );
}
