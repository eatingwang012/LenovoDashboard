import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
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
} from "recharts";
import { TrendingUp, Package, DollarSign, Calendar } from "lucide-react";

// 数据：月度库存变化
const monthlyStockData = [
  { month: "4月", total: 1180, disponible: 1120, reparation: 45, manquant: 15 },
  { month: "5月", total: 1205, disponible: 1145, reparation: 42, manquant: 18 },
  { month: "6月", total: 1190, disponible: 1130, reparation: 48, manquant: 12 },
  { month: "7月", total: 1215, disponible: 1155, reparation: 40, manquant: 20 },
  { month: "8月", total: 1200, disponible: 1140, reparation: 44, manquant: 16 },
  { month: "9月", total: 1230, disponible: 1170, reparation: 38, manquant: 22 },
  { month: "10月", total: 1247, disponible: 1216, reparation: 8, manquant: 23 },
];

// 数据：部门分布
const departmentData = [
  { name: "IT部门", equipments: 342, value: 285000 },
  { name: "行政/职能", equipments: 195, value: 142000 },
  { name: "核心管理层", equipments: 178, value: 312000 },
  { name: "人力资源", equipments: 156, value: 98000 },
  { name: "数字化转型", equipments: 210, value: 165000 },
  { name: "运营部门", equipments: 166, value: 124000 },
  { name: "内控审计", equipments: 142, value: 108000 },
  { name: "产品研发", equipments: 158, value: 135000 },
];

// 数据：品类分布
const categoryData = [
  { name: "显示器", value: 315, percentage: 25.3 },
  { name: "鼠标", value: 245, percentage: 19.6 },
  { name: "桌椅", value: 198, percentage: 15.9 },
  { name: "其他存储", value: 165, percentage: 13.2 },
  { name: "打印机", value: 89, percentage: 7.1 },
  { name: "键盘", value: 142, percentage: 11.4 },
  { name: "笔记本/台式机", value: 93, percentage: 7.5 },
];

// 数据：维护与采购
const maintenanceData = [
  { month: "4月", achats: 45, reparations: 12, cout: 28500 },
  { month: "5月", achats: 38, reparations: 15, cout: 32000 },
  { month: "6月", achats: 52, reparations: 18, cout: 41200 },
  { month: "7月", achats: 35, reparations: 10, cout: 26800 },
  { month: "8月", achats: 42, reparations: 14, cout: 35600 },
  { month: "9月", achats: 48, reparations: 16, cout: 38900 },
  { month: "10月", achats: 65, reparations: 8, cout: 52400 },
];

// 数据：资产价值趋势
const valueData = [
  { month: "4月", valeurTotale: 1125000, amortissement: 985000 },
  { month: "5月", valeurTotale: 1142000, amortissement: 1005000 },
  { month: "6月", valeurTotale: 1168000, amortissement: 1022000 },
  { month: "7月", valeurTotale: 1155000, amortissement: 1015000 },
  { month: "8月", valeurTotale: 1178000, amortissement: 1035000 },
  { month: "9月", valeurTotale: 1195000, amortissement: 1048000 },
  { month: "10月", valeurTotale: 1226000, amortissement: 1072000 },
];

const COLORS = [
  "#8b5cf6", // purple
  "#3b82f6", // blue
  "#f97316", // orange
  "#14b8a6", // teal
  "#ec4899", // pink
  "#6366f1", // indigo
  "#06b6d4", // cyan
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-lg">
        <p className="font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function StatCard({ title, value, icon, description, color }: any) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="mt-2 text-2xl font-bold">{value}</h3>
            <p className="text-xs text-muted-foreground mt-2">{description}</p>
          </div>
          <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${color}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function StatisticsView() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h2 className="text-2xl font-bold">统计分析</h2>
        <p className="text-muted-foreground mt-1">
          资产库存与市场趋势的深度分析
        </p>
      </div>

      {/* KPIs rapides */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="资产总额"
          value="¥122.6M"
          icon={<DollarSign className="h-6 w-6 text-green-600" />}
          description="本月增长 2.6%"
          color="bg-green-50"
        />
        <StatCard
          title="设备总数"
          value="1,247"
          icon={<Package className="h-6 w-6 text-blue-600" />}
          description="10月新增 17 台"
          color="bg-blue-50"
        />
        <StatCard
          title="使用率"
          value="97.5%"
          icon={<TrendingUp className="h-6 w-6 text-purple-600" />}
          description="在线运行设备"
          color="bg-purple-50"
        />
        <StatCard
          title="月度支出"
          value="¥52,400"
          icon={<Calendar className="h-6 w-6 text-orange-600" />}
          description="采购 + 维护费用"
          color="bg-orange-50"
        />
      </div>

      {/* Graphiques principaux */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="departments">部门分布</TabsTrigger>
          <TabsTrigger value="maintenance">维护记录</TabsTrigger>
          <TabsTrigger value="value">价值趋势</TabsTrigger>
        </TabsList>

        {/* Vue d'ensemble */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>库存演变</CardTitle>
                <CardDescription>
                  近 7 个月设备总量趋势
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyStockData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12 }}
                      stroke="#6b7280"
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      stroke="#6b7280"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="total" 
                      name="总量"
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: "#3b82f6", r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="disponible" 
                      name="可用"
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={{ fill: "#10b981", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>品类构成</CardTitle>
                <CardDescription>
                  按设备类型分布
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>设备状态监控</CardTitle>
              <CardDescription>
                月度状态演变趋势
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={monthlyStockData}>
                  <defs>
                    <linearGradient id="colorDisponibleOverview" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorReparationOverview" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorManquantOverview" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6b7280" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6b7280" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12 }}
                    stroke="#6b7280"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    stroke="#6b7280"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="disponible" 
                    name="可用"
                    stroke="#10b981" 
                    fillOpacity={1} 
                    fill="url(#colorDisponibleOverview)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="reparation" 
                    name="维修中"
                    stroke="#ef4444" 
                    fillOpacity={1} 
                    fill="url(#colorReparationOverview)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="manquant" 
                    name="缺失"
                    stroke="#6b7280" 
                    fillOpacity={1} 
                    fill="url(#colorManquantOverview)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Départements */}
        <TabsContent value="departments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>部门设备量</CardTitle>
                <CardDescription>
                  各部门分配的设备总数
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }}
                      stroke="#6b7280"
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      stroke="#6b7280"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="equipments" 
                      name="设备数量"
                      fill="#3b82f6" 
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>部门资产价值</CardTitle>
                <CardDescription>
                  各部门设备总价值 (¥)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={departmentData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      type="number" 
                      tick={{ fontSize: 12 }}
                      stroke="#6b7280"
                    />
                    <YAxis 
                      dataKey="name" 
                      type="category"
                      tick={{ fontSize: 12 }}
                      stroke="#6b7280"
                      width={80}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="value" 
                      name="价值 (¥)"
                      fill="#10b981" 
                      radius={[0, 8, 8, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>部门对比分析</CardTitle>
              <CardDescription>
                数量与价值的综合对比
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    stroke="#6b7280"
                  />
                  <YAxis 
                    yAxisId="left"
                    tick={{ fontSize: 12 }}
                    stroke="#6b7280"
                  />
                  <YAxis 
                    yAxisId="right" 
                    orientation="right"
                    tick={{ fontSize: 12 }}
                    stroke="#6b7280"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    yAxisId="left"
                    dataKey="equipments" 
                    name="设备数量"
                    fill="#3b82f6" 
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar 
                    yAxisId="right"
                    dataKey="value" 
                    name="价值 (¥)"
                    fill="#10b981" 
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Maintenance */}
        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>采购与维修</CardTitle>
              <CardDescription>
                月度采购及维护活动
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={maintenanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12 }}
                    stroke="#6b7280"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    stroke="#6b7280"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="achats" 
                    name="采购"
                    fill="#3b82f6" 
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar 
                    dataKey="reparations" 
                    name="维修"
                    fill="#ef4444" 
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>维护成本演变</CardTitle>
              <CardDescription>
                采购与维护费用的月度趋势
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={maintenanceData}>
                  <defs>
                    <linearGradient id="colorCout" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12 }}
                    stroke="#6b7280"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    stroke="#6b7280"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="cout" 
                    name="总计 (¥)"
                    stroke="#8b5cf6" 
                    fillOpacity={1} 
                    fill="url(#colorCout)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Valeur */}
        <TabsContent value="value" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>价值演变</CardTitle>
              <CardDescription>
                库存总额与已折旧价值趋势
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={valueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12 }}
                    stroke="#6b7280"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    stroke="#6b7280"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="valeurTotale" 
                    name="资产总额 (¥)"
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: "#10b981", r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amortissement" 
                    name="折旧价值 (¥)"
                    stroke="#f97316" 
                    strokeWidth={3}
                    dot={{ fill: "#f97316", r: 5 }}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
