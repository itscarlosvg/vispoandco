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
const kb = (s) => `${(Buffer.byteLength(s) / 1024).toFixed(0)} KB`;

function buildWeb() {
  const src = 'apps/web/src';
  const carta = read(`${src}/features/work/data/carta.html`);
  const html = fill(compose('index.html', join(ROOT, src)), {
    CALL_AUDIO: 'data:audio/mpeg;base64,' + read(`${src}/assets/audio/call.mp3`, null).toString('base64'),
    CALL_DATA: read(`${src}/assets/data/call-transcript.json`),
    CARTA_HTML: JSON.stringify(carta).replace(/<\//g, '<\\/'),
    // Llamada de Clínica Sonríe: audio + tiempos de cada frase (opcionales; sin ellos la demo se reproduce simulada)
    CLINIC_AUDIO: has(`${src}/assets/audio/clinica.mp3`) ? 'data:audio/mpeg;base64,' + read(`${src}/assets/audio/clinica.mp3`, null).toString('base64') : '',
    CLINIC_TIMES: has(`${src}/assets/data/clinica-call.json`) ? read(`${src}/assets/data/clinica-call.json`).trim() : 'null',
    LOGO_LIGHT: brand.logo('logo'),
    LOGO_LIGHT_F: brand.logo('logo'),
    LOGO_MARK: brand.mark,
    IG_ICON: brand.instagram,
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
  const zip = join(DIST, 'web/vispoandco-netlify.zip');
  rmSync(zip, { force: true });
  execFileSync('zip', ['-q', '-X', zip, 'index.html', 'favicon.svg'], { cwd: join(DIST, site) });
  console.log(`web  ✓ artifact.html ${kb(html)} · site/ · vispoandco-netlify.zip`);
}

function buildHq() {
  const html = fill(compose('index.html', join(ROOT, 'apps/hq/src')), { LOGO: brand.logo('logo') });
  write('hq/index.html', html);
  console.log(`hq   ✓ index.html ${kb(html)}`);
}

const target = process.argv[2];
if (!target || target === 'web') buildWeb();
if (!target || target === 'hq') buildHq();
