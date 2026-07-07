export const APP_CONFIG = {
  dataSource: import.meta.env.VITE_DATA_SOURCE || 'mock',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
  logLevel: import.meta.env.VITE_LOG_LEVEL || 'info',
  title: import.meta.env.VITE_APP_TITLE || 'DataPulse · 数据脉动',
  version: '1.0.0',
};
