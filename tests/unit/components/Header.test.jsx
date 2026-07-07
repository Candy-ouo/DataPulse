import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Header from "@/components/layout/Header";

describe("Header", () => {
  it("renders title", () => {
    render(<Header title="DataPulse" />);
    expect(screen.getByText("DataPulse")).toBeInTheDocument();
  });

  it("shows system status", () => {
    render(<Header title="Test" />);
    expect(screen.getByText(/系统运行中/)).toBeInTheDocument();
  });
});
