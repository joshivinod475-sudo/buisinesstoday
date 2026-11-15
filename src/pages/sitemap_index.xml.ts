// The sitemap index: the one address to submit in Google Search Console.
// See src/lib/sitemaps.ts for how every sitemap file is built.
import type { APIRoute } from 'astro';
import { sitemapIndex } from '../lib/sitemaps';

export const GET: APIRoute = () => sitemapIndex();
