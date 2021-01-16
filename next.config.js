const withPlugins = require('next-compose-plugins');

const withMDX = require('@next/mdx');
const optimizedImages = require('next-optimized-images');

module.exports = withPlugins([
  [withMDX({
    extension: /\.mdx?$/,
  })],
  [optimizedImages, {}],
], {
  pageExtensions: ['js', 'mdx'],
});
