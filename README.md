# Buisinesstoday

Source code for **https://buisinesstoday.com**, a fast static news site built with [Astro](https://astro.build).

## How it goes live

```
You push to GitHub (main) ──► GitHub Actions builds the site ──► finished files land on the `deploy` branch ──► Hostinger pulls `deploy` into public_html
```

You never upload files by hand. The site also rebuilds by itself once a day, so the Google News sitemap stays fresh.

## Publish a new article (the everyday job)

1. Create a new file in `src/content/articles/`, for example `gold-prices-explained.md`.
   The file name becomes the web address: `buisinesstoday.com/articles/gold-prices-explained/`.
   Use lowercase letters, numbers and dashes only.
2. Paste this at the top and fill it in:

   ```markdown
   ---
   title: "Your headline here"            # 110 characters at most
   description: "One or two sentences that appear under the headline and in Google."
   date: 2026-11-15T09:30:00+05:30        # date and time of publishing (India time)
   category: markets        # world | markets | tech | smes | health | property | press-releases
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
| Sitemap index (submit this one in Search Console) | `/sitemap-index.xml` |
| All pages, with last-changed dates and images | `/sitemap.xml` |
| Google News sitemap (stories from the last 2 days) | `/news-sitemap.xml` |
| RSS feed | `/rss.xml` |
| Crawler rules | `/robots.txt` |

## Where to change things

| What | File |
|---|---|
| Site name, tagline, email, categories | `src/site.config.ts` |
| Colours and fonts | `src/styles/global.css` |
| Header, footer, SEO tags | `src/layouts/Base.astro` |
| Home page | `src/pages/index.astro` |
| Article page | `src/pages/articles/[slug].astro` |
| About / Contact / Editorial standards / legal pages | `src/pages/*.astro` |
| Structured data (schema) | `src/lib/schema.ts` |
| Image sizes | `src/lib/images.ts` and `scripts/make-images.mjs` |
| Server rules (HTTPS, caching, redirects) | `public/.htaccess` |
