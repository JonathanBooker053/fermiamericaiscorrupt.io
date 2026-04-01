export default function Toolbar({
  nodes,
  edges,
  theme,
  filterCat,
  setFilterCat,
  setSel,
  styleName,
  filtersOnly,
}) {
  const { CAT_COLOR, CAT_LABEL } = theme;
  const isCampaign = styleName === 'texas-dem';

  const filterBar = (
    <div
      style={{
        padding: isCampaign ? "8px 24px" : "7px 16px",
        display: "flex",
        gap: isCampaign ? "8px" : "5px",
        flexWrap: "wrap",
        alignItems: "center",
        borderBottom: isCampaign ? "1px solid rgba(0,40,104,0.12)" : "1px solid #c8d6e5",
        background: isCampaign ? "#FFFFFF" : "#ffffff",
        fontFamily: isCampaign ? "'Lato', sans-serif" : "monospace",
      }}
    >
      {isCampaign && (
        <span
          style={{
            fontSize: '11px',
            color: '#3D4566',
            fontWeight: 500,
            marginRight: '8px',
            letterSpacing: '0.04em',
          }}
        >
          Filter by type:
        </span>
      )}
      <button
        onClick={() => {
          setFilterCat(null);
          setSel(null);
        }}
        style={
          isCampaign
            ? {
                padding: "5px 14px",
                fontSize: "12px",
                cursor: "pointer",
                fontWeight: 500,
                fontFamily: "'Lato', sans-serif",
                border: "none",
                borderRadius: "20px",
                background: !filterCat ? "#002868" : "#EBF0FA",
                color: !filterCat ? "#FFFFFF" : "#3D4566",
              }
            : {
                padding: "3px 11px",
                fontSize: "11px",
                cursor: "pointer",
                letterSpacing: "0.06em",
                border: "1px solid " + (!filterCat ? "#b45309" : "#9ab0c4"),
                background: !filterCat ? "#b4530918" : "transparent",
                color: !filterCat ? "#b45309" : "#2a4560",
              }
        }
      >
        ALL
      </button>
      {Object.entries(CAT_LABEL).map(([c, l]) => (
        <button
          key={c}
          onClick={() => {
            setFilterCat(c === filterCat ? null : c);
            setSel(null);
          }}
          style={
            isCampaign
              ? {
                  padding: "5px 14px",
                  fontSize: "12px",
                  cursor: "pointer",
                  fontWeight: 500,
                  fontFamily: "'Lato', sans-serif",
                  border: "none",
                  borderRadius: "20px",
                  background: filterCat === c ? CAT_COLOR[c] : "#EBF0FA",
                  color: filterCat === c ? "#FFFFFF" : "#3D4566",
                }
              : {
                  padding: "3px 11px",
                  fontSize: "11px",
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                  border: "1px solid " + (filterCat === c ? CAT_COLOR[c] : "#9ab0c4"),
                  background: filterCat === c ? CAT_COLOR[c] + "22" : "transparent",
                  color: filterCat === c ? CAT_COLOR[c] : "#2a4560",
                }
          }
        >
          {isCampaign ? l : l.toUpperCase()}
        </button>
      ))}
    </div>
  );

  if (filtersOnly) return filterBar;

  return (
    <>
      {/* Header */}
      <div
        style={{
          padding: "10px 16px",
          borderBottom: "1px solid #c8d6e5",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#ffffff",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#b45309",
              letterSpacing: "0.08em",
            }}
          >
            FERMI AMERICA // PROJECT MATADOR
          </span>
          <span
            style={{ fontSize: "11px", color: "#4a6a85", marginLeft: "12px" }}
          >
            ENTITY RELATIONSHIP INTELLIGENCE MAP
          </span>
        </div>
        <div style={{ fontSize: "11px", color: "#4a6a85" }}>
          {nodes.length} ENTITIES - {edges.length} CONNECTIONS - AS OF 2026-03-31
        </div>
      </div>

      {/* Filters */}
      {filterBar}
    </>
  );
}
