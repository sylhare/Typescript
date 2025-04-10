import { MOD } from './twoPointersPathway';

/**
 * Computes the maximum sum starting from a given number in the map using memoization.
 * Recursively explores all possible paths starting from a given number (currentValue) and selects the path that maximizes the sum at each step.
 */
export function greedy(currentValue: number, map: Map<number, number[]>, memo: Map<number, number>): number {
  if (memo.has(currentValue)) {
    return memo.get(currentValue)!;
  }

  if (!map.has(currentValue)) {
    return currentValue;
  }

  let maxSum = 0;
  for (const next of map.get(currentValue)!) {
    maxSum = Math.max(maxSum, greedy(next, map, memo));
  }

  maxSum += currentValue;
  memo.set(currentValue, maxSum);
  return maxSum;
}

/**
 * Finds the maximum sum of paths starting from the first element of two arrays.
 * return result modulo 109 + 7.
 */
export function greedyPathway(nums1: number[], nums2: number[]): number {
  const map: Map<number, number[]> = new Map();

  // Step 1: Populate the map with connections from nums1 as a directed graph
  // A directed graph is a graph where the edges have a direction, meaning they go from one vertex to another.
  for (let i = 0; i < nums1.length - 1; i++) {
    if (!map.has(nums1[i])) {
      map.set(nums1[i], []);
    }
    map.get(nums1[i])!.push(nums1[i + 1]);
  }

  // Step 2: Same as step one but for nums2
  for (let i = 0; i < nums2.length - 1; i++) {
    if (!map.has(nums2[i])) {
      map.set(nums2[i], []);
    }
    map.get(nums2[i])!.push(nums2[i + 1]);
  }

  // (dynamic programming) Memoization: To avoid duplicate connections, we need to check if the next number is already in the map
  const memo: Map<number, number> = new Map();

  // Step 3: Compute the maximum sum for both starting points using a greedy approach
  // A greedy approach is a problem-solving strategy that makes the locally optimal choice at each stage with the hope of finding a global optimum.
  return Math.max(
    greedy(nums1[0], map, memo) % Number(MOD),
    greedy(nums2[0], map, memo) % Number(MOD),
  );
}