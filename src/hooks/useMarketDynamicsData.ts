import { useMemo, useState } from "react";
import { MARKET_DYNAMICS_BRANDS, SUPPLY_CATEGORIES } from "../mock/marketDynamics";
import {
  getActiveSupplyCategory,
  getActiveTimelineEvent,
  getMarketDynamicsViewData,
} from "../services/marketDynamicsService";

export function useMarketDynamicsData() {
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [startYear, setStartYear] = useState("2024");
  const [startMonth, setStartMonth] = useState("10");
  const [endYear, setEndYear] = useState("2026");
  const [endMonth, setEndMonth] = useState("12");
  const [activeEventId, setActiveEventId] = useState<number | null>(3);
  const [activeSupplyId, setActiveSupplyId] = useState("cpu");

  const viewData = useMemo(
    () =>
      getMarketDynamicsViewData({
        selectedBrand,
        startYear,
        startMonth,
        endYear,
        endMonth,
      }),
    [selectedBrand, startYear, startMonth, endYear, endMonth],
  );

  const activeEvent = useMemo(() => getActiveTimelineEvent(activeEventId), [activeEventId]);
  const activeSupply = useMemo(() => getActiveSupplyCategory(activeSupplyId), [activeSupplyId]);

  return {
    brands: [...MARKET_DYNAMICS_BRANDS],
    supplyCategories: SUPPLY_CATEGORIES,
    selectedBrand,
    startYear,
    startMonth,
    endYear,
    endMonth,
    activeEventId,
    activeSupplyId,
    ...viewData,
    activeEvent,
    activeSupply,
    setSelectedBrand,
    setStartYear,
    setStartMonth,
    setEndYear,
    setEndMonth,
    setActiveEventId,
    setActiveSupplyId,
  };
}
