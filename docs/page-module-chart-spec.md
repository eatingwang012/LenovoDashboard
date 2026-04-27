# 页面/模块/图表说明

## 说明范围

- 本文基于当前运行中的 `src` 目录代码整理，不含已移除的 `src_v1.0_backup`。
- 范围仅覆盖当前导航中的 5 个页面：
  `Shipment Landscape`、`Market Share`、`Product Business Analysis`、`Consumer Insights`、`Market Dynamics & Supply Chain`。
- 指标口径以当前前端模拟数据和组件计算逻辑为准，适合作为产品说明和原型口径说明；如果后续接真实数据源，建议再做一次业务口径校准。

## 当前结构与数据流

- 原始 mock 数据已集中到 `src/mock/*.ts`，不再散落在页面组件中。
- 字段 schema/type 已集中到 `src/schemas/*.ts`。
- 页面级数据计算已抽到 `src/services/*.ts`，用于过滤、聚合、缩放、归一化。
- 页面级状态与取数逻辑已抽到 `src/hooks/use*.ts`，组件层主要负责展示。
- 当前数据流为：
  `mock raw data -> service 派生计算 -> hook 组织页面 view model -> component 渲染`
- 页面接口 contract 文档见 `docs/page-api-contract.md`。
- schema 详细说明见 `docs/mock-schema-spec.md`。

---

## 1. Shipment Landscape

### 模块 1：筛选栏

- 指标/维度含义
  `Brands` 为品牌范围；`Regional Focus` 为地区范围；`Fiscal Period` 为季度范围；`Model Range` 为机型范围；`Price Band (AUR)` 为价格带范围。
- 计算口径
  所有下方图表和卡片均基于 `RAW_DATA` 过滤后结果计算；其中 `Global` 表示不过滤地区，`All Time` 表示不过滤季度，`All Segments` 表示不过滤价格带。
- 业务意义
  用于在同一套竞品盘子下快速切换品牌、区域、时间、机型、价格带观察出货格局。
- 交互说明
  支持品牌多选、地区单选、季度单选、机型单选、价格带单选；所有下方模块联动刷新；品牌按钮支持 hover 高亮。

### 模块 2：Market Performance Matrix

- 图表/卡片 1：`Selected Market Volume`
  指标含义：当前筛选条件下的总出货量，以及同比 `YoY`、环比 `QoQ`。
  计算口径：`current = sum(volume)`；`YoY = (current - sum(prevYearVolume)) / sum(prevYearVolume)`；`QoQ = (current - sum(prevQuarterVolume)) / sum(prevQuarterVolume)`。
  业务意义：用于判断当前市场盘子大小和增长方向。
  交互说明：无单独筛选；随顶部筛选联动；无下钻；hover 无特殊行为。

- 图表/卡片 2：品牌卡片 `Lenovo / HP / Dell / Apple`
  指标含义：单品牌出货量、市场份额、QoQ、对 Lenovo 的相对规模。
  计算口径：品牌出货量为品牌过滤后的 `sum(volume)`；市场份额按当前地区和季度下的市场总量 `marketContextTotal` 计算；`vs Lenovo = brandVolume / lenovoVolume`。
  业务意义：用于做竞品 benchmarking，判断 Lenovo 与主要对手的体量差距。
  交互说明：hover 卡片会放大高亮；如果品牌未选中则卡片降灰；不触发其他模块下钻。

### 模块 3：Quarterly Trajectory

- 图表类型：多品牌季度趋势折线图
- 指标含义：各品牌在不同季度的出货量走势。
- 计算口径：按季度和地区聚合 `sum(volume)`；这里保留全部品牌作为背景趋势，但通过选中状态控制强调或弱化。
- 业务意义：用于观察 Lenovo 与竞品的季度节奏、淡旺季以及趋势分化。
- 交互说明
  支持图例 hover 高亮对应品牌线。
  顶部品牌筛选会改变线条透明度和粗细。
  tooltip 展示季度下各品牌值。
  不支持点击下钻。

### 模块 4：AUR Positioning

- 图表类型：按价格带堆叠横向柱图
- 指标含义：不同 AUR 价格带内，各品牌的出货量分布。
- 计算口径：按 `aur` 分组，对每个品牌计算 `sum(volume)`。
- 业务意义：用于看 Lenovo 和竞品在入门、中端、高端价位的结构站位。
- 交互说明
  受品牌、地区、季度、机型、价格带筛选联动。
  hover tooltip 展示价格带下各品牌出货量。
  如果当前存在品牌 hover，其他品牌柱子会降透明度。
  不支持点击下钻。

### 模块 5：Portfolio Distribution Index

- 图表类型：Treemap 机型组合树图
- 指标含义：品牌下各机型系列的出货量占比和体量。
- 计算口径：按品牌、机型聚合 `sum(volume)`；点击品牌后仅展示该品牌的子系列。
- 业务意义：用于看品牌内部产品组合结构，识别主销系列和结构集中度。
- 交互说明
  点击品牌块可下钻到该品牌。
  `Reset Viewport` 可返回总览。
  tooltip 展示品牌/机型体量。
  与顶部筛选联动。

### 模块 6：Regional Battleground Monitoring

- 图表类型：分地区卡片 + 份额进度条
- 指标含义：各地区品牌份额、地区 leader、Lenovo 与 leader 的份额差。
- 计算口径：固定用 `selectedQuarter` 和各 `region` 计算地区总量，再算各品牌 `share = brandVolume / totalRegionVolume`；`lenovoGap` 为 Lenovo 与地区第一名的份额差，若 Lenovo 第一则为领先第二名的差值。
- 业务意义：用于识别 Lenovo 的优势战区和短板战区。
- 交互说明
  受季度筛选联动，不受地区筛选影响。
  hover 品牌时对应进度条颜色高亮。
  无点击下钻；无跨模块反向联动。

---

## 2. Market Share

### 模块 1：Strategic Dominance

- 图表类型：RMS 仪表环
- 指标含义：Relative Market Share，相对市场份额。
- 计算口径：`RMS = Lenovo 全球份额 / 最近竞争对手全球份额`；最近竞争对手为当期全球份额最高的非 Lenovo、非 Others 品牌。
- 业务意义：RMS 大于 1 表示 Lenovo 领先最近对手，小于 1 表示仍是挑战者。
- 交互说明
  受顶部季度筛选联动。
  无点击下钻。
  无 hover 特殊交互。

### 模块 2：Market Share Momentum

- 图表类型：多品牌面积趋势图
- 指标含义：各品牌全球市场份额的季度变化趋势。
- 计算口径：按季度读取 `SHARE_HISTORY` 中 `Global` 区域各品牌 `share`。
- 业务意义：用于观察 Lenovo 份额走势、竞争对手追赶节奏和整体市场格局变化。
- 交互说明
  受季度选择影响当前页面其他模块，但本图本身展示全历史。
  tooltip 展示各季度品牌份额。
  图例仅展示，不支持点选。

### 模块 3：Strategic Pockets: Segment Penetration

- 图表类型：热力表格
- 指标含义：细分市场的 Lenovo 份额、同比增长、机会强度。
- 计算口径：使用静态表 `SEGMENT_HOTMAP_DATA`；`intensity` 作为 Opportunity Index 的视觉长度和底色强度。
- 业务意义：用于判断 Lenovo 在 ToB/ToC 子细分赛道的渗透力和优先攻守方向。
- 交互说明
  行 hover 变底色。
  无 tooltip、无下钻、无联动。

### 模块 4：Market Equilibrium

- 图表类型：区域份额环图 + 右侧明细列表
- 指标含义：所选区域内各品牌市场份额，以及相对上季度的份额变化。
- 计算口径：读取 `selectedQuarter + selectedRegionEquilibrium` 下各品牌 `share`；`change = 当期份额 - 上季度份额`。
- 业务意义：用于看特定地区竞争格局是否稳定，以及 Lenovo 是否在该区域持续扩张。
- 交互说明
  支持区域切换。
  hover 环图扇区时，其他扇区降透明度，右侧对应条目高亮。
  tooltip 展示份额。
  不支持点击下钻。

### 模块 5：Strategic Commentary & Intelligence

- 图表类型：无图表，情报卡片
- 指标含义：对增长引擎、商业护城河、挑战区域的文字总结。
- 计算口径：静态文案，无计算。
- 业务意义：承接前面图表，输出管理层可读结论。
- 交互说明：无筛选、无 hover、无联动。

---

## 3. Product Business Analysis

### 模块 1：Panoramic KPI Cards

- 图表/卡片集合：Target Completion Rate、Shipment Volume、REV、AUR、Gross Margin、Net Profit、Active SKUs
- 指标含义
  `Target Completion Rate` 目标达成率；
  `Shipment Volume` 出货量；
  `REV` 营收；
  `AUR` 平均单台零售价；
  `Gross Margin` 毛利率；
  `Net Profit` 净利润；
  `Active SKUs` 在售 SKU 数。
- 计算口径
  当前为静态 KPI 卡片；其中达成类卡片展示 `current / target` 或预置 completion 值。
- 业务意义
  用于管理驾驶舱式总览，快速判断生意规模、效率和盈利。
- 交互说明
  卡片可 hover 强化样式。
  不受下方筛选联动，属于页面固定看板。

### 模块 2：浮动筛选栏

- 指标/维度含义
  `Portfolio` 为产品系列多选；`Year/Month` 为时间维度筛选。
- 计算口径
  通过 `seriesFactor`、`monthFluctuation`、`baseFactor` 统一驱动页面内多个图表的模拟值变化。
- 业务意义
  用于模拟不同产品组合和月份下的经营表现。
- 交互说明
  系列支持多选；年份切换后月份级联刷新；下方趋势图、榜单、成本、漏斗、渠道都会联动。

### 模块 3：Performance Indicators Trend

- 图表类型：4 个迷你折线图
- 图表 1：Shipment (M Units)
  指标含义：月度出货量。
  计算口径：`derivedData.trends[].shipment`，由基础趋势乘以 `baseFactor` 得出。
  业务意义：看销量节奏。
  交互说明：hover tooltip；受筛选联动；无下钻。

- 图表 2：Total Revenue (B USD)
  指标含义：月度营收。
  计算口径：`derivedData.trends[].rev`。
  业务意义：看规模与收入弹性。
  交互说明：hover tooltip；受筛选联动。

- 图表 3：Avg. Unit Retail (USD)
  指标含义：平均售价。
  计算口径：`derivedData.trends[].aur`，会随系列结构轻微变化。
  业务意义：看价格带结构变化。
  交互说明：hover tooltip；受筛选联动。

- 图表 4：Gross Margin (%)
  指标含义：月度毛利率。
  计算口径：`derivedData.trends[].margin`。
  业务意义：看经营质量与盈利水平。
  交互说明：hover tooltip；受筛选联动。

### 模块 4：Top Selling Products

- 图表类型：榜单卡片
- 指标含义：单品销量、所属系列、增长率、价格。
- 计算口径：按所选系列过滤 `topProducts`，销量按 `baseFactor` 缩放。
- 业务意义：识别主销机型和增长担当。
- 交互说明
  无图表 hover。
  受时间和系列筛选联动。
  无下钻。

### 模块 5：Cost Structure Analysis

- 图表类型：成本结构环图
- 指标含义：Components、Manufacturing、Marketing、R&D、Logistics 在总成本中的占比。
- 计算口径：基于 `costData`，随 `seriesFactor` 做轻微调整；总和按 100% 展示。
- 业务意义：用于看成本结构重心，判断成本优化方向。
- 交互说明
  hover tooltip 展示成本项与占比。
  图例辅助识别。
  受筛选联动；无下钻。

### 模块 6：Profit Performance Overview

- 图表类型：利润转化漏斗
- 指标含义：Revenue、COGS、Gross Profit、Expenses、Net Profit。
- 计算口径：各层金额由 `profitFunnelData * baseFactor` 得出；下方再计算 `Gross Margin = GP / REV`、`Expense Ratio = Exp / REV`、`Net Margin = NP / REV`。
- 业务意义：用于看收入到净利润的价值转化效率。
- 交互说明
  hover tooltip 展示各层金额。
  受筛选联动；无下钻。

### 模块 7：Omnichannel Business Operations

- 图表 1：Shipment Volume Spread
  指标含义：线上直销/电商与线下零售/代理的出货量。
  计算口径：`derivedData.channelSummary[].value`，由原始渠道值乘 `baseFactor`。
  业务意义：用于看线上线下出货结构。
  交互说明：hover tooltip 展示出货、营收、AUR、毛利率、增长、转化率；受筛选联动。

- 图表 2：Segmented Channel Weighting
  指标含义：细分渠道权重，如 JD、官网、Tmall、Retail Stores、Enterprise Procurement。
  计算口径：渠道权重按筛选调整后再归一化到 100%。
  业务意义：用于看渠道资源分配和流量贡献结构。
  交互说明：hover 默认 tooltip；右侧列表与图例对应；受筛选联动。

- 图表 3：Bottom KPI Grid
  指标含义：电商平均零售额、零售平均零售额、线上效率、伙伴盈利性。
  计算口径：由 `baseFactor` 和月份派生出的模拟 KPI。
  业务意义：承接渠道图，评价渠道质量而不仅是规模。
  交互说明：hover 卡片有动效；受筛选联动；无下钻。

---

## 4. Consumer Insights

### 模块 1：筛选栏

- 指标/维度含义
  年、月、产品、区域四类筛选。
- 计算口径
  通过 `timeFactor * productFactor * regionFactor` 生成 `combinedFactor`，驱动本页大多数图表值缩放。
- 业务意义
  用于模拟不同产品和区域下的人群、评价和渠道结构变化。
- 交互说明
  年月级联，产品/区域单选，`Query` 按钮仅展示操作入口，当前无额外查询逻辑；全页图表联动。

### 模块 2：Consumer Structure

- 图表 1：Age & Gender Distribution
  指标含义：各年龄段男女用户数量。
  计算口径：`male/female = baseCount * combinedFactor`。
  业务意义：用于看用户年龄带与性别构成，支撑产品定位与投放。
  交互说明：hover tooltip；图例可读；受筛选联动。

- 图表 2：Occupation Distribution
  指标含义：职业分布及占比。
  计算口径：人数 `value` 随 `combinedFactor` 缩放；标签显示预置 `percentage`。
  业务意义：用于识别主力职业客群。
  交互说明：hover tooltip；图例展示；受筛选联动；无下钻。

### 模块 3：Segmentation & Scenarios

- 图表/卡片 1：RFM Segment Cards
  指标含义：高价值、成长潜力、忠诚、流失风险等人群的规模、占比、客单、频次、最近购买周期。
  计算口径：`count` 随 `combinedFactor` 缩放；`avgSpend` 随产品结构轻微调整；`percentage/frequency/recency` 为静态说明值。
  业务意义：用于做用户运营分层和精细化策略制定。
  交互说明
  hover 或 click 某分群卡片，会高亮当前分群并驱动右侧雷达图切换。
  其他分群会降灰。

- 图表 2：Usage Radar
  指标含义：不同分群在办公、游戏、创作、学习、娱乐等场景的需求强度。
  计算口径：使用静态 `usageRadarData`；默认展示 Overall，选中分群后叠加该分群雷达。
  业务意义：用于理解不同客群的核心使用场景和产品匹配策略。
  交互说明
  与左侧分群卡片联动。
  hover tooltip 展示场景值。
  不支持独立下钻。

- 图表/卡片 3：Associated Purchase Patterns
  指标含义：联购组合、销量、收入、占比。
  计算口径：销量 `sales` 随 `combinedFactor` 缩放；收入和占比为静态展示。
  业务意义：用于判断配件搭售和交叉销售机会。
  交互说明：受筛选联动；无图表 hover；无下钻。

### 模块 4：User Review Analysis

- 图表 1：Positive Purchase Drivers
  指标含义：正向购买驱动的提及量和情感分数。
  计算口径：`mentions` 随 `combinedFactor` 缩放；`sentiment` 按月份做轻微波动；横轴为 mentions，纵轴为 sentiment。
  业务意义：识别真正驱动下单的卖点。
  交互说明：hover tooltip；点上显示因子标签；支持正负 tab 切换。

- 图表 2：Negative Purchase Barriers
  指标含义：负向痛点的提及量和负向严重度。
  计算口径：`mentions` 随 `combinedFactor` 缩放；`sentiment` 为负值，越低代表阻力越大。
  业务意义：用于识别影响转化的主要障碍。
  交互说明：hover tooltip；支持 tab 切换；无下钻。

- 图表/卡片 3：Core Strengths / Primary Barriers
  指标含义：正负因素 Top3 的强度条。
  计算口径：基于对应 scatter 数据的情感值绘制进度条。
  业务意义：帮助业务快速抓重点，不必逐点读散点图。
  交互说明：受 tab 切换联动；无 tooltip。

### 模块 5：Decision Funnel

- 图表 1：Purchase Decision Funnel
  指标含义：Awareness、Interest、Consideration、Intent、Purchase 各阶段人数。
  计算口径：`value = baseStageValue * combinedFactor`；右上角 `Overall Efficiency = Purchase / Awareness = 25%` 为静态展示。
  业务意义：用于定位转化漏损发生在哪一层。
  交互说明：hover tooltip；右侧 Stage Analytics 与漏斗同源联动展示；无点击下钻。

- 图表/卡片 2：Stage Analytics
  指标含义：各阶段人数、阶段转化率、环节 drop-off。
  计算口径：`conversion` 使用静态阶段值；`drop-off = 1 - 当前阶段值 / 上一阶段值`。
  业务意义：把漏斗图转化成更可执行的运营诊断。
  交互说明：随漏斗和筛选联动；无单独 hover。

### 模块 6：Purchase Channels

- 图表 1：Online Share Distribution
  指标含义：线上平台份额。
  计算口径：使用 `onlineChannels.value`，收入字段按 `combinedFactor` 缩放。
  业务意义：用于看线上平台贡献结构。
  交互说明：hover tooltip；通过 tab 与线下视图切换。

- 图表 2：Offline Share Distribution
  指标含义：线下渠道份额。
  计算口径：使用 `offlineChannels.value`，收入字段按 `combinedFactor` 缩放。
  业务意义：用于看授权经销、门店、卖场等线下贡献。
  交互说明：hover tooltip；tab 切换。

- 图表/卡片 3：渠道明细列表
  指标含义：各渠道 CVR、AOV、Revenue、Share。
  计算口径：取对应线上/线下数组字段直接展示。
  业务意义：帮助从份额进一步看到渠道效率。
  交互说明：随 tab 和筛选联动；hover 卡片仅样式变化。

### 模块 7：Brand Loyalty

- 图表 1：Device Replacement Cycle
  指标含义：设备更换周期分布。
  计算口径：柱图展示 `percentage`；人数 `count` 随 `combinedFactor` 缩放；平均周期展示为静态 `3.2 Years`。
  业务意义：用于判断换机节奏和存量激活窗口。
  交互说明：hover tooltip；受筛选联动。

- 图表 2：Migration Drivers
  指标含义：品牌切换/升级的驱动因素影响分。
  计算口径：`score` 按月份做轻微波动，范围裁剪在 0-100。
  业务意义：用于指导换机沟通和产品卖点布局。
  交互说明：hover tooltip 展示驱动定义；受筛选联动。

- 图表/卡片 3：Retention KPI + Migration Detail
  指标含义：留存率 78.5%，以及流入/流出品牌来源。
  计算口径：当前为静态展示。
  业务意义：用于衡量品牌粘性和竞品迁移态势。
  交互说明：留存环有入场动画；无筛选联动计算；无下钻。

---

## 5. Market Dynamics & Supply Chain

### 模块 1：Activity Tracking View

- 指标/维度含义
  `Brand` 为品牌筛选；`Start/End` 为时间区间筛选。
- 计算口径
  根据年/月换算为相对 `monthOffset` 区间，再过滤 `timelineEvents`。
- 业务意义
  用于统一查看竞品发布时间轴和供应链扰动。
- 交互说明
  品牌按钮单选；起止年月可自由组合；中间时间轴和右侧详情卡联动。

### 模块 2：Timeline Projections

- 图表类型：双轨时间轴
- 指标含义：上轨是竞品发布节奏，下轨是供应链事件节奏；节点区分历史、未来、供应链事件。
- 计算口径：按 `monthOffset` 映射到所选时间范围百分比位置。
- 业务意义：用于把产品节奏和供应风险放到同一时间维比较，便于制定应对动作。
- 交互说明
  点击节点切换右侧详情卡。
  hover 节点展示简短 tooltip。
  时间区间和品牌筛选联动刷新节点。
  不支持进一步下钻。

### 模块 3：Event Details Card

- 图表类型：无图表，事件详情卡
- 指标含义：事件名称、品牌、日期、规格/信息、市场亮点、价格/成本影响。
- 计算口径：从当前 `activeEvent` 直接读取。
- 业务意义：承接时间轴，为管理者提供可读情报摘要。
- 交互说明：点击时间轴节点触发切换；部分事件支持跳转外链。

### 模块 4：Supply Chain Indicators & Alerts

- 图表/卡片 1：品类风险卡片
  指标含义：CPU、屏、内存、电池、芯片组等核心部件过去 3 个月变化、未来 3 个月预测、趋势方向、驱动因素。
  计算口径：来自 `supplyCategories` 静态数据。
  业务意义：用于快速识别上游涨价/跌价/稳定项。
  交互说明
  点击某卡片切换下方折线图。
  active 卡片高亮放大。

- 图表 2：Core Component Procurement Cost Index
  指标含义：核心部件采购成本指数，区分实际值与预测值。
  计算口径：以 `25Q1 = 100` 为基准；`actual` 为历史值，`forecast` 为预测值。
  业务意义：用于判断 BOM 压力和未来毛利风险。
  交互说明
  与上方部件卡片联动。
  hover tooltip 展示季度值。
  图例区分实际与预测；预测线为虚线。

---

## 补充说明

- 当前项目中还有 `StatisticsView.tsx` 等未挂载组件，不属于现网导航页面，因此本说明未纳入。
- 本轮已将 5 个现网页面的 mock 数据集中管理，并完成页面级 service/hook 分层。
- `Consumer Insights` 页面的 `Decision Funnel` 白屏问题已修复，原因是 tooltip 对 payload 字段的运行时访问不安全；当前已改为安全访问。
