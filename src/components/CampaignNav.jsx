export default function CampaignNav({ navConfig, nodes, edges }) {
  return (
    <div
      style={{
        background: navConfig.backgroundColor,
        color: navConfig.textColor,
        padding: '0',
      }}
    >
      {/* Main nav bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 24px',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '18px',
              fontWeight: 700,
              color: navConfig.accentColor,
              letterSpacing: '-0.01em',
            }}
          >
            {navConfig.campaignName}
          </span>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {navConfig.links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              style={{
                color: navConfig.textColor,
                textDecoration: 'none',
                fontSize: '13px',
                fontFamily: "'Lato', sans-serif",
                fontWeight: 500,
                opacity: 0.85,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={navConfig.ctaPrimary.href}
            style={{
              background: navConfig.accentColor,
              color: navConfig.backgroundColor,
              padding: '7px 18px',
              borderRadius: '20px',
              fontSize: '12px',
              fontFamily: "'Lato', sans-serif",
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '0.03em',
            }}
          >
            {navConfig.ctaPrimary.label}
          </a>
        </nav>
      </div>

      {/* Tagline bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          padding: '8px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        <span
          style={{
            fontSize: '12px',
            fontFamily: "'Lato', sans-serif",
            opacity: 0.7,
          }}
        >
          {navConfig.tagline}
        </span>
        <span
          style={{
            fontSize: '11px',
            fontFamily: "'Lato', sans-serif",
            opacity: 0.5,
          }}
        >
          {nodes.length} entities &middot; {edges.length} connections &middot; Updated March 31, 2026
        </span>
      </div>
    </div>
  );
}
