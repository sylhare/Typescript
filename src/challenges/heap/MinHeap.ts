import { INumberPriorityQueue } from './NumberPriorityQueue';

/**
 * Almost the same as the GenericPriorityQueue with numbers directly.
 */
export class MinHeap implements INumberPriorityQueue {
  heap: number[] = [];

  add(element: number): void {
    this.heap.push(element);
    this.bubbleUp();
  }

  peek(): number | undefined {
    return this.heap[0];
  }

  remove(): number | undefined {
    if (this.heap.length === 0) return undefined;
    const min = this.heap[0];
    const end = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.bubbleDown();
    }
    return min;
  }

  size(): number {
    return this.heap.length;
  }

  private bubbleUp(): void {
    let idx = this.heap.length - 1;
    const last = this.heap[idx];
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.heap[parentIdx];
      if (last >= parent) break;
      this.heap[idx] = parent;
      this.heap[parentIdx] = last;
      idx = parentIdx;
    }
  }

  private bubbleDown(): void {
    let idx = 0;
    const length = this.heap.length;
    const root = this.heap[0];
    while (true) {
      const leftIdx = 2 * idx + 1;
      const rightIdx = 2 * idx + 2;
      let swap = null;

      if (leftIdx < length && this.heap[leftIdx] < root) {
        swap = leftIdx;
      }
      if (rightIdx < length && (
        (swap === null && this.heap[rightIdx] < root) ||
        (swap !== null && this.heap[rightIdx] < this.heap[leftIdx])
      )) {
        swap = rightIdx;
      }
      if (swap === null) break;
      this.heap[idx] = this.heap[swap];
      this.heap[swap] = root;
      idx = swap;
    }
  }
}