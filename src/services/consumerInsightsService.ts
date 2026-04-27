import {
  CONSUMER_AGE_DISTRIBUTION,
  CONSUMER_DECISION_FUNNEL,
  CONSUMER_NEGATIVE_DRIVERS,
  CONSUMER_OCCUPATION_DATA,
  CONSUMER_OFFLINE_CHANNELS,
  CONSUMER_ONLINE_CHANNELS,
  CONSUMER_POSITIVE_DRIVERS,
  CONSUMER_PRODUCTS,
  CONSUMER_REGIONS,
  CONSUMER_REPLACEMENT_CYCLE,
  CONSUMER_REPLACEMENT_FACTORS,
  CONSUMER_SEGMENTS,
  CONSUMER_SENTIMENT_WORDS,
  CONSUMER_TOP_BUNDLES,
} from "../mock/consumerInsights";
import type { ConsumerInsightsFilters } from "../schemas/consumerInsights";

function scaleRevenue(value: string, factor: number): string {
  return `$${Math.round(parseInt(value.replace(/[$,M]/g, ""), 10) * factor)}M`;
}

export function deriveConsumerInsightsData(filters: ConsumerInsightsFilters) {
  const monthNum = parseInt(filters.selectedMonth, 10);
  const timeFactor = (filters.selectedYear === "2025" ? 1.1 : 0.9) * (0.9 + (monthNum / 12) * 0.2);
  const productFactor = filters.selectedProduct === "All Products" ? 1 : 0.4;
  const regionFactor = filters.selectedRegion === "All Regions" ? 1 : 0.15;
  const combinedFactor = timeFactor * productFactor * regionFactor;

  const decisionFunnel = CONSUMER_DECISION_FUNNEL.map((stage) => ({
    ...stage,
    value: Math.max(0, Math.round(stage.value * combinedFactor)),
  }));

  return {
    combinedFactor,
    ageDistribution: CONSUMER_AGE_DISTRIBUTION.map((item) => ({
      ...item,
      male: Math.round(item.male * combinedFactor),
      female: Math.round(item.female * combinedFactor),
    })),
    occupationData: CONSUMER_OCCUPATION_DATA.map((item) => ({
      ...item,
      value: Math.round(item.value * combinedFactor),
    })),
    userSegments: CONSUMER_SEGMENTS.map((item) => ({
      ...item,
      count: Math.round(item.count * combinedFactor),
      avgSpend: `$${Math.round(parseInt(item.avgSpend.replace(/[$,]/g, ""), 10) * (filters.selectedProduct === "Legion" ? 1.2 : 0.95)).toLocaleString()}`,
    })),
    topBundles: CONSUMER_TOP_BUNDLES.map((item) => ({
      ...item,
      sales: Math.round(item.sales * combinedFactor),
    })),
    decisionFunnel,
    onlineChannels: CONSUMER_ONLINE_CHANNELS.map((item) => ({
      ...item,
      revenue: scaleRevenue(item.revenue, combinedFactor),
    })),
    offlineChannels: CONSUMER_OFFLINE_CHANNELS.map((item) => ({
      ...item,
      revenue: scaleRevenue(item.revenue, combinedFactor),
    })),
    replacementCycle: CONSUMER_REPLACEMENT_CYCLE.map((item) => ({
      ...item,
      count: Math.round(item.count * combinedFactor),
    })),
    positiveDrivers: CONSUMER_POSITIVE_DRIVERS.map((item) => ({
      ...item,
      mentions: Math.round(item.mentions * combinedFactor),
      sentiment: Math.min(100, Math.max(0, item.sentiment * (0.95 + ((monthNum % 10) / 100)))),
    })),
    negativeDrivers: CONSUMER_NEGATIVE_DRIVERS.map((item) => ({
      ...item,
      mentions: Math.round(item.mentions * combinedFactor),
      sentiment: Math.min(-10, Math.max(-100, item.sentiment * (0.95 + ((monthNum % 10) / 100)))),
    })),
    sentimentWords: CONSUMER_SENTIMENT_WORDS.map((item) => ({
      ...item,
      value: Math.round(item.value * combinedFactor),
    })),
    replacementFactors: CONSUMER_REPLACEMENT_FACTORS.map((item) => ({
      ...item,
      score: Math.min(100, Math.max(0, item.score * (0.9 + ((monthNum % 10) / 50)))),
    })),
  };
}

export function getConsumerFilterOptions() {
  return {
    products: [...CONSUMER_PRODUCTS],
    regions: [...CONSUMER_REGIONS],
  };
}
