import { Point, Quad, lineIntersectsQuadLine, lineSegmentIntersectsQuad } from '../../src/challenges/quadri/quadrilateral';

const unitSquare: Quad = [
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
];

const rect: Quad = [
  { x: 0, y: 0 },
  { x: 2, y: 0 },
  { x: 2, y: 1 },
  { x: 0, y: 1 },
];

const bigRect: Quad = [
  { x: 0, y: 0 },
  { x: 2, y: 0 },
  { x: 2, y: 2 },
  { x: 0, y: 2 },
];

const degenerateQuad: Quad = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 2, y: 0 },
  { x: 3, y: 0 },
];

describe('Quadrilateral vs Line/Segment intersection tests', () => {
  describe('Infinite line intersects quadrilateral', () => {
    it.each([
      ['line crosses convex quad', { x: -1, y: 0 }, { x: 2, y: 0 }, unitSquare, true],
      ['line tangent to quad edge (collinear with top edge)', { x: -1, y: 1 }, { x: 2, y: 1 }, rect, true],
      ['line misses quad entirely', { x: 0, y: 3 }, { x: 1, y: 3 }, rect, false],
      ['line passes through a vertex only', { x: -1, y: -1 }, { x: 0, y: 0 }, bigRect, true],
      ['quad entirely collinear with line (degenerate case)', { x: 0, y: 0 }, { x: 1, y: 0 }, degenerateQuad, true],
    ])('%s', (_name: string, a: Point, b: Point, quad: Quad, expected: boolean) => {
      expect(lineIntersectsQuadLine(a, b, quad)).toBe(expected);
    });
  });

  describe('Line segment intersects quadrilateral', () => {
    it.each([
      ['segment crosses quad (interior)', { x: -1, y: 0.5 }, { x: 2, y: 0.5 }, unitSquare, true],
      ['segment endpoint inside quad', { x: 0.5, y: 0.5 }, { x: 3, y: 3 }, bigRect, true],
      ['segment touches edge at midpoint', { x: -1, y: 1 }, { x: 1, y: 1 }, bigRect, true],
      ['segment completely outside', { x: -2, y: -2 }, { x: -1, y: -1 }, bigRect, false],
      ['segment collinear but disjoint from quad', { x: 3, y: 0 }, { x: 4, y: 0 }, unitSquare, false],
    ])('%s', (_name: string, a: Point, b: Point, quad: Quad, expected: boolean) => {
      expect(lineSegmentIntersectsQuad(a, b, quad)).toBe(expected);
    });
  });
});
