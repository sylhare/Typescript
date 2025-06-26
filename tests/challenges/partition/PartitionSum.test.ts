import { PartitionSum } from '../../../src/challenges/partition/PartitionSum';
import { subsetsBacktrack, subsetsBitmask } from '../../../src/challenges/partition/subset';

/**
 * Partition an array (of integers) into two arrays of equal length and,
 * return the minimal absolute difference between each sum.
 */
describe('PartitionSum', () => {

  describe.each([
    { name: 'PartitionSum Backtrack', algorithm: PartitionSum.Solve(subsetsBacktrack) },
    { name: 'PartitionSum Bitmask', algorithm: PartitionSum.Solve(subsetsBitmask) },
  ])(`Test algorithm: $name`, ({ algorithm }) => {
    describe.each([
      { input: [], expected: 0 },
      { input: [-36, 36], expected: 72 },
      { input: [3, 9, 7, 3], expected: 2 },
      { input: [2, -1, 0, 4, -2, -9], expected: 0 },
    ])(`with input $input`, ({ input, expected }) => {
      it(`returns ${expected}`, () => {
        expect(algorithm(input)).toEqual(expected);
      });
    });
  });
});