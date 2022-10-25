describe('Encoder', () => {
  function encode(input: string): string {
    let result = '', current = '', count = 0;
    for (const char of input) {
      if (char !== current && count > 0) {
        result += count.toString() + current;
        count = 0;
      }
      current = char;
      ++count;
    }
    return result + (count ? count.toString() + current : '');
  }
    it('can encode a string', () => {
      expect(encode('aaaabbccc')).toEqual('4a2b3c');
    });

    it('can be inefficient', () => {
      expect(encode('abcd')).toEqual('1a1b1c1d');
    });

    it('handles same character', () => {
      expect(encode('aaaaaa')).toEqual('6a');
    });

    it('handles one character', () => {
      expect(encode('a')).toEqual('1a');
    });

    it('handles nothing', () => {
      expect(encode('')).toEqual('');
    });
