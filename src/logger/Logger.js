import { LogLevel } from "./LogLevel";
import { LogCollector } from "./LogCollector";

const logger = {
  log(level, module, message, meta = {}) {
    const entry = {
      timestamp: new Date().toISOString(),
      level: LogLevel.labels[level] || "UNKNOWN",
      module, message, meta,
    };
    const p = `[${entry.timestamp.slice(11,19)}] [${entry.level}] [${entry.module}]`;
    if (level === LogLevel.ERROR) console.error(p, message, meta);
    else if (level === LogLevel.WARN) console.warn(p, message, meta);
    else console.log(p, message, meta);
    LogCollector.push(entry);
  },
  debug(m, msg, meta) { this.log(LogLevel.DEBUG, m, msg, meta); },
  info(m, msg, meta)  { this.log(LogLevel.INFO, m, msg, meta); },
  warn(m, msg, meta)  { this.log(LogLevel.WARN, m, msg, meta); },
  error(m, msg, meta) { this.log(LogLevel.ERROR, m, msg, meta); },
};
export default logger;
