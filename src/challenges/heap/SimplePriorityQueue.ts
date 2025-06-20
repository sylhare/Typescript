import { INumberPriorityQueue } from './NumberPriorityQueue';

/**
 * Works like a priority queue, but all the performance advantages of a heap are lost.
 */
export class SimplePriorityQueue implements INumberPriorityQueue {
  private arr: number[] = [];

  add(item: number): void {
    this.arr.push(item);
    this.arr.sort((a, b) => a - b);
  }

  remove(): number | undefined {
    return this.arr.shift();
  }

  peek(): number | undefined {
    return this.arr[0];
  }

  size(): number {
    return this.arr.length;
  }
}