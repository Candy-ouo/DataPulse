import logger from "@/logger/Logger";
export function useLogger(module) {
  return {
    debug: (m, meta) => logger.debug(module, m, meta),
    info: (m, meta) => logger.info(module, m, meta),
    warn: (m, meta) => logger.warn(module, m, meta),
    error: (m, meta) => logger.error(module, m, meta),
  };
}
