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
        .sort((a, b) => a.n.first_seen - b.n.first_seen || a.n.path.localeCompare(b.n.path))
        .map((e) => e.i);
}
/** Position on a ring of `n` slots at slot `i`, centred at (cx, cy). */
export function ringPoint(i, n, cx, cy, radius) {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius, angle };
}
/** Validate that every link references an in-range node index. */
export function linksAreValid(data) {
    const n = data.nodes.length;
    return data.links.every((l) => l.source >= 0 && l.source < n && l.target >= 0 && l.target < n && l.source !== l.target);
}
/** Build the one-line summary string. */
export function summaryText(data) {
    const topNode = [...data.nodes].sort((a, b) => b.churn - a.churn)[0];
    const topLink = [...data.links].sort((a, b) => b.strength - a.strength)[0];
    const parts = [
        `commits: ${data.commits}`,
        `files: ${data.nodes.length}`,
        `span: ${data.span_days}d`,
        `sessions: ${data.clusters.length}`,
        topNode ? `hotspot: ${basename(topNode.path)}` : "",
        topLink
            ? `top coupling: ${basename(data.nodes[topLink.source].path)}↔${basename(data.nodes[topLink.target].path)} (${topLink.strength.toFixed(2)})`
            : "",
    ].filter(Boolean);
    return parts.join("   ·   ");
}
