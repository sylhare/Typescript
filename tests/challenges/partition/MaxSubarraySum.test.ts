import { maxSubarraySum, maxSubarraySumAlt } from '../../../src/challenges/partition/MaxSubarraySum';

describe('MaxSubarraySum', () => {
  describe.each([
    { algorithm: maxSubarraySum, name: 'Kadane with if/else' },
    { algorithm: maxSubarraySumAlt, name: 'Kadane with Max' },
  ])(`Test algorithm %s`, ({ algorithm, name }) => {
    describe.each([
      { input: [-1, -2, 3, 4, -5, 6], expected: 8 }, // Subarray: [3, 4, -5, 6]
      { input: [1, 2, 3, 4], expected: 10 }, // Entire array is the subarray
      { input: [-2, 1, -3, 4, -1, 2, 1, -5, 4], expected: 6 }, // Subarray: [4, -1, 2, 1]
      { input: [1, 2, -3, -1, -2, 1, 2, 3, -1, -2, 1], expected: 6 }, // Subarray: [1, 2, 3]
      { input: [5, 4, -1, 7, 8], expected: 23 }, // Subarray: [5, 4, -1, 7, 8]
      { input: [-1, -2, -3, -4], expected: -1 }, // Single largest negative number
      { input: [0, 0, 0, 0], expected: 0 }, // All zeros
      { input: [1], expected: 1 }, // Single element array
      { input: [-1], expected: -1 }, // Single negative element array
      { input: [100, -1, 2, -3, 4, -5, 6], expected: 103 }, // Subarray: [100, -1, 2, -3, 4, -5, 6]
    ])(` ${name} with input $input`, ({ input, expected }) => {
      it(`returns ${expected}`, () => {
        expect(algorithm(input)).toEqual(expected);
      });
    });
  });
});