describe('Pardon my french', () => {

  function french(input: string) {
    const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
    const special = [',', '.', '?', '!'];

    return input.split(' ').map(word => {
      if (vowels.includes(word[0])) return word + 'ay';
      const wordArray = word.split('');
      const oldFirst = word.slice(0, wordArray.findIndex(e => vowels.includes(e)));
      let  newFirst =  word.slice(oldFirst.length, oldFirst.length + 1), middle = '', end = '';
      if (oldFirst[0].toUpperCase() === oldFirst[0]) newFirst = newFirst.toUpperCase();
      wordArray.forEach(char => special.includes(char) ? end += char : middle += char);

      return newFirst + middle.slice(oldFirst.length + 1, word.length) + oldFirst.toLowerCase() + 'ay' + end;
    }).join(' ');
  }

  it('should work for coffee', () => {
    expect(french('coffee')).toBe('offeecay');
  });

  it('should work for a sentence', () => {
    expect(french('have coffee')).toBe('avehay offeecay');
  });

  it('should work for a caps', () => {
    expect(french('Have Coffee')).toBe('Avehay Offeecay');
  });

  it('should work with punctuation', () => {
    expect(french('Have, coffee!')).toBe('Avehay, offeecay!');
    expect(french('Huh. Wat?')).toBe('Uhhay. Atway?');
  });

  it('should not change if it starts by a vowel', () => {
    expect(french('eat oranges')).toBe('eatay orangesay');
  });

  it('should rearrange all consomme at the beginning', () => {
    expect(french('Who is driving this vehicle?')).toBe('Owhay isay ivingdray isthay ehiclevay?');
  });
});
