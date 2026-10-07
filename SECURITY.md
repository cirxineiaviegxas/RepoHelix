# Security Policy

## Reporting a vulnerability

Please do not open a public issue for a security problem. Use GitHub's private
[security advisory](https://github.com/cirxineiaviegxas/RepoHelix/security/advisories/new) form, or contact a
maintainer directly if the form is unavailable to you.

Include what an attacker gains in one sentence, the version or commit you are running, the smallest
reproduction you can manage, and whether the input is attacker-controlled in your setup. You should
get an acknowledgement within a few working days and a disclosure timeline before anything is
published.

## Scope

RepoHelix reads git history plus deterministic fixture logs into a helix and a co-change
atlas. In scope: a crafted git log (clock skew, merge octopus, a rename chain) that folds
two files into one helix strand, a co-change score that disagrees with the fixture, a
fixture that parses but describes an impossible history, and path handling in the importer.
