import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE } from '../site.config';

export type Article = CollectionEntry<'articles'>;

/** All published articles, newest first. */
export async function getArticles(): Promise<Article[]> {
  const all = await getCollection('articles', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function formatDate(d: Date) {
  return d.toLocaleDateString(SITE.locale, { day: 'numeric', month: 'short', year: 'numeric' });
}

export function readingTime(body = '') {
  const words = body.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}
