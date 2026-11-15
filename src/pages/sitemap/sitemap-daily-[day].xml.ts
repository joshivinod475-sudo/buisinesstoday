// One sitemap per publishing day: /sitemap/sitemap-daily-2026-11-15.xml
// Holds every article published that day (India time), with its last-updated time and main image.
// A file is only created for days that have at least one published article.
import type { APIRoute } from 'astro';
import { sitemapArticles, byDay, articleEntry, urlset, xmlResponse } from '../../lib/sitemaps';

export async function getStaticPaths() {
  return byDay(await sitemapArticles()).map(([day, articles]) => ({ params: { day }, props: { articles } }));
}

export const GET: APIRoute = ({ props }) => xmlResponse(urlset(props.articles.map(articleEntry)));
