type Position = [number, number];
type Move = { destination: Position; path: Position[] };

const DIRECTIONS: Record<string, Position[]> = {
  rook: [[0, 1], [0, -1], [1, 0], [-1, 0]],
  bishop: [[1, 1], [1, -1], [-1, 1], [-1, -1]],
  queen: [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]],
};

/**
 * The algorithm counts all valid ways to assign destinations to chess pieces so that,
 * as they move toward their destinations (one square per second, simultaneously),
 * no two pieces ever occupy the same square at the same time.
 * Steps:
 * - For each piece, generate all possible moves (destinations and the path to reach them).
 * - Build all possible combinations of destinations for all pieces (cartesian product).
 * For each combination:
 *  - Check that no two pieces have the same destination.
 *  - Simulate their movement step-by-step, ensuring no two pieces share a square at any time.
 *  - Count the combinations that pass both checks.
 */
export function countValidMoveCombinations(pieces: string[], positions: number[][]): number {
  const allMoves = pieces.map((p, i) => generatePieceMoves(p, positions[i] as Position));
  const combinations = cartesianProduct(allMoves);

  return combinations.filter(combo =>
    !hasDuplicateDestination(combo) && isValidMovement(combo),
  ).length;
}

/**
 * Generates all possible moves for a given chess piece from a specific position.
 */
function generatePieceMoves(piece: string, [r, c]: Position): Move[] {
  const moves: Move[] = [{ destination: [r, c], path: [[r, c]] }];

  for (const [dr, dc] of DIRECTIONS[piece] || []) {
    let [nr, nc] = [r, c];
    const path: Position[] = [[r, c]];

    while (nr + dr >= 1 && nr + dr <= 8 && nc + dc >= 1 && nc + dc <= 8) {
      nr += dr;
      nc += dc;
      path.push([nr, nc]);
      moves.push({ destination: [nr, nc], path: [...path] });
    }
  }

  return moves;
}

/**
 * Computes the cartesian product to generate all move combinations.
 */
function cartesianProduct(arrays: Move[][]): Move[][] {
  return arrays.reduce((acc, curr) =>
    acc.flatMap(a => curr.map(c => [...a, c])),
    [[]] as Move[][],
  );
}

/**
 * Checks if there are duplicate destinations in the given moves.
 */
function hasDuplicateDestination(moves: Move[]): boolean {
  const keys = moves.map(m => `${m.destination[0]},${m.destination[1]}`);
  return keys.length !== new Set(keys).size;
}

/**
 * Validates that no two pieces occupy the same square at the same time during their movement.
 */
function isValidMovement(moves: Move[]): boolean {
  const maxSteps = Math.max(...moves.map(m => m.path.length)) - 1;

  return Array.from({ length: maxSteps + 1 }, (_, t) => {
    const positions = moves.map(m => m.path[Math.min(t, m.path.length - 1)]);
    const keys = positions.map(([r, c]) => `${r},${c}`);
    return keys.length === new Set(keys).size;
  }).every(Boolean);
}