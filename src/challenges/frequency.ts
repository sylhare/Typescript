export function frequencySortWithMap(s: string): string {
  const freq = new Map<string, number>();

  for (const ch of s) {
    freq.set(ch, (freq.get(ch) || 0) + 1);
  }

  const sortedChars = Array.from(freq.entries()).sort((a, b) => b[1] - a[1]);

  let result = '';
  for (const [ch, count] of sortedChars) {
    result += ch.repeat(count);
  }

  return result;
}

/**
 * Sorts the string based on character frequency using an ASCII array.
 * Characters with higher frequency come first; for equal frequency, characters
 * with lower ASCII values come first.
 *
 * @param {string} s - The input string.
 * @returns {string} - The frequency sorted string.
 */
export function frequencySortAscii(s: string): string {
  const freq = new Array(128).fill(0);

  for (let i = 0; i < s.length; i++) {
    freq[s.charCodeAt(i)]++;
  }

  const pairs: { ch: string; count: number }[] = [];
  for (let ascii = 0; ascii < 128; ascii++) {
    if (freq[ascii] > 0) {
      pairs.push({ ch: String.fromCharCode(ascii), count: freq[ascii] });
    }
  }

  pairs.sort((a, b) => {
    if (b.count !== a.count) {
      return b.count - a.count;
    }
    return a.ch.charCodeAt(0) - b.ch.charCodeAt(0);
  });

  let result = '';
  for (const { ch, count } of pairs) {
    result += ch.repeat(count);
  }
  return result;
}