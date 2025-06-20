import { PriorityQueue } from '../../../src/challenges/heap/PriorityQueue';
import { NumberPriorityQueue, NumberQueueFactory } from '../../../src/challenges/heap/NumberPriorityQueue';
import { SimplePriorityQueue } from '../../../src/challenges/heap/SimplePriorityQueue';

describe.each([
  { name: 'PriorityQueue', create: () => new PriorityQueue() },
  { name: 'NumberPriorityQueue', create: () => new NumberPriorityQueue() },
  { name: 'SimplePriorityQueue', create: () => new SimplePriorityQueue() },
])('$name', ({ create }) => {
  let queue: ReturnType<NumberQueueFactory>;

  beforeEach(() => {
    queue = create();
  });

  describe('empty queue behavior', () => {
    it('peek returns undefined', () => {
      expect(queue.peek()).toBeUndefined();
    });
    it('remove returns undefined', () => {
      expect(queue.remove()).toBeUndefined();
    });
    it('size is 0', () => {
      expect(queue.size()).toBe(0);
    });
  });

  describe('single element', () => {
    beforeEach(() => {
      queue.add(42);
    });
    it('peek returns the element', () => {
      expect(queue.peek()).toBe(42);
    });
    it('remove returns the element and then undefined', () => {
      expect(queue.remove()).toBe(42);
      expect(queue.remove()).toBeUndefined();
    });
    it('size updates correctly', () => {
      expect(queue.size()).toBe(1);
      queue.remove();
      expect(queue.size()).toBe(0);
    });
  });

  describe('multiple elements', () => {
    beforeEach(() => {
      [5, 1, 3, 8, 2].forEach(n => queue.add(n));
    });
    it('peek returns the smallest element', () => {
      expect(queue.peek()).toBe(1);
    });
    it('removes elements in priority order', () => {
      const out: number[] = [];
      while (queue.size() > 0) out.push(queue.remove()!);
      expect(out).toEqual([1, 2, 3, 5, 8]);
    });
    it('size decreases as elements are removed', () => {
      queue.remove();
      expect(queue.size()).toBe(4);
      queue.remove();
      expect(queue.size()).toBe(3);
    });
  });

  describe('adding after removing all', () => {
    it('works as expected', () => {
      queue.add(10);
      queue.remove();
      expect(queue.size()).toBe(0);
      queue.add(7);
      expect(queue.peek()).toBe(7);
      expect(queue.remove()).toBe(7);
    });
  });

  describe('add to heap with various positions', () => {
    it('adds below parent (no swap needed)', () => {
      queue.add(10); // [10]
      queue.add(15); // [10, 15]
      expect(queue.peek()).toBe(10);
      expect(queue.remove()).toBe(10);
      expect(queue.remove()).toBe(15);
      expect(queue.remove()).toBeUndefined();
    });

    it('adds above parent (swaps with root)', () => {
      queue.add(10); // [10]
      queue.add(15); // [10, 15]
      queue.add(5);  // [5, 15, 10]
      expect(queue.peek()).toBe(5);
      expect(queue.remove()).toBe(5);
      expect(queue.remove()).toBe(10);
      expect(queue.remove()).toBe(15);
      expect(queue.remove()).toBeUndefined();
    });

    it('adds above all (bubbles to new root)', () => {
      queue.add(10);
      queue.add(15);
      queue.add(5);
      queue.add(1); // [1, 5, 10, 15]
      expect(queue.peek()).toBe(1);
      expect(queue.remove()).toBe(1);
      expect(queue.remove()).toBe(5);
      expect(queue.remove()).toBe(10);
      expect(queue.remove()).toBe(15);
      expect(queue.remove()).toBeUndefined();
    });

    it('adds below all (stays as last leaf)', () => {
      queue.add(10);
      queue.add(15);
      queue.add(5);
      queue.add(1);
      queue.add(20); // [1, 5, 10, 15, 20]
      expect(queue.peek()).toBe(1);
      expect(queue.remove()).toBe(1);
      expect(queue.remove()).toBe(5);
      expect(queue.remove()).toBe(10);
      expect(queue.remove()).toBe(15);
      expect(queue.remove()).toBe(20);
      expect(queue.remove()).toBeUndefined();
    });
  });

  describe('adding duplicate values', () => {
    it('handles duplicates', () => {
      queue.add(2);
      queue.add(2);
      queue.add(1);
      expect(queue.remove()).toBe(1);
      expect(queue.remove()).toBe(2);
      expect(queue.remove()).toBe(2);
      expect(queue.remove()).toBeUndefined();
    });
  });
});