import { isPalindrome } from './palindroms';

export function palindromePairsMap(words: string[]): number[][] {
  const wordMap = new Map(), ans = [];

  for (let i = 0; i < words.length; i++) {
    wordMap.set(words[i], i);
  }

  for (let i = 0; i < words.length; i++) {
    if (words[i] === '') {
      for (let j = 0; j < words.length; j++) {
        // eslint-disable-next-line max-depth
        if (isPalindrome(words[j]) && j !== i) {
          ans.push([i, j], [j, i]);
        }
      }
      continue;
    }

    const reverseStr = words[i].split('').reverse().join('');
    const res = wordMap.get(reverseStr);

    if (res !== undefined && res !== i) {
      ans.push([i, res]);
    }

    for (let j = 1; j < reverseStr.length; j++) {
      if (isPalindrome(reverseStr, 0, j - 1)) {
        const res = wordMap.get(reverseStr.slice(j));
        // eslint-disable-next-line max-depth
        if (res !== undefined)
          ans.push([i, res]);
      }
      if (isPalindrome(reverseStr, j)) {
        const res = wordMap.get(reverseStr.slice(0, j));
        // eslint-disable-next-line max-depth
        if (res !== undefined)
          ans.push([res, i]);
      }
    }
  }

  return ans;
}

