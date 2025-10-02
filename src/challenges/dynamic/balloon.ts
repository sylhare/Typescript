/**
 * nums is the padded array of balloons, where each balloon has a value.
 * dp is a 2D array where dp[i][j] represents the maximum coins that can be collected
 * by bursting all balloons between index i and j (exclusive).
 * The algorithm iterates through all possible subarrays of balloons,
 * and for each subarray, it considers every possible last balloon to burst.
 *
 * @param iNums
 */
export function maxCoins(iNums: number[]): number {
  const nums: number[] = [1, ...iNums.filter(i => i > 0), 1];
  const n: number = nums.length;
  const dp: number[][] = Array.from({ length: nums.length }, () => Array.from(nums).fill(0));

  for (let subarrayLength = 2; subarrayLength < n; subarrayLength++) {
    for (let i = 0; i < n - subarrayLength; i++) {
      const j = i + subarrayLength;
      for (let k = i + 1; k < j; k++) {
        dp[i][j] = Math.max(dp[i][j], dp[i][k] + nums[i] * nums[k] * nums[j] + dp[k][j]);
      }
    }
  }
  return dp[0][n - 1];
}

export function maxCoinsRecursive(iNums: number[]): number {
  const nums: number[] = [1, ...iNums.filter(i => i > 0), 1];
  const n: number = nums.length;
  const memo: number[][] = Array(n).fill(null).map(() => Array(n).fill(-1));

  return burst(0, n - 1);

  /**
   * Recursive function to calculate maximum coins
   * For subarray from index i to j (exclusive)
   */
  function burst(i: number, j: number): number {
    if (i >= j - 1) return 0;
    if (memo[i][j] !== -1) return memo[i][j];

    let maxCoins = 0;

    for (let k = i + 1; k < j; k++) {
      const coins = burst(i, k) +
        nums[i] * nums[k] * nums[j] +
        burst(k, j);
      maxCoins = Math.max(maxCoins, coins);
    }

    memo[i][j] = maxCoins;
    return maxCoins;
  }
}