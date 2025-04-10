import { greedy, greedyPathway } from '../../src/challenges/pathway/greedyPathway';
import { twoPointersPathway } from '../../src/challenges/pathway/twoPointersPathway';

describe('Pathway', () => {

  describe.each([
    { algorithm: greedyPathway, name: 'greedy' },
    { algorithm: twoPointersPathway, name: 'two pointers' },
  ])(`Test algorithm %s`, ({ algorithm, name }) => {
    describe.each([
      { input: [[2, 4, 5, 8, 10], [4, 6, 8, 9]], expected: 30 },
      { input: [[1, 3, 5, 7, 9], [3, 5, 100]], expected: 109 },
      { input: [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]], expected: 40 },
      { input: [[2, 3, 5], [1, 3, 6]], expected: 11 },
    ])(` ${name} with input`, ({ input, expected }) => {
      it(`${input} returns ${expected}`, () => {
        expect(algorithm(input[0], input[1])).toEqual(expected);
      });
    });
  });

  describe('greedy', () => {
    it('should compute the maximum sum for a given map and starting value', () => {
      const map = new Map<number, number[]>([
        [1, [2, 3]],
        [2, [4]],
        [3, [5]],
        [4, []],
        [5, []],
      ]);
      const memo = new Map<number, number>();
      const result = greedy(1, map, memo);
      expect(result).toEqual(9); // Path: 1 -> 3 -> 5
    });
  });
});