export const isAlmostEqual = (word: string, other: string): boolean => {
  let differences = 0;
  for (let i = 0; i < word.length; i++) {
    if (word[i] !== other[i] && ++differences > 1) {
      return false;
    }
  }
  return true;
};
