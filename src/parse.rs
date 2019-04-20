//! Parse the raw `git log --numstat` output produced by [`crate::git`].
//!
//! The format is a stream of records, each beginning with `COMMIT_SEP`,
//! followed by a header line of unit-separator-delimited fields, then zero or
//! more numstat lines of the form `<added>\t<removed>\t<path>`.
//!
