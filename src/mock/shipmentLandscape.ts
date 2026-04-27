import type { ShipmentRecord } from "../schemas/shipmentLandscape";
import { seededInt } from "./utils";

/** Supported brand filters shown in the Shipment Landscape page. */
export const SHIPMENT_BRANDS = ["Lenovo", "HP", "Dell", "Apple"] as const;

/** Geographic scope options exposed to the page filter. */
export const SHIPMENT_REGIONS = ["Global", "China", "North America", "EMEA", "Asia Pacific", "Latin America"] as const;

/** Quarter options shown in the page filter. */
export const SHIPMENT_QUARTERS = ["2024-Q1", "2024-Q2", "2024-Q3", "2024-Q4", "2025-Q1", "2025-Q2", "2025-Q3", "2025-Q4", "2026-Q1"] as const;

/** Average unit revenue buckets used by the page. */
export const SHIPMENT_AUR_SEGMENTS = ["<$600", "$600-$1000", "$1000-$1500", "$1500+"] as const;

/** Maps each brand to the visible model portfolio shown in the treemap and filter. */
export const SHIPMENT_MODEL_MAP: Record<string, string[]> = {
  Lenovo: ["ThinkPad", "Yoga", "Legion", "IdeaPad"],
  HP: ["HP Spectre", "HP Envy", "HP Pavilion", "HP Omen"],
  Dell: ["XPS", "Latitude", "Inspiron", "Alienware"],
  Apple: ["MacBook Air", "MacBook Pro"],
};

/** Shared visual mapping used across charts and cards. */
export const SHIPMENT_BRAND_COLORS: Record<string, string> = {
  Lenovo: "#dc2626",
  HP: "#3b82f6",
  Dell: "#10b981",
  Apple: "#64748b",
};

function resolveModelType(model: string): string {
  if (model.includes("ThinkPad") || model.includes("Latitude") || model.includes("Pro")) {
    return "Business";
  }

  if (model.includes("Legion") || model.includes("Alienware") || model.includes("Omen")) {
    return "Gaming";
  }

  return "Thin & Light";
}

function resolveAurSegment(model: string): string {
  if (model.includes("XPS") || model.includes("Yoga") || model.includes("Spectre") || model.includes("Pro")) {
    return "$1000-$1500";
  }

  if (model === "MacBook Pro" || model === "MacBook Air") {
    return "$1500+";
  }

  if (model.includes("IdeaPad") || model.includes("Inspiron") || model.includes("Pavilion")) {
    return "<$600";
  }

  return "$600-$1000";
}

/**
 * Raw mock shipment dataset at quarter-region-brand-model grain.
 * The dataset is generated once from deterministic seeds so the dashboard
 * stays stable across refreshes while still looking realistic.
 */
export const SHIPMENT_RAW_DATA: ShipmentRecord[] = SHIPMENT_QUARTERS.flatMap((quarter) =>
  SHIPMENT_REGIONS.flatMap((region) =>
    SHIPMENT_BRANDS.flatMap((brand) =>
      SHIPMENT_MODEL_MAP[brand].map((model) => {
        const seed = `${quarter}-${region}-${brand}-${model}`;
        const volume = seededInt(seed, 4800, 9800)
          * (brand === "Lenovo" ? 1.22 : 0.96)
          * (region === "China" && brand === "Lenovo" ? 1.45 : 1);
        const roundedVolume = Math.round(volume);

        return {
          quarter,
          brand,
          model,
          region,
          type: resolveModelType(model),
          aur: resolveAurSegment(model),
          volume: roundedVolume,
          prevYearVolume: Math.round(roundedVolume * (0.86 + seededInt(`${seed}-py`, 0, 18) / 100)),
          prevQuarterVolume: Math.round(roundedVolume * (0.91 + seededInt(`${seed}-pq`, 0, 13) / 100)),
        };
      }),
    ),
  ),
);
