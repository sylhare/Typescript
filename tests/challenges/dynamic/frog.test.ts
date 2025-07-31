import { canCross, canCrossRecursive } from '../../../src/challenges/dynamic/frog';

/**
 * A frog crosses a river by jumping on stones at fixed positions.
 * Starting at position 0, its first jump must be 1 unit.
 * For each subsequent jump, if its previous jump was k units, it can jump k-1, k, or k+1 units forward.
 *
 * Determine if the frog can reach the last stone.
 *
 *  stones:      0 -> 1 -> 3 -> 5 -> 8 -> 12 -> 17
 *  jump length:   1    2    2    3    4    5
 *  So it needs to do big jumps to get momentum and reach the last stone. (getting the jump from k=1 to k=5)
 */
describe('Frog Jumping', () => {

  describe.each([
    { algorithm: canCross, name: 'canCross' },
    { algorithm: canCrossRecursive, name: 'canCrossRecursive' },
  ])('Test algorithm: $name', ({ algorithm }) => {
    describe.each([
      {
        input: [0, 1, 3, 5, 6, 8, 12, 17],
        expected: true,
        name: 'Example 1: Valid path with increasing jumps',
      },
      {
        input: [0, 1, 2, 3, 4, 8, 9, 11],
        expected: false,
        name: 'Example 2: No valid path with large gap',
      },
      {
        input: [0, 2],
        expected: false,
        name: 'Cannot make first jump of exactly 1 unit',
      },
      {
        input: [0, 1, 2],
        expected: true,
        name: 'Simple valid path',
      },
      {
        input: [0],
        expected: true,
        name: 'Single stone (already at destination)',
      },
    ])(`$name`, ({ input, expected }) => {
      it(`returns ${expected}`, () => {
        expect(algorithm(input)).toEqual(expected);
      });
    });
  });
});