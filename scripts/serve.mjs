#!/usr/bin/env node
// Servidor local de dist/: la web en /, el HQ en /hq/
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const PORT = Number(process.env.PORT) || 4173;
const TYPES = { '.html': 'text/html; charset=utf-8', '.svg': 'image/svg+xml', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.mp3': 'audio/mpeg', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8' };

createServer(async (req, res) => {
  const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const base = url.startsWith('/hq') ? join(DIST, 'hq') : join(DIST, 'web', 'site');
  let rel = normalize(url.replace(/^\/hq/, '') || '/').replace(/^(\.\.[/\\])+/, '');
  if (rel.endsWith('/')) rel += 'index.html';
  try {
    const body = await readFile(join(base, rel));
    res.writeHead(200, { 'content-type': TYPES[extname(rel)] || 'application/octet-stream' }).end(body);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('404');
  }
}).listen(PORT, () => console.log(`web → http://localhost:${PORT}\nhq  → http://localhost:${PORT}/hq/`));
