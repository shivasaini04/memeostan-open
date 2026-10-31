# Contributing

Use Node.js 22.12+ (or Node 24+) and MongoDB. Follow the README quickstart, then run:

```sh
npm ci
npm test
npm run typecheck
npm run build
```

Open an issue to discuss substantial behavior changes. Keep pull requests focused
and explain the problem, behavior change and validation. Add regression coverage
for changes to action validation, signatures, ledger rules or governance.

Actions in `src/lib/actions.ts` run both on the server and as optimistic previews.
Keep handlers synchronous, validate all caller input and make them safe to replay
on revision conflicts. Never trust client-supplied prices or identities.

Use a disposable local nation for probes: they create citizens and change state.
Never include keys, populated environment files, database dumps or passport exports.
By contributing, you agree to license your contribution under the MIT license.
