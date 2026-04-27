import { useMemo, useState } from "react";
import {
  getShipmentAvailableModels,
  getShipmentFilteredData,
  getShipmentMarketContextTotal,
  getShipmentPriceData,
  getShipmentRegionalPerformance,
  getShipmentSummaryMetrics,
  getShipmentTreemapData,
} from "../services/shipmentLandscapeService";

export function useShipmentLandscapeData() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>(["Lenovo", "HP", "Dell", "Apple"]);
  const [selectedModel, setSelectedModel] = useState("All Models");
  const [selectedQuarter, setSelectedQuarter] = useState("2025-Q1");
  const [selectedRegion, setSelectedRegion] = useState("Global");
  const [selectedPriceSegment, setSelectedPriceSegment] = useState("All Segments");
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
  const [drillDownBrand, setDrillDownBrand] = useState<string | null>(null);

  const filters = useMemo(
    () => ({
      selectedBrands,
      selectedModel,
      selectedQuarter,
      selectedRegion,
      selectedPriceSegment,
      drillDownBrand,
    }),
    [selectedBrands, selectedModel, selectedQuarter, selectedRegion, selectedPriceSegment, drillDownBrand],
  );

  const filteredData = useMemo(() => getShipmentFilteredData(filters), [filters]);
  const marketContextTotal = useMemo(() => getShipmentMarketContextTotal(filters), [filters]);
  const availableModels = useMemo(() => getShipmentAvailableModels(selectedBrands), [selectedBrands]);
  const summaryMetrics = useMemo(
    () => getShipmentSummaryMetrics(filters, marketContextTotal),
    [filters, marketContextTotal],
  );
  const treemapData = useMemo(() => getShipmentTreemapData(filters), [filters]);
  const priceData = useMemo(() => getShipmentPriceData(filters), [filters]);
  const regionalPerformance = useMemo(
    () => getShipmentRegionalPerformance(selectedQuarter),
    [selectedQuarter],
  );

  const toggleBrand = (brand: string) => {
    setSelectedBrands((previous) =>
      previous.includes(brand) ? previous.filter((item) => item !== brand) : [...previous, brand],
    );
  };

  return {
    selectedBrands,
    selectedModel,
    selectedQuarter,
    selectedRegion,
    selectedPriceSegment,
    hoveredBrand,
    drillDownBrand,
    filteredData,
    marketContextTotal,
    availableModels,
    summaryMetrics,
    treemapData,
    priceData,
    regionalPerformance,
    setSelectedModel,
    setSelectedQuarter,
    setSelectedRegion,
    setSelectedPriceSegment,
    setHoveredBrand,
    setDrillDownBrand,
    toggleBrand,
  };
}
