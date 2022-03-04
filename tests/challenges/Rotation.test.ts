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
});
