import rss from '@astrojs/rss';
import { SITE } from '../site.config';
import { getCategory } from '../lib/categories';
import { getArticles, articleUrl } from '../lib/articles';
import { abs, img } from '../lib/images';

export async function GET(context) {
  const articles = await getArticles();
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site,
    xmlns: { media: 'http://search.yahoo.com/mrss/' },
    customData: `<language>${SITE.language}</language>`,
    items: articles.slice(0, 50).map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.date,
      link: articleUrl(a),
      author: a.data.author,
      categories: [getCategory(a.data.category).name, ...a.data.tags],
      customData: `<media:content url="${abs(img(a.data.image, 1200, 675)).replace(/&/g, '&amp;')}" medium="image" width="1200" height="675" />`,
    })),
  });
}
