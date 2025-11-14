import type { Config } from 'jest';

const projects = [
  {
    preset: 'ts-jest',
    testEnvironment: 'node',
    displayName: 'challenges',
    testMatch: ['<rootDir>/tests/challenges/**/*.test.ts'],
    collectCoverageFrom: ['src/challenges/**/*.ts'],
    setupFilesAfterEnv: ['jest-extended/all'],
  },
  {
    preset: 'ts-jest',
    testEnvironment: 'node',
    displayName: 'models',
    testMatch: ['<rootDir>/tests/object/**/*.test.ts'],
    collectCoverageFrom: ['src/models/**/*.ts'],
    setupFilesAfterEnv: ['jest-extended/all'],
  },
  {
    preset: 'ts-jest',
    testEnvironment: 'node',
    displayName: 'service',
    testMatch: ['<rootDir>/tests/jest-demo/**/*.test.ts'],
    collectCoverageFrom: ['src/service/**/*.ts'],
    setupFilesAfterEnv: ['jest-extended/all'],
  },
  {
    preset: 'ts-jest',
    testEnvironment: 'node',
    displayName: 'tutorial',
    testMatch: ['<rootDir>/tests/tutorial/**/*.test.ts'],
    collectCoverageFrom: ['src/tutorial/**/*.ts'],
    setupFilesAfterEnv: ['jest-extended/all'],
  },
];

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '\\.(test|e2e)\\.ts$',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  setupFilesAfterEnv: [
    'jest-extended/all'
  ],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/index.ts'],
  coveragePathIgnorePatterns: [],
  coverageReporters: ['text', 'text-summary', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 85,
      lines: 85
    }
  },
  watchPathIgnorePatterns: ['.idea'],
  modulePathIgnorePatterns: ['<rootDir>/projects/'],
  projects,
};

export default config;

