import { Point, Quad, pointInQuad, lineIntersectsQuadLine, lineSegmentIntersectsQuad } from '../../../src/challenges/quadri/quadrilateral';

const quad: Quad = [{ x: 0, y: 0 }, { x: 6, y: 1 }, { x: 5, y: 5 }, { x: 1, y: 4 }];
const flatQuad: Quad = [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 4, y: 0 }, { x: 6, y: 0 }];

describe('Quadrilateral', () => {
  describe('pointInQuad', () => {
    it.each<[string, Point, Quad, boolean]>([
      ['point clearly inside irregular quad',     { x: 3, y: 2 },   quad, true],
      ['point on bottom edge of irregular quad',  { x: 3, y: 0.5 }, quad, true],
      ['point on a vertex',                       { x: 0, y: 0 },   quad, true],
      ['point outside (left of left edge)',       { x: 0, y: 2 },   quad, false],
      ['point outside (above quad)',              { x: 3, y: 6 },   quad, false],
      ['point in flat quad is never inside',      { x: 3, y: 0 },   flatQuad, true],  // on segment = boundary
      ['point above flat quad (no area)',         { x: 3, y: 1 },   flatQuad, false],
    ])('%s', (_name, pt, q, expected) => {
      expect(pointInQuad(pt, q)).toBe(expected);
    });
  });

  describe('lineIntersectsQuadLine (infinite line)', () => {
    it.each<[string, Point, Point, Quad, boolean]>([
      ['line crosses irregular quad horizontally',    { x: -1, y: 2 },   { x: 7, y: 2 },   quad, true],
      ['line crosses irregular quad diagonally',      { x: -1, y: -1 },  { x: 7, y: 7 },   quad, true],
      ['line collinear with bottom edge',             { x: 0, y: 0 },    { x: 6, y: 1 },   quad, true],
      ['line passes through a vertex only',           { x: -1, y: -1 },  { x: 0, y: 0 },   quad, true],
      ['line misses quad entirely above',             { x: 0, y: 7 },    { x: 6, y: 7 },   quad, false],
      ['infinite line through flat quad (collinear)', { x: 0, y: 0 },    { x: 1, y: 0 },   flatQuad, true],
      ['line perpendicular to flat quad',             { x: 3, y: -1 },   { x: 3, y: 1 },   flatQuad, true],
      ['horizontal line that misses flat quad',       { x: 0, y: 1 },    { x: 6, y: 1 },   flatQuad, false],
    ])('%s', (_name, a, b, q, expected) => {
      expect(lineIntersectsQuadLine(a, b, q)).toBe(expected);
    });
  });

  describe('lineSegmentIntersectsQuad (finite segment)', () => {
    it.each<[string, Point, Point, Quad, boolean]>([
      ['one endpoint inside quad',                                    { x: 3, y: 2 },   { x: 10, y: 10 }, quad, true],
      ['endpoint on quad edge (boundary)',                            { x: 3, y: 0.5 }, { x: 3, y: -2 },  quad, true],
      ['segment outside crossing quad vertically',                    { x: 3, y: -2 },  { x: 3, y: 7 },   quad, true],
      ['segment outside crossing quad horizontally',                  { x: -2, y: 2 },  { x: 8, y: 2 },   quad, true],
      ['diagonal segment with both endpoints outside bounding box',   { x: -2, y: -1 }, { x: 9, y: 7 },   quad, true],
      ['segment entirely outside quad (no intersection)',             { x: -1, y: 2 },  { x: -0.5, y: 2 }, quad, false],
      ['segment outside, parallel to an edge, no crossing',          { x: -2, y: -2 }, { x: -1, y: -1 }, quad, false],
      ['segment overlapping flat quad (collinear)',                   { x: 1, y: 0 },   { x: 5, y: 0 },   flatQuad, true],
      ['vertical segment crossing through flat quad',                 { x: 3, y: -1 },  { x: 3, y: 1 },   flatQuad, true],
      ['segment collinear but disjoint from flat quad',              { x: 7, y: 0 },   { x: 9, y: 0 },   flatQuad, false],
      ['segment parallel above flat quad (no intersection)',         { x: 1, y: 1 },   { x: 5, y: 1 },   flatQuad, false],
    ])('%s', (_name, a, b, q, expected) => {
      expect(lineSegmentIntersectsQuad(a, b, q)).toBe(expected);
    });
  });
});
