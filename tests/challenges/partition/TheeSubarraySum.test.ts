import { maxSumOfThreeSubarray } from '../../../src/challenges/partition/ThreeSubarraySum';

describe('maxSumOfThreeSubarray', () => {
  it('should return the indices of three subarrays with the maximum sum', () => {
    const nums = [1, 2, 1, 2, 6, 7, 5, 1];
    const k = 2;
    const result = maxSumOfThreeSubarray(nums, k);
    expect(result).toEqual([0, 3, 5]);
  });

  it('should handle cases with no overlapping subarrays', () => {
    const nums = [4, 3, 2, 1, 5, 6, 7, 8];
    const k = 2;
    const result = maxSumOfThreeSubarray(nums, k);
    expect(result).toEqual([0, 4, 6]);
  });

  it('should handle edge cases with small arrays', () => {
    const nums = [1, 2, 3, 4, 5, 6];
    const k = 2;
    const result = maxSumOfThreeSubarray(nums, k);
    expect(result).toEqual([0, 2, 4]);
  });

  it('should handle cases with all elements being the same', () => {
    const nums = [5, 5, 5, 5, 5, 5, 5, 5];
    const k = 3;
    const result = maxSumOfThreeSubarray(nums, k);
    expect(result).toEqual([0, 2, 4]);
  });

  it('should handle cases with alternating patterns', () => {
    const nums = [1, 2, 1, 2, 1, 2, 1, 2, 1];
    const k = 2;
    const result = maxSumOfThreeSubarray(nums, k);
    expect(result).toEqual([0, 2, 4]);
  });
});