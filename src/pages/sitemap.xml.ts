// Main sitemap: every page on the site, with the date it last changed.
// New articles and pages are added automatically on every build.
import type { APIRoute } from 'astro';
import { SITE, DESK } from '../site.config';
import { CATEGORIES, categoryUrl } from '../lib/categories';
import { getArticles, isoDate, lastModified, articleUrl, inCategory } from '../lib/articles';
import { abs, img } from '../lib/images';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Plain pages (about, contact, ...) are found automatically: any .astro file placed
// directly in src/pages/ is listed, except the home page and the "not found" page.
const STATIC_PAGES = Object.keys(import.meta.glob('./*.astro'))
  .map((f) => f.replace('./', '').replace('.astro', ''))
  .filter((name) => name !== 'index' && name !== '404')
  .sort()
  .map((name) => `/${name}/`);

export const GET: APIRoute = async () => {
  const articles = await getArticles();
  const newest = (list: typeof articles) =>
    list.length ? isoDate(new Date(Math.max(...list.map((a) => lastModified(a).getTime())))) : undefined;

  const urls: { loc: string; lastmod?: string; image?: { loc: string; title: string } }[] = [];
  urls.push({ loc: '/', lastmod: newest(articles) });
  for (const a of articles) {
    urls.push({
      loc: articleUrl(a),
      lastmod: isoDate(lastModified(a)),
      image: { loc: abs(img(a.data.image, 1600, 900)), title: a.data.imageAlt },
    });
  }
  urls.push({ loc: '/category/all/', lastmod: newest(articles) });
  // Every category and subcategory from src/data/categories.json that has stories. Empty ones are left out.
  for (const c of CATEGORIES) {
    const items = inCategory(articles, c);
    if (items.length) urls.push({ loc: categoryUrl(c), lastmod: newest(items) });
  }
  const desk = articles.filter((a) => a.data.author === DESK.name);
  if (desk.length) urls.push({ loc: `/author/${DESK.slug}/`, lastmod: newest(desk) });
  for (const p of STATIC_PAGES) urls.push({ loc: p });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map((u) => `  <url>
    <loc>${esc(SITE.url + u.loc)}</loc>${u.lastmod ? `
    <lastmod>${u.lastmod}</lastmod>` : ''}${u.image ? `
    <image:image>
      <image:loc>${esc(u.image.loc)}</image:loc>
    </image:image>` : ''}
  </url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
