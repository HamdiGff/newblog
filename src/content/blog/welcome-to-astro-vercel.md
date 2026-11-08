---
title: "Welcome to the Astro Vercel Theme"
description: "A sleek, minimalist developer blog inspired by Vercel's hallmark monochrome design language, built with Astro and Tailwind CSS."
pubDate: 2026-11-01
tags: ["Astro", "Vercel", "Design", "OpenSource"]
featured: true
draft: false
---

Welcome to your new developer blog! This template is engineered to pair the raw speed of **Astro** with the clean, high-contrast aesthetic made famous by **Vercel**.

## Why this theme?

Building modern websites often comes with accidental bloat. Heavy frameworks, megabytes of client JavaScript, and complex build steps often get in the way of simply writing good content.

This theme takes the opposite approach:

- **Zero Client JS by Default**: Clean static HTML shipped to the edge.
- **Vercel Aesthetics**: Crisp borders, subtle dark mode, Geist typography, and high contrast readability.
- **Type-safe Content Collections**: Powered by Astro's Content Layer and Zod schemas.
- **100/100 Lighthouse Performance**: Optimal Core Web Vitals out of the box.

```typescript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://your-domain.vercel.app',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  }
});
```

## Instant One-Click Deployment to Vercel

Because this blog outputs pure static HTML, deploying to Vercel takes seconds:

1. Push this project to your GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and select your repo.
3. Vercel automatically detects the Astro build presets (`dist` and `npm run build`).
4. Click **Deploy**!

> "Simplicity is the prerequisite for reliability." — Edsger W. Dijkstra

Feel free to customize the colors, update the author profile in `src/utils/seo.ts`, and begin adding your Markdown and MDX posts in `src/content/blog/`.
