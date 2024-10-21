import { isAlmostEqual } from '../../../src/challenges/ladder/wordLadder';
import { WordNode } from '../../../src/challenges/ladder/WordNode';

describe('WordNode', () => {

  it.each([
    { word: 'aaaa', other: 'abcd', expected: false },
    { word: 'aaaa', other: 'baad', expected: false },
    { word: 'aaa', other: 'abc', expected: false },
    { word: 'aaa', other: 'aac', expected: true },
    { word: 'aaa', other: 'aaa', expected: true },
  ])('isLinked', ({ word, other, expected }) => {
    expect(isAlmostEqual(word, other)).toEqual(expected);
  });

  it('can serialize', () => {
    const node = new WordNode('aaa');
    node.link(new WordNode('aac'));
    node.link(new WordNode('abc'));
    node.link(new WordNode('aba'));
    expect(node.serialize()).toEqual(
      'aaa: [aac, aba]\n' +
      'aac: [abc]\n' +
      'aba: []\n' +
      'abc: []');
  });

  it('can link', () => {
    const abc = new WordNode('abc');
    const aaa = new WordNode('aaa');
    const abx = new WordNode('abx');
    expect(abc.canLink(abx)).toEqual(true);
    expect(abc.canLink(aaa)).toEqual(false);
  });
});