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
  });
});

