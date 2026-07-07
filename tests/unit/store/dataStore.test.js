import { describe, it, expect } from "vitest";
import { useDataStore } from "@/store/dataStore";

describe("useDataStore", () => {
  it("sets and retrieves data", () => {
    const { setData, getData } = useDataStore.getState();
    setData("test", [1, 2, 3]);
    expect(getData("test")).toEqual([1, 2, 3]);
  });

  it("clears all data", () => {
    const store = useDataStore.getState();
    store.setData("a", 1);
    store.clearAll();
    expect(useDataStore.getState().data).toEqual({});
  });

  it("tracks loading state", () => {
    const { setLoading } = useDataStore.getState();
    setLoading("test", true);
    expect(useDataStore.getState().loading.test).toBe(true);
    setLoading("test", false);
    expect(useDataStore.getState().loading.test).toBe(false);
  });
});
