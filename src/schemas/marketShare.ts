export interface MarketShareFilters {
  selectedQuarter: string;
  selectedRegionEquilibrium: string;
}

/**
 * Raw market share row at quarter-brand-region grain.
 */
export interface ShareHistoryRecord {
  quarter: string;
  brand: string;
  region: string;
  share: number;
}

export interface ShareSnapshotItem {
  name: string;
  value: number;
  change: number;
}

export interface SegmentHotmapRow {
  group: string;
  sub: string;
  lenovoShare: number;
  growth: number;
  intensity: number;
}

export interface RelativeMarketShareMetrics {
  ratio: number;
  leaderName?: string;
  status: string;
  description?: string;
}
