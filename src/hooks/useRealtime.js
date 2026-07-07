import { useData } from "./useData";
export function useRealtime(serviceName, interval = 5000) {
  return useData(serviceName, {}, { refreshInterval: interval });
}
