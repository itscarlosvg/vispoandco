#!/usr/bin/env node
// Builds both apps into dist/.
//   node scripts/build.mjs            → web + hq
//   node scripts/build.mjs web|hq     → one app
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { compose, fill } from './lib/compose.mjs';
import * as brand from '../packages/brand/index.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const read = (p, enc = 'utf8') => readFileSync(join(ROOT, p), enc);
const write = (p, text) => { const f = join(DIST, p); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, text); return f; };
const has = (p) => existsSync(join(ROOT, p));
const SB = JSON.parse(read('config/supabase.json'));
const kb = (s) => `${(Buffer.byteLength(s) / 1024).toFixed(0)} KB`;

function buildWeb() {
  const src = 'apps/web/src';
  const carta = read(`${src}/features/work/data/carta.html`);
  const html = fill(compose('index.html', join(ROOT, src)), {
    CALL_AUDIO: 'data:audio/mpeg;base64,' + read(`${src}/assets/audio/call.mp3`, null).toString('base64'),
    CALL_DATA: read(`${src}/assets/data/call-transcript.json`),
    CARTA_HTML: JSON.stringify(carta).replace(/<\//g, '<\\/'),
    SB_URL: SB.url,
    SB_KEY: SB.anonKey,
    // Llamada de Clínica Sonríe: audio + tiempos de cada frase (opcionales; sin ellos la demo se reproduce simulada)
    CLINIC_AUDIO: has(`${src}/assets/audio/clinica.mp3`) ? 'data:audio/mpeg;base64,' + read(`${src}/assets/audio/clinica.mp3`, null).toString('base64') : '',
    CLINIC_TIMES: has(`${src}/assets/data/clinica-call.json`) ? read(`${src}/assets/data/clinica-call.json`).trim() : 'null',
    LOGO_LIGHT: brand.logo('logo'),
    LOGO_LIGHT_F: brand.logo('logo'),
    LOGO_MARK: brand.mark,
    IG_ICON: brand.instagram,
    MAIL_ICON: brand.mail,
    ...brand.icons,
    ...brand.illustrations,
    ...brand.caseThumbs,
  }, { optional: Object.keys(brand.caseThumbs) });

  // 1) Claude artifact: self-contained fragment
  write('web/artifact.html', html);

  // 2) Netlify site: full document + static files + deploy zip
  const body = html.startsWith('<title>') ? html.slice(html.indexOf('\n') + 1) : html;
  const site = 'web/site';
  rmSync(join(DIST, site), { recursive: true, force: true });
  write(`${site}/index.html`, fill(read(`${src}/document.html`), { CONTENT: body.trimEnd() }));
  copyFileSync(join(ROOT, 'apps/web/public/favicon.svg'), join(DIST, site, 'favicon.svg'));
  // Firma de correo (imagen) en /firma.png — fuente en docs/firma
  copyFileSync(join(ROOT, 'apps/web/public/firma.png'), join(DIST, site, 'firma.png'));
  // 3) Panel de administración en /admin (mismo panel que en Claude, con login y sin Harvey)
  const admin = hq('web');
  write(`${site}/admin/index.html`, fill(read('apps/hq/src/document.html'), { CONTENT: admin.replace(/^<title>[^\n]*\n/, '').trimEnd() }));
  const zip = join(DIST, 'web/vispoandco-netlify.zip');
  rmSync(zip, { force: true });
  try {
    execFileSync('zip', ['-q', '-X', '-r', zip, 'index.html', 'favicon.svg', 'admin', 'firma.png'], { cwd: join(DIST, site) });
  } catch { console.log('web  · zip no disponible: se omite el paquete para subir a mano'); }
  console.log(`web  ✓ artifact.html ${kb(html)} · site/ (+ /admin) · vispoandco-netlify.zip`);
}

/** Panel HQ: 'claude' usa el conector de Supabase; 'web' usa supabase-js con login. */
function hq(target) {
  const web = target === 'web';
  return fill(compose('index.html', join(ROOT, 'apps/hq/src')), {
    LOGO: brand.logo('logo'),
    SB_PROJECT: SB.project,
    HQ_BACKEND: web ? JSON.stringify({ url: SB.url, key: SB.anonKey }) : 'null',
    HQ_HEAD: web ? '<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js"></script>\n' : '',
  }, { optional: ['HQ_HEAD'] });
}

function buildHq() {
  const html = hq('claude');
  write('hq/index.html', html);
  console.log(`hq   ✓ index.html ${kb(html)}`);
}

const target = process.argv[2];
if (!target || target === 'web') buildWeb();
if (!target || target === 'hq') buildHq();
