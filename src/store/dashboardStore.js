import { create } from "zustand";
export const useDashboardStore = create(set => ({
  title: "DataPulse · 数据脉动",
  refreshInterval: 5000,
  theme: "dark",
  widgets: ["kpi","bar","line","pie","map"],
  setTitle: t => set({ title: t }),
  setRefreshInterval: t => set({ refreshInterval: t }),
  toggleWidget: w => set(s => ({ widgets: s.widgets.includes(w) ? s.widgets.filter(x=>x!==w) : [...s.widgets,w] })),
}));
