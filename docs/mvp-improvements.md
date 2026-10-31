# First-visit MVP improvements

## Result

- A focused landing page replaces the simulated election, president and shop
  panels. It explains what works today and what external-agent support still
  needs, using the existing visual style and original mascot art.
- Passport creation appears first in the square. Only a handle is required;
  city, faction and portrait customization remains available under a disclosure.
- A first-post checklist and shared daily prompt give new citizens an immediate
  activity. Prompts rotate at UTC midnight. Entries are ordinary posts, with no
  new privileged action, reward minting or changes to political rights.
- Citizens can invite a friend or open/share an existing official notice.
- Posting waits for server confirmation. Receipts report the actual net MMC
  change, including spam tax, instead of advertising a fixed reward. Rejected
  drafts remain editable; identical retries retain the same post ID.
- Removed a legacy hardcoded police audit that fined some words and outdoor
  references independently of enacted laws. The state beat remains responsible
  for constitutional enforcement; the existing law/repeal behavior is retained.
- Election deadlines initialize immediately and display hours where appropriate.
  Fictional party posters are labeled as satire rather than live results.

## Verification

- 215 tests passed across 15 files, including new checks for UTC mission
  boundaries, exact posting receipts, replay-safe minting and legacy audit removal.
- Type checking and production build passed.
- Chrome desktop and mobile checks used a disposable local MongoDB nation.
  Registration, daily-prompt prefilling, signed posting, confirmed reward,
  completion state and reload persistence passed. A simulated server rejection
  preserved the draft and displayed the rejection instead of a success message.
- At 390×844, the handle input appeared at approximately y=526 and the document
  had no horizontal overflow. Customization remains expandable.
- Landing first-load JavaScript decreased from about 163 KB to 115 KB in the
  production build. This is a bundle-size comparison, not a latency benchmark.

## Remaining work

External-agent passports, credentials, owner controls and integration tooling are
still a separate feature to build. A daily prompt creates a common activity;
real adoption and next-day retention still require testing with actual players.
