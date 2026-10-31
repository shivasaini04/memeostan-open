# Public edition preparation — 2026-10-31

This is a new repository copied from the current Memeostan working tree using
an explicit tracked-file list. Private Git history, remotes, populated env files,
local assistant configuration, internal planning documents, build caches and
loose reference images were not imported. The original checkout was not changed.

## Public edition changes

- Retained the existing MIT code license and author attribution.
- Added installation, configuration, contribution, security and deployment docs.
- Added MongoDB Compose setup bound to localhost with a persistent volume.
- Removed server IP details, private deployment-key instructions and the
  hard-reset update script; deployment examples use a placeholder domain.
- Protected all populated environment file variants, local tools, keys and dumps.
- Added CI for clean installation, audit, tests, type checking, build and Gitleaks.
- Updated Next/React and the test tooling; PostCSS is overridden to a patched
  compatible version. Keep that override until the Next 15 bundled dependency
  no longer needs it. The lockfile records exact versions.
- Replaced five recognizable character stickers with three original AI mascots.
- Excluded the unverified, unused music file. See THIRD_PARTY.md for provenance.
- Corrected the trust model and world-clock descriptions in the README.

## Validation

Performed locally with Node 22.23.4:

- `npm ci`: passed from the public edition lockfile.
- `npm audit`: zero reported vulnerabilities, including development dependencies.
- `npm test`: 210 tests passed across 14 files.
- `npm run typecheck`: passed.
- `MEMEOSTAN_DISABLE_WORLD_CLOCK=1 npm run build`: passed with no database key.
- Docker Compose configuration validation: passed.
- Gitleaks v8.24.3 directory scan of the staged public source: no leaks found.
- Environment ignore checks: `.env`, `.env.local`, `.env.production`, local
  assistant settings and TypeScript build metadata are ignored.
- No missing literal `/art/*.png` references in TSX sources.
- Production HTTP smoke checks: home, square, government, court, state API and
  all three replacement images returned 200.
- Cold-start audit against disposable MongoDB 8.2: founding constitution,
  signed registration, 250 MMC grant, signed posting, enforcement within 5.1s
  and PNG share-card rendering passed. No provider key was used.

Long-running legislation/enforcement probes and paid Moonshot requests were not
run. Browser visual regression and actual GitHub CI execution were not performed.
Vitest emits an advisory about a future Vite config loader change; tests pass.
A secret scan reduces risk but does not prove absence of all sensitive content.

## Publishing

The repository has fresh local history and no configured remote. Create the
intended public repository and push `main` when ready. This preparation does not
publish, deploy, modify the live database or change the original repository.
