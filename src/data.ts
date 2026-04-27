import type { MarketData, ProductPerformance, SubBrandConsumerData, TOCInsightData } from './types';

// ... (existing MARKET_TRENDS and COMPETITOR_SHIPMENTS)

export const TOC_INSIGHT_DATA: TOCInsightData = {
  demographics: {
    age: [
      { category: 'Age', label: '18-24', value: 35 },
      { category: 'Age', label: '25-34', value: 42 },
      { category: 'Age', label: '35-44', value: 15 },
      { category: 'Age', label: '45+', value: 8 },
    ],
    gender: [
      { category: 'Gender', label: 'Male', value: 65 },
      { category: 'Gender', label: 'Female', value: 35 },
    ],
    occupation: [
      { category: 'Occupation', label: '学生', value: 30 },
      { category: 'Occupation', label: '白领', value: 45 },
      { category: 'Occupation', label: '自由职业', value: 15 },
      { category: 'Occupation', label: '其他', value: 10 },
    ],
    scenario: [
      { category: 'Scenario', label: '游戏娱乐', value: 40 },
      { category: 'Scenario', label: '商务办公', value: 30 },
      { category: 'Scenario', label: '设计渲染', value: 20 },
      { category: 'Scenario', label: '网课学习', value: 10 },
    ]
  },
  rfm: [
    { name: '重要价值客户', count: 1200, percent: 15, features: '最近购买，高频高额', topCombination: ['主机', '显示器', '意外险'] },
    { name: '重要发展客户', count: 2400, percent: 30, features: '近期购买，中频中额', topCombination: ['主机', '鼠标', '上门服务'] },
    { name: '重要保持客户', count: 1600, percent: 20, features: '历史购买，高频高额', topCombination: ['主机', '扩展坞', '上门服务'] },
    { name: '流失预警客户', count: 2800, percent: 35, features: '长时间未购，历史高额', topCombination: ['主机', '正版软件'] },
  ],
  decisionFunnel: [
    { stage: '浏览商品', value: 100, count: '2.4万次', conversionRate: '-' },
    { stage: '加入购物车', value: 83.3, count: '2.0万次', conversionRate: '83.3%' },
    { stage: '下单', value: 66.7, count: '1.6万次', conversionRate: '80.0%' },
    { stage: '支付', value: 45.8, count: '1.1万次', conversionRate: '68.8%' },
    { stage: '复购', value: 16.7, count: '0.4万次', conversionRate: '36.4%' },
  ],
  purchaseDrivers: {
    positive: [
      { theme: '性能/处理器速度', frequency: 120, sentiment: 0.9 },
      { theme: '外观设计', frequency: 95, sentiment: 0.85 },
      { theme: '续航能力', frequency: 80, sentiment: 0.8 },
      { theme: '键盘手感及散热', frequency: 75, sentiment: 0.9 },
      { theme: '便携性/重量', frequency: 60, sentiment: 0.82 },
      { theme: '品牌与售后', frequency: 55, sentiment: 0.88 },
    ],
    negative: [
      { theme: '散热一般', frequency: 45, sentiment: 0.3 },
      { theme: '风扇噪音', frequency: 40, sentiment: 0.25 },
      { theme: '机身略重', frequency: 35, sentiment: 0.4 },
      { theme: '价格略高', frequency: 30, sentiment: 0.35 },
      { theme: '接口较少', frequency: 25, sentiment: 0.3 },
    ]
  },
  channels: {
    online: [
      { name: '京东', traffic: '1.2M', conversion: '3.5%', aur: '$850', revenueWeight: '45%' },
      { name: '天猫', traffic: '0.8M', conversion: '2.8%', aur: '$820', revenueWeight: '30%' },
      { name: '官网', traffic: '0.3M', conversion: '4.2%', aur: '$900', revenueWeight: '15%' },
      { name: '社交电商', traffic: '0.2M', conversion: '1.5%', aur: '$780', revenueWeight: '10%' },
    ],
    offline: [
      { name: '授权经销商', traffic: '0.15M', conversion: '15.0%', aur: '$880', revenueWeight: '60%' },
      { name: '体验中心', traffic: '0.1M', conversion: '12.0%', aur: '$840', revenueWeight: '35%' },
      { name: '区域零售商', traffic: '0.02M', conversion: '8.0%', aur: '$920', revenueWeight: '5%' },
    ]
  },
  loyalty: {
    avgCycle: 32,
    factors: [
      { theme: '性能衰退', frequency: 45 },
      { theme: '技术革新', frequency: 30 },
      { theme: '职业变迁', frequency: 15 },
      { theme: '品牌促销', frequency: 10 },
    ],
    flows: [
      { source: 'Lenovo', target: 'Lenovo', value: 1200 },
      { source: 'Lenovo', target: 'Apple', value: 300 },
      { source: 'Lenovo', target: 'HP', value: 150 },
      { source: 'Lenovo', target: 'Dell', value: 150 },
      { source: 'Apple', target: 'Lenovo', value: 100 },
      { source: 'HP', target: 'Lenovo', value: 200 },
      { source: 'Dell', target: 'Lenovo', value: 180 },
    ]
  }
};

// Page 1: Competitors & Market Share
export const MARKET_TRENDS: MarketData[] = [
  { month: '2023 Q1', lenovo: 23.5, apple: 8.5, hp: 19.5, dell: 17.5, asus: 7.2, others: 23.8 },
  { month: '2023 Q2', lenovo: 24.1, apple: 8.9, hp: 19.0, dell: 17.0, asus: 7.5, others: 23.5 },
  { month: '2023 Q3', lenovo: 24.8, apple: 9.2, hp: 18.5, dell: 16.5, asus: 7.8, others: 23.2 },
  { month: '2023 Q4', lenovo: 25.5, apple: 10.1, hp: 18.2, dell: 16.0, asus: 8.1, others: 22.1 },
  { month: '2024 Q1', lenovo: 26.2, apple: 9.5, hp: 17.8, dell: 15.5, asus: 8.4, others: 22.6 },
  { month: '2024 Q2', lenovo: 27.5, apple: 9.0, hp: 17.2, dell: 15.2, asus: 8.8, others: 22.3 },
];

export const COMPETITOR_SHIPMENTS = [
  { brand: 'HP', shipment: 13.5, growth: 2.1 },
  { brand: 'Dell', shipment: 12.0, growth: -3.5 },
  { brand: 'Apple', shipment: 7.2, growth: 14.2 },
  { brand: 'Asus', shipment: 6.8, growth: 5.6 },
  { brand: 'Lenovo', shipment: 21.5, growth: 8.4 },
];

// Page 2: Internal Growth
export const generateInternalData = (): ProductPerformance[] => {
  const data: ProductPerformance[] = [];
  let currentShipment = 1000000;
  const aur = 800;
  const margin = 0.15;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  months.forEach((month, index) => {
    const shipment = currentShipment * Math.pow(1.05, index);
    const revenue = (shipment * aur) / 1000000;
    const profit = revenue * margin;
    data.push({
      month: `2024 ${month}`,
      shipment: Math.round(shipment / 1000),
      revenue: Math.round(revenue),
      profit: Math.round(profit),
      aur: aur
    });
  });
  return data;
};

export const CONSUMER_DATA_BY_BRAND: Record<string, SubBrandConsumerData> = {
  all: {
    id: 'all',
    persona: {
      segment: '大众消费与专业办公',
      ageRange: '18-45',
      occupation: '学生、白领、内容创作者',
      lifestyle: ['品质生活', '高效办公', '娱乐玩家']
    },
    demographics: [
      { category: 'Gender', label: 'Male', value: 62 },
      { category: 'Gender', label: 'Female', value: 38 },
      { category: 'Region', label: 'Tier 1', value: 45 },
      { category: 'Region', label: 'Tier 2', value: 35 },
      { category: 'Region', label: 'Others', value: 20 },
    ],
    themes: [
      { theme: '性能表现', frequency: 85, sentiment: 0.8, isNegative: false },
      { theme: '外观设计', frequency: 72, sentiment: 0.75, isNegative: false },
      { theme: '续航能力', frequency: 65, sentiment: 0.4, isNegative: true },
      { theme: '屏幕素质', frequency: 58, sentiment: 0.85, isNegative: false },
      { theme: '售后服务', frequency: 45, sentiment: 0.5, isNegative: true },
      { theme: '便携性', frequency: 40, sentiment: 0.7, isNegative: false },
    ],
    channels: [
      { channel: '京东 (JD)', share: 42 },
      { channel: '天猫 (Tmall)', share: 28 },
      { channel: '联想官网', share: 15 },
      { channel: '线下门店', share: 10 },
      { channel: '抖音/直播', share: 5 },
    ]
  },
  thinkbook: {
    id: 'thinkbook',
    persona: {
      segment: '新锐创业者/职场新人',
      ageRange: '22-30',
      occupation: '创业、广告、技术专家',
      lifestyle: ['移动办公', '颜值主义', '斜杠青年']
    },
    demographics: [
      { category: 'Gender', label: 'Male', value: 55 },
      { category: 'Gender', label: 'Female', value: 45 },
      { category: 'Region', label: 'Tier 1', value: 55 },
      { category: 'Region', label: 'Tier 2', value: 30 },
      { category: 'Region', label: 'Others', value: 15 },
    ],
    themes: [
      { theme: '时尚外观', frequency: 90, sentiment: 0.9, isNegative: false },
      { theme: '接口丰富', frequency: 75, sentiment: 0.85, isNegative: false },
      { theme: '屏幕反光', frequency: 30, sentiment: 0.3, isNegative: true },
      { theme: '做工细节', frequency: 50, sentiment: 0.7, isNegative: false },
    ],
    channels: [
      { channel: '京东 (JD)', share: 45 },
      { channel: '天猫 (Tmall)', share: 30 },
      { channel: '联想官网', share: 20 },
      { channel: '线下/其他', share: 5 },
    ]
  },
  ideapad: {
    id: 'ideapad',
    persona: {
      segment: '时尚学生与基础办公',
      ageRange: '18-25',
      occupation: '大学生、行政助理',
      lifestyle: ['影音娱乐', '学习工具', '平价首选']
    },
    demographics: [
      { category: 'Gender', label: 'Male', value: 48 },
      { category: 'Gender', label: 'Female', value: 52 },
      { category: 'Region', label: 'Tier 2', value: 40 },
      { category: 'Region', label: 'Tier 3+', value: 40 },
      { category: 'Region', label: 'Tier 1', value: 20 },
    ],
    themes: [
      { theme: '极致性价比', frequency: 95, sentiment: 0.95, isNegative: false },
      { theme: '轻薄机身', frequency: 80, sentiment: 0.8, isNegative: false },
      { theme: '质感一般', frequency: 45, sentiment: 0.4, isNegative: true },
      { theme: '键盘手感', frequency: 30, sentiment: 0.5, isNegative: true },
    ],
    channels: [
      { channel: '天猫 (Tmall)', share: 40 },
      { channel: '京东 (JD)', share: 35 },
      { channel: '抖音直播', share: 15 },
      { channel: '其他', share: 10 },
    ]
  },
  legion: {
    id: 'legion',
    persona: {
      segment: '硬核游戏玩家与设计师',
      ageRange: '18-35',
      occupation: '职业电竞、3D渲染、IT男',
      lifestyle: ['性能极客', '电竞文化', '高效渲染']
    },
    demographics: [
      { category: 'Gender', label: 'Male', value: 88 },
      { category: 'Gender', label: 'Female', value: 12 },
      { category: 'Region', label: 'Tier 1', value: 50 },
      { category: 'Region', label: 'Tier 2', value: 35 },
      { category: 'Region', label: 'Others', value: 15 },
    ],
    themes: [
      { theme: '满血性能', frequency: 98, sentiment: 0.98, isNegative: false },
      { theme: '散热强悍', frequency: 92, sentiment: 0.9, isNegative: false },
      { theme: '风扇噪音', frequency: 60, sentiment: 0.35, isNegative: true },
      { theme: '电源适配器沉', frequency: 55, sentiment: 0.4, isNegative: true },
    ],
    channels: [
      { channel: '京东 (JD)', share: 60 },
      { channel: '联想官网', share: 20 },
      { channel: '线下电竞店', share: 15 },
      { channel: '其他', share: 5 },
    ]
  },
  thinkpad: {
    id: 'thinkpad',
    persona: {
      segment: '企业高管与资深商务',
      ageRange: '30-50',
      occupation: '经理人、顾问、开发者',
      lifestyle: ['沉稳商务', '极致稳定', '高效生产力']
    },
    demographics: [
      { category: 'Gender', label: 'Male', value: 75 },
      { category: 'Gender', label: 'Female', value: 25 },
      { category: 'Region', label: 'Tier 1', value: 70 },
      { category: 'Region', label: 'Tier 2', value: 20 },
      { category: 'Others', label: 'Others', value: 10 },
    ],
    themes: [
      { theme: '键盘手感', frequency: 95, sentiment: 0.95, isNegative: false },
      { theme: '极致稳定性', frequency: 90, sentiment: 0.9, isNegative: false },
      { theme: '溢价偏高', frequency: 40, sentiment: 0.45, isNegative: true },
      { theme: '传统设计', frequency: 30, sentiment: 0.5, isNegative: false },
    ],
    channels: [
      { channel: '大客户B2B', share: 55 },
      { channel: '官网企业店', share: 25 },
      { channel: '线下经销商', share: 15 },
      { channel: '零售商', share: 5 },
    ]
  },
  yoga: {
    id: 'yoga',
    persona: {
      segment: '创意人群与生活美学',
      ageRange: '25-40',
      occupation: '插画师、博主、传媒高管',
      lifestyle: ['美学至上', '多模办公', '高端质感']
    },
    demographics: [
      { category: 'Gender', label: 'Male', value: 40 },
      { category: 'Gender', label: 'Female', value: 60 },
      { category: 'Region', label: 'Tier 1', value: 65 },
      { category: 'Region', label: 'Tier 2', value: 25 },
      { category: 'Others', label: 'Others', value: 10 },
    ],
    themes: [
      { theme: '翻转触控', frequency: 85, sentiment: 0.88, isNegative: false },
      { theme: '机身质感', frequency: 90, sentiment: 0.9, isNegative: false },
      { theme: '接口较少', frequency: 50, sentiment: 0.3, isNegative: true },
      { theme: '屏幕素质', frequency: 88, sentiment: 0.92, isNegative: false },
    ],
    channels: [
      { channel: '联想官网', share: 35 },
      { channel: '天猫 (Tmall)', share: 30 },
      { channel: '精品快闪店', share: 15 },
      { channel: '京东 (JD)', share: 20 },
    ]
  }
};
