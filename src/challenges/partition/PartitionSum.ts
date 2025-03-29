import { closest } from './closest';
import { Subset, subsetsBacktrack } from './subset';

export class PartitionSum {

  constructor(readonly subsets: (arr: number[]) => Subset) {
    this.minimumDifference = this.minimumDifference.bind(this);
  }

  static Solve(subsetMethod = subsetsBacktrack): (nums: number[]) => number {
    return new PartitionSum(subsetMethod).minimumDifference;
  }

  minimumDifference(nums: number[]): number {
    const n = Math.floor(nums.length / 2);
    const totalSum = nums.reduce((acc, val) => acc + val, 0);
    const left = nums.slice(0, n);
    const right = nums.slice(-n);

    const leftSubsets = this.subsets(left);
    const rightSubsets = this.subsets(right);
    let minDiff = Infinity;

    for (const subsetSize in leftSubsets) {
      const leftSubset = leftSubsets[subsetSize];
      const rightSubset = rightSubsets[n - parseInt(subsetSize)];

      for (const leftSum of leftSubset) {
        const target = Math.floor(totalSum / 2) - leftSum;
        const closestRightSum = closest(rightSubset, target);
        const currentDiff = Math.abs(totalSum - 2 * (leftSum + closestRightSum));
        minDiff = Math.min(minDiff, currentDiff);
      }
    }

    return minDiff;
  }
}