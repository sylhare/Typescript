/**
 * Template
 */
describe('Template', () => {

  describe.each([
    { algorithm: (_input: any) => 0, name: 'Algo' },
  ])(`Test algorithm %s`, ({ algorithm, name }) => {
    describe.each([
      { input: [], expected: 0 },
      { input: [], expected: 0 },
      { input: [], expected: 0 },
      { input: [], expected: 0 },
    ])(` ${name} with input $input`, ({ input, expected }) => {
      it(`returns ${expected}`, () => {
        expect(algorithm(input)).toEqual(expected);
      });
    });
  });
});