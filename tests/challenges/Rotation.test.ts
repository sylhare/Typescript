import { rotate, rotateArray, rotateSpaceO1, rotN, rt } from '../../src/challenges/rotation';

describe('Rotation', () => {

  /**
   * Rotate a letter by 13
   * Rotate a number by 5
   * Do not rotate punctuation
   */
  describe('with Alphabet', () => {

    it('rotates word', () => {
      expect(rotate('hello')).toEqual('uryyb');
    });

    it('rotates words', () => {
      expect(rotate('hello world')).toEqual('uryyb jbeyq');
    });

    it('rotates with majuscule', () => {
      expect(rotate('Abcd Xyz')).toEqual('Nopq Klm');
    });

    it('rotates handle punctuation', () => {
      expect(rotate('Hello, world!')).toEqual('Uryyb, jbeyq!');
    });

    it('rotates numbers differently', () => {
      expect(rotate('1 pieces of 54gr')).toEqual('6 cvrprf bs 09te');
    });

    it('works on it all', () => {
      expect(rotate('WhUt an Am4Zing! Sho0Ww?!')).toEqual('JuHg na Nz9Mvat! Fub5Jj?!');
      expect(rt('WhUt an Am4Zing! Sho0Ww?!')).toEqual('JuHg na Nz9Mvat! Fub5Jj?!');
    });

    describe('rotN', () => {
      it('rotates numbers by 5 (default)', () => {
        expect(rotN(0)).toEqual(5);
        expect(rotN(5)).toEqual(0);
        expect(rotN(9)).toEqual(4);
      });

      it('rotates numbers by 2', () => {
        expect(rotN(0, 2)).toEqual(2);
        expect(rotN(9, 2)).toEqual(1);
      });

      describe.each([
        { base: 'a', test: 'a', expected: 'n' },
        { base: 'a', test: 'm', expected: 'z' },
        { base: 'a', test: 'z', expected: 'm' },
      ])('rotates numbers by 13', ({ base, test, expected }) => {
        it(`by base ${base.charCodeAt(0)}, range 26`, () =>
          expect(rotN(test.charCodeAt(0), 13, base.charCodeAt(0), 26)).toEqual(expected.charCodeAt(0)));

        it(`by base ${base.toUpperCase().charCodeAt(0)}, range 26`, () =>
          expect(rotN(test.toUpperCase().charCodeAt(0), 13, base.toUpperCase().charCodeAt(0), 26))
            .toEqual(expected.toUpperCase().charCodeAt(0)));
      });
    });
  });

  /**
   * Rotate the array to the right by steps
   */
  describe('with Array', () => {
    const a = ['1', '2', '3', '4'];

    it('rotates', () => {
      expect(rotateArray(a, 2)).toEqual(['3', '4', '1', '2']);
      expect(rotateSpaceO1(a, 2)).toEqual(['3', '4', '1', '2']);
    });

    it('handles negative step', () => {
      expect(rotateArray(a, -1)).toEqual(a);
      expect(rotateSpaceO1(a, 2)).toEqual(a);
    });

    it('handles steps that are too big', () => {
      expect(rotateArray(a, 8)).toEqual(a);
      expect(rotateSpaceO1(a, 8)).toEqual(a);
    });
  });
});

