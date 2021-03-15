import fs from 'fs/promises';
import RSS from 'rss';

import { all } from './posts.js';

const feedXmlPath = '/feed.xml';
const siteUrl = 'https://pastleo.me';

async function generate() {
  const posts = (await all())
    .map(p => ({ ...p, createdAtT: (new Date(p.options.createdAt)).getTime() }))
    .sort((a, b) => a.createdAtT === b.createdAtT ? 0 : b.createdAtT - a.createdAtT);

  const feed = new RSS({
    title: 'PastLeo\' blog',
    site_url: siteUrl,
    feed_url: `${siteUrl}${feedXmlPath}`,
  });

  posts.forEach(p => {
    feed.item({
      title: p.options.title,
      guid: p.slug,
      url: `${siteUrl}/post/${p.slug}`,
      date: p.options.createdAt,
      description: p.options.description,
      author: 'PastLeo',
    });
  });

  const rss = feed.xml({ indent: true });
  await fs.writeFile('./public/feed.xml', rss);
}

generate();
