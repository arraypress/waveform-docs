# WaveformPlayer Docs

The documentation site for the [`@arraypress`](https://github.com/arraypress)
waveform family — a small, zero-dependency set of vanilla-JS audio components:
a canvas [waveform player](https://github.com/arraypress/waveform-player), a
persistent bottom [bar](https://github.com/arraypress/waveform-bar),
[playlists](https://github.com/arraypress/waveform-playlist), listen
[analytics](https://github.com/arraypress/waveform-tracker), and build-time peak
tooling.

Built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build),
themed to match the marketing site ([waveformplayer.com](https://waveformplayer.com)).
Live at **[docs.waveformplayer.com](https://docs.waveformplayer.com)**.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to ./dist
npm run preview  # preview the build
```

## Notable bits

- **Live demos.** The docs embed real, playable players (`PlayerDemo`,
  `BarDemo`, `PlaylistDemo`, `TrackerDemo`) that load each package's runtime from
  CDN — so what you read is what you get.
- **Changelog.** `npm run sync:changelogs` regenerates the per-library changelog
  pages under `src/content/docs/changelog/` from each package's own
  `CHANGELOG.md`. The generated `.md` files are committed (the site deploys
  standalone, with no access to the sibling packages), so re-run it after a
  release.
- **Agent-friendly.** Every page has a "Copy page / View as Markdown / Open in
  Claude·ChatGPT" header action, plus per-page `.md` endpoints.

## License

MIT © [ArrayPress](https://github.com/arraypress)
