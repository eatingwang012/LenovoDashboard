import {
  SHIPMENT_AUR_SEGMENTS,
  SHIPMENT_BRANDS,
  SHIPMENT_MODEL_MAP,
  SHIPMENT_RAW_DATA,
  SHIPMENT_REGIONS,
} from "../mock/shipmentLandscape";
import type {
  RegionalPerformanceCard,
  ShipmentLandscapeFilters,
  ShipmentPriceBandRow,
  ShipmentSummaryMetrics,
  ShipmentTreemapNode,
} from "../schemas/shipmentLandscape";

export function getShipmentAvailableModels(selectedBrands: string[]): string[] {
  const models: string[] = ["All Models"];

  selectedBrands.forEach((brand) => {
    models.push(...(SHIPMENT_MODEL_MAP[brand] ?? []));
  });

  return Array.from(new Set(models));
}

export function getShipmentFilteredData(filters: ShipmentLandscapeFilters) {
  return SHIPMENT_RAW_DATA.filter(
    (record) =>
      filters.selectedBrands.includes(record.brand) &&
      (filters.selectedModel === "All Models" || record.model === filters.selectedModel) &&
      (filters.selectedQuarter === "All Time" || record.quarter === filters.selectedQuarter) &&
      (filters.selectedRegion === "Global" || record.region === filters.selectedRegion) &&
      (filters.selectedPriceSegment === "All Segments" || record.aur === filters.selectedPriceSegment),
  );
}

export function getShipmentMarketContextTotal(filters: ShipmentLandscapeFilters): number {
  return SHIPMENT_RAW_DATA.filter(
    (record) =>
      (filters.selectedQuarter === "All Time" || record.quarter === filters.selectedQuarter) &&
      (filters.selectedRegion === "Global" || record.region === filters.selectedRegion),
  ).reduce((sum, record) => sum + record.volume, 0);
}

export function getShipmentSummaryMetrics(
  filters: ShipmentLandscapeFilters,
  marketContextTotal: number,
): ShipmentSummaryMetrics {
  const filteredData = getShipmentFilteredData(filters);
  const current = filteredData.reduce((sum, record) => sum + record.volume, 0);
  const prevYear = filteredData.reduce((sum, record) => sum + record.prevYearVolume, 0);
  const prevQuarter = filteredData.reduce((sum, record) => sum + record.prevQuarterVolume, 0);

  return {
    current,
    yoy: prevYear > 0 ? ((current - prevYear) / prevYear) * 100 : 0,
    qoq: prevQuarter > 0 ? ((current - prevQuarter) / prevQuarter) * 100 : 0,
    brandShares: filters.selectedBrands.map((brand) => {
      const brandData = filteredData.filter((record) => record.brand === brand);
      const volume = brandData.reduce((sum, record) => sum + record.volume, 0);
      const pYear = brandData.reduce((sum, record) => sum + record.prevYearVolume, 0);
      const pQuarter = brandData.reduce((sum, record) => sum + record.prevQuarterVolume, 0);

      return {
        brand,
        volume,
        share: marketContextTotal > 0 ? (volume / marketContextTotal) * 100 : 0,
        yoy: pYear > 0 ? ((volume - pYear) / pYear) * 100 : 0,
        qoq: pQuarter > 0 ? ((volume - pQuarter) / pQuarter) * 100 : 0,
      };
    }),
  };
}

export function getShipmentTreemapData(filters: ShipmentLandscapeFilters): ShipmentTreemapNode[] {
  const filteredData = getShipmentFilteredData(filters);
  const brandsToUse = filters.drillDownBrand ? [filters.drillDownBrand] : filters.selectedBrands;

  return brandsToUse
    .map((brand) => ({
      name: brand,
      children: (SHIPMENT_MODEL_MAP[brand] ?? [])
        .map((model) => {
          const volume = filteredData
            .filter((record) => record.brand === brand && record.model === model)
            .reduce((sum, record) => sum + record.volume, 0);

          return { name: model, size: volume, brand };
        })
        .filter((item) => item.size > 0),
    }))
    .filter((item) => item.children.length > 0);
}

export function getShipmentPriceData(filters: ShipmentLandscapeFilters): ShipmentPriceBandRow[] {
  const filteredData = getShipmentFilteredData(filters);

  return SHIPMENT_AUR_SEGMENTS.map((aur) => {
    const row: ShipmentPriceBandRow = { aur };

    filters.selectedBrands.forEach((brand) => {
      row[brand] = filteredData
        .filter((record) => record.brand === brand && record.aur === aur)
        .reduce((sum, record) => sum + record.volume, 0);
    });

    return row;
  });
}

export function getShipmentRegionalPerformance(selectedQuarter: string): RegionalPerformanceCard[] {
  return SHIPMENT_REGIONS.filter((region) => region !== "Global").map((region) => {
    const regionData = SHIPMENT_RAW_DATA.filter(
      (record) => record.region === region && record.quarter === selectedQuarter,
    );
    const totalRegionVolume = regionData.reduce((sum, record) => sum + record.volume, 0);

    const brands = SHIPMENT_BRANDS.map((brand) => {
      const volume = regionData
        .filter((record) => record.brand === brand)
        .reduce((sum, record) => sum + record.volume, 0);

      return {
        brand,
        volume,
        share: totalRegionVolume > 0 ? (volume / totalRegionVolume) * 100 : 0,
      };
    });

    const sorted = [...brands].sort((left, right) => right.share - left.share);
    const lenovo = brands.find((item) => item.brand === "Lenovo");
    const leader = sorted[0];
    const isLenovoLeader = leader.brand === "Lenovo";
    const lenovoGap = isLenovoLeader
      ? leader.share - (sorted[1]?.share ?? 0)
      : leader.share - (lenovo?.share ?? 0);

    return {
      region,
      brands,
      leader: leader.brand,
      lenovoGap,
      isLenovoLeader,
    };
  });
}
