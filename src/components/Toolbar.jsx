export default function Toolbar({
  nodes,
  edges,
  theme,
  filterCat,
  setFilterCat,
  setSel,
}) {
  const { CAT_COLOR, CAT_LABEL } = theme;

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
      <div
        style={{
          padding: "7px 16px",
          display: "flex",
          gap: "5px",
          flexWrap: "wrap",
          borderBottom: "1px solid #c8d6e5",
          background: "#ffffff",
        }}
      >
        <button
          onClick={() => {
            setFilterCat(null);
            setSel(null);
          }}
          style={{
            padding: "3px 11px",
            fontSize: "11px",
            cursor: "pointer",
            letterSpacing: "0.06em",
            border:
              "1px solid " + (!filterCat ? "#b45309" : "#9ab0c4"),
            background: !filterCat ? "#b4530918" : "transparent",
            color: !filterCat ? "#b45309" : "#2a4560",
          }}
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
            style={{
              padding: "3px 11px",
              fontSize: "11px",
              cursor: "pointer",
              letterSpacing: "0.06em",
              border:
                "1px solid " +
                (filterCat === c ? CAT_COLOR[c] : "#9ab0c4"),
              background:
                filterCat === c ? CAT_COLOR[c] + "22" : "transparent",
              color: filterCat === c ? CAT_COLOR[c] : "#2a4560",
            }}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    </>
  );
}
