import { closestIndex } from './closest';

export class PartitionSum {

  static Solve(nums: number[]): number {
    return new PartitionSum().minimumDifference(nums);
  }

  minimumDifference(nums: number[]): number {
    const n = Math.floor(nums.length / 2);
    const totalSum = nums.reduce((acc, val) => acc + val, 0);
    const left = nums.slice(0, n);
    const right = nums.slice(-n);

    const leftSubsets = this.subsets(left);
    const rightSubsets = this.subsets(right);
    let minimumDifference = Infinity;
    for (const subsetSize in leftSubsets) {
      const leftSubset = leftSubsets[subsetSize];
      const rightSubset = rightSubsets[n - parseInt(subsetSize)];

      for (const val of leftSubset) {
        const target = Math.floor(totalSum / 2) - val;
        const closestIndex = this.bisectLeft(rightSubset, target);

        for (const j of [closestIndex, closestIndex - 1]) {
          // eslint-disable-next-line max-depth
          if (0 <= j && j < rightSubset.length) {
            const s = val + rightSubset[j];
            const diff = Math.abs((totalSum - s) - s);
            minimumDifference = Math.min(minimumDifference, diff);
          }
        }
      }
    }

    return minimumDifference;
  }

  bisectLeft(arr: number[], target: number): number {
    return closestIndex(arr, target);
  }

  private subsets(arr: number[]): { [key: number]: number[] } {
    const subset: { [key: number]: number[] } = {};
    for (let i = 0; i <= arr.length; i++) {
      subset[i] = [];
    }

    backtrack(0, 0, 0);

    for (const subsetSize in subset) {
      subset[subsetSize].sort((a, b) => a - b);
    }

    return subset;

    function backtrack(i: number, currentSum: number, currentSize: number): void {
      if (i === arr.length) {
        subset[currentSize].push(currentSum);
        return;
      }
      backtrack(i + 1, currentSum, currentSize);
      backtrack(i + 1, currentSum + arr[i], currentSize + 1);
    }
  }

  static getSubsetSums(arr: number[]): number[] {
    const partitionSum = new PartitionSum();
    const subsets = partitionSum.subsets(arr);
    const subsetSums: number[] = [];

    for (const key in subsets) {
      subsetSums.push(...subsets[key]);
    }

    return subsetSums;
  }
}