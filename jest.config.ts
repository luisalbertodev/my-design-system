// jest.config.ts
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // Use ts-jest to transpile TypeScript
  preset: 'ts-jest',

  // Test environment that will be used for testing
  testEnvironment: 'jsdom',

  // Collect coverage information
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/index.ts',
    '!<rootDir>/src/**/*.d.ts',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/coverage/',
    '/.storybook/',
    '/src/types.d.ts',
    '\\.story\\..+',
    '\\.stories\\.(ts|tsx)$',
    '\\.(test|spec)\\.(ts|tsx)$',
    'index\\.ts$',
  ],
  coverageReporters: ['json', 'html', 'text', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  // Glob patterns Jest uses to detect test files
  testMatch: [
    '<rootDir>/src/**/*.*.test.{ts,tsx}',
    '<rootDir>/src/**/*.*.spec.{ts,tsx}',
    '!**/*.stories.{ts,tsx}',
  ],

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Show individual test results with the test suite hierarchy
  verbose: true,

  // Setup scripts that run before each test suite
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // Module name mappings for static assets and style imports
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg)$': '<rootDir>/__mocks__/fileMock.ts',
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.ts',
  },

  // Transform configuration for ts-jest
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
};

export default config;
