import { fizzBuzzCondensed, fizzBuzzSimple } from '../../src/challenges/fizzbuzz';

/**
 * Write a program that prints the numbers but:
 * For multiples of three print “Fizz”
 * For the multiples of five print “Buzz”
 * For numbers which are multiples of both three and five print “FizzBuzz”.
 */
describe('FizzBuzz', () => {

  describe.each([fizzBuzzSimple, fizzBuzzCondensed])('test %s', (fizzBuzz) => {
    it('should work for 1', () => {
      expect(fizzBuzz(1)).toEqual([1]);
    });

    it('should work for 3', () => {
      expect(fizzBuzz(3)).toEqual([1, 2, 'Fizz']);
    });

    it('should work for 5', () => {
      expect(fizzBuzz(5)).toEqual([1, 2, 'Fizz', 4, 'Buzz']);
    });

    it('should work for 15', () => {
      expect(fizzBuzz(15))
        .toEqual([1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14, 'FizzBuzz']);
    });
  });
});

