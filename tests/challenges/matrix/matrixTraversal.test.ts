import {
  longestIncreasingPath,
  longestSubstring, wordSearch,
  wordSearchWithState,
} from '../../../src/challenges/matrix/matrixTraversal';

/**
 * Tree/Graph Traversal + State Handling
 *
 * PROBLEM:
 * Medium-hard problems combining DFS/BFS with state management.
 * Includes visited bitmasks, backtracking state, or extra constraints during traversal.
 *
 * PATTERN: DFS/BFS with memoization, backtracking, or state tracking
 * TIME COMPLEXITY: Varies (O(V+E) to O(m*n) with memoization)
 * SPACE COMPLEXITY: O(V) for visited state + recursion stack
 *
 * Medium-hard problems combining DFS/BFS with state handling
 */
describe('Tree/Graph Traversal with State', () => {

  describe.each([
    { algorithm: longestIncreasingPath, name: 'Longest Increasing Path in Matrix' },
  ])('Test algorithm: $name', ({ algorithm }) => {
    describe.each([
      {
        input: [
          [9, 9, 4],
          [6, 6, 8],
          [2, 1, 1],
        ],
        expected: 4,
        name: 'longest path length 4',
      },
      {
        input: [[1]],
        expected: 1,
        name: 'single cell',
      },
      {
        input: [
          [1, 2],
          [4, 3],
        ],
        expected: 4,
        name: 'all cells in path',
      },
      {
        input: [],
        expected: 0,
        name: 'empty matrix',
      },
      {
        input: [[]],
        expected: 0,
        name: 'empty row',
      },
      {
        input: [
          [1, 1, 1],
          [1, 1, 1],
          [1, 1, 1],
        ],
        expected: 1,
        name: 'all same values',
      },
      {
        input: [
          [1, 2, 3, 4, 5],
          [16, 17, 24, 23, 6],
          [15, 18, 25, 22, 7],
          [14, 19, 20, 21, 8],
          [13, 12, 11, 10, 9],
        ],
        expected: 25,
        name: 'spiral matrix with long path',
      },
      {
        input: [
          [10, 9, 8],
          [7, 6, 5],
          [4, 3, 2],
        ],
        expected: 5,
        name: 'all decreasing values',
      },
      {
        input: [
          [-1, -2, -3],
          [-4, -5, -6],
          [-7, -8, -9],
        ],
        expected: 5,
        name: 'all negative values',
      },
    ])(`$name`, ({ input, expected }) => {
      it(`returns ${expected}`, () => {
        expect(algorithm(input)).toEqual(expected);
      });
    });
  });

  describe.each([
    { algorithm: wordSearchWithState, name: 'Word Search with Backtracking State' },
    { algorithm: wordSearch, name: 'Word Search with Backtracking State 2' },
  ])('Test algorithm: $name', ({ algorithm }) => {
    describe.each([
      {
        input: {
          board: [
            ['A', 'B', 'C', 'E'],
            ['S', 'F', 'C', 'S'],
            ['A', 'D', 'E', 'E'],
          ],
          word: 'ABCCED',
        },
        expected: true,
        name: 'word exists in board',
      },
      {
        input: {
          board: [
            ['A', 'B', 'C', 'E'],
            ['S', 'F', 'C', 'S'],
            ['A', 'D', 'E', 'E'],
          ],
          word: 'SEE',
        },
        expected: true,
        name: 'word exists with backtrack',
      },
      {
        input: {
          board: [
            ['A', 'B', 'C', 'E'],
            ['S', 'F', 'C', 'S'],
            ['A', 'D', 'E', 'E'],
          ],
          word: 'ABCB',
        },
        expected: false,
        name: 'word does not exist (reuse cell)',
      },
      {
        input: {
          board: [['A']],
          word: 'A',
        },
        expected: true,
        name: 'single cell board and word',
      },
      {
        input: {
          board: [['A']],
          word: 'B',
        },
        expected: false,
        name: 'single cell board, word not found',
      },
      {
        input: {
          board: [['A', 'B', 'C']],
          word: 'ABC',
        },
        expected: true,
        name: 'single row board',
      },
      {
        input: {
          board: [['A'], ['B'], ['C']],
          word: 'ABC',
        },
        expected: true,
        name: 'single column board',
      },
      {
        input: {
          board: [
            ['A', 'A', 'A'],
            ['A', 'A', 'A'],
            ['A', 'A', 'A'],
          ],
          word: 'AAAAAAAAAA',
        },
        expected: false,
        name: 'word longer than available cells',
      },
      {
        input: {
          board: [
            ['C', 'A', 'A'],
            ['A', 'A', 'A'],
            ['B', 'C', 'D'],
          ],
          word: 'AAB',
        },
        expected: true,
        name: 'complex backtracking required',
      },
      {
        input: {
          board: [[]],
          word: 'A',
        },
        expected: false,
        name: 'empty board',
      },
      {
        input: {
          board: [['A', 'B']],
          word: '',
        },
        expected: true,
        name: 'empty word',
      },
    ])(`$name`, ({ input, expected }) => {
      it(`returns ${expected}`, () => {
        expect(algorithm(input.board, input.word)).toEqual(expected);
      });
    });
  });
});

/**
 * Longest Substring Without Repeating Characters
 *
 * PROBLEM:
 * Given a string s, find the length of the longest substring without repeating characters.
 *
 * PATTERN: Sliding window with last-seen index (two pointers + hashmap).
 * TIME COMPLEXITY: O(n) - single pass through string
 * SPACE COMPLEXITY: O(min(n, charset_size)) - hash map storage
 *
 * Sliding window solution to find longest unique character substring
 */
describe('Longest Substring Without Repeating Characters', () => {

  describe.each([
    { algorithm: longestSubstring, name: 'Longest Substring' },
  ])('Test algorithm: $name', ({ algorithm }) => {
    describe.each([
      { input: 'abcabcbb', expected: 3, name: 'basic case with repeating pattern' },
      { input: 'bbbbb', expected: 1, name: 'all same characters' },
      { input: 'pwwkew', expected: 3, name: 'mixed repeating characters' },
      { input: '', expected: 0, name: 'empty string' },
      { input: 'a', expected: 1, name: 'single character' },
      { input: 'au', expected: 2, name: 'two different characters' },
      { input: 'aa', expected: 1, name: 'two same characters' },
      { input: 'abcdefghijklmnopqrstuvwxyz', expected: 26, name: 'all lowercase letters' },
      { input: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', expected: 26, name: 'all uppercase letters' },
      { input: 'abcABC123', expected: 9, name: 'mixed case and numbers' },
      { input: 'dvdf', expected: 3, name: 'substring not at beginning' },
      { input: 'anviaj', expected: 5, name: 'longest substring in middle' },
      { input: 'abba', expected: 2, name: 'palindrome with repetition' },
      { input: 'tmmzuxt', expected: 5, name: 'complex repetition pattern' },
      { input: '!@#$%^&*()', expected: 10, name: 'special characters only' },
      { input: 'abc!@#abc', expected: 6, name: 'alphanumeric with special chars' },
      { input: '   ', expected: 1, name: 'all spaces' },
      { input: 'a b c d e', expected: 3, name: 'characters separated by spaces' },
      {
        input: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        expected: 62,
        name: 'all alphanumeric characters',
      },
      { input: 'ohvhjdml', expected: 6, name: 'no clear pattern' },
      { input: 'ckilbkd', expected: 5, name: 'another mixed case' },
      { input: 'wobgrovw', expected: 6, name: 'complex sliding window case' },
      { input: 'abcabcdefabc', expected: 6, name: 'multiple occurrences of same substring' },
      { input: 'nfpdmpi', expected: 5, name: 'substring ending at different position' },
      { input: 'rithmschool', expected: 7, name: 'real word with repetitions' },
      { input: 'thisisawesome', expected: 6, name: 'another real word case' },
    ])(`$name`, ({ input, expected }) => {
      it(`"${input.length > 20 ? input.substring(0, 20) + '...' : input}" returns ${expected}`, () => {
        expect(algorithm(input)).toEqual(expected);
      });
    });
  });
});