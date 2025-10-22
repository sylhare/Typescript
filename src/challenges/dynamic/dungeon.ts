/**
 * We can build the solution by going from the princess' cell to the entrance's cell.
 * We know we need at least 1 health on the princess' cell, we can build from there.
 * We will use dp that will calculate the minimum health needed to reach the princess cell from each cell.
 *
 *  The base case dp[n][n] should be:
 *  - dp[n][n] = dungeon[n][n] > 0 ? 1: 1 + Math.abs(dungeon[n][n])
 *  which can be simplified to:
 *  - dp[n][n] = Math.max(1, 1 - dungeon[n][n])
 *
 * We need to try left or up
 *   For choosing between up or left, I need to know which one would require the least health
 *   - left: dp[n][n-1]
 *   - up: dp[n-1][n]
 *
 *   For the first one on the left, you can't go down, only right, so it would look like:
 *   - dp[n][n-1] = Math.max(1, dp[n][n] - dungeon[n-1][n-1])
 *
 *   For anywhere else, you could have down or right.
 *   To avoid going off the dungeon, we'll have an extra row and column set to Infinity.
 *   This gives us the transition function:
 *   - dp[i][j] = Math.max(1, Math.min(dp[i+1][j], dp[i][j+1]) - dungeon[i][j])
 *
 *   For base case dp[n][n] to pass, we need to set dp[n+1][n] and dp[n][n+1] to 1
 *   - dp[n][n] = Math.max(1, Math.min(dp[n+1][n], dp[n][n+1]) - dungeon[n][n])
 *              = Math.max(1, 1 - dungeon[n][n])
 *
 *   Now we can build dp with the transition function by going through each cell
 *   from left to right, bottom to top starting from dp[n][n].
 *
 *   Finally, we return dp[0][0] which will give the minimum health needed to start the dungeon.
 */
export function traversalHealth(dungeon: number[][]): number {
  const m = dungeon.length;
  const n = dungeon[0].length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(Infinity));

  dp[m][n - 1] = 1;
  dp[m - 1][n] = 1;

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      dp[i][j] = Math.max(1, Math.min(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j]);
    }
  }

  return dp[0][0];
}

/**
 * Recursive version with memoization (Bottom up)
 */
export function traversalHealthRecursive(dungeon: number[][]): number {
  const m = dungeon.length;
  const n = dungeon[0].length;
  const memo: number[][] = Array.from({ length: m }, () => Array(n).fill(-1));

  function minHealth(i: number, j: number): number {
    if (i === m - 1 && j === n - 1) return Math.max(1, 1 - dungeon[i][j]); // Base case: princess cell
    if (memo[i][j] !== -1) return memo[i][j]; // Check memoization

    let rightPath = Infinity;
    let downPath = Infinity;
    if (j + 1 < n) rightPath = minHealth(i, j + 1); // Try moving right
    if (i + 1 < m) downPath = minHealth(i + 1, j); // Try moving down

    const result = Math.max(1, Math.min(rightPath, downPath) - dungeon[i][j]);
    memo[i][j] = result;
    return result;
  }

  return minHealth(0, 0);
}