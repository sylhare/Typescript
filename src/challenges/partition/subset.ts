/**
 * Generates all possible subset sums using a backtracking approach.
 * For each number in the array, we have two choices: include it in the sum or not.
 * The "backtracking" happens when we:
 * 1. Include a number (make a choice)
 * 2. Explore all possibilities with that number included
 * 3. Remove the number (backtrack) to try without it
 *
 * @example
 * generateSubsetsBacktrack([1, 2]) // returns [0, 1, 2, 3]
 * // Backtracking process:
 * // Start with [] = 0
 * // Include 1: [1] = 1
 * //   Include 2: [1,2] = 3
 * //   Backtrack (remove 2): [1] = 1
 * // Backtrack (remove 1): [] = 0
 * // Include 2: [2] = 2
 *
 * @param nums - Array of numbers to generate subset sums from
 * @returns Array of all possible subset sums
 */
export function generateSubsetsBacktrack(nums: number[]): number[] {
  const result: number[] = [];
  const currentSubset: number[] = [];

  function backtrack(start: number) {
    const currentSum = currentSubset.reduce((sum, num) => sum + num, 0);
    result.push(currentSum);

    for (let i = start; i < nums.length; i++) {
      currentSubset.push(nums[i]);
      backtrack(i + 1);
      currentSubset.pop();
    }
  }

  backtrack(0);
  return result;
}

/**
 * Generates all possible subset sums using an iterative approach.
 * For each number, we add it to all previously computed sums to generate new sums.
 * The iterative process:
 * 1. Start with sum of empty set [0]
 * 2. For each number, add it to all existing sums
 * 3. Keep track of all sums seen so far
 *
 * @example
 * generateSubsetsIteratively([1, 2]) // returns [0, 1, 2, 3]
 * // Step by step:
 * // 1. Start with empty subset:
 * //    result = [0]
 * // 2. Process 1:
 * //    - Take 0, add 1 → 0+1 = 1
 * //    result = [0, 1]
 * // 3. Process 2:
 * //    - Take 0, add 2 → 0+2 = 2
 * //    - Take 1, add 2 → 1+2 = 3
 * //    result = [0, 1, 2, 3]
 *
 * @param nums - Array of numbers to generate subset sums from
 * @returns Array of all possible subset sums
 */
export function generateSubsetsIteratively(nums: number[]): number[] {
  const result: number[] = [0];

  for (const num of nums) {
    const currentLength = result.length;
    for (let i = 0; i < currentLength; i++) {
      result.push(result[i] + num);
    }
  }

  return result;
}

/**
 * Generates all possible subset sums using bit manipulation.
 * Uses binary numbers from 0 to 2^n-1 to represent all possible combinations.
 * Each bit position represents whether to include the number at that index.
 * The bitmask process:
 * 1. Generate all binary numbers from 0 to 2^n-1
 * 2. Each bit represents a yes/no decision for including a number
 * 3. Sum the numbers where the corresponding bit is 1
 *
 * @example
 * generateSubsetBitmasks([1, 2]) // returns [0, 1, 2, 3]
 * // Step by step with binary numbers:
 * // 1. i = 0 (00 in binary):
 * //    - First bit 0: don't include 1
 * //    - Second bit 0: don't include 2
 * //    Sum = 0
 * // 2. i = 1 (01 in binary):
 * //    - First bit 1: include 1
 * //    - Second bit 0: don't include 2
 * //    Sum = 1
 * // 3. i = 2 (10 in binary):
 * //    - First bit 0: don't include 1
 * //    - Second bit 1: include 2
 * //    Sum = 2
 * // 4. i = 3 (11 in binary):
 * //    - First bit 1: include 1
 * //    - Second bit 1: include 2
 * //    Sum = 3
 *
 * @param nums - Array of numbers to generate subset sums from
 * @returns Array of all possible subset sums
 */
export function generateSubsetBitmasks(nums: number[]): number[] {
  const n = nums.length;
  const subsetSums: number[] = [];

  for (let i = 0; i < (1 << n); i++) {
    let sum = 0;
    for (let j = 0; j < n; j++) {
      if (i & (1 << j)) {
        sum += nums[j];
      }
    }
    subsetSums.push(sum);
  }

  return subsetSums;
}