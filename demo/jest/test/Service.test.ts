import { mMultiply, mSum } from '../src/service/Calculator';
import { MarketService } from '../src/service/MarketService';

jest.mock('../src/service/Calculator', () => ({
  ...jest.requireActual('../src/service/Calculator'), // use actual for all non-hook parts
  mSum: jest.fn().mockImplementation(() => 'mocked')
}));

describe('Calculator', () => {
  it('sums', () => expect(mSum(3, 2)).toEqual('mocked'));
  it('multiplies', () => expect(mMultiply(3, 2)).toEqual(6));
});

// ---------------------------------------------------------------------------------------

jest.mock('../src/service/MarketService', () => ({
  MarketService: jest.fn(() => ({
    buy: jest.fn().mockResolvedValue('ok'),
  })),
}));

describe('Market Service', () => {
  const marketService = new MarketService();

  it('gives an error on not mocked method', () => {
    expect(() => marketService.info()).toThrow(Error);
  });

  it('mocks the buy method', async () => {
    const response = await marketService.buy({ name: 'orange juice' });
    expect(response).toEqual('ok');
  });
});
