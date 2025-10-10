/**
 * Regular Expression Matching
 * @param s input string to match
 * @param p pattern string with '.' and '*' wildcards
 * @returns true if string matches pattern
 */
export function regexMatching(s: string, p: string): boolean {
  const m = s.length;
  const n = p.length;
  
  // Create DP table: dp[i][j] = true if s[0...i-1] matches p[0...j-1]
  const dp: boolean[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
  
  // Base case: empty string matches empty pattern
  dp[0][0] = true;
  
  // Handle patterns like a*, a*b*, a*b*c* that can match empty string
  for (let j = 2; j <= n; j += 2) {
    if (p[j - 1] === '*') {
      dp[0][j] = dp[0][j - 2];
    }
  }
  
  // Fill the DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const sChar = s[i - 1];
      const pChar = p[j - 1];
      
      if (pChar === '*') {
        // Current pattern character is '*'
        const prevPChar = p[j - 2]; // Character before '*'
        
        // Case 1: Match zero occurrences of the character before '*'
        dp[i][j] = dp[i][j - 2];
        
        // Case 2: Match one or more occurrences (if characters match)
        if (prevPChar === sChar || prevPChar === '.') {
          dp[i][j] = dp[i][j] || dp[i - 1][j];
        }
      } else {
        // Current pattern character is not '*'
        // Must match exactly (or '.' matches any character)
        if (pChar === sChar || pChar === '.') {
          dp[i][j] = dp[i - 1][j - 1];
        }
        // If characters don't match, dp[i][j] remains false
      }
    }
  }
  
  return dp[m][n];
}
