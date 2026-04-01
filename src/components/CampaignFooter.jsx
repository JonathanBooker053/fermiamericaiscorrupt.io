export default function CampaignFooter({ footerConfig }) {
  return (
    <footer
      style={{
        background: footerConfig.backgroundColor,
        color: footerConfig.textColor,
        padding: '24px 24px 20px',
        fontFamily: "'Lato', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
        }}
      >
        {/* Links */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            marginBottom: '16px',
            flexWrap: 'wrap',
          }}
        >
          {footerConfig.links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{
                color: footerConfig.accentColor,
                textDecoration: 'none',
                fontSize: '12px',
                fontWeight: 500,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Attribution */}
        <div
          style={{
            fontSize: '11px',
            opacity: 0.8,
            marginBottom: '12px',
            lineHeight: 1.6,
          }}
        >
          {footerConfig.attribution}
        </div>

        {/* Legal disclaimer */}
        <div
          style={{
            fontSize: '10px',
            opacity: 0.6,
            lineHeight: 1.5,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '12px',
          }}
        >
          {footerConfig.disclaimer}
        </div>
      </div>
    </footer>
  );
}
