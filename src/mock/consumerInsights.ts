import type {
  ConsumerAgeGenderRow,
  ConsumerBundleRow,
  ConsumerChannelRow,
  ConsumerDecisionFunnelStage,
  ConsumerDriverRow,
  ConsumerOccupationRow,
  ConsumerReplacementCycleRow,
  ConsumerReplacementFactorRow,
  ConsumerSegmentRow,
  ConsumerSentimentWordRow,
  ConsumerUsageRadarRow,
} from "../schemas/consumerInsights";

export const CONSUMER_PRODUCTS = ["All Products", "ThinkBook", "IdeaPad", "Legion", "ThinkPad", "Yoga"] as const;
export const CONSUMER_REGIONS = ["All Regions", "East China", "South China", "North China", "Central China", "Southwest", "Northeast", "Northwest"] as const;
export const CONSUMER_YEARS = ["2025", "2024"] as const;
export const CONSUMER_MONTHS_BY_YEAR: Record<string, string[]> = {
  "2025": ["04", "03", "02", "01"],
  "2024": ["12", "11", "10", "09", "08", "07", "06", "05", "04", "03", "02", "01"],
};

export const CONSUMER_COLOR_PALETTE = ["#dc2626", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"] as const;

export const CONSUMER_AGE_DISTRIBUTION: ConsumerAgeGenderRow[] = [
  { age: "18-24", male: 1250, female: 980 },
  { age: "25-34", male: 2850, female: 2420 },
  { age: "35-44", male: 1980, female: 1650 },
  { age: "45-54", male: 850, female: 720 },
  { age: "55+", male: 420, female: 380 },
];

export const CONSUMER_OCCUPATION_DATA: ConsumerOccupationRow[] = [
  { name: "Students", value: 2850, percentage: 28.5 },
  { name: "Office Workers", value: 3420, percentage: 34.2 },
  { name: "Freelancers", value: 1280, percentage: 12.8 },
  { name: "Entrepreneurs", value: 980, percentage: 9.8 },
  { name: "Creatives", value: 850, percentage: 8.5 },
  { name: "Others", value: 620, percentage: 6.2 },
];

export const CONSUMER_USAGE_RADAR_DATA: ConsumerUsageRadarRow[] = [
  { subject: "Office & Productivity", Overall: 75, "High Value Customers": 90, "Growth Potential": 65, "Loyal Customers": 85, "At Risk": 50 },
  { subject: "Gaming & Esports", Overall: 60, "High Value Customers": 85, "Growth Potential": 80, "Loyal Customers": 40, "At Risk": 30 },
  { subject: "Content Creation", Overall: 50, "High Value Customers": 80, "Growth Potential": 45, "Loyal Customers": 55, "At Risk": 20 },
  { subject: "Study & Learning", Overall: 65, "High Value Customers": 40, "Growth Potential": 90, "Loyal Customers": 60, "At Risk": 55 },
  { subject: "Entertainment", Overall: 70, "High Value Customers": 50, "Growth Potential": 70, "Loyal Customers": 80, "At Risk": 90 },
];

export const CONSUMER_SEGMENTS: ConsumerSegmentRow[] = [
  { segment: "High Value Customers", count: 1850, percentage: 18.5, avgSpend: "$3,250", frequency: "4.2 times", recency: "< 3 months", color: "#dc2626", description: "Frequent buyers with high spending" },
  { segment: "Growth Potential", count: 2420, percentage: 24.2, avgSpend: "$1,850", frequency: "2.1 times", recency: "3-6 months", color: "#3b82f6", description: "Recent buyers, potential for growth" },
  { segment: "Loyal Customers", count: 3280, percentage: 32.8, avgSpend: "$1,420", frequency: "3.5 times", recency: "6-12 months", color: "#10b981", description: "Stable repeat customers" },
  { segment: "At Risk", count: 2450, percentage: 24.5, avgSpend: "$980", frequency: "1.2 times", recency: "> 12 months", color: "#f59e0b", description: "Risk of churn, need reactivation" },
];

export const CONSUMER_TOP_BUNDLES: ConsumerBundleRow[] = [
  { bundle: "Laptop + Mouse + Keyboard", sales: 3420, revenue: "$2.8M", percentage: 34.2 },
  { bundle: "Laptop + Docking Station", sales: 2850, revenue: "$3.2M", percentage: 28.5 },
  { bundle: "Laptop + Monitor", sales: 2180, revenue: "$4.1M", percentage: 21.8 },
  { bundle: "Laptop + Extended Warranty", sales: 1650, revenue: "$1.2M", percentage: 16.5 },
  { bundle: "Laptop + Software Bundle", sales: 980, revenue: "$0.8M", percentage: 9.8 },
];

export const CONSUMER_POSITIVE_DRIVERS: ConsumerDriverRow[] = [
  { factor: "Performance", mentions: 4850, sentiment: 95 },
  { factor: "Build Quality", mentions: 3920, sentiment: 92 },
  { factor: "Value for Money", mentions: 3680, sentiment: 88 },
  { factor: "Battery Life", mentions: 3250, sentiment: 85 },
  { factor: "Brand Trust", mentions: 2980, sentiment: 90 },
  { factor: "After-sales Service", mentions: 2650, sentiment: 87 },
];

export const CONSUMER_NEGATIVE_DRIVERS: ConsumerDriverRow[] = [
  { factor: "Price Too High", mentions: 1850, sentiment: -65 },
  { factor: "Weight/Portability", mentions: 1420, sentiment: -58 },
  { factor: "Limited Ports", mentions: 980, sentiment: -52 },
  { factor: "Fan Noise", mentions: 850, sentiment: -48 },
  { factor: "Screen Brightness", mentions: 680, sentiment: -45 },
];

export const CONSUMER_DECISION_FUNNEL: ConsumerDecisionFunnelStage[] = [
  { stage: "Awareness", value: 10000, conversion: 100 },
  { stage: "Interest", value: 7500, conversion: 75 },
  { stage: "Consideration", value: 5200, conversion: 52 },
  { stage: "Intent", value: 3800, conversion: 38 },
  { stage: "Purchase", value: 2500, conversion: 25 },
];

export const CONSUMER_ONLINE_CHANNELS: ConsumerChannelRow[] = [
  { name: "JD.com", value: 42.5, traffic: "2.8M", conversion: "3.2%", aov: "$1,250", revenue: "$112M" },
  { name: "Tmall", value: 28.8, traffic: "2.1M", conversion: "2.8%", aov: "$1,180", revenue: "$69M" },
  { name: "Official Website", value: 15.2, traffic: "850K", conversion: "4.5%", aov: "$1,420", revenue: "$54M" },
  { name: "Pinduoduo", value: 8.5, traffic: "1.2M", conversion: "1.8%", aov: "$980", revenue: "$21M" },
  { name: "Others", value: 5.0, traffic: "420K", conversion: "2.2%", aov: "$1,050", revenue: "$10M" },
];

export const CONSUMER_OFFLINE_CHANNELS: ConsumerChannelRow[] = [
  { name: "Authorized Dealers", value: 58.5, traffic: "N/A", conversion: "12.5%", aov: "$1,580", revenue: "$185M" },
  { name: "Retail Stores", value: 25.8, traffic: "N/A", conversion: "8.2%", aov: "$1,350", revenue: "$82M" },
  { name: "Electronics Markets", value: 10.2, traffic: "N/A", conversion: "6.5%", aov: "$1,180", revenue: "$32M" },
  { name: "Brand Experience Centers", value: 5.5, traffic: "N/A", conversion: "15.8%", aov: "$2,150", revenue: "$17M" },
];

export const CONSUMER_REPLACEMENT_CYCLE: ConsumerReplacementCycleRow[] = [
  { years: "< 2 years", percentage: 12.5, count: 1250 },
  { years: "2-3 years", percentage: 35.8, count: 3580 },
  { years: "3-4 years", percentage: 28.2, count: 2820 },
  { years: "4-5 years", percentage: 15.5, count: 1550 },
  { years: "> 5 years", percentage: 8.0, count: 800 },
];

export const CONSUMER_REPLACEMENT_FACTORS: ConsumerReplacementFactorRow[] = [
  { factor: "Performance Upgrade", score: 92 },
  { factor: "Hardware Failure", score: 78 },
  { factor: "New Features", score: 85 },
  { factor: "Work/Study Needs", score: 88 },
  { factor: "Gaming Requirements", score: 82 },
  { factor: "Design Preferences", score: 68 },
];

export const CONSUMER_SENTIMENT_WORDS: ConsumerSentimentWordRow[] = [
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

export const CONSUMER_REPLACEMENT_DRIVER_DEFINITIONS: Record<string, string> = {
  "Performance Upgrade": "Shift towards higher processing power and AI capabilities.",
  "Hardware Failure": "Lifecycle end due to physical component degradation.",
  "New Features": "Adoption of innovative form factors and OLED displays.",
  "Work/Study Needs": "Demand for improved productivity and collaboration tools.",
  "Gaming Requirements": "Evolving need for higher refresh rates and GPU power.",
  "Design Preferences": "Aesthetic shifts towards ultra-slim and premium finishes.",
};
