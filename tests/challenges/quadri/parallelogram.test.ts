import { Point, Para, pointInPara, lineIntersectsPara, lineSegmentIntersectsPara } from '../../../src/challenges/quadri/parallelogram';

const para: Para = [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 3 }, { x: 1, y: 3 }];

describe('Parallelogram', () => {
  describe('pointInPara', () => {
    it.each<[string, Point, boolean]>([
      ['point clearly inside',               { x: 2.5, y: 1.5 }, true],
      ['point on bottom edge',               { x: 2, y: 0 },     true],
      ['point on slanted right edge midpoint', { x: 4.5, y: 1.5 }, true],
      ['point on top-left corner',           { x: 1, y: 3 },     true],
      ['point to the left of slanted edge',  { x: 0, y: 1.5 },   false],
      ['point above the parallelogram',      { x: 3, y: 4 },     false],
      ['point below the parallelogram',      { x: 3, y: -1 },    false],
    ])('%s', (_name, pt, expected) => {
      expect(pointInPara(pt, para)).toBe(expected);
    });
  });

  describe('lineIntersectsPara (infinite line)', () => {
    it.each<[string, Point, Point, boolean]>([
      ['horizontal line through middle',           { x: -1, y: 1.5 }, { x: 6, y: 1.5 },  true],
      ['vertical line through middle',             { x: 2.5, y: -1 }, { x: 2.5, y: 4 },  true],
      ['diagonal line crossing both slanted sides', { x: -1, y: 3 },  { x: 5, y: -1 },   true],
      ['line collinear with bottom edge',          { x: 0, y: 0 },    { x: 4, y: 0 },    true],
      ['line passing through bottom-left corner',  { x: -1, y: -1 },  { x: 0, y: 0 },    true],
      ['horizontal line above parallelogram',      { x: 0, y: 4 },    { x: 5, y: 4 },    false],
      ['vertical line at x=0 touches corner',     { x: 0, y: 0 },    { x: 0, y: 3 },    true],
      ['vertical line just to the left (x=-0.1)', { x: -0.1, y: 0 }, { x: -0.1, y: 3 }, false],
    ])('%s', (_name, a, b, expected) => {
      expect(lineIntersectsPara(a, b, para)).toBe(expected);
    });
  });

  describe('lineSegmentIntersectsPara (finite segment)', () => {
    it.each<[string, Point, Point, boolean]>([
      ['segment crosses para horizontally',          { x: -1, y: 1.5 }, { x: 6, y: 1.5 },  true],
      ['segment crosses para vertically',            { x: 2.5, y: -1 }, { x: 2.5, y: 4 },  true],
      ['segment with one endpoint inside',           { x: 2.5, y: 1.5 }, { x: 8, y: 1.5 }, true],
      ['segment entirely inside para',               { x: 2, y: 1 },    { x: 3, y: 2 },    true],
      ['segment touches bottom edge at midpoint',    { x: 2, y: -1 },   { x: 2, y: 0 },    true],
      ['segment outside and not crossing',           { x: -2, y: -2 },  { x: -1, y: -1 },  false],
      ['segment on wrong side of slanted left edge', { x: -1, y: 1.5 }, { x: 0.4, y: 1.5 }, false],
    ])('%s', (_name, a, b, expected) => {
      expect(lineSegmentIntersectsPara(a, b, para)).toBe(expected);
    });
  });
});
