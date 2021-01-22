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
        extend: {
          zIndex: {
            '-1': '-1',
          },
          colors: {
            'background-avg': 'var(--background-avg-color)',
          },
        },
      },
      variants: {
        extend: {},
      },
      plugins: [],
    },
    autoprefixer: {},
  },
};
