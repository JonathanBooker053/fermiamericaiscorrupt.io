export default function NodePanel({
  sel,
  setSel,
  nodeData,
  nodeSources,
  edges,
  theme,
  detailSection,
  setDetailSection,
  nodes,
}) {
  const { CAT_COLOR, CAT_LABEL, EDGE_COLOR, EDGE_LABEL } = theme;

  const selNode = sel ? nodeData[sel] : null;
  const relEdges = sel
    ? edges.filter((e) => e.source === sel || e.target === sel)
    : [];
  const sources = sel ? nodeSources[sel] : null;

  if (!selNode) {
    return (
      <div
        style={{
          width: "320px",
          background: "#ffffff",
          borderLeft: "1px solid #c8d6e5",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        <div style={{ padding: "14px", flex: 1, background: "#ffffff" }}>
          <div
            style={{
              fontSize: "11px",
              color: "#4a6a85",
              marginBottom: "18px",
              letterSpacing: "0.05em",
              lineHeight: 2,
            }}
          >
            SELECT ANY NODE TO VIEW
            <br />
            FULL RESEARCH DOSSIER
          </div>

          <div style={{ marginBottom: "14px" }}>
            <div
              style={{
                fontSize: "10px",
                color: "#1e3a55",
                letterSpacing: "0.1em",
                marginBottom: "7px",
                fontWeight: "bold",
              }}
            >
              ENTITY TYPES
            </div>
            {Object.entries(CAT_COLOR).map(([c, col]) => (
              <div
                key={c}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "5px",
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    border: `1.5px solid ${col}`,
                    flexShrink: 0,
                    borderRadius: "2px",
                  }}
                />
                <span style={{ fontSize: "11px", color: "#2a4560" }}>
                  {CAT_LABEL[c]}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: "14px" }}>
            <div
              style={{
                fontSize: "10px",
                color: "#1e3a55",
                letterSpacing: "0.1em",
                marginBottom: "7px",
                fontWeight: "bold",
              }}
            >
              CONNECTION TYPES
            </div>
            {Object.entries(EDGE_COLOR).map(([t, c]) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "5px",
                }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "2px",
                    background: c,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: "11px", color: "#2a4560" }}>
                  {EDGE_LABEL[t]}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              fontSize: "10px",
              color: "#4a6a85",
              lineHeight: 2,
              borderTop: "1px solid #c8d6e5",
              paddingTop: "12px",
            }}
          >
            <div style={{ color: "#1e3a55" }}>NODES: {nodes.length}</div>
            <div style={{ color: "#1e3a55" }}>EDGES: {edges.length}</div>
            <div style={{ color: "#1e3a55" }}>DRAG NODES TO REPOSITION</div>
            <div style={{ color: "#1e3a55" }}>
              CLICK NODE IN PANEL TO NAVIGATE
            </div>
            <div
              style={{
                marginTop: "8px",
                fontSize: "10px",
                color: "#6b8ca8",
                lineHeight: 1.6,
              }}
            >
              Data sourced from SEC filings, court records, campaign finance
              disclosures, and investigative reporting through March 31, 2026.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "320px",
        background: "#ffffff",
        borderLeft: "1px solid #c8d6e5",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Node header */}
        <div
          style={{
            padding: "12px 14px",
            borderBottom: "1px solid #c8d6e5",
            background: "#f0f4f8",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "6px",
            }}
          >
            <span style={{ fontSize: "20px" }}>{selNode.icon}</span>
            <div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: "bold",
                  color: CAT_COLOR[selNode.category],
                  lineHeight: 1.3,
                }}
              >
                {selNode.label}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#4a6a85",
                  marginTop: "3px",
                  lineHeight: 1.4,
                }}
              >
                {selNode.sub}
              </div>
            </div>
          </div>
          {selNode.flag && (
            <span
              style={{
                fontSize: "10px",
                fontWeight: "bold",
                color: selNode.flagColor,
                border: `1px solid ${selNode.flagColor}`,
                padding: "2px 8px",
                letterSpacing: "0.08em",
              }}
            >
              {selNode.flag}
            </span>
          )}
        </div>

        {/* Section tabs */}
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            borderBottom: "1px solid #c8d6e5",
            background: "#f0f4f8",
          }}
        >
          {selNode.sections.map((s, i) => (
            <button
              key={i}
              onClick={() => setDetailSection(i)}
              style={{
                padding: "6px 11px",
                fontSize: "10px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                letterSpacing: "0.05em",
                border: "none",
                borderBottom:
                  detailSection === i
                    ? `2px solid ${CAT_COLOR[selNode.category]}`
                    : "2px solid transparent",
                background: "transparent",
                color:
                  detailSection === i
                    ? CAT_COLOR[selNode.category]
                    : "#4a6a85",
              }}
            >
              {s.title.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Section content */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "10px 14px",
            background: "#ffffff",
          }}
        >
          {selNode.sections[detailSection] && (
            <div>
              {selNode.sections[detailSection].items.map((item, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: "11px",
                    color: item.startsWith("(!)")
                      ? "#dc2626"
                      : item.startsWith("-")
                      ? "#9ab0c4"
                      : "#1e3a55",
                    padding: "4px 0",
                    borderBottom: "1px solid #edf2f7",
                    lineHeight: 1.6,
                  }}
                >
                  {item.startsWith("  -") ? (
                    <span style={{ color: "#4a6a85" }}>{item}</span>
                  ) : (
                    item
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related edges */}
        <div
          style={{
            borderTop: "1px solid #c8d6e5",
            padding: "8px 14px",
            background: "#f0f4f8",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              color: "#4a6a85",
              letterSpacing: "0.08em",
              marginBottom: "6px",
              fontWeight: "bold",
            }}
          >
            CONNECTIONS ({relEdges.length})
          </div>
          <div style={{ maxHeight: "160px", overflowY: "auto" }}>
            {relEdges.map((e, i) => {
              const oid = e.source === sel ? e.target : e.source;
              const on = nodeData[oid];
              const out = e.source === sel;
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "6px",
                    marginBottom: "5px",
                    padding: "5px 7px",
                    background: "#ffffff",
                    borderLeft: `3px solid ${EDGE_COLOR[e.type]}`,
                    cursor: "pointer",
                    borderRadius: "0 3px 3px 0",
                  }}
                  onClick={(ev) => {
                    ev.stopPropagation();
                    setSel(oid);
                    setDetailSection(0);
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      color: EDGE_COLOR[e.type],
                      marginTop: "1px",
                      flexShrink: 0,
                    }}
                  >
                    {out ? "\u2192" : "\u2190"}
                  </span>
                  <div>
                    <div style={{ fontSize: "10px", color: "#4a6a85" }}>
                      {e.label}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: on ? CAT_COLOR[on.category] : "#1e3a55",
                        fontWeight: "bold",
                      }}
                    >
                      {on?.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sources */}
        {sources && (
          <div
            style={{
              borderTop: "1px solid #c8d6e5",
              padding: "8px 14px",
              background: "#f8fafc",
            }}
          >
            <div
              style={{
                fontSize: "10px",
                color: "#4a6a85",
                letterSpacing: "0.08em",
                marginBottom: "6px",
                fontWeight: "bold",
              }}
            >
              SOURCES ({sources.length})
            </div>
            <div style={{ maxHeight: "180px", overflowY: "auto" }}>
              {sources.map((s, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: "5px",
                    padding: "4px 6px",
                    background: "#ffffff",
                    borderLeft: "2px solid #c8d6e5",
                  }}
                >
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "10px",
                      color: "#1d6fa4",
                      textDecoration: "none",
                      lineHeight: 1.5,
                      display: "block",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.textDecoration = "underline")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.textDecoration = "none")
                    }
                  >
                    [{i + 1}] {s.label}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
