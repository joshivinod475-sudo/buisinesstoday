// Older address (the one first submitted in Google Search Console), kept working:
// serves the same sitemap index as /sitemap_index.xml.
import type { APIRoute } from 'astro';
import { sitemapIndex } from '../lib/sitemaps';

export const GET: APIRoute = () => sitemapIndex();
