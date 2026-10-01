/**
 * Scans `public/images` and writes the set of real photography that exists.
 *
 * The founder can drop real photography into `public/images` following the
 * naming convention documented in the README. This script runs automatically
 * before `npm run dev` and `npm run build` (see the `predev` / `prebuild`
 * scripts) so no code changes are ever required.
 *
 * Output: data/image-manifest.json — a flat array of public-root-relative paths.
 */
import { readdirSync, statSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, posix, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const imagesDir = join(root, 'public', 'images');
const outFile = join(root, 'data', 'image-manifest.json');

const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif']);

/** @returns {string[]} public-root-relative POSIX paths, e.g. "images/products/x.jpg" */
function walk(dir) {
  if (!existsSync(dir)) return [];
  /** @type {string[]} */
  const found = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stats = statSync(full);
    if (stats.isDirectory()) {
      found.push(...walk(full));
    } else if (stats.isFile()) {
      const ext = entry.slice(entry.lastIndexOf('.')).toLowerCase();
      if (!EXTENSIONS.has(ext)) continue;
      found.push(relative(root, full).split(sep).join(posix.sep));
    }
  }
  return found;
}

const images = walk(imagesDir).sort();
const publicRootFiles = walk(join(root, 'public')).filter((p) => p.split('/').length === 2);

mkdirSync(join(root, 'data'), { recursive: true });
writeFileSync(outFile, `${JSON.stringify([...new Set([...images, ...publicRootFiles])], null, 2)}\n`, 'utf8');

console.log(
  `[sync-images] ${images.length} product/editorial image(s) + ${publicRootFiles.length} public file(s) indexed.`,
);
