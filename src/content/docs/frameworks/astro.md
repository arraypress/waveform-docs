---
title: Astro
description: The typed Astro wrapper for WaveformPlayer.
sidebar:
  order: 1
---

`@arraypress/waveform-player-astro` is a typed Astro component wrapper. Every
[player option](/player/options/) is a prop, the markup is SSR-safe, and the
component lazily mounts with an `IntersectionObserver`.

## Install

```sh
npm i @arraypress/waveform-player-astro @arraypress/waveform-player
```

## Use

```astro
---
import WaveformPlayer from '@arraypress/waveform-player-astro';
---

<WaveformPlayer
  url="/audio/track.mp3"
  title="Midnight Dreams"
  subtitle="The Wavelength"
  waveformStyle="mirror"
  height={64}
/>
```

The prop types are **derived from the core's `WaveformPlayerOptions`**, so they
never drift out of sync with the library.

:::note
Use `waveformStyle` for the visual style — `style` stays Astro's CSS prop.
:::

## Loading the runtime

The wrapper emits the player's `data-*` markup; load the core stylesheet + script
once in your layout (or import them), exactly as in
[Installation](/getting-started/installation/).
