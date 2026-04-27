import {
  MARKET_SHARE_BRANDS,
  MARKET_SHARE_HISTORY,
  MARKET_SHARE_QUARTERS,
  MARKET_SHARE_SEGMENT_HOTMAP_DATA,
} from "../mock/marketShare";
import type { RelativeMarketShareMetrics, ShareSnapshotItem } from "../schemas/marketShare";

function getPreviousQuarter(quarter: string): string | null {
  const index = MARKET_SHARE_QUARTERS.indexOf(quarter as (typeof MARKET_SHARE_QUARTERS)[number]);
  return index > 0 ? MARKET_SHARE_QUARTERS[index - 1] : null;
}

export function getMarketShareSnapshot(quarter: string, region: string): ShareSnapshotItem[] {
  const previousQuarter = getPreviousQuarter(quarter);

  return [...MARKET_SHARE_BRANDS]
    .map((brand) => {
      const current = MARKET_SHARE_HISTORY.find(
        (record) => record.quarter === quarter && record.brand === brand && record.region === region,
      );
      const previous = previousQuarter
        ? MARKET_SHARE_HISTORY.find(
            (record) =>
              record.quarter === previousQuarter && record.brand === brand && record.region === region,
          )
        : null;

      return {
        name: brand,
        value: current?.share ?? 0,
        change: current && previous ? current.share - previous.share : 0,
      };
    })
    .sort((left, right) => right.value - left.value);
}

export function getRelativeMarketShareMetrics(snapshot: ShareSnapshotItem[]): RelativeMarketShareMetrics {
  const lenovo = snapshot.find((item) => item.name === "Lenovo");
  const others = snapshot.filter((item) => item.name !== "Lenovo" && item.name !== "Others");
  const leader = others[0];

  if (!lenovo || !leader) {
    return { ratio: 0, status: "Unknown" };
  }

  const ratio = lenovo.value / leader.value;

  return {
    ratio,
    leaderName: leader.name,
    status: ratio > 1 ? "Market Leader" : "Market Challenger",
    description:
      ratio > 1
        ? `Lenovo holds ${ratio.toFixed(2)}x the share of the nearest rival (${leader.name}).`
        : `Lenovo holds ${(ratio * 100).toFixed(1)}% of the leader's (${leader.name}) footprint.`,
  };
}

export function getMarketShareTrendRows() {
  return MARKET_SHARE_QUARTERS.map((quarter) => {
    const row: Record<string, number | string> = { quarter };

    MARKET_SHARE_BRANDS.forEach((brand) => {
      row[brand] =
        MARKET_SHARE_HISTORY.find(
          (record) => record.quarter === quarter && record.brand === brand && record.region === "Global",
        )?.share ?? 0;
    });

    return row;
  });
}

export function getMarketShareSegmentHotmapRows() {
  return MARKET_SHARE_SEGMENT_HOTMAP_DATA;
}
