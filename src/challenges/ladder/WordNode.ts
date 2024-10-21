import { isAlmostEqual } from './wordLadder';

export class WordNode {
  parents: string[] = [];
  private connections: WordNode[] = [];

  constructor(readonly word: string) {
    this.buildPotentialParents();
  }

  canLink(other: WordNode, visited: WordNode[] = []): boolean {
    console.log(this.word, other.word);
    if (this.isAlmostEqual(other)) return true;
    if (visited.some(node => node.isEqual(this))) return false;
    visited.push(this);
    return this.connections.some(connectedNode => connectedNode.canLink(other, visited));
  }

  link(other: WordNode, visited: WordNode[] = []): boolean | undefined {
    if (this.isAlmostEqual(other)) {
      other.connections.push(this);
      return !!this.connections.push(other);
    } else if (!visited.includes(this)) {
      return this.connections.filter(node => node.link(other, visited.concat([this]))).length > 0;
    }
  }

  /**
   * Differ by only 1 or less character.
   */
  private isAlmostEqual = (other: WordNode): boolean => {
    return isAlmostEqual(this.word, other.word);
  };

  /**
   * Find the shortest path, (Infinity is unreachable)
   */
  path(destination: WordNode, visited: WordNode[] = []): number {
    if (this.isEqual(destination)) return 0;
    if (visited.some(node => node.isEqual(this))) return Infinity;

    const pathLengths: number[] = [];
    for (const connectedNode of this.connections) {
      const pathLength = connectedNode.path(destination, visited.concat([this]));
      if (pathLength !== Infinity) pathLengths.push(pathLength);
    }
    return pathLengths.length === 0 ? Infinity : Math.min(...pathLengths) + 1;
  }

  private isEqual(other: WordNode) {
    return this.word === other.word;
  }


  serialize(): string {
    const queue: WordNode[] = [this];
    const visited: Set<WordNode> = new Set();
    const serializedData: string[] = [];

    while (queue.length > 0) {
      const node = queue.shift()!;
      if (!visited.has(node)) {
        visited.add(node);
        const connections = node.connections.map(conn => conn.word).join(', ');
        serializedData.push(`${node.word}: [${connections}]`);
        queue.push(...node.connections);
      }
    }

    return serializedData.join('\n');
  }
}