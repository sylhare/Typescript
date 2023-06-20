describe('Pardon my french regex', () => {

  function frenchex(input: string) {
    return input.replace(/\b(\w)(\w+)\b/g, (word: string, first: string, _: string) => {
      const groups = word.match(/\b([^\W_aeiou]+)(\w+)\b/)!!;

      return /[aeiou]/i.test(first) ? word + 'way' :
        groups[2].replace(/^\w/, x => /[A-Z]/.test(first) ? x.toUpperCase() : x) +
        groups[1].toLowerCase() + 'ay';
    });
  }

  it('should work for coffee', () => {
    expect(frenchex('coffee')).toBe('offeecay');
  });

  it('should work for a sentence', () => {
    expect(frenchex('have coffee')).toBe('avehay offeecay');
  });

  it('should work for a caps', () => {
    expect(frenchex('Have Coffee')).toBe('Avehay Offeecay');
  });

  it('should not change if it starts by a vowel', () => {
    expect(frenchex('eat oranges')).toBe('eatway orangesway');
  });

  it('should work for multiple consonant', () => {
    expect(frenchex('striking thunder')).toBe('ikingstray underthay');
  });

  it('should work for punctuation and vowel', () => {
    expect(frenchex('Oh!')).toBe('Ohway!');
    expect(frenchex('oh!')).toBe('ohway!');
  });

  it('should work with punctuation', () => {
    expect(frenchex('Have, coffee!')).toBe('Avehay, offeecay!');
    expect(frenchex('Huh. Wat?')).toBe('Uhhay. Atway?');
  });

  it('should rearrange all consonant at the beginning', () => {
    expect(frenchex('Who is driving this vehicle?')).toBe('Owhay isway ivingdray isthay ehiclevay?');
  });
});
