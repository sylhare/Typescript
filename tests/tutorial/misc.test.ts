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

  describe('Map', () => {
    let map: Map<string, number>;

    beforeEach(() => map = new Map());

    it('targetMap size with no duplicates', () => {
      const target = 'abc';
      map = new Map([...target].map(char => [char, (map.get(char) || 0) + 1]));
      expect(map.size).toBe(3);
    });

    it('targetMap size with duplicates', () => {
      const target = 'aabc';
      map = new Map([...target].map(char => [char, (map.get(char) || 0) + 1]));
      expect(map.size).toBe(3);
    });

    it('targetMap size with all duplicates', () => {
      const target = 'aaaa';
      map = new Map([...target].map(char => [char, (map.get(char) || 0) + 1]));
      expect(map.size).toBe(1);
    });

    it('targetMap size with no characters', () => {
      const target = '';
      map = new Map([...target].map(char => [char, (map.get(char) || 0) + 1]));
      expect(map.size).toBe(0);
    });
  });
});