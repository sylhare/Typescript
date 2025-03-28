import {
  generateSubsetBitmasks,
  generateSubsetsBacktrack,
  generateSubsetsIteratively
} from '../../../src/challenges/partition/subset';
import { PartitionSum } from '../../../src/challenges/partition/PartitionSum';

describe('Generate Subset Sums', () => {
  describe.each([
    { method: generateSubsetsBacktrack, name: 'Backtrack' },
    { method: PartitionSum.getSubsetSums, name: 'Backtrack2' },
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
});