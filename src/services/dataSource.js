import { APP_CONFIG } from "@/config/app";
import { MockAdapter } from "./adapters/MockAdapter";
import { ApiAdapter } from "./adapters/ApiAdapter";
import logger from "@/logger/Logger";

class DataSourceFactory {
  constructor() { this.adapter = null; this.switch(APP_CONFIG.dataSource); }
  switch(mode) {
    if (mode === "api") this.adapter = new ApiAdapter();
    else this.adapter = new MockAdapter();
    logger.info("DataSource", `切换至 ${mode} 模式`);
  }
  async getData(service, params = {}) {
    const start = performance.now();
    try {
      const data = await this.adapter.fetch(service, params);
      logger.info("DataSource", `${service} 请求成功`, { duration: Math.round(performance.now() - start) });
      return data;
    } catch (e) {
      logger.error("DataSource", `${service} 失败`, { error: e.message });
      throw e;
    }
  }
}
export const dataSource = new DataSourceFactory();
