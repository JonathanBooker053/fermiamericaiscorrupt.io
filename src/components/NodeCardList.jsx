// Mobile fallback: card list instead of force-directed graph
export default function NodeCardList({ nodes, nodeData, theme, sel, setSel, setDetailSection, styleName, remapFlag }) {
  const { CAT_COLOR, CAT_LABEL } = theme;

  return (
    <div
      style={{
        flex: 1,
        overflowY: 'auto',
        padding: '12px',
        background: styleName === 'texas-dem' ? '#F4F6FB' : '#f4f6f9',
        fontFamily: styleName === 'texas-dem' ? "'Lato', sans-serif" : 'monospace',
      }}
    >
      <div
        style={{
          fontSize: '11px',
          color: styleName === 'texas-dem' ? '#3D4566' : '#4a6a85',
          marginBottom: '12px',
          letterSpacing: '0.04em',
        }}
      >
        Tap any card to view details
      </div>
      {nodes.map((node) => {
        const nd = nodeData[node.id];
        if (!nd) return null;
        const c = CAT_COLOR[node.category] || '#1e3a4a';
        const isSel = sel === node.id;
        const flag = remapFlag ? remapFlag(nd.flag, styleName) : nd.flag;

        return (
          <div
            key={node.id}
            onClick={() => {
              setSel(isSel ? null : node.id);
              setDetailSection(0);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              marginBottom: '6px',
              background: isSel ? (styleName === 'texas-dem' ? '#EBF0FA' : '#f0f4f8') : '#FFFFFF',
              borderLeft: `4px solid ${c}`,
              borderRadius: '4px',
              cursor: 'pointer',
              boxShadow: isSel ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            <span style={{ fontSize: '18px' }}>{nd.icon || 'o'}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: c,
                  lineHeight: 1.3,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {nd.label}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: styleName === 'texas-dem' ? '#3D4566' : '#4a6a85',
                  lineHeight: 1.4,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {nd.sub}
              </div>
            </div>
            {flag && (
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  color: nd.flagColor || '#BF0A30',
                  background: styleName === 'texas-dem' ? 'rgba(191,10,48,0.08)' : `${nd.flagColor || '#ef4444'}18`,
                  padding: '2px 7px',
                  borderRadius: '4px',
                  whiteSpace: 'nowrap',
                }}
              >
                {flag}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
