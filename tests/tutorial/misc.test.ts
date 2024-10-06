describe('Tests', () => {

  describe('some', () => {
    it('should return TRUE for some true', () => {
      const arr = [true, false];
      const result = arr.some((e) => e);
      expect(result).toEqual(true);
    });

    it('should return TRUE for some of some that are true', () => {
      const arr = [true, false];
      const result = arr.some((e1) => [true].some(e2 => e1 && e2));
      expect(result).toEqual(true);
    });

    it('is confusing, but a MAP returns an ARRAY which is TRUTHY', () => {
      const arr = [true, false];
      const result = arr.some((e1) => [false].map(e2 => e1 && e2));
      expect(result).toEqual(true);
    });
  });
});