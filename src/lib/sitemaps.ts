// The sitemap system. Everything is worked out from the articles and
// src/data/categories.json on every build, so nothing here is hardcoded.
//
//   /sitemap_index.xml                      lists every file below
//   /news-sitemap.xml                       Google News: stories from the last 48 hours
//   /sitemap/sitemap-daily-YYYY-MM-DD.xml   one file per publishing day (India time)
//   /sitemap/sitemap-categories.xml         category and subcategory pages that have stories
//   /sitemap/sitemap-pages.xml              home page, about/contact/legal pages, author pages
//
// /sitemap.xml and /sitemap-index.xml are older addresses and serve the same index.
import { SITE, DESK } from '../site.config';
import { CATEGORIES, categoryUrl } from './categories';
import { getArticles, lastModified, articleUrl, inCategory, type Article } from './articles';
import { abs, img } from './images';

export const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function xmlResponse(body: string) {
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}

// ── Dates ────────────────────────────────────────────────────────────────
// Times are written in the site's own timezone: 2026-11-15T16:31:00+05:30.

function localParts(d: Date) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: SITE.timeZone, hourCycle: 'h23',
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit',
  }).formatToParts(d);
  const get = (type: string) => parts.find((p) => p.type === type)!.value;
  return { y: get('year'), mo: get('month'), d: get('day'), h: get('hour'), mi: get('minute'), s: get('second') };
}

/** An article dated with a day only (`date: 2026-11-12`, no time) is read as midnight UTC. */
function isDateOnly(d: Date) {
  return d.getUTCHours() === 0 && d.getUTCMinutes() === 0 && d.getUTCSeconds() === 0 && d.getUTCMilliseconds() === 0;
}

/** Full ISO 8601 time with timezone. A day-only date stays a day (2026-11-12): we do not invent a time for it. */
export function stamp(d: Date): string {
  if (isDateOnly(d)) return d.toISOString().slice(0, 10);
  const p = localParts(d);
  const asUtc = Date.UTC(+p.y, +p.mo - 1, +p.d, +p.h, +p.mi, +p.s);
  const offset = Math.round((asUtc - Math.floor(d.getTime() / 1000) * 1000) / 60000);
  const sign = offset < 0 ? '-' : '+';
  const pad = (n: number) => String(Math.floor(n)).padStart(2, '0');
  return `${p.y}-${p.mo}-${p.d}T${p.h}:${p.mi}:${p.s}${sign}${pad(Math.abs(offset) / 60)}:${pad(Math.abs(offset) % 60)}`;
}

/** The publishing day (YYYY-MM-DD) an article belongs to, in the site's timezone. */
export function dayOf(a: Article): string {
  const d = a.data.date;
  if (isDateOnly(d)) return d.toISOString().slice(0, 10);
  const p = localParts(d);
  return `${p.y}-${p.mo}-${p.d}`;
}

function newest(list: Article[]): string | undefined {
  if (!list.length) return undefined;
  return stamp(list.map(lastModified).reduce((a, b) => (b.getTime() > a.getTime() ? b : a)));
}

// ── What goes in each file ───────────────────────────────────────────────

export interface Entry { loc: string; lastmod?: string; image?: string }

/** Published articles only: no drafts (getArticles drops them) and nothing dated in the future. */
export async function sitemapArticles(): Promise<Article[]> {
  const now = Date.now();
  return (await getArticles()).filter((a) => a.data.date.getTime() <= now);
}

/** Articles grouped by publishing day, newest day first. Each article is in exactly one day. */
export function byDay(articles: Article[]): [string, Article[]][] {
  const days = new Map<string, Article[]>();
  for (const a of articles) days.set(dayOf(a), [...(days.get(dayOf(a)) ?? []), a]);
  return [...days.entries()].sort((a, b) => b[0].localeCompare(a[0]));
}

export function articleEntry(a: Article): Entry {
  return { loc: articleUrl(a), lastmod: stamp(lastModified(a)), image: abs(img(a.data.image, 1600, 900)) };
}

/** Category and subcategory pages with at least one story. /category/all/ is never listed. */
export function categoryEntries(articles: Article[]): Entry[] {
  return CATEGORIES
    .map((c) => ({ loc: categoryUrl(c), lastmod: newest(inCategory(articles, c)) }))
    .filter((e) => e.lastmod);
}

// About, contact and the legal pages are found automatically: any .astro file placed
// directly in src/pages/ is listed, except the home page and the "not found" page.
const STATIC_PAGES = Object.keys(import.meta.glob('../pages/*.astro'))
  .map((f) => f.replace('../pages/', '').replace('.astro', ''))
  .filter((name) => name !== 'index' && name !== '404')
  .sort()
  .map((name) => `/${name}/`);

/** Home page, plain pages and author pages. Plain pages carry no lastmod: it would only be a guess. */
export function pageEntries(articles: Article[]): Entry[] {
  const desk = articles.filter((a) => a.data.author === DESK.name);
  return [
    { loc: '/', lastmod: newest(articles) },
    ...STATIC_PAGES.map((loc) => ({ loc })),
    ...(desk.length ? [{ loc: `/author/${DESK.slug}/`, lastmod: newest(desk) }] : []),
  ];
}

const TWO_DAYS = 48 * 60 * 60 * 1000;

/** Google News: stories published in the last 48 hours, newest first, 1,000 at most. */
export function newsArticles(articles: Article[]): Article[] {
  const now = Date.now();
  return articles
    .filter((a) => a.data.category !== 'press-releases') // press releases are not news reporting
    .filter((a) => now - a.data.date.getTime() <= TWO_DAYS)
    .slice(0, 1000);
}

// ── XML ──────────────────────────────────────────────────────────────────

export function urlset(entries: Entry[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.map((e) => `  <url>
    <loc>${esc(SITE.url + e.loc)}</loc>${e.lastmod ? `
    <lastmod>${e.lastmod}</lastmod>` : ''}${e.image ? `
    <image:image>
      <image:loc>${esc(e.image)}</image:loc>
    </image:image>` : ''}
  </url>`).join('\n')}
</urlset>
`;
}

const latest = (entries: Entry[]) =>
  entries.map((e) => e.lastmod).filter(Boolean).sort((a, b) => new Date(b!).getTime() - new Date(a!).getTime())[0];

/** The sitemap index: daily files newest first, then categories, pages and the news sitemap.
 *  Each entry's lastmod is the newest lastmod inside that file. */
export async function sitemapIndex(): Promise<Response> {
  const articles = await sitemapArticles();
  const files: Entry[] = [
    ...byDay(articles).map(([day, list]) => ({ loc: `/sitemap/sitemap-daily-${day}.xml`, lastmod: newest(list) })),
    { loc: '/sitemap/sitemap-categories.xml', lastmod: latest(categoryEntries(articles)) },
    { loc: '/sitemap/sitemap-pages.xml', lastmod: latest(pageEntries(articles)) },
    { loc: '/news-sitemap.xml', lastmod: newest(newsArticles(articles)) },
  ];
  return xmlResponse(`<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${files.map((f) => `  <sitemap>
    <loc>${esc(SITE.url + f.loc)}</loc>${f.lastmod ? `
    <lastmod>${f.lastmod}</lastmod>` : ''}
  </sitemap>`).join('\n')}
</sitemapindex>
`);
}
