import { twoSum } from '../../../src/challenges/partition/twoSum';

/**
 * Two Sum - Classic Array Problem
 * 
 * PROBLEM:
 * Given an array of integers nums and an integer target, return indices of 
 * the two numbers such that they add up to target. Exactly one solution exists.
 * You may not use the same element twice.
 * 
 * PATTERN: Hash map for complement lookup (one-pass).
 * TIME COMPLEXITY: O(n) - single pass through array
 * SPACE COMPLEXITY: O(n) - hash map storage
 * 
 * Hash map solution for finding two numbers that sum to target
 */
describe('Two Sum', () => {

  describe.each([
    { algorithm: twoSum, name: 'Two Sum' },
  ])('Test algorithm: $name', ({ algorithm }) => {
    describe.each([
      { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1], name: 'basic case - first two elements' },
      { input: { nums: [3, 2, 4], target: 6 }, expected: [1, 2], name: 'target found at end' },
      { input: { nums: [3, 3], target: 6 }, expected: [0, 1], name: 'duplicate numbers' },
      { input: { nums: [1, 2, 3, 4, 5], target: 9 }, expected: [3, 4], name: 'target at last two indices' },
      { input: { nums: [0, 4, 3, 0], target: 0 }, expected: [0, 3], name: 'target is zero with zeros in array' },
      { input: { nums: [-1, -2, -3, -4, -5], target: -8 }, expected: [2, 4], name: 'all negative numbers' },
      { input: { nums: [1, -1, 0], target: 0 }, expected: [0, 1], name: 'mix of positive, negative, and zero' },
      { input: { nums: [5, 5, 5, 5], target: 10 }, expected: [0, 1], name: 'all same numbers' },
      { input: { nums: [1, 1000000], target: 1000001 }, expected: [0, 1], name: 'large numbers' },
      { input: { nums: [-1000000, 1000000], target: 0 }, expected: [0, 1], name: 'large negative and positive' },
      { input: { nums: [1, 2], target: 3 }, expected: [0, 1], name: 'minimum array size' },
      { input: { nums: [0, 0], target: 0 }, expected: [0, 1], name: 'two zeros sum to zero' },
      { input: { nums: [1, 2, 3, 4, 5, 6, 7, 8, 9], target: 17 }, expected: [7, 8], name: 'sequential array' },
      { input: { nums: [230, 863, 916, 585, 981, 404, 316, 785, 88, 12, 70, 435, 384, 778, 887, 755, 740, 337, 86, 92, 325, 422, 815, 650, 920, 125, 277, 336, 221, 847, 168, 23, 677, 61, 400, 136, 874, 363, 394, 199, 863, 997, 794, 587, 124, 321, 212, 957, 764, 173, 314, 422, 927, 783, 930, 282, 306, 506, 44, 926, 691, 568, 68, 730, 933, 737, 531, 180, 414, 751, 28, 546, 60, 371, 493, 370, 527, 387, 43, 541, 13, 457, 328, 227, 652, 365, 430, 803, 59, 858, 538, 427, 583, 368, 375, 173, 809, 896, 370, 789], target: 542 }, expected: [28, 45], name: 'large array with many elements' },
    ])(`$name`, ({ input, expected }) => {
      it(`nums=[${input.nums.slice(0, 5).join(',')}${input.nums.length > 5 ? '...' : ''}], target=${input.target} returns [${expected.join(',')}]`, () => {
        const result = algorithm(input.nums, input.target);
        expect(result).toEqual(expected);
      });
    });

    // Test cases where no solution exists (though problem states one always exists)
    describe('Edge cases', () => {
      it('should handle case where no solution exists', () => {
        expect(algorithm([1, 2, 3], 10)).toBeNull();
      });
      
      it('should handle empty array', () => {
        expect(algorithm([], 5)).toBeNull();
      });
      
      it('should handle single element array', () => {
        expect(algorithm([5], 5)).toBeNull();
      });
    });
  });
});
