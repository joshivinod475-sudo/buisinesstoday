// Google News sitemap: only stories published in the last 48 hours (1,000 at most).
// Rebuilt on every publish, and once a day (see .github/workflows/deploy.yml) so older stories drop out.
import type { APIRoute } from 'astro';
import { SITE } from '../site.config';
import { articleUrl } from '../lib/articles';
import { sitemapArticles, newsArticles, stamp, esc, xmlResponse } from '../lib/sitemaps';

export const GET: APIRoute = async () => {
  const fresh = newsArticles(await sitemapArticles());
  return xmlResponse(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${fresh.map((a) => `  <url>
    <loc>${esc(SITE.url + articleUrl(a))}</loc>
    <news:news>
      <news:publication>
        <news:name>${esc(SITE.name)}</news:name>
        <news:language>${SITE.language}</news:language>
      </news:publication>
      <news:publication_date>${stamp(a.data.date)}</news:publication_date>
      <news:title>${esc(a.data.title)}</news:title>
    </news:news>
  </url>`).join('\n')}
</urlset>
`);
};
