/**
 * Given the topometry of a terrain, represented as a list of heights,
 * find the amount of rain that would be trapped after it rains.
 */
import { rainTrapWithPointers, rainTrap } from '../../src/challenges/rain/raintrap';
import { rainStack } from '../../src/challenges/rain/rainStack';

describe('Rain', () => {

  describe.each([
    { solution: rainTrap },
    { solution: rainStack },
    { solution: rainTrapWithPointers },
  ])('Using %s', ({ solution }) => {

    it('should handle erroneous input', () => {
      expect(solution([1])).toEqual(0);
    });

    it('should work for a pit', () => {
      expect(solution([4, 2, 0, 3, 2, 5])).toEqual(9);
    });

    it('should work for a rocky path', () => {
      expect(solution([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toEqual(6);
    });

    it('should work for a mountain', () => {
      expect(solution([1, 2, 3, 2, 1])).toEqual(0);
    });

    it('should work for straight road', () => {
      expect(solution([1, 1, 1, 1, 1])).toEqual(0);
    });

    it('should work for empty', () => {
      expect(solution([])).toEqual(0);
    });

    it('should work for a uphill', () => {
      expect(solution([0, 1, 2, 3, 4])).toEqual(0);
    });

    it('should work for downhill', () => {
      expect(solution([4, 3, 2, 1])).toEqual(0);
    });

    it('should work with down pit', () => {
      expect(solution([4, 2, 3])).toEqual(1);
    });
  });
});