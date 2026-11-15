// Structured data (schema.org) shared across pages.
import { SITE, DESK } from '../site.config';
import { MAIN_CATEGORIES } from './categories';

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;

export function organization() {
  return {
    '@type': 'NewsMediaOrganization',
    '@id': ORG_ID,
    name: SITE.name,
    url: `${SITE.url}/`,
    email: SITE.email,
    description: SITE.description,
    logo: { '@type': 'ImageObject', url: `${SITE.url}/logo-512.png`, width: 512, height: 512 },
    image: `${SITE.url}/og-default.jpg`,
    contactPoint: [{
      '@type': 'ContactPoint', contactType: 'editorial', email: SITE.email,
      url: `${SITE.url}/contact/`, availableLanguage: 'English',
    }],
    knowsAbout: MAIN_CATEGORIES.filter((c) => c.menu !== false).map((c) => c.name),
    publishingPrinciples: `${SITE.url}/editorial-standards/`,
    ethicsPolicy: `${SITE.url}/editorial-standards/`,
    correctionsPolicy: `${SITE.url}/editorial-standards/#corrections`,
    actionableFeedbackPolicy: `${SITE.url}/editorial-standards/#feedback`,
    ...(Object.values(SITE.social).filter(Boolean).length ? { sameAs: Object.values(SITE.social).filter(Boolean) } : {}),
  };
}

export function website() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: SITE.name,
    alternateName: [SITE.url.replace('https://', '')],
    url: `${SITE.url}/`,
    description: SITE.description,
    inLanguage: SITE.language,
    publisher: { '@id': ORG_ID },
  };
}

/** A listing page (home, category, author) with its stories. */
export function collectionPage(opts: { url: string; name: string; description: string; items: { url: string; name: string }[] }) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      website(),
      organization(),
      {
        '@type': 'CollectionPage',
        '@id': `${opts.url}#webpage`,
        url: opts.url,
        name: opts.name,
        description: opts.description,
        inLanguage: SITE.language,
        isPartOf: { '@id': SITE_ID },
        publisher: { '@id': ORG_ID },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: opts.items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, url: it.url, name: it.name })),
        },
      },
    ],
  };
}

export function breadcrumbs(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
  };
}

export function author(name: string) {
  if (name === DESK.name) {
    const url = `${SITE.url}/author/${DESK.slug}/`;
    return { '@type': 'Organization', '@id': `${url}#author`, name, url };
  }
  return { '@type': 'Person', name };
}

export const IDS = { ORG_ID, SITE_ID };
