import { isPalindrome } from './palindroms';
import { TrieNode } from './trie';

export function palindromePairsTrieAlt(words: string[]): number[][] {
  const res: number[][] = [];
  const root = new TrieNode();

  for (let i = 0; i < words.length; i++) {
    addWord(root, words[i], i);
  }

  for (let i = 0; i < words.length; i++) {
    search(words, i, root, res);
  }

  return res;
}

function addWord(root: TrieNode, word: string, index: number): void {
  for (let i = word.length - 1; i >= 0; i--) {
    const j = word.charCodeAt(i) - 'a'.charCodeAt(0);

    if (root.next[j] === null) {
      root.next[j] = new TrieNode();
    }

    if (isPalindrome(word, 0, i)) {
      root.palindromeIdxs.push(index);
    }

    root = root.next[j];
  }

  root.palindromeIdxs.push(index);
  root.wordIndex = index;
}

function search(words: string[], i: number, root: TrieNode, result: number[][]): void {
  for (let j = 0; j < words[i].length; j++) {
    if (root.wordIndex >= 0 && root.wordIndex !== i && isPalindrome(words[i], j, words[i].length - 1)) {
      result.push([i, root.wordIndex]);
    }

    const charIndex = words[i].charCodeAt(j) - 'a'.charCodeAt(0);
    root = root.next[charIndex];
    if (root === null) return;
  }

  for (const j of root.palindromeIdxs) {
    if (i === j) continue;
    result.push([i, j]);
  }
}