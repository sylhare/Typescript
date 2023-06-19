// eslint-disable-next-line jest/no-jest-import
import type { Config } from 'jest';
import { defaults } from 'jest-config';
import { pathsToModuleNameMapper } from 'ts-jest';

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
  moduleNameMapper: pathsToModuleNameMapper({
    '@monorepo/*': ['libs/*/src']
  }, {
    // This has to match the baseUrl defined in tsconfig.json.
    prefix: '<rootDir>',
  }),
};

export default config;
