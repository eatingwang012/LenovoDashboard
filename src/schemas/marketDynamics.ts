export interface MarketDynamicsFilters {
  selectedBrand: string;
  startYear: string;
  startMonth: string;
  endYear: string;
  endMonth: string;
}

export interface MarketTimelineEvent {
  id: number;
  brand: string;
  product: string;
  monthOffset: number;
  specs: string;
  pricing: string;
  sellingPoints: string;
  type: "product" | "supply";
  date: string;
  link: string;
}

export interface SupplyPriceTrendPoint {
  period: string;
  actual?: number;
  forecast?: number;
}

export interface SupplyCategory {
  id: string;
  name: string;
  icon: string;
  metric: string;
  past3m: string;
  future3m: string;
  trend: "Rising" | "Falling" | "Stable";
  driver: string;
  priceTrend: SupplyPriceTrendPoint[];
}
