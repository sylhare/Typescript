/**
 * Coin Change - Minimum Coins
 * @param coins array of coin denominations
 * @param amount target amount to make
 * @returns minimum number of coins needed, or -1 if impossible
 */
export function coinChange(coins: number[], amount: number): number {
  if (amount < 0 || coins.length === 0) return -1;
  if (amount === 0) return 0;

  const dp: number[] = Array(amount + 1).fill(Infinity) as number[];
  dp[0] = 0;

  for (const coin of coins) {
    for (let i = coin; i <= amount; i++ ) {
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

export function greedyCoinChange(coins: number[], amount: number): number {
  if (amount === 0) return 0;
  if (amount < 0) return 0;
  if (coins.length === 0) return -1;

  const sortedCoins = coins.filter(coin => coin > 0).sort((a, b) => b - a);

  if (sortedCoins.length === 0) return -1;

  const smallestCoin = sortedCoins[sortedCoins.length - 1];
  if (smallestCoin > amount) return -1;

  let remaining = amount;
  let count = 0;

  for (const coin of sortedCoins) {
    const numCoins = Math.floor(remaining / coin);
    count += numCoins;
    remaining -= numCoins * coin;
  }

  return remaining === 0 ? count : -1;
}