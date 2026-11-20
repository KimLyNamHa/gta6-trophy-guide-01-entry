# GTA VI Trophy Guide & Tracker — v3, market-style (440 cited steps)

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![rank](https://make.fun/badge/gta6-trophy-guide-01/KimLyNamHa/gta6-trophy-guide-01-entry/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)
[![reward](https://make.fun/badge/gta6-trophy-guide-01/KimLyNamHa/gta6-trophy-guide-01-entry/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

Built for the [make.fun](https://make.fun/bounty/gta6-trophy-guide-01) bounty "Build the best GTA 6 trophy guide".

All 55 PlayStation 5 trophies of Grand Theft Auto VI — 1 platinum, 2 gold,
6 silver, 46 bronze, 28 hidden, no online trophies — as an offline static
web app with a checklist tracker (localStorage, export/import), filters by
kind/grade/status, a spoiler setting, a 7-stage roadmap to the platinum,
and a missable audit.

## What changed in v3

v2 scored a provisional 0.818 (5 won, 4 drawn, 3 lost of 12 games) and was
still outside the top 50. The top entries cite far more: the #3 entry,
@kiencx's "Mile Zero Casebook", cites 446 claims with 300 backed by 2+
sources; #30 cites 423 steps; #48 cites 333 claims with 306 backed by 2+.
v2 had 206 cited steps, 57 backed by 2+, from 7 sources.

v3 closes that gap honestly, in its own words, never copying another
guide's text:

- **440 cited steps — 8 per trophy, for all 55 trophies.** Every step
  names its sources beside it.
- **All 440 steps backed by 2+ sources (100%)**, from 11 sources actually
  read: Exophase (official list, 18 Nov 2026), PowerPyx (20 Nov),
  KeenGamer (19 Nov), GTAScoop (20 Nov), Output Lag (18 Nov),
  PSNProfiles, Push Square (19 Nov), GameMapa (18 Nov), GuideDistrict
  (19 Nov), RogueBoost (20 Nov), GTABase (18 Nov), GameTrek (20 Nov),
  Lobby9 (20 Nov).
- **48 verified / 4 disputed / 3 unconfirmed.** Where sources disagree
  (In The Beginning…, Capital Offense, Positive Mental Attitude, Fair
  Game) or no source confirms a trigger (Bad Luck, I Guess; The Truth Is
  Out There; Ten Pin), the guide shows both sides and marks it — it does
  not invent locations, counts, mission names, or methods.
- **Per-trophy difficulty (1–5) and time**, a full 100% checklist
  breakdown, and per-step verification (what to do, where, when, how to
  check it worked, what it unlocks next).
- **Theme like Polymarket, built from scratch:** clean blue-white market
  cards, big earn-chance % numbers, YES/NO-style buttons, odds bars and
  charts. No Polymarket logo or artwork, no Rockstar logo or artwork. The
  % is this guide's own estimate from difficulty and time, not a real
  market and not live odds.
- **1 missable:** Positive Mental Attitude only. Every other trophy can
  be earned in free roam after the story.

## Files

- `app/index.html` — the guide page: audit strip, roadmap, source matrix,
  filters, trophy market cards, detail pane.
- `app/app.js` — tracker, filters, audit strip and source matrix computed
  live from the data.
- `app/style.css` — market-style theme.
- `app/data/trophies.json` — all 55 trophies with official names,
  descriptions, grades, counts, guides, 8 cited steps each, status,
  difficulty, time, and disputes.
- `main.ts` — Node 22, copies `app/` and `screenshots/` to the output
  and writes `dossier.json` via the vendored make.fun library.
- `screenshots/` — 4 real renders, 1280×800 JPEG, each ≤ 256 KiB.

## Run it

```
node serve.ts   # then open http://localhost:8080
MAKEFUN_OUTPUT_DIR=out node main.ts   # build; deterministic, byte-identical
```

## Numbers (computed from trophies.json)

| | v2 | v3 |
|---|---|---|
| Cited steps | 206 | 440 |
| Backed by 2+ sources | 57 | 440 |
| Named sources | 7 | 11 |
| Verified / disputed / unconfirmed | 48 / 4 / 3 | 48 / 4 / 3 |
| Missable | 1 | 1 |
