# Admin Panel & CMS Setup Guide

## Overview

Your site uses **[Keystatic CMS](https://keystatic.com/)** — a git-based headless CMS with a beautiful, fully-featured admin UI accessible at `/keystatic`. It is the closest open-source equivalent to WordPress's admin panel.

### What You Can Do in the Admin Panel

| Feature | Description |
|---|---|
| ✍️ **Create Posts** | Write new cheat/script posts with a rich Markdown editor |
| ✏️ **Edit Posts** | Update any existing post's content, metadata, status |
| 🗑️ **Delete Posts** | Remove a post permanently from the repo |
| 🏷️ **Tags & Categories** | Manage game tags and category definitions |
| 🔍 **SEO Per Post** | Custom title, meta description, og:image, noindex toggle |
| ⚙️ **Site Settings** | Site name, tagline, Google Analytics ID, default og:image |
| 🔗 **Social Links** | Update Discord, Telegram, Twitter, YouTube URLs & member counts |
| 📊 **Post Metadata** | Views count, downloads count, version, status, download URL |
| 🧑‍💻 **Script Code** | Paste Lua scripts shown in the one-click copy box |

---

## Step 1: Create a GitHub OAuth App

1. Go to [github.com/settings/developers](https://github.com/settings/developers)
2. Click **"New OAuth App"**
3. Fill in the form:
   - **Application Name**: `CHEATER.FUN Admin`
   - **Homepage URL**: `https://newblog.vercel.app`
   - **Authorization callback URL**: `https://newblog.vercel.app/api/keystatic/github/oauth/callback`
4. Click **Register Application**
5. Note your **Client ID**
6. Click **Generate a new client secret** and note the **Client Secret**

---

## Step 2: Add Environment Variables on Vercel

Go to your [Vercel project dashboard](https://vercel.com/dashboard) → **Settings** → **Environment Variables**

Add these 4 variables:

| Variable Name | Value | Visibility |
|---|---|---|
| `KEYSTATIC_GITHUB_CLIENT_ID` | Your GitHub OAuth App Client ID | All |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | Your GitHub OAuth App Client Secret | All |
| `KEYSTATIC_SECRET` | `0d9fd6509a8f08d722e3594b4c6a1457ba455ecfd08e5406706ca990b1c6a1ce` | All |
| `PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID` | Your GitHub OAuth App Client ID | All |

> **⚠️ Important**: Replace the `KEYSTATIC_SECRET` with your own generated random string in production. Never share your Client Secret publicly.

After adding variables, **redeploy** your Vercel project.

---

## Step 3: Access the Admin Panel

After deployment, navigate to:

```
https://newblog.vercel.app/keystatic
```

You will be prompted to sign in with your **GitHub account**. Because the OAuth app is registered to `HamdiGff`, only you can log in.

---

## Daily Workflow (How it Works Like WordPress)

1. Go to `https://newblog.vercel.app/keystatic`
2. Log in with your GitHub account
3. Click **"Posts & Cheats"** → **"+ Add entry"** to create a new post
4. Fill in the form:
   - Title, description, game, category, status, version, tags
   - Script code (Lua), download URL, views/downloads counts
   - SEO title, SEO description, og:image URL (overrides per post)
5. Write your full post body in the **Markdown editor**
6. Click **"Save"** — Keystatic commits the `.md` file directly to your GitHub repo
7. **Vercel auto-detects** the GitHub commit and **redeploys** your site in ~20 seconds

> Your new post is live on `https://newblog.vercel.app` without any manual code deployments!

---

## Local Development

For local development without GitHub, Keystatic runs in `local` mode and saves files directly to disk:

```powershell
cd C:\Users\hamdi\.gemini\antigravity\scratch\astro-vercel-blog
npm run dev
```

Then visit: [http://localhost:4321/keystatic](http://localhost:4321/keystatic)

> In local mode, no GitHub credentials are needed. All changes are saved to your local `src/content/blog/` folder directly.
