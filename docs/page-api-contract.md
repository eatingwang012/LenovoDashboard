# 页面接口 Contract

## 设计原则

- 当前按照“页面级接口”设计，便于与现有 Dashboard 页面一一对应。
- 当前项目默认仍读取本地 mock；后续可将 `service` 层改为真实 API 调用。
- 请求参数以页面筛选项为主，返回值以页面直接消费的数据块为主。

---

## 1. `/api/shipment-landscape`

### Request

```json
{
  "selectedBrands": ["Lenovo", "HP"],
  "selectedModel": "All Models",
  "selectedQuarter": "2025-Q1",
  "selectedRegion": "Global",
  "selectedPriceSegment": "All Segments",
  "drillDownBrand": null
}
```

### Response

```json
{
  "availableModels": ["All Models", "ThinkPad", "Yoga"],
  "summaryMetrics": {
    "current": 123456,
    "yoy": 8.4,
    "qoq": 2.1,
    "brandShares": []
  },
  "quarterlyTrajectory": [],
  "priceData": [],
  "treemapData": [],
  "regionalPerformance": []
}
```

---

## 2. `/api/market-share`

### Request

```json
{
  "selectedQuarter": "2026-Q1",
  "selectedRegionEquilibrium": "Global"
}
```

### Response

```json
{
  "currentSnapshotGlobal": [],
  "equilibriumSnapshot": [],
  "rmsMetrics": {
    "ratio": 1.12,
    "leaderName": "HP",
    "status": "Market Leader",
    "description": "Lenovo holds 1.12x the share of the nearest rival."
  },
  "trendsChartData": [],
  "segmentHotmapRows": []
}
```

---

## 3. `/api/product-business`

### Request

```json
{
  "selectedYear": "2025",
  "selectedMonth": "09",
  "selectedSeries": ["ThinkPad", "Legion"]
}
```

### Response

```json
{
  "kpiCards": [],
  "trends": [],
  "topProducts": [],
  "cost": [],
  "funnel": [],
  "channelSummary": [],
  "channelDetail": [],
  "bottomKPIs": []
}
```

---

## 4. `/api/consumer-insights`

### Request

```json
{
  "selectedYear": "2024",
  "selectedMonth": "06",
  "selectedProduct": "All Products",
  "selectedRegion": "All Regions"
}
```

### Response

```json
{
  "combinedFactor": 0.94,
  "ageDistribution": [],
  "occupationData": [],
  "userSegments": [],
  "topBundles": [],
  "decisionFunnel": [],
  "onlineChannels": [],
  "offlineChannels": [],
  "replacementCycle": [],
  "positiveDrivers": [],
  "negativeDrivers": [],
  "replacementFactors": []
}
```

---

## 5. `/api/market-dynamics`

### Request

```json
{
  "selectedBrand": "All",
  "startYear": "2024",
  "startMonth": "10",
  "endYear": "2026",
  "endMonth": "12"
}
```

### Response

```json
{
  "selectedRange": [-18, 8],
  "productEvents": [],
  "supplyEvents": [],
  "activeEvent": null,
  "supplyCategories": [],
  "activeSupply": null
}
```

---

## 前后端对接建议

- `filters` 字段名尽量与当前 hook state 一致，避免前端二次映射。
- 图表数据建议由后端直接输出为页面可消费格式，减少前端重复聚合。
- 若后续需要缓存与增量刷新，可在 page-level 接口外再拆 domain-level 接口。
