import { overviewData, kpiData } from "./datasets/overview";
import { trendData, categoryData } from "./datasets/trends";
import { geoData } from "./datasets/geography";
import { generateRealtime } from "./generator";
const db = { overview:overviewData, kpi:kpiData, trends:trendData, categories:categoryData, geography:geoData, realtime:generateRealtime() };
export function getMockData(name) {
  if (!db[name]) throw new Error("Mock not found: "+name);
  if (name==="realtime") { db.realtime=generateRealtime(); return db.realtime; }
  return db[name];
}
export { overviewData, kpiData, trendData, categoryData, geoData };
