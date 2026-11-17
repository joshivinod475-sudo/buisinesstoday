import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE, DESK } from '../site.config';
import { MAIN_CATEGORIES, getCategory, topOf, childrenOf, belongsTo, type Category } from './categories';

export type Article = CollectionEntry<'articles'>;

/** All published articles, newest first. */
export async function getArticles(): Promise<Article[]> {
  const all = await getCollection('articles', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** True when the front matter gave a time of day, not just a date (a bare date is midnight UTC). */
export function hasTime(d: Date) {
  return d.getUTCHours() !== 0 || d.getUTCMinutes() !== 0;
}

/** "17 Nov 2026, 9:22 pm IST", or just "17 Nov 2026" for stories published with a date only. */
export function formatDate(d: Date) {
  const day = d.toLocaleDateString(SITE.locale, { day: 'numeric', month: 'short', year: 'numeric', timeZone: SITE.timeZone });
  if (!hasTime(d)) return day;
  const time = d.toLocaleTimeString(SITE.locale, { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: SITE.timeZone });
  return `${day}, ${time.replace(/\s?(am|pm)$/i, (m) => ' ' + m.trim().toLowerCase())} IST`;
}

/** 2026-11-15T07:00:00Z — the format Google expects in sitemaps and schema. */
export function isoDate(d: Date) {
  return d.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

export function wordCount(body = '') {
  return body.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
}

export function readingTime(body = '') {
  return `${Math.max(1, Math.round(wordCount(body) / 220))} min read`;
}

export function lastModified(a: Article) {
  return a.data.updated ?? a.data.date;
}

export function articleUrl(a: Article) {
  // The address uses the main category, so moving a story into a subcategory never changes its link.
  return `/${topOf(getCategory(a.data.category)).slug}/${a.id}/`;
}

/** Link to the author page, if the byline is the in-house desk. */
export function authorUrl(name: string) {
  return name === DESK.name ? `/author/${DESK.slug}/` : undefined;
}

/** Stories that belong on a category's page (a parent also lists its subcategories' stories). */
export function inCategory(articles: Article[], c: Category): Article[] {
  return articles.filter((a) => belongsTo(a.data.category, c));
}

export interface Section { cat: Category; children: Category[] }

/** Main categories that have at least one published story, each with its non-empty subcategories.
 *  Empty categories are left out, and appear by themselves once a story is published in them. */
export async function getSections(): Promise<Section[]> {
  const articles = await getArticles();
  return MAIN_CATEGORIES
    .filter((c) => inCategory(articles, c).length > 0)
    .map((cat) => ({ cat, children: childrenOf(cat).filter((s) => inCategory(articles, s).length > 0) }));
}

/** The main menu: the sections above, minus categories marked "menu": false. */
export async function getMenu(): Promise<Section[]> {
  return (await getSections()).filter((s) => s.cat.menu !== false);
}
