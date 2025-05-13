export function isPalindromeAt(word: string, start: number): boolean {
  return isPalindrome(word, start, word.length - 1);
}

export function isPalindrome(word: string, left = 0, right = word.length - 1): boolean {
  while (left < right) {
    if (word[left++] !== word[right--]) return false;
  }
  return true;
}
