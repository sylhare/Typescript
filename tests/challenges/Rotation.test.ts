import { rotate, rotateArray, rotateSpaceO1, rotN, rt } from '../../src/challenges/rotation';

describe('Rotation', () => {

  /**
   * Rotate a letter by 13
   * Rotate a number by 5
   * Do not rotate punctuation
   */
  describe('with Alphabet', () => {

    describe.each([
      { algorithm: rotate, name: 'rotate' },
      { algorithm: rt, name: 'rt' },
    ])('Test algorithm: $name', ({ algorithm }) => {
      describe.each([
        { input: 'hello', expected: 'uryyb', name: 'rotates word' },
        { input: 'hello world', expected: 'uryyb jbeyq', name: 'rotates words' },
        { input: 'Abcd Xyz', expected: 'Nopq Klm', name: 'rotates with majuscule' },
        { input: 'Hello, world!', expected: 'Uryyb, jbeyq!', name: 'rotates handle punctuation' },
        { input: '1 pieces of 54gr', expected: '6 cvrprf bs 09te', name: 'rotates numbers differently' },
        { input: 'WhUt an Am4Zing! Sho0Ww?!', expected: 'JuHg na Nz9Mvat! Fub5Jj?!', name: 'works on it all' },
      ])('$name', ({ input, expected }) => {
        it(`returns ${expected}`, () => {
          expect(algorithm(input)).toEqual(expected);
        });
      });
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
    describe.each([
      { algorithm: rotateArray, name: 'rotateArray' },
      { algorithm: rotateSpaceO1, name: 'rotateSpaceO1' },
    ])('Test algorithm: $name', ({ algorithm }) => {
      describe.each([
        { input: [['1', '2', '3', '4'], 2], expected: ['3', '4', '1', '2'], name: 'rotates by 2 steps' },
        { input: [['1', '2', '3', '4'], -1], expected: ['1', '2', '3', '4'], name: 'returns original array for negative step' },
        { input: [['1', '2', '3', '4'], 6], expected: ['3', '4', '1', '2'], name: 'handles steps that are too big' },
      ])('$name', ({ input, expected }) => {
        it(`returns ${JSON.stringify(expected)}`, () => {
          const testArray = [...input[0] as string[]];
          expect(algorithm(testArray, input[1] as number)).toEqual(expected);
        });
      });
    });
  });
});

