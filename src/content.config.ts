import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const calendarDate = z.string().regex(/^\d{4}[/-]\d{2}[/-]\d{2}$/)
  .transform((value) => value.replaceAll('/', '-'))
  .refine((value) => {
    const date = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
  }, 'Use a valid calendar date (YYYY/MM/DD or YYYY-MM-DD)');

const posts = defineCollection({
  loader: glob({
    pattern: '**/*.zh_TW.md',
    base: './src/content/posts',
    generateId: ({ entry }) => entry.replace(/\.zh_TW\.md$/, ''),
  }),
  schema: z.object({
    title: z.string().min(1),
    createdAt: calendarDate,
    description: z.string().optional(),
    thumbnail: z.string().optional(),
  }),
});

export const collections = { posts };
