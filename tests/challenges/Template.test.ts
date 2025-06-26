/**
 * Template
 */
describe('Template', () => {

  describe.each([
    { algorithm: (_input: any) => 0, name: 'Algo' },
  ])('Test algorithm: $name', ({ algorithm }) => {
    describe.each([
      { input: [], expected: 0, name: '' },
      { input: [], expected: 0, name: '' },
    ])(`$name`, ({ input, expected }) => {
      it(`returns ${expected}`, () => {
        expect(algorithm(input)).toEqual(expected);
      });
    });
  });
});