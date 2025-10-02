/**
 * Two Sum
 * @param nums array of integers
 * @param target target sum
 * @returns indices [i, j] of two numbers that add up to target, or null if none
 */
export function twoSum(nums: number[], target: number): number[] | null {
  const store = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const other = target - nums[i];
    const otherIndex = store.get(other);
    if (otherIndex !== undefined) {
      return [otherIndex, i];
    } else {
      store.set(nums[i], i);
    }
  }
  return null;
}
