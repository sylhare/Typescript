export function maxCoins(iNums: number[]): number {
  const nums: number[] = [1, ...iNums.filter(i => i > 0), 1];
  const n: number = nums.length;
  const dp: number[][] = Array(n).fill(null).map(() => Array(n).fill(0));

  for (let balloonRange = 2; balloonRange < n; balloonRange++) {
    for (let left = 0; left < n - balloonRange; left++) {
      const right = left + balloonRange;
      for (let balloonToBurst = left + 1; balloonToBurst < right; balloonToBurst++) {
        dp[left][right] = Math.max(
          dp[left][right],
          nums[left] * nums[balloonToBurst] * nums[right] + dp[left][balloonToBurst] + dp[balloonToBurst][right]
        );
      }
    }
  }
  return dp[0][n - 1];
}