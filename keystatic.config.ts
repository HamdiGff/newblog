import { config, fields, collection } from '@keystatic/core';

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
      'Manage Content': ['posts'],
    },
  },

  collections: {
    posts: collection({
      label: 'Cheats & Scripts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'body' },
      entryLayout: 'content',

      // Clean list columns
      columns: ['game', 'status', 'version', 'pubDate'],

      // Instant live preview
      previewUrl: '/blog/{slug}',

      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
            description: 'Post headline (e.g. Roblox Blox Fruits Script: Auto Farm).',
          },
        }),
        game: fields.select({
          label: 'Game',
          options: [
            { label: 'Roblox', value: 'Roblox' },
            { label: 'Counter-Strike 2', value: 'Counter-Strike 2' },
            { label: 'GTA V', value: 'GTA V' },
            { label: 'FiveM', value: 'FiveM' },
            { label: 'Valorant', value: 'Valorant' },
            { label: 'Minecraft', value: 'Minecraft' },
            { label: 'Other', value: 'General' },
          ],
          defaultValue: 'Roblox',
        }),
        category: fields.select({
          label: 'Type',
          options: [
            { label: 'Script', value: 'Scripts' },
            { label: 'Cheat / Mod Menu', value: 'Cheats' },
            { label: 'Executor / Injector', value: 'Injectors' },
          ],
          defaultValue: 'Scripts',
        }),
        status: fields.select({
          label: 'Cheat Status',
          options: [
            { label: '🟢 Undetected', value: 'Undetected' },
            { label: '✅ Working', value: 'Working' },
            { label: '🔄 Updated', value: 'Updated' },
            { label: '❌ Outdated', value: 'Testing' },
          ],
          defaultValue: 'Undetected',
        }),
        version: fields.text({
          label: 'Version',
          description: 'e.g. v3.8.2',
          defaultValue: 'v1.0',
        }),
        thumbnail: fields.text({
          label: 'Thumbnail / Image URL',
          description: 'Image URL for the cheat banner / card.',
        }),
        downloadUrl: fields.url({
          label: 'Download Link',
          description: 'Direct link to the file (.zip, .dll, etc.).',
        }),
        scriptCode: fields.text({
          label: 'Lua / Script Code (Optional)',
          description: 'Paste raw code here. Users get a 1-click "Copy Script" button.',
          multiline: true,
        }),
        description: fields.text({
          label: 'Short Description / SEO Summary',
          description: '1-2 sentences shown on cards and in Google search results.',
          multiline: true,
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          description: 'Keywords (e.g. Aimbot, ESP, Auto Farm, Solara).',
          itemLabel: (props) => props.fields.value.value || 'Tag',
        }),
        pubDate: fields.date({
          label: 'Date',
          defaultValue: { kind: 'today' },
        }),
        body: fields.markdoc({
          label: 'Content (Instructions, Features & How to Use)',
        }),
      },
    }),
  },
});
