// Single-file composition: resolves @include directives and {{TOKEN}} placeholders.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const INCLUDE = /^[ \t]*(?:<!--|\/\*|\/\/) @include (\S+?)(?: -->| \*\/)?\n/gm;

/** Inline every `@include path` (paths relative to `root`), recursively. */
export function compose(entry, root, seen = []) {
  if (seen.includes(entry)) throw new Error(`Include cycle: ${[...seen, entry].join(' → ')}`);
  const text = readFileSync(resolve(root, entry), 'utf8');
  return text.replace(INCLUDE, (_, path) => compose(path, root, [...seen, entry]));
}

/** Replace every {{KEY}} with its value; fail on unknown or leftover tokens. */
export function fill(text, tokens, { optional = [] } = {}) {
  for (const [key, value] of Object.entries(tokens)) {
    const tag = `{{${key}}}`;
    if (!text.includes(tag) && !optional.includes(key)) throw new Error(`Token not used: ${tag}`);
    text = text.split(tag).join(value);
  }
  const left = text.match(/\{\{[A-Z0-9_]+\}\}/);
  if (left) throw new Error(`Unresolved token: ${left[0]}`);
  return text;
}
