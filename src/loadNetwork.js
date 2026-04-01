// Static imports for each network — add new networks here
import fermiNodeData from "../networks/fermi/node-data.json";
import fermiEdges from "../networks/fermi/edges.json";
import fermiNodeSources from "../networks/fermi/node-sources.json";
import fermiTheme from "../networks/fermi/theme.json";

const networks = {
  fermi: {
    nodeData: fermiNodeData,
    edges: fermiEdges,
    nodeSources: fermiNodeSources,
    theme: fermiTheme,
  },
};

export function loadNetwork() {
  const name = typeof __NETWORK__ !== "undefined" ? __NETWORK__ : "fermi";
  return networks[name] || networks.fermi;
}
