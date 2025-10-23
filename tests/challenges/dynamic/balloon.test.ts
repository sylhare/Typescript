/**
 * Each balloon has a number on it, and when you burst a balloon,
 * you gain coins equal to the product of the numbers on the surrounding balloons.
 * You need to find the maximum coins you can collect by bursting all the balloons.
 */
import { greedyMaxCoins, maxCoins, maxCoinsRecursive } from '../../../src/challenges/dynamic/balloon';

describe('Balloon burst', () => {

  describe.each([
    { algorithm: maxCoins, name: 'Iterative approach' },
    { algorithm: maxCoinsRecursive, name: 'Recursive approach' },
  ])('Test algorithm: $name', ({ algorithm }) => {
    describe.each([
      { input: [3, 1, 5, 8], expected: 167, name: 'Example 1' },
      { input: [3, 1, 5], expected: 35, name: 'Example 2' },
      { input: [3, 1, 1, 1, 8], expected: 72, name: 'Example 3' },
      { input: [6, 2, 3], expected: 60, name: 'Example 4' },
      { input: [1, 5], expected: 10, name: 'No Problems' },
      { input: [], expected: 0, name: 'Empty array' },
      { input: [5], expected: 5, name: 'Single element' },
      { input: [0, 0, 0], expected: 0, name: 'all zeros' },
      { input: [7, 9, 8, 0, 2], expected: 637, name: 'balloons with zero' },
      { input: [1, 0, 1], expected: 2, name: 'zero in middle' },
      { input: [0, 1, 0], expected: 1, name: 'non-zero in middle' },
      { input: [1, 1, 1], expected: 3, name: 'all same values' },
      { input: [2, 4, 6], expected: 66, name: 'ascending values' },
      { input: [6, 4, 2], expected: 66, name: 'descending values' },
      { input: [1, 2, 3, 4, 5], expected: 110, name: 'sequential balloons' },
    ])(`$name`, ({ input, expected }) => {
      it(`returns ${expected}`, () => {
        expect(algorithm(input)).toEqual(expected);
      });
    });
  });

  it('does not work with greedy approach', () => {
    expect(greedyMaxCoins([3, 1, 1, 1, 8])).toEqual(72); // works for some cases
    const optimalSolution = 167; //
    expect(greedyMaxCoins([1, 3, 1, 5, 8])).not.toEqual(optimalSolution);
  });
});