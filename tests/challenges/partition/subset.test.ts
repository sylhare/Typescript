import {
  generateSubsetBitmasks,
  generateSubsetsBacktrack,
  generateSubsetsIteratively,
  getSubsetSums,
  subsetsBacktrack,
  subsetsBitmask
} from '../../../src/challenges/partition/subset';

describe('Generate Subset Sums', () => {
  describe.each([
    { method: getSubsetSums, name: 'Subset from Backtrack Sum' },
    { method: generateSubsetsBacktrack, name: 'Backtrack' },
    { method: generateSubsetsIteratively, name: 'Iteratively' },
    { method: generateSubsetBitmasks, name: 'Bitmasks' },
  ])('Subset Sum Generation', ({ method, name }) => {
    let input: number[];

    describe(`Method: ${name}`, () => {
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

      it('should return correct sums 0 total sum', () => {
        input = [-36, 36];
        const result = method(input).sort((a, b) => a - b);
        expect(result).toEqual([-36, 0, 0, 36]);
      });
    });
  });

  describe('Subsets', () => {

    describe.each([
      { method: subsetsBitmask, name: 'Bitmask' },
      { method: subsetsBacktrack, name: 'Backtrack' },
    ])(`Method: %s`, ({ method }) => {

      it('should handle empty array', () => {
        const input: number[] = [];
        const result = method(input);
        expect(result).toEqual({
          0: [0]
        });
      });

      it('should transform subset sums correctly', () => {
        const input = [1, 2, 3];
        const result = method(input);
        expect(result).toEqual({
          0: [0],
          1: [1, 2, 3],
          2: [3, 4, 5],
          3: [6]
        });
      });

      it('should handle single element array', () => {
        const input = [1];
        const result = method(input);
        expect(result).toEqual({
          0: [0],
          1: [1]
        });
      });

      it('should handle array with negative numbers', () => {
        const input = [-1, -2, -3];
        const result = method(input);
        expect(result).toEqual({
          0: [0],
          1: [-3, -2, -1],
          2: [-5, -4, -3],
          3: [-6]
        });
      });
    });
  });
});