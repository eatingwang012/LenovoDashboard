import { useMemo, useState } from "react";
import {
  getMarketShareSegmentHotmapRows,
  getMarketShareSnapshot,
  getMarketShareTrendRows,
  getRelativeMarketShareMetrics,
} from "../services/marketShareService";

export function useMarketShareData() {
  const [selectedQuarter, setSelectedQuarter] = useState("2026-Q1");
  const [selectedRegionEquilibrium, setSelectedRegionEquilibrium] = useState("Global");
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);

  const currentSnapshotGlobal = useMemo(
    () => getMarketShareSnapshot(selectedQuarter, "Global"),
    [selectedQuarter],
  );
  const equilibriumSnapshot = useMemo(
    () => getMarketShareSnapshot(selectedQuarter, selectedRegionEquilibrium),
    [selectedQuarter, selectedRegionEquilibrium],
  );
  const rmsMetrics = useMemo(
    () => getRelativeMarketShareMetrics(currentSnapshotGlobal),
    [currentSnapshotGlobal],
  );
  const trendsChartData = useMemo(() => getMarketShareTrendRows(), []);
  const segmentHotmapRows = useMemo(() => getMarketShareSegmentHotmapRows(), []);

  return {
    selectedQuarter,
    selectedRegionEquilibrium,
    hoveredBrand,
    currentSnapshotGlobal,
    equilibriumSnapshot,
    rmsMetrics,
    trendsChartData,
    segmentHotmapRows,
    setSelectedQuarter,
    setSelectedRegionEquilibrium,
    setHoveredBrand,
  };
}
