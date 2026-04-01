# Texas Democratic Campaign Style

## Purpose
Professional campaign style for voter-facing entity relationship maps.
Aligned with Texas Democratic Party brand guidelines.

## Color palette
- Primary: #002868 (Democrat Blue)
- Accent:  #BF0A30 (Democrat Red)
- Gold:    #C9A84C

## Fonts
- Headings: Playfair Display (Google Fonts)
- Body/UI:  Lato (Google Fonts)

## How to apply to a network
1. In your network's theme.json, set: { "style": "texas-dem" }
2. Import styles in your theme loader: import * as theme from '../../styles/texas-dem/index.js'
3. Inject cssVars into :root at app boot
4. Replace app shell with campaign components from campaign.js

## Components included
- navConfig      - top navigation bar with campaign branding
- heroConfig     - page hero / headline section
- sidebarConfig  - voter-friendly sidebar instructions
- ctaStripConfig - share / donate call-to-action strip
- footerConfig   - footer with campaign finance disclaimer (TEC-compliant)

## Legal
Always include the footerConfig.disclaimer verbatim.
Texas Ethics Commission requires campaign finance disclosure on all
political advertising. Do not remove or abbreviate this text.
