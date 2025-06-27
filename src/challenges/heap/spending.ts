import { INumberPriorityQueue } from './NumberPriorityQueue';

export function maxSpending(values: number[][]): number {
  const heap = new Heap();
  let sum = 0;
  for (const shops of values) {
    for (const item of shops) {
      heap.add(item);
    }
  }

  heap.logHeapAsTree();
  let d = 1;
  while (heap.peek()) {
    sum += heap.pop()! * d;
    d++;
  }

  return sum;
}

class Heap {
  heap: number[] = [];

  constructor() {
  }

  add(element: number): void {
    this.heap.push(element);
    this.heap.sort((a, b) => a - b);
  }

  peek(): number | undefined {
    try {
      return this.heap[0];
    } catch {
      return undefined;
    }
  }

  pop(): number | undefined {
    return this.heap.shift();
  }

  logHeapAsTree(): void {
    let output = '';
    const print = (index: number, prefix: string, isLeft: boolean) => {
      if (index >= this.heap.length) return;
      const left = 2 * index + 1;
      const right = 2 * index + 2;
      if (right < this.heap.length) {
        print(right, prefix + (isLeft ? '│   ' : '    '), false);
      }
      output += prefix + (isLeft ? '└── ' : '┌── ') + this.heap[index] + '\n';
      if (left < this.heap.length) {
        print(left, prefix + (isLeft ? '    ' : '│   '), true);
      }
    };
    print(0, '', false);
    console.log(output);
  }
}

/* -- Using other priority queue implementations -- */

export function maxSpendingWithHeap(heap: INumberPriorityQueue): (values: number[][]) => number {
  return (values: number[][]): number => {
    let sum = 0;
    for (const shops of values) {
      for (const item of shops) {
        heap.add(item);
      }
    }

    let d = 1;
    while (heap.peek()) {
      const next = heap.remove();
      sum += next! * d;
      d++;
    }

    return sum;
  };
}
