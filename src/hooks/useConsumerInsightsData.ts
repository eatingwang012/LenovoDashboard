import { useMemo, useState } from "react";
import {
  CONSUMER_COLOR_PALETTE,
  CONSUMER_MONTHS_BY_YEAR,
  CONSUMER_PRODUCTS,
  CONSUMER_REGIONS,
  CONSUMER_REPLACEMENT_DRIVER_DEFINITIONS,
  CONSUMER_USAGE_RADAR_DATA,
  CONSUMER_YEARS,
} from "../mock/consumerInsights";
import { deriveConsumerInsightsData } from "../services/consumerInsightsService";

export function useConsumerInsightsData() {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("06");
  const [selectedProduct, setSelectedProduct] = useState("All Products");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  const derivedData = useMemo(
    () => deriveConsumerInsightsData({ selectedYear, selectedMonth, selectedProduct, selectedRegion }),
    [selectedYear, selectedMonth, selectedProduct, selectedRegion],
  );
  const activeSegmentData = useMemo(
    () => (hoveredSegment ? derivedData.userSegments.find((item) => item.segment === hoveredSegment) ?? null : null),
    [hoveredSegment, derivedData.userSegments],
  );

  return {
    selectedYear,
    selectedMonth,
    selectedProduct,
    selectedRegion,
    hoveredSegment,
    years: [...CONSUMER_YEARS],
    monthsByYear: CONSUMER_MONTHS_BY_YEAR,
    products: [...CONSUMER_PRODUCTS],
    regions: [...CONSUMER_REGIONS],
    colors: [...CONSUMER_COLOR_PALETTE],
    usageRadarData: CONSUMER_USAGE_RADAR_DATA,
    replacementDriverDefinitions: CONSUMER_REPLACEMENT_DRIVER_DEFINITIONS,
    derivedData,
    activeSegmentData,
    setSelectedYear,
    setSelectedMonth,
    setSelectedProduct,
    setSelectedRegion,
    setHoveredSegment,
  };
}
