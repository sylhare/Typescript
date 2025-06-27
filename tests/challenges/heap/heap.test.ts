import { add, MinHeap, removeRoot } from '../../../src/challenges/heap/MinHeap';

/**
 * MinHeap test cases with tree visualization.
 *
 * Initial: add 10, 4, 15, 20, 0, 8, 7
 *
 *         0
 *       /   \
 *     4      7
 *    / \    / \
 *  20 10  15  8
 *
 * After remove():
 *         4
 *       /   \
 *     8      7
 *    / \    /
 *  20 10  15
 *
 * After add(2):
 *         2
 *       /   \
 *     8      4
 *    / \    / \
 *  20 10  15  7
 */
describe('MinHeap tree structure and operations', () => {
  describe('using MinHeap class', () => {
    let heap: MinHeap;

    beforeEach(() => {
      heap = new MinHeap();
      [10, 4, 15, 20, 0, 8, 7].forEach(n => heap.add(n));
    });

    it('heap after initial adds', () => {
      expect(heap.heap).toEqual([0, 4, 7, 20, 10, 15, 8]);
    });

    it('adds bigger stay last', () => {
      heap.add(25);
      expect(heap.heap).toEqual([0, 4, 7, 20, 10, 15, 8, 25]);
    });

    it('removes root and updates heap', () => {
      heap.remove();
      expect(heap.heap).toEqual([4, 8, 7, 20, 10, 15]);
    });

    it('adds 2 and updates heap', () => {
      heap.remove();
      heap.add(2);
      expect(heap.heap).toEqual([2, 8, 4, 20, 10, 15, 7]);
    });

    it('removes new root and updates heap', () => {
      heap.remove();
      heap.add(2);
      heap.remove();
      expect(heap.heap).toEqual([4, 8, 7, 20, 10, 15]);
    });

    it('bubbles down multiple levels in removeRoot', () => {
      const heap = new MinHeap();
      [1, 3, 6, 5, 9, 8].forEach(n => heap.add(n));
      expect(heap.remove()).toBe(1);
      expect(heap.heap).toEqual([3, 5, 6, 8, 9]);
    });

    it('removes all and returns sorted array', () => {
      const out: number[] = [];
      while (heap.heap.length) out.push(heap.remove()!);
      expect(out).toEqual([0, 4, 7, 8, 10, 15, 20]);
    });

    it('removes from empty heap returns undefined', () => {
      const empty = new MinHeap();
      expect(empty.remove()).toBeUndefined();
    });

    it('add and remove single element', () => {
      const single = new MinHeap();
      single.add(42);
      expect(single.remove()).toBe(42);
      expect(single.heap).toEqual([]);
    });

    it('handles duplicate values', () => {
      const dup = new MinHeap();
      [5, 1, 1, 3].forEach(n => dup.add(n));
      expect(dup.remove()).toBe(1);
      expect(dup.remove()).toBe(1);
      expect(dup.remove()).toBe(3);
      expect(dup.remove()).toBe(5);
    });
  });

  describe('using add and removeRoot functions', () => {
    let heap: number[];

    beforeEach(() => {
      heap = [];
      [10, 4, 15, 20, 0, 8, 7].forEach(n => add(heap, n));
    });

    it('heap after initial adds', () => {
      expect(heap).toEqual([0, 4, 7, 20, 10, 15, 8]);
    });

    it('adds bigger stay last', () => {
      add(heap, 25);
      expect(heap).toEqual([0, 4, 7, 20, 10, 15, 8, 25]);
    });

    it('removes root and updates heap', () => {
      removeRoot(heap);
      expect(heap).toEqual([4, 8, 7, 20, 10, 15]);
    });

    it('adds 2 and updates heap', () => {
      removeRoot(heap);
      add(heap, 2);
      expect(heap).toEqual([2, 8, 4, 20, 10, 15, 7]);
    });

    it('removes new root and updates heap', () => {
      removeRoot(heap);
      add(heap, 2);
      removeRoot(heap);
      expect(heap).toEqual([4, 8, 7, 20, 10, 15]);
    });

    it('bubbles down multiple levels in removeRoot', () => {
      const heap: number[] = [];
      [1, 3, 6, 5, 9, 8].forEach(n => add(heap, n));
      expect(removeRoot(heap)).toBe(1);
      expect(heap).toEqual([3, 5, 6, 8, 9]);
    });

    it('removes all and returns sorted array', () => {
      const out: number[] = [];
      while (heap.length) out.push(removeRoot(heap)!);
      expect(out).toEqual([0, 4, 7, 8, 10, 15, 20]);
    });

    it('removes from empty heap returns undefined', () => {
      const empty: number[] = [];
      expect(removeRoot(empty)).toBeNull();
    });

    it('add and remove single element', () => {
      const single: number[] = [];
      add(single, 42);
      expect(removeRoot(single)).toBe(42);
      expect(single).toEqual([]);
    });

    it('handles duplicate values', () => {
      const dup: number[] = [];
      [5, 1, 1, 3].forEach(n => add(dup, n));
      expect(removeRoot(dup)).toBe(1);
      expect(removeRoot(dup)).toBe(1);
      expect(removeRoot(dup)).toBe(3);
      expect(removeRoot(dup)).toBe(5);
    });
  });
});