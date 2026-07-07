import { generateKpiData, generateTrends, generateCategories, generateGeography, generateTopKpis } from "./generator";

const serviceMap = {
  kpi: generateKpiData,
  trends: generateTrends,
  categories: generateCategories,
  geography: generateGeography,
  topKpis: generateTopKpis,
};

export function getMockData(name) {
  const g = serviceMap[name];
  if (!g) throw new Error("Mock not found: " + name);
  return g();
}
