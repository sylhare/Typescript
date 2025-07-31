/**
 * Iterative solution using dynamic programming
 *
 * 1. Create a map where keys are stone positions and values are sets of possible jump sizes that can reach that position
 * 2. Initialize position 0 with a jump size of 0
 * 3. For each stone:
 *   - For each possible jump size that can reach this stone
 *   - Calculate next possible jumps (k-1, k, k+1)
 *   - If next position exists in the stones array, record that jump size
 * 4. Return true if the last stone has any possible jump sizes (meaning it's reachable)
 **/
export function canCross(stones: number[]): boolean {
  if (stones.length === 0 || stones[0] !== 0) return false;
  const n = stones.length;
  const dp: Map<number, Set<number>> = new Map();

  for (let i = 0; i < n; i++) {
    dp.set(stones[i], new Set());
  }

  dp.get(0)!.add(0); // Starting point with jump of 0

  for (let i = 0; i < n; i++) {
    const stone = stones[i];
    for (const jump of dp.get(stone)!) {
      for (let nextJump = jump - 1; nextJump <= jump + 1; nextJump++) {
        const nextStone = stone + nextJump;
        // eslint-disable-next-line max-depth
        if (dp.has(nextStone)) {
          dp.get(nextStone)!.add(nextJump);
        }
      }
    }
  }

  return dp.get(stones[n - 1])!.size > 0;
}

/**
 * Recursive solution with memoization (Track visited states with [position + jump size combinations])
 */
export function canCrossRecursive(stones: number[]): boolean {
  const n = stones.length;
  const stoneSet = new Set(stones);
  const visited = new Set<string>();

  if (stones.length === 0 || stones[0] !== 0) return false;
  if (stones.length === 1) return true;

  return goFurther(0, 1);

  function goFurther(position: number, jumpSize: number): boolean {
    const nextPosition = position + jumpSize;
    const key = `${position},${jumpSize}`;

    if (!stoneSet.has(nextPosition) || visited.has(key)) return false;
    if (nextPosition === stones[n - 1]) return true;

    visited.add(key);

    return (
      goFurther(nextPosition, jumpSize) ||
      goFurther(nextPosition, jumpSize - 1) ||
      goFurther(nextPosition, jumpSize + 1)
    );
  }
}