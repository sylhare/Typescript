import { rob, robRecursive } from '../../../src/challenges/dynamic/rob';

describe('House Robber', () => {

  /**
   * Rob
   * Each house in a street has a certain amount of money stashed.
   * Adjacent houses have security systems connected,
   * and it will automatically contact the police if two adjacent houses were broken into on the same night.
   * Given an integer array nums representing the value of each house,
   * return the maximum amount of money you can rob tonight without alerting the police.
   */
  describe.each([
    { algorithm: rob, name: 'Iterative DP' },
    { algorithm: robRecursive, name: 'Recursive with Memoization' }
  ])('I. Test algorithm: $name', ({ algorithm }) => {
    describe.each([
      { input: [], expected: 0, name: 'Empty street' },
      { input: [5], expected: 5, name: 'Single house' },
      { input: [3, 1], expected: 3, name: 'Two houses' },
      { input: [1, 2, 3, 1], expected: 4, name: 'Example case 1' },
      { input: [2, 7, 9, 3, 1], expected: 12, name: 'Example case 2' },
      { input: [2, 1, 1, 2], expected: 4, name: 'Alternating pattern' },
      { input: [10, 1, 1, 10], expected: 20, name: 'Skip two houses' },
    ])(`$name`, ({ input, expected }) => {
      it(`returns ${expected}`, () => {
        expect(algorithm(input)).toEqual(expected);
      });
    });
  });
