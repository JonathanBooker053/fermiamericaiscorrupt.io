// Load a style by name and inject CSS custom properties
import * as texasDem from '../styles/texas-dem/index.js';
import * as defaultStyle from '../styles/default/index.js';

const styles = {
  'texas-dem': texasDem,
  'default': defaultStyle,
};

export function loadStyle(styleName) {
  const style = styles[styleName] || styles['default'];

  // Inject CSS custom properties
  if (style.cssVars) {
    Object.entries(style.cssVars).forEach(([k, v]) => {
      document.documentElement.style.setProperty(k, v);
    });
  }

  // Load Google Fonts for texas-dem
  if (styleName === 'texas-dem') {
    const existing = document.querySelector('link[data-style-fonts]');
    if (!existing) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@400;700&display=swap';
      link.setAttribute('data-style-fonts', styleName);
      document.head.appendChild(link);
    }
  }

  return style;
}

// Map theme.json categories to style palette colors
export function buildThemeColors(palette, styleName) {
  if (styleName !== 'texas-dem') return null;

  return {
    CAT_COLOR: {
      person:          palette.nodeKeyPeople,
      company_core:    palette.nodeFermiCore,
      company_failed:  palette.nodeFailedDeparted,
      company_other:   palette.nodePriorCompanies,
      finance:         palette.nodeLendersFinance,
      partner:         palette.nodePartnersSupply,
      political:       palette.nodePoliticalGovt,
      legal:           palette.nodeLegalActions,
    },
    EDGE_COLOR: {
      family:            palette.connFamily,
      leadership:        palette.connLeadership,
      core:              palette.connCoreProject,
      career:            palette.connCareer,
      political_donation: palette.connPolitical,
      political:         palette.connPolitical,
      revolving_door:    palette.connRevolvingDoor,
      regulatory:        palette.connRegulatory,
      financing:         palette.connFinancing,
      partnership:       palette.connPartnership,
      legal:             palette.connLegal,
    },
  };
}

// Voter-friendly flag label remapping
export const FLAG_LABELS = {
  'HIGH RISK':      'Under Scrutiny',
  'NO REVENUE':     'No Track Record',
  'REVOLVING DOOR': 'Conflict of Interest',
  'CREDIBLE':       'Verified',
  'CONTROVERSIAL':  'Disputed',
  'CONTRACTOR':     'Hired Contractor',
  'KEY PARTNER':    'Key Partner',
  'FILED':          'Filed in Court',
};

export function remapFlag(flag, styleName) {
  if (styleName !== 'texas-dem' || !flag) return flag;
  return FLAG_LABELS[flag] || flag;
}
