import logger from "@/logger/Logger";
import { getMockData } from "@/services/mock";
export class MockAdapter {
  async fetch(serviceName, params = {}) {
    const start = performance.now();
    await new Promise(r => setTimeout(r, 100 + Math.random() * 200));
    logger.info("MockAdapter", `fetch ${serviceName}`, { params });
    const data = getMockData(serviceName);
    logger.info("MockAdapter", `${serviceName} 返回成功`, { duration: Math.round(performance.now() - start) });
    return data;
  }
}
