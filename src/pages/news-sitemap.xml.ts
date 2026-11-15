// Google News sitemap: only stories published in the last two days, as Google requires.
// The site is rebuilt every day (see .github/workflows/deploy.yml) so older stories drop out.
import type { APIRoute } from 'astro';
import { SITE } from '../site.config';
import { getArticles, isoDate, articleUrl } from '../lib/articles';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const TWO_DAYS = 48 * 60 * 60 * 1000;

export const GET: APIRoute = async () => {
  const now = Date.now();
  const fresh = (await getArticles())
    .filter((a) => a.data.category !== 'press-releases') // press releases are not news reporting
    .filter((a) => now - a.data.date.getTime() <= TWO_DAYS && a.data.date.getTime() <= now)
    .slice(0, 1000);

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${fresh.map((a) => `  <url>
    <loc>${esc(SITE.url + articleUrl(a))}</loc>
    <news:news>
      <news:publication>
        <news:name>${esc(SITE.name)}</news:name>
        <news:language>${SITE.language}</news:language>
      </news:publication>
      <news:publication_date>${isoDate(a.data.date)}</news:publication_date>
      <news:title>${esc(a.data.title)}</news:title>
    </news:news>
  </url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
