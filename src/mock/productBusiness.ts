import type {
  ProductChannelSummaryRow,
  ProductChannelWeightRow,
  ProductCostRow,
  ProductFunnelRow,
  ProductKpiCard,
  ProductTopItem,
  ProductTrendPoint,
} from "../schemas/productBusiness";

export const PRODUCT_SERIES_OPTIONS = ["ThinkPad", "Yoga", "Legion", "ThinkBook", "Xiaoxin"] as const;
export const PRODUCT_FILTER_YEARS = ["2025", "2024"] as const;
export const PRODUCT_FILTER_MONTHS_BY_YEAR: Record<string, string[]> = {
  "2025": ["09", "08", "07", "06", "05", "04", "03", "02", "01"],
  "2024": ["12", "11", "10"],
};

/**
 * KPI cards are intentionally stored as raw business content so the page can
 * later swap them with an API payload without touching the presentational JSX.
 */
export const PRODUCT_KPI_CARDS: ProductKpiCard[] = [
  { title: "Target Completion Rate", value: "97.0%", unit: "%", target: "Annual target: 20M units", current: "YTD: 19.4M", description: "The percentage of shipment targets achieved for the current fiscal year.", yoy: "-0.5pct", qoq: "+1.2pct", isPositive: false, icon: "Target", color: "text-orange-600", bgColor: "bg-orange-50", isCompletion: true, completion: 97 },
  { title: "Shipment Volume", value: "19.4M", unit: "Units", target: 20000000, current: 19400000, yoy: "+10.2%", qoq: "+2.5%", isPositive: true, icon: "Laptop", color: "text-blue-600", bgColor: "bg-blue-50" },
  { title: "Total Revenue (REV)", value: "$17.4", unit: "B", target: 18000000000, current: 17400000000, yoy: "+11.0%", qoq: "+3.1%", isPositive: true, icon: "Wallet", color: "text-emerald-600", bgColor: "bg-emerald-50" },
  { title: "Avg. Unit Retail (AUR)", value: "$898", unit: "USD", yoy: "-6.8%", qoq: "-1.2%", isPositive: false, icon: "CreditCard", color: "text-amber-600", bgColor: "bg-amber-50" },
  { title: "Gross Margin", value: "18.2%", unit: "%", yoy: "+0.5pct", qoq: "+0.1pct", isPositive: true, icon: "Percent", color: "text-violet-600", bgColor: "bg-violet-50" },
  { title: "Net Profit", value: "$1.39", unit: "B", yoy: "+36.0%", qoq: "+5.2%", isPositive: true, icon: "TrendingUp", color: "text-rose-600", bgColor: "bg-rose-50" },
  { title: "Active SKUs", value: "248", unit: "Items", yoy: "+5", qoq: "+2", isPositive: true, icon: "Box", color: "text-slate-600", bgColor: "bg-slate-50" },
];

export const PRODUCT_PERFORMANCE_TRENDS: ProductTrendPoint[] = [
  { month: "24-Oct", shipment: 1.45, rev: 92, aur: 6340, margin: 17.8 },
  { month: "24-Nov", shipment: 1.58, rev: 101, aur: 6390, margin: 17.9 },
  { month: "24-Dec", shipment: 1.82, rev: 115, aur: 6320, margin: 18.1 },
  { month: "25-Jan", shipment: 1.52, rev: 95, aur: 6250, margin: 18.2 },
  { month: "25-Feb", shipment: 1.48, rev: 92, aur: 6215, margin: 18.0 },
  { month: "25-Mar", shipment: 1.65, rev: 103, aur: 6245, margin: 18.1 },
  { month: "25-Apr", shipment: 1.62, rev: 102, aur: 6300, margin: 18.3 },
  { month: "25-May", shipment: 1.70, rev: 108, aur: 6350, margin: 18.4 },
  { month: "25-Jun", shipment: 1.95, rev: 122, aur: 6255, margin: 18.2 },
  { month: "25-Jul", shipment: 1.68, rev: 104, aur: 6190, margin: 18.0 },
  { month: "25-Aug", shipment: 1.75, rev: 110, aur: 6285, margin: 18.1 },
  { month: "25-Sep", shipment: 1.94, rev: 121.9, aur: 6286, margin: 18.2 },
];

export const PRODUCT_COST_DATA: ProductCostRow[] = [
  { name: "Components", value: 72, color: "#ef4444" },
  { name: "Manufacturing", value: 10, color: "#3b82f6" },
  { name: "Marketing", value: 8, color: "#10b981" },
  { name: "R&D", value: 7, color: "#f59e0b" },
  { name: "Logistics", value: 3, color: "#6366f1" },
];

export const PRODUCT_PROFIT_FUNNEL_DATA: ProductFunnelRow[] = [
  { value: 121.9, name: "Revenue (REV)", fill: "#1e293b" },
  { value: 99.7, name: "COGS", fill: "#475569" },
  { value: 22.2, name: "Gross Profit (GP)", fill: "#dc2626" },
  { value: 12.5, name: "Expenses (Exp)", fill: "#f87171" },
  { value: 9.75, name: "Net Profit (NP)", fill: "#ef4444" },
];

export const PRODUCT_CHANNEL_SUMMARY: ProductChannelSummaryRow[] = [
  { channel: "Online Direct / E-com", value: 8.7, rev: 54.8, aur: 6300, margin: 19.5, yoy: "+14%", conv: "4.2%" },
  { channel: "Offline Retail / Agency", value: 10.7, rev: 67.1, aur: 6270, margin: 17.1, yoy: "+7%", conv: "12.5%" },
];

export const PRODUCT_CHANNEL_WEIGHTS: ProductChannelWeightRow[] = [
  { name: "JD.com", value: 35, color: "#ef4444" },
  { name: "Lenovo.com", value: 5, color: "#1e293b" },
  { name: "Tmall", value: 12, color: "#ff0036" },
  { name: "Retail Stores", value: 28, color: "#3b82f6" },
  { name: "Enterprise Procurement", value: 20, color: "#6366f1" },
];

export const PRODUCT_TOP_ITEMS: ProductTopItem[] = [
  { name: "ThinkPad X1 Carbon Gen 12", series: "ThinkPad", sales: "852K", growth: "+12%", price: "$1,399" },
  { name: "Legion Pro 7i Gen 9", series: "Legion", sales: "642K", growth: "+45%", price: "$2,299" },
  { name: "Xiaoxin Pro 16 AI", series: "Xiaoxin", sales: "520K", growth: "+22%", price: "$799" },
  { name: "ThinkBook 14p Gen 5", series: "ThinkBook", sales: "428K", growth: "+18%", price: "$749" },
  { name: "Yoga Book 9i", series: "Yoga", sales: "156K", growth: "+35%", price: "$1,999" },
];
