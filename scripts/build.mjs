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

const SITE_URL = 'https://vispoandco.com';
const PUBLIC = ['favicon.svg', 'apple-touch-icon.png', 'icon-512.png', 'og.png', 'firma.png'];

function buildWeb() {
  const src = 'apps/web/src';
  const composed = compose('index.html', join(ROOT, src));
  const audio = (name) => has(`${src}/assets/audio/${name}`) ? read(`${src}/assets/audio/${name}`, null) : null;
  const callMp3 = audio('call.mp3'), clinicMp3 = audio('clinica.mp3');
  const tokens = (inline) => ({
    // En Claude el audio va dentro del HTML; en la web se sirve aparte para que la página cargue rápido
    CALL_AUDIO: inline ? 'data:audio/mpeg;base64,' + callMp3.toString('base64') : '/media/llamada.mp3',
    CALL_DATA: read(`${src}/assets/data/call-transcript.json`),
    SB_URL: SB.url,
    SB_KEY: SB.anonKey,
    // Llamada de Clínica Sonríe: audio + tiempos de cada frase (opcionales; sin ellos la demo se reproduce simulada)
    CLINIC_AUDIO: clinicMp3 ? (inline ? 'data:audio/mpeg;base64,' + clinicMp3.toString('base64') : '/media/clinica.mp3') : '',
    CLINIC_TIMES: has(`${src}/assets/data/clinica-call.json`) ? read(`${src}/assets/data/clinica-call.json`).trim() : 'null',
    LOGO_LIGHT: brand.logo('logo'),
    LOGO_LIGHT_F: brand.logo('logo'),
    LOGO_MARK: brand.mark,
    IG_ICON: brand.instagram,
    MAIL_ICON: brand.mail,
    ...brand.icons,
    ...brand.illustrations,
    ...brand.caseThumbs,
  });
  const opt = { optional: Object.keys(brand.caseThumbs) };

  // 1) Claude artifact: self-contained fragment
  const html = fill(composed, tokens(true), opt);
  write('web/artifact.html', html);

  // 2) Netlify site: documento completo con SEO + archivos estáticos
  const site = 'web/site';
  rmSync(join(DIST, site), { recursive: true, force: true });
  let body = fill(composed, tokens(false), opt).replace(/^<title>[^\n]*\n/, '');
  // lo que en el fragmento va arriba (meta y fuentes) pasa al <head>
  body = body.replace(/^<meta name="(?:claude:viewport-fit-sides|description)"[^\n]*\n/gm, '');
  const fonts = body.match(/^<link rel="(?:preconnect|stylesheet)"[^\n]*\n/gm) || [];
  body = body.replace(/^<link rel="(?:preconnect|stylesheet)"[^\n]*\n/gm, '');
  // la primera hoja (fuentes de la marca) bloquea; las de las demos se cargan sin bloquear
  let sheet = 0;
  const head = fonts.map((l) => l.startsWith('<link rel="stylesheet"') && sheet++ > 0
    ? l.replace('<link rel="stylesheet"', '<link rel="stylesheet" media="print" onload="this.media=\'all\'"') : l).join('');
  const esc = (t) => t.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  write(`${site}/index.html`, fill(read(`${src}/document.html`), {
    TITLE: esc(TITLE),
    DESCRIPTION: esc(DESCRIPTION),
    SITE_URL,
    HEAD: head.trimEnd(),
    JSONLD: JSON.stringify(jsonld(read(`${src}/partials/sections/faq.html`))).replace(/</g, '\\u003c'),
    CONTENT: body.trimEnd(),
  }));
  for (const f of PUBLIC) copyFileSync(join(ROOT, 'apps/web/public', f), join(DIST, site, f));
  mkdirSync(join(DIST, site, 'media'), { recursive: true });
  writeFileSync(join(DIST, site, 'media/llamada.mp3'), callMp3);
  if (clinicMp3) writeFileSync(join(DIST, site, 'media/clinica.mp3'), clinicMp3);
  write(`${site}/robots.txt`, `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  write(`${site}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${SITE_URL}/</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>\n</urlset>\n`);
  // 3) Panel de administración en /admin (mismo panel que en Claude, con login y sin Harvey)
  const admin = hq('web');
  write(`${site}/admin/index.html`, fill(read('apps/hq/src/document.html'), { CONTENT: admin.replace(/^<title>[^\n]*\n/, '').trimEnd() }));
  const zip = join(DIST, 'web/vispoandco-netlify.zip');
  rmSync(zip, { force: true });
  try {
    execFileSync('zip', ['-q', '-X', '-r', zip, '.'], { cwd: join(DIST, site) });
  } catch { console.log('web  · zip no disponible: se omite el paquete para subir a mano'); }
  console.log(`web  ✓ artifact.html ${kb(html)} · site/ ${kb(read(`dist/${site}/index.html`))} (+ /admin, /media, robots, sitemap)`);
}

/** Datos estructurados (schema.org) para Google: empresa, web, servicios y preguntas frecuentes. */
function jsonld(faqHtml) {
  const strip = (t) => t.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  const faq = [...faqHtml.matchAll(/<summary>([\s\S]*?)<\/summary>\s*<p>([\s\S]*?)<\/p>/g)]
    .map(([, q, a]) => ({ '@type': 'Question', name: strip(q), acceptedAnswer: { '@type': 'Answer', text: strip(a) } }));
  const org = `${SITE_URL}/#empresa`;
  const services = [
    ['Diseño web', 'Webs a medida, rápidas y adaptadas al móvil, con dominio, alojamiento y SEO local.'],
    ['Tienda online', 'Tiendas online con catálogo, pagos seguros y envíos.'],
    ['Desarrollo de apps', 'Apps para iPhone y Android con la marca del negocio: pedidos, reservas, notificaciones y puntos.'],
    ['Asistente con IA en WhatsApp e Instagram', 'Asistente con inteligencia artificial que contesta mensajes, apunta reservas, toma pedidos y responde reseñas.'],
    ['Recepcionista telefónica con IA', 'Atención telefónica con IA y voz natural en el idioma de quien llama: reservas, citas y resumen de cada llamada.'],
    ['Automatizaciones con IA', 'Automatización de tareas repetitivas: confirmaciones, recordatorios, emails, facturas y reseñas.'],
    ['Vídeo y reels', 'Reels, anuncios para Meta y Google, motion graphics y vídeos de marca.'],
    ['Logo y marca', 'Diseño de logo e identidad visual para negocios.'],
  ];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization', '@id': org, name: 'Vispo & Co.', alternateName: 'Vispo and Co',
        url: `${SITE_URL}/`, logo: `${SITE_URL}/icon-512.png`, image: `${SITE_URL}/og.png`,
        description: 'Estudio de diseño web, apps, vídeo y automatización con inteligencia artificial para negocios.',
        email: 'info@vispoandco.com', telephone: '+34644639798',
        founder: { '@type': 'Person', name: 'Carlos Vispo', jobTitle: 'CEO' },
        areaServed: { '@type': 'Country', name: 'España' },
        knowsLanguage: ['es'],
        sameAs: ['https://www.instagram.com/vispoandco/'],
        contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', email: 'info@vispoandco.com', telephone: '+34644639798', availableLanguage: ['es'] },
        hasOfferCatalog: {
          '@type': 'OfferCatalog', name: 'Servicios',
          itemListElement: services.map(([name, description]) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name, description, provider: { '@id': org }, areaServed: { '@type': 'Country', name: 'España' } } })),
        },
      },
      { '@type': 'WebSite', '@id': `${SITE_URL}/#web`, url: `${SITE_URL}/`, name: 'Vispo & Co.', inLanguage: 'es-ES', publisher: { '@id': org } },
      { '@type': 'WebPage', '@id': `${SITE_URL}/#inicio`, url: `${SITE_URL}/`, name: TITLE, description: DESCRIPTION, inLanguage: 'es-ES', isPartOf: { '@id': `${SITE_URL}/#web` }, about: { '@id': org }, primaryImageOfPage: `${SITE_URL}/og.png` },
      ...(faq.length ? [{ '@type': 'FAQPage', '@id': `${SITE_URL}/#preguntas`, mainEntity: faq }] : []),
    ],
  };
}
const TITLE = 'Diseño web, apps y automatización con IA | Vispo & Co.';
const DESCRIPTION = 'Webs, tiendas online, apps, vídeo y automatización con IA para negocios: asistentes en WhatsApp e Instagram y recepcionista telefónica. Propuesta sin compromiso.';

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
