export type Point = { x: number; y: number };
export type Quad = [Point, Point, Point, Point];

/**
* Return the signed orientation (cross product) of the triplet (a,b,c).
* Positive if c is to the left of a->b, negative if to the right, zero if collinear.
*/
export function orient(a: Point, b: Point, c: Point): number {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

/**
* Return true if value is between a and b inclusive (works for numbers).
*/
export function between(a: number, b: number, value: number): boolean {
  return Math.min(a, b) - Number.EPSILON <= value && value <= Math.max(a, b) + Number.EPSILON;
}

/**
* Check if point p lies on the segment [a,b], allowing a small epsilon tolerance.
*/
export function pointOnSegment(a: Point, b: Point, p: Point): boolean {
  const o = orient(a, b, p);
  if (Math.abs(o) > 1e-12) return false;
  return between(a.x, b.x, p.x) && between(a.y, b.y, p.y);
}

/**
* Check if two closed segments [p1,p2] and [q1,q2] intersect (including endpoints and collinear overlap).
*/
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

/**
* Check if infinite line through a->b intersects segment [p,q].
* True if endpoints are on opposite sides or at least one is collinear.
*/
export function lineIntersectsSegment(a: Point, b: Point, p: Point, q: Point): boolean {
  const oa = orient(a, b, p);
  const ob = orient(a, b, q);
  return oa === 0 || ob === 0 || (oa > 0) !== (ob > 0);
}

/**
* Return true if point is inside (or on boundary of) a simple quadrilateral.
* Uses ray-casting winding algorithm which works for general simple polygons.
*/
export function pointInQuad(pt: Point, quad: Quad): boolean {
  let inside = false;
  for (let i = 0; i < 4; i++) {
    const j = (i + 1) % 4;
    const a = quad[i];
    const b = quad[j];

    if (pointOnSegment(a, b, pt)) return true;

    const intersect =
                                                                               (a.y > pt.y) !== (b.y > pt.y) &&
                                                                                     pt.x < ((b.x - a.x) * (pt.y - a.y)) / (b.y - a.y) + a.x;
    if (intersect) inside = !inside;
  }
  return inside;
}

/**
* Check if the infinite line through points a and b intersects the quadrilateral.
* Returns true when the line intersects any edge, passes through a vertex,
* or all quad points are collinear with the line.
*/
export function lineIntersectsQuadLine(a: Point, b: Point, quad: Quad): boolean {
  for (let i = 0; i < 4; i++) {
    const j = (i + 1) % 4;
    if (lineIntersectsSegment(a, b, quad[i], quad[j])) return true;
  }
  const allCollinear = quad.every((p) => Math.abs(orient(a, b, p)) <= 1e-12);
  return allCollinear;
}

/**
* Check if the line segment [a,b] intersects the quadrilateral.
* Returns true if it intersects any quad edge, or if either endpoint lies inside the quad.
*/
export function lineSegmentIntersectsQuad(a: Point, b: Point, quad: Quad): boolean {
  for (let i = 0; i < 4; i++) {
    const j = (i + 1) % 4;
    if (segmentsIntersect(a, b, quad[i], quad[j])) return true;
  }
  if (pointInQuad(a, quad) || pointInQuad(b, quad)) return true;
  return false;
}
