import { Point, EPS, segmentsIntersect, lineIntersectsSegment } from './quadrilateral';

export type { Point };
/** Axis-aligned rectangle defined by any 4 corner points — min/max bounds are derived. */
export type Rect = [Point, Point, Point, Point];

function bounds(rect: Rect) {
  const xs = rect.map((p) => p.x);
  const ys = rect.map((p) => p.y);
  return { minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) };
}

/** Simple bounds check — much cheaper than ray-casting for axis-aligned rectangles. */
export function pointInRect(pt: Point, rect: Rect): boolean {
  const { minX, maxX, minY, maxY } = bounds(rect);
  return pt.x >= minX - EPS && pt.x <= maxX + EPS && pt.y >= minY - EPS && pt.y <= maxY + EPS;
}

/**
 * Derives the 4 edges (bottom, right, top, left) from the axis-aligned
 * bounding box, ensuring consistent winding order regardless of input vertex order.
 */
function rectEdges(rect: Rect): [Point, Point][] {
  const { minX, maxX, minY, maxY } = bounds(rect);
  return [
    [{ x: minX, y: minY }, { x: maxX, y: minY }],
    [{ x: maxX, y: minY }, { x: maxX, y: maxY }],
    [{ x: maxX, y: maxY }, { x: minX, y: maxY }],
    [{ x: minX, y: maxY }, { x: minX, y: minY }],
  ];
}

/** No collinear fallback needed — a non-degenerate rectangle can't have all 4 points on one line. */
export function lineIntersectsRect(a: Point, b: Point, rect: Rect): boolean {
  return rectEdges(rect).some(([p, q]) => lineIntersectsSegment(a, b, p, q));
}

/** Uses pointInRect (bounds check) instead of ray-casting for the endpoint fallback. */
export function lineSegmentIntersectsRect(a: Point, b: Point, rect: Rect): boolean {
  if (rectEdges(rect).some(([p, q]) => segmentsIntersect(a, b, p, q))) return true;
  return pointInRect(a, rect) || pointInRect(b, rect);
}
