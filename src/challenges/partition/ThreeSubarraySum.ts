/**
 * find three non-overlapping "subarrays" of length k with the maximum sum in the lexicographically smallest order.
 * ("lexicographically smallest order" means that if two sets of indices have the same sum, the one with the smaller indices should be chosen)
 *
 * nums = [1,2,1,2,6,7,5,1], k = 2
 * windowSum: [3, 3, 3, 8, 13, 12, 6]
 * left: [0, 0, 0, 3, 4, 4, 4]
 * right: [4, 4, 4, 4, 4, 5, 6]
 * result: [0, 3, 5]
 *
 * @param {number[]} nums - The input array of numbers.
 * @param {number} k - The size of each subarray.
 * @returns {number[]} - The indices of the three subarrays with the maximum sum.
 */
export function maxSumOfThreeSubarray(nums: number[], k: number): number[] {
  const n = nums.length;

  // Step 1: Compute the sum of each subarray of size k via a sliding window
  const windowSum: number[] = new Array(n - k + 1).fill(0);
  let currentSum = nums.slice(0, k).reduce((acc, val) => acc + val, 0);
  windowSum[0] = currentSum;

  for (let i = 1; i < windowSum.length; i++) {
    currentSum += nums[i + k - 1] - nums[i - 1]; // sliding the window to recompute the sum
    windowSum[i] = currentSum;
  }

  // Step 2: Compute the left maximum indices
  // It is a list of index that correspond to the max sum possible at each index.
  // Left is a monotonic stack of indices in an increasing order.
  const left: number[] = new Array(windowSum.length).fill(0);
  let maxIdx = 0;
  for (let i = 0; i < windowSum.length; i++) {
    if (windowSum[i] > windowSum[maxIdx]) {
      maxIdx = i;
    }
    left[i] = maxIdx; // store index for max sum before i
  }

  // Step 3: Same as step 2 but for the right side
  const right: number[] = new Array(windowSum.length).fill(0);
  maxIdx = windowSum.length - 1;
  for (let i = windowSum.length - 1; i >= 0; i--) {
    if (windowSum[i] >= windowSum[maxIdx]) {
      maxIdx = i;
    }
    right[i] = maxIdx;
  }

  // Step 4: Find the three (sub)arrays with the maximum sum
  // With left and right being a monotomic stack with the indice of the maximum sum array at any index indices
  // We just need to iterate the middle in its possible range to find the maximum sum
  let maxSum = 0;
  let result: number[] = [-1, -1, -1];
  for (let middle = k; middle < windowSum.length - k; middle++) {
    const l = left[middle - k];
    const r = right[middle + k];
    const total = windowSum[l] + windowSum[middle] + windowSum[r];
    if (total > maxSum) {
      maxSum = total;
      result = [l, middle, r];
    } else if (total === maxSum) {
      result = [l, middle, r].map((val, idx) => Math.min(result[idx], val));
    }
  }

  return result;
}
