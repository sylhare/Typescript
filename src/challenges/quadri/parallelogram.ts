export type Point = { x: number; y: number };
// Parallelogram: [origin, origin+u, origin+u+v, origin+v] — opposite sides parallel and equal
export type Para = [Point, Point, Point, Point];

const EPS = 1e-12;

export function orient(a: Point, b: Point, c: Point): number {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

function between(a: number, b: number, v: number): boolean {
  return Math.min(a, b) - EPS <= v && v <= Math.max(a, b) + EPS;
}

function pointOnSegment(a: Point, b: Point, p: Point): boolean {
  return Math.abs(orient(a, b, p)) <= EPS && between(a.x, b.x, p.x) && between(a.y, b.y, p.y);
}

function segmentsIntersect(p1: Point, p2: Point, q1: Point, q2: Point): boolean {
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

// For a parallelogram P0,P1,P2,P3 with P0+P2=P1+P3 (midpoints of diagonals coincide),
// a point is inside when it is on the correct side of all 4 edges.
// We reuse the winding ray-cast which works for any convex simple polygon.
export function pointInPara(pt: Point, para: Para): boolean {
  for (let i = 0; i < 4; i++) {
    const a = para[i];
    const b = para[(i + 1) % 4];
    if (pointOnSegment(a, b, pt)) return true;
  }
  // All orientations must have the same sign (convex polygon inside test)
  const signs = para.map((p, i) => orient(p, para[(i + 1) % 4], pt));
  return signs.every((s) => s > 0) || signs.every((s) => s < 0);
}

export function lineIntersectsPara(a: Point, b: Point, para: Para): boolean {
  for (let i = 0; i < 4; i++) {
    if (lineIntersectsSegment(a, b, para[i], para[(i + 1) % 4])) return true;
  }
  return para.every((p) => Math.abs(orient(a, b, p)) <= EPS);
}

export function lineSegmentIntersectsPara(a: Point, b: Point, para: Para): boolean {
  for (let i = 0; i < 4; i++) {
    if (segmentsIntersect(a, b, para[i], para[(i + 1) % 4])) return true;
  }
  return pointInPara(a, para) || pointInPara(b, para);
}
