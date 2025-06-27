import { maxSpending, maxSpendingWithHeap } from '../../../src/challenges/heap/spending';
import { SimplePriorityQueue } from '../../../src/challenges/heap/SimplePriorityQueue';
import { PriorityQueue } from '../../../src/challenges/heap/PriorityQueue';
import { NumberPriorityQueue } from '../../../src/challenges/heap/NumberPriorityQueue';
import { MinHeap } from '../../../src/challenges/heap/MinHeap';

/**
 * Max Spending Challenge:
 * - shops are represented as an array of items
 * - items are represented as an array of prices
 * - each day you can buy one item from one shop
 * - the price of the item gets inflated times the number of days
 * What's the maximum amount of money can you spend buying all items (one each day)?
 */
describe('Max Spending', () => {

  describe.each([
    { algorithm: maxSpending, name: 'Naive approach' },
    { algorithm: maxSpendingWithHeap(new SimplePriorityQueue()), name: 'using simple heap' },
    { algorithm: maxSpendingWithHeap(new PriorityQueue()), name: 'using priority queue' },
    { algorithm: maxSpendingWithHeap(new NumberPriorityQueue()), name: 'using numerical priority queue' },
    { algorithm: maxSpendingWithHeap(new MinHeap()), name: 'using heap' },
  ])('Test algorithm $name', ({ algorithm }) => {
    describe.each([
      {
        input: [[8, 5, 2], [6, 4, 1], [9, 7, 3]],
        expected: 285,
        name: 'Example 1 (3x3 matrix)',
      },
      {
        input: [[10, 8, 6, 4, 2], [9, 7, 5, 3, 2]],
        expected: 386,
        name: 'Example 2 (2x5 matrix)',
      },
      {
        input: [[5]],
        expected: 5,
        name: 'Single shop, single item',
      },
      {
        input: [[3, 2, 1]],
        expected: 14, // 1*1 + 2*2 + 3*3 = 1 + 4 + 9 = 14
        name: 'Single shop, multiple items',
      },
      {
        input: [],
        expected: 0,
        name: 'Empty input',
      },
      {
        input: [[7], [6], [5]],
        expected: 38, // 5*1 + 6*2 + 7*3 = 5 + 12 + 21 = 38
        name: 'Multiple shops, one item each',
      },
    ])('$name', ({ input, expected }) => {
      it(`returns ${expected} `, () => {
        expect(algorithm(input)).toEqual(expected);
      });
    });
  });
});