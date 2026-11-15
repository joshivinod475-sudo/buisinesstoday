// Category and subcategory pages that have at least one published story.
// Read from src/data/categories.json. /category/all/ is never listed.
import type { APIRoute } from 'astro';
import { sitemapArticles, categoryEntries, urlset, xmlResponse } from '../../lib/sitemaps';

export const GET: APIRoute = async () => xmlResponse(urlset(categoryEntries(await sitemapArticles())));
