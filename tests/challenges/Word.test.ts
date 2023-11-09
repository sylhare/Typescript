/// <reference types="jest-extended" />

describe('Word', () => {

  describe('Word Cut', () => {
    function wordCut(input: string): Set<String> {
      return new Set(input.replace(/[!?.,]/g, '').split(' '));
    }

    it('cuts sentence into words', () => {
      expect([...wordCut('this is a text')]).toIncludeSameMembers(['this', 'is', 'a', 'text']);
    });

    it('removes duplicates', () => {
      expect([...wordCut('this is is a this text')]).toIncludeSameMembers(['this', 'is', 'a', 'text']);
    });

    it('removes punctuation', () => {
      expect([...wordCut('this, is!! is a this text?')]).toIncludeSameMembers(['this', 'is', 'a', 'text']);
    });

    it('keeps apostrophes', () => {
      expect([...wordCut('Hey! That\'s my hat hat hat!')]).toIncludeSameMembers(['Hey', 'That\'s', 'my', 'hat']);
    });
  });

  describe('Word Count', () => {

    const wordCount = (input: string): Map<string, number> => {
      const result: Map<string, number> = new Map();
      input.toLowerCase().replace(/[!?.,]/g, '').split(' ')
        .forEach(word => result.set(word, result.has(word) ? result.get(word)! + 1 : 1));
      return result;
    };

    it('counts', () => {
      expect(wordCount('hello')).toEqual(new Map(Object.entries({ hello: 1 })));
    });

    it('counts with a sentence', () => {
      expect(wordCount('hello world')).toEqual(new Map(Object.entries({ hello: 1, world: 1 })));
    });

    it('ignores punctuation', () => {
      expect(wordCount('hello!')).toEqual(new Map(Object.entries({ hello: 1 })));
    });

    it('ignores caps', () => {
      expect(wordCount('Hello, hello')).toEqual(new Map(Object.entries({ hello: 2 })));
    });

    it('works on a full sentence', () => {
      expect(wordCount('Hello, hello is it me you\'re looking for? Is it?'))
        .toEqual(new Map(Object.entries({ hello: 2, is: 2, it: 2, me: 1, 'you\'re': 1, looking: 1, for: 1 })));
    });
  });
});
