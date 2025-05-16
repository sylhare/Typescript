import { StreamChecker } from '../../src/challenges/streamChecker';

describe('StreamChecker', () => {
  it('should detect suffix matches for basic functionality', () => {
    const streamChecker = new StreamChecker(['abc', 'xyz']);
    expect(streamChecker.query('a')).toBe(false);
    expect(streamChecker.query('x')).toBe(false);
    expect(streamChecker.query('y')).toBe(false);
    expect(streamChecker.query('z')).toBe(true); // Matches "xyz"
  });

  it('should return false for no matches', () => {
    const streamChecker = new StreamChecker(['abc', 'xyz']);
    expect(streamChecker.query('p')).toBe(false);
    expect(streamChecker.query('q')).toBe(false);
    expect(streamChecker.query('r')).toBe(false);
  });

  it('should handle an empty words array', () => {
    const streamChecker = new StreamChecker([]);
    expect(streamChecker.query('a')).toBe(false);
    expect(streamChecker.query('b')).toBe(false);
  });

  it('should handle single character words', () => {
    const streamChecker = new StreamChecker(['a', 'b', 'c']);
    expect(streamChecker.query('a')).toBe(true); // Matches "a"
    expect(streamChecker.query('b')).toBe(true); // Matches "b"
    expect(streamChecker.query('c')).toBe(true); // Matches "c"
  });

  it('should handle duplicate words in the words array', () => {
    const streamChecker = new StreamChecker(['abc', 'abc']);
    expect(streamChecker.query('a')).toBe(false);
    expect(streamChecker.query('b')).toBe(false);
    expect(streamChecker.query('c')).toBe(true); // Matches "abc"
  });

  it('should handle a stream longer than any word', () => {
    const streamChecker = new StreamChecker(['abc']);
    expect(streamChecker.query('a')).toBe(false);
    expect(streamChecker.query('b')).toBe(false);
    expect(streamChecker.query('c')).toBe(true); // Matches "abc"
    expect(streamChecker.query('d')).toBe(false);
    expect(streamChecker.query('e')).toBe(false);
  });

  it('should be case-sensitive', () => {
    const streamChecker = new StreamChecker(['abc']);
    expect(streamChecker.query('A')).toBe(false);
    expect(streamChecker.query('B')).toBe(false);
    expect(streamChecker.query('C')).toBe(false);
  });

  it('should handle a large number of words and a long stream', () => {
    const words = Array.from({ length: 1000 }, (_, i) => `word${i.toString().padStart(2, '0')}`);
    const streamChecker = new StreamChecker(words);
    expect(streamChecker.query('w')).toBe(false);
    expect(streamChecker.query('o')).toBe(false);
    expect(streamChecker.query('r')).toBe(false);
    expect(streamChecker.query('d')).toBe(false);
    expect(streamChecker.query('9')).toBe(false); // Doesn't match because for 9 it's "word09"
    expect(streamChecker.query('9')).toBe(true); // Matches "word99"
  });

  it('should detect multiple word matches in the stream', () => {
    const streamChecker = new StreamChecker(['abc', 'xyz', 'axyz', 'bc']);
    expect(streamChecker.query('a')).toBe(false);
    expect(streamChecker.query('b')).toBe(false);
    expect(streamChecker.query('c')).toBe(true);
    expect(streamChecker.query('x')).toBe(false);
    expect(streamChecker.query('y')).toBe(false);
    expect(streamChecker.query('z')).toBe(true);
    expect(streamChecker.query('a')).toBe(false);
    expect(streamChecker.query('x')).toBe(false);
    expect(streamChecker.query('y')).toBe(false);
    expect(streamChecker.query('z')).toBe(true);
  });
});