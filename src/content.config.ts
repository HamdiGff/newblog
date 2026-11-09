import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    game: z.string().default('General'),
    category: z.string().default('Cheats'),
    status: z.enum(['Undetected', 'Working', 'Updated', 'Testing', 'Free']).default('Undetected'),
    version: z.string().default('v1.0'),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    thumbnail: z.string().optional(),
    downloadUrl: z.string().optional(),
    mirrorUrl: z.string().optional(),
    scriptCode: z.string().optional(),
    views: z.number().default(1250),
    downloads: z.number().default(420),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),

    // Advanced WordPress & Cheater.fun Features
    author: z.string().default('CheaterFun Team'),
    virusScanScore: z.string().default('0/68 Clean'),
    virusTotalUrl: z.string().optional(),
    antiCheat: z.string().optional(),
    fileSize: z.string().default('12.4 MB'),
    archivePassword: z.string().optional(),
    platforms: z.array(z.string()).default(['Windows 10', 'Windows 11']),
    executors: z.array(z.string()).default([]),

    // SEO Overrides
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    ogImage: z.string().optional(),
    canonicalUrl: z.string().optional(),
    noIndex: z.boolean().default(false),
  }),
});

export const collections = { blog };
