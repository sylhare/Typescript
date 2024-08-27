import { encodeClass, encodeFor, encodeReduce } from '../../src/challenges/encoder';

/**
 * Take a string and encode it:
 * - If a character is repeated, encode it as the number of times it is repeated followed by the character
 */
describe('Encoder', () => {

  describe.each([
    encodeFor, encodeReduce, encodeClass,
  ])('Test encoding functions %s', (encode) => {

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
  });
});
