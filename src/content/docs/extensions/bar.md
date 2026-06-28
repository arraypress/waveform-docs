---
title: WaveformBar
description: A persistent, Spotify-style bottom bar built on WaveformPlayer.
sidebar:
  order: 1
---

`@arraypress/waveform-bar` is a persistent bottom bar that follows the listener
across pages — queue, volume, repeat, favorites, cart, DJ markers and cross-page
session persistence. It embeds one self-mode WaveformPlayer and drives inline
`external`-mode players via `data-wb-*` triggers.

## Install

```html
<link rel="stylesheet" href="https://unpkg.com/@arraypress/waveform-player/dist/waveform-player.css">
<link rel="stylesheet" href="https://unpkg.com/@arraypress/waveform-bar/dist/waveform-bar.min.css">
<script src="https://unpkg.com/@arraypress/waveform-player/dist/waveform-player.min.js"></script>
<script src="https://unpkg.com/@arraypress/waveform-bar/dist/waveform-bar.min.js"></script>
```

The bar requires WaveformPlayer to be loaded first.

## Initialise

```js
window.WaveformBar.init({
  position: 'bottom',
  persist: true,
});
```

## Triggers

Any element with `data-wb-play` becomes a trigger — clicking it loads the track
into the bar:

```html
<button
  data-wb-play
  data-url="/audio/track.mp3"
  data-title="Midnight Dreams"
  data-artist="The Wavelength"
  data-artwork="/img/cover.webp"
>Play</button>
```

The bar reflects state back onto every trigger via classes you can style:
`.wb-current` (loaded), `.wb-playing` (playing), `.wb-favorited`, `.wb-in-cart`.

:::note
This page is being expanded. For the full option list see the
[package README](https://github.com/arraypress/waveform-bar).
:::
