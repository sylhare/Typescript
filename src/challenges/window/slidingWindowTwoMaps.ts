export function slidingWindowMatchWindow(source: string, target: string): string {
  if (target === '') return '';
  const targetMap = [...target]
    .reduce((map, char) => map.set(char, (map.get(char) || 0) + 1), new Map());

  let pointer = 0, i = 0;
  const current = new MatchWindow(targetMap, source);

  while (i < source.length) {
    const char = source[i];
    i++;

    if (targetMap.has(char)) {
      current.add(char);
    }

    while (current.isValid()) {
      const leftChar = source[pointer];
      current.updateSubstring(i - pointer, pointer);

      if (targetMap.has(leftChar)) {
        current.remove(leftChar);
      }
      pointer++;
    }
  }

  return current.substring();
}

class MatchWindow {
  private window = new Map<string, number>();
  private currentLetterMatch = 0;
  size = Infinity;
  begin = 0;

  constructor(
    private readonly targetLetterFrequency: Map<string, number>,
    private readonly source: string,
  ) {
  }

  add(letter: string) {
    const newFrequency = (this.window.get(letter) || 0) + 1;
    this.window.set(letter, newFrequency);
    if (this.targetLetterFrequency.get(letter) === newFrequency) {
      this.currentLetterMatch++;
    }
  }

  remove(letter: string) {
    const letterFrequency = this.window.get(letter)!;
    this.window.set(letter, letterFrequency - 1);
    if (this.targetLetterFrequency.get(letter) === letterFrequency) {
      this.currentLetterMatch--;
    }
  }

  isValid() {
    return this.currentLetterMatch === this.targetLetterFrequency.size;
  }

  updateSubstring(size: number, begin: number) {
    if (size < this.size) {
      this.begin = begin;
      this.size = size;
    }
  }

  substring() {
    return this.size === Infinity ? '' : this.source.substring(this.begin, this.begin + this.size);
  }
}

