const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

module.exports = withPlugins([
  [optimizedImages, {}],
], {
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
  },

  // https://github.com/vercel/next.js/issues/17806#issuecomment-913437792
  webpack: config => {
    config.module.rules.push({
      test: /\.js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    });
    return config;
  },
});
