function r(min, max) { return Math.round(Math.random() * (max - min) + min); }
function rd(min, max, d) { return Number((Math.random() * (max - min) + min).toFixed(d)); }
function fl(base, v) { return Math.round(base * (1 + (Math.random() - 0.5) * v * 2)); }

export function generateOverview() {
  return { totalUsers: fl(12846, 0.03), activeUsers: fl(6341, 0.05), totalRevenue: fl(3856200, 0.04), conversionRate: rd(3.2, 3.8, 2) };
}

export function generateKpiData() {
  return [
    { label: "总用户", value: fl(12846, 0.03).toLocaleString(), change: rd(-3, 8, 1) + "%", status: Math.random() > 0.2 ? "up" : "down" },
    { label: "活跃用户", value: fl(6341, 0.05).toLocaleString(), change: rd(-2, 10, 1) + "%", status: Math.random() > 0.15 ? "up" : "down" },
    { label: "总收入", value: "¥" + (fl(3856, 0.04) / 10).toFixed(1) + "w", change: rd(-1, 6, 1) + "%", status: Math.random() > 0.1 ? "up" : "down" },
    { label: "转化率", value: rd(3.2, 3.8, 2) + "%", change: rd(-3, 3, 1) + "%", status: Math.random() > 0.5 ? "up" : "down" },
  ];
}

const MONTHS = ["01", "02", "03", "04", "05", "06"];
export function generateTrends() {
  let pv = 48000, uv = 32000, rev = 520000;
  return MONTHS.map((m) => {
    const o = { date: "2026-" + m, pv, uv, revenue: rev };
    pv = fl(pv, 0.08); uv = fl(uv, 0.06); rev = fl(rev, 0.05);
    return o;
  });
}

const CATS = ["手机数码", "服装鞋帽", "美食饮品", "家居生活", "运动健康", "汽车用品", "图书教育", "其他"];
export function generateCategories() {
  const mainTotal = 92;
  const vs = CATS.slice(0, -1).map(() => r(8, 18));
  const sum = vs.reduce((a, b) => a + b, 0);
  const result = CATS.slice(0, -1).map((n, i) => ({ name: n, value: Math.round((vs[i] / sum) * mainTotal) }));
  const used = result.reduce((s, d) => s + d.value, 0);
  result.push({ name: CATS[CATS.length - 1], value: Math.min(100 - used, 8) });
  return result;
}

export function generateCategoryProducts() {
  const names = ["手机数码", "服装鞋帽", "美食饮品", "家居生活", "运动健康", "汽车用品", "图书教育", "其他"];
  const totals = [2580, 1860, 1420, 980, 760, 540, 410, 120];
  return names.map((name, i) => ({ name, value: fl(totals[i], 0.06) }));
}

const PROVS = ["广东", "浙江", "江苏", "北京", "上海", "四川", "山东", "河南"];
export function generateGeography() {
  return PROVS.map(n => ({ province: n, value: fl(r(1500, 3500), 0.1) })).sort((a, b) => b.value - a.value);
}

export function generateRealtime() {
  return { currentVisitors: r(180, 400), todayOrders: r(700, 1300), todayRevenue: r(50000, 95000), systemLoad: r(35, 85) };
}

export function generateTopKpis() {
  const u = fl(12846, 0.03), a = fl(6341, 0.05), rev = fl(3856200, 0.04);
  return [
    { label: "总用户", value: u.toLocaleString(), suffix: "人", sub: "昨日 +" + r(120, 380) },
    { label: "活跃用户", value: a.toLocaleString(), suffix: "人", sub: "活跃率 " + rd(42, 56, 1) + "%" },
    { label: "总收入", value: "¥" + (rev / 10000).toFixed(1), suffix: "万", sub: "同比增长 " + rd(8, 22, 1) + "%" },
    { label: "转化率", value: rd(3.2, 3.9, 2), suffix: "%", sub: "环比 " + rd(-1.5, 2.5, 1) + "%" },
    { label: "实时访客", value: r(180, 400).toString(), suffix: "人", sub: "当前在线" },
    { label: "今日订单", value: r(700, 1300).toString(), suffix: "单", sub: "预计营收 ¥" + r(5, 12) + "w" },
  ];
}
