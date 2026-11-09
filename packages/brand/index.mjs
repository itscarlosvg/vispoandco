// Vispo & Co. — brand assets generated as inline SVG (logo, mark, icons, illustrations).
import { readFileSync } from 'node:fs';

const W = JSON.parse(readFileSync(new URL('./wordmark.json', import.meta.url), 'utf8'));

const PTS = [[15, 18], [37, 18], [65, 50], [37, 82], [15, 82], [43, 50]];
const OX = -14, OY = -10.4, S = 1.2;
const f1 = (n) => n.toFixed(1);
const POLY = PTS.map(([a, b]) => `${f1(OX + a * S)},${f1(OY + b * S)}`).join(' ');
const CURSOR = `<rect x="${f1(OX + 69 * S)}" y="${f1(OY + 68 * S)}" width="${f1(16 * S)}" height="${f1(14 * S)}" style="fill:var(--acc)"/>`;

export function logo(cls, fg = 'var(--paper)') {
  return `<svg class="${cls}" viewBox="0 0 ${W.LW} 116" role="img" aria-label="Vispo & Co."><polygon points="${POLY}" style="fill:${fg}"/>${CURSOR}`
    + `<g transform="translate(110,88)"><path d="${W.body}" style="fill:${fg}"/><path d="${W.dot}" style="fill:var(--acc)"/><path d="${W.co}" style="fill:${fg}"/></g></svg>`;
}

export const mark = `<svg viewBox="0 0 116 116" aria-hidden="true"><polygon points="${POLY}" style="fill:var(--paper)"/>${CURSOR}</svg>`;

export const instagram = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>';

const ic = (p) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;

export const icons = {
  I_DOMAIN: ic('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18"/>'),
  I_MAP: ic('<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'),
  I_CAL: ic('<rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/><path d="M8.5 14.5l2 2 4-4"/>'),
  I_QR: ic('<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2v2h-2zM18 18h2v2h-2zM18 14h2M14 20h2"/>'),
  I_BAG: ic('<path d="M5 8h14l-1.2 12H6.2z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>'),
  I_CHART: ic('<path d="M4 20V10M10 20V4M16 20v-7M21 20H3"/>'),
  I_REEL: ic('<rect x="6" y="3" width="12" height="18" rx="2.5"/><path d="M10.5 9.5l4 2.5-4 2.5z"/>'),
  I_TOOL: ic('<path d="M14.5 6.5a4 4 0 0 0-5.3 5.2L4 17v3h3l5.3-5.2a4 4 0 0 0 5.2-5.3l-2.5 2.5-2.5-.5-.5-2.5z"/>'),
};

const A = 'style="fill:var(--acc)"', P = 'style="fill:var(--paper)"', L = 'style="fill:var(--panel-2)"', M = 'style="fill:#3A3A43"';
const BLINK = '<animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite"/>';

export const illustrations = {
  V_IDEA: `<svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><rect x="60" y="40" width="190" height="46" rx="16" ${L}/><rect x="80" y="58" width="120" height="10" rx="5" ${M}/><rect x="150" y="104" width="190" height="46" rx="16" ${A}/><rect x="170" y="122" width="110" height="10" rx="5" style="fill:#7a1236"/><rect x="292" y="122" width="12" height="11" ${P}>${BLINK}</rect></svg>`,
  V_DESIGN: `<svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><rect x="70" y="30" width="260" height="140" rx="12" fill="none" style="stroke:#3A3A43" stroke-width="2" stroke-dasharray="6 6"/><rect x="90" y="50" width="120" height="70" rx="8" ${L}/><circle cx="270" cy="85" r="34" ${A}/><rect x="90" y="134" width="80" height="18" rx="6" ${P}/><rect x="180" y="134" width="60" height="18" rx="6" ${M}/><path d="M304 120l14 34 6-14 14-6z" ${P}/></svg>`,
  V_CODE: `<svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><g font-family="JetBrains Mono, monospace" font-size="15"><text x="60" y="58" ${A}>&gt;</text><text x="80" y="58" ${P}>npm run build</text><text x="60" y="88" style="fill:#8C8B93">✓ móvil 390 px</text><text x="60" y="114" style="fill:#8C8B93">✓ tablet 820 px</text><text x="60" y="140" style="fill:#8C8B93">✓ escritorio 1440 px</text><text x="60" y="166" ${A}>&gt;</text></g><rect x="78" y="154" width="10" height="14" ${P}>${BLINK}</rect></svg>`,
  V_LAUNCH: `<svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><path d="M60 170 C 160 168 230 120 300 40" fill="none" style="stroke:#111214" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round"/><g transform="translate(300 40) rotate(-50) translate(-26 -24)"><polygon points="0,0 18,0 40,24 18,48 0,48 22,24" style="fill:#111214"/></g><rect x="48" y="164" width="14" height="12" style="fill:#111214"/></svg>`,
};

const shot = (bg, inner) => `<svg viewBox="0 0 400 310" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%;display:block" aria-hidden="true"><rect width="400" height="310" style="fill:${bg}"/>${inner}</svg>`;
const range = (n) => [...Array(n).keys()];

export const caseThumbs = {
  C1: shot('#16161A', `<rect x="34" y="38" width="332" height="200" rx="14" style="fill:#0B0B0D"/><circle cx="290" cy="138" r="64" style="fill:#2A2C31"/><path d="M240 156a50 50 0 0 1 100 0z" ${A}/><rect x="60" y="92" width="150" height="16" rx="5" ${P}/><rect x="60" y="116" width="110" height="16" rx="5" ${P}/><rect x="60" y="150" width="84" height="24" rx="6" ${A}/><rect x="34" y="250" width="104" height="40" rx="10" style="fill:#2A2A31"/><rect x="148" y="250" width="104" height="40" rx="10" style="fill:#2A2A31"/><rect x="262" y="250" width="104" height="40" rx="10" style="fill:#2A2A31"/>`),
  C2: shot('#F5F2EC', '<rect x="30" y="40" width="250" height="230" rx="14" style="fill:#fff"/>'
    + range(4).map((i) => { const c = i % 2, r = Math.floor(i / 2); return `<rect x="${46 + c * 114}" y="${60 + r * 100}" width="102" height="88" rx="10" style="fill:${['#FFE0EA', '#EAE5DB'][(i + r) % 2]}"/><circle cx="${97 + c * 114}" cy="${98 + r * 100}" r="22" style="fill:#fff"/>`; }).join('')
    + '<rect x="262" y="96" width="108" height="196" rx="20" style="fill:#111214"/><rect x="270" y="104" width="92" height="180" rx="14" style="fill:#F5F2EC"/><rect x="278" y="120" width="76" height="60" rx="8" style="fill:#FFE0EA"/><rect x="278" y="190" width="60" height="9" rx="4" style="fill:#111214"/><rect x="278" y="250" width="76" height="22" rx="7" style="fill:#E8336F"/>'),
  C3: shot('#E8336F', '<rect x="140" y="28" width="130" height="262" rx="24" style="fill:#111214"/><rect x="149" y="37" width="112" height="244" rx="17" style="fill:#F5F2EC"/><rect x="160" y="62" width="70" height="12" rx="5" style="fill:#111214"/>'
    + range(4).map((i) => `<rect x="160" y="${90 + i * 40}" width="90" height="30" rx="8" style="fill:#fff"/><rect x="168" y="${99 + i * 40}" width="${[56, 40, 66, 30][i]}" height="12" rx="5" style="fill:${['#E8336F', '#DEDAD2', '#E8336F', '#DEDAD2'][i]}"/>`).join('')
    + '<rect x="40" y="60" width="74" height="74" rx="18" style="fill:rgba(17,18,20,.16)"/><rect x="296" y="180" width="74" height="74" rx="18" style="fill:rgba(17,18,20,.16)"/>'),
};
