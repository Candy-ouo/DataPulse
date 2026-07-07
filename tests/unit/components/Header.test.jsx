import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Header from "@/components/layout/Header";

describe("Header", () => {
  it("renders title", () => {
    render(<Header title="DataPulse" />);
    expect(screen.getByText("DataPulse")).toBeInTheDocument();
  });

  it("shows live status", () => {
    render(<Header title="Test" />);
    expect(screen.getByText("LIVE")).toBeInTheDocument();
  });
});
