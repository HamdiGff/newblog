import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    game: z.string().default('Roblox'),
    category: z.string().default('Scripts'),
    status: z.enum(['Undetected', 'Working', 'Updated', 'Testing', 'Free']).default('Undetected'),
    version: z.string().default('v1.0'),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    thumbnail: z.string().optional(),
    downloadUrl: z.string().optional(),
    scriptCode: z.string().optional(),
    views: z.number().default(1200),
    downloads: z.number().default(450),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),

    // Optional compatibility fields (safely ignored if absent)
    author: z.string().default('Admin'),
    virusScanScore: z.string().default('0/68 Clean'),
    virusTotalUrl: z.string().optional(),
    antiCheat: z.string().optional(),
    fileSize: z.string().default('12.4 MB'),
    mirrorUrl: z.string().optional(),
    archivePassword: z.string().optional(),
    platforms: z.array(z.string()).default([]),
    executors: z.array(z.string()).default([]),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    ogImage: z.string().optional(),
    canonicalUrl: z.string().optional(),
    noIndex: z.boolean().default(false),
  }),
});

export const collections = { blog };
