import { generateKpiData, generateTrends, generateCategories, generateGeography, generateOverview, generateRealtime } from "./generator";

const serviceMap = {
  overview: generateOverview,
  kpi: generateKpiData,
  trends: generateTrends,
  categories: generateCategories,
  geography: generateGeography,
  realtime: generateRealtime,
};

export function getMockData(name) {
  const generator = serviceMap[name];
  if (!generator) throw new Error(`Mock not found: ${name}`);
  return generator();
}

export { generateKpiData, generateTrends, generateCategories, generateGeography };
