// ─────────────────────────────────────────────────────────────
//  SITE SETTINGS — change your name, tagline, email here.
// ─────────────────────────────────────────────────────────────
export const SITE = {
  name: 'Buisinesstoday',
  tagline: 'Business news, markets, and money explained clearly.',
  // Short line shown under the logo
  strapline: 'World Business • Economy • Markets • Tech • Startups • Real Estate',
  description:
    'Buisinesstoday covers world business news, the economy, markets and finance, technology and AI, SMEs and startups, and real estate with clear, independent reporting.',
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

// Categories live in ONE file: src/data/categories.json (helpers in src/lib/categories.ts).

// How many stories a category page shows before it continues on /page/2/.
export const PAGE_SIZE = 12;
