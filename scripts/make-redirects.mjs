// Runs automatically after `npm run build`.
// Article addresses used to be /articles/<name>/. They are now /<category>/<name>/.
// This writes a permanent (301) redirect for every article into dist/.htaccess,
// so old links and Google results keep working.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'src/content/articles';
const HTACCESS = 'dist/.htaccess';
const MARKER = '# ARTICLE-REDIRECTS';

const files = (await readdir(SRC)).filter((f) => f.endsWith('.md'));
const rules = [];
for (const file of files) {
  const text = await readFile(path.join(SRC, file), 'utf8');
  const front = text.split(/^---\s*$/m)[1] ?? '';
  if (/^draft:\s*true/m.test(front)) continue;
  const category = front.match(/^category:\s*["']?([a-z0-9-]+)/m)?.[1];
  if (!category) throw new Error(`${file}: no category found`);
  const slug = file.replace(/\.md$/, '');
  rules.push(`RewriteRule ^articles/${slug}/?$ /${category}/${slug}/ [L,R=301]`);
}

const htaccess = await readFile(HTACCESS, 'utf8');
if (!htaccess.includes(MARKER)) throw new Error(`${HTACCESS} has no "${MARKER}" line`);
await writeFile(HTACCESS, htaccess.replace(MARKER, `${MARKER}\n${rules.join('\n')}`));
console.log(`redirects: ${rules.length} old article address(es) redirected`);
