export interface ConsumerInsightsFilters {
  selectedYear: string;
  selectedMonth: string;
  selectedProduct: string;
  selectedRegion: string;
}

export interface ConsumerAgeGenderRow {
  age: string;
  male: number;
  female: number;
}

export interface ConsumerOccupationRow {
  name: string;
  value: number;
  percentage: number;
}

export interface ConsumerUsageRadarRow {
  subject: string;
  Overall: number;
  "High Value Customers": number;
  "Growth Potential": number;
  "Loyal Customers": number;
  "At Risk": number;
}

export interface ConsumerSegmentRow {
  segment: string;
  count: number;
  percentage: number;
  avgSpend: string;
  frequency: string;
  recency: string;
  color: string;
  description: string;
}

export interface ConsumerBundleRow {
  bundle: string;
  sales: number;
  revenue: string;
  percentage: number;
}

export interface ConsumerDriverRow {
  factor: string;
  mentions: number;
  sentiment: number;
}

export interface ConsumerDecisionFunnelStage {
  stage: string;
  value: number;
  conversion: number;
}

export interface ConsumerChannelRow {
  name: string;
  value: number;
  traffic: string;
  conversion: string;
  aov: string;
  revenue: string;
}

export interface ConsumerReplacementCycleRow {
  years: string;
  percentage: number;
  count: number;
}

export interface ConsumerReplacementFactorRow {
  factor: string;
  score: number;
}

export interface ConsumerSentimentWordRow {
  word: string;
  sentiment: "positive" | "negative";
  value: number;
}
