export interface MarketData {
  month: string;
  lenovo: number;
  apple: number;
  hp: number;
  dell: number;
  asus: number;
  others: number;
}

export interface ProductPerformance {
  month: string;
  shipment: number;
  revenue: number;
  profit: number;
  aur: number;
}

export interface SupplyChainNews {
  id: string;
  date: string;
  title: string;
  impact: 'low' | 'medium' | 'high';
  source: string;
  link: string;
}

export interface ConsumerInsight {
  id: string;
  platform: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  comment: string;
  date: string;
}

export interface ConsumerInsightTheme {
  theme: string;
  frequency: number;
  sentiment: number; // 0 to 1
  isNegative?: boolean;
}

export interface ConsumerPersona {
  segment: string;
  ageRange: string;
  occupation: string;
  lifestyle: string[];
}

export interface DemographicData {
  category: string;
  label: string;
  value: number;
}

export interface ChannelData {
  channel: string;
  share: number;
}

export interface SubBrandConsumerData {
  id: string; // Sub-brand name or 'all'
  persona: ConsumerPersona;
  demographics: DemographicData[];
  themes: ConsumerInsightTheme[];
  channels: ChannelData[];
}

export interface FunnelStep {
  stage: string;
  value: number;
  count: string;
  conversionRate: string;
}

export interface RFMLayer {
  name: string;
  count: number;
  percent: number;
  features: string;
  topCombination: string[];
}

export interface DetailedChannel {
  name: string;
  traffic: string;
  conversion: string;
  aur: string;
  revenueWeight: string;
}

export interface BrandLoyaltyFlow {
  source: string;
  target: string;
  value: number;
}

export interface TOCInsightData {
  demographics: {
    age: DemographicData[];
    gender: DemographicData[];
    occupation: DemographicData[];
    scenario: DemographicData[];
  };
  rfm: RFMLayer[];
  decisionFunnel: FunnelStep[];
  purchaseDrivers: {
    positive: ConsumerInsightTheme[];
    negative: ConsumerInsightTheme[];
  };
  channels: {
    online: DetailedChannel[];
    offline: DetailedChannel[];
  };
  loyalty: {
    avgCycle: number;
    factors: { theme: string; frequency: number }[];
    flows: BrandLoyaltyFlow[];
  };
}

export interface CompetitorMove {
  id: string;
  brand: string;
  product: string;
  event: string;
  date: string;
}
