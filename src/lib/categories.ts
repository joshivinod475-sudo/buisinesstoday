// Everything about categories is read from ONE file: src/data/categories.json.
// The menu, mobile menu, dropdowns, category pages, breadcrumbs, article badges,
// sitemap and redirects all use the helpers below, so a category only ever
// needs to be added or edited in that one file.
import data from '../data/categories.json';
import { SITE } from '../site.config';

export interface Category {
  name: string;
  slug: string;
  /** Slug of the parent category. Only subcategories have this. */
  parent?: string;
  /** Position in the menu (main categories) or in the dropdown (subcategories). */
  order: number;
  /** Accent colour. Subcategories use their parent's colour. */
  color?: string;
  /** Set to false to keep a category and its page but leave it out of the main menu. */
  menu?: boolean;
  seoTitle: string;
  metaDescription: string;
  intro: string;
}

const byOrder = (a: Category, b: Category) => a.order - b.order;
const raw = data as Category[];
// Main categories in menu order, each followed by its subcategories in dropdown order.
export const CATEGORIES: Category[] = raw
  .filter((c) => !c.parent)
  .sort(byOrder)
  .flatMap((main) => [main, ...raw.filter((c) => c.parent === main.slug).sort(byOrder)]);
if (CATEGORIES.length !== raw.length) throw new Error('categories.json: a subcategory points to a parent that does not exist');

// Catch mistakes in categories.json at build time, before they reach the live site.
const seen = new Set<string>();
for (const c of CATEGORIES) {
  if (seen.has(c.slug)) throw new Error(`categories.json: the slug "${c.slug}" is used twice`);
  seen.add(c.slug);
}
for (const c of CATEGORIES) {
  if (!c.parent) continue;
  const parent = CATEGORIES.find((p) => p.slug === c.parent);
  if (!parent) throw new Error(`categories.json: "${c.slug}" has an unknown parent "${c.parent}"`);
  if (parent.parent) throw new Error(`categories.json: "${c.slug}" cannot sit under another subcategory`);
}

/** Top-level categories, in menu order. */
export const MAIN_CATEGORIES = CATEGORIES.filter((c) => !c.parent);
export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug);

export function getCategory(slug: string): Category {
  const c = CATEGORIES.find((x) => x.slug === slug);
  if (!c) throw new Error(`Unknown category "${slug}". Add it to src/data/categories.json.`);
  return c;
}

/** The main category a category belongs to (itself, if it is a main category). */
export function topOf(c: Category): Category {
  return c.parent ? getCategory(c.parent) : c;
}

export function childrenOf(c: Category): Category[] {
  return CATEGORIES.filter((x) => x.parent === c.slug);
}

export function colorOf(c: Category): string {
  return c.color ?? topOf(c).color ?? '#0b2545';
}

/** /category/tech/ for a main category, /category/tech/cybersecurity/ for a subcategory. */
export function categoryUrl(c: Category): string {
  return c.parent ? `/category/${c.parent}/${c.slug}/` : `/category/${c.slug}/`;
}

/** True if an article filed under `articleCategory` belongs on the page of category `c`.
 *  An article in a subcategory also appears on its parent's page. */
export function belongsTo(articleCategory: string, c: Category): boolean {
  return articleCategory === c.slug || getCategory(articleCategory).parent === c.slug;
}

/** The "All News" listing at /category/all/. It is not a real category, so it is not in categories.json. */
export const ALL_NEWS: Category = {
  name: 'All News', slug: 'all', order: 0, color: '#0b2545',
  seoTitle: `All Business News | ${SITE.name}`,
  metaDescription: `Every story from ${SITE.name}, newest first: world business, markets and finance, technology, startups, real estate and healthcare.`,
  intro: `Every story from ${SITE.name}, newest first.`,
};
