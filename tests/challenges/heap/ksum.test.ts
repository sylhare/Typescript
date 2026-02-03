import { kSum } from '../../../src/challenges/heap/KSum';

/**
 * K-Sum
 *
 * Given an integer array and a positive integer k, find the kth largest possible sum
 * that can be formed by adding elements from any subsequence of the array.
 *
 */
describe('K-Sum', () => {

  describe.each([
    { algorithm: (input: { nums: number[], k: number }) => kSum(input.nums, input.k), name: 'kSum' },
  ])('Test algorithm: $name', ({ algorithm }) => {
    describe.each([
      {
        input: { nums: [2, 4, -2], k: 5 },
        expected: 2,
        name: 'Example 1: 5th largest subsequence sum is 2',
      },
      {
        input: { nums: [1, -2, 3, 4, -10, 12], k: 16 },
        expected: 10,
        name: 'Example 2: 16th largest subsequence sum is 10',
      },
      {
        input: { nums: [5, 10, 15], k: 1 },
        expected: 30,
        name: 'K=1 should return the sum of all positive numbers',
      },
      {
        input: { nums: [1, 2, 3], k: 8 },
        expected: 0,
        name: 'K exceeds number of possible subsequences, returns 0',
      },
      {
        input: { nums: [-1, -2, -3], k: 1 },
        expected: 0,
        name: 'All negative numbers, largest sum is empty subsequence (0)',
      },
      {
        input: { nums: [5], k: 1 },
        expected: 5,
        name: 'Single element array, k=1',
      },
      {
        input: { nums: [5], k: 2 },
        expected: 0,
        name: 'Single element array, k=2 (returns empty subsequence)',
      },
      {
        input: { nums: [], k: 1 },
        expected: 0,
        name: 'Empty array returns 0',
      },
      {
        input: { nums: [10, -10, 20, -20], k: 3 },
        expected: 20,
        name: 'Mixed positive/negative numbers, k=3',
      },
      {
        input: { nums: [0, 0, 0], k: 4 },
        expected: 0,
        name: 'Array with only zeros',
      },
      {
        input: { nums: [1, 2, 3], k: 7 },
        expected: 1,
        name: 'Large k close to total number of subsequences',
      },
    ])(`$name`, ({ input, expected }) => {
      it(`returns ${expected}`, () => {
        expect(algorithm(input)).toEqual(expected);
      });
    });
  });
});
