export type Point = { x: number; y: number };
export type Quad = [Point, Point, Point, Point];

const EPS = 1e-12;

export function orient(a: Point, b: Point, c: Point): number {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

export function between(a: number, b: number, value: number): boolean {
  return Math.min(a, b) - EPS <= value && value <= Math.max(a, b) + EPS;
}

export function pointOnSegment(a: Point, b: Point, p: Point): boolean {
  return Math.abs(orient(a, b, p)) <= EPS && between(a.x, b.x, p.x) && between(a.y, b.y, p.y);
}

export function segmentsIntersect(p1: Point, p2: Point, q1: Point, q2: Point): boolean {
  const o1 = orient(p1, p2, q1);
  const o2 = orient(p1, p2, q2);
  const o3 = orient(q1, q2, p1);
  const o4 = orient(q1, q2, p2);
  if (o1 === 0 && pointOnSegment(p1, p2, q1)) return true;
  if (o2 === 0 && pointOnSegment(p1, p2, q2)) return true;
  if (o3 === 0 && pointOnSegment(q1, q2, p1)) return true;
  if (o4 === 0 && pointOnSegment(q1, q2, p2)) return true;
  return (o1 > 0) !== (o2 > 0) && (o3 > 0) !== (o4 > 0);
}

function lineIntersectsSegment(a: Point, b: Point, p: Point, q: Point): boolean {
  const oa = orient(a, b, p);
  const ob = orient(a, b, q);
  return Math.abs(oa) <= EPS || Math.abs(ob) <= EPS || (oa > 0) !== (ob > 0);
}

// Ray-casting winding: works for any simple (non-self-intersecting) polygon.
export function pointInQuad(pt: Point, quad: Quad): boolean {
  let inside = false;
  for (let i = 0; i < 4; i++) {
    const a = quad[i];
    const b = quad[(i + 1) % 4];
    if (pointOnSegment(a, b, pt)) return true;
    const cross = (a.y > pt.y) !== (b.y > pt.y) && pt.x < ((b.x - a.x) * (pt.y - a.y)) / (b.y - a.y) + a.x;
    if (cross) inside = !inside;
  }
  return inside;
}

export function lineIntersectsQuadLine(a: Point, b: Point, quad: Quad): boolean {
  for (let i = 0; i < 4; i++) {
    if (lineIntersectsSegment(a, b, quad[i], quad[(i + 1) % 4])) return true;
  }
  return quad.every((p) => Math.abs(orient(a, b, p)) <= EPS);
}

export function lineSegmentIntersectsQuad(a: Point, b: Point, quad: Quad): boolean {
  for (let i = 0; i < 4; i++) {
    if (segmentsIntersect(a, b, quad[i], quad[(i + 1) % 4])) return true;
  }
  return pointInQuad(a, quad) || pointInQuad(b, quad);
}
