const withPlugins = require('next-compose-plugins');

const withMDX = require('@next/mdx');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const optimizedImages = require('next-optimized-images');

const autoprefixerPostcssPlugin = require('autoprefixer');
const cssnanoPostcssPlugin = require('cssnano');

const isDev = process.env.NODE_ENV !== 'production';
const purgecssIgnoredSourcePatterns = [
  /\/node_modules\/@fortawesome/,
  /\/node_modules\/prism-themes/,
];
const purgecssContents = [
  './components/**/*.js',
  './layouts/**/*.js',
  './pages/**/*.js',
];

module.exports = withPlugins([
  [withMDX({
    extension: /\.mdx?$/,
    mdPlugins: [],
    hastPlugins: [],
  })],
  [withCSS, {
    postcssLoaderOptions: {
      plugins: [
        autoprefixerPostcssPlugin,
        ...(!isDev ? [
          require('@fullhuman/postcss-purgecss')({
            contentFunction: sourceInputFileName => (
              purgecssIgnoredSourcePatterns.some(
                pattern => sourceInputFileName.search(pattern) >= 0
              ) ? [sourceInputFileName] : purgecssContents
            ),
            whitelist: ['html', 'body', 'h6', 'blockquote'],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
          }),
          cssnanoPostcssPlugin({ preset: 'default' }),
        ] : []),
      ],
    },
  }],
  [withSass, {
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: isDev ? '[path][name]___[local]' : '[hash:base64:6]',
    },
  }],
  [optimizedImages, {}],
], {
  webpack: (webpackConfig, { buildId, dev, isServer, defaultLoaders, webpack }) => webpackConfig,
  pageExtensions: ['js', 'mdx'],
  exportTrailingSlash: !!process.env.EXPORTING,
});
