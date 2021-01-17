module.exports = {
  plugins: {
    tailwindcss: {
      future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
      },
      purge: [
        './components/**/*.js',
        './layouts/**/*.js',
        './pages/**/*.js',
      ],
      darkMode: false, // or 'media' or 'class'
      theme: {
        extend: {},
      },
      variants: {
        extend: {},
      },
      plugins: [],
    },
    autoprefixer: {},
  },
};
