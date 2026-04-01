import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NodePanel from "../components/NodePanel";

const mockTheme = {
  CAT_COLOR: { person: "#60a5fa" },
  CAT_LABEL: { person: "Key People" },
  EDGE_COLOR: { family: "#fbbf24" },
  EDGE_LABEL: { family: "Family Tie" },
};

const mockNodeData = {
  alice: {
    label: "Alice Smith",
    sub: "CEO, Example Corp",
    category: "person",
    flag: "HIGH RISK",
    flagColor: "#ef4444",
    icon: "\u{1F464}",
    sections: [
      { title: "Background", items: ["Born: 1980", "Education: MIT"] },
      { title: "Red Flags", items: ["\u26A0 Flag one"] },
    ],
  },
};

describe("NodePanel", () => {
  it("renders node label when a node is selected", () => {
    render(
      <NodePanel
        sel="alice"
        setSel={() => {}}
        nodeData={mockNodeData}
        nodeSources={{}}
        edges={[]}
        theme={mockTheme}
        detailSection={0}
        setDetailSection={() => {}}
        nodes={[{ id: "alice", label: "Alice Smith", sub: "CEO", category: "person" }]}
      />
    );
    expect(screen.getByText("Alice Smith")).toBeInTheDocument();
    expect(screen.getByText("CEO, Example Corp")).toBeInTheDocument();
  });

  it("renders default state when no node is selected", () => {
    render(
      <NodePanel
        sel={null}
        setSel={() => {}}
        nodeData={{}}
        nodeSources={{}}
        edges={[]}
        theme={mockTheme}
        detailSection={0}
        setDetailSection={() => {}}
        nodes={[]}
      />
    );
    expect(screen.getByText(/Select any node/)).toBeInTheDocument();
  });
});
