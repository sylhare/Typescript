export const isAlmostEqual = (word: string, other: string): boolean => {
  let differences = 0;
  for (let i = 0; i < word.length; i++) {
    if (word[i] !== other[i] && ++differences > 1) {
      return false;
    }
  }
  return true;
};

export function wordLadder(beginWord: string, endWord: string, wordList: string[]): number {
  if (!wordList.includes(endWord)) return 0;
  if (beginWord === endWord) return 0;
  const visited: Set<string> = new Set();

  const queue = [{ value: beginWord, pathLength: 1 }];

  while (queue.length > 0) {
    const { value, pathLength } = queue.shift()!;
    if (visited.has(value)) continue;
    if (value === endWord) return pathLength;
    visited.add(value);
    wordList.forEach(word => {
      if (!visited.has(word) && isAlmostEqual(value, word)) {
        queue.push({ value: word, pathLength: pathLength + 1 });
      }
    });
  }
  return 0;
}