import { useMemo } from "react";

function FilterBtn({ active, onClick, color, label }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        background: active ? `${color}18` : "transparent",
        border: active
          ? `1px solid ${color}`
          : "1px solid rgba(245,240,232,0.1)",
        borderRadius: "var(--radius-sm)",
        color: active ? color : "var(--clr-faded)",
        fontFamily: "var(--font-case)",
        fontSize: 9,
        fontWeight: 500,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        padding: "4px 10px",
        cursor: "pointer",
        transition: "all var(--transition)",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.borderColor = `${color}80`;
          e.currentTarget.style.color = color;
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.borderColor = "rgba(245,240,232,0.1)";
          e.currentTarget.style.color = "var(--clr-faded)";
        }
      }}
    >
      <span style={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: color,
        flexShrink: 0,
        opacity: active ? 1 : 0.6,
      }} />
      {label}
    </button>
  );
}

export default function Toolbar({ nodes, edges, theme, filterCat, setFilterCat, setSel }) {
  const categories = useMemo(() => {
    const seen = new Set(nodes.map((n) => n.category));
    return Object.keys(theme.CAT_LABEL).filter((k) => seen.has(k));
  }, [nodes, theme]);

  const nodeCount = nodes.length;
  const edgeCount = edges.length;

  const handleAll = () => { setFilterCat(null); setSel(null); };
  const handleCat = (cat) => { setFilterCat(filterCat === cat ? null : cat); setSel(null); };

  return (
    <header style={{
      background: "var(--clr-board)",
      borderBottom: "1px solid var(--clr-border)",
      display: "flex",
      flexDirection: "column",
      gap: 0,
      flexShrink: 0,
      position: "relative",
      zIndex: 10,
    }}>
      {/* Top strip: title + stats */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 18px 8px",
        borderBottom: "0.5px solid rgba(192,57,43,0.15)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <svg width="20" height="20" viewBox="0 0 20 20" style={{ flexShrink: 0 }}>
            <polygon
              points="10,2 11.8,7.6 17.6,7.6 13,11 14.8,16.6 10,13.2 5.2,16.6 7,11 2.4,7.6 8.2,7.6"
              fill="#c0392b"
            />
          </svg>
          <div>
            <div style={{
              fontFamily: "var(--font-case)",
              fontSize: 13,
              fontWeight: 500,
              color: "var(--clr-paper)",
              letterSpacing: "0.06em",
              lineHeight: 1.2,
            }}>
              FERMI AMERICA // PROJECT MATADOR
            </div>
            <div style={{
              fontFamily: "var(--font-case)",
              fontSize: 9,
              color: "var(--clr-faded)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginTop: 2,
            }}>
              Entity Intelligence Map — The Corruption Dossier
            </div>
          </div>
        </div>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          fontFamily: "var(--font-case)",
          fontSize: 10,
          color: "var(--clr-faded)",
          letterSpacing: "0.1em",
        }}>
          <span>
            <span style={{ color: "var(--clr-paper)", fontWeight: 500, fontSize: 13 }}>
              {nodeCount}
            </span>{" "}
            ENTITIES
          </span>
          <span style={{ color: "var(--clr-border)" }}>—</span>
          <span>
            <span style={{ color: "var(--clr-paper)", fontWeight: 500, fontSize: 13 }}>
              {edgeCount}
            </span>{" "}
            CONNECTIONS
          </span>
          <span style={{ color: "var(--clr-border)" }}>—</span>
          <span style={{ color: "#d4880a", letterSpacing: "0.08em" }}>
            AS OF 2026-03-31
          </span>
          <div style={{
            border: "1.5px solid #c0392b",
            color: "#c0392b",
            fontFamily: "var(--font-case)",
            fontSize: 8,
            fontWeight: 500,
            letterSpacing: "0.2em",
            padding: "2px 8px",
            borderRadius: 2,
            transform: "rotate(-1.5deg)",
            opacity: 0.85,
          }}>
            CASE FILE
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 18px 8px",
        overflowX: "auto",
        scrollbarWidth: "none",
      }}>
        <FilterBtn
          active={filterCat === null}
          onClick={handleAll}
          color="#f5f0e8"
          label="ALL FILES"
        />
        {categories.map((cat) => (
          <FilterBtn
            key={cat}
            active={filterCat === cat}
            onClick={() => handleCat(cat)}
            color={theme.CAT_COLOR[cat] || "#9a8070"}
            label={theme.CAT_LABEL[cat]}
          />
        ))}
      </div>
    </header>
  );
}
