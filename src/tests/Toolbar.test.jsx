import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Toolbar from "../components/Toolbar";

const mockTheme = {
  CAT_COLOR: { person: "#60a5fa", company_core: "#f59e0b" },
  CAT_LABEL: { person: "Key People", company_core: "Fermi Core" },
};

describe("Toolbar", () => {
  it("renders the ALL FILES filter button", () => {
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
    expect(screen.getByText("ALL FILES")).toBeInTheDocument();
  });

  it("renders category filter buttons", () => {
    render(
      <Toolbar
        nodes={[
          { id: "a", label: "A", category: "person" },
          { id: "b", label: "B", category: "company_core" },
        ]}
        edges={[]}
        theme={mockTheme}
        filterCat={null}
        setFilterCat={() => {}}
        setSel={() => {}}
      />
    );
    expect(screen.getByText("Key People")).toBeInTheDocument();
    expect(screen.getByText("Fermi Core")).toBeInTheDocument();
  });
});
