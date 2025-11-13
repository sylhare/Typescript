import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './',
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.pkg.json'
    }]
  },
  moduleNameMapper: {
    '^@sylhare/example$': '<rootDir>/../example/src'
  }
};

export default config;

