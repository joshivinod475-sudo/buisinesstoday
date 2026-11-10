import rss from '@astrojs/rss';
import { SITE } from '../site.config';
import { getArticles } from '../lib/articles';

export async function GET(context) {
  const articles = await getArticles();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site,
    items: articles.slice(0, 50).map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.date,
      link: `/articles/${a.id}/`,
      categories: [a.data.category],
    })),
  });
}
