/**
 * O(n^2) solution tracking all matches
 */
export function minWindowAllResults(source: string, target: string): string {
  const targetToFind = target.split('');
  const result: { result: string[]; toFind: string[]; }[] = [];

  for (const letter of source) {
    if (targetToFind.includes(letter)) {
      result.push({ result: [], toFind: [...targetToFind] });
      result.forEach(contender => {
        if (contender.toFind.length === 0) return;
        const letterToFindIndex = contender.toFind.findIndex((l) => l === letter);
        if (letterToFindIndex >= 0) {
          contender.toFind.splice(letterToFindIndex, 1);
        }
        contender.result.push(letter);
      });
    } else {
      result.forEach(contender => {
        if (contender.toFind.length > 0) {
          contender.result.push(letter);
        }
      });
    }
  }

  return result.reduce<string[]>((acc, current) => {
    if (current.toFind.length === 0) {
      if (acc.length === 0 || current.result.length < acc.length) {
        acc = current.result;
      }
    }
    return acc;
  }, []).join('');
}

/**
 * O(n) solution tracking the window
 */
export function slidingWindowAllInOne(source: string, target: string): string {
  if (target === '' || target.length > source.length) return '';
  if (target === source) return target;
  const targetMap = new Map();
  for (const char of target) {
    targetMap.set(char, (targetMap.get(char) || 0) + 1);
  }
  let missing = target.length, pointer = 0, window = { start: 0, end: 0 };

  for (let i = 0; i < source.length; i++) {
    const letter = source[i];
    const frequency = targetMap.get(letter) || 0;
    if (frequency > 0) {
      missing--;
    }
    targetMap.set(letter, frequency - 1);

    while (missing === 0) {
      const currentWindow = i + 1 - pointer;
      const smallestWindow = window.end - window.start;
      if (smallestWindow === 0 || currentWindow < smallestWindow) {
        window = { start: pointer, end: i + 1 };
      }
      const pointerLetter = source[pointer];
      const newFrequency = (targetMap.get(pointerLetter) || 0) + 1;
      targetMap.set(pointerLetter, newFrequency);
      if (newFrequency > 0) {
        missing++;
      }
      pointer++;
    }
  }

  return source.substring(window.start, window.end);
}