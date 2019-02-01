//! Minimal JSON value builder and serializer.
//!
//! `repohelix` avoids external crates, so this module provides just enough
//! JSON support to emit machine-readable reports. It handles objects, arrays,
//! strings, numbers, booleans and null with correct escaping and stable,
//! insertion-ordered object keys (important for deterministic output).

use std::fmt::Write as _;

/// A JSON value. Object key order is preserved as inserted so that report
/// output is byte-for-byte stable across runs on the same input.
#[derive(Debug, Clone, PartialEq)]
