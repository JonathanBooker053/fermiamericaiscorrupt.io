export default function CampaignCTA({ ctaStripConfig }) {
  const handleAction = (action) => {
    const url = window.location.href;
    const title = 'Fermi America: Follow the Money';
    switch (action) {
      case 'share-twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'share-facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'copy-link':
        navigator.clipboard.writeText(url);
        break;
      case 'download-pdf':
        // Placeholder for PDF generation
        break;
    }
  };

  return (
    <div
      style={{
        background: ctaStripConfig.backgroundColor,
        color: ctaStripConfig.textColor,
        padding: '20px 24px',
        textAlign: 'center',
        fontFamily: "'Lato', sans-serif",
      }}
    >
      <div
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '20px',
          fontWeight: 700,
          marginBottom: '6px',
        }}
      >
        {ctaStripConfig.heading}
      </div>
      <div style={{ fontSize: '13px', opacity: 0.8, marginBottom: '14px' }}>
        {ctaStripConfig.body}
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {ctaStripConfig.buttons.map((btn, i) => (
          <button
            key={i}
            onClick={() => handleAction(btn.action)}
            style={{
              background: 'rgba(255,255,255,0.15)',
              color: '#FFFFFF',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '7px 18px',
              borderRadius: '20px',
              fontSize: '12px',
              fontFamily: "'Lato', sans-serif",
              fontWeight: 500,
              cursor: 'pointer',
              letterSpacing: '0.02em',
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
