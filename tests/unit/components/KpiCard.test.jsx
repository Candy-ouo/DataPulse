import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import KpiCard from "@/components/data-display/KpiCard";

describe("KpiCard", () => {
  it("renders label and value", () => {
    render(<KpiCard label="总用户" value="12,846" />);
    expect(screen.getByText("总用户")).toBeInTheDocument();
    expect(screen.getByText("12,846")).toBeInTheDocument();
  });

  it("shows positive change in green", () => {
    render(<KpiCard label="收入" value="100" change="+5%" status="up" />);
    expect(screen.getByText("+5%")).toHaveClass("text-[#00ffaa]");
  });

  it("shows negative change in red", () => {
    render(<KpiCard label="收入" value="100" change="-3%" status="down" />);
    expect(screen.getByText("-3%")).toHaveClass("text-[#ff4757]");
  });
});
