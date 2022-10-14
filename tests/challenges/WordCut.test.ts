describe('Pardon my french', () => {

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
