describe('FizzBuzz', () => {
  function fizzBuzzSimple(limit: number): (string | number)[] {
    const answer: (string | number)[] = [];
    for (let i: number = 1; i <= limit; i++) {
      if (i % 3 === 0 && i % 5 === 0) {
        answer.push('FizzBuzz');
      } else if (i % 5 === 0) {
        answer.push('Buzz');
      } else if (i % 3 === 0) {
        answer.push('Fizz');
      } else {
        answer.push(i);
      }
    }
    return answer;
  }

  function fizzBuzzCondensed(limit: number): (string | number)[] {
    return Array.from({ length: limit }, (_, i) =>
      (++i % 3 === 0 ? 'Fizz' : '') + (i % 5 === 0 ? 'Buzz' : '') || i
    );
  }

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

