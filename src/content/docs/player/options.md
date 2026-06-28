---
title: Options
description: The WaveformPlayer configuration surface.
sidebar:
  order: 1
---

Every option works two ways: as a **JS constructor option** (camelCase) or as a
**`data-*` attribute** (kebab-case). `waveformStyle: 'mirror'` is identical to
`data-waveform-style="mirror"`. The canonical name wins if both an alias and the
real name are present.

## Source

| Option | Default | Notes |
| --- | --- | --- |
| `url` | — | Audio file URL. Alias: `src`. Required (unless visualization-only). |
| `waveform` | `null` | URL to a pre-generated peaks JSON — paints instantly, no decode. |
| `audioMode` | `'self'` | `'self'` owns an `<audio>`; `'external'` is visualization-only. |
| `preload` | `'metadata'` | Forwarded to the `<audio>` element. |
| `autoplay` | `false` | Attempt playback on load (browser policies permitting). |

## Appearance

| Option | Default | Notes |
| --- | --- | --- |
| `waveformStyle` | `'mirror'` | `mirror`, `bars`, `line`, `blocks`, `dots`, `seekbar`. Alias: `style`. |
| `height` | `64` | Waveform height in px. |
| `samples` | `256` | Number of bars/points drawn. |
| `barWidth` / `barSpacing` / `barRadius` | per-style | Bar geometry. |
| `layout` | `'default'` | `'default'` or `'preview'` (centered title). |
| `buttonStyle` | `'circle'` | `'circle'` or `'minimal'` (bare glyph). |
| `buttonSize` | `null` | Button size — number = px, string = verbatim. Scales both styles. |

## Colors

With no `colorPreset` or explicit colors, the player **auto-detects** the page
theme (Tailwind `class="dark"`, `data-theme`, `prefers-color-scheme`) and
re-detects on a runtime light/dark switch. See [Styling](/player/styling/).

| Option | Notes |
| --- | --- |
| `colorPreset` | Named preset, or omit for auto detection. |
| `waveformColor` / `progressColor` | Unplayed / played waveform. |
| `buttonColor` / `textColor` / `textSecondaryColor` | Control + label colors. |

## Metadata & UI

| Option | Default | Notes |
| --- | --- | --- |
| `title` / `subtitle` / `album` / `artwork` | — | Track metadata + cover. |
| `bpm` / `showBPM` | `null` / `false` | Show a BPM badge (or auto-detect on decode). |
| `markers` | `[]` | Array of `{ time, label, color }` cue markers. |
| `showControls` / `showInfo` / `showTime` / `showPlaybackSpeed` | `true` | Toggle UI regions. |

See [Data attributes](/player/data-attributes/) for the full markup contract.
