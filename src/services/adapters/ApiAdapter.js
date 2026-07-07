import http from "@/services/request";
import logger from "@/logger/Logger";
export class ApiAdapter {
  async fetch(serviceName, params = {}) {
    const start = performance.now();
    logger.info("ApiAdapter", `GET ${serviceName}`, { params });
    try {
      const res = await http.get(`/${serviceName}`, { params });
      logger.info("ApiAdapter", `${serviceName} ${res.status}`, { duration: Math.round(performance.now() - start) });
      return res.data;
    } catch (e) {
      logger.error("ApiAdapter", `${serviceName} 失败: ${e.message}`);
      throw e;
    }
  }
}
