/**
 * @param matrix - binary matrix represented as strings
 * @returns the area of the largest rectangle containing only 1's
 */
export function maximalRectangle(matrix: string[][]): number {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) return 0;

  const rows = matrix.length;
  const cols = matrix[0].length;
  const heights: number[] = new Array(cols).fill(0);
  let maxArea = 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      heights[j] = matrix[i][j] === '1' ? heights[j] + 1 : 0;
    }

    maxArea = Math.max(maxArea, largestRectangleInHistogram(heights));
  }

  return maxArea;
}

/**
 * Helper function to find largest rectangle in histogram
 */
function largestRectangleInHistogram(heights: number[]): number {
  const stack: number[] = [];
  let maxArea = 0;
  let index = 0;

  while (index < heights.length) {
    if (stack.length === 0 || heights[index] >= heights[stack[stack.length - 1]]) {
      stack.push(index++);
    } else {
      const top = stack.pop()!;
      const width = stack.length === 0 ? index : index - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, heights[top] * width);
    }
  }

  while (stack.length > 0) {
    const top = stack.pop()!;
    const width = stack.length === 0 ? index : index - stack[stack.length - 1] - 1;
    maxArea = Math.max(maxArea, heights[top] * width);
  }

  return maxArea;
}
