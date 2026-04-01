import { useState, useEffect, useRef, useCallback } from "react";

export default function GraphCanvas({
  nodes,
  edges,
  nodeData,
  theme,
  sel,
  setSel,
  filterCat,
  setDetailSection,
  styleName,
  remapFlag,
}) {
  const isCampaign = styleName === 'texas-dem';
  const svgRef = useRef(null);
  const [dims, setDims] = useState({ w: 820, h: 620 });
  const [pos, setPos] = useState(null);
  const posRef = useRef(null);
  const animRef = useRef(null);
  const tickRef = useRef(0);
  const dragMovedRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const pinnedRef = useRef({});
  const [dragging, setDragging] = useState(null);

  const { CAT_COLOR, EDGE_COLOR, NODE_WEIGHTS, HOME_FRAC, ZONE_LABELS } = theme;

  const weightToRadius = (id, isSel) => {
    const w = NODE_WEIGHTS[id] || 3;
    const base = 16 + (w / 10) * 22;
    return isSel ? base + 8 : base;
  };

  const initPos = useCallback((ns, W, H) => {
    const out = {};
    ns.forEach((n) => {
      const frac = HOME_FRAC[n.id];
      if (frac) {
        out[n.id] = { x: frac[0] * W, y: frac[1] * H, vx: 0, vy: 0 };
      } else {
        out[n.id] = {
          x: W / 2 + (Math.random() - 0.5) * 120,
          y: H / 2 + (Math.random() - 0.5) * 120,
          vx: 0,
          vy: 0,
        };
      }
    });
    return out;
  }, [HOME_FRAC]);

  useEffect(() => {
    const upd = () => {
      const w = Math.min(window.innerWidth - 340, 1200);
      const h = Math.max(820, Math.min(1050, w * 0.875));
      setDims({ w, h });
    };
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  useEffect(() => {
    const p = initPos(nodes, dims.w, dims.h);
    posRef.current = p;
    tickRef.current = 0;
    setPos({ ...p });
  }, [dims.w, dims.h, nodes, initPos]);

  useEffect(() => {
    if (!posRef.current) return;
    tickRef.current = 0;
    let alive = true;
    const run = () => {
      if (!alive || tickRef.current > 30) return;
      tickRef.current++;
      const p = posRef.current;
      const n2 = {};
      nodes.forEach((n) => {
        n2[n.id] = { ...p[n.id] };
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i].id,
            b = nodes[j].id;
          const dx = n2[a].x - n2[b].x,
            dy = n2[a].y - n2[b].y;
          const d = Math.sqrt(dx * dx + dy * dy) || 1;
          const rA = weightToRadius(a, false),
            rB = weightToRadius(b, false);
          const minSep = (rA + rB) * 3.0;
          const f =
            d < minSep
              ? Math.min(4000 / (d * d), 10)
              : Math.min(200 / (d * d), 1);
          n2[a].vx += (dx / d) * f;
          n2[a].vy += (dy / d) * f;
          n2[b].vx -= (dx / d) * f;
          n2[b].vy -= (dy / d) * f;
        }
      }

      nodes.forEach((n) => {
        const pinned = pinnedRef.current[n.id];
        const frac = HOME_FRAC[n.id];
        const homeX = pinned ? pinned.x : frac ? frac[0] * dims.w : null;
        const homeY = pinned ? pinned.y : frac ? frac[1] * dims.h : null;
        if (homeX !== null) {
          n2[n.id].vx += (homeX - n2[n.id].x) * 0.4;
          n2[n.id].vy += (homeY - n2[n.id].y) * 0.4;
        }
      });

      const mg = 90;
      nodes.forEach((n) => {
        if (dragging === n.id) return;
        n2[n.id].vx *= 0.55;
        n2[n.id].vy *= 0.55;
        n2[n.id].x = Math.max(
          mg,
          Math.min(dims.w - mg, n2[n.id].x + n2[n.id].vx)
        );
        n2[n.id].y = Math.max(
          mg,
          Math.min(dims.h - mg, n2[n.id].y + n2[n.id].vy)
        );
      });

      posRef.current = n2;
      setPos({ ...n2 });
      animRef.current = requestAnimationFrame(run);
    };
    animRef.current = requestAnimationFrame(run);
    return () => {
      alive = false;
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [dims.w, dims.h, dragging, nodes, HOME_FRAC]);

  const getConn = (id) => {
    const ns = new Set(),
      ei = new Set();
    edges.forEach((e, i) => {
      if (e.source === id || e.target === id) {
        ns.add(e.source);
        ns.add(e.target);
        ei.add(i);
      }
    });
    return { ns, ei };
  };

  const { ns: cNs, ei: cEi } = sel
    ? getConn(sel)
    : { ns: new Set(), ei: new Set() };
  const vNodes = filterCat
    ? nodes.filter((n) => n.category === filterCat)
    : nodes;
  const vIds = new Set(vNodes.map((n) => n.id));
  const vEdges = edges.filter((e) => vIds.has(e.source) && vIds.has(e.target));

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e) => {
      if (!svgRef.current) return;
      const r = svgRef.current.getBoundingClientRect();
      const x = e.clientX - r.left,
        y = e.clientY - r.top;
      if (!dragMovedRef.current) {
        const dx = x - dragStartRef.current.x,
          dy = y - dragStartRef.current.y;
        if (Math.sqrt(dx * dx + dy * dy) > 8) dragMovedRef.current = true;
      }
      if (dragMovedRef.current) {
        posRef.current = {
          ...posRef.current,
          [dragging]: { ...posRef.current[dragging], x, y, vx: 0, vy: 0 },
        };
        setPos({ ...posRef.current });
      }
    };
    const onUp = () => {
      if (dragMovedRef.current && posRef.current[dragging]) {
        pinnedRef.current[dragging] = {
          x: posRef.current[dragging].x,
          y: posRef.current[dragging].y,
        };
      }
      setDragging(null);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging]);

  if (!pos)
    return (
      <div
        style={{
          background: isCampaign ? "#F4F6FB" : "#f4f6f9",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isCampaign ? "#3D4566" : "#8aa4bb",
          fontFamily: isCampaign ? "'Lato', sans-serif" : "monospace",
          fontSize: "12px",
        }}
      >
        {isCampaign ? "Loading network..." : "INITIALIZING NETWORK..."}
      </div>
    );

  const wrapLabel = (text) => {
    if (text.length <= 16) return [text];
    const mid = Math.floor(text.length / 2);
    let bp = text.lastIndexOf(" ", mid + 5);
    if (bp < 3) bp = text.indexOf(" ", mid - 5);
    if (bp < 0) bp = 16;
    return [text.slice(0, bp).trim(), text.slice(bp).trim()];
  };

  return (
    <div style={{ flex: 1, position: "relative" }}>
      <svg
        ref={svgRef}
        width={dims.w}
        height={dims.h}
        style={{
          display: "block",
          cursor: dragging ? "grabbing" : "crosshair",
          userSelect: "none",
        }}
        onClick={() => {
          if (!dragMovedRef.current) setSel(null);
          dragMovedRef.current = false;
        }}
      >
        <defs>
          {Object.entries(EDGE_COLOR).map(([t, c]) => (
            <marker
              key={t}
              id={`a-${t}`}
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="5"
              orient="auto"
            >
              <path d="M0,0 L0,10 L10,5z" fill={c} opacity="0.9" />
            </marker>
          ))}
        </defs>

        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke={isCampaign ? "#d4ddef" : "#dde6f0"}
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width={dims.w} height={dims.h} fill="url(#grid)" />

        {ZONE_LABELS.map((z, i) => (
          <text
            key={i}
            x={z.x * dims.w}
            y={z.y * dims.h}
            textAnchor={z.anchor}
            fontSize={isCampaign ? "11" : "9"}
            fontWeight={isCampaign ? "500" : "bold"}
            letterSpacing={isCampaign ? "0.10em" : "0.12em"}
            fill={isCampaign ? "rgba(0,40,104,0.35)" : "#9ab8d0"}
            opacity={isCampaign ? "1" : "0.6"}
            style={{ pointerEvents: "none", userSelect: "none", fontFamily: isCampaign ? "'Lato', sans-serif" : undefined }}
          >
            {z.label}
          </text>
        ))}

        {vEdges.map((edge, i) => {
          const s = pos[edge.source],
            t = pos[edge.target];
          if (!s || !t) return null;
          const orig = edges.indexOf(edge);
          const lit = sel && cEi.has(orig);
          const dim = sel && !lit;
          const c = EDGE_COLOR[edge.type] || "#9ab0c4";
          const dx = t.x - s.x,
            dy = t.y - s.y,
            d = Math.sqrt(dx * dx + dy * dy) || 1;
          const R = 24;
          const x1 = s.x + (dx / d) * R,
            y1 = s.y + (dy / d) * R;
          const x2 = t.x - (dx / d) * (R + 11),
            y2 = t.y - (dy / d) * (R + 11);
          return (
            <g key={i}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={c}
                strokeWidth={lit ? 3.5 : 1.8}
                strokeOpacity={dim ? 0.06 : lit ? 1 : 0.45}
                markerEnd={lit ? `url(#a-${edge.type})` : undefined}
              />
              {lit && d > 70 && (
                <text
                  x={(x1 + x2) / 2}
                  y={(y1 + y2) / 2 - 5}
                  textAnchor="middle"
                  fill={c}
                  fontSize="10"
                  fontWeight="bold"
                  opacity="1"
                  stroke={isCampaign ? "#F4F6FB" : "#f4f6f9"}
                  strokeWidth="2.5"
                  paintOrder="stroke fill"
                  style={{ pointerEvents: "none", fontFamily: isCampaign ? "'Lato', sans-serif" : undefined }}
                >
                  {edge.label.length > 30
                    ? edge.label.slice(0, 28) + "..."
                    : edge.label}
                </text>
              )}
            </g>
          );
        })}

        {vNodes.map((node) => {
          const p = pos[node.id];
          if (!p) return null;
          const nd = nodeData[node.id];
          const isSel = sel === node.id;
          const isConn = sel && cNs.has(node.id);
          const isDim = sel && !isSel && !isConn;
          const c = CAT_COLOR[node.category] || "#1e3a4a";
          const R = weightToRadius(node.id, isSel);
          const labelLines = wrapLabel(node.label);
          const labelFontSize = isCampaign ? "12" : isSel ? "12" : "11";
          const labelColor = isDim ? "#c8d6e5" : isSel ? c : (isCampaign ? "#0A0A1A" : "#1a2840");
          const lineHeight = 13;

          return (
            <g
              key={node.id}
              transform={`translate(${p.x},${p.y})`}
              style={{ cursor: "pointer" }}
              onMouseDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (svgRef.current) {
                  const r = svgRef.current.getBoundingClientRect();
                  dragStartRef.current = {
                    x: e.clientX - r.left,
                    y: e.clientY - r.top,
                  };
                }
                dragMovedRef.current = false;
                setDragging(node.id);
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (!dragMovedRef.current) {
                  setSel(node.id === sel ? null : node.id);
                  setDetailSection(0);
                }
                dragMovedRef.current = false;
              }}
            >
              {isSel && <circle r={R + 12} fill={c} opacity="0.12" />}
              {isSel && (
                <circle
                  r={R + 6}
                  fill="none"
                  stroke={c}
                  strokeWidth="0.8"
                  strokeDasharray="4,3"
                  opacity="0.5"
                />
              )}
              <circle
                r={R}
                fill="#ffffff"
                stroke={c}
                strokeWidth={isCampaign ? (isSel ? 2.5 : isConn ? 2 : 2.5) : (isSel ? 2.5 : isConn ? 2 : 1.2)}
                opacity={isDim ? 0.2 : 1}
              />
              {nd?.flag && (
                <circle
                  r={7}
                  cx={R - 4}
                  cy={-R + 4}
                  fill={nd.flagColor}
                  opacity={isDim ? 0.1 : 0.95}
                />
              )}
              <text
                y="1"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={isSel ? "15" : "13"}
                fill={c}
                opacity={isDim ? 0.2 : 1}
                style={{ pointerEvents: "none" }}
              >
                {nd?.icon || "o"}
              </text>
              {labelLines.map((line, li) => (
                <text
                  key={li}
                  y={R + 15 + li * lineHeight}
                  textAnchor="middle"
                  fontSize={labelFontSize}
                  fontWeight={isCampaign ? "500" : isSel ? "bold" : "600"}
                  fill={labelColor}
                  stroke={isCampaign ? "#F4F6FB" : "#f4f6f9"}
                  strokeWidth="3"
                  paintOrder="stroke fill"
                  style={{ pointerEvents: "none", fontFamily: isCampaign ? "'Lato', sans-serif" : undefined }}
                >
                  {line}
                </text>
              ))}
              {nd?.flag && !isDim && (
                isCampaign ? (
                  <g>
                    <rect
                      x={-((remapFlag ? remapFlag(nd.flag, styleName) : nd.flag).length * 3.2 + 7)}
                      y={-R - 18}
                      width={(remapFlag ? remapFlag(nd.flag, styleName) : nd.flag).length * 6.4 + 14}
                      height={16}
                      rx={4}
                      fill="rgba(191,10,48,0.08)"
                      style={{ pointerEvents: "none" }}
                    />
                    <text
                      y={-R - 7}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="600"
                      fill={nd.flagColor || '#BF0A30'}
                      opacity={isSel || isConn ? 1 : 0.75}
                      style={{ pointerEvents: "none", fontFamily: "'Lato', sans-serif" }}
                    >
                      {remapFlag ? remapFlag(nd.flag, styleName) : nd.flag}
                    </text>
                  </g>
                ) : (
                  <text
                    y={-R - 10}
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="bold"
                    fill={nd.flagColor}
                    stroke="#f4f6f9"
                    strokeWidth="2.5"
                    paintOrder="stroke fill"
                    opacity={isSel || isConn ? 1 : 0.75}
                    style={{ pointerEvents: "none" }}
                  >
                    [{nd.flag}]
                  </text>
                )
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
