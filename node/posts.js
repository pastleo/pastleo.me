import mdx, { createMdxAstCompiler } from '@mdx-js/mdx';
import { promises as fs } from 'fs';
import path from 'path';

const OPTIONS_LINE = 'export const options = {';
const getPostOptions = async path => {
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

export const getPosts = async() => {
  const postsDir = path.join(process.cwd(), 'pages/posts/');
  const posts = await fs.readdir(postsDir);
  return Promise.all(
    posts.map(
      filename => filename.match(/^(.+)\.mdx$/)
    ).flatMap(
      match => (match ? [{ filename: match[0], slug: match[1] }] : [])
    ).map(async post => ({
      ...post,
      options: await getPostOptions(
        path.join(postsDir, post.filename)
      ),
    }))
  );
};
