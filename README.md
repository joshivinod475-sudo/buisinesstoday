# Buisinesstoday

Source code for **https://buisinesstoday.com**, a fast static news site built with [Astro](https://astro.build).

## How it goes live

```
You push to GitHub (main) ──► GitHub Actions builds the site ──► finished files land on the `deploy` branch ──► Hostinger pulls `deploy` into public_html
```

You never upload files by hand. The site also rebuilds by itself once a day, so the Google News sitemap stays fresh.

## Publish a new article (the everyday job)

1. Create a new file in `src/content/articles/`, for example `gold-prices-explained.md`.
   The file name becomes the web address: `buisinesstoday.com/markets/gold-prices-explained/` (the main category, then the file name).
   Use lowercase letters, numbers and dashes only.
2. Paste this at the top and fill it in:

   ```markdown
   ---
   title: "Your headline here"            # 110 characters at most
   description: "One or two sentences that appear under the headline and in Google."
   date: 2026-11-15T09:30:00+05:30        # date and time of publishing (India time)
   category: markets        # any category or subcategory slug from src/data/categories.json, e.g. markets, crypto, tech, healthcare
   image: /images/my-photo.jpg            # REQUIRED. See "Images" below
   imageAlt: "What the photo shows"       # REQUIRED
   imageCredit: "Photo: Name / Source"    # optional caption under the main photo
   tags: ["Gold", "Commodities"]          # optional topics
   # author: "Your Name"                  (optional: default is Editorial Desk)
   # updated: 2026-11-16T10:00:00+05:30   (optional: add when you change a published story)
   # draft: true                          (optional: hides it until you remove this line)
   ---

   Your article starts here. Use ## for sub-headings.
   ```
3. Save, then in a terminal in this folder:

   ```
   git add .
   git commit -m "New article: your headline"
   git push
   ```
4. Wait about 2 minutes. It's live, and it is added to the sitemaps, the RSS feed and the home page automatically.

## Images (important for Google Discover and Google News)

Every article must have a main image. The build fails without one.

- **Size:** at least **1600 pixels wide**, landscape. Google Discover ignores images narrower than 1200 pixels.
- **Where:** put the file in `public/images/` and write `image: /images/file-name.jpg`,
  or use an Unsplash photo address (`https://images.unsplash.com/photo-...`).
- **Name:** describe the picture in the file name, with dashes: `mumbai-stock-exchange-building.jpg`.
- **Rights:** only use photos you are allowed to publish (your own, Unsplash, Wikimedia Commons, etc.) and credit them in `imageCredit` when the licence asks for it.

The site crops each image into the shapes Google asks for (16:9, 4:3 and 1:1) by itself.

## Preview on your own computer

```
npm install      # first time only
npm run dev      # then open http://localhost:4321
```

## What search engines get

| What | Address |
|---|---|
| Sitemap index (submit this one in Search Console) | `/sitemap_index.xml` |
| Google News sitemap (stories from the last 48 hours) | `/news-sitemap.xml` |
| One sitemap per publishing day, with last-updated times and images | `/sitemap/sitemap-daily-YYYY-MM-DD.xml` |
| Category and subcategory pages that have stories | `/sitemap/sitemap-categories.xml` |
| Home page, about/contact/legal pages, author pages | `/sitemap/sitemap-pages.xml` |
| Older addresses, still working (same content as the index) | `/sitemap.xml`, `/sitemap-index.xml` |
| RSS feed | `/rss.xml` |
| Crawler rules | `/robots.txt` |

## Categories

All categories and subcategories are kept in one file: `src/data/categories.json`.
The menu, mobile menu, dropdowns, category pages, breadcrumbs, article badges and sitemap all read from it.

- **Add a category:** add a block with `name`, `slug`, `order`, `color`, `seoTitle`, `metaDescription` and `intro`.
- **Add a subcategory:** the same, plus `"parent": "<main category slug>"`. It appears at `/category/<parent>/<slug>/`.
- **Hide from the main menu but keep the page:** add `"menu": false` (used for Press Releases).
- A category with no published stories is left out of the menu and sitemap, and appears by itself once a story is published in it.
- A story filed under a subcategory also appears on the parent category's page. Its address always uses the main category.
- Do not change the `slug` of a category that already has stories without adding a redirect in `public/.htaccess`.

## Where to change things

| What | File |
|---|---|
| Site name, tagline, email, stories per page | `src/site.config.ts` |
| Categories and subcategories (names, order, SEO text) | `src/data/categories.json` |
| Category pages and pagination | `src/pages/category/[...path].astro` |
| Colours and fonts | `src/styles/global.css` |
| Header, footer, SEO tags | `src/layouts/Base.astro` |
| Home page | `src/pages/index.astro` |
| Article page | `src/pages/[category]/[slug].astro` |
| About / Contact / Editorial standards / legal pages | `src/pages/*.astro` |
| Structured data (schema) | `src/lib/schema.ts` |
| Sitemaps | `src/lib/sitemaps.ts` and `src/pages/sitemap*`, `src/pages/sitemap/` |
| Image sizes | `src/lib/images.ts` and `scripts/make-images.mjs` |
| Server rules (HTTPS, caching, redirects) | `public/.htaccess` |
