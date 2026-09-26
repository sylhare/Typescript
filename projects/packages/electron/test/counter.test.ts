import { increment, decrement, reset } from '../src/renderer/counter';

describe('counter', () => {
  it('increments a value by one', () => {
    expect(increment(0)).toBe(1);
    expect(increment(41)).toBe(42);
  });

  it('decrements a value by one', () => {
    expect(decrement(1)).toBe(0);
    expect(decrement(0)).toBe(-1);
  });

  it('resets to zero', () => {
    expect(reset()).toBe(0);
  });
});
