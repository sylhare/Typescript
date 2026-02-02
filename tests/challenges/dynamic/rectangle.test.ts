import { maximalRectangle } from '../../../src/challenges/dynamic/rectangle';

/**
 * Maximal Rectangle
 * 
 * Given a rows x cols binary matrix filled with 0's and 1's, 
 * find the largest rectangle containing only 1's and return its area.
 * 
 * Example 1:
 * Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
 * Output: 6
 * Explanation: The maximal rectangle is shown in the above picture.
 * 
 * Example 2:
 * Input: matrix = [["0"]]
 * Output: 0
 * 
 * Example 3:
 * Input: matrix = [["1"]]
 * Output: 1
 */
describe('Maximal Rectangle', () => {

  describe.each([
    { algorithm: maximalRectangle, name: 'Dynamic Programming' },
  ])('Test algorithm: $name', ({ algorithm }) => {
    describe.each([
      { 
        input: [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]], 
        expected: 6, 
        name: 'Example 1: 4x5 matrix with maximal rectangle area 6' 
      },
      { 
        input: [["0"]], 
        expected: 0, 
        name: 'Example 2: Single cell with 0' 
      },
      { 
        input: [["1"]], 
        expected: 1, 
        name: 'Example 3: Single cell with 1' 
      },
    ])(`$name`, ({ input, expected }) => {
      it(`returns ${expected}`, () => {
        expect(algorithm(input)).toEqual(expected);
      });
    });
  });
});
