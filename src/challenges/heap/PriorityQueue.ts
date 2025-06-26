import { INumberPriorityQueue } from './NumberPriorityQueue';

export class PriorityQueue implements INumberPriorityQueue {
  private heap: number[] = [];

  private leftChild(parentIndex: number): number {
    return 2 * parentIndex + 1;
  }

  private rightChild(parentIndex: number): number {
    return 2 * parentIndex + 2;
  }

  private parent(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  private swap(indexOne: number, indexTwo: number): void {
    [this.heap[indexOne], this.heap[indexTwo]] = [this.heap[indexTwo], this.heap[indexOne]];
  }

  peek(): number | undefined {
    return this.heap.length === 0 ? undefined : this.heap[0];
  }

  remove(): number | undefined {
    if (this.heap.length === 0) return undefined;
    const item = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.bubbleDown();
    return item;
  }

  add(item: number): void {
    this.heap.push(item);
    this.bubbleUp();
  }

  size(): number {
    return this.heap.length;
  }

  private bubbleUp(): void {
    let index = this.heap.length - 1;
    while (index > 0 && this.heap[this.parent(index)] > this.heap[index]) {
      this.swap(index, this.parent(index));
      index = this.parent(index);
    }
  }

  private bubbleDown(): void {
    let index = 0;
    while (this.leftChild(index) < this.heap.length) {
      let smallerChild = this.leftChild(index);
      if (
        this.rightChild(index) < this.heap.length &&
        this.heap[this.rightChild(index)] < this.heap[smallerChild]
      ) {
        smallerChild = this.rightChild(index);
      }
      if (this.heap[index] <= this.heap[smallerChild]) {
        break;
      }
      this.swap(index, smallerChild);
      index = smallerChild;
    }
  }
}