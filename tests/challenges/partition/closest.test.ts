import { closest, closestIndex } from '../../../src/challenges/partition/closest';

describe('Closest', () => {

  describe.each([
    { method: closestIndex, name: 'bisectLeft' },
  ])('Method: $name', ({ method }) => {
    it('should find the closest number to the target in an array with negative numbers', () => {
      const arr = [-10, -5, -2, -1];
      const target = -3;
      const result = method(arr, target);
      expect(result).toBe(2); // arr[2] === -2 closest to -3
    });

    it('should find the closest number to the target in an array with mixed numbers', () => {
      const arr = [-10, -5, 0, 5, 10];
      const target = 3;
      const result = method(arr, target);
      expect(result).toBe(3); // arr[3] === 5 closest to 3
    });

    it('should find the closest number to the target in an array with positive numbers', () => {
      const arr = [1, 2, 3, 4, 5];
      const target = 3.5;
      const result = method(arr, target);
      expect(result).toBe(3); // arr[3] === 4 closest to 3.5
    });
  });

  describe.each([
    { method: closest, name: 'closest' },
  ])('Method: $name', ({ method }) => {
    it('should find the closest number to the target in an array with negative numbers', () => {
      const arr = [-10, -5, -2, -1];
      const target = -3;
      const result = method(arr, target);
      expect(result).toBe(-2); // -2 closest to -3
    });

    it('should find the closest number to the target in an array with mixed numbers', () => {
      const arr = [-10, -5, 0, 5, 10];
      const target = 3;
      const result = method(arr, target);
      expect(result).toBe(5); // 5 closest to 3
    });

    it('should find the closest number to the target in an array with positive numbers', () => {
      const arr = [1, 2, 3, 4, 5];
      const target = 3.5;
      const result = method(arr, target);
      expect(result).toBe(4); // 4 closest to 3.5
    });
  });
});