import { useState, useEffect, useCallback } from "react";
import { dataSource } from "@/services/dataSource";
import { useLogger } from "./useLogger";

export function useData(serviceName, params = {}, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const log = useLogger("useData");
  const { refreshInterval = 0 } = options;

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await dataSource.getData(serviceName, params);
      setData(res);
      setError(null);
    } catch (e) {
      setError(e);
      log.error(`${serviceName} 获取失败`, e);
    } finally {
      setLoading(false);
    }
  }, [serviceName, JSON.stringify(params)]);

  useEffect(() => {
    fetchData();
    if (refreshInterval > 0) {
      const timer = setInterval(fetchData, refreshInterval);
      return () => clearInterval(timer);
    }
  }, [fetchData, refreshInterval]);

  return { data, loading, error, refetch: fetchData };
}
