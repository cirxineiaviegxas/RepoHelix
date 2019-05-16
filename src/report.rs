//! Rendering of an [`Analysis`] into JSON and human-readable text reports.

use crate::json::Json;
use crate::metrics::Analysis;
use std::fmt::Write as _;

/// Render the analysis as a JSON value tree, then to a pretty string.
pub fn to_json(analysis: &Analysis, pretty: bool) -> String {
    let root = build_json(analysis);
    if pretty {
        root.to_pretty()
    } else {
        root.to_compact()
    }
}

fn build_json(a: &Analysis) -> Json {
