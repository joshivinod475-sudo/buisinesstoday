// Sitemap index: points search engines to the main sitemap and the Google News sitemap.
// This is the address already submitted in Google Search Console, so it must keep working.
import type { APIRoute } from 'astro';
import { SITE } from '../site.config';
import { getArticles, isoDate, lastModified } from '../lib/articles';

export const GET: APIRoute = async () => {
  const articles = await getArticles();
  const lastmod = articles.length
    ? `\n    <lastmod>${isoDate(new Date(Math.max(...articles.map((a) => lastModified(a).getTime()))))}</lastmod>`
    : '';
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE.url}/sitemap.xml</loc>${lastmod}
  </sitemap>
  <sitemap>
    <loc>${SITE.url}/news-sitemap.xml</loc>${lastmod}
  </sitemap>
</sitemapindex>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
