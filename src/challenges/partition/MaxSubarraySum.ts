/**
 * Find the maximum sum of a contiguous subarray in an array of integers.
 * Kadane's algorithm
 * - If the current sum is negative, start a new subarray.
 * - If the current sum is positive, add the current element to it.
 */
export function maxSubarraySum(nums: number[]): number {
  let maxSum = nums[0], currentSum = 0;
  for (let i = 0; i < nums.length; i++) {
    currentSum += nums[i];
    if (currentSum < 0) { // Start a new subarray with next element when current sum is negative
      currentSum = 0;
    } else if (currentSum > maxSum) {
      maxSum = currentSum;
    }
  }
  return maxSum;
}

export function maxSubarraySumAlt(nums: number[]): number {
  let maxSum = nums[0];
  let currentSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]); // only true if currentSum is negative
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

/**
 * Building out all possible subarray and finding the maximum sum.
 */
export function maxSubarraySumAll(nums: number[]): number {
  let maxSum = nums[0];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {   // going from left to right (with right, the end of the array)
    //for (let j = nums.length; j > i; j--) {         // going from right to left
      const subArraySum = nums.slice(i, j + 1).reduce((sumAcc, current) => sumAcc + current, 0);
      maxSum = Math.max(maxSum, subArraySum);
    }
  }
  return maxSum;
}

