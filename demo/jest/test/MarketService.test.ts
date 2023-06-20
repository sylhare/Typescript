import { MarketService } from '../src/service/MarketService';

describe('Market Service', () => {
  describe('with spy on service', () => {
    const marketService = new MarketService();
    it('gives the info', () => {
      expect(marketService.info()).toMatch(/buy and sell items/);
    });

    it('buy reject by default', async () => {
      await expect(marketService.buy({ name: 'orange juice' })).rejects.toMatch(/rejects by default/);
    });

    it('spy on buy', async () => {
      const spy = jest.spyOn(marketService, 'buy');
      spy.mockImplementation(() => Promise.resolve('ok'));
      const response = await marketService.buy({ name: 'orange juice' });
      expect(response).toEqual('ok');
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('with mock service', () => {
    const marketServiceMock: jest.Mocked<MarketService> = {
      url: '',
      buy: jest.fn().mockResolvedValue('ok'),
      info: jest.fn().mockImplementation(() => new MarketService().info()),
    };
    it('gives the info', () => {
      expect(marketServiceMock.info()).toMatch(/buy and sell items/);
    });

    it('mocks the service', async () => {
      const response = await marketServiceMock.buy({ name: 'orange juice' });
      expect(response).toEqual('ok');
    });
  });
});
