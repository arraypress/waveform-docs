# CLAUDE.md — waveform-docs

Astro + Starlight documentation site for the `@arraypress` waveform family
(docs.waveformplayer.com). Private; deploys to Cloudflare on push to `main`.

## Commands
- `npm run dev` / `npm run build` / `npm run preview` — standard Astro.
- `npm run sync:changelogs` — regenerates the changelog pages from sibling repos.
- `npm run build:og` — OG images.

## The rule that matters: changelog pages are GENERATED

`src/content/docs/changelog/*.md` are written by `scripts/sync-changelogs.mjs`.
**Never hand-edit them** — the next sync silently overwrites your changes.
Each carries a `<!-- GENERATED … -->` marker.

The script reads each package's `CHANGELOG.md` from the sibling repos
(`PKG_ROOT = ../`, i.e. `~/Developer/waveform-player/`). It **warns and continues**
on a missing file and still exits `0`, so a wrong `PKG_ROOT` looks exactly like
success. **Always read the output** — every line should be `✓`, and any `⚠` means
that package was skipped and its page left stale.

(This broke once: the packages moved out of `~/Documents/Development Work/js-libraries`,
`PKG_ROOT` still pointed there, and the sync no-opped while reporting complete.)

## Version numbers
CDN and install snippets use **`@latest`** everywhere (plain-html / wordpress /
shopify pages). That's deliberate — **there is no per-release version bump in this
repo.** Keep it that way; don't "helpfully" pin a version into a snippet.

## Where option docs live
- `src/content/docs/player/options.mdx` — options table **and** the "Complete data-*
  attribute index" table (two rows per new option).
- `src/content/docs/player/data-attributes.mdx` — the `data-<kebab>` row.
- `src/content/docs/extensions/bar/configuration.mdx` — bar config.
- `src/content/docs/extensions/playlist/options.mdx` — forwarded-options prose list.
- `src/content/docs/frameworks/astro.mdx` — common-props table.
- react/vue/svelte framework pages **enumerate nothing** and need no change.

## Cross-repo
Documenting a new option is one step of a 15-package + 2-site batch —
load the `waveform-release` skill.
