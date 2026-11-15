import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORY_SLUGS } from './lib/categories';

// Any category or subcategory slug from src/data/categories.json.
const slugs = CATEGORY_SLUGS as [string, ...string[]];

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    // Google News shows up to 110 characters of a headline.
    title: z.string().max(110),
    description: z.string().max(220),
    // A date (2026-11-15) or a date and time (2026-11-15T12:30:00+05:30).
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    category: z.enum(slugs),
    author: z.string().default('Editorial Desk'),
    // Required: Google Discover and Google News need a large image on every story.
    // Use an Unsplash photo URL, or a file in public/images/ that is at least 1600px wide.
    image: z.string(),
    imageAlt: z.string().min(10),
    imageCredit: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
