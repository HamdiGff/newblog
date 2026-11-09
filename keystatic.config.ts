import { config, fields, collection, singleton } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

const isDev = process.env.NODE_ENV === 'development';

export default config({
  storage: isDev
    ? { kind: 'local' }
    : {
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
      'Content Management': ['posts'],
      'Site Customizer': ['announcement', 'antiCheatTracker', 'faqManager'],
      'Settings & SEO': ['siteSettings', 'socialLinks'],
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // COLLECTIONS (Posts & Cheats)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  collections: {
    posts: collection({
      label: 'Cheats & Scripts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'body' },
      entryLayout: 'content',

      // WordPress-Style Columns in List View
      columns: ['game', 'status', 'version', 'views', 'downloads', 'pubDate'],

      // Live Post Preview Link
      previewUrl: '/blog/{slug}',

      schema: {
        title: fields.slug({
          name: {
            label: 'Post Title',
            description: 'Main headline for the release (e.g. Roblox Blox Fruits Script: Auto Farm).',
          },
        }),
        description: fields.text({
          label: 'Excerpt / Summary',
          description: 'Short summary shown in post cards and search engine snippets (120-160 chars).',
          multiline: true,
        }),
        game: fields.select({
          label: 'Game Title',
          options: [
            { label: 'Roblox', value: 'Roblox' },
            { label: 'Counter-Strike 2 (CS2)', value: 'Counter-Strike 2' },
            { label: 'GTA V / GTA Online', value: 'GTA V' },
            { label: 'FiveM Roleplay', value: 'FiveM' },
            { label: 'Valorant', value: 'Valorant' },
            { label: 'Apex Legends', value: 'Apex Legends' },
            { label: 'Minecraft', value: 'Minecraft' },
            { label: 'General / Tool', value: 'General' },
          ],
          defaultValue: 'Roblox',
        }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Scripts', value: 'Scripts' },
            { label: 'Cheats', value: 'Cheats' },
            { label: 'Injectors & Loaders', value: 'Injectors' },
            { label: 'Executors', value: 'Executors' },
            { label: 'Guides & Tutorials', value: 'Guides' },
            { label: 'News & Updates', value: 'News' },
          ],
          defaultValue: 'Scripts',
        }),
        status: fields.select({
          label: 'Detection & Working Status',
          options: [
            { label: '🟢 Undetected (Safe)', value: 'Undetected' },
            { label: '✅ Working', value: 'Working' },
            { label: '🔄 Updated (New Patch)', value: 'Updated' },
            { label: '🧪 Testing / Risky', value: 'Testing' },
            { label: '🆓 Free Forever', value: 'Free' },
          ],
          defaultValue: 'Undetected',
        }),
        version: fields.text({
          label: 'Cheat / Game Version',
          description: 'e.g. v3.8.2 or Latest Steam Patch',
          defaultValue: 'v1.0.0',
        }),
        author: fields.text({
          label: 'Author / Uploader',
          defaultValue: 'CheaterFun Team',
        }),
        pubDate: fields.date({
          label: 'Published Date',
          defaultValue: { kind: 'today' },
        }),
        updatedDate: fields.date({
          label: 'Last Updated Date (optional)',
        }),
        thumbnail: fields.text({
          label: 'Thumbnail / Featured Image URL',
          description: 'Direct image link (Unsplash or direct image URL).',
        }),

        // ─── Downloads & Script Section ───────────────────────
        downloadUrl: fields.url({
          label: 'Primary Download Link URL',
          description: 'Direct download or external archive link (.zip, .exe, .dll).',
        }),
        mirrorUrl: fields.url({
          label: 'Backup / Mirror Download URL (Optional)',
        }),
        archivePassword: fields.text({
          label: 'Archive Password (if zipped)',
          description: 'e.g. 1234 or cheaterfun (leave blank if none)',
        }),
        fileSize: fields.text({
          label: 'File Size',
          defaultValue: '12.4 MB',
        }),
        scriptCode: fields.text({
          label: 'Roblox Lua / Raw Script (One-Click Copy)',
          description: 'Code pasted here renders inside the automatic copy-to-clipboard box.',
          multiline: true,
        }),

        // ─── Security & Anti-Cheat Metadata ───────────────────
        virusScanScore: fields.text({
          label: 'VirusTotal Scan Result',
          defaultValue: '0/68 Clean',
          description: 'e.g. 0/68 Clean or Verified Safe',
        }),
        virusTotalUrl: fields.url({
          label: 'VirusTotal Report URL (Optional)',
        }),
        antiCheat: fields.text({
          label: 'Target Anti-Cheat',
          description: 'e.g. Byfron/Hyperion, Valve Anti-Cheat (VAC), BattlEye, EasyAntiCheat',
        }),
        platforms: fields.array(
          fields.text({ label: 'Platform' }),
          {
            label: 'Supported Platforms',
            description: 'e.g. Windows 10, Windows 11, Android (Mobile), iOS',
            itemLabel: (props) => props.fields.value.value || 'Platform',
          }
        ),
        executors: fields.array(
          fields.text({ label: 'Executor' }),
          {
            label: 'Compatible Executors (for Roblox)',
            description: 'e.g. Solara, Wave, Codex, Delta, Fluxus',
            itemLabel: (props) => props.fields.value.value || 'Executor',
          }
        ),

        // ─── Engagement & Visibility ──────────────────────────
        views: fields.integer({
          label: 'Total Views Count',
          defaultValue: 1500,
          validation: { min: 0 },
        }),
        downloads: fields.integer({
          label: 'Total Downloads Count',
          defaultValue: 650,
          validation: { min: 0 },
        }),
        featured: fields.checkbox({
          label: '⭐ Pin as Featured Post',
          description: 'Featured releases appear prominently at the top of the homepage.',
          defaultValue: false,
        }),
        draft: fields.checkbox({
          label: '🔒 Draft Mode (Hidden from public)',
          description: 'Enable to keep this post unpublished while editing.',
          defaultValue: false,
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags & Keywords',
            description: 'Keywords for live search (e.g. Aimbot, Auto Farm, ESP, Wallhack).',
            itemLabel: (props) => props.fields.value.value || 'Tag',
          }
        ),

        // ─── WordPress-Grade SEO Suite ───────────────────────
        seoTitle: fields.text({
          label: '🔍 Custom SEO Title (<title> tag)',
          description: 'Optional custom title override for Google Search results.',
        }),
        seoDescription: fields.text({
          label: '🔍 Meta Description for Google',
          description: 'Custom search snippet (150-160 characters recommended).',
          multiline: true,
        }),
        ogImage: fields.text({
          label: '🖼️ OpenGraph / Social Share Image',
          description: 'Custom card image shown when shared on Discord, X/Twitter, or Facebook.',
        }),
        canonicalUrl: fields.url({
          label: '🔗 Canonical URL Override',
        }),
        noIndex: fields.checkbox({
          label: '🚫 No-Index (Hide from Google)',
          defaultValue: false,
        }),

        // ─── Gutenberg-Style Content Body ─────────────────────
        body: fields.markdoc({
          label: 'Article Body (Rich Text & Gutenberg Blocks)',
          components: {
            // Alert / Callout Block
            Callout: block({
              label: 'Alert / Callout Box',
              schema: {
                type: fields.select({
                  label: 'Alert Type',
                  options: [
                    { label: '⚠️ Warning / Anti-Cheat Risk', value: 'warning' },
                    { label: 'ℹ️ Information / Tip', value: 'info' },
                    { label: '✅ Success / Verified', value: 'success' },
                    { label: '🚨 Danger / Detected', value: 'danger' },
                  ],
                  defaultValue: 'info',
                }),
                title: fields.text({ label: 'Callout Title', defaultValue: 'Important Notice' }),
                message: fields.text({ label: 'Message', multiline: true }),
              },
            }),

            // Dedicated Download Button Block
            DownloadBox: block({
              label: 'Download Action Box',
              schema: {
                buttonLabel: fields.text({ label: 'Button Label', defaultValue: 'Download Direct (.zip)' }),
                downloadUrl: fields.url({ label: 'Download URL' }),
                fileSize: fields.text({ label: 'File Size', defaultValue: '14.2 MB' }),
                virusScanStatus: fields.text({ label: 'Scan Status', defaultValue: '0/68 Clean' }),
              },
            }),

            // Keybind Controls Table
            Keybind: block({
              label: 'Game Control / Keybind',
              schema: {
                key: fields.text({ label: 'Key', description: 'e.g. INSERT, F5, NUMPAD 8' }),
                action: fields.text({ label: 'Action / Function', description: 'e.g. Open Cheat Menu' }),
              },
            }),

            // Video Demo Embed Block
            YouTubeEmbed: block({
              label: 'YouTube Gameplay Video',
              schema: {
                videoId: fields.text({
                  label: 'YouTube Video ID',
                  description: 'The 11-character ID from the URL (e.g. dQw4w9WgXcQ)',
                }),
              },
            }),
          },
        }),
      },
    }),
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SINGLETONS (WordPress Site Customizers)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  singletons: {
    // 1. Top Announcement Bar (Header Notification)
    announcement: singleton({
      label: '📢 Header Announcement Ticker',
      path: 'src/data/announcement',
      schema: {
        enabled: fields.checkbox({ label: 'Show Announcement Bar', defaultValue: true }),
        pulseText: fields.text({ label: 'Pulse Badge Text', defaultValue: 'LIVE UPDATE' }),
        message: fields.text({
          label: 'Announcement Message',
          defaultValue: 'All Cheats Tested & Working on Latest Steam/Roblox Patches!',
        }),
        linkUrl: fields.url({ label: 'Banner Link URL (Optional)' }),
        linkText: fields.text({ label: 'Link Text', defaultValue: 'View Changelog →' }),
      },
    }),

    // 2. Anti-Cheat Status Dashboard Tracker
    antiCheatTracker: singleton({
      label: '🛡️ Anti-Cheat Status Monitor',
      path: 'src/data/antiCheatTracker',
      schema: {
        vacStatus: fields.select({
          label: 'Valve Anti-Cheat (CS2)',
          options: [
            { label: '🟢 Undetected', value: 'Undetected' },
            { label: '🟡 Updating', value: 'Updating' },
            { label: '🔴 Detected', value: 'Detected' },
          ],
          defaultValue: 'Undetected',
        }),
        byfronStatus: fields.select({
          label: 'Roblox Byfron / Hyperion',
          options: [
            { label: '🟢 Bypass Working', value: 'Bypass Working' },
            { label: '🟡 Patch Pending', value: 'Patch Pending' },
            { label: '🔴 Offline', value: 'Offline' },
          ],
          defaultValue: 'Bypass Working',
        }),
        battleyeStatus: fields.select({
          label: 'BattlEye (GTA V / R6S)',
          options: [
            { label: '🟢 Undetected', value: 'Undetected' },
            { label: '🟡 Updating', value: 'Updating' },
            { label: '🔴 Detected', value: 'Detected' },
          ],
          defaultValue: 'Undetected',
        }),
        fivemStatus: fields.select({
          label: 'FiveM Anticheat',
          options: [
            { label: '🟢 Undetected', value: 'Undetected' },
            { label: '🟡 Testing', value: 'Testing' },
            { label: '🔴 Detected', value: 'Detected' },
          ],
          defaultValue: 'Undetected',
        }),
        lastCheckedDate: fields.text({
          label: 'Last Verification Date',
          defaultValue: 'Today at 06:00 UTC',
        }),
      },
    }),

    // 3. Global Site Settings & SEO
    siteSettings: singleton({
      label: '⚙️ Site Identity & Global SEO',
      path: 'src/data/siteSettings',
      schema: {
        siteName: fields.text({ label: 'Site Name', defaultValue: 'CHEATER.FUN' }),
        tagline: fields.text({
          label: 'Tagline',
          defaultValue: 'Best Free Undetected Game Cheats, Scripts & Trainers',
        }),
        description: fields.text({
          label: 'Default SEO Meta Description',
          multiline: true,
          defaultValue:
            'Download free undetected game cheats, Roblox scripts, CS2 hacks, GTA V mod menus and trainers verified daily.',
        }),
        googleAnalyticsId: fields.text({
          label: 'Google Analytics 4 Measurement ID (G-XXXXXXXXXX)',
          description: 'Leave empty if not using GA4.',
        }),
        googleSearchConsoleCode: fields.text({
          label: 'Google Search Console Verification Tag',
        }),
        defaultOgImage: fields.text({
          label: 'Default Social Share Image URL',
        }),
        footerText: fields.text({
          label: 'Footer Copyright Notice',
          defaultValue: '© 2026 CHEATER.FUN — All rights reserved.',
        }),
      },
    }),

    // 4. Social & Community Links
    socialLinks: singleton({
      label: '💬 Discord & Community Settings',
      path: 'src/data/socialLinks',
      schema: {
        discordInvite: fields.url({ label: 'Discord Invite URL' }),
        discordMembers: fields.text({ label: 'Discord Member Count', defaultValue: '24,500' }),
        telegramChannel: fields.url({ label: 'Telegram Channel URL' }),
        twitterProfile: fields.url({ label: 'X / Twitter URL' }),
        githubRepo: fields.url({ label: 'GitHub Repository URL' }),
      },
    }),

    // 5. FAQ Manager
    faqManager: singleton({
      label: '❓ FAQ & Knowledge Base',
      path: 'src/data/faqManager',
      schema: {
        items: fields.array(
          fields.object({
            question: fields.text({ label: 'Question' }),
            answer: fields.text({ label: 'Answer', multiline: true }),
          }),
          {
            label: 'FAQ Items',
            itemLabel: (props) => props.fields.question.value || 'FAQ Question',
          }
        ),
      },
    }),
  },
});
