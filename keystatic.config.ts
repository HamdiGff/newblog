import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'HamdiGff',
      name: 'newblog',
    },
  },
  ui: {
    brand: {
      name: 'CHEATER.FUN Admin',
    },
    navigation: {
      'Content': ['posts'],
      'Site Settings': ['siteSettings', 'categories', 'socialLinks'],
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // COLLECTIONS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  collections: {
    // Blog Posts / Cheats Collection
    posts: collection({
      label: 'Posts & Cheats',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'body' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: { label: 'Post Title', description: 'The main heading of the post or cheat release.' },
        }),
        description: fields.text({
          label: 'SEO Description / Excerpt',
          description: 'Short description shown in search results and post cards (max 160 chars).',
          multiline: true,
        }),
        game: fields.text({
          label: 'Game Name',
          description: 'e.g. Roblox, Counter-Strike 2, GTA V, FiveM',
          defaultValue: 'Roblox',
        }),
        category: fields.select({
          label: 'Category',
          description: 'The type of release.',
          options: [
            { label: 'Cheats', value: 'Cheats' },
            { label: 'Scripts', value: 'Scripts' },
            { label: 'Injectors', value: 'Injectors' },
            { label: 'Executors', value: 'Executors' },
            { label: 'Guides', value: 'Guides' },
            { label: 'News', value: 'News' },
          ],
          defaultValue: 'Cheats',
        }),
        status: fields.select({
          label: 'Detection Status',
          options: [
            { label: '🟢 Undetected', value: 'Undetected' },
            { label: '✅ Working', value: 'Working' },
            { label: '🔄 Updated', value: 'Updated' },
            { label: '🧪 Testing', value: 'Testing' },
            { label: '🆓 Free', value: 'Free' },
          ],
          defaultValue: 'Undetected',
        }),
        version: fields.text({
          label: 'Version',
          description: 'e.g. v3.8.2',
          defaultValue: 'v1.0',
        }),
        pubDate: fields.date({
          label: 'Publish Date',
          defaultValue: { kind: 'today' },
        }),
        updatedDate: fields.date({
          label: 'Last Updated Date (optional)',
        }),
        thumbnail: fields.text({
          label: 'Thumbnail / Featured Image URL',
          description: 'Full URL to the banner image shown on the post card and article header.',
        }),
        downloadUrl: fields.url({
          label: 'Download Link URL',
          description: 'The direct download or external link for the cheat/script.',
        }),
        scriptCode: fields.text({
          label: 'Script Code (Lua / Raw)',
          description: 'Roblox Lua or raw script code to show in the one-click copy box.',
          multiline: true,
        }),
        views: fields.integer({
          label: 'Views Count',
          defaultValue: 1000,
          validation: { min: 0 },
        }),
        downloads: fields.integer({
          label: 'Downloads Count',
          defaultValue: 500,
          validation: { min: 0 },
        }),
        featured: fields.checkbox({
          label: 'Featured Post',
          description: 'Mark this as a featured / highlighted post on the homepage.',
          defaultValue: false,
        }),
        draft: fields.checkbox({
          label: 'Draft (Hidden from public)',
          description: 'Enable this to hide the post from the public while editing.',
          defaultValue: false,
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            description: 'Add relevant keyword tags (e.g. Aimbot, Auto Farm, Executor, ESP).',
            itemLabel: (props) => props.fields.value.value || 'Tag',
          }
        ),
        // ─── SEO & OpenGraph Panel ───────────────────────────
        seoTitle: fields.text({
          label: '🔍 Custom SEO Title',
          description: 'Custom HTML <title> override (optional). Falls back to Post Title if empty.',
        }),
        seoDescription: fields.text({
          label: '🔍 SEO Meta Description Override',
          description: 'Custom meta description for search engines (max 160 chars).',
          multiline: true,
        }),
        ogImage: fields.text({
          label: '🖼️ OpenGraph Share Image URL',
          description: 'The image shown when this post is shared on Twitter / Discord / Facebook.',
        }),
        canonicalUrl: fields.url({
          label: '🔗 Canonical URL Override',
          description: 'Only needed if you are cross-posting from another source.',
        }),
        noIndex: fields.checkbox({
          label: '🚫 No Index (hide from Google)',
          description: 'Adds noindex meta tag to prevent search indexing.',
          defaultValue: false,
        }),

        // ─── Post Body (Markdoc / Markdown) ─────────────────
        body: fields.markdoc({
          label: 'Post Content',
          description: 'Full article body written in Markdown. Use headings, lists, code blocks, and tables.',
        }),
      },
    }),
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SINGLETONS (Global Site Settings)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  singletons: {
    // Global SEO & Site Identity Settings
    siteSettings: singleton({
      label: '⚙️ Site Settings & Global SEO',
      path: 'src/data/siteSettings',
      schema: {
        siteName: fields.text({
          label: 'Site Name',
          defaultValue: 'CHEATER.FUN',
        }),
        tagline: fields.text({
          label: 'Tagline',
          defaultValue: 'Free Undetected Game Cheats & Roblox Scripts',
        }),
        siteDescription: fields.text({
          label: 'Default SEO Description',
          multiline: true,
          defaultValue: 'Download free undetected game cheats, Roblox scripts, CS2 hacks, GTA V mod menus and executors.',
        }),
        siteUrl: fields.url({
          label: 'Site URL',
        }),
        googleAnalyticsId: fields.text({
          label: '📊 Google Analytics ID (G-XXXXXXXXXX)',
          description: 'Enter your GA4 Measurement ID to enable analytics tracking.',
        }),
        googleSearchConsoleVerification: fields.text({
          label: '🔍 Google Search Console Verification Code',
        }),
        favicon: fields.text({
          label: '🖼️ Favicon URL',
        }),
        ogDefaultImage: fields.text({
          label: '🖼️ Default OpenGraph Share Image',
          description: 'Fallback share image when a post does not have a custom og:image.',
        }),
        robotsTxt: fields.text({
          label: '🤖 robots.txt Content',
          multiline: true,
          defaultValue: 'User-agent: *\nAllow: /',
        }),
      },
    }),

    // Social Links Settings
    socialLinks: singleton({
      label: '🔗 Social Media & Community Links',
      path: 'src/data/socialLinks',
      schema: {
        discordUrl: fields.url({ label: 'Discord Invite URL' }),
        telegramUrl: fields.url({ label: 'Telegram Channel URL' }),
        twitterUrl: fields.url({ label: 'X / Twitter Profile URL' }),
        githubUrl: fields.url({ label: 'GitHub Repository URL' }),
        youtubeUrl: fields.url({ label: 'YouTube Channel URL' }),
        discordMemberCount: fields.text({
          label: 'Discord Member Count (Display)',
          defaultValue: '24,500',
        }),
      },
    }),

    // Categories Management
    categories: singleton({
      label: '🏷️ Game Categories List',
      path: 'src/data/categories',
      schema: {
        items: fields.array(
          fields.object({
            name: fields.text({ label: 'Category Name', description: 'e.g. Roblox Scripts, CS2 Cheats' }),
            slug: fields.text({ label: 'URL Slug', description: 'e.g. roblox-scripts (no spaces, lowercase)' }),
            description: fields.text({ label: 'Short Description', multiline: true }),
            icon: fields.text({ label: 'Emoji Icon', defaultValue: '🎮' }),
            color: fields.select({
              label: 'Accent Color',
              options: [
                { label: 'Red', value: 'red' },
                { label: 'Amber', value: 'amber' },
                { label: 'Emerald', value: 'emerald' },
                { label: 'Blue', value: 'blue' },
                { label: 'Purple', value: 'purple' },
              ],
              defaultValue: 'red',
            }),
          }),
          {
            label: 'Categories',
            itemLabel: (props) => props.fields.name.value || 'New Category',
          }
        ),
      },
    }),
  },
});
