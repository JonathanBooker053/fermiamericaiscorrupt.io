import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("../loadNetwork", () => ({
  loadNetwork: () => ({
    nodeData: {
      testNode: {
        label: "Test Node",
        sub: "A test entity",
        category: "person",
        flag: "TEST",
        flagColor: "#ef4444",
        icon: "\u{1F464}",
        sections: [{ title: "Info", items: ["Item 1"] }],
      },
    },
    edges: [],
    nodeSources: {},
    theme: {
      CAT_COLOR: { person: "#60a5fa" },
      CAT_LABEL: { person: "Key People" },
      EDGE_COLOR: { family: "#fbbf24" },
      EDGE_LABEL: { family: "Family Tie" },
      NODE_WEIGHTS: { testNode: 5 },
      HOME_FRAC: { testNode: [0.5, 0.5] },
      ZONE_LABELS: [],
    },
  }),
}));

import App from "../App";

describe("App", () => {
  it("renders the graph canvas", () => {
    const { container } = render(<App />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("renders the toolbar header", () => {
    render(<App />);
    expect(
      screen.getByText(/FERMI AMERICA \/\/ PROJECT MATADOR/)
    ).toBeInTheDocument();
  });
});
