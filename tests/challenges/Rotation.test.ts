describe('Rotation', () => {

  function rotate(input: string) {
    const special = [',', '.', '?', '!'];
    return input.split(' ').map(word => word.split('').map(letter => {
      if (special.includes(letter)) return letter;
      const letterCode = letter.charCodeAt(0);
      const a_code = letterCode === letter.toLowerCase().charCodeAt(0) ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
      return String.fromCharCode(letterCode + (letterCode < (a_code + 12) ? 13 : -13));
    }).join('')).join(' ');
  }

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

  describe('rotN', () => {
    it('rotates numbers by 5', () => {
      expect(rotN(0)).toEqual(5);
      expect(rotN(5)).toEqual(0);
      expect(rotN(9)).toEqual(4);
    });

    it('rotates numbers by 2', () => {
      expect(rotN(0, 2)).toEqual(2);
      expect(rotN(9, 2)).toEqual(1);
    });
  });
});
