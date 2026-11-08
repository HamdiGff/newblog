---
title: "Type-Safe Content Collections with Astro Content Layer"
description: "Mastering Astro's Content Layer to validate frontmatter, author MDX components, and generate structured schemas."
pubDate: 2026-11-08
tags: ["Astro", "TypeScript", "Markdown", "DX"]
featured: false
draft: false
---

Managing Markdown files in a growing blog often leads to broken links, missing dates, and typo-ridden frontmatter attributes. Astro solves this problem systematically through **Content Collections**.

## What is the Content Layer?

Astro's Content Layer treats your local markdown, MDX, or remote CMS data as a strictly typed database.

```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
```

## Why Zod Validation Matters

If you forget to provide a publication date or mistakenly enter an invalid date format, the Astro compiler immediately flags the exact file and line number during build:

```bash
[content] "pubDate" must be a valid date in "src/content/blog/my-post.md"
```

This guarantees that runtime errors will never reach your production visitors on Vercel.

## Querying Posts Anywhere

In any Astro component, querying your blog posts is as simple as calling `getCollection`:

```astro
---
import { getCollection } from 'astro:content';

const posts = await getCollection('blog', ({ data }) => !data.draft);
posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
---

<ul>
  {posts.map(post => (
    <li>
      <a href={`/blog/${post.id}`}>{post.data.title}</a>
    </li>
  ))}
</ul>
```

With TypeScript autocompletion on every frontmatter field, building custom layouts becomes an absolute pleasure.
