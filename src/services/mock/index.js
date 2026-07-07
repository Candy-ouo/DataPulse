import { generateKpiData, generateTrends, generateCategories, generateGeography, generateTopKpis, generateRealtime, generateCategoryProducts } from "./generator";

const serviceMap = {
  kpi: generateKpiData,
  trends: generateTrends,
  categories: generateCategories,
  categoryProducts: generateCategoryProducts,
  geography: generateGeography,
  topKpis: generateTopKpis,
  realtime: generateRealtime,
};

export function getMockData(name) {
  const g = serviceMap[name];
  if (!g) throw new Error("Mock not found: " + name);
  return g();
}
