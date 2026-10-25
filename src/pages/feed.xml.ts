import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getPosts } from '../lib/posts';

const escapeXml = (value: string) => value.replace(/[<>&"']/g, (char) => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
})[char]!);

export const GET: APIRoute = async ({ site }) => rss({
  title: "PastLeo' blog",
  description: "PastLeo' blog",
  site: site!,
  trailingSlash: false,
  xmlns: { atom: 'http://www.w3.org/2005/Atom', dc: 'http://purl.org/dc/elements/1.1/' },
  customData: `<language>zh-TW</language><atom:link href="${new URL('/feed.xml', site)}" rel="self" type="application/rss+xml"/>`,
  items: (await getPosts()).map((post) => ({
    title: post.data.title,
    description: post.data.description,
    // Keep the legacy URL spelling, slug GUID, and Taiwan-midnight instant.
    link: `/post/${post.id}`,
    pubDate: new Date(`${post.data.createdAt}T00:00:00+08:00`),
    customData: `<guid isPermaLink="false">${escapeXml(post.id)}</guid><dc:creator>PastLeo</dc:creator>`,
  })),
});
