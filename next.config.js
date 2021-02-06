const withPlugins = require('next-compose-plugins');

const withMDX = require('@next/mdx');
const optimizedImages = require('next-optimized-images');

const detectFrontmatter = require('remark-frontmatter');
const extractFrontmatter = require('./lib/node/extractFrontmatter.js');

module.exports = withPlugins([
  [withMDX({
    extension: /\.mdx?$/,
    options: {
      remarkPlugins: [
        [detectFrontmatter, ['yaml']],
        extractFrontmatter,
      ],
    },
  })],
  [optimizedImages, {}],
], {
  pageExtensions: ['js', 'mdx'],
});
