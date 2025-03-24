export function wordCut(input: string): Set<string> {
  return new Set(input.replace(/[!?.,]/g, '').split(' '));
}

export const wordCount = (input: string): Map<string, number> => {
  const result: Map<string, number> = new Map();
  input.toLowerCase().replace(/[!?.,]/g, '').split(' ')
    .forEach(word => result.set(word, result.has(word) ? result.get(word)! + 1 : 1));
  return result;
};