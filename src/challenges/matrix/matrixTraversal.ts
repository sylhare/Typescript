/**
 * Longest increasing path in matrix
 * Time O(row length * column length)
 * Space O(row length * column length) for memo + recursion stack
 * @param matrix 2D matrix of numbers
 * @returns Length of the longest increasing path
 */
export function longestIncreasingPath(matrix: number[][]): number {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) return 0;

  const rowLength = matrix.length, columnLength = matrix[0].length;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  const memo: number[][] = Array.from({ length: rowLength }, () => Array(columnLength).fill(0));
  let result = 0;

  function dfs(i: number, j: number): number {
    if (memo[i][j]) return memo[i][j];
    let best = 1;
    for (const [di, dj] of dirs) {
      const ni = i + di, nj = j + dj;
      if (ni >= 0 && ni < rowLength &&
        nj >= 0 && nj < columnLength &&
        matrix[ni][nj] > matrix[i][j]) {
        best = Math.max(best, 1 + dfs(ni, nj));
      }
    }
    memo[i][j] = best;
    return best;
  }

  for (let i = 0; i < rowLength; i++) {
    for (let j = 0; j < columnLength; j++) {
      result = Math.max(result, dfs(i, j));
    }
  }

  return result;
}

/**
 * Word search with state
 * @param board 2D character board
 * @param word Target word to search for
 * @returns True if word exists in board, false otherwise
 */
export function wordSearchWithState(board: string[][], word: string): boolean {
  if (!word) return true;
  if (!board || board.length === 0 || board[0].length === 0) return false;

  const rowLength = board.length, columnLength = board[0].length;
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  function dfs(i: number, j: number, wordIndex: number): boolean {
    if (wordIndex === word.length) return true;

    if (i < 0 || i >= rowLength || j < 0 || j >= columnLength
      || board[i][j] !== word[wordIndex]) {
      return false;
    }

    const originalChar = board[i][j];
    board[i][j] = '#';

    let found = false;
    for (const [di, dj] of dirs) {
      const ni = i + di, nj = j + dj;
      if (dfs(ni, nj, wordIndex + 1)) {
        found = true;
        break;
      }
    }

    board[i][j] = originalChar;
    return found;
  }

  for (let i = 0; i < rowLength; i++) {
    for (let j = 0; j < columnLength; j++) {
      if (dfs(i, j, 0)) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Word Search
 * @param board character board
 * @param word target word to search for
 * @returns true if word exists in board
 */
export function wordSearch(board: string[][], word: string): boolean {
  if (!word) return true;
  if (!board || board.length === 0 || board[0].length === 0) return false;

  const rowLength = board.length, columnLength = board[0].length;

  function dfs(i: number, j: number, wordIndex: number): boolean {
    if (wordIndex === word.length) return true;
    if (
      i < 0 || rowLength <= i ||
      j < 0 || columnLength <= j ||
      board[i][j] !== word[wordIndex]
    ) return false;
    const tmp = board[i][j];
    board[i][j] = '#';
    const result =
      dfs(i + 1, j, wordIndex + 1) ||
      dfs(i - 1, j, wordIndex + 1) ||
      dfs(i, j + 1, wordIndex + 1) ||
      dfs(i, j - 1, wordIndex + 1);
    board[i][j] = tmp;
    return result;
  }

  for (let i = 0; i < rowLength; i++) {
    for (let j = 0; j < columnLength; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }

  return false;
}

/**
 * Longest Substring Without Repeating Characters
 * @param s input string
 * @returns length of longest substring without repeating characters
 */
export function longestSubstring(s: string): number {
  const last = new Map<string, number>();
  let start = 0, best = 0;

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    const lastSeen = last.get(char);
    if (lastSeen !== undefined) {
      start = Math.max(start, lastSeen + 1);
    }
    last.set(char, i);
    best = Math.max(best, i - start + 1);
  }

  return best;
}
