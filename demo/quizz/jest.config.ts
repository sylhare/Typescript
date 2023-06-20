import type { Config } from 'jest';
import { defaults } from 'jest-config';

const subconfig: Config = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 10000,
  testRegex: '\\.(test|e2e)\\.ts$',
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
};

export default subconfig;
