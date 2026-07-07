import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useData } from "@/hooks/useData";

vi.mock("@/services/dataSource", () => ({
  dataSource: {
    getData: vi.fn(),
  },
}));

import { dataSource } from "@/services/dataSource";

describe("useData", () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it("returns data on success", async () => {
    dataSource.getData.mockResolvedValue({ value: 42 });
    const { result } = renderHook(() => useData("test"));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual({ value: 42 });
    expect(result.current.error).toBeNull();
  });

  it("returns error on failure", async () => {
    dataSource.getData.mockRejectedValue(new Error("fail"));
    const { result } = renderHook(() => useData("test"));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toBeNull();
  });
});
