describe('reduce', () => {
  const array = [1, 1, 1, 1];

  it('should sum an array', function () {
    expect(array.reduce((a, b) => a + b)).toEqual(4);
  });

  it('should sum an array with default value', function () {
    expect(array.reduce((a, b) => a + b, 0)).toEqual(4);
  });

  it('can infer a type', () => {
    const result = [{ a: 'a' }, { b: 'b' }, { c: 'c' }].reduce((accumulator, current) => {
      return { ...accumulator, ...current };
    }, {});
    expect(result).toEqual({ a: 'a', b: 'b', c: 'c' });
  });
});
