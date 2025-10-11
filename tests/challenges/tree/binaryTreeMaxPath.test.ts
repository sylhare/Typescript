import { binaryTreeMaxPath, TreeNode } from '../../../src/challenges/tree/binaryTreeMaxPath';

/**
 * Binary Tree Maximum Path Sum
 *
 * PROBLEM:
 * Given a non-empty binary tree, return the maximum path sum.
 * A path may start and end at any node and must contain at least one node.
 *
 * PATTERN: DFS postorder computing max downward path from node;
 * track global max combining left+right+node.
 * TIME COMPLEXITY: O(n) - visit each node once
 * SPACE COMPLEXITY: O(h) - recursion stack depth (h = height of tree)
 *
 * DFS postorder solution to find maximum sum path through binary tree
 */
describe('Binary Tree Maximum Path Sum', () => {

  describe.each([
    { algorithm: binaryTreeMaxPath, name: 'Binary Tree Max Path' },
  ])('Test algorithm: $name', ({ algorithm }) => {
    describe.each([
      {
        input: () => new TreeNode(1, new TreeNode(2), new TreeNode(3)),
        expected: 6,
        name: 'simple tree with all positive values',
      },
      {
        input: () => new TreeNode(-10, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7))),
        expected: 42,
        name: 'tree with negative root but positive path',
      },
      {
        input: () => new TreeNode(1),
        expected: 1,
        name: 'single node tree',
      },
      {
        input: () => new TreeNode(-3),
        expected: -3,
        name: 'single negative node',
      },
      {
        input: () => new TreeNode(5,
          new TreeNode(4, new TreeNode(11, new TreeNode(7), new TreeNode(2))),
          new TreeNode(8, new TreeNode(13), new TreeNode(4, null, new TreeNode(1))),
        ),
        expected: 48,
        name: 'complex tree with multiple paths',
      },
      {
        input: () => new TreeNode(-1, new TreeNode(-2), new TreeNode(-3)),
        expected: -1,
        name: 'all negative values',
      },
      {
        input: () => new TreeNode(0, new TreeNode(-1), new TreeNode(1)),
        expected: 1,
        name: 'tree with zero and negative values',
      },
      {
        input: () => new TreeNode(2, new TreeNode(-1)),
        expected: 2,
        name: 'tree with negative child',
      },
      {
        input: () => new TreeNode(1, new TreeNode(2, new TreeNode(3))),
        expected: 6,
        name: 'left-skewed tree',
      },
      {
        input: () => new TreeNode(1, null, new TreeNode(2, null, new TreeNode(3))),
        expected: 6,
        name: 'right-skewed tree',
      },
      {
        input: () => new TreeNode(10, new TreeNode(5, new TreeNode(1), new TreeNode(8)), new TreeNode(15, null, new TreeNode(7))),
        expected: 45,
        name: 'balanced tree with optimal path through root',
      },
      {
        input: () => new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3, new TreeNode(6), new TreeNode(7))),
        expected: 18,
        name: 'complete binary tree',
      },
      {
        input: () => new TreeNode(-5, new TreeNode(2, new TreeNode(3), new TreeNode(-1)), new TreeNode(4, null, new TreeNode(1))),
        expected: 5,
        name: 'mixed positive/negative with optimal subtree path',
      },
      {
        input: () => new TreeNode(100, new TreeNode(-100, new TreeNode(50)), new TreeNode(-100, null, new TreeNode(50))),
        expected: 100,
        name: 'large positive root with negative children',
      },
      {
        input: () => new TreeNode(0),
        expected: 0,
        name: 'single zero node',
      },
      {
        input: () => {
          // Create a deeper tree: 1-2-3-4-5
          const root = new TreeNode(1);
          root.left = new TreeNode(2);
          root.left.left = new TreeNode(3);
          root.left.left.left = new TreeNode(4);
          root.left.left.left.left = new TreeNode(5);
          return root;
        },
        expected: 15,
        name: 'deep left chain',
      },
      {
        input: () => {
          // Binary search tree structure
          const root = new TreeNode(8);
          root.left = new TreeNode(4, new TreeNode(2), new TreeNode(6));
          root.right = new TreeNode(12, new TreeNode(10), new TreeNode(14));
          return root;
        },
        expected: 44,
        name: 'binary search tree structure',
      },
      {
        input: () => {
          // Tree where max path doesn't include root
          const root = new TreeNode(1);
          root.left = new TreeNode(100, new TreeNode(50), new TreeNode(75));
          root.right = new TreeNode(2);
          return root;
        },
        expected: 225,
        name: 'max path in subtree, not through root',
      },
    ])(`$name`, ({ input, expected }) => {
      it(`returns ${expected}`, () => {
        const tree = input();
        expect(algorithm(tree)).toEqual(expected);
      });
    });

    describe('Edge cases', () => {
      it('should handle null root', () => {
        expect(algorithm(null)).toEqual(0);
      });
    });
  });
});
