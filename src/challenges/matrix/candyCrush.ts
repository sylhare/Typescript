/**
 * Candy Crush 1D
 * Time O(n^3)
 * Space 3 O(n)
 *
 */
export function Naive1DTracker<T>(board: T[]): T[] {
  let xStore: number[] = [];
  const toDelete = new Set();
  for (let x = 0; x < board.length; x++) {
    if (xStore.length < 1 || board[x] === board[xStore[0]]) {
      xStore.push(x);
    } else {
      xStore = [x];
    }

    if (xStore.length >= 3) {
      xStore.forEach((index) => toDelete.add(index));
    }
  }

  let input = [...board];
  let result = input.filter((_value, index) => !toDelete.has(index));
  while (result.length !== input.length) {
    input = result;
    result = Naive1DTracker(result);
  }
  return result;
}

/**
 *  Candy Crush 1D
 *  Time O(n^3)
 *  Space O(n)
 *
 *  Handle cascading and stabilization
 */
export function spliceCandyCrush1D<T>(board: T[]): T[] {
  if (!board.length) return [];

  const result = [...board];
  let changed = true;

  while (changed) {
    changed = false;
    let i = 0;

    while (i < result.length) {
      let j = i;
      while (j < result.length && result[j] === result[i]) {
        j++;
      }

      const sequenceLength = j - i;
      if (sequenceLength >= 3) {
        result.splice(i, sequenceLength);
        changed = true; // for cascading effect, to re-run the loop
      } else {
        i = j;
      }
    }
  }

  return result;
}

/**
 * Helper function to use the superCandyCrush1D with the test
 */
export function useSuperCandyCrush1D<T>(board: T[]): T[] {
  const numericBoard = [...board].map(value => {
    if (value === 'a' as unknown as T) return 1;
    if (value === 'b' as unknown as T) return 2;
    if (value === 'c' as unknown as T) return 3;
  }) as number[];

  const crushedResult = superCandyCrush1D(numericBoard);

  return crushedResult.filter(value => value !== 0).map(value => {
    if (value === 1) return 'a';
    if (value === 2) return 'b';
    if (value === 3) return 'c';
  }) as T[];
}

/**
 * Time O(k * n) with k the number of crush rounds
 * Space: O(1)
 */
export function superCandyCrush1D(board: number[]): number[] {
  while (true) {
    let crush = false;
    // mark elements to crush (by setting value to negative)
    for (let x = 0; x < board.length - 2; x++) {
      const value = Math.abs(board[x]);
      if (value !== 0 && Math.abs(board[x + 1]) === value && Math.abs(board[x + 2]) === value) {
        board[x] = board[x] > 0 ? -board[x] : board[x];
        board[x + 1] = board[x + 1] > 0 ? -board[x + 1] : board[x + 1];
        board[x + 2] = board[x + 2] > 0 ? -board[x + 2] : board[x + 2];
        crush = true;
      }
    }

    if (!crush) break;

    // remove crushed elements and shift remaining elements
    let writeIndex = 0;
    for (let readIndex = 0; readIndex < board.length; readIndex++) {
      if (board[readIndex] > 0) {
        board[writeIndex++] = board[readIndex];
      }
    }

    // fill the remaining positions with zeros
    while (writeIndex < board.length) {
      board[writeIndex++] = 0;
    }
  }

  return board;
}

/**
 * Time: O(n^2)
 * Space: O(n)
 */
export function fastCandyCrush1D<T>(board: T[]): T[] {
  if (!board.length) return [];

  let input = [...board];
  let hadCrush = true;

  while (hadCrush) {
    hadCrush = false;
    const stack: T[] = []; // deduplicated list of elements
    const counts: number[] = []; // size of each stack element's sequence

    for (const element of input) {
      if (stack.length > 0 && stack[stack.length - 1] === element) {
        counts[counts.length - 1]++;
      } else {
        stack.push(element);
        counts.push(1);
      }
    }

    const result: T[] = [];
    stack.forEach((element, i) => {
      if (counts[i] < 3) {
        result.push(...Array(counts[i]).fill(element));
      } else {
        hadCrush = true;
      }
    });

    if (hadCrush) {
      input = result;
    }
  }

  return input;
}

/**
 * Candy Crush 2D using naive approach
 * Time O((rows*cols)^3)
 * Space O(rows*cols)
 */
export function Naive2DTracker(board: number[][]): number[][] {
  if (!board.length) return [];

  const rowLength = board.length;
  const columnLength = board[0].length;
  const resultBoard = board.map(row => [...row]);
  let hasChanges = true;

  while (hasChanges) {
    hasChanges = false;
    const toDelete = new Set<string>(); // Store "y,x" coordinates as strings

    // Check rows for 3+ consecutive identical elements
    for (let y = 0; y < rowLength; y++) {
      let xStore: number[] = [];
      for (let x = 0; x < columnLength; x++) {
        const value = resultBoard[y][x];
        if (value === 0) {
          xStore = [];
          continue;
        }

        if (xStore.length < 1 || value === resultBoard[y][xStore[0]]) {
          xStore.push(x);
        } else {
          xStore = [x];
        }

        if (xStore.length >= 3) {
          xStore.forEach(idx => toDelete.add(`${y},${idx}`));
        }
      }
    }

    // Check columns for 3+ consecutive identical elements
    for (let x = 0; x < columnLength; x++) {
      let yStore: number[] = [];
      for (let y = 0; y < rowLength; y++) {
        const value = resultBoard[y][x];
        if (value === 0) {
          yStore = [];
          continue;
        }

        if (yStore.length < 1 || value === resultBoard[yStore[0]][x]) {
          yStore.push(y);
        } else {
          yStore = [y];
        }

        if (yStore.length >= 3) {
          yStore.forEach(yIndex => toDelete.add(`${yIndex},${x}`));
        }
      }
    }

    // Mark elements for deletion
    if (toDelete.size > 0) {
      hasChanges = true;
      toDelete.forEach(coordinate => {
        const [y, x] = coordinate.split(',').map(Number);
        resultBoard[y][x] = 0;
      });

      // Apply gravity - set crush to 0, elements fall down in each column
      for (let x = 0; x < columnLength; x++) {
        let bottom = rowLength - 1;
        for (let y = rowLength - 1; y >= 0; y--) {
          // eslint-disable-next-line max-depth
          if (resultBoard[y][x] !== 0) {
            resultBoard[bottom--][x] = resultBoard[y][x];
          }
        }

        while (bottom >= 0) {
          resultBoard[bottom--][x] = 0; // Fill empty spaces at the top with zeros
        }
      }
    }
  }

  return resultBoard;
}

/**
 * Time O(k* row length * column length) with k the number of crush round
 * Space: O(1)
 */
export function superCandyCrush2D(board: number[][]): number[][] {
  const rowLength = board.length, columnLength = board[0].length;
  const markForCrush = (value: number) => value > 0 ? -value : value;

  while (true) {
    let hasCrush = false;
    for (let y = 0; y < rowLength; y++) {
      for (let x = 0; x < columnLength - 2; x++) {
        const value = Math.abs(board[y][x]);

        if (value !== 0 && [board[y][x + 1], board[y][x + 2]].every(cell => Math.abs(cell) === value)) {
          board[y][x] = markForCrush(board[y][x]);
          board[y][x + 1] = markForCrush(board[y][x + 1]);
          board[y][x + 2] = markForCrush(board[y][x + 2]);
          hasCrush = true;
        }
      }
    }
    for (let x = 0; x < columnLength; x++) {
      for (let y = 0; y < rowLength - 2; y++) {
        const value = Math.abs(board[y][x]);

        if (value !== 0 && [board[y + 1][x], board[y + 2][x]].every(cell => Math.abs(cell) === value)) {
          board[y][x] = markForCrush(board[y][x]);
          board[y + 1][x] = markForCrush(board[y + 1][x]);
          board[y + 2][x] = markForCrush(board[y + 2][x]);
          hasCrush = true;
        }
      }
    }
    if (!hasCrush) break;

    for (let x = 0; x < columnLength; x++) {
      let bottom = rowLength - 1;
      for (let y = rowLength - 1; y >= 0; y--) {

        if (board[y][x] > 0) {
          board[bottom--][x] = board[y][x];
        }
      }
      while (bottom >= 0) {
        board[bottom--][x] = 0;
      }
    }
  }
  return board;
}

/**
 * To go further using the 2D example in 3D
 * @param board
 */
export function superCandyCrush3D(board: number[][][]): number[][][] {
  const depthLength = board.length;       // z dimension
  const rowLength = board[0].length;      // y dimension
  const columnLength = board[0][0].length; // x dimension
  const markForCrush = (value: number) => value > 0 ? -value : value;

  while (true) {
    let crush = false;

    // Check matches along x-axis (horizontal within each layer)
    for (let z = 0; z < depthLength; z++) {
      for (let y = 0; y < rowLength; y++) {
        for (let x = 0; x < columnLength - 2; x++) {
          const value = Math.abs(board[z][y][x]);
          // eslint-disable-next-line max-depth
          if (value !== 0 && [board[z][y][x + 1], board[z][y][x + 2]].every(cell => Math.abs(cell) === value)) {
            board[z][y][x] = markForCrush(board[z][y][x]);
            board[z][y][x + 1] = markForCrush(board[z][y][x + 1]);
            board[z][y][x + 2] = markForCrush(board[z][y][x + 2]);
            crush = true;
          }
        }
      }
    }

    // Check matches along y-axis (vertical within each layer)
    for (let z = 0; z < depthLength; z++) {
      for (let x = 0; x < columnLength; x++) {
        for (let y = 0; y < rowLength - 2; y++) {
          const value = Math.abs(board[z][y][x]);
          // eslint-disable-next-line max-depth
          if (value !== 0 && [board[z][y + 1][x], board[z][y + 2][x]].every(cell => Math.abs(cell) === value)) {
            board[z][y][x] = markForCrush(board[z][y][x]);
            board[z][y + 1][x] = markForCrush(board[z][y + 1][x]);
            board[z][y + 2][x] = markForCrush(board[z][y + 2][x]);
            crush = true;
          }
        }
      }
    }

    // Check matches along z-axis (depth)
    for (let y = 0; y < rowLength; y++) {
      for (let x = 0; x < columnLength; x++) {
        for (let z = 0; z < depthLength - 2; z++) {
          const value = Math.abs(board[z][y][x]);
          // eslint-disable-next-line max-depth
          if (value !== 0 && [board[z + 1][y][x], board[z + 2][y][x]].every(cell => Math.abs(cell) === value)) {
            board[z][y][x] = markForCrush(board[z][y][x]);
            board[z + 1][y][x] = markForCrush(board[z + 1][y][x]);
            board[z + 2][y][x] = markForCrush(board[z + 2][y][x]);
            crush = true;
          }
        }
      }
    }

    if (!crush) break;

    // Apply gravity - elements fall along the z-axis
    for (let y = 0; y < rowLength; y++) {
      for (let x = 0; x < columnLength; x++) {
        let bottom = depthLength - 1;
        for (let z = depthLength - 1; z >= 0; z--) {
          // eslint-disable-next-line max-depth
          if (board[z][y][x] > 0) {
            board[bottom--][y][x] = board[z][y][x];
          }
        }
        while (bottom >= 0) {
          board[bottom--][y][x] = 0;
        }
      }
    }
  }

  return board;
}