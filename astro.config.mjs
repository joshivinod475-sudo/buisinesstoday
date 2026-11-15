// @ts-check
import { defineConfig } from 'astro/config';

// Sitemaps are built by src/pages/sitemap.xml.ts, news-sitemap.xml.ts and sitemap-index.xml.ts.
export default defineConfig({
  site: 'https://buisinesstoday.com',
  build: { format: 'directory' },
});
