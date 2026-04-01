import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Toolbar from "../components/Toolbar";

const mockTheme = {
  CAT_COLOR: { person: "#60a5fa", company_core: "#f59e0b" },
  CAT_LABEL: { person: "Key People", company_core: "Fermi Core" },
};

describe("Toolbar", () => {
  it("renders the ALL filter button", () => {
    render(
      <Toolbar
        nodes={[{ id: "a", label: "A", category: "person" }]}
        edges={[]}
        theme={mockTheme}
        filterCat={null}
        setFilterCat={() => {}}
        setSel={() => {}}
      />
    );
    expect(screen.getByText("ALL")).toBeInTheDocument();
  });

  it("renders category filter buttons", () => {
    render(
      <Toolbar
        nodes={[]}
        edges={[]}
        theme={mockTheme}
        filterCat={null}
        setFilterCat={() => {}}
        setSel={() => {}}
      />
    );
    expect(screen.getByText("KEY PEOPLE")).toBeInTheDocument();
    expect(screen.getByText("FERMI CORE")).toBeInTheDocument();
  });
});
