import {
  PRODUCT_CHANNEL_SUMMARY,
  PRODUCT_CHANNEL_WEIGHTS,
  PRODUCT_COST_DATA,
  PRODUCT_FILTER_MONTHS_BY_YEAR,
  PRODUCT_KPI_CARDS,
  PRODUCT_PERFORMANCE_TRENDS,
  PRODUCT_PROFIT_FUNNEL_DATA,
  PRODUCT_SERIES_OPTIONS,
  PRODUCT_TOP_ITEMS,
} from "../mock/productBusiness";
import type { ProductBottomKpi, ProductBusinessFilters } from "../schemas/productBusiness";

export function deriveProductBusinessData(filters: ProductBusinessFilters) {
  const seriesFactor = filters.selectedSeries.length / PRODUCT_SERIES_OPTIONS.length;
  const monthIndex = parseInt(filters.selectedMonth, 10);
  const monthFluctuation = 0.85 + Math.sin(monthIndex * 0.5) * 0.15;
  const baseFactor = seriesFactor * monthFluctuation * (filters.selectedYear === "2025" ? 1.05 : 0.9);

  const trends = PRODUCT_PERFORMANCE_TRENDS.map((item) => ({
    ...item,
    shipment: Number((item.shipment * baseFactor).toFixed(2)),
    rev: Number((item.rev * baseFactor).toFixed(1)),
    aur: Math.round(item.aur * (0.95 + seriesFactor * 0.1)),
    margin: Number((item.margin * (0.98 + (monthIndex % 4) * 0.01)).toFixed(1)),
  }));

  const topProducts = PRODUCT_TOP_ITEMS.filter((item) => filters.selectedSeries.includes(item.series)).map((item) => ({
    ...item,
    sales: `${Math.round(parseInt(item.sales.replace("K", ""), 10) * baseFactor)}K`,
  }));

  const cost = PRODUCT_COST_DATA.map((item) => ({
    ...item,
    value:
      item.name === "Components"
        ? item.value + (1 - seriesFactor) * 2
        : item.value - (1 - seriesFactor) * 0.5,
  }));

  const funnel = PRODUCT_PROFIT_FUNNEL_DATA.map((item) => ({
    ...item,
    value: Number((item.value * baseFactor).toFixed(2)),
  }));

  const channelSummary = PRODUCT_CHANNEL_SUMMARY.map((item) => ({
    ...item,
    value: Number((item.value * baseFactor).toFixed(1)),
    rev: Number((item.rev * baseFactor).toFixed(1)),
  }));

  const channelDetailBase = PRODUCT_CHANNEL_WEIGHTS.map((item) => ({
    ...item,
    value: Math.round(item.value * (0.8 + seriesFactor * 0.4)),
  }));

  const channelWeightTotal = channelDetailBase.reduce((sum, item) => sum + item.value, 0);
  const channelDetail = channelDetailBase.map((item) => ({
    ...item,
    value: Math.round((item.value / channelWeightTotal) * 100),
  }));

  const bottomKPIs: ProductBottomKpi[] = [
    { label: "E-com Avg Retail", value: `$${Math.round(902 * (0.98 + baseFactor * 0.04))}`, yoy: "+4.2%", icon: "ShoppingBag", color: "text-blue-600", desc: "Online direct AUR performance" },
    { label: "Retail Avg Retail", value: `$${Math.round(895 * (0.97 + baseFactor * 0.06))}`, yoy: "-2.5%", icon: "Store", color: "text-amber-600", desc: "Offline partner network AUR" },
    { label: "Online Efficiency", value: `${(19.5 * (0.99 + monthIndex * 0.001)).toFixed(1)}%`, yoy: "+1.2pct", icon: "Percent", color: "text-emerald-600", desc: "Gross profit margin online" },
    { label: "Partner Profitability", value: `${(17.1 * (0.98 + monthIndex * 0.002)).toFixed(1)}%`, yoy: "-0.5pct", icon: "Percent", color: "text-rose-600", desc: "Gross profit margin offline" },
  ];

  return {
    kpiCards: PRODUCT_KPI_CARDS,
    years: [...Object.keys(PRODUCT_FILTER_MONTHS_BY_YEAR)],
    monthsByYear: PRODUCT_FILTER_MONTHS_BY_YEAR,
    trends,
    topProducts,
    cost,
    funnel,
    channelSummary,
    channelDetail,
    bottomKPIs,
  };
}
