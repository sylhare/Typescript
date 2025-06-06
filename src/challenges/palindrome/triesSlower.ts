import { isPalindromeAt } from './palindroms';
import { TrieNode } from './trie';

/**
 * Time complexity is still O(n^2).
 * @param words
 */
export function palindromePairsTrie(words: string[]): number[][] {
  const root = buildTrie(words);
  const result: number[][] = [];

  for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
    search(words[wordIndex], wordIndex, root, result);
  }

  return result;
}

function buildTrie(words: string[]): TrieNode {
  const root = new TrieNode();

  for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
    let node = root;
    const reversedWord = words[wordIndex].split('').reverse().join('');

    for (let charIndex = 0; charIndex < reversedWord.length; charIndex++) {
      if (isPalindromeAt(reversedWord, charIndex)) {
        node.palindromeIdxs.push(wordIndex);
      }

      if (!node.children.has(reversedWord[charIndex])) {
        node.children.set(reversedWord[charIndex], new TrieNode());
      }
      node = node.children.get(reversedWord[charIndex])!;
    }

    node.wordIndex = wordIndex;
  }

  return root;
}

function search(word: string, wordIndex: number, root: TrieNode, result: number[][]): void {
  let node = root;

  for (let charIndex = 0; charIndex < word.length; charIndex++) {
    if (node.wordIndex !== -1 && node.wordIndex !== wordIndex && isPalindromeAt(word, charIndex)) {
      result.push([wordIndex, node.wordIndex]);
    }

    if (!node.children.has(word[charIndex])) {
      return;
    }
    node = node.children.get(word[charIndex])!;
  }

  if (node.wordIndex !== -1 && node.wordIndex !== wordIndex) {
    result.push([wordIndex, node.wordIndex]);
  }

  for (const palindromeIndex of node.palindromeIdxs) {
    result.push([wordIndex, palindromeIndex]);
  }
}