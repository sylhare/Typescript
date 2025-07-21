/**
 * Each balloon has a number on it, and when you burst a balloon,
 * you gain coins equal to the product of the numbers on the surrounding balloons.
 * You need to find the maximum coins you can collect by bursting all the balloons.
 */
import { maxCoins } from '../../../src/challenges/dynamic/balloon';

describe('Balloon burst', () => {

  describe.each([
    { algorithm: maxCoins, name: '2D Dynamic Programming' },
  ])('Test algorithm: $name', ({ algorithm }) => {
    describe.each([
      { input: [3, 1, 5, 8], expected: 167, name: 'Example 1' },
      { input: [3, 1, 5], expected: 35, name: 'Example 2' },
      { input: [3, 1, 1, 1, 8], expected: 72, name: 'Example 3' },
      { input: [6, 2, 3], expected: 60, name: 'Example 4' },
      { input: [1, 5], expected: 10, name: 'No Problems' },
      { input: [], expected: 0, name: 'Empty array' },
      { input: [5], expected: 5, name: 'Single element' },
    ])(`$name`, ({ input, expected }) => {
      it(`returns ${expected}`, () => {
        expect(algorithm(input)).toEqual(expected);
      });
    });
  });
});