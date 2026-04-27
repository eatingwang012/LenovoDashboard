export interface ProductBusinessFilters {
  selectedYear: string;
  selectedMonth: string;
  selectedSeries: string[];
}

export interface ProductKpiCard {
  title: string;
  value: string;
  unit: string;
  target?: string | number;
  current?: string | number;
  description?: string;
  yoy: string;
  qoq: string;
  isPositive: boolean;
  icon: string;
  color: string;
  bgColor: string;
  isCompletion?: boolean;
  completion?: number;
}

export interface ProductTrendPoint {
  month: string;
  shipment: number;
  rev: number;
  aur: number;
  margin: number;
}

export interface ProductCostRow {
  name: string;
  value: number;
  color: string;
}

export interface ProductFunnelRow {
  value: number;
  name: string;
  fill: string;
}

export interface ProductChannelSummaryRow {
  channel: string;
  value: number;
  rev: number;
  aur: number;
  margin: number;
  yoy: string;
  conv: string;
}

export interface ProductChannelWeightRow {
  name: string;
  value: number;
  color: string;
}

export interface ProductTopItem {
  name: string;
  series: string;
  sales: string;
  growth: string;
  price: string;
}

export interface ProductBottomKpi {
  label: string;
  value: string;
  yoy: string;
  icon: string;
  color: string;
  desc: string;
}
