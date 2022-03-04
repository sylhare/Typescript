describe('Rotation', () => {

  function rotate(input: string) {
    return input.split(' ').map(word => [...word].map(letter => {
      if (/[,.?!]/.test(letter)) return letter;
      if (/\d/.test(letter)) return `${rotN(parseInt(letter), 5)}`;
      return rot13(letter);
    }).join('')).join(' ');
  }

  const rot13 = (letter: string) => {
    const letterCode = letter.charCodeAt(0);
    const codeForA = letterCode === letter.toLowerCase().charCodeAt(0) ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
    return String.fromCharCode(rotN(letterCode, 13, codeForA, 26));
  };

  const rotN = (number: number, rotation = 5, base = 0, range = 10) => ((number - base + rotation) % range) + base;

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

  /**
   * rotate but I need... to... write... less... lines... 🤪
   * @param input
   */
  const rt = (input: string) => input.split(' ').map(word => [...word]
    .map(letter => /[,.?!]/.test(letter) ? letter : /\d/.test(letter) ? `${rotN(parseInt(letter))}` : rot13(letter))
    .join('')).join(' ');

});
