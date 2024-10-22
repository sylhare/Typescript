  });});    it('should transform a hit into a cog', () => {
import { wordLadder } from '../../../src/challenges/ladder/wordLadder';

/**
 * Input is a list of words which are not ordered and might not all be connected.
 * Being and End word the same length.
 * End word is in word list. (begin word may or may not be in it).
 * To build a path every node must differ by only a single letter.
 *
 * Find the shortest path if any.
 */
describe('Word Ladder', () => {
  describe.each([
    { solution: wordLadder },
  ])('Using %s', ({ solution }) => {
    it('should transform a hit into a cog', () => {
      // 1. hit -> hot -> dot -> dog -> cog
      // 2. hit -> hot -> lot -> log -> cog
      expect(solution('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog'])).toEqual(5);
    });

    it('should fail to transform a hit into a cog', () => {
      expect(solution('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log'])).toEqual(0);
    });

    it('should work when transformation is not ordered', () => {
      expect(solution('hot', 'dog', ['hot', 'dog', 'dot'])).toEqual(3);
    });

    it('should work when transformation is all over', () => {
      // leet -> lest -> lost -> lose -> lode -> code
      expect(solution('leet', 'code', ['lest', 'leet', 'lose', 'code', 'lode', 'robe', 'lost'])).toEqual(6);
    });

    it('should return 0 when unreachable', () => {
      expect(solution('hot', 'dog', ['hot', 'dog'])).toEqual(0);
    });

    it('should not skip if all unordered', () => {
      // aaa -> aax -> abx -> abc
      expect(solution('aaa', 'abc', ['aaa', 'abc', 'cbx', 'cax', 'abx', 'aax'])).toEqual(4);
    });

    it('ignore edge cases', () => {
      expect(solution('aaa', 'aaa', ['aaa'])).toEqual(0);
    });

    it('should ignore useless transformations', () => {
      expect(solution('aaa', 'aaa', ['aac', 'abc', 'aba', 'aaa'])).toEqual(0);
    });

    it('should skip first transformations', () => {
      // aaa -> aax -> axx -> abx -> abc
      expect(solution('aaa', 'abc', ['aax', 'bax', 'bbx', 'bxx', 'axx', 'abx', 'abc'])).toEqual(4);
    });

    it('should skip last transformations', () => {
      // aaa -> aac -> abc
      expect(solution('aaa', 'abc', ['aac', 'axc', 'bxc', 'bbc', 'abc'])).toEqual(3);
    });
  });});