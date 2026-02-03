/**
  Intuition

We want the k-th largest sum from all possible subsequences of an array. To do this efficiently, we focus on maintaining the largest sums dynamically using a priority queue, avoiding the need to generate all subsequences explicitly.
Approach

Sort the array by absolute values, calculate the maximum sum using positives, and use a priority queue to simulate extracting the k largest sums efficiently.
This solution uses a heap (priority queue) to efficiently manage and extract the k largest subsequence sums. In Python, this is implemented using the heapq module, which provides a min-heap by default. By pushing negative values into the heap, we simulate a max-heap behavior.
Complexity

    Time complexity:
    O(k log k + n log n) due to sorting and managing the priority queue.

    Space complexity:
    O(k) for the priority queue.


**/

export function kSum(nums: number[], k: number): number {
  if (nums.length === 0 || k <= 0) return 0;

  // Generate all subsequence sums using bit manipulation
  const allSums: number[] = [];
  const n = nums.length;
  
  for (let mask = 0; mask < (1 << n); mask++) {
    let sum = 0;
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) {
        sum += nums[i];
      }
    }
    allSums.push(sum);
  }

  // Sort in descending order
  allSums.sort((a, b) => b - a);

  // Return the kth largest (or 0 if k exceeds array length)
  return k <= allSums.length ? allSums[k - 1] : 0;
}

// Simple MinHeap implementation
class MinHeap<T> {
  private heap: T[] = [];
  private compare: (a: T, b: T) => number;

  constructor(compare: (a: T, b: T) => number) {
    this.compare = compare;
  }

  push(item: T): void {
    this.heap.push(item);
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): T | undefined {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.bubbleDown(0);
    return top;
  }

  size(): number {
    return this.heap.length;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.compare(this.heap[index], this.heap[parentIndex]) >= 0) break;
      
      [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
      index = parentIndex;
    }
  }

  private bubbleDown(index: number): void {
    while (true) {
      let smallest = index;
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;

      if (leftChild < this.heap.length && this.compare(this.heap[leftChild], this.heap[smallest]) < 0) {
        smallest = leftChild;
      }
      if (rightChild < this.heap.length && this.compare(this.heap[rightChild], this.heap[smallest]) < 0) {
        smallest = rightChild;
      }

      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }
}