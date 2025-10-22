import { traversalHealth, traversalHealthRecursive } from '../../../src/challenges/dynamic/dungeon';

/**
 * Find the minimum initial health required to traverse a dungeon grid from the top-left to the bottom-right corner.
 * You can only go down or right, and the health should never go below 0 while traversing the dungeon.
 */
describe('Dungeon', () => {

  describe.each([
    { algorithm: traversalHealth, name: 'Top down approach' },
    { algorithm: traversalHealthRecursive, name: 'Bottom up approach' },
  ])('Test algorithm: $name', ({ algorithm }) => {
    describe.each([
      {
        input: [[-2, -3, 3], [-5, -10, 1], [10, 30, -5]],
        expected: 7,
        name: 'Example 1: Complex dungeon',
      },
      {
        input: [[0]],
        expected: 1,
        name: 'Example 2: Single empty room',
      },
      {
        input: [[-3]],
        expected: 4,
        name: 'Single room with demon',
      },
      {
        input: [[3]],
        expected: 1,
        name: 'Single room with health boost',
      },
      {
        input: [[0, -1], [-1, 0]],
        expected: 2,
        name: 'Simple path with demons',
      },
      {
        input: [[0, 0], [-1, 0]],
        expected: 1,
        name: 'Simple path avoid demon',
      },
    ])(`$name`, ({ input, expected }) => {
      it(`returns ${expected}`, () => {
        expect(algorithm(input)).toEqual(expected);
      });
    });
  });
});