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

export const rotN = (number: number, rotation = 5, base = 0, range = 10) => ((number - base + rotation) % range) + base;

/**
 * rotate but I need... to... write... less... lines... 🤪
 * @param input
 */
export const rt = (input: string) => input.split(' ').map(word => [...word]
  .map(letter => /[,.?!]/.test(letter) ? letter : /\d/.test(letter) ? `${rotN(parseInt(letter))}` : rot13(letter))
  .join('')).join(' ');