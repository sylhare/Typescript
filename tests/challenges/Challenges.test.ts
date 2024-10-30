import { nextGreaterElement } from '../../src/challenges/challenge';

describe('Challenges', () => {
  describe('Replace by next greater element in array', () => {
    it('should find the next greater element for each element in the array', () => {
      const nums = [2, 1, 2, 4, 3];
      const expected = [4, 2, 4, -1, -1];
      expect(nextGreaterElement(nums)).toEqual(expected);
    });

    it('should return -1 for all elements if no greater element exists', () => {
      const nums = [5, 4, 3, 2, 1];
      const expected = [-1, -1, -1, -1, -1];
      expect(nextGreaterElement(nums)).toEqual(expected);
    });

    it('should handle an empty array', () => {
      const nums: number[] = [];
      const expected: number[] = [];
      expect(nextGreaterElement(nums)).toEqual(expected);
    });

    it('should handle an array with one element', () => {
      const nums = [1];
      const expected = [-1];
      expect(nextGreaterElement(nums)).toEqual(expected);
    });
  });
});