import { MARKET_TIMELINE_EVENTS, SUPPLY_CATEGORIES } from "../mock/marketDynamics";
import type { MarketDynamicsFilters } from "../schemas/marketDynamics";

export function getSelectedRange(filters: MarketDynamicsFilters): [number, number] {
  return [
    (parseInt(filters.startYear, 10) - 2026) * 12 + (parseInt(filters.startMonth, 10) - 4),
    (parseInt(filters.endYear, 10) - 2026) * 12 + (parseInt(filters.endMonth, 10) - 4),
  ];
}

export function getFilteredTimelineEvents(filters: MarketDynamicsFilters) {
  const selectedRange = getSelectedRange(filters);

  return MARKET_TIMELINE_EVENTS.filter((event) => {
    const matchBrand =
      filters.selectedBrand === "All" || event.brand === filters.selectedBrand || event.brand === "Supply Chain";
    const matchRange = event.monthOffset >= selectedRange[0] && event.monthOffset <= selectedRange[1];

    return matchBrand && matchRange;
  });
}

export function getMarketDynamicsViewData(filters: MarketDynamicsFilters) {
  const selectedRange = getSelectedRange(filters);
  const filteredEvents = getFilteredTimelineEvents(filters);

  return {
    selectedRange,
    filteredEvents,
    productEvents: filteredEvents.filter((event) => event.type === "product"),
    supplyEvents: filteredEvents.filter((event) => event.type === "supply"),
  };
}

export function getActiveTimelineEvent(activeEventId: number | null) {
  return MARKET_TIMELINE_EVENTS.find((event) => event.id === activeEventId) ?? null;
}

export function getActiveSupplyCategory(activeSupplyId: string) {
  return SUPPLY_CATEGORIES.find((item) => item.id === activeSupplyId) ?? null;
}
