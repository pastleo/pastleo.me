module.exports = {
  plugins: {
    tailwindcss: {
      future: {},
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
            'theme': 'var(--theme-color)',
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
