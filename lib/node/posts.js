import mdx, { createMdxAstCompiler } from '@mdx-js/mdx';
import { promises as fs } from 'fs';
import path from 'path';

import { genQuery, genLinkProps, parseQuery } from '../posts.js';

const POSTS_DIR_PATH = 'pages/post/';
const OPTIONS_LINE = 'export const options = {';
const POSTS_PER_PAGE = 6;

const postsDir = path.join(process.cwd(), POSTS_DIR_PATH);

const digOptions = async path => {
  const content = await fs.readFile(path, 'utf8');
  const jsx = await mdx(content);
  const indexOfOptions = jsx.indexOf(OPTIONS_LINE);
  const optionsCode = jsx.substring(indexOfOptions + OPTIONS_LINE.length - 1);
  const optionsCodeEndSearcher = optionsCode.matchAll(/\}/g);
  let options = null;
  let endMatch = optionsCodeEndSearcher.next();
  while(!options && !endMatch.done) {
    try {
      eval(
        `options = ${optionsCode.substring(0, endMatch.value.index + 1)}`
      );
    } catch (e) {}
    endMatch = optionsCodeEndSearcher.next();
  }
  return options || {};
};

const digCreatedAt = post => new Date(post.options.createdAt);

const withCache = process.env.NODE_ENV === 'development' ? (f => f) : (fn => {
  let cache;
  return async () => {
    if (cache) return cache;
    cache = fn();
    return cache;
  };
});

export const filenames = withCache(() => fs.readdir(postsDir));

export const all = withCache(async () => {
  const posts = await Promise.all(
    (await filenames()).map(
      filename => filename.match(/^(.+)\.mdx$/)
    ).flatMap(
      match => (match ? [{ filename: match[0], slug: match[1] }] : [])
    ).map(async post => ({
      ...post,
      options: await digOptions(
        path.join(postsDir, post.filename)
      ),
    }))
  );

  return posts.sort(
    (post1, post2) => digCreatedAt(post2) - digCreatedAt(post1)
  );
});

export const totalPages = withCache(async () => Math.ceil((await filenames()).length / POSTS_PER_PAGE));

export const page = async p => {
  const posts = await all();
  return posts.slice(
    p * POSTS_PER_PAGE,
    (p + 1) * POSTS_PER_PAGE
  );
};

export const genQueryPaths = async () => (
  Array(await totalPages()).fill().map(
    (_, page) => (
      { params: { q: genQuery({ page }) } }
    )
  )
);

export { genQuery, genLinkProps, parseQuery };
