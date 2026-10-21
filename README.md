# FRC Log Server

A static, GitHub-Pages-hostable repository and viewer for FRC robot logs. Commit logs to `logs/`, push, and your team gets a browsable site where each log opens in the AdvantageScope Lite web viewer via a shareable link.

## How it works

`npm run build` downloads the pinned AdvantageScope Lite release (`lite.config.json`), extracts its static site (no fork, no recompiling), and injects a small shim (`site/viewer-shim.js`) that replaces the Python server endpoints (`assets`, `logs`, `logs/<name>`) with static files:

- `dist/` landing page (`site/`), `dist/viewer/` patched Lite, `dist/viewer/assets/` bundled + custom assets with a generated `index.json`, `dist/logs/` gzipped logs with `index.json`.
- Logs are decompressed in the browser (`DecompressionStream`); deep links are `viewer/?log=<path>`; local files opened from the landing page go through IndexedDB (`viewer/?local=<id>`) and are never uploaded.

## Setup

1. Create a public GitHub repo and push this folder to `main`.
2. Settings > Pages > Source: **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and deploys on every push.

Edit `site.config.json` to change the site title and team number, and to list bundled asset folders to leave out (`excludeBundledAssets`, saves Pages space).

## Adding logs

Copy files into `logs/<season>/<event>/`. For logs that would exceed GitHub's 100 MB file limit raw: `npm run add-log -- path/to/log.wpilog 2026/event`. See `logs/README.md`.

## Custom robots, fields, joysticks

Add folders to `assets/` (see `assets/README.md`).

## Upgrading Lite

Edit `lite.config.json` to a newer release tag and run `npm run build`. The build fails loudly if the Lite markup no longer matches the injection anchors. Re-verify the shim against the new bundles: it relies on the same-origin `assets` / `logs` fetches in `bundles/main.js`, the hub's `window.messagePort`/`open-files` message, `window.assets`, and `window.electron.getFilePath` in the hub's drop handler.

## Local development

```
npm install
npm run build     # use NODE_OPTIONS=--use-system-ca if behind a TLS-inspecting proxy
npm run serve     # http://localhost:8080
```

## Limits

- GitHub Pages: 1 GB site, 100 MB per git file (build warns above 95 MB per file / 900 MB total).
- The entire log is downloaded into the browser before opening.
- `.hoot` and `.revlog` are not supported; no live NetworkTables connection.
- Lite is an alpha release; it shows its own welcome dialog.

## Attribution

Viewer powered by AdvantageScope Lite, BSD-3-Clause, (c) Littleton Robotics. License texts are published with the site (`LICENSE-AdvantageScope.txt`, `ThirdPartyLicenses.txt`). The site is not affiliated with or endorsed by Littleton Robotics.
