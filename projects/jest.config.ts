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
  projects: [
    {
      displayName: 'general',
      testMatch: [
        '<rootDir>/packages/is-even/**/*.test.ts',
        '<rootDir>/packages/is-odd/**/*.test.ts',
        '<rootDir>/packages/kafka/**/*.test.ts',
        '<rootDir>/packages/redpanda/**/*.test.ts'
      ],
      preset: 'ts-jest',
      testEnvironment: 'node',
      moduleNameMapper: {
        '^@acme-corp/(.*)$': '<rootDir>/packages/$1/',
        '^@sylhare/kafka$': '<rootDir>/packages/kafka/src',
        '^@sylhare/redpanda$': '<rootDir>/packages/redpanda/src',
        '^@sylhare/is-even$': '<rootDir>/packages/is-even',
        '^@sylhare/is-odd$': '<rootDir>/packages/is-odd'
      }
    },
    {
      displayName: 'express',
      testMatch: ['<rootDir>/packages/express/**/*.test.ts'],
      preset: 'ts-jest',
      testEnvironment: 'node',
      transform: {
        '^.+\\.ts$': ['ts-jest', {
          tsconfig: '<rootDir>/packages/express/tsconfig.pkg.json'
        }]
      },
      moduleNameMapper: {
        '^@sylhare/example$': '<rootDir>/packages/example/src'
      }
    }
  ]
};

export default config;
