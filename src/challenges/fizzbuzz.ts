export function fizzBuzzSimple(limit: number): (string | number)[] {
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

export function fizzBuzzCondensed(limit: number): (string | number)[] {
  return Array.from({ length: limit }, (_, i) =>
    (++i % 3 === 0 ? 'Fizz' : '') + (i % 5 === 0 ? 'Buzz' : '') || i
  );
}