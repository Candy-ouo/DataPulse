function r(min, max) { return Math.round(Math.random() * (max - min) + min); }
function rd(min, max, decimals) { return Number((Math.random() * (max - min) + min).toFixed(decimals)); }

// 基于基值生成小幅波动的随机数（变化幅度 ±variance%）
function fluctuate(base, variance = 0.05) {
  return Math.round(base * (1 + (Math.random() - 0.5) * variance * 2));
}

export function generateOverview() {
  return {
    totalUsers: fluctuate(12846, 0.03),
    activeUsers: fluctuate(6341, 0.05),
    totalRevenue: fluctuate(3856200, 0.04),
    conversionRate: rd(3.2, 3.8, 2),
  };
}

export function generateKpiData() {
  return [
    { label: "总用户", value: (fluctuate(12846, 0.03)).toLocaleString(), change: `${rd(-3, 8, 1)}%`, status: Math.random() > 0.2 ? "up" : "down" },
    { label: "活跃用户", value: (fluctuate(6341, 0.05)).toLocaleString(), change: `${rd(-2, 10, 1)}%`, status: Math.random() > 0.15 ? "up" : "down" },
    { label: "总收入", value: `¥${(fluctuate(3856, 0.04) / 10).toFixed(1)}w`, change: `${rd(-1, 6, 1)}%`, status: Math.random() > 0.1 ? "up" : "down" },
    { label: "转化率", value: `${rd(3.2, 3.8, 2)}%`, change: `${rd(-3, 3, 1)}%`, status: Math.random() > 0.5 ? "up" : "down" },
  ];
}

const MONTHS = ["01", "02", "03", "04", "05", "06"];
export function generateTrends() {
  let pv = 48000, uv = 32000, rev = 520000;
  return MONTHS.map((m, i) => {
    if (i > 0) {
      pv = fluctuate(pv, 0.08);
      uv = fluctuate(uv, 0.06);
      rev = fluctuate(rev, 0.05);
    }
    return { date: `2026-${m}`, pv, uv, revenue: rev };
  });
}

const CAT_NAMES = ["电子产品", "服装鞋帽", "食品饮料", "家居用品", "其他"];
export function generateCategories() {
  const total = 100;
  const values = CAT_NAMES.map(() => r(5, 30));
  const sum = values.reduce((a, b) => a + b, 0);
  return CAT_NAMES.map((name, i) => ({
    name,
    value: i === CAT_NAMES.length - 1 ? total : Math.round((values[i] / sum) * 100),
  }));
}

const PROVINCES = ["广东", "浙江", "江苏", "北京", "上海", "四川", "山东", "河南"];
export function generateGeography() {
  const top6 = PROVINCES.map(name => ({
    province: name,
    value: fluctuate(r(1500, 3500), 0.1),
  }));
  return top6.sort((a, b) => b.value - a.value);
}

export function generateRealtime() {
  return {
    currentVisitors: r(180, 400),
    todayOrders: r(700, 1300),
    todayRevenue: r(50000, 95000),
    systemLoad: r(35, 85),
  };
}
