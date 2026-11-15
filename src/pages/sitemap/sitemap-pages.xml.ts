// Home page, about / contact / legal pages, and author pages.
import type { APIRoute } from 'astro';
import { sitemapArticles, pageEntries, urlset, xmlResponse } from '../../lib/sitemaps';

export const GET: APIRoute = async () => xmlResponse(urlset(pageEntries(await sitemapArticles())));
