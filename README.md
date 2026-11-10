# Buisiness Today

Source code for **https://buisinesstoday.com**, a fast static news site built with [Astro](https://astro.build).

## How it goes live

```
You push to GitHub (main) ──► GitHub Actions builds the site ──► finished files land on the `deploy` branch ──► Hostinger pulls `deploy` into public_html
```

You never upload files by hand.

## Publish a new article (the everyday job)

1. Create a new file in `src/content/articles/`, for example `gold-prices-explained.md`.
   The file name becomes the web address: `buisinesstoday.com/articles/gold-prices-explained/`.
   Use lowercase letters, numbers and dashes only.
2. Paste this at the top and fill it in:

   ```markdown
   ---
   title: "Your headline here"
   description: "One or two sentences that appear under the headline and in Google."
   date: 2026-11-12
   category: markets        # markets | economy | startups | tech | personal-finance
   author: "Your Name"
   # image: /images/my-photo.jpg   (optional: put the photo in public/images/)
   # imageAlt: "What the photo shows"
   # featured: true               (optional: puts it at the top of the home page)
   # draft: true                  (optional: hides it until you remove this line)
   ---

   Your article starts here. Use ## for sub-headings.
   ```
3. Save, then in a terminal in this folder:

   ```
   git add .
   git commit -m "New article: your headline"
   git push
   ```
4. Wait about 2 minutes. It's live.

## Preview on your own computer

```
npm install      # first time only
npm run dev      # then open http://localhost:4321
```

## Where to change things

| What | File |
|---|---|
| Site name, tagline, email, categories | `src/site.config.ts` |
| Colours and fonts | `src/styles/global.css` |
| Header and footer | `src/layouts/Base.astro` |
| About / Contact / legal pages | `src/pages/*.astro` |
| Server rules (HTTPS, caching) | `public/.htaccess` |
