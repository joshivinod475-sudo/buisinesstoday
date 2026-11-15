import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE, DESK } from '../site.config';

export type Article = CollectionEntry<'articles'>;

/** All published articles, newest first. */
export async function getArticles(): Promise<Article[]> {
  const all = await getCollection('articles', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function formatDate(d: Date) {
  return d.toLocaleDateString(SITE.locale, { day: 'numeric', month: 'short', year: 'numeric', timeZone: SITE.timeZone });
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
  return `/articles/${a.id}/`;
}

/** Link to the author page, if the byline is the in-house desk. */
export function authorUrl(name: string) {
  return name === DESK.name ? `/author/${DESK.slug}/` : undefined;
}
