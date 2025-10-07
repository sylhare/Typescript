/**
 * Replace consecutive threes in matrix
 *
 * @param matrix 2D matrix of numbers
 * @returns Matrix with consecutive runs of 3 replaced by zeros
 */
export function replaceConsecutiveThrees(matrix: number[][]): number[][] {
  const rowLength = matrix.length, columnLength = matrix[0].length;
  const markForCrush = (value: number) => value > 0 ? -value : value;

  for (let y = 0; y < rowLength; y++) {
    for (let x = 0; x < columnLength - 2; x++) {
      const value = Math.abs(matrix[y][x]);

      if (value !== 0 && [matrix[y][x + 1], matrix[y][x + 2]].every(cell => Math.abs(cell) === value)) {
        matrix[y][x] = markForCrush(matrix[y][x]);
        matrix[y][x + 1] = markForCrush(matrix[y][x + 1]);
        matrix[y][x + 2] = markForCrush(matrix[y][x + 2]);
      }
    }
  }
  for (let x = 0; x < columnLength; x++) {
    for (let y = 0; y < rowLength - 2; y++) {
      const value = Math.abs(matrix[y][x]);

      if (value !== 0 && [matrix[y + 1][x], matrix[y + 2][x]].every(cell => Math.abs(cell) === value)) {
        matrix[y][x] = markForCrush(matrix[y][x]);
        matrix[y + 1][x] = markForCrush(matrix[y + 1][x]);
        matrix[y + 2][x] = markForCrush(matrix[y + 2][x]);
      }
    }
  }

  for (let x = 0; x < columnLength; x++) {
    for (let y = 0; y < rowLength; y++) {

      if (matrix[y][x] < 0) {
        matrix[y][x] = 0;
      }
    }
  }
  return matrix;
}