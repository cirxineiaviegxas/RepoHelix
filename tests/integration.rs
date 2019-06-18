//! End-to-end integration tests exercising the full pipeline against the
//! committed fixture log. These verify that parsing, analysis, and rendering
//! agree with the hand-computed expectations for the synthetic `nebula`
//! history, and that output is deterministic.

use std::path::Path;

use repohelix::metrics::{analyze, Params};
use repohelix::{load_from_log, report, viewer};

fn fixture_path() -> &'static Path {
    Path::new("fixtures/nebula.gitlog")
}

#[test]
fn fixture_loads_expected_shape() {
