import { regexMatching } from '../../../src/challenges/dynamic/regexMatching';

/**
 * Dynamic Programming / Intervals
 *
 * PROBLEM:
 * DP problems on substrings and intervals.
 * Includes complex state transitions, interval optimization, and string matching.
 *
 * PATTERN: Interval DP, substring DP with complex state transitions
 * TIME COMPLEXITY: O(n²) to O(n³) depending on problem structure
 * SPACE COMPLEXITY: O(n²) for 2D DP tables
 *
 */
describe('Dynamic Programming - Intervals', () => {

  describe.each([
    { algorithm: regexMatching, name: 'Regular Expression Matching' },
  ])('Test algorithm: $name', ({ algorithm }) => {
    describe.each([
      { input: { s: 'aa', p: 'a' }, expected: false, name: 'simple no match' },
      { input: { s: 'aa', p: 'a*' }, expected: true, name: 'star matches multiple' },
      { input: { s: 'ab', p: '.*' }, expected: true, name: 'dot star matches all' },
      { input: { s: 'aab', p: 'c*a*b' }, expected: true, name: 'complex pattern match' },
      { input: { s: 'mississippi', p: 'mis*is*p*.' }, expected: false, name: 'complex no match' },
      { input: { s: '', p: '' }, expected: true, name: 'empty strings match' },
      { input: { s: 'a', p: '' }, expected: false, name: 'non-empty string, empty pattern' },
      { input: { s: '', p: 'a*' }, expected: true, name: 'empty string, star pattern' },
      { input: { s: '', p: '.*' }, expected: true, name: 'empty string, dot star' },
      { input: { s: 'abc', p: 'a.c' }, expected: true, name: 'dot matches single char' },
      { input: { s: 'ac', p: 'ab*c' }, expected: true, name: 'star matches zero occurrences' },
      { input: { s: 'abbc', p: 'ab*c' }, expected: true, name: 'star matches multiple occurrences' },
      { input: { s: 'a', p: 'ab*' }, expected: true, name: 'star at end matches zero' },
      { input: { s: 'bbbba', p: '.*a*a' }, expected: true, name: 'complex dot star pattern' },
      { input: { s: 'ab', p: '.*c' }, expected: false, name: 'dot star but wrong ending' },
      { input: { s: 'aaa', p: 'a*a' }, expected: true, name: 'star with following char' },
      { input: { s: 'aaa', p: 'ab*a*c*a' }, expected: true, name: 'multiple stars' },
    ])(`$name`, ({ input, expected }) => {
      it(`returns ${expected}`, () => {
        expect(algorithm(input.s, input.p)).toEqual(expected);
      });
    });
  });

});
