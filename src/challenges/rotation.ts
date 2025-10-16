/**
 * Rotates text using ROT13 cipher for letters and ROT5 for numbers.
 * Punctuation marks are left unchanged.
 *
 * @param input - The input string to rotate
 * @returns The rotated string with letters rotated by 13 and numbers by 5
 */
export function rotate(input: string): string {
  return input.split(' ').map(word => [...word].map(letter => {
    if (/[,.?!]/.test(letter)) return letter;
    if (/\d/.test(letter)) return `${rotN(parseInt(letter), 5)}`;
    return rot13(letter);
  }).join('')).join(' ');
}

/**
 * rotate but condensed
 * @param input
 */
export const rt = (input: string): string => input.split(' ').map(word => [...word]
  .map(letter => /[,.?!]/.test(letter) ? letter : /\d/.test(letter) ? `${rotN(parseInt(letter))}` : rot13(letter))
  .join('')).join(' ');

/**
 * Applies ROT13 cipher to a single letter, preserving case.
 * ROT13 rotates each letter by 13 positions in the alphabet.
 *
 * @param letter - A single letter to rotate (a-z or A-Z)
 * @returns The rotated letter with case preserved
 */
const rot13 = (letter: string): string => {
  const letterCode = letter.charCodeAt(0);
  const codeForA = letterCode === letter.toLowerCase().charCodeAt(0) ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
  return String.fromCharCode(rotN(letterCode, 13, codeForA, 26));
};

/**
 * To rotate a number (by default 5 from range 0 to 10)
 * (Example with ROT13 for a letter using its char code: `rotN(letterCode, 13, codeForA, 26)`)
 * @param number is the input number to be rotated.
 * @param rotation is the number of positions to rotate.
 * @param base is the starting point for the rotation.
 * @param range is the total number of possible values in the rotation.
 */
export const rotN = (number: number, rotation = 5, base = 0, range = 10): number => {
  // ((number - base + rotation) % range) + base // only works with positive rotation, since % in JS can return negative values
  // (number - base) - Normalizes the value to zero-based indexing.
  // (number - base + rotation) - Applies the rotation.
  // ((number - base + rotation) % range + range) % range - Handles negative rotations by adding the range and modulo again.
  // ... + base - Converts back to the original range by adding the base.
  return (((number - base + rotation) % range + range) % range) + base;
};

/**
 * Rotates an array of strings to the right by a specified number of positions.
 * Creates a new array rather than modifying the original.
 *
 * @param a - The array to rotate
 * @param steps - The number of positions to rotate to the right
 * @returns A new array with elements rotated to the right
 */
export const rotateArray = (a: string[], steps: number): string[] => {
  if (steps < 0) return a;
  const effectiveSteps = steps % a.length;
  if (effectiveSteps === 0) return [...a];
  return [...a.slice(-effectiveSteps), ...a.slice(0, -effectiveSteps)];
};

/**
 * Rotates an array of strings to the right by a specified number of positions.
 * Modifies the array in-place using O(1) extra space with the three-reverse algorithm.
 *
 * @param a - The array to rotate (will be modified)
 * @param steps - The number of positions to rotate to the right
 * @returns The modified array with elements rotated to the right
 */
export const rotateSpaceO1 = (a: string[], steps: number): string[] => {
  if (steps < 0) return a;
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

/**
 * Cipher method that rotates only A-Z letters forward or backward.
 * Input is converted to uppercase and non A-Z characters are filtered out.
 *
 * @param input - The input string to cipher
 * @param rotation - The number of positions to rotate (positive for forward, negative for backward)
 * @returns The ciphered string with only A-Z letters rotated
 */
export const cipher = (input: string, rotation: number): string => {
  return input.toUpperCase().split('').filter(char => /[A-Z]/.test(char)).map(char => {
    const charCode = char.charCodeAt(0);
    const baseA = 'A'.charCodeAt(0);

    return String.fromCharCode(rotN(charCode, rotation, baseA, 26));
  }).join('');
};