import { create } from "zustand";
export const useDataStore = create((set, get) => ({
  data: {},
  loading: {},
  errors: {},
  setData: (key, val) => set(s => ({ data: { ...s.data, [key]: val }, loading: { ...s.loading, [key]: false }, errors: { ...s.errors, [key]: null } })),
  setLoading: (key, val) => set(s => ({ loading: { ...s.loading, [key]: val } })),
  setError: (key, err) => set(s => ({ errors: { ...s.errors, [key]: err }, loading: { ...s.loading, [key]: false } })),
  getData: key => get().data[key],
  clearAll: () => set({ data: {}, loading: {}, errors: {} }),
}));
