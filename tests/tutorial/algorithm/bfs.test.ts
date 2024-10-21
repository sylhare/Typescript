import { bfs } from '../../../src/tutorial/algorithm/bfs';

describe('BFS Algorithm', () => {
  it('should find the shortest path in a simple graph', () => {
    const graph = {
      'A': ['B', 'C'],
      'B': ['D'],
      'C': ['D'],
      'D': []
    };
    expect(bfs('A', 'D', graph)).toEqual(3);
  });

  it('should return -1 if the target node is not reachable', () => {
    const graph = {
      'A': ['B'],
      'B': ['C'],
      'C': [],
      'D': []
    };
    expect(bfs('A', 'D', graph)).toEqual(-1);
  });

  it('should handle a more complex graph', () => {
    const graph = {
      'A': ['B', 'C'],
      'B': ['D', 'E'],
      'C': ['F'],
      'D': ['G'],
      'E': ['G'],
      'F': ['G'],
      'G': []
    };
    expect(bfs('A', 'G', graph)).toEqual(4);
  });
});