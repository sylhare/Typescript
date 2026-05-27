export type Point = { x: number; y: number };
// Axis-aligned rectangle: any 4 corners, min/max bounds are derived
export type Rect = [Point, Point, Point, Point];

const EPS = 1e-12;

function bounds(rect: Rect) {
  const xs = rect.map((p) => p.x);
  const ys = rect.map((p) => p.y);
  return { minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) };
}

export function pointInRect(pt: Point, rect: Rect): boolean {
  const { minX, maxX, minY, maxY } = bounds(rect);
  return pt.x >= minX - EPS && pt.x <= maxX + EPS && pt.y >= minY - EPS && pt.y <= maxY + EPS;
}

function orient(a: Point, b: Point, c: Point): number {
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

// The axis-aligned rectangle has 4 edges: bottom, right, top, left
function rectEdges(rect: Rect): [Point, Point][] {
  const { minX, maxX, minY, maxY } = bounds(rect);
  return [
    [{ x: minX, y: minY }, { x: maxX, y: minY }],
    [{ x: maxX, y: minY }, { x: maxX, y: maxY }],
    [{ x: maxX, y: maxY }, { x: minX, y: maxY }],
    [{ x: minX, y: maxY }, { x: minX, y: minY }],
  ];
}

export function lineIntersectsRect(a: Point, b: Point, rect: Rect): boolean {
  return rectEdges(rect).some(([p, q]) => lineIntersectsSegment(a, b, p, q));
}

export function lineSegmentIntersectsRect(a: Point, b: Point, rect: Rect): boolean {
  if (rectEdges(rect).some(([p, q]) => segmentsIntersect(a, b, p, q))) return true;
  return pointInRect(a, rect) || pointInRect(b, rect);
}
