import { minWindowAllResults, slidingWindowAllInOne } from '../../src/challenges/window/minWindow';
import { slidingWindowWithMissing } from '../../src/challenges/window/slidingWindowWithMissing';

/**
 * Given a string source and a string target,
 * find the minimum window in source which will contain all the characters in target.
 * The target can have duplicates, be empty, have no match or be bigger than source.
 */
describe('Minimal Window Substring', () => {

  describe.each([
    { solution: minWindowAllResults },
    { solution: slidingWindowWithMissing },
    { solution: slidingWindowAllInOne },
  ])('Using %s', ({ solution }) => {

    it('should get smallest match', () => {
      expect(solution('ADOBECODEBANC', 'ABC')).toEqual('BANC');
    });

    it('should get smallest match in the middle', () => {
      expect(solution('ADOBEACODEBANOC', 'ABC')).toEqual('BEAC');
    });

    it('should get smallest match in the beginning', () => {
      expect(solution('ABCRADOBEACODEBANOC', 'ABC')).toEqual('ABC');
    });

    it('should work even with duplicates', () => {
      expect(solution('ARDOBEACODEBANOC', 'AABC')).toEqual('ACODEBA');
    });

    it('should work even with multiple matches', () => {
      expect(solution('acbbaca', 'aba')).toEqual('baca');
    });

    it('should return source when equal to target', () => {
      expect(solution('a', 'a')).toEqual('a');
    });

    it('should return empty when source is smaller than target', () => {
      expect(solution('a', 'aa')).toEqual('');
    });

    it('should return empty when no targets', () => {
      expect(solution('a', '')).toEqual('');
    });

    it('should return empty when no match', () => {
      expect(solution('abcdef', 'z')).toEqual('');
    });
  });
});