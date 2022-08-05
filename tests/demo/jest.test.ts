import { toBeDate } from './testUtils';

expect.extend({
  toBeDate,
});

describe('It is jest an excuse', () => {

  it('should work', () => {
    expect('hello').toEqual('hello');
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

