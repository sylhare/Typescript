import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'packages/**/*.{ts,js,jsx}'
  ],
  coveragePathIgnorePatterns: [
    'jest.config.js',
    '/node_modules/',
    '/dist/',
  ],
  moduleNameMapper: {
    '^@sylhare/kafka$': '<rootDir>/packages/kafka/src',
    '^@sylhare/redpanda$': '<rootDir>/packages/redpanda/src',
    '^@sylhare/is-even$': '<rootDir>/packages/is-even',
    '^@sylhare/is-odd$': '<rootDir>/packages/is-odd'
  }
};

export default config;
