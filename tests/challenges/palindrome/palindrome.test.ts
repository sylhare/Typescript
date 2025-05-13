import { isPalindromeAt } from '../../../src/challenges/palindrome/palindroms';
import { palindromePairsTrie } from '../../../src/challenges/palindrome/tries';
import { palindromePairsTrieAlt } from '../../../src/challenges/palindrome/triesFaster';
import { palindromePairsMap } from '../../../src/challenges/palindrome/maps';

/**
 * In an array of words, find two of them that when concatenated gives a palindrome.
 * example:
 *   Hello + olleH = HelloolleH
 *   s + ees = sees
 *   p + "" = p
 */
describe('Palindrome Pair Algorithm', () => {

  describe.each([
    { algorithm: palindromePairsTrie, name: 'PalindromePairs with Trie' },
    { algorithm: palindromePairsTrieAlt, name: 'PalindromePairs with another Trie' },
    { algorithm: palindromePairsMap, name: 'PalindromePairs with Map' },
  ])(`Test algorithm %s`, ({ algorithm, name }) => {
    describe.each([
      { input: ['abcd', 'dcba', 'lls', 's', 'sssll'], expected: [[0, 1], [1, 0], [3, 2], [2, 4]] },
      { input: ['bat', 'tab', 'cat'], expected: [[0, 1], [1, 0]] },
      { input: ['a', ''], expected: [[0, 1], [1, 0]] },
      { input: ['race', 'car', 'ecarace'], expected: [[0, 1]] },
      { input: ['abc', 'def', 'ghi'], expected: [] },
    ])(` ${name} with input $input`, ({ input, expected }) => {
      it(`returns ${JSON.stringify(expected)}`, () => {
        const result = algorithm(input);
        expect(normalizePairs(result)).toEqual(normalizePairs(expected));
      });
    });

    function normalizePairs(pairs: number[][]): number[][] {
      return pairs.map(pair => pair.sort()).sort();
    }
  });

  describe('isPalindrome', () => {
    it('should return true for a palindrome word', () => {
      expect(isPalindromeAt('racecar', 0)).toBe(true);
    });

    it('should return false for a non-palindrome word', () => {
      expect(isPalindromeAt('hello', 0)).toBe(false);
    });

    it('should return true for a substring that is a palindrome', () => {
      expect(isPalindromeAt('xxcbabc', 2)).toBe(true);
    });

    it('should return true for an empty string', () => {
      expect(isPalindromeAt('', 0)).toBe(true);
    });

    it('should return true for a single character', () => {
      expect(isPalindromeAt('a', 0)).toBe(true);
    });

    it('should return false for a substring that is not a palindrome', () => {
      expect(isPalindromeAt('abcdef', 2)).toBe(false); // Checks "cdef"
    });
  });

});