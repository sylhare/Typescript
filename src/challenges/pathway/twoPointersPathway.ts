export const MOD = BigInt(10 ** 9 + 7);
export const NEGATIVE_INFINITY = -1n * BigInt(Number.MAX_SAFE_INTEGER);

/**
 * Finds the maximum sum of paths starting from the first element of two arrays.
 * The function uses a two-pointer approach and memoization to calculate the result.
 *
 */
export function twoPointersPathway(nums1: number[], nums2: number[]): number {
  // Memoization (DP) to store the maximum sum for each number to avoid re-computation
  const memo = new Map<bigint, bigint>();
  let ptr1 = nums1.length - 1;
  let ptr2 = nums2.length - 1;
  // Step 1: Convert to BigInt to handle large numbers
  const nums1Big = nums1.map(n => BigInt(n));
  const nums2Big = nums2.map(n => BigInt(n));

  // Step 2: Traverse both arrays from the end to the beginning
  while (ptr1 >= 0 || ptr2 >= 0) {
    const value1 = ptr1 >= 0 ? nums1Big[ptr1] : NEGATIVE_INFINITY;
    const value2 = ptr2 >= 0 ? nums2Big[ptr2] : NEGATIVE_INFINITY;

    // Step 5: Compute the maximum sum for the current values
    // If values are equal, calculate two candidates for the maximum sum, move both pointers
    // If value2 is greater, update dp for value2 and move ptr2 2
    // If value1 is greater, update dp for value1 and move ptr1
    if (value1 === value2) {
      const candidate1 = value1 + (memo.get(nums2Big[ptr2 + 1] || 0n) || 0n);
      const candidate2 = value2 + (memo.get(nums1Big[ptr1 + 1] || 0n) || 0n);
      memo.set(value1, BigInt(Math.max(Number(candidate1), Number(candidate2))));
      ptr1--;
      ptr2--;
    } else if (value2 > value1) {
      memo.set(value2, value2 + (memo.get(nums2Big[ptr2 + 1] || 0n) || 0n));
      ptr2--;
    } else {
      memo.set(value1, value1 + (memo.get(nums1Big[ptr1 + 1] || 0n) || 0n));
      ptr1--;
    }
  }

  return Math.max(
    Number(memo.get(nums1Big[0])! % MOD),
    Number(memo.get(nums2Big[0])! % MOD)
  );
}