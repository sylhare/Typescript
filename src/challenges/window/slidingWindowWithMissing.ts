export function slidingWindowWithMissing(source: string, target: string): string {
  if (target === '' || target.length > source.length) return '';
  if (target === source) return target;
  const letterFrequency = new LetterFrequency(target);
  const window = new SlidingWindow();
  let pointer = 0;

  for (let i = 0; i < source.length; i++) {
    const letter = source[i];
    letterFrequency.add(letter);

    while (letterFrequency.isMatching()) {
      window.update(pointer, i + 1);
      const pointerLetter = source[pointer];
      letterFrequency.remove(pointerLetter);
      pointer++;
    }
  }

  return window.substring(source);
}

class SlidingWindow {
  private start = 0;
  private end = 0;

  length() {
    return this.end - this.start;
  }

  update(start: number, end: number) {
    if (this.length() === 0 || end - start < this.length()) {
      this.start = start;
      this.end = end;
    }
  }

  substring(source: string) {
    return source.substring(this.start, this.end);
  }
}

class LetterFrequency {
  private readonly frequencyMap: Map<string, number>;
  private missing = 0;

  constructor(target: string) {
    this.frequencyMap = [...target]
      .reduce((map, char) => map.set(char, (map.get(char) || 0) + 1), new Map());
    this.missing = target.length;
  }

  isMatching() {
    return this.missing === 0;
  }

  add(letter: string) {
    const frequency = this.frequencyMap.get(letter) || 0;
    if (frequency > 0) {
      this.missing--;
    }
    this.frequencyMap.set(letter, frequency - 1);
  }

  remove(letter: string) {
    const newFrequency = (this.frequencyMap.get(letter) || 0) + 1;
    this.frequencyMap.set(letter, newFrequency);
    if (newFrequency > 0) {
      this.missing++;
    }
  }
}