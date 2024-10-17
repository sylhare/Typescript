/**
 * Monotonic Stack where the indexes added are always increasing (but are corresponding to decreasing heights)
 * The stack needs to have at least 2 elements plus the current one to add water (so it's like a pit).
 */
export const rainStack = (height: number[]): number => {
  const stack = new Stack<number>();
  let currentIndex = 0, water = 0;

  while (currentIndex < height.length) {
    if (stack.isEmpty() || height[currentIndex] <= height[stack.peek()!]) {
      stack.push(currentIndex);
      currentIndex += 1;
    } else {
      const pit = stack.pop()!;

      if (!stack.isEmpty()) {
        const beforePitIndex = stack.peek()!;
        const minHeight = Math.min(height[beforePitIndex], height[currentIndex]);
        water += (currentIndex - (beforePitIndex + 1)) * (minHeight - height[pit]);
      }
    }
  }
  return water;
};

class Stack<T> {
  private readonly stack: T[];

  constructor() {
    this.stack = [];
  }

  push(a: T) {
    this.stack.push(a);
  }

  /**
   * Removes and returns the last element added from the stack.
   */
  pop(): T | undefined {
    return this.stack.pop();
  }

  /**
   * Show the latest element added in the stack
   */
  peek(): T | undefined {
    return this.stack[this.stack.length - 1];
  }

  isEmpty(): boolean {
    return this.stack.length === 0;
  }
}