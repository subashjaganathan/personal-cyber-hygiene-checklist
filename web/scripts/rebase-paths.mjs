/**
 * Rewrites root-absolute asset and link paths in the static build so the site
 * can be served from a sub-path (e.g. GitHub Pages project site).
 *
 * Qwik 1.4 does not apply Vite's `base` to emitted asset URLs, so we post-process
 * the generated `dist/` output. Usage: `node scripts/rebase-paths.mjs /security-checklist`
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const rawBase = process.argv[2] || process.env.BASE_PATH || '';
// Normalise to a leading-slash, no-trailing-slash prefix, e.g. "/security-checklist"
const prefix = ('/' + rawBase.replace(/^\/+|\/+$/g, '')).replace(/\/$/, '');
if (!prefix || prefix === '/') {
  console.log('[rebase-paths] No base path provided; nothing to do.');
  process.exit(0);
}

const distDir = join(process.cwd(), 'dist');
const textExts = new Set(['.html', '.js', '.mjs', '.json', '.css', '.txt', '.xml', '.webmanifest']);

// Public assets emitted at the site root that must be prefixed everywhere they appear.
// NB: paths already wrapped with withBase() in source (e.g. the YAML data file)
// must NOT appear here, or they would be prefixed twice.
const rootAssets = [
  'build/',
  'favicon.png',
  'manifest.json',
  'banner.png',
  'service-worker.js',
  'qwik-prefetch-service-worker.js',
  'sitemap.xml',
  'robots.txt',
  'fonts/',
];
// Top-level route segments used in statically-rendered navigation links.
const navRoutes = ['checklist', 'article', 'about'];

const assetAlt = rootAssets.map((a) => a.replace(/[.]/g, '\\.')).join('|');
// Matches an opening delimiter (quote/paren/comma/=) followed by a root-absolute asset path.
const assetRe = new RegExp(`([\"'\\(,=])\\/(${assetAlt})`, 'g');
// Matches nav links inside HTML attributes: href="/checklist..." etc.
const navRe = new RegExp(`((?:href|to)=[\"'])\\/(${navRoutes.join('|')})`, 'g');

function rewriteHtml(text) {
  return text
    // Qwik container base for lazy chunks
    .replace(/q:base="\/build\//g, `q:base="${prefix}/build/`)
    // Asset references (build/, favicon, manifest, banner, data file, etc.)
    .replace(assetRe, `$1${prefix}/$2`)
    // Home links: href="/" -> href="/security-checklist/"
    .replace(/((?:href|to)=["'])\/(["'])/g, `$1${prefix}/$2`)
    // Section / article / about navigation links
    .replace(navRe, `$1${prefix}/$2`);
}

function rewriteCode(text) {
  // In JS/JSON/SW only touch concrete root-absolute asset paths, never route tables.
  return text.replace(assetRe, `$1${prefix}/$2`);
}

let changed = 0;
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      walk(full);
      continue;
    }
    const ext = extname(name);
    if (!textExts.has(ext)) continue;
    const original = readFileSync(full, 'utf-8');
    const updated = ext === '.html' ? rewriteHtml(original) : rewriteCode(original);
    if (updated !== original) {
      writeFileSync(full, updated);
      changed++;
    }
  }
}

walk(distDir);
console.log(`[rebase-paths] Rewrote asset/link paths to "${prefix}/" in ${changed} file(s).`);
