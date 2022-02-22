describe('Pardon my french', () => {

  function french(input: string) {
    const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
    const special = [',', '.', '?', '!'];

    return input.split(' ').map(word => {
      if (vowels.includes(word[0])) return word + 'way';
      const wordArray = word.split('');
      const suffix = word.slice(0, wordArray.findIndex(e => vowels.includes(e)));
      let  prefix =  word.slice(suffix.length, suffix.length + 1), middle = '', end = '';
      if (suffix[0].toUpperCase() === suffix[0]) prefix = prefix.toUpperCase();
      wordArray.forEach(char => special.includes(char) ? end += char : middle += char);

      return prefix + middle.slice(suffix.length + 1, word.length) + suffix.toLowerCase() + 'ay' + end;
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

  it('should not change if it starts by a vowel', () => {
    expect(french('eat oranges')).toBe('eatway orangesway');
  });

  it('should work for multiple consonant', () => {
    expect(french('striking thunder')).toBe('ikingstray underthay');
  });

  it('should work with punctuation', () => {
    expect(french('Have, coffee!')).toBe('Avehay, offeecay!');
    expect(french('Huh. Wat?')).toBe('Uhhay. Atway?');
  });

  it('should rearrange all consonant at the beginning', () => {
    expect(french('Who is driving this vehicle?')).toBe('Owhay isway ivingdray isthay ehiclevay?');
  });
});
