# Ara replay reliability fixture

This disposable repository is the deterministic hard-PR fixture for Ara's live
Pi evaluations. The baseline intentionally contains two interacting production
bugs in webhook replay reduction. Tests are the specification: an evaluation
agent must repair production code, leave tests and workflow unchanged, and open
a draft pull request with green CI.

Run `bun test` and `bun run typecheck`.
