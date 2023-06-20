describe('reduce', () => {
  it('should sum an array', function () {
    const array = [1, 1, 1, 1];
    expect(array.reduce((a, b) => a + b)).toEqual(4);
  });

  it('should sum an array with default value', function () {
    const array = [1, 1, 1, 1];
    expect(array.reduce((a, b) => a + b, 0)).toEqual(4);
  });
});
