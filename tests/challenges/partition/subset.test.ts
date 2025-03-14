import {
  generateSubsetBitmasks,
  generateSubsetsBacktrack,
  generateSubsetsIteratively
} from '../../../src/challenges/partition/subset';

describe('Generate Subset Sums', () => {
  describe.each([
    { method: generateSubsetsBacktrack, name: 'Backtrack' },
    { method: generateSubsetsIteratively, name: 'Iteratively' },
    { method: generateSubsetBitmasks, name: 'Bitmasks' },
  ])('Subset Sum Generation using %s', ({ method, name }) => {
    let input: number[];

    it('should return [0] for an empty array', () => {
      input = [];
      const result = method(input);
      expect(result).toEqual([0]);
    });

    it('should return correct sums for a single element array', () => {
      input = [1];
      const result = method(input).sort((a, b) => a - b);
      expect(result).toEqual([0, 1]);
    });

    it('should return correct sums for a multiple elements array', () => {
      input = [1, 2, 3];
      const result = method(input).sort((a, b) => a - b);
      expect(result).toEqual([0, 1, 2, 3, 3, 4, 5, 6]);
    });

    it('should return correct sums for an array with negative numbers', () => {
      input = [-1, -2, -3];
      const result = method(input).sort((a, b) => a - b);
      expect(result).toEqual([-6, -5, -4, -3, -3, -2, -1, 0]);
    });
  });
});