/**
 * Tree node
 */
export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val ?? 0;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

/**
 * Find maximum path sum in binary tree
 * @param root root node of binary tree
 * @returns maximum path sum
 */
export function binaryTreeMaxPath(root: TreeNode | null): number {
  if (!root) return 0;
  
  let best = -Infinity;
  function dfs(node: TreeNode | null): number {
    if (!node) return 0;
    const left = Math.max(0, dfs(node.left));
    const right = Math.max(0, dfs(node.right));
    best = Math.max(best, node.val + left + right);
    return node.val + Math.max(left, right);
  }

  dfs(root);
  return best;
}
