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
  styleName,
  sidebarConfig,
  remapFlag,
}) {
  const { CAT_COLOR, CAT_LABEL, EDGE_COLOR, EDGE_LABEL } = theme;
  const isCampaign = styleName === 'texas-dem';

  const selNode = sel ? nodeData[sel] : null;
  const relEdges = sel
    ? edges.filter((e) => e.source === sel || e.target === sel)
    : [];
  const sources = sel ? nodeSources[sel] : null;

  const panelFont = isCampaign ? "'Lato', sans-serif" : undefined;
  const borderColor = isCampaign ? 'rgba(0,40,104,0.12)' : '#c8d6e5';
  const headingColor = isCampaign ? '#002868' : '#1e3a55';
  const bodyColor = isCampaign ? '#3D4566' : '#4a6a85';
  const accentBg = isCampaign ? '#F4F6FB' : '#f0f4f8';

  if (!selNode) {
    return (
      <div
        style={{
          width: "320px",
          background: "#ffffff",
          borderLeft: `1px solid ${borderColor}`,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          fontFamily: panelFont,
        }}
      >
        <div style={{ padding: "14px", flex: 1, background: "#ffffff" }}>
          {isCampaign && sidebarConfig ? (
            <>
              <div
                style={{
                  fontSize: '15px',
                  color: headingColor,
                  fontWeight: 700,
                  marginBottom: '8px',
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                {sidebarConfig.instructionHeading}
              </div>
              <div
                style={{
                  fontSize: '13px',
                  color: bodyColor,
                  lineHeight: 1.6,
                  marginBottom: '18px',
                }}
              >
                {sidebarConfig.instructionBody}
              </div>
            </>
          ) : (
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
          )}

          <div style={{ marginBottom: "14px" }}>
            <div
              style={{
                fontSize: isCampaign ? "12px" : "10px",
                color: headingColor,
                letterSpacing: isCampaign ? "0.04em" : "0.1em",
                marginBottom: "7px",
                fontWeight: "bold",
              }}
            >
              {isCampaign ? "Entity Types" : "ENTITY TYPES"}
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
                    border: `${isCampaign ? '2.5px' : '1.5px'} solid ${col}`,
                    flexShrink: 0,
                    borderRadius: isCampaign ? "50%" : "2px",
                  }}
                />
                <span style={{ fontSize: "11px", color: isCampaign ? bodyColor : "#2a4560" }}>
                  {CAT_LABEL[c]}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: "14px" }}>
            <div
              style={{
                fontSize: isCampaign ? "12px" : "10px",
                color: headingColor,
                letterSpacing: isCampaign ? "0.04em" : "0.1em",
                marginBottom: "7px",
                fontWeight: "bold",
              }}
            >
              {isCampaign ? "Connection Types" : "CONNECTION TYPES"}
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
                <span style={{ fontSize: "11px", color: isCampaign ? bodyColor : "#2a4560" }}>
                  {EDGE_LABEL[t]}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              fontSize: "10px",
              color: bodyColor,
              lineHeight: isCampaign ? 1.6 : 2,
              borderTop: `1px solid ${borderColor}`,
              paddingTop: "12px",
            }}
          >
            {isCampaign && sidebarConfig ? (
              <>
                <div style={{ fontSize: '11px', color: bodyColor, lineHeight: 1.6 }}>
                  {sidebarConfig.sourceNote}
                </div>
              </>
            ) : (
              <>
                <div style={{ color: headingColor }}>NODES: {nodes.length}</div>
                <div style={{ color: headingColor }}>EDGES: {edges.length}</div>
                <div style={{ color: headingColor }}>DRAG NODES TO REPOSITION</div>
                <div style={{ color: headingColor }}>
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
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  const displayFlag = remapFlag ? remapFlag(selNode.flag, styleName) : selNode.flag;

  return (
    <div
      style={{
        width: "320px",
        background: "#ffffff",
        borderLeft: `1px solid ${borderColor}`,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        fontFamily: panelFont,
      }}
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Node header */}
        <div
          style={{
            padding: "12px 14px",
            borderBottom: `1px solid ${borderColor}`,
            background: accentBg,
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
                  fontFamily: isCampaign ? "'Playfair Display', Georgia, serif" : undefined,
                }}
              >
                {selNode.label}
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: bodyColor,
                  marginTop: "3px",
                  lineHeight: 1.4,
                }}
              >
                {selNode.sub}
              </div>
            </div>
          </div>
          {displayFlag && (
            <span
              style={
                isCampaign
                  ? {
                      fontSize: "10px",
                      fontWeight: "600",
                      color: selNode.flagColor || '#BF0A30',
                      background: 'rgba(191,10,48,0.08)',
                      padding: "2px 7px",
                      borderRadius: "4px",
                    }
                  : {
                      fontSize: "10px",
                      fontWeight: "bold",
                      color: selNode.flagColor,
                      border: `1px solid ${selNode.flagColor}`,
                      padding: "2px 8px",
                      letterSpacing: "0.08em",
                    }
              }
            >
              {displayFlag}
            </span>
          )}
        </div>

        {/* Section tabs */}
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            borderBottom: `1px solid ${borderColor}`,
            background: accentBg,
          }}
        >
          {selNode.sections.map((s, i) => (
            <button
              key={i}
              onClick={() => setDetailSection(i)}
              style={
                isCampaign
                  ? {
                      padding: "6px 11px",
                      fontSize: "11px",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: detailSection === i ? 600 : 400,
                      border: "none",
                      borderBottom:
                        detailSection === i
                          ? `2px solid ${CAT_COLOR[selNode.category]}`
                          : "2px solid transparent",
                      background: "transparent",
                      color:
                        detailSection === i
                          ? CAT_COLOR[selNode.category]
                          : bodyColor,
                    }
                  : {
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
                    }
              }
            >
              {isCampaign ? s.title : s.title.toUpperCase()}
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
                      ? (isCampaign ? "#BF0A30" : "#dc2626")
                      : item.startsWith("-")
                      ? (isCampaign ? "#6B7494" : "#9ab0c4")
                      : (isCampaign ? "#0A0A1A" : "#1e3a55"),
                    padding: "4px 0",
                    borderBottom: `1px solid ${isCampaign ? 'rgba(0,40,104,0.06)' : '#edf2f7'}`,
                    lineHeight: 1.6,
                  }}
                >
                  {item.startsWith("  -") ? (
                    <span style={{ color: bodyColor }}>{item}</span>
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
            borderTop: `1px solid ${borderColor}`,
            padding: "8px 14px",
            background: accentBg,
          }}
        >
          <div
            style={{
              fontSize: isCampaign ? "11px" : "10px",
              color: bodyColor,
              letterSpacing: isCampaign ? "0.04em" : "0.08em",
              marginBottom: "6px",
              fontWeight: "bold",
            }}
          >
            {isCampaign ? `Connections (${relEdges.length})` : `CONNECTIONS (${relEdges.length})`}
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
                    <div style={{ fontSize: "10px", color: bodyColor }}>
                      {e.label}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: on ? CAT_COLOR[on.category] : headingColor,
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
              borderTop: `1px solid ${borderColor}`,
              padding: "8px 14px",
              background: isCampaign ? "#FFFFFF" : "#f8fafc",
            }}
          >
            <div
              style={{
                fontSize: isCampaign ? "11px" : "10px",
                color: bodyColor,
                letterSpacing: isCampaign ? "0.04em" : "0.08em",
                marginBottom: "6px",
                fontWeight: "bold",
              }}
            >
              {isCampaign ? `Sources (${sources.length})` : `SOURCES (${sources.length})`}
            </div>
            <div style={{ maxHeight: "180px", overflowY: "auto" }}>
              {sources.map((s, i) => (
                <div
                  key={i}
                  style={{
                    marginBottom: "5px",
                    padding: "4px 6px",
                    background: isCampaign ? accentBg : "#ffffff",
                    borderLeft: `2px solid ${isCampaign ? 'rgba(0,40,104,0.2)' : '#c8d6e5'}`,
                  }}
                >
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: "10px",
                      color: isCampaign ? "#002868" : "#1d6fa4",
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
