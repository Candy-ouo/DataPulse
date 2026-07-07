const logs = [];
const MAX_LOG = 500;
export const LogCollector = {
  push(entry) { logs.push(entry); if (logs.length > MAX_LOG) logs.shift(); },
  getAll() { return [...logs]; },
  clear() { logs.length = 0; },
  filter({ level, module, keyword } = {}) {
    return logs.filter(e =>
      (!level || e.level === level) &&
      (!module || e.module.includes(module)) &&
      (!keyword || e.message.includes(keyword))
    );
  },
  export() { return JSON.stringify(logs, null, 2); },
};
