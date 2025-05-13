/**
 * TrieNode class for the trie data structure.
 * (next and children are used for different implementations)
 *
 * The wordIndex is set to -1 by default which means no word is associated with this node.
 *   - When a node represents the end of a word, the wordIndex is set to the index of that word in the input Array.
 *
 * The palindromeIdxs is empty by default which means no palindrome is associated with this node.
 *   - When a node (that's the end of a word) contains indices of words that can form palindromes
 *     when combined with the current path through the trie
 *   - These indices are collected during trie construction when:
 *       1. A suffix of a reversed word is a palindrome ("abc", "ddcba")
 *       2. A complete word in the trie can form a palindrome with another word ("abc", "cba")
 *
 */
export class TrieNode {
  children: Map<string, TrieNode>; // Map to store children nodes for triesSlower
  next: TrieNode[]; // Array to store children nodes for triesFaster
  wordIndex: number;
  palindromeIdxs: number[];

  constructor() {
    this.next = new Array(26).fill(null); // 26 letters in the alphabet
    this.children = new Map();
    this.wordIndex = -1;
    this.palindromeIdxs = [];
  }
}