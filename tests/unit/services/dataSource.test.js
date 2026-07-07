import { describe, it, expect, vi, beforeEach } from "vitest";
import { dataSource } from "@/services/dataSource";

vi.mock("@/config/app", () => ({
  APP_CONFIG: { dataSource: "mock", apiBaseUrl: "/api", logLevel: "info", title: "Test" },
}));

vi.mock("@/logger/Logger", () => ({
  default: { info: vi.fn(), error: vi.fn(), warn: vi.fn(), debug: vi.fn() },
}));

describe("DataSource", () => {
  it("has a working getData method", async () => {
    const result = await dataSource.getData("kpi");
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it("throws on unknown service", async () => {
    await expect(dataSource.getData("unknown_service")).rejects.toThrow();
  });
});
