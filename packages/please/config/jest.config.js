const { join } = require('path');

module.exports = {
  roots: ['<rootDir>/src'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.[jt]sx?$',
  testEnvironment: 'node',
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/*.d.ts'],
  coveragePathIgnorePatterns: ['/node-modules/'],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  preset: 'ts-jest/presets/js-with-ts',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: {
        allowJs: true,
      },
    },
  },
};
