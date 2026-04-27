export interface ShipmentLandscapeFilters {
  selectedBrands: string[];
  selectedModel: string;
  selectedQuarter: string;
  selectedRegion: string;
  selectedPriceSegment: string;
  drillDownBrand: string | null;
}

/**
 * Raw shipment grain used by the page.
 * One row represents one brand-model-region-quarter combination.
 */
export interface ShipmentRecord {
  quarter: string;
  brand: string;
  model: string;
  region: string;
  type: string;
  aur: string;
  volume: number;
  prevYearVolume: number;
  prevQuarterVolume: number;
}

export interface ShipmentBrandSummary {
  brand: string;
  volume: number;
  share: number;
  yoy: number;
  qoq: number;
}

export interface ShipmentSummaryMetrics {
  current: number;
  yoy: number;
  qoq: number;
  brandShares: ShipmentBrandSummary[];
}

export interface ShipmentTreemapLeaf {
  name: string;
  size: number;
  brand: string;
}

export interface ShipmentTreemapNode {
  name: string;
  children: ShipmentTreemapLeaf[];
}

export interface ShipmentPriceBandRow {
  aur: string;
  [brand: string]: string | number;
}

export interface RegionalPerformanceBrand {
  brand: string;
  volume: number;
  share: number;
}

export interface RegionalPerformanceCard {
  region: string;
  brands: RegionalPerformanceBrand[];
  leader: string;
  lenovoGap: number;
  isLenovoLeader: boolean;
}
