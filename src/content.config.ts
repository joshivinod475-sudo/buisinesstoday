import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORIES } from './site.config';

const slugs = CATEGORIES.map((c) => c.slug) as [string, ...string[]];

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string().max(120),
    description: z.string().max(220),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    category: z.enum(slugs),
    author: z.string().default('Editorial Desk'),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
