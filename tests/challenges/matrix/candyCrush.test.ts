import {
  fastCandyCrush1D,
  Naive1DTracker,
  Naive2DTracker,
  spliceCandyCrush1D,
  superCandyCrush2D,
  superCandyCrush3D,
  useSuperCandyCrush1D,
} from '../../../src/challenges/matrix/candyCrush';

/**
 * Candy Crush / Elimination Simulation
 *
 * PROBLEM:
 * Simulate removal of consecutive equal elements in a 1D or 2D board until stable.
 * For 1D: Remove groups of 3+ consecutive equal elements, continue until no more eliminations.
 * For 2D: Mark 3+ consecutive elements in rows/columns, remove them, apply gravity, repeat.
 *
 * PATTERN: Simulation with iterative elimination until stable state
 * TIME COMPLEXITY: O(n * iterations) for 1D, O(m*n * iterations) for 2D
 * SPACE COMPLEXITY: O(1) in-place or O(n) for auxiliary marking
 *
 * Simulate removal of consecutive equal elements in a 1D or 2D board until stable.
 */
describe('Candy Crush', () => {

  describe.each([
    { algorithm: Naive1DTracker, name: 'Naive array tracking' },
    { algorithm: useSuperCandyCrush1D, name: 'Negative marking' },
    { algorithm: spliceCandyCrush1D, name: 'Sequence index tracking' },
    { algorithm: fastCandyCrush1D, name: 'Faster sequence index tracking' },
  ])('1D Test algorithm: $name', ({ algorithm }) => {
    describe.each([
      { input: ['a', 'a', 'a', 'b', 'b', 'b', 'c'], expected: ['c'], name: 'eliminate consecutive groups' },
      { input: ['c', 'c', 'c', 'd', 'd', 'd'], expected: [], name: 'eliminate all elements' },
      { input: ['a', 'b', 'c'], expected: ['a', 'b', 'c'], name: 'no consecutive groups' },
      { input: [], expected: [], name: 'empty array' },
      { input: ['a'], expected: ['a'], name: 'single element' },
      { input: ['a', 'a'], expected: ['a', 'a'], name: 'two same elements (not enough for elimination)' },
      { input: ['a', 'a', 'a'], expected: [], name: 'exactly three elements' },
      { input: ['a', 'a', 'a', 'a'], expected: [], name: 'four consecutive elements' },
      { input: ['a', 'a', 'a', 'b', 'b', 'b', 'c', 'c'], expected: ['c', 'c'], name: 'multiple eliminations' },
      { input: ['a', 'a', 'b', 'b', 'b', 'a'], expected: [], name: 'handle cascading' },
    ])(`$name`, ({ input, expected }) => {
      it(`returns ${JSON.stringify(expected)}`, () => {
        expect(algorithm(input)).toEqual(expected);
      });
    });
  });

  describe.each([
    { algorithm: Naive2DTracker, name: 'Naive matrix tracking' },
    { algorithm: superCandyCrush2D, name: 'Index Marking' },
  ])('2D Test algorithm: $name', ({ algorithm }) => {
    describe.each([
      {
        input: [
          [1, 3, 5, 5, 2],
          [3, 4, 3, 3, 1],
          [3, 2, 4, 5, 2],
          [2, 4, 4, 5, 5],
          [1, 4, 4, 1, 1],
        ],
        expected: [
          [1, 3, 0, 0, 0],
          [3, 4, 0, 5, 2],
          [3, 2, 0, 3, 1],
          [2, 4, 0, 5, 2],
          [1, 4, 3, 1, 1],
        ],
        name: 'vertical, horizontal and cascading crushing',
      },
      {
        input: [
          [110, 5, 112, 113, 114],
          [210, 211, 5, 213, 214],
          [310, 311, 3, 313, 314],
          [410, 411, 412, 5, 414],
          [5, 1, 512, 3, 3],
          [610, 4, 1, 613, 614],
          [710, 1, 2, 713, 714],
          [810, 1, 2, 1, 1],
          [1, 1, 2, 2, 2],
          [4, 1, 4, 4, 1014]],
        expected: [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [110, 0, 0, 0, 114],
          [210, 0, 0, 0, 214],
          [310, 0, 0, 113, 314],
          [410, 0, 0, 213, 414],
          [610, 211, 112, 313, 614],
          [710, 311, 412, 613, 714],
          [810, 411, 512, 713, 1014]],
        name: 'crush and drop 2D matrix',
      },
    ])(`$name`, ({ input, expected }) => {
      it(`returns crushed matrix`, () => {
        expect(algorithm(input)).toEqual(expected);
      });
    });
  });

  describe('3D Candy Crush', () => {
    describe('superCandyCrush3D', () => {
      it('crushes matches in all dimensions and applies gravity', () => {
        const input = [
          // z=0 (top layer)
          [
            [1, 1, 1, 4],
            [2, 5, 6, 4],
            [3, 5, 6, 4],
          ],
          // z=1 (middle layer)
          [
            [2, 3, 4, 4],
            [2, 2, 2, 5],
            [3, 6, 7, 6],
          ],
          // z=2 (middle layer)
          [
            [3, 3, 4, 4],
            [5, 6, 7, 5],
            [3, 3, 3, 6],
          ],
          // z=3 (bottom layer)
          [
            [3, 3, 4, 1],
            [5, 6, 7, 2],
            [1, 3, 3, 2],
          ],
        ];

        const expected = [
          [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
          ],
          [
            [2, 0, 0, 0],
            [2, 5, 6, 5],
            [0, 5, 6, 6],
          ],
          [
            [3, 0, 0, 0],
            [5, 6, 7, 5],
            [0, 6, 7, 6],
          ],
          [
            [3, 0, 0, 1],
            [5, 6, 7, 2],
            [1, 3, 3, 2],
          ],
        ];

        expect(superCandyCrush3D(input)).toEqual(expected);
      });

      it('handles empty 3D board', () => {
        const input = [[[]]];
        expect(superCandyCrush3D(input)).toEqual([[[]]]);
      });
    });
  });
});
