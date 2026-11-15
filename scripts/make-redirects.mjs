// Runs automatically after `npm run build`.
// Article addresses used to be /articles/<name>/. They are now /<main category>/<name>/.
// This writes a permanent (301) redirect for every article into dist/.htaccess,
// so old links and Google results keep working.
// Categories are read from the same single file the rest of the site uses.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'src/content/articles';
const HTACCESS = 'dist/.htaccess';
const MARKER = '# ARTICLE-REDIRECTS';

const categories = JSON.parse(await readFile('src/data/categories.json', 'utf8'));
// A story filed under a subcategory lives at its parent's address.
const mainSlug = (slug) => {
  const c = categories.find((x) => x.slug === slug);
  if (!c) throw new Error(`unknown category "${slug}"`);
  return c.parent ?? c.slug;
};

const files = (await readdir(SRC)).filter((f) => f.endsWith('.md'));
const rules = [];
for (const file of files) {
  const text = await readFile(path.join(SRC, file), 'utf8');
  const front = text.split(/^---\s*$/m)[1] ?? '';
  if (/^draft:\s*true/m.test(front)) continue;
  const category = front.match(/^category:\s*["']?([a-z0-9-]+)/m)?.[1];
  if (!category) throw new Error(`${file}: no category found`);
  const slug = file.replace(/\.md$/, '');
  rules.push(`RewriteRule ^articles/${slug}/?$ /${mainSlug(category)}/${slug}/ [L,R=301]`);
}

const htaccess = await readFile(HTACCESS, 'utf8');
if (!htaccess.includes(MARKER)) throw new Error(`${HTACCESS} has no "${MARKER}" line`);
await writeFile(HTACCESS, htaccess.replace(MARKER, `${MARKER}\n${rules.join('\n')}`));
console.log(`redirects: ${rules.length} old article address(es) redirected`);
