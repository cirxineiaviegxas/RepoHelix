/**
 * repohelix viewer — pure, DOM-free core.
 *
 * All the math and data-shaping logic lives here so it can be unit-tested under
 * plain Node without a browser or DOM shim. `viewer.ts` imports these helpers
 * and adds the SVG rendering on top.
 */
/** Linear interpolation. */
export function lerp(a, b, t) {
    return a + (b - a) * t;
}
/** Clamp a value into [lo, hi]. */
export function clamp(x, lo, hi) {
    return Math.max(lo, Math.min(hi, x));
