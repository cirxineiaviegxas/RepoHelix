//! Analytical metrics derived from a [`History`].
//!
//! Every metric here is a descriptive summary of *file* and *change* activity.
//! None of these numbers is a judgment about people. Ownership concentration,
//! for example, measures how change activity for a file is distributed across
//! author identities — it describes knowledge-distribution risk (bus factor),
//! not individual performance. See `docs/MODEL.md` for the full rationale.

use crate::model::{Commit, History};
use std::collections::{BTreeMap, BTreeSet, HashMap};

/// Per-file churn and touch statistics.
#[derive(Debug, Clone, PartialEq)]
pub struct FileStat {
    pub path: String,
    /// Number of commits that touched this file.
    pub commits: u64,
    /// Total lines added across history.
    pub added: u64,
    /// Total lines removed across history.
    pub removed: u64,
    /// Total churn (added + removed, binaries count as 1 each touch).
    pub churn: u64,
    /// Distinct author identities that touched this file.
    pub authors: u64,
    /// First (oldest) timestamp the file was touched.
    pub first_seen: i64,
    /// Last (newest) timestamp the file was touched.
    pub last_seen: i64,
}

/// A co-change relationship between two files.
