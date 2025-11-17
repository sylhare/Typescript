/**
 * choice at each house: rob or not rob
 *   - if rob, cannot rob previous house
 *   - if not rob, can rob previous house
 *
 * Maximum amount that can be robbed up to house:
 * current one is stolen if stolen last (i-1) value above stolen before last (i-2) and current house value
 *
 * rob(i) = Math.max(rob(i - 2) + currentHouseValue, rob(i - 1))
 *
 * With dp the max at each house we have:
 * dp[i] = max(dp[i-1], dp[i-2] + k)
 */
export function rob(nums: number[]): number {
  if (nums.length === 0) return 0;
  const n = nums.length;
  const dp = Array(n).fill(0);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < n; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }
  return dp[n - 1];
}

/**
 * We use recursion with memoization.
 * The memo array stores the maximum amount that can be robbed up to house i.
 * If it's already computed (memo[index] !== -1), we return the stored value.
 * Otherwise, we compute it.
 */
export function robRecursive(nums: number[]): number {
  const n = nums.length;
  const memo: number[] = Array(n).fill(-1);

  function robFrom(index: number): number {
    if (index < 0) return 0;
    if (memo[index] !== -1) return memo[index];
    memo[index] = Math.max(robFrom(index - 2) + nums[index], robFrom(index - 1));
    return memo[index];
  }

  return robFrom(n - 1);
}
/**
 * With house adjacent in a circle, we can't rob both the first and last house.
 * So we consider two cases:
 * 1. Rob houses from index 0 to n-2 (exclude the last house)
 * 2. Rob houses from index 1 to n-1 (exclude the first house)
 * The result is the maximum of the two cases.
 */
export function robII(nums: number[]): number {
  const n = nums.length;
  if (n === 0) return 0;
  if (n === 1) return nums[0];
  return Math.max(rob(nums.slice(1)), rob(nums.slice(0, n - 1)));
}