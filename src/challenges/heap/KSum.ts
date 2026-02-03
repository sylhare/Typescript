import { GenericPriorityQueue } from './GenericPriorityQueue';

export function kSum(nums: number[], k: number): number {
  if (nums.length === 0 || k <= 0) return 0;

  const maxSum = nums.filter(x => x > 0).reduce((a, b) => a + b, 0);
  const sorted = nums.map(x => Math.abs(x)).sort((a, b) => a - b);
  const pq = new GenericPriorityQueue<[number, number]>((a, b) => b[0] - a[0]);
  pq.add([maxSum, 0]);

  let result = maxSum;
  for (let i = 0; i < k; i++) {
    const entry = pq.remove();
    if (!entry) break;
    const [sum, index] = entry;
    result = sum;

    if (index < sorted.length) {
      pq.add([result - sorted[index], index + 1]);
      if (index > 0) {
        pq.add([result - sorted[index] + sorted[index - 1], index + 1]);
      }
    }
  }

  return result;
}
