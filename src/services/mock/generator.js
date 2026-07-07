// === DataPulse Mock Data (Static) ===
// All data is pre-computed and returned identically on every call.

const overview = { totalUsers: 12846, activeUsers: 6341, totalRevenue: 3856200, conversionRate: 3.42 };

const kpiData = [
  { label: "总用户", value: "12,846", change: "+5.2%", status: "up" },
  { label: "活跃用户", value: "6,341", change: "+8.3%", status: "up" },
  { label: "总收入", value: "¥385.6w", change: "+12.1%", status: "up" },
  { label: "转化率", value: "3.42%", change: "-0.8%", status: "down" },
];

const trends = [
  { date: "2026-01", pv: 48000, uv: 32000, revenue: 520000 },
  { date: "2026-02", pv: 52300, uv: 34800, revenue: 583000 },
  { date: "2026-03", pv: 57500, uv: 37600, revenue: 647000 },
  { date: "2026-04", pv: 63200, uv: 41500, revenue: 712000 },
  { date: "2026-05", pv: 72400, uv: 48300, revenue: 785000 },
  { date: "2026-06", pv: 85600, uv: 56200, revenue: 873000 },
];

const categories = [
  { name: "手机数码", value: 31 },
  { name: "服装鞋帽", value: 22 },
  { name: "美食饮品", value: 17 },
  { name: "家居生活", value: 12 },
  { name: "运动健康", value: 9 },
  { name: "汽车用品", value: 5 },
  { name: "图书教育", value: 3 },
  { name: "其他", value: 1 },
];

const categoryProducts = [
  { name: "手机数码", value: 2580 },
  { name: "服装鞋帽", value: 1860 },
  { name: "美食饮品", value: 1420 },
  { name: "家居生活", value: 980 },
  { name: "运动健康", value: 760 },
  { name: "汽车用品", value: 540 },
  { name: "图书教育", value: 410 },
  { name: "其他", value: 120 },
];

const geography = [
  { province: "广东", value: 3200 },
  { province: "浙江", value: 2800 },
  { province: "江苏", value: 2500 },
  { province: "北京", value: 2200 },
  { province: "上海", value: 2000 },
  { province: "四川", value: 1600 },
  { province: "山东", value: 1300 },
  { province: "河南", value: 1050 },
];

const realtime = { currentVisitors: 247, todayOrders: 892, todayRevenue: 68500, systemLoad: 72 };

const topKpis = [
  { label: "总用户", value: "12,846", suffix: "人", sub: "昨日 +236" },
  { label: "活跃用户", value: "6,341", suffix: "人", sub: "活跃率 49.3%" },
  { label: "总收入", value: "¥385.6", suffix: "万", sub: "同比增长 12.1%" },
  { label: "转化率", value: "3.42", suffix: "%", sub: "环比 -0.8%" },
  { label: "实时访客", value: "247", suffix: "人", sub: "当前在线" },
  { label: "今日订单", value: "892", suffix: "单", sub: "预计营收 ¥6.8w" },
];

// === Exports (each returns a fresh copy to prevent mutation) ===
export function generateOverview() { return { ...overview }; }
export function generateKpiData() { return kpiData.map(i => ({ ...i })); }
export function generateTrends() { return trends.map(i => ({ ...i })); }
export function generateCategories() { return categories.map(i => ({ ...i })); }
export function generateCategoryProducts() { return categoryProducts.map(i => ({ ...i })); }
export function generateGeography() { return geography.map(i => ({ ...i })); }
export function generateRealtime() { return { ...realtime }; }
export function generateTopKpis() { return topKpis.map(i => ({ ...i })); }

