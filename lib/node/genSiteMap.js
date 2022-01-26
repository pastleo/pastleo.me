import sitemap from 'nextjs-sitemap-generator';
import path from 'path';

console.log(path.resolve('./.next/server/pages'));
sitemap({
  baseUrl: 'https://pastleo.me',
  pagesDirectory: path.resolve('./.next/server/pages'),
  targetDirectory: path.resolve('./public'),
  ignoredPaths: ['index', '404', '500'],
  extraPaths: ['/'],
  ignoredExtensions: ['js', 'map', 'json'],
});
