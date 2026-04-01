import palette from './colors.js';

// ── NAV BAR ──────────────────────────────────────────────────────────────
export const navConfig = {
  logoAlt: 'Texas Democratic Party',
  campaignName: 'Fermi America: Follow the Money',
  tagline: 'Tracking public accountability in Texas energy deals',
  links: [
    { label: 'Home',        href: '#' },
    { label: 'About',       href: '#about' },
    { label: 'Sources',     href: '#sources' },
    { label: 'Share',       href: '#share' },
  ],
  ctaPrimary: {
    label: 'Share This Map',
    href:  '#share',
  },
  ctaSecondary: {
    label: 'Get Involved',
    href:  'https://www.txdemocrats.org',
  },
  backgroundColor: palette.democratBlue,
  textColor:       palette.textOnDark,
  accentColor:     palette.gold,
};

// ── PAGE HEADER / HERO ───────────────────────────────────────────────────
export const heroConfig = {
  eyebrow:   'Texas Accountability Project',
  headline:  'Who\u2019s Behind Project Matador?',
  subhead:   'An interactive investigation into the money, people, and political connections behind Fermi America\u2019s proposed nuclear deal in Texas.',
  cta:       'Explore the Network',
  badgeText: '37 entities \u00b7 49 connections \u00b7 Updated March 31, 2026',
};

// ── SIDEBAR PANEL ────────────────────────────────────────────────────────
export const sidebarConfig = {
  instructionHeading: 'Click any name to learn more',
  instructionBody:    'Each circle represents a person, company, or government agency connected to this deal. Select one to see their role and our source documents.',
  filterHeading:      'Filter by type',
  sourceNote:         'Data sourced from SEC filings, court records, campaign finance disclosures, and investigative reporting.',
  aboutLink:          'How we built this \u2192',
};

// ── CALL TO ACTION STRIP ─────────────────────────────────────────────────
export const ctaStripConfig = {
  heading:    'Help hold them accountable.',
  body:       'Share this map with your network. Every click builds public pressure.',
  buttons: [
    { label: 'Share on X / Twitter', action: 'share-twitter' },
    { label: 'Share on Facebook',    action: 'share-facebook' },
    { label: 'Copy Link',            action: 'copy-link' },
    { label: 'Download PDF Report',  action: 'download-pdf' },
  ],
  backgroundColor: palette.democratBlue,
  textColor:       palette.textOnDark,
};

// ── FOOTER ───────────────────────────────────────────────────────────────
export const footerConfig = {
  disclaimer:  'Paid for by the Texas Democratic Party. Not authorized by any candidate or candidate\u2019s committee. Political advertising paid for by Texas Democratic Party, 314 E Highland Mall Blvd Ste 508, Austin TX 78752.',
  attribution: 'Research compiled by Jonathan Booker. Data sourced from public filings through March 31, 2026.',
  links: [
    { label: 'Texas Democratic Party', href: 'https://www.txdemocrats.org' },
    { label: 'Privacy Policy',          href: '#privacy' },
    { label: 'Contact',                 href: '#contact' },
  ],
  backgroundColor: palette.democratBlue,
  textColor:       'rgba(255,255,255,0.7)',
  accentColor:     palette.gold,
};

export default { navConfig, heroConfig, sidebarConfig, ctaStripConfig, footerConfig };
