export function isPalindrome(word: string, start: number): boolean {
  let left = start, right = word.length - 1;
  while (left < right) {
    if (word[left++] !== word[right--]) return false;
  }
  return true;
}

