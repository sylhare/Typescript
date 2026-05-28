import { Point, orient, pointOnSegment } from './quadrilateral';

export type { Point };
/**
 * Parallelogram defined as [origin, origin+u, origin+u+v, origin+v],
 * where opposite sides are parallel and equal in length.
 */
export type Para = [Point, Point, Point, Point];

/**
 * For a parallelogram P0,P1,P2,P3 with P0+P2 = P1+P3 (midpoints of diagonals coincide),
 * a point is inside when it is on the correct side of all 4 edges.
 * All edge orientations must share the same sign, which holds for any convex polygon.
 * Points exactly on an edge are treated as inside.
 */
export function pointInPara(pt: Point, para: Para): boolean {
  for (let i = 0; i < 4; i++) {
    const a = para[i];
    const b = para[(i + 1) % 4];
    if (pointOnSegment(a, b, pt)) return true;
  }
  const signs = para.map((p, i) => orient(p, para[(i + 1) % 4], pt));
  return signs.every((s) => s > 0) || signs.every((s) => s < 0);
}
