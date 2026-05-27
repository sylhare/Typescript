import { Point, Rect, pointInRect, lineIntersectsRect, lineSegmentIntersectsRect } from '../../../src/challenges/quadri/rectangle';

// Axis-aligned 4×3 rectangle: (0,0)–(4,3)
const rect: Rect = [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 3 }, { x: 0, y: 3 }];

describe('Rectangle', () => {
  describe('pointInRect', () => {
    it.each<[string, Point, boolean]>([
      ['point clearly inside',       { x: 2, y: 1.5 }, true],
      ['point on bottom edge',       { x: 2, y: 0 },   true],
      ['point on right edge',        { x: 4, y: 1 },   true],
      ['point on top-left corner',   { x: 0, y: 3 },   true],
      ['point just outside (below)', { x: 2, y: -0.1 }, false],
      ['point just outside (right)', { x: 4.1, y: 1 },  false],
    ])('%s', (_name, pt, expected) => {
      expect(pointInRect(pt, rect)).toBe(expected);
    });
  });

  describe('lineIntersectsRect (infinite line)', () => {
    it.each<[string, Point, Point, boolean]>([
      ['horizontal line through middle',      { x: -1, y: 1.5 }, { x: 5, y: 1.5 }, true],
      ['vertical line through middle',        { x: 2, y: -1 },   { x: 2, y: 4 },   true],
      ['diagonal line through rect',          { x: -1, y: -1 },  { x: 5, y: 5 },   true],
      ['line collinear with bottom edge',     { x: 0, y: 0 },    { x: 4, y: 0 },   true],
      ['line passing through corner only',    { x: -1, y: -1 },  { x: 0, y: 0 },   true],
      ['line entirely above rect',            { x: 0, y: 4 },    { x: 4, y: 4 },   false],
      ['line entirely to the right of rect',  { x: 5, y: 0 },    { x: 5, y: 3 },   false],
    ])('%s', (_name, a, b, expected) => {
      expect(lineIntersectsRect(a, b, rect)).toBe(expected);
    });
  });

  describe('lineSegmentIntersectsRect (finite segment)', () => {
    it.each<[string, Point, Point, boolean]>([
      ['segment crosses rect horizontally',   { x: -1, y: 1.5 }, { x: 5, y: 1.5 },  true],
      ['segment crosses rect vertically',     { x: 2, y: -1 },   { x: 2, y: 4 },    true],
      ['segment with one endpoint inside',    { x: 2, y: 1.5 },  { x: 6, y: 1.5 },  true],
      ['segment entirely inside rect',        { x: 1, y: 1 },    { x: 3, y: 2 },    true],
      ['segment touches edge at midpoint',    { x: -1, y: 1.5 }, { x: 0, y: 1.5 },  true],
      ['segment outside and not crossing',    { x: -2, y: -2 },  { x: -1, y: -1 },  false],
      ['segment collinear but beyond edge',   { x: 5, y: 0 },    { x: 6, y: 0 },    false],
    ])('%s', (_name, a, b, expected) => {
      expect(lineSegmentIntersectsRect(a, b, rect)).toBe(expected);
    });
  });
});
