// eslint-disable-next-line jest/no-jest-import
import type { Config } from 'jest';
import config from '../../jest.config';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from '../../tsconfig.json';

const subConfig: Config = {
  ...config,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    // This has to match the baseUrl defined in tsconfig.json.
    prefix: '<rootDir>/../../',
  }),
};

export default subConfig;
