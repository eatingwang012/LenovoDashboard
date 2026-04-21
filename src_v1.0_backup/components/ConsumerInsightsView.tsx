import { useState } from "react";
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
import { Search, Users, ShoppingCart, RefreshCw, Activity } from "lucide-react";
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

const usageScenarios = [
  { scenario: "Office Work", value: 3850, color: "#dc2626" },
  { scenario: "Gaming", value: 2420, color: "#8b5cf6" },
  { scenario: "Content Creation", value: 1680, color: "#3b82f6" },
  { scenario: "Study/Learning", value: 1580, color: "#10b981" },
  { scenario: "Entertainment", value: 470, color: "#f59e0b" },
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
    color: "#dc2626",
    description: "Frequent buyers with high spending"
  },
  { 
    segment: "Growth Potential",
    count: 2420,
    percentage: 24.2,
    avgSpend: "$1,850",
    frequency: "2.1 times",
    recency: "3-6 months",
    color: "#3b82f6",
    description: "Recent buyers, potential for growth"
  },
  { 
    segment: "Loyal Customers",
    count: 3280,
    percentage: 32.8,
    avgSpend: "$1,420",
    frequency: "3.5 times",
    recency: "6-12 months",
    color: "#10b981",
    description: "Stable repeat customers"
  },
  { 
    segment: "At Risk",
    count: 2450,
    percentage: 24.5,
    avgSpend: "$980",
    frequency: "1.2 times",
    recency: "> 12 months",
    color: "#f59e0b",
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
  const [selectedDate, setSelectedDate] = useState("2024-06");
  const [selectedProduct, setSelectedProduct] = useState("All Products");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedChannel, setSelectedChannel] = useState("TOC");
  const [activeTab, setActiveTab] = useState("toc");

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
          <h2 className="text-3xl font-black tracking-tight text-slate-900">Consumer Insights</h2>
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
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Date</label>
              <Select value={selectedDate} onValueChange={setSelectedDate}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-01">January 2024</SelectItem>
                  <SelectItem value="2024-02">February 2024</SelectItem>
                  <SelectItem value="2024-03">March 2024</SelectItem>
                  <SelectItem value="2024-04">April 2024</SelectItem>
                  <SelectItem value="2024-05">May 2024</SelectItem>
                  <SelectItem value="2024-06">June 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Product</label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product} value={product}>
                      {product}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Region</label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Channel</label>
              <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TOC">TOC (To Consumer)</SelectItem>
                  <SelectItem value="TOB">TOB (To Business)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
                <Search className="h-4 w-4 mr-2" />
                Query
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TOC / TOB Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="toc">TOC (To Consumer)</TabsTrigger>
          <TabsTrigger value="tob">TOB (To Business)</TabsTrigger>
        </TabsList>

        {/* TOC Content */}
        <TabsContent value="toc" className="space-y-6 mt-6">
          {/* Consumer Structure */}
          <div>
            <h3 className="text-xl font-bold mb-4">Consumer Structure</h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              {/* Age & Gender Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Age & Gender Distribution</CardTitle>
                  <CardDescription>Consumer demographics by age groups</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={ageDistribution}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="age" tick={{ fontSize: 12 }} stroke="#6b7280" />
                      <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="male" name="Male" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                      <Bar dataKey="female" name="Female" fill="#ec4899" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Occupation Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Occupation Distribution</CardTitle>
                  <CardDescription>Consumer segmentation by profession</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={occupationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name} ${percentage}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {occupationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Usage Scenarios */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Usage Scenarios</CardTitle>
                <CardDescription>Primary use cases for purchased devices</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={usageScenarios} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" tick={{ fontSize: 12 }} stroke="#6b7280" />
                    <YAxis dataKey="scenario" type="category" tick={{ fontSize: 12 }} stroke="#6b7280" width={120} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" name="Users" radius={[0, 8, 8, 0]}>
                      {usageScenarios.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* User Segmentation (RFM) */}
          <div>
            <h3 className="text-xl font-bold mb-4">User Segmentation</h3>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-4">
              {userSegments.map((segment, index) => (
                <Card key={index} className="border-t-4" style={{ borderTopColor: segment.color }}>
                  <CardHeader>
                    <CardTitle className="text-lg">{segment.segment}</CardTitle>
                    <CardDescription>{segment.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Count</span>
                        <span className="font-bold">{segment.count.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Percentage</span>
                        <Badge style={{ backgroundColor: segment.color }}>{segment.percentage}%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Avg Spend</span>
                        <span className="font-medium">{segment.avgSpend}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Frequency</span>
                        <span className="font-medium">{segment.frequency}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Recency</span>
                        <span className="font-medium">{segment.recency}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Top Product Bundles */}
            <Card>
              <CardHeader>
                <CardTitle>Associated Purchase Patterns</CardTitle>
                <CardDescription>Top product bundles and cross-sell combinations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topBundles.map((bundle, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                          <ShoppingCart className="h-5 w-5 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{bundle.bundle}</h4>
                          <p className="text-sm text-muted-foreground">{bundle.sales.toLocaleString()} sales · {bundle.revenue} revenue</p>
                        </div>
                      </div>
                      <Badge>{bundle.percentage}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Purchase Decision Drivers */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <div className="w-1.5 h-6 bg-red-600 rounded-full" />
              Purchase Decision Drivers
            </h3>
            
            <Tabs defaultValue="positive" className="w-full">
              <TabsList className="bg-slate-100/50 p-1 border-none">
                <TabsTrigger value="positive" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Positive Factors</TabsTrigger>
                <TabsTrigger value="negative" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Negative Factors</TabsTrigger>
              </TabsList>

              <TabsContent value="positive" className="mt-4">
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
                            <Scatter name="Positive Drivers" data={positiveDrivers} fill="#10b981">
                              {positiveDrivers.map((entry, index) => (
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
                        {positiveDrivers.slice(0, 3).map((driver, i) => (
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
                            <Scatter name="Negative Barriers" data={negativeDrivers} fill="#ef4444">
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
                        {negativeDrivers.slice(0, 3).map((driver, i) => (
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
                        <Funnel dataKey="value" data={decisionFunnel} isAnimationActive>
                          <LabelList position="right" fill="#64748b" stroke="none" dataKey="stage" style={{ fontSize: 10, fontWeight: 600 }} />
                          {decisionFunnel.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fillOpacity={0.85} />
                          ))}
                        </Funnel>
                      </FunnelChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="md:col-span-5 bg-slate-50/30 border-l border-slate-100 p-6 space-y-3">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Stage Analytics</h4>
                    {decisionFunnel.map((stage, index) => (
                      <div key={index} className="flex items-center gap-4 group">
                        <div className="flex flex-col items-center gap-1 w-8">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                          {index < decisionFunnel.length - 1 && <div className="w-px h-10 bg-slate-200" />}
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
                              ↓ {((1 - stage.value / decisionFunnel[index-1].value) * 100).toFixed(1)}% Drop-off
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
                              data={onlineChannels}
                              cx="50%" cy="50%"
                              innerRadius={60}
                              outerRadius={100}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {onlineChannels.map((entry, index) => (
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
                    {onlineChannels.slice(0, 4).map((channel, index) => (
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
                              data={offlineChannels}
                              cx="50%" cy="50%"
                              innerRadius={60}
                              outerRadius={100}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {offlineChannels.map((entry, index) => (
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
                    {offlineChannels.map((channel, index) => (
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

          {/* User Review Analysis */}
          <div className="space-y-6 pt-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <div className="w-1.5 h-6 bg-emerald-600 rounded-full" />
              User Review Analysis
            </h3>
            
            <Card className="border-none shadow-sm ring-1 ring-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold">Review Sentiment Analysis</CardTitle>
                <CardDescription className="text-xs">Key phrase extraction and emotional weighting from e-commerce platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3 py-6 justify-center">
                  {sentimentWords.map((item, index) => (
                    <div 
                      key={index} 
                      className={`px-4 py-2 rounded-full text-sm font-bold transition-all cursor-default transform hover:scale-105 ${
                        item.sentiment === "positive" 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100" 
                          : "bg-red-50 text-red-700 border border-red-100 hover:bg-red-100"
                      }`}
                      style={{ 
                        fontSize: `${Math.max(12, item.value / 4)}px`,
                        opacity: item.value / 100 + 0.2
                      }}
                    >
                      {item.word}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100 italic">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest text-center">Top Positive</p>
                    <p className="text-xl font-black text-slate-900 text-center uppercase tracking-tighter">High Performance</p>
                  </div>
                  <div className="space-y-1 border-l border-slate-100">
                    <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest text-center">Top Negative</p>
                    <p className="text-xl font-black text-slate-900 text-center uppercase tracking-tighter">Price Points</p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                      <BarChart data={replacementCycle} margin={{ top: 20 }}>
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
                      <RadarChart data={replacementFactors}>
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
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Brand Flow */}
            <Card className="border-none shadow-sm ring-1 ring-slate-200 overflow-hidden">
              <CardHeader className="bg-slate-50 border-b border-slate-100">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg font-bold">Brand Retention & Migration</CardTitle>
                    <CardDescription className="text-xs">Flow of users during the purchase cycle</CardDescription>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                    <RefreshCw className="h-3 w-3 animate-spin-slow" />
                    <span className="text-[10px] font-bold">78.5% RETENTION</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                   <div className="space-y-4">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">User Loyalty</p>
                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex justify-between items-center">
                         <div>
                            <p className="text-[10px] font-medium text-emerald-700 uppercase">Repeat Buyers</p>
                            <p className="text-2xl font-black text-emerald-900">6.8k</p>
                         </div>
                         <div className="text-right">
                            <p className="text-[10px] font-medium text-emerald-700">STAYED</p>
                            <p className="text-sm font-bold text-emerald-800">LENOVO</p>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Churn Analysis</p>
                      <div className="p-4 rounded-xl bg-red-50 border border-red-100 space-y-3">
                         <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-red-700">↓ TO APPLE</span>
                            <span className="text-xs font-black text-red-900">980</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-red-700">↓ TO DELL</span>
                            <span className="text-xs font-black text-red-900">580</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-red-700">↓ TO HP</span>
                            <span className="text-xs font-black text-red-900">420</span>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Acquisitions</p>
                      <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 space-y-3">
                         <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-blue-700">↑ FROM DELL</span>
                            <span className="text-xs font-black text-blue-900">1.2k</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-blue-700">↑ FROM HP</span>
                            <span className="text-xs font-black text-blue-900">0.9k</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-blue-700">↑ FROM APPLE</span>
                            <span className="text-xs font-black text-blue-900">0.4k</span>
                         </div>
                      </div>
                   </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* TOB Content */}
        <TabsContent value="tob" className="space-y-6 mt-6">
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold mb-2">TOB Analysis Coming Soon</h3>
              <p className="text-muted-foreground">
                Business-to-Business consumer insights and analytics will be available here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
