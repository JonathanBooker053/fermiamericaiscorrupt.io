import { describe, it, expect } from 'vitest';
import { palette, typography, cssVars, campaign, meta } from '../../styles/texas-dem/index.js';

describe('texas-dem style', () => {
  it('exports valid meta', () => {
    expect(meta.id).toBe('texas-dem');
    expect(meta.name).toBeTruthy();
    expect(meta.version).toBeTruthy();
  });

  it('has correct brand colors', () => {
    expect(palette.democratBlue).toBe('#002868');
    expect(palette.democratRed).toBe('#BF0A30');
  });

  it('all palette values are valid hex strings', () => {
    Object.entries(palette).forEach(([key, v]) => {
      expect(v, `palette.${key} should be a hex color`).toMatch(/^#[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/);
    });
  });

  it('all cssVars keys start with --', () => {
    Object.keys(cssVars).forEach(k => {
      expect(k.startsWith('--')).toBe(true);
    });
  });

  it('navConfig has required fields', () => {
    expect(campaign.navConfig).toBeTruthy();
    expect(campaign.navConfig.logoAlt).toBeTruthy();
    expect(campaign.navConfig.campaignName).toBeTruthy();
    expect(campaign.navConfig.links.length).toBeGreaterThan(0);
    expect(campaign.navConfig.ctaPrimary).toBeTruthy();
    expect(campaign.navConfig.ctaPrimary.label).toBeTruthy();
  });

  it('footer disclaimer is TEC-compliant', () => {
    expect(campaign.footerConfig.disclaimer).toContain('Paid for by');
    expect(campaign.footerConfig.disclaimer).toContain('Texas Democratic Party');
  });

  it('sidebar copy is voter-friendly (no DOSSIER or INTELLIGENCE)', () => {
    const s = JSON.stringify(campaign.sidebarConfig);
    expect(s).not.toContain('DOSSIER');
    expect(s).not.toContain('INTELLIGENCE');
  });

  it('all campaign components export non-null objects', () => {
    expect(campaign.navConfig).toBeTruthy();
    expect(campaign.heroConfig).toBeTruthy();
    expect(campaign.sidebarConfig).toBeTruthy();
    expect(campaign.ctaStripConfig).toBeTruthy();
    expect(campaign.footerConfig).toBeTruthy();
  });

  it('typography has required font stacks', () => {
    expect(typography.fontHeading).toContain('Playfair Display');
    expect(typography.fontBody).toContain('Lato');
  });

  it('heroConfig has required fields', () => {
    expect(campaign.heroConfig.headline).toBeTruthy();
    expect(campaign.heroConfig.subhead).toBeTruthy();
  });
});
