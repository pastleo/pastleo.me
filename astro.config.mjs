// @ts-check
import { copyFile, readFile } from 'node:fs/promises';
import { defineConfig, mergeConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import rehypeBlog from './src/plugins/rehype-blog.mjs';

// Optional machine-local overrides. Invalid JSON or unreadable files fail loudly.
const localConfig = JSON.parse(await readFile(new URL('./astro.config.local.json', import.meta.url), 'utf8')
  .catch((error) => {
    if (error.code === 'ENOENT') return '{}';
    throw error;
  }));

export default mergeConfig(defineConfig({
  site: 'https://pastleo.me',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !/^\/(?:about\/?|posts\/.*|404\/?|404\.html)$/.test(new URL(page).pathname),
    }),
    {
      name: 'sitemap-compatibility',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          await copyFile(new URL('sitemap-index.xml', dir), new URL('sitemap.xml', dir));
        },
      },
    },
  ],
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: { theme: 'dark-plus' },
    processor: unified({ rehypePlugins: [rehypeBlog] }),
  },
  i18n: {
    defaultLocale: 'zh',
    locales: [
      { path: 'zh', codes: ['zh-TW', 'zh-Hant', 'zh'] },
      { path: 'en', codes: ['en-US', 'en'] },
      { path: 'ja', codes: ['ja-JP', 'ja'] },
    ],
    routing: { prefixDefaultLocale: false },
  },
}), localConfig);
