// ─────────────────────────────────────────────────────────────
//  SITE SETTINGS — change your name, tagline, email here.
// ─────────────────────────────────────────────────────────────
export const SITE = {
  name: 'Buisinesstoday',
  tagline: 'Business news, markets, and money explained clearly.',
  // Short line shown under the logo
  strapline: 'World Business • Markets • Tech • Startups • Real Estate',
  description:
    'Buisinesstoday covers world business news, markets and finance, technology and AI, SMEs and startups, and real estate with clear, independent reporting.',
  url: 'https://buisinesstoday.com',
  email: 'contact@buisinesstoday.com',
  locale: 'en-IN',
  language: 'en',
  timeZone: 'Asia/Kolkata',
  social: {
    x: '', // e.g. 'https://x.com/yourhandle'
    linkedin: '', // e.g. 'https://www.linkedin.com/company/yourpage'
  },
};

// The default byline. Articles without an `author:` line use this.
export const DESK = {
  name: 'Editorial Desk',
  slug: 'editorial-desk',
  role: `Editorial Desk, ${SITE.name}`,
  bio: `The Editorial Desk is the in-house news team of ${SITE.name}. It reports and edits stories on business, markets, technology, startups and property, and checks every story against published sources before it goes live.`,
};

// Categories: the `slug` is used in the URL and in each article's `category:` field.
export const CATEGORIES = [
  { slug: 'world', name: 'World Business', color: '#1d4ed8', blurb: 'Global companies, trade, policy and the people who move the world economy.' },
  { slug: 'markets', name: 'Markets & Finance', color: '#0f766e', blurb: 'Stocks, interest rates, banking, investing and personal finance.' },
  { slug: 'tech', name: 'Tech & AI', color: '#7c3aed', blurb: 'Technology, artificial intelligence, payments and the digital economy.' },
  { slug: 'smes', name: 'SMEs & Startups', color: '#b45309', blurb: 'Small businesses, founders, funding rounds and growth.' },
  { slug: 'health', name: 'Health & Wellness', color: '#be123c', blurb: 'The business of health, fitness and wellbeing.' },
  { slug: 'property', name: 'Real Estate', color: '#0369a1', blurb: 'Commercial and residential property, landlords, developers and housing.' },
  { slug: 'press-releases', name: 'Press Releases', color: '#475569', blurb: 'Company announcements, published as received and clearly labelled.' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug)!;
}
