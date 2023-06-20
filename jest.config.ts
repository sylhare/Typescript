import type { Config } from 'jest';
import { defaults } from 'jest-config';
import { pathsToModuleNameMapper } from 'ts-jest';

const projects = [
  {
    preset: 'ts-jest',
    testEnvironment: 'node',
    displayName: 'express',
    moduleNameMapper: pathsToModuleNameMapper({
      '@monorepo/*': ['libs/*/src']
    }, {
      prefix: '<rootDir>/Typescript/../',
    }),
    testMatch: ['<rootDir>/apps/express/**/*.test.ts'],
  },
  {
    preset: 'ts-jest',
    testEnvironment: 'node',
    displayName: 'quizz',
    setupFilesAfterEnv: ['jest-extended'],
    testMatch: ['<rootDir>/demo/quizz/**/*.test.ts'],
  },
  {
    preset: 'ts-jest',
    testEnvironment: 'node',
    displayName: 'jest',
    testMatch: ['<rootDir>/demo/jest/**/*.test.ts'],
  },
  {
    preset: 'ts-jest',
    testEnvironment: 'node',
    displayName: 'kafka',
    testMatch: ['<rootDir>/libs/kafka/**/*.test.ts'],
  },
];

const config: Config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 10000,
  testRegex: '\\.(test|e2e)\\.ts$',
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: [
    'node_modules',
    'test'
  ],
  coverageReporters: [
    'text',
    'text-summary',
    'lcov'
  ],
  moduleDirectories: defaults.moduleDirectories,
  moduleFileExtensions: [
    'js',
    'ts',
    'json'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  transformIgnorePatterns: [
    'node_modules/'
  ],
  watchPathIgnorePatterns: [
    '.idea'
  ],
  setupFilesAfterEnv: ['jest-extended'],
  moduleNameMapper: pathsToModuleNameMapper({
    '@monorepo/*': ['libs/*/src']
  }, {
    // This has to match the baseUrl defined in tsconfig.json.
    prefix: '<rootDir>',
  }),
  projects,
};

export default config;
