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
}
/**
 * Map a concentration value (0..1) to an rgb() colour. Low concentration
 * (shared stewardship) reads as calm teal; high concentration (single-owner /
 * bus-factor risk) reads as warm amber. This is a risk gradient, never a value
 * judgment about any contributor.
 */
export function concentrationColour(c) {
    const t = clamp(c, 0, 1);
    const r = Math.round(lerp(40, 240, t));
    const g = Math.round(lerp(200, 170, t));
    const b = Math.round(lerp(180, 60, t));
    return `rgb(${r},${g},${b})`;
}
