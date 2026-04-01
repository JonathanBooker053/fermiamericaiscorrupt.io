import { useState } from "react";
import GraphCanvas from "./components/GraphCanvas";
import Toolbar from "./components/Toolbar";
import NodePanel from "./components/NodePanel";
import { loadNetwork } from "./loadNetwork";

const { nodeData, edges: edgesData, nodeSources, theme } = loadNetwork();

const NODES = Object.entries(nodeData).map(([id, d]) => ({
  id,
  label: d.label,
  sub:   d.sub,
  category: d.category,
}));

export default function App() {
  const [sel, setSel]                   = useState(null);
  const [filterCat, setFilterCat]       = useState(null);
  const [detailSection, setDetailSection] = useState(0);

  return (
    <div
      style={{
        background:    "var(--clr-board)",
        minHeight:     "100vh",
        display:       "flex",
        flexDirection: "column",
        fontFamily:    "var(--font-body)",
        color:         "var(--clr-paper)",
        overflow:      "hidden",
      }}
    >
      <Toolbar
        nodes={NODES}
        edges={edgesData}
        theme={theme}
        filterCat={filterCat}
        setFilterCat={setFilterCat}
        setSel={setSel}
      />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <GraphCanvas
          nodes={NODES}
          edges={edgesData}
          nodeData={nodeData}
          theme={theme}
          sel={sel}
          setSel={setSel}
          filterCat={filterCat}
          setDetailSection={setDetailSection}
        />

        <NodePanel
          sel={sel}
          setSel={setSel}
          nodeData={nodeData}
          nodeSources={nodeSources}
          edges={edgesData}
          theme={theme}
          detailSection={detailSection}
          setDetailSection={setDetailSection}
          nodes={NODES}
        />
      </div>
    </div>
  );
}
