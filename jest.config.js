const nextJest = require('next/jest');
// https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  /*
   * Add more setup options before each test is run
   * setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
   * if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
   */
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',

  moduleNameMapper: {
    /*
     * Handle image imports
     * https://jestjs.io/docs/webpack#handling-static-assets
     * https://nextjs.org/docs/testing#setting-up-jest-with-babel
     */
    '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)(\\?.+)?$': '<rootDir>/lib/__testsUtils__/fileMock.js',
    // next-optimized-images that importing images may have query like 'a.jpg?width=1024', this custom regex is added besides built-in one from nextjs
  },

  setupFilesAfterEnv: ['<rootDir>/lib/__testsUtils__/jest.setup.js'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
