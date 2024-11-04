import { WordNode } from './WordNode';

export const wordNodeTraverserV1 = (beginWord: string, endWord: string, wordList: string[]): number => {
  return wordNodeTraverser(beginWord, endWord, wordList, 1);
};

export const wordNodeTraverserV2 = (beginWord: string, endWord: string, wordList: string[]): number => {
  return wordNodeTraverser(beginWord, endWord, wordList, 2);
};

const wordNodeTraverser = (beginWord: string, endWord: string, wordList: string[], version: 1 | 2): number => {
  if (!wordList.includes(endWord)) return 0;
  if (beginWord === endWord) return 0;
  const root = new WordNode(beginWord);

  if (version === 1) {
    buildWordNodeTreeWithSkipped(wordList, root);
  } else {
    buildWordNodeTreeWithQueue(wordList, root, beginWord);
  }

  const shortest = root.path(new WordNode(endWord));
  return shortest === Infinity ? 0 : shortest + 1;
};

function buildWordNodeTreeWithQueue(wordList: string[], root: WordNode, beginWord: string) {
  const wordNodeList = wordList.map(word => new WordNode(word));
  const queue: WordNode[] = [root];
  const visited: Set<string> = new Set();
  visited.add(new WordNode(beginWord).word);

  while (queue.length > 0) {
    const currentNode = queue.shift()!;

    for (const node of wordNodeList) {
      if (!visited.has(node.word) && currentNode.link(node)) {
        queue.push(node);
        visited.add(node.word);
      }
    }
  }
}

function buildWordNodeTreeWithSkipped(wordList: string[], root: WordNode) {
  const skipped: string[] = [];
  let tried: string[] = [];

  for (const word of wordList) {
    const node = new WordNode(word);
    if (!root.link(node)) {
      skipped.push(word);
    }
  }

  while (tried.length < skipped.length || skipped.length > 0) {
    const word = skipped.shift()!;
    if (root.link(new WordNode(word))) {
      skipped.push(...tried);
      tried = [];
    } else {
      tried.push(word);
    }
  }
}
