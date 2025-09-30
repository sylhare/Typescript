import { coinChange, greedyCoinChange } from '../../../src/challenges/dynamic/coinChange';

/**
 * Coin Change - Minimum Coins
 * 
 * PROBLEM:
 * Given coins of different denominations and a total amount, compute the fewest 
 * number of coins needed to make up that amount. Return -1 if impossible.
 * 
 * PATTERN: Unbounded knapsack / DP over amounts (bottom-up).
 * TIME COMPLEXITY: O(amount * num_coins) - nested loops over amount and coins
 * SPACE COMPLEXITY: O(amount) - DP array storage
 * 
 * Dynamic Programming solution for minimum coins to make amount
 */
describe('Coin Change', () => {

  describe.each([
    { algorithm: coinChange, name: 'Coin Change with DP' },
  ])('Test algorithm: $name', ({ algorithm }) => {
    describe.each([
      { input: { coins: [1, 3, 4], amount: 6 }, expected: 2, name: 'basic case - 3+3=6 (failing with greedy)' },
      { input: { coins: [2], amount: 3 }, expected: -1, name: 'impossible case - odd amount with even coins' },
      { input: { coins: [1], amount: 0 }, expected: 0, name: 'amount is zero' },
      { input: { coins: [1], amount: 1 }, expected: 1, name: 'single coin matches amount' },
      { input: { coins: [1], amount: 2 }, expected: 2, name: 'multiple of single coin' },
      { input: { coins: [1, 2, 5], amount: 11 }, expected: 3, name: 'classic case - 5+5+1=11' },
      { input: { coins: [2, 3, 5], amount: 9 }, expected: 3, name: 'no single coin solution - 3+3+3=9 (failing with greedy)' },
      { input: { coins: [1, 4, 6, 8], amount: 11 }, expected: 3, name: 'complex optimization - 1+4+6=11' },
      { input: { coins: [], amount: 1 }, expected: -1, name: 'empty coins array' },
      { input: { coins: [5, 10, 25], amount: 30 }, expected: 2, name: 'US coins subset - 5+25=30' },
      { input: { coins: [1, 5, 10, 25], amount: 67 }, expected: 6, name: 'US coins - optimal combination' },
      { input: { coins: [1, 3, 4], amount: 0 }, expected: 0, name: 'amount zero with multiple coins' },
      { input: { coins: [2, 4, 6], amount: 1 }, expected: -1, name: 'all even coins, odd amount' },
      { input: { coins: [7, 11], amount: 1 }, expected: -1, name: 'large coins, small amount' },
      { input: { coins: [1, 2, 3], amount: 4 }, expected: 2, name: 'multiple optimal solutions - 1+3 or 2+2' },
      { input: { coins: [9, 6, 5, 1], amount: 11 }, expected: 2, name: 'greedy fails, DP succeeds - 5+5+1=11' },
      { input: { coins: [1, 7, 10], amount: 14 }, expected: 2, name: 'avoid greedy trap - 7+7=14' },
      { input: { coins: [1, 15, 20, 25], amount: 30 }, expected: 2, name: 'large denominations - 15+15=30' },
      { input: { coins: [1, 2, 5, 10, 20, 50, 100], amount: 186 }, expected: 6, name: 'many denominations - 100+50+20+10+5+1=186' },
      { input: { coins: [3, 7, 405, 436], amount: 8839 }, expected: 25, name: 'large amount with specific coins' },
      { input: { coins: [1, 2, 5], amount: 100 }, expected: 20, name: 'century with standard coins' },
      { input: { coins: [1, 4, 5], amount: 8 }, expected: 2, name: 'classic DP example - 4+4=8' },
      { input: { coins: [1, 3, 4, 5], amount: 7 }, expected: 2, name: 'multiple options - 3+4=7' },
      { input: { coins: [5], amount: 3 }, expected: -1, name: 'single large coin, small amount' },
      { input: { coins: [2, 5], amount: 1 }, expected: -1, name: 'no coins smaller than amount' },
      { input: { coins: [1, 2], amount: 3 }, expected: 2, name: 'simple binary choice - 1+2=3' },
      { input: { coins: [1, 5, 6, 9], amount: 11 }, expected: 2, name: 'optimal choice - 5+6=11' },
    ])(`$name`, ({ input, expected }) => {
      it(`coins=[${input.coins.join(',')}], amount=${input.amount} returns ${expected}`, () => {
        expect(algorithm(input.coins, input.amount)).toEqual(expected);
      });
    });

    describe('Edge cases', () => {
      it('should handle negative amount', () => {
        expect(algorithm([1, 2, 5], -1)).toEqual(-1);
      });
      
      it('should handle coins with zero denomination', () => {
        expect(algorithm([0, 1], 1)).toEqual(1);
      });
      
      it('should handle very large amount', () => {
        expect(algorithm([1], 10000)).toEqual(10000);
      });
    });
  });

  describe('Greedy Solution', () => {
    describe('Cases where greedy succeeds', () => {
      test.each([
        { coins: [1, 5, 10, 25], amount: 36, expected: 3, desc: 'US coins - 25+10+1=36' },
        { coins: [1, 2, 5, 10], amount: 18, expected: 4, desc: 'Works with standard coins - 10+5+2+1=18' },
        { coins: [1, 3, 9, 27], amount: 31, expected: 3, desc: 'Powers of 3 + 1 - 27+3+1=31' }
      ])('$desc', ({ coins, amount, expected }) => {
        expect(greedyCoinChange(coins, amount)).toEqual(expected);
      });
    });

    describe('Known limitations of greedy approach', () => {
      test.each([
        { coins: [1, 3, 4], amount: 6, greedyResult: 3, optimalResult: 2, desc: 'Greedy uses 4+1+1, optimal is 3+3' },
        { coins: [9, 6, 5, 1], amount: 11, greedyResult: 3, optimalResult: 2, desc: 'Greedy uses 9+1+1, optimal is 6+5' },
        { coins: [1, 6, 10], amount: 12, greedyResult: 3, optimalResult: 2, desc: 'Greedy uses 10+1+1, optimal is 6+6' }
      ])('$desc', ({ coins, amount, optimalResult, greedyResult }) => {
        expect(greedyCoinChange(coins, amount)).toEqual(greedyResult);
        expect(greedyCoinChange(coins, amount)).not.toEqual(optimalResult);
      });
    });

    describe('Edge cases', () => {
      it('should handle negative amount', () => {
        expect(greedyCoinChange([1, 2, 5], -1)).toEqual(0);
      });

      it('should handle coins with zero denomination', () => {
        expect(greedyCoinChange([0, 1], 1)).toEqual(1);
      });

      it('should handle very large amount', () => {
        expect(greedyCoinChange([1], 10000)).toEqual(10000);
      });
    });
  });
});
