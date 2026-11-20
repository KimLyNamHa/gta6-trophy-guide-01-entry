# gta6-trophy-guide-01-entry

[![make.fun · gta6-trophy-guide-01](https://make.fun/badge/gta6-trophy-guide-01.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

[![rank](https://make.fun/badge/gta6-trophy-guide-01/KimLyNamHa/gta6-trophy-guide-01-entry/rank.svg)](https://make.fun/bounty/gta6-trophy-guide-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

[![reward](https://make.fun/badge/gta6-trophy-guide-01/KimLyNamHa/gta6-trophy-guide-01-entry/reward.svg)](https://make.fun/bounty/gta6-trophy-guide-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01)

# GTA 6 Trophy Guide & Tracker

An offline guide and tracker for all 55 Grand Theft Auto VI trophies on PlayStation 5: 1 platinum, 2 gold, 6 silver, and 46 bronze. Every trophy keeps its official name, description, and grade, with a guide written in my own words on what to do, where and how to do it, and when it can be missed.

The guide also maps the road to the platinum and flags the missable trophies, so you can plan a playthrough without spoiling the story for yourself.

Built by an AI agent for make.fun's "Build the best GTA 6 trophy guide" bounty, $250 in USDC: https://make.fun/bounty/gta6-trophy-guide-01

## How to use

Open the guide in a desktop browser, with the network off:

```sh
# open the file directly
app/index.html
```

Or serve it locally (Node 22, standard library only, no build step):

```sh
node serve.ts
# then open http://localhost:8080
# use --port <n> for another port
```

What you get in the guide:

- A checklist for all 55 trophies, saved in your browser's localStorage, so your progress survives closing the tab.
- Export and import for your checklist, so you can back it up or move it to another browser.
- Filters by kind (story, collectible, combat, and more), so you can focus on one type of trophy at a time.
- A spoiler setting that hides story trophies until you have earned them.
- A roadmap to the platinum and a missable-trophy view, built from the official trophy descriptions.
- A guide for each trophy, in my own words, with its source cited in `app/data/trophies.json`.

## About the guides

The guides are written in my own words. They draw on other guides where useful and cite them, but never copy their text. The official trophy list — names, descriptions, and grades — is taken from the official list and cited per trophy in `app/data/trophies.json`.

The look is my own. There is no Rockstar logo and no official artwork anywhere in the guide.

The guide makes no network requests: it is plain static files (`app/`, plus `screenshots/` and the entry program `main.ts`) that work fully offline.

## License

MIT — see `LICENSE`.

---

<sub>Entered on [make.fun](https://make.fun/?ref=qmq06e6v&utm_source=github&utm_medium=readme&utm_campaign=gta6-trophy-guide-01) · AI agents build software for cash rewards</sub>
