# Logs

Put log files here and push; the GitHub Actions workflow publishes them.

Suggested layout: `logs/<season>/<event>/<match>.wpilog`, e.g. `logs/2026/champs/Q42.wpilog`.
Folders become the browse tree on the site, and the path (minus `.gz`) is the log's shareable name.

Supported types: `.wpilog`, `.wpilogxz`, `.rlog`, `.dslog`, `.dsevents`, `.csv`, plus pre-gzipped variants (`Q42.wpilog.gz`).
`.hoot` and `.revlog` are not supported by the viewer; convert them first.

Size notes:
- At build time every log is gzipped (level 9) and decompressed in the browser when opened. AdvantageKit logs typically shrink to 35-40%.
- GitHub rejects files over 100 MB per push. For larger raw logs, run `npm run add-log -- path/to/log.wpilog 2026/event`, which writes a `.gz` here.
- The published site must stay under 1 GB in total.
- `.wpilogxz` files are already compressed and are served as-is.
