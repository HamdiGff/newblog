# Astro Vercel Blog Theme 🚀▲

A high-performance, minimalist developer blog and portfolio inspired by **Vercel's hallmark monochrome design language**. Built with **Astro 5**, **Tailwind CSS v4**, **TypeScript**, and **Astro Content Layer**.

![Deploy with Vercel](https://vercel.com/button)

---

## ✨ Features

- **▲ Vercel Design Language**: Clean monochrome palette, crisp borders, Geist typography, and subtle dark mode.
- **⚡ 100/100 Core Web Vitals**: Zero client-side JavaScript by default; pre-rendered static HTML distributed globally via Vercel Edge.
- **🌗 Instant Zero-Flash Dark Mode**: Inline header evaluation prevents layout flicker and respects user preferences.
- **📝 Type-Safe Content Collections**: Strict Zod schemas for Markdown & MDX articles with compile-time validation.
- **🔍 Instant Live Search**: Filter articles and tags in real time using client-side keyboard navigation (`/`).
- **🏷️ Tags & Topic Archives**: Automatic tag aggregation with post counters and dedicated filter pages.
- **⏱️ Accurate Reading Time**: Word count and reading duration calculator for every post.
- **📑 Dynamic Table of Contents**: Automatically parsed from heading tags for long-form technical articles.
- **📡 Auto-Generated RSS 2.0 & Sitemap**: Built-in `@astrojs/rss` and `@astrojs/sitemap` feeds.
- **🛡️ Production-Ready Vercel Config**: `vercel.json` with security headers, clean URLs, and immutable asset caching.

---

## 📁 Project Structure

```text
astro-vercel-blog/
├── astro.config.mjs          # Astro integrations (Tailwind v4, MDX, Sitemap, Shiki)
├── vercel.json               # Vercel deployment headers & routing
├── package.json              # Project scripts & dependencies
├── public/
│   ├── favicon.svg           # Vercel triangle monogram icon
│   └── robots.txt            # Search engine crawler rules & sitemap declaration
└── src/
    ├── content.config.ts     # Content layer schema definition (Zod)
    ├── content/
    │   └── blog/             # Markdown (.md) and MDX (.mdx) articles
    ├── styles/
    │   └── global.css        # Tailwind v4, Geist fonts, prose styles, dark mode
    ├── components/
    │   ├── Header.astro      # Navigation, logo, theme toggle
    │   ├── Footer.astro      # Minimalist footer with RSS & Vercel links
    │   ├── BlogPostCard.astro# Post preview card with tags and reading time
    │   ├── SearchBar.astro   # Fast DOM-based live search
    │   ├── TableOfContents.astro # Headings index for articles
    │   ├── TagBadge.astro    # Pill badge for topics
    │   ├── ThemeToggle.astro # Light/Dark mode switcher
    │   └── SocialShare.astro # Share to X / LinkedIn / Copy link
    ├── layouts/
    │   ├── BaseLayout.astro  # Root HTML, SEO tags, OpenGraph, theme script
    │   └── BlogPostLayout.astro # Article layout with TOC & post navigation
    ├── pages/
    │   ├── index.astro       # Landing page (hero, featured, highlights)
    │   ├── blog/             # Blog archive & dynamic [slug] article pages
    │   ├── tags/             # All tags overview & [tag] archive pages
    │   ├── about.astro       # Developer bio, experience, skills
    │   ├── rss.xml.ts        # Automated RSS feed endpoint
    │   └── 404.astro         # Custom 404 error page
    └── utils/
        ├── readingTime.ts    # Reading time calculation utility
        └── seo.ts            # Site constants (title, author, URLs)
```

---

## 🛠️ Getting Started

### 1. Installation
Run npm inside the project directory:

```bash
npm install
```

### 2. Local Development
Start the local development server:

```bash
npm run dev
```

Visit `http://localhost:4321` in your browser.

### 3. Production Build
Verify static compilation:

```bash
npm run build
npm run preview
```

---

## ✍️ Adding New Articles

Create a new `.md` or `.mdx` file in `src/content/blog/`:

```markdown
---
title: "My New Article"
description: "A short, engaging description for SEO and cards."
pubDate: 2026-11-09
tags: ["Astro", "WebDev", "Vercel"]
featured: true
draft: false
---

# Your Heading Here

Write your content with standard Markdown or MDX components...
```

---

## ⚙️ Customization

1. **Site Settings & Metadata**: Edit `src/utils/seo.ts` to customize your site title, author name, Twitter handle, and GitHub URL.
2. **About Page**: Update `src/pages/about.astro` with your bio, career experience, and skills.
3. **Styling & Fonts**: Edit `src/styles/global.css` to tweak colors or border radii.

---

## 🚀 Deploying to Vercel

### Option A: Via GitHub (Recommended)
1. Initialize git and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Astro Vercel Blog"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```
2. Navigate to [vercel.com/new](https://vercel.com/new).
3. Import your GitHub repository.
4. Vercel will automatically detect **Astro** with:
   - **Framework Preset**: `Astro`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**.

### Option B: Via Vercel CLI
If you have the Vercel CLI installed:
```bash
npx vercel
```
For production deployments:
```bash
npx vercel --prod
```

---

## 📄 License
MIT
