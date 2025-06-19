export interface IGenericPriorityQueue<T> {
  add(item: T): void;
  remove(): T | undefined;
  peek(): T | undefined;
  size(): number;
}

export class GenericPriorityQueue<T> implements IGenericPriorityQueue<T> {
  private heap: T[] = [];
  private readonly comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number = (a, b) => (a as number) - (b as number)) {
    this.comparator = comparator;
  }

  add(item: T): void {
    this.heap.push(item);
    this.bubbleUp();
  }

  remove(): T | undefined {
    if (this.size() === 0) return undefined;
    const top = this.heap[0];
    const end = this.heap.pop()!;
    if (this.size() > 0) {
      this.heap[0] = end;
      this.bubbleDown();
    }
    return top;
  }

  peek(): T | undefined {
    return this.heap[0];
  }

  size(): number {
    return this.heap.length;
  }

  private bubbleUp(): void {
    let idx = this.heap.length - 1;
    const element = this.heap[idx];
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.heap[parentIdx];
      if (this.comparator(element, parent) >= 0) break;
      this.heap[idx] = parent;
      idx = parentIdx;
    }
    this.heap[idx] = element;
  }

  private bubbleDown(): void {
    let idx = 0;
    const length = this.heap.length;
    const element = this.heap[0];
    while (true) {
      const leftIdx = 2 * idx + 1;
      const rightIdx = 2 * idx + 2;
      let swapIdx = idx;

      if (leftIdx < length && this.comparator(this.heap[leftIdx], this.heap[swapIdx]) < 0) {
        swapIdx = leftIdx;
      }
      if (rightIdx < length && this.comparator(this.heap[rightIdx], this.heap[swapIdx]) < 0) {
        swapIdx = rightIdx;
      }
      if (swapIdx === idx) break;
      this.heap[idx] = this.heap[swapIdx];
      idx = swapIdx;
    }
    this.heap[idx] = element;
  }
}

