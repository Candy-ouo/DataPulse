import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import KpiCard from "@/components/data-display/KpiCard";

describe("KpiCard", () => {
  it("renders label and value", () => {
    render(<KpiCard label="总用户" value="12,846" />);
    expect(screen.getByText("总用户")).toBeInTheDocument();
    expect(screen.getByText("12,846")).toBeInTheDocument();
  });

  it("shows positive change", () => {
    render(<KpiCard label="收入" value="100" change="+5%" status="up" />);
    const el = screen.getByText("+5%");
    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent("+5%");
  });

  it("shows negative change", () => {
    render(<KpiCard label="收入" value="100" change="-3%" status="down" />);
    const el = screen.getByText("-3%");
    expect(el).toBeInTheDocument();
    expect(el).toHaveTextContent("-3%");
  });
});
