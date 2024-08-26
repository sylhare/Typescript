import { asyncTask1, asyncTask2 } from '../../src/tutorial/multithread/promises';
import { runner } from '../../src/tutorial/multithread/runner';

describe('Multi thread in JS', () => {
  it('should wait for all', async () => {
    const result = await Promise.all([asyncTask1(), asyncTask2()]);
    expect(result).toEqual(['1', '2']);
  });

  it('should wait for the first', async () => {
    const result = await Promise.race([asyncTask1(), asyncTask2()]);
    expect(result).toEqual('2');
  });

  it('should return double the input value', async () => {
    const input = 42;

    const result = await runner({ value: input }, false);

    expect(result).toEqual(84);
  });

  it('should ignore main thread', async () => {
    const input = 42;

    const result = await runner({ value: input }, true);

    expect(result).toBeUndefined();
  });
});
