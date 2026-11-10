// ─────────────────────────────────────────────────────────────
//  SITE SETTINGS — change your name, tagline, email here.
// ─────────────────────────────────────────────────────────────
export const SITE = {
  name: 'Buisiness Today',
  tagline: 'Business, markets and money — explained clearly.',
  description:
    'Buisiness Today covers markets, the economy, startups, technology and personal finance with clear, independent explainers.',
  url: 'https://buisinesstoday.com',
  email: 'contact@buisinesstoday.com',
  locale: 'en-IN',
  social: {
    x: '', // e.g. 'https://x.com/yourhandle'
    linkedin: '', // e.g. 'https://www.linkedin.com/company/yourpage'
  },
};

// Categories: the `slug` is used in the URL and in each article's `category:` field.
export const CATEGORIES = [
  { slug: 'markets', name: 'Markets', color: '#0f766e' },
  { slug: 'economy', name: 'Economy', color: '#1d4ed8' },
  { slug: 'startups', name: 'Startups', color: '#b45309' },
  { slug: 'tech', name: 'Tech', color: '#7c3aed' },
  { slug: 'personal-finance', name: 'Personal Finance', color: '#be123c' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug)!;
}
