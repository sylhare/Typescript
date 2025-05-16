/**
 *  1. Build Trie
 *   - loop through each word
 *   - reverse the word
 *   - add each letter to the trie
 *   - set isEndOfWord to true if it is the last letter
 *  2. Receive Query letter
 *  - save new letter to queries as first element
 *  - is letter a child of root? if not then false
 *  - is it end of word? if yes then true
 *  - is the previous letter part of the child of letter?
 *      - if no then false
 *      - if yes then go into the child node (and redo the process)
 *
 * Example:
 * [abc, xyz]
 *  . (root)
 *  z,        c
 *  y,        b
 *  x,        a
 *
 *  query = c
 *  queries = [c]
 *  c is a child of root
 *  go into c node (not end of word)
 *  no more children -> false
 *
 *  query = x
 *  queries = [xc]
 *  x not child of root -> false
 *
 *  query = y
 *  queries = [yxc]
 *  y not child of root -> false
 *
 *  query = z
 *  queries = [zyxc]
 *  z child of root
 *  go into z node (not end of word)
 *  y is child of z
 *  go into y node (not end of word)
 *  x is child of y
 *  end of word! -> true
 */
export class StreamChecker {
  private root: TrieNode = new TrieNode('', false);
  private queries: string[] = [];

  constructor(words: string[]) {
    for (const word of words) {
      this.addWordToTrie(word.split('').reverse().join(''));
    }
  }

  query(letter: string): boolean {
    this.queries.unshift(letter);
    let currentNode: TrieNode | undefined = this.root;

    for (const char of this.queries) {
      currentNode = currentNode.childAt(char);
      if (!currentNode) return false;
      if (currentNode.isEndOfWord) return true; // Found a word
    }

    return false;
  }

  private addWordToTrie(word: string): void {
    let currentNode = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      const isEndOfWord = i === word.length - 1;

      if (!currentNode.childAt(char)) {
        currentNode.add(char, isEndOfWord);
      }

      currentNode = currentNode.childAt(char)!;

      if (isEndOfWord) {
        currentNode.isEndOfWord = true;
      }
    }
  }
}

class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEndOfWord: boolean;

  constructor(readonly value: string, isEndOfWord: boolean) {
    this.isEndOfWord = isEndOfWord;
  }

  childAt(letter: string): TrieNode | undefined {
    return this.children.get(letter);
  }

  add(letter: string, isEndOfWord: boolean): TrieNode {
    const newNode = new TrieNode(letter, isEndOfWord);
    this.children.set(letter, newNode);
    return newNode;
  }
}