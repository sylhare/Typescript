// eslint-disable-next-line jest/no-jest-import
import type { Config } from 'jest';
import config from '../../jest.config';

const subConfig: Config = {
  ...config,
};

export default subConfig;
