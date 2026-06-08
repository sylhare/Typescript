import { Point } from '../../../src/challenges/quadri/quadrilateral';
import { Para, pointInPara } from '../../../src/challenges/quadri/parallelogram';

const para: Para = [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 3 }, { x: 1, y: 3 }];

describe('Parallelogram', () => {
  describe('pointInPara', () => {
    it.each<[string, Point, boolean]>([
      ['point clearly inside',                 { x: 2.5, y: 1.5 }, true],
      ['point on bottom edge',                 { x: 2, y: 0 },     true],
      ['point on slanted right edge midpoint', { x: 4.5, y: 1.5 }, true],
      ['point on top-left corner',             { x: 1, y: 3 },     true],
      ['point to the left of slanted edge',    { x: 0, y: 1.5 },   false],
      ['point above the parallelogram',        { x: 3, y: 4 },     false],
      ['point below the parallelogram',        { x: 3, y: -1 },    false],
    ])('%s', (_name, pt, expected) => {
      expect(pointInPara(pt, para)).toBe(expected);
    });
  });
});
