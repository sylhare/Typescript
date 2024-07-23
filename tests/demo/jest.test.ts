import { toBeDate } from './testUtils';

expect.extend({
  toBeDate,
});

describe('It is jest an excuse', () => {

  it('should work', () => {
    expect('hello').toEqual('hello');
  });

  describe('clearAllMocks vs resetAllMocks', () => {

    it('resetAllMocks', () => {
      const mock = jest.fn().mockReturnValue('Hello World!');
      expect(mock()).toBe('Hello World!');
      expect(mock).toHaveBeenCalledTimes(1);
      jest.resetAllMocks();
      expect(mock).not.toHaveBeenCalled();
      expect(mock()).toBeUndefined();
    });

    it('clearAllMocks', () => {
      const mock = jest.fn().mockReturnValue('Hello World!');
      expect(mock()).toBe('Hello World!');
      expect(mock).toHaveBeenCalledTimes(1);
      jest.clearAllMocks();
      expect(mock).not.toHaveBeenCalled();
      expect(mock()).toBe('Hello World!');
    });
  });

  describe('toBe vs toEqual', () => {
    const hello = { hello: 'world' };
    it('should work', () => {
      expect(hello).toBe(hello);
      expect(hello).toEqual({ hello: 'world' });
      expect(hello).toEqual(hello);
    });

    it.skip('should not work', () => {
      expect(hello).toBe({ hello: 'world' });
    });

    it.skip('should not work again', () => {
      const allo = { ...hello, allo: 'le monde' };
      expect(hello).toBe(allo);
    });
  });

  it('should be a date', () => {
    expect(new Date()).toBeDate();
    expect('hello').not.toBeDate();
  });

  it.each([null, undefined, ''])('"%s" should be falsy', (input: any) => {
    expect(input).toBeFalsy();
  });

  describe.each([
    { user: 'dev' },
    { user: 'admin' },
    { user: 'customer' }
  ])('API', (current: { user: string }) => {

    it(`${current.user} can read`, () => {
      expect(checkRights(current)).toBeTruthy();
    });

    const checkRights = (_: { user: string }) => true;
  });
});

