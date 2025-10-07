import { replaceConsecutiveThrees } from '../../../src/challenges/matrix/matrixManipulation';

/**
 * Matrix Manipulation — Replace Rows/Columns of 3 Consecutive Numbers with 0
 * 
 * PROBLEM:
 * Scan for runs of length 3 in rows/columns and set them to zero without 
 * affecting detection within the same pass.
 * Similar to candy crush 2D but with no cascade or gravity
 * 
 * PATTERN: Two-pass algorithm - first pass identifies runs, second pass sets zeros
 * TIME COMPLEXITY: O(m*n) - scan matrix twice
 * SPACE COMPLEXITY: O(m*n) for marking or O(1) with in-place techniques
 * 
 * Replace rows/columns of 3 consecutive equal numbers with 0
 */
describe('Matrix Manipulation', () => {

  describe.each([
    { algorithm: replaceConsecutiveThrees, name: 'Replace Consecutive Threes' },
  ])('Test algorithm: $name', ({ algorithm }) => {
    describe.each([
      { 
        input: [
          [1, 1, 1, 2],
          [3, 3, 3, 4],
          [5, 6, 7, 8]
        ], 
        expected: [
          [0, 0, 0, 2],
          [0, 0, 0, 4],
          [5, 6, 7, 8]
        ], 
        name: 'replace horizontal consecutive threes' 
      },
      { 
        input: [
          [1, 2, 3],
          [1, 5, 6],
          [1, 8, 9],
          [4, 2, 3]
        ], 
        expected: [
          [0, 2, 3],
          [0, 5, 6],
          [0, 8, 9],
          [4, 2, 3]
        ], 
        name: 'replace vertical consecutive threes' 
      },
      { 
        input: [
          [1, 1, 1],
          [2, 2, 2],
          [3, 3, 3]
        ], 
        expected: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ], 
        name: 'replace both horizontal and vertical' 
      },
      { 
        input: [
          [1, 2, 3],
          [4, 5, 6]
        ], 
        expected: [
          [1, 2, 3],
          [4, 5, 6]
        ], 
        name: 'no consecutive threes' 
      },
      { 
        input: [[1]], 
        expected: [[1]], 
        name: 'single element matrix' 
      },
      { 
        input: [[1, 1]], 
        expected: [[1, 1]], 
        name: 'single row, two elements' 
      },
      { 
        input: [[1], [1]], 
        expected: [[1], [1]], 
        name: 'single column, two elements' 
      },
      { 
        input: [[5, 5, 5, 5, 5]], 
        expected: [[0, 0, 0, 0, 0]], 
        name: 'single row with more than 3 consecutive' 
      },
      { 
        input: [[1], [1], [1], [1]], 
        expected: [[0], [0], [0], [0]], 
        name: 'single column with more than 3 consecutive' 
      },
      { 
        input: [
          [1, 1, 1, 4, 4, 4],
          [2, 2, 2, 5, 5, 5],
          [3, 3, 3, 6, 6, 6]
        ], 
        expected: [
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0]
        ], 
        name: 'multiple horizontal and vertical runs' 
      },
      { 
        input: [
          [0, 0, 0],
          [1, 2, 3],
          [4, 5, 6]
        ], 
        expected: [
          [0, 0, 0],
          [1, 2, 3],
          [4, 5, 6]
        ], 
        name: 'existing zeros should be preserved' 
      },
    ])(`$name`, ({ input, expected }) => {
      it(`returns ${JSON.stringify(expected)}`, () => {
        expect(algorithm(input)).toEqual(expected);
      });
    });
  });
});
