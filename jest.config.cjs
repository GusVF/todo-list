// jest.config.js
/* eslint-disable */

module.exports = {
  testEnvironment: 'jsdom', // Use the jsdom test environment for browser-like behavior
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'], // Include JavaScript and TypeScript files
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Use Babel to transpile your code for testing
  },
  testMatch: ['**/__tests__/**/*.test.(js|jsx|ts|tsx)'], // Specify the test file naming pattern
};
