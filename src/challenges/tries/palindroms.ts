class TrieNode {
  children: Map<string, TrieNode>;
  wordIndex: number;
  palindromeIdxs: number[];

  constructor() {
    this.children = new Map();
    this.wordIndex = -1;
    this.palindromeIdxs = [];
  }
}

function buildTrie(words: string[]): TrieNode {
  const root = new TrieNode();

  for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
    let node = root;
    const reversedWord = words[wordIndex].split('').reverse().join('');

    for (let charIndex = 0; charIndex < reversedWord.length; charIndex++) {
      if (isPalindrome(reversedWord, charIndex)) {
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
    if (node.wordIndex !== -1 && node.wordIndex !== wordIndex && isPalindrome(word, charIndex)) {
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

export function isPalindrome(word: string, start: number): boolean {
  let left = start, right = word.length - 1;
  while (left < right) {
    if (word[left] !== word[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

export function palindromePairs(words: string[]): number[][] {
  const root = buildTrie(words);
  const result: number[][] = [];

  for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
    search(words[wordIndex], wordIndex, root, result);
  }

  return result;
}