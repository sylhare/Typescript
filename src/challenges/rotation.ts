export function rotate(input: string): string {
  return input.split(' ').map(word => [...word].map(letter => {
    if (/[,.?!]/.test(letter)) return letter;
    if (/\d/.test(letter)) return `${rotN(parseInt(letter), 5)}`;
    return rot13(letter);
  }).join('')).join(' ');
}

const rot13 = (letter: string) => {
  const letterCode = letter.charCodeAt(0);
  const codeForA = letterCode === letter.toLowerCase().charCodeAt(0) ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
  return String.fromCharCode(rotN(letterCode, 13, codeForA, 26));
};

/**
 * To rotate a number (by default 5 from range 0 to 10)
 * (Example for a letter using its char code: `rotN(letterCode, 13, codeForA, 26)`)
 * @param number is the input number to be rotated.
 * @param rotation is the number of positions to rotate.
 * @param base is the starting point for the rotation.
 * @param range is the total number of possible values in the rotation.
 */
export const rotN = (number: number, rotation = 5, base = 0, range = 10) => ((number - base + rotation) % range) + base;

/**
 * rotate but I need... to... write... less... lines... 🤪
 * @param input
 */
export const rt = (input: string) => input.split(' ').map(word => [...word]
  .map(letter => /[,.?!]/.test(letter) ? letter : /\d/.test(letter) ? `${rotN(parseInt(letter))}` : rot13(letter))
  .join('')).join(' ');

// ---------

export const rotateArray = (a: string[], steps: number): string[] => {
  if (steps < 0) return a;
  return [...a.slice(steps), ...a.slice(0, steps)];
};

export const rotateSpaceO1 = (a: string[], steps: number): string[] => {
  const reverse = (start: number, end: number) => {
    while (start < end) {
      [a[start], a[end]] = [a[end], a[start]];
      start++;
      end--;
    }
  };
  const rotationIndex = steps % a.length;
  reverse(0, a.length - 1);
  reverse(0, rotationIndex - 1);
  reverse(rotationIndex, a.length - 1);
  return a;
};