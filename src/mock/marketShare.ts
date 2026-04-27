import type { SegmentHotmapRow, ShareHistoryRecord } from "../schemas/marketShare";
import { seededInt } from "./utils";

export const MARKET_SHARE_BRANDS = ["Lenovo", "HP", "Dell", "Apple", "Others"] as const;
export const MARKET_SHARE_QUARTERS = ["2024-Q1", "2024-Q2", "2024-Q3", "2024-Q4", "2025-Q1", "2025-Q2", "2025-Q3", "2025-Q4", "2026-Q1"] as const;
export const MARKET_SHARE_REGIONS = ["Global", "China", "North America", "Europe", "Asia Pacific", "Latin America", "Africa"] as const;

export const MARKET_SHARE_BRAND_COLORS: Record<string, string> = {
  Lenovo: "#dc2626",
  HP: "#3b82f6",
  Dell: "#10b981",
  Apple: "#6366f1",
  Others: "#94a3b8",
};

/**
 * Mock share history at quarter-brand-region grain.
 */
export const MARKET_SHARE_HISTORY: ShareHistoryRecord[] = MARKET_SHARE_QUARTERS.flatMap((quarter) =>
  MARKET_SHARE_REGIONS.flatMap((region) => {
    let total = 0;

    const provisional = MARKET_SHARE_BRANDS.map((brand) => {
      let baseValue = 0;
      const regionBias =
        region === "China" && brand === "Lenovo"
          ? 15
          : region === "North America" && brand === "Apple"
            ? 10
            : 0;

      if (brand === "Lenovo") {
        baseValue = 23 + regionBias + seededInt(`${quarter}-${region}-${brand}`, 0, 3);
      } else if (brand === "HP") {
        baseValue = 18 + seededInt(`${quarter}-${region}-${brand}`, 0, 2);
      } else if (brand === "Dell") {
        baseValue = 15 + seededInt(`${quarter}-${region}-${brand}`, 0, 2);
      } else if (brand === "Apple") {
        baseValue = 8 + regionBias + seededInt(`${quarter}-${region}-${brand}`, 0, 2);
      } else {
        baseValue = 30 + seededInt(`${quarter}-${region}-${brand}`, 0, 5);
      }

      total += baseValue;
      return { brand, baseValue };
    });

    return provisional.map(({ brand, baseValue }) => ({
      quarter,
      region,
      brand,
      share: (baseValue / total) * 100,
    }));
  }),
);

/**
 * Segment penetration heatmap rows shown in the "Strategic Pockets" module.
 */
export const MARKET_SHARE_SEGMENT_HOTMAP_DATA: SegmentHotmapRow[] = [
  { group: "ToB Commercial", sub: "Enterprise", lenovoShare: 42.5, growth: 5.2, intensity: 0.9 },
  { group: "ToB Commercial", sub: "SME", lenovoShare: 31.8, growth: 3.8, intensity: 0.7 },
  { group: "ToB Commercial", sub: "Gov/Edu", lenovoShare: 28.4, growth: 2.1, intensity: 0.6 },
  { group: "ToC Consumer", sub: "Gaming", lenovoShare: 29.5, growth: 8.4, intensity: 0.8 },
  { group: "ToC Consumer", sub: "Pro/Creative", lenovoShare: 18.2, growth: 12.1, intensity: 0.5 },
  { group: "ToC Consumer", sub: "Mainstream", lenovoShare: 21.6, growth: -1.2, intensity: 0.4 },
];
