// Solution 1
class Encoder {
  private current: { size: number; letter: string } = { size: 0, letter: '' };
  private encoded: string = '';

  static encode(input: string): string {
    const result = input.split('').reduce(Encoder.reducer, new Encoder());
    if (result.isNotCurrentEmpty()) {
      result.encodeCurrent();
    }
    return result.encoded;
  }

  private static reducer(result: Encoder, letter: string): Encoder {
    if (result.isSameLetter(letter) && result.isNotCurrentEmpty()) {
      result.encodeCurrent();
    }
    result.updateCurrent(letter);
    return result;
  }

  private isNotCurrentEmpty(): boolean {
    return this.current.size > 0;
  }

  private isSameLetter(letter: string): boolean {
    return this.current.letter !== letter;
  }

  private encodeCurrent(): void {
    this.encoded += this.current.size + this.current.letter;
    this.current.size = 0;
  }

  private updateCurrent(letter: string) {
    this.current = { letter, size: ++this.current.size };
  }
}

// Solution 2
export function encodeFor(input: string): string {
  let result = '', current = '', count = 0;
  for (const char of input) {
    if (char !== current && count > 0) {
      result += count.toString() + current;
      count = 0;
    }
    current = char;
    ++count;
  }
  return result + (count ? count + current : '');
}

// Solution 3
type Result = { encoded: string, size: number, letter: string };
export function encodeReduce(input: string): string {
  const result = input.split('').reduce((result: Result, letter) => {
    const isNewLetter = result.letter !== letter && result.size > 0;
    return {
      encoded: result.encoded + (isNewLetter ? result.size + result.letter : ''),
      letter, size: (isNewLetter ? 1 : ++result.size),
    };
  }, { encoded: '', size: 0, letter: '' });
  return result.encoded + (result.size ? result.size + result.letter : '');
}

export function encodeClass(input: string): string {
  return Encoder.encode(input);
}