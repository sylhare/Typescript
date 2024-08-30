import { french, frenchex } from '../../src/challenges/french';

describe('Pardon my french', () => {
  describe.each([
    { solution: french },
    { solution: frenchex },
  ])('Using %s', ({ solution }) => {

    it('should work for coffee', () => {
      expect(solution('coffee')).toBe('offeecay');
    });

    it('should work for a sentence', () => {
      expect(solution('have coffee')).toBe('avehay offeecay');
    });

    it('should work for a caps', () => {
      expect(solution('Have Coffee')).toBe('Avehay Offeecay');
    });

    it('should not change if it starts by a vowel', () => {
      expect(solution('eat oranges')).toBe('eatway orangesway');
    });

    it('should work for multiple consonant', () => {
      expect(solution('striking thunder')).toBe('ikingstray underthay');
    });

    it('should work for punctuation and vowel', () => {
      expect(solution('Oh!')).toBe('Ohway!');
      expect(solution('oh!')).toBe('ohway!');
    });

    it('should work with punctuation', () => {
      expect(solution('Have, coffee!')).toBe('Avehay, offeecay!');
      expect(solution('Huh. Wat?')).toBe('Uhhay. Atway?');
    });

    it('should rearrange all consonant at the beginning', () => {
      expect(solution('Who is driving this vehicle?')).toBe('Owhay isway ivingdray isthay ehiclevay?');
    });
  });
});