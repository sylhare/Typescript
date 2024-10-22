/**
 * BFS (Breadth First Search) algorithm
 * Time complexity: O(n * m) where n is the number of words and m is the length of the word
 * Space complexity: O(n)
 */
export const bfs = (startNode: string, targetNode: string, graph: { [key: string]: string[] }): number => {
  const queue: { node: string, depth: number }[] = [{ node: startNode, depth: 1 }];
  const visited: Set<string> = new Set();

  while (queue.length > 0) {
    const { node, depth } = queue.shift()!;
    if (node === targetNode) return depth;
    if (!visited.has(node)) {
      visited.add(node);
      graph[node].forEach(sibling => {
        if (!visited.has(sibling)) {
          queue.push({ node: sibling, depth: depth + 1 });
        }
      });
    }
  }
  return -1; // not reachable
};