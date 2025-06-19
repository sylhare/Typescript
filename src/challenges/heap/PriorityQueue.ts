import { INumberPriorityQueue } from './NumberPriorityQueue';

export class PriorityQueue implements INumberPriorityQueue {
  private heap: number[] = [];

  private getLeftChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 1;
  }

  private hasLeftChild(index: number): boolean {
    return this.getLeftChildIndex(index) < this.heap.length;
  }

  private leftChild(index: number): number {
    return this.heap[this.getLeftChildIndex(index)];
  }

  private getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2;
  }

  private hasRightChild(index: number): boolean {
    return this.getRightChildIndex(index) < this.heap.length;
  }

  private rightChild(index: number): number {
    return this.heap[this.getRightChildIndex(index)];
  }

  private getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  private hasParent(index: number): boolean {
    return this.getParentIndex(index) >= 0;
  }

  private parent(index: number): number {
    return this.heap[this.getParentIndex(index)];
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
    this.heapifyDown();
    return item;
  }

  add(item: number): void {
    this.heap.push(item);
    this.heapifyUp();
  }

  size(): number {
    return this.heap.length;
  }

  private heapifyUp(): void {
    let index = this.heap.length - 1;
    while (this.hasParent(index) && this.parent(index) > this.heap[index]) {
      this.swap(this.getParentIndex(index), index);
      index = this.getParentIndex(index);
    }
  }

  private heapifyDown(): void {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      if (this.hasRightChild(index) && this.rightChild(index) < this.leftChild(index)) {
        smallerChildIndex = this.getRightChildIndex(index);
      }
      if (this.heap[index] < this.heap[smallerChildIndex]) {
        break;
      } else {
        this.swap(index, smallerChildIndex);
      }
      index = smallerChildIndex;
    }
  }
}