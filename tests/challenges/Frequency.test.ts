import { frequencySortAscii, frequencySortWithMap, frequencySortWithMapImproved } from '../../src/challenges/frequency';

/**
 * Frequency Sort Problem:
 * Given a string s, sort it in decreasing order based on the frequency of the characters.
 * Characters with higher occurrences come first. If multiple valid answers exist,
 * any one of them will be accepted.
 */
describe('Frequency', () => {
  describe.each([
    { algorithm: frequencySortWithMap, name: 'Frequency Sort with map' },
    { algorithm: frequencySortWithMapImproved, name: 'Frequency Sort with map straight to answer' },
    { algorithm: frequencySortAscii, name: 'Frequency Sort with ascii' },
  ])('Test algorithm: $name', ({ algorithm }) => {
    describe.each([
      { input: 'tree', expected: ['eert', 'eetr'], name: 'Example 1' },
      { input: 'cccaaa', expected: ['cccaaa', 'aaaccc'], name: 'Example 2' },
      { input: 'Aabb', expected: ['bbAa', 'bbaA'], name: 'Example 3' },
      { input: 'ababab', expected: ['aaabbb', 'bbbaaa'], name: 'Example 4' },
    ])(`$name`, ({ input, expected }) => {
      it(`returns one of the valid frequency sorted outputs`, () => {
        const result = algorithm(input);
        expect(expected).toContain(result);
      });
    });
  });
});