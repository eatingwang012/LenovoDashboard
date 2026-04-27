# Mock Schema 说明

## 文档目的

- 说明当前 5 个页面的 mock 数据结构、字段定义和使用边界。
- 对应代码目录：
  `src/mock`、`src/schemas`、`src/services`、`src/hooks`
- 设计原则：
  原始数据集中存放在 `src/mock`；
  类型与接口定义放在 `src/schemas`；
  派生计算放在 `src/services`；
  页面筛选与视图数据组织放在 `src/hooks`。

---

## 1. Shipment Landscape

### 原始数据对象：`ShipmentRecord`

文件：
- `src/schemas/shipmentLandscape.ts`
- `src/mock/shipmentLandscape.ts`

字段说明：

| 字段 | 类型 | 含义 | 示例 |
|---|---|---|---|
| `quarter` | `string` | 财季 | `2025-Q1` |
| `brand` | `string` | 品牌 | `Lenovo` |
| `model` | `string` | 产品系列/机型 | `ThinkPad` |
| `region` | `string` | 区域 | `China` |
| `type` | `string` | 产品类型 | `Business` |
| `aur` | `string` | AUR 价格带 | `$1000-$1500` |
| `volume` | `number` | 当期出货量 | `10482` |
| `prevYearVolume` | `number` | 去年同期出货量 | `9731` |
| `prevQuarterVolume` | `number` | 上季度出货量 | `10018` |

派生对象：
- `ShipmentSummaryMetrics`
- `ShipmentBrandSummary`
- `ShipmentTreemapNode`
- `ShipmentPriceBandRow`
- `RegionalPerformanceCard`

---

## 2. Market Share

### 原始数据对象：`ShareHistoryRecord`

文件：
- `src/schemas/marketShare.ts`
- `src/mock/marketShare.ts`

字段说明：

| 字段 | 类型 | 含义 | 示例 |
|---|---|---|---|
| `quarter` | `string` | 财季 | `2026-Q1` |
| `brand` | `string` | 品牌 | `Apple` |
| `region` | `string` | 区域 | `North America` |
| `share` | `number` | 市占率百分比 | `18.7` |

### 原始数据对象：`SegmentHotmapRow`

| 字段 | 类型 | 含义 | 示例 |
|---|---|---|---|
| `group` | `string` | 一级细分市场 | `ToB Commercial` |
| `sub` | `string` | 二级细分市场 | `Enterprise` |
| `lenovoShare` | `number` | Lenovo 在该细分市场份额 | `42.5` |
| `growth` | `number` | 份额或规模增速 | `5.2` |
| `intensity` | `number` | 机会强度指数，0-1 | `0.9` |

派生对象：
- `ShareSnapshotItem`
- `RelativeMarketShareMetrics`

---

## 3. Product Business Analysis

### 原始数据对象：`ProductKpiCard`

文件：
- `src/schemas/productBusiness.ts`
- `src/mock/productBusiness.ts`

字段说明：

| 字段 | 类型 | 含义 | 示例 |
|---|---|---|---|
| `title` | `string` | KPI 名称 | `Shipment Volume` |
| `value` | `string` | 展示值 | `19.4M` |
| `unit` | `string` | 单位 | `Units` |
| `target` | `string \| number` | 目标值/目标说明 | `20000000` |
| `current` | `string \| number` | 当前值/当前说明 | `19400000` |
| `description` | `string` | 指标说明 | `The percentage...` |
| `yoy` | `string` | 同比变化 | `+10.2%` |
| `qoq` | `string` | 环比变化 | `+2.5%` |
| `isPositive` | `boolean` | 当前表现是否正向 | `true` |
| `icon` | `string` | 对应图标键 | `Laptop` |
| `color` | `string` | 文本色类名 | `text-blue-600` |
| `bgColor` | `string` | 背景色类名 | `bg-blue-50` |

### 其他原始数据对象

| 对象 | 作用 |
|---|---|
| `ProductTrendPoint` | 月度趋势明细 |
| `ProductCostRow` | 成本结构 |
| `ProductFunnelRow` | 利润漏斗 |
| `ProductChannelSummaryRow` | 线上/线下渠道总览 |
| `ProductChannelWeightRow` | 细分渠道权重 |
| `ProductTopItem` | 热销机型榜单 |

### 主要派生对象

| 对象 | 含义 |
|---|---|
| `derivedData.trends` | 根据时间和产品系列缩放后的趋势数据 |
| `derivedData.cost` | 动态成本结构 |
| `derivedData.funnel` | 动态利润漏斗 |
| `derivedData.channelDetail` | 归一化渠道权重 |
| `derivedData.bottomKPIs` | 渠道效率指标卡 |

---

## 4. Consumer Insights

### 原始数据对象

文件：
- `src/schemas/consumerInsights.ts`
- `src/mock/consumerInsights.ts`

核心对象说明：

| 对象 | 含义 |
|---|---|
| `ConsumerAgeGenderRow` | 年龄与性别人数 |
| `ConsumerOccupationRow` | 职业分布 |
| `ConsumerUsageRadarRow` | 场景雷达图基础数据 |
| `ConsumerSegmentRow` | RFM 分群数据 |
| `ConsumerBundleRow` | 联购组合数据 |
| `ConsumerDriverRow` | 正负评论驱动因子 |
| `ConsumerDecisionFunnelStage` | 决策漏斗阶段值 |
| `ConsumerChannelRow` | 线上/线下渠道结构 |
| `ConsumerReplacementCycleRow` | 换机周期 |
| `ConsumerReplacementFactorRow` | 迁移驱动因子 |

### `ConsumerDecisionFunnelStage` 字段说明

| 字段 | 类型 | 含义 | 示例 |
|---|---|---|---|
| `stage` | `string` | 漏斗阶段名 | `Awareness` |
| `value` | `number` | 阶段人数/事件量 | `10000` |
| `conversion` | `number` | 相对初始阶段的保留率 | `100` |

### 派生逻辑补充

- `combinedFactor = timeFactor * productFactor * regionFactor`
- 页面内大多数数值通过 `baseValue * combinedFactor` 做缩放
- 当前属于原型期模拟逻辑，后续接真实 API 时应替换为真实聚合值

---

## 5. Market Dynamics & Supply Chain

### 原始数据对象：`MarketTimelineEvent`

文件：
- `src/schemas/marketDynamics.ts`
- `src/mock/marketDynamics.ts`

字段说明：

| 字段 | 类型 | 含义 | 示例 |
|---|---|---|---|
| `id` | `number` | 事件主键 | `3` |
| `brand` | `string` | 品牌/事件来源 | `Dell` |
| `product` | `string` | 产品/事件名称 | `XPS 13` |
| `monthOffset` | `number` | 相对 2026-04 的月份偏移 | `-3` |
| `specs` | `string` | 规格/事件说明 | `Snapdragon X Elite...` |
| `pricing` | `string` | 价格或成本变化 | `楼9,999` |
| `sellingPoints` | `string` | 核心亮点/影响说明 | `All-day battery...` |
| `type` | `"product" \| "supply"` | 事件类别 | `product` |
| `date` | `string` | 日期标签 | `2026-01` |
| `link` | `string` | 外链 | `https://www.dell.com/` |

### 原始数据对象：`SupplyCategory`

| 字段 | 类型 | 含义 | 示例 |
|---|---|---|---|
| `id` | `string` | 物料分类主键 | `cpu` |
| `name` | `string` | 物料名称 | `CPU / Processors` |
| `icon` | `string` | 物料图标键 | `Cpu` |
| `metric` | `string` | 指标名称 | `Procurement Cost Index` |
| `past3m` | `string` | 过去 3 个月变动 | `+2.5%` |
| `future3m` | `string` | 未来 3 个月预测 | `+1.0%` |
| `trend` | `Rising/Falling/Stable` | 趋势方向 | `Rising` |
| `driver` | `string` | 变化原因 | `Premium caused by...` |
| `priceTrend` | `SupplyPriceTrendPoint[]` | 季度价格指数序列 | `[{period:'25Q1',actual:100}]` |

---

## 数据流转总览

1. `src/mock/*.ts`
   存储页面原始 mock 数据与选项枚举
2. `src/schemas/*.ts`
   定义原始数据、筛选参数、派生对象结构
3. `src/services/*.ts`
   负责过滤、聚合、缩放、归一化等纯计算
4. `src/hooks/use*.ts`
   管理页面 state，并把 service 结果封装成页面 view model
5. `src/components/*.tsx`
   只负责展示和交互绑定，不再内嵌大块数据
