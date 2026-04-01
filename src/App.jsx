import { useState, useEffect } from "react";
import GraphCanvas from "./components/GraphCanvas";
import Toolbar from "./components/Toolbar";
import NodePanel from "./components/NodePanel";
import CampaignNav from "./components/CampaignNav";
import CampaignFooter from "./components/CampaignFooter";
import CampaignCTA from "./components/CampaignCTA";
import NodeCardList from "./components/NodeCardList";
import { loadNetwork } from "./loadNetwork";
import { loadStyle, buildThemeColors, remapFlag } from "./styleLoader";

const { nodeData, edges: edgesData, nodeSources, theme } = loadNetwork();
const styleName = theme.style || 'default';
const style = loadStyle(styleName);

// Override theme colors with style palette when texas-dem is active
const themeColorOverrides = style.palette ? buildThemeColors(style.palette, styleName) : null;
const activeTheme = themeColorOverrides
  ? { ...theme, CAT_COLOR: themeColorOverrides.CAT_COLOR, EDGE_COLOR: themeColorOverrides.EDGE_COLOR }
  : theme;

const NODES = Object.entries(nodeData).map(([id, d]) => ({
  id,
  label: d.label,
  sub: d.sub,
  category: d.category,
}));

const isCampaign = styleName === 'texas-dem';

export default function App() {
  const [sel, setSel] = useState(null);
  const [filterCat, setFilterCat] = useState(null);
  const [detailSection, setDetailSection] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const campaign = style.campaign;

  return (
    <div
      style={{
        background: isCampaign ? "#F4F6FB" : "#f4f6f9",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: isCampaign ? "'Lato', 'Helvetica Neue', sans-serif" : "monospace",
        color: isCampaign ? "#0A0A1A" : "#1a2840",
      }}
    >
      {isCampaign && campaign ? (
        <CampaignNav navConfig={campaign.navConfig} nodes={NODES} edges={edgesData} />
      ) : (
        <Toolbar
          nodes={NODES}
          edges={edgesData}
          theme={activeTheme}
          filterCat={filterCat}
          setFilterCat={setFilterCat}
          setSel={setSel}
          styleName={styleName}
        />
      )}

      {/* Filter bar for campaign style */}
      {isCampaign && (
        <Toolbar
          nodes={NODES}
          edges={edgesData}
          theme={activeTheme}
          filterCat={filterCat}
          setFilterCat={setFilterCat}
          setSel={setSel}
          styleName={styleName}
          filtersOnly
        />
      )}

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {isMobile ? (
          <NodeCardList
            nodes={filterCat ? NODES.filter(n => n.category === filterCat) : NODES}
            nodeData={nodeData}
            theme={activeTheme}
            sel={sel}
            setSel={setSel}
            setDetailSection={setDetailSection}
            styleName={styleName}
            remapFlag={remapFlag}
          />
        ) : (
          <GraphCanvas
            nodes={NODES}
            edges={edgesData}
            nodeData={nodeData}
            theme={activeTheme}
            sel={sel}
            setSel={setSel}
            filterCat={filterCat}
            setDetailSection={setDetailSection}
            styleName={styleName}
            remapFlag={remapFlag}
          />
        )}

        {!isMobile && (
          <NodePanel
            sel={sel}
            setSel={setSel}
            nodeData={nodeData}
            nodeSources={nodeSources}
            edges={edgesData}
            theme={activeTheme}
            detailSection={detailSection}
            setDetailSection={setDetailSection}
            nodes={NODES}
            styleName={styleName}
            sidebarConfig={campaign?.sidebarConfig}
            remapFlag={remapFlag}
          />
        )}
      </div>

      {isCampaign && campaign && (
        <>
          <CampaignCTA ctaStripConfig={campaign.ctaStripConfig} />
          <CampaignFooter footerConfig={campaign.footerConfig} />
        </>
      )}
    </div>
  );
}
