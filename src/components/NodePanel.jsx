import { useMemo } from "react";

function FlagTag({ flag }) {
  if (!flag) return null;
  const f = flag.toLowerCase();
  let variant = "tag-info";
  let label = flag;
  if (f.includes("pre-revenue") || f.includes("no revenue")) { variant = "tag-classified"; label = "PRE-REVENUE"; }
  else if (f.includes("bankrupt") || f.includes("departed") || f.includes("failed")) { variant = "tag-classified"; }
  else if (f.includes("active") || f.includes("credible")) { variant = "tag-active"; }
  else if (f.includes("high risk") || f.includes("controversial") || f.includes("litigation")) { variant = "tag-warning"; }
  else if (f.includes("political") || f.includes("contracted") || f.includes("early stage")) { variant = "tag-info"; }
  return (
    <span className={`tag ${variant}`} style={{ marginRight: 4, marginBottom: 4 }}>
      {label.toUpperCase()}
    </span>
  );
}

export default function NodePanel({
  sel, setSel, nodeData, nodeSources, edges, theme,
  detailSection, setDetailSection, nodes
}) {
  const node = sel ? nodeData[sel] : null;
  const nodeLabel = sel ? (nodes.find((n) => n.id === sel)?.label || sel) : "";

  const connections = useMemo(() => {
    if (!sel) return [];
    return edges.filter((e) => e.source === sel || e.target === sel).map((e) => {
      const otherId = e.source === sel ? e.target : e.source;
      const otherLabel = nodes.find((n) => n.id === otherId)?.label || otherId;
      return { ...e, otherId, otherLabel };
    });
  }, [sel, edges, nodes]);

  const sources = sel ? (nodeSources[sel] || []) : [];

  // The existing node data uses sections with { title, items } structure
  // Overview tab shows these sections; we also build a timeline from date-like items
  const timeline = useMemo(() => {
    if (!node?.sections) return [];
    const entries = [];
    for (const sec of node.sections) {
      const items = sec.items || sec.content || [];
      for (const item of items) {
        if (typeof item === "string" && /\d{4}/.test(item)) {
          const yearMatch = item.match(/\b(20\d{2})\b/);
          if (yearMatch) entries.push({ year: yearMatch[1], text: item });
        }
      }
    }
    return entries.sort((a, b) => b.year - a.year);
  }, [node]);

  const caseNum = sel
    ? `PM-${sel.toUpperCase().substring(0, 4).padEnd(4, "0")}-${String(Object.keys(nodeData).indexOf(sel) + 1).padStart(3, "0")}`
    : "";

  const catColor = node ? (theme.CAT_COLOR[node.category] || "#9a8070") : "#9a8070";
  const catLabel = node ? (theme.CAT_LABEL[node.category] || node.category) : "";

  const TABS = ["Overview", "Connections", "Sources", "Timeline"];

  return (
    <aside style={{
      flex: "0 0 320px",
      width: 320,
      background: "#2a1a10",
      borderLeft: "1px solid rgba(192,57,43,0.25)",
      display: "flex",
      flexDirection: "column",
      overflowY: "auto",
      overflowX: "hidden",
    }}>
      {!sel ? (
        /* Empty state */
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
          gap: 12,
        }}>
          <svg width="48" height="48" viewBox="0 0 48 48" style={{ opacity: 0.25 }}>
            <circle cx="24" cy="24" r="20" stroke="#f5f0e8" strokeWidth="1" fill="none"/>
            <circle cx="24" cy="24" r="8" stroke="#c0392b" strokeWidth="1.5" fill="none"/>
            <line x1="24" y1="4" x2="24" y2="16" stroke="#f5f0e8" strokeWidth="1"/>
            <line x1="24" y1="32" x2="24" y2="44" stroke="#f5f0e8" strokeWidth="1"/>
            <line x1="4" y1="24" x2="16" y2="24" stroke="#f5f0e8" strokeWidth="1"/>
            <line x1="32" y1="24" x2="44" y2="24" stroke="#f5f0e8" strokeWidth="1"/>
          </svg>
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            color: "#9a8070",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            lineHeight: 1.8,
          }}>
            Select any node<br/>to open its case file
          </div>
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 9,
            color: "rgba(154,128,112,0.5)",
            letterSpacing: "0.1em",
          }}>
            DRAG NODES TO REPOSITION<br/>
            CLICK NODE IN PANEL TO NAVIGATE
          </div>
          <div style={{
            marginTop: 12,
            padding: "8px 14px",
            background: "rgba(192,57,43,0.08)",
            border: "0.5px solid rgba(192,57,43,0.25)",
            borderRadius: 6,
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 11,
            color: "#9a8070",
            lineHeight: 1.6,
            maxWidth: 220,
          }}>
            Data sourced from SEC filings, court records, campaign finance disclosures, and
            investigative reporting through March 31, 2026.
          </div>
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 9,
            color: "rgba(154,128,112,0.4)",
            letterSpacing: "0.06em",
            marginTop: 4,
          }}>
            By Jonathan Booker
          </div>
        </div>
      ) : (
        <>
          {/* File header */}
          <div style={{
            padding: "14px 16px 12px",
            borderBottom: "0.5px solid rgba(192,57,43,0.25)",
            background: "#1a0e0e",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: catColor, flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 9,
                  color: catColor,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}>
                  {catLabel}
                </span>
              </div>
              <span className="case-num">{caseNum}</span>
            </div>

            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 14,
              fontWeight: 500,
              color: "#f5f0e8",
              letterSpacing: "0.03em",
              lineHeight: 1.3,
              marginBottom: 4,
            }}>
              {nodeLabel}
            </div>

            {node.sub && (
              <div style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 11,
                color: "#e8d5b0",
                marginBottom: 8,
                lineHeight: 1.4,
              }}>
                {node.sub}
              </div>
            )}

            {node.flag && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 0 }}>
                {Array.isArray(node.flag)
                  ? node.flag.map((f, i) => <FlagTag key={i} flag={f} />)
                  : <FlagTag flag={node.flag} />
                }
              </div>
            )}
          </div>

          {/* Folder tabs */}
          <div style={{
            display: "flex",
            borderBottom: "0.5px solid rgba(192,57,43,0.25)",
            background: "rgba(0,0,0,0.2)",
            overflowX: "auto",
            scrollbarWidth: "none",
          }}>
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setDetailSection(i)}
                style={{
                  flex: 1,
                  minWidth: 60,
                  padding: "8px 4px",
                  background: detailSection === i ? "#2a1a10" : "transparent",
                  border: "none",
                  borderBottom: detailSection === i
                    ? "2px solid #c0392b"
                    : "2px solid transparent",
                  color: detailSection === i ? "#f5f0e8" : "#9a8070",
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 9,
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px" }}>

            {/* OVERVIEW TAB */}
            {detailSection === 0 && node.sections && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {node.sections.map((sec, si) => (
                  <div key={si}>
                    {sec.title && (
                      <div style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 9,
                        color: "#c0392b",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        marginBottom: 8,
                        paddingBottom: 5,
                        borderBottom: "0.5px solid rgba(192,57,43,0.2)",
                      }}>
                        {sec.title}
                      </div>
                    )}
                    {(sec.items || sec.content || []).map((item, ii, arr) => (
                      <div key={ii} style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: 12,
                        color: typeof item === "string" && item.startsWith("(!)")
                          ? "#e74c3c"
                          : typeof item === "string" && item.startsWith("-")
                          ? "#9a8070"
                          : "#e8d5b0",
                        lineHeight: 1.7,
                        paddingBottom: 6,
                        borderBottom: ii < arr.length - 1
                          ? "0.5px solid rgba(245,240,232,0.06)"
                          : "none",
                        marginBottom: 6,
                      }}>
                        {item}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* CONNECTIONS TAB */}
            {detailSection === 1 && (
              <div>
                <div style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 9,
                  color: "#9a8070",
                  letterSpacing: "0.14em",
                  marginBottom: 10,
                }}>
                  CONNECTIONS ({connections.length})
                </div>
                {connections.length === 0 ? (
                  <div style={{ color: "#9a8070", fontSize: 12 }}>No connections found.</div>
                ) : (
                  connections.map((c, i) => (
                    <div
                      key={i}
                      onClick={() => { setSel(c.otherId); setDetailSection(0); }}
                      style={{
                        borderLeft: `3px solid ${theme.EDGE_COLOR[c.type] || "#9a8070"}`,
                        paddingLeft: 10,
                        paddingTop: 8,
                        paddingBottom: 8,
                        marginBottom: 8,
                        cursor: "pointer",
                        borderRadius: "0 3px 3px 0",
                        background: "rgba(245,240,232,0.03)",
                        transition: "background 0.15s ease",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(245,240,232,0.07)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "rgba(245,240,232,0.03)"}
                    >
                      <div style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 9,
                        color: theme.EDGE_COLOR[c.type] || "#9a8070",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        marginBottom: 3,
                      }}>
                        {theme.EDGE_LABEL[c.type] || c.type}
                      </div>
                      <div style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: 12,
                        color: "#f5f0e8",
                        fontWeight: 500,
                      }}>
                        {c.otherLabel}
                      </div>
                      {c.label && (
                        <div style={{
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontSize: 11,
                          color: "#9a8070",
                          marginTop: 2,
                          lineHeight: 1.4,
                        }}>
                          {c.label}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* SOURCES TAB */}
            {detailSection === 2 && (
              <div>
                <div style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 9,
                  color: "#9a8070",
                  letterSpacing: "0.14em",
                  marginBottom: 10,
                }}>
                  SOURCES ({sources.length})
                </div>
                {sources.length === 0 ? (
                  <div style={{ color: "#9a8070", fontSize: 12 }}>No sources on file.</div>
                ) : (
                  sources.map((src, i) => (
                    <div key={i} style={{
                      display: "flex",
                      gap: 10,
                      paddingBottom: 10,
                      marginBottom: 10,
                      borderBottom: i < sources.length - 1
                        ? "0.5px solid rgba(245,240,232,0.07)"
                        : "none",
                    }}>
                      <span style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 10,
                        color: "#c0392b",
                        flexShrink: 0,
                        marginTop: 1,
                      }}>
                        [{i + 1}]
                      </span>
                      <div style={{ fontSize: 11, color: "#e8d5b0", lineHeight: 1.6 }}>
                        {src.url ? (
                          <a href={src.url} target="_blank" rel="noopener noreferrer" style={{
                            color: "#e8d5b0",
                            textDecoration: "underline",
                            textDecorationColor: "rgba(232,213,176,0.3)",
                          }}>
                            {src.label || src.title || src.url}
                          </a>
                        ) : (
                          src.label || src.title || String(src)
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TIMELINE TAB */}
            {detailSection === 3 && (
              <div>
                <div style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 9,
                  color: "#9a8070",
                  letterSpacing: "0.14em",
                  marginBottom: 10,
                }}>
                  TIMELINE
                </div>
                {timeline.length === 0 ? (
                  <div style={{ color: "#9a8070", fontSize: 12 }}>
                    No dated entries found. See Overview for full dossier.
                  </div>
                ) : (
                  <div style={{ position: "relative", paddingLeft: 20 }}>
                    <div style={{
                      position: "absolute", left: 6, top: 6, bottom: 6,
                      width: 1, background: "rgba(192,57,43,0.3)",
                    }} />
                    {timeline.map((e, i) => (
                      <div key={i} style={{
                        position: "relative", marginBottom: 14,
                      }}>
                        <div style={{
                          position: "absolute", left: -17, top: 4,
                          width: 7, height: 7, borderRadius: "50%",
                          background: "#c0392b",
                          border: "1.5px solid #2a1a10",
                        }} />
                        <div style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: 10,
                          color: "#d4880a",
                          marginBottom: 3,
                        }}>
                          {e.year}
                        </div>
                        <div style={{
                          fontSize: 12, color: "#e8d5b0", lineHeight: 1.6,
                        }}>
                          {e.text}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer: share / close */}
          <div style={{
            borderTop: "0.5px solid rgba(192,57,43,0.25)",
            padding: "10px 16px",
            display: "flex",
            gap: 8,
            background: "#1a0e0e",
          }}>
            <button
              onClick={() => {
                const url = `${window.location.origin}${window.location.pathname}?node=${sel}`;
                navigator.clipboard?.writeText(url);
              }}
              style={{
                flex: 1,
                padding: "7px 0",
                background: "rgba(192,57,43,0.1)",
                border: "0.5px solid rgba(192,57,43,0.3)",
                borderRadius: 3,
                color: "#c0392b",
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(192,57,43,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(192,57,43,0.1)";
              }}
            >
              Share File
            </button>
            <button
              onClick={() => setSel(null)}
              style={{
                padding: "7px 14px",
                background: "transparent",
                border: "0.5px solid rgba(245,240,232,0.12)",
                borderRadius: 3,
                color: "#9a8070",
                fontFamily: "'DM Mono', monospace",
                fontSize: 9,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#f5f0e8"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#9a8070"}
            >
              Close
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
