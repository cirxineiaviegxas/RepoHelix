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
/** Scale churn to a node radius with a gentle square-root curve. */
export function churnRadius(churn, maxChurn) {
    if (maxChurn <= 0)
        return 3;
    const t = Math.sqrt(churn / maxChurn);
    return lerp(3, 18, t);
}
/** Basename of a path. */
export function basename(path) {
    const i = path.lastIndexOf("/");
    return i >= 0 ? path.slice(i + 1) : path;
}
/** Maximum churn across nodes (0 if empty). */
export function maxChurn(nodes) {
    return nodes.reduce((m, n) => Math.max(m, n.churn), 0);
}
/** Stable helix ordering: by first appearance, then path. */
export function helixOrder(nodes) {
    return nodes
        .map((n, i) => ({ n, i }))
