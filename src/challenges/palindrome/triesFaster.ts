import { isPalindrome } from './palindroms';

class TrieNode {
  next: TrieNode[];
  index: number;
  list: number[];

  constructor() {
    this.next = new Array(26).fill(null);
    this.index = -1;
    this.list = [];
  }
}

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
      root.list.push(index);
    }

    root = root.next[j];
  }

  root.list.push(index);
  root.index = index;
}

function search(words: string[], i: number, root: TrieNode, res: number[][]): void {
  for (let j = 0; j < words[i].length; j++) {
    if (root.index >= 0 && root.index !== i && isPalindrome(words[i], j, words[i].length - 1)) {
      res.push([i, root.index]);
    }

    const charIndex = words[i].charCodeAt(j) - 'a'.charCodeAt(0);
    root = root.next[charIndex];
    if (root === null) return;
  }

  for (const j of root.list) {
    if (i === j) continue;
    res.push([i, j]);
  }
}