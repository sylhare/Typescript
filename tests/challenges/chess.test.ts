import { countValidMoveCombinations } from '../../src/challenges/chess';

/**
 * How many ways can you pick a destination for each chess piece,
 * so that all pieces move at the same time toward their destinations,
 * and never land on the same square at the same time?
 *
 * Steps:
 * - Each piece can reach certain squares based on its movement rules (including starting point)
 *   - No two pieces will start in the same square.
 * - A combination is a set of every possible destinations for each piece.
 *   - You may choose the square a piece is already on as its destination.
 *   - You can't move a piece in a direction it doesn't normally move.
 * - A combination can be simulated by moving all pieces at the same time tile-by-tile toward their destinations.
 *   - If any two pieces ever share a square, that combination is invalid.
 *   - If two pieces are directly adjacent to each other, it is valid for them to move past each other and swap positions in one second.
 * - Count the valid combinations.
 *
 * Example with two pieces:
 *
 * Suppose you have a rook at [1,1] and a bishop at [4,3].
 *   - The rook can go to any square in row 1 or column 1.
 *   - The bishop can go to any square along its diagonals.
 * You pick a destination for each piece (e.g., rook to [1,8], bishop to [8,7]).
 * Both start moving at the same time, one square per second, along their allowed paths.
 * If they ever land on the same square at the same time, that combination is not counted.
 * Otherwise, it's a valid move combination.
 * The answer is the total number of valid combinations.
 *
 * Constraints:
 * - pieces only contain the strings "rook", "queen", and "bishop".
 * - There will be at most 4 pieces and out of which only one queen on the chessboard.
 * - Position: 1 <= row index or column index <= 8
 * - Each positions[i] is distinct.
 */
describe('Chess Valid Move Combinations', () => {
  describe.each([
    {
      algorithm: (input: [string[], number[][]]) => countValidMoveCombinations(input[0], input[1]),
      name: 'Chess Valid Move Combinations',
    },
  ])('Test algorithm: $name', ({ algorithm }) => {
    describe.each([
      { input: [['rook'], [[1, 1]]], expected: 15, name: 'single rook at [1,1]' },
      { input: [['queen'], [[1, 1]]], expected: 22, name: 'single queen at [1,1]' },
      { input: [['bishop'], [[4, 3]]], expected: 12, name: 'single bishop at [4,3]' },
      { input: [['rook', 'rook'], [[1, 1], [8, 8]]], expected: 223, name: 'multiple pieces - basic case' },
    ])(`$name`, ({ input, expected }) => {
      it(`returns ${expected}`, () => {
        expect(algorithm(input as [string[], number[][]])).toEqual(expected);
      });
    });
  });
});

