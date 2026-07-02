#!/usr/bin/env node
/**
 * build-og.mjs — render the docs social-share cards (1200×630) from inline SVG
 * via sharp. Re-run after copy/brand changes:  npm run build:og
 *
 * One card per top-level docs section (+ a default). Minimal shadcn-zinc,
 * matching the marketing site: faint dot-grid, hairline card border, a mono
 * badge, a big section title, a one-line subtitle, and the brand lockup.
 * Deterministic (no Math.random). The Head override (src/overrides/Head.astro)
 * maps each page's section to its card.
 *
 * Output:
 *   public/img/og.png            — default / fallback
 *   public/img/og/<section>.png  — per section
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdirSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMG = resolve(__dirname, '..', 'public', 'img');
mkdirSync(resolve(IMG, 'og'), { recursive: true });

const W = 1200;
const H = 630;
const SANS = 'Geist, Inter, system-ui, -apple-system, Helvetica, Arial, sans-serif';
const MONO = "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

const BG = '#09090b';
const FG = '#fafafa';
const MUTED = '#a1a1aa';
const DIM = '#52525b';
const BORDER = '#27272a';
const CARD = '#0b0b0e';
const BADGE_BG = '#131316';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function dotGrid() {
	let d = '';
	for (let y = 26; y < H; y += 34) for (let x = 26; x < W; x += 34) d += `<circle cx="${x}" cy="${y}" r="1.3" fill="#ffffff" opacity="0.04"/>`;
	return d;
}

function mark() {
	const bars = [
		{ x: 0, h: 18 },
		{ x: 13, h: 30 },
		{ x: 26, h: 38 },
		{ x: 39, h: 26 },
		{ x: 52, h: 14 },
	];
	return bars.map((b) => `<rect x="${b.x}" y="${19 - b.h / 2}" width="6" height="${b.h}" rx="3" fill="${FG}"/>`).join('');
}

function wrap(text, maxChars, maxLines = 2) {
	const words = text.split(' ');
	const lines = [];
	let cur = '';
	for (const w of words) {
		if (cur && (cur + ' ' + w).length > maxChars) {
			lines.push(cur);
			cur = w;
		} else cur = cur ? cur + ' ' + w : w;
	}
	if (cur) lines.push(cur);
	return lines.slice(0, maxLines);
}

function cardSvg({ badge, title, subtitle }) {
	const badgeW = Math.round(badge.length * 11.4) + 52;
	const subLines = wrap(subtitle, 62);
	const subtitleSvg = subLines
		.map((l, i) => `<text x="104" y="${426 + i * 42}" font-family="${SANS}" font-size="30" font-weight="400" fill="${MUTED}">${esc(l)}</text>`)
		.join('');

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  ${dotGrid()}
  <rect x="40" y="40" width="${W - 80}" height="${H - 80}" rx="28" fill="${CARD}" fill-opacity="0.6" stroke="${BORDER}" stroke-width="1"/>
  <g transform="translate(104, 82)">
    <g>${mark()}</g>
    <text x="80" y="27" font-family="${SANS}" font-size="26" font-weight="600" fill="${DIM}" letter-spacing="-0.5">WaveformPlayer</text>
  </g>
  <g transform="translate(104, 232)">
    <rect x="0" y="0" width="${badgeW}" height="46" rx="23" fill="${BADGE_BG}" stroke="${BORDER}" stroke-width="1"/>
    <text x="${badgeW / 2}" y="30" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="500" fill="${MUTED}">${esc(badge)}</text>
  </g>
  <text x="104" y="356" font-family="${SANS}" font-size="86" font-weight="700" fill="${FG}" letter-spacing="-3">${esc(title)}</text>
  ${subtitleSvg}
  <text x="104" y="548" font-family="${SANS}" font-size="22" font-weight="600" fill="${DIM}" letter-spacing="0.5">docs.waveformplayer.com</text>
</svg>`;
}

const CARDS = [
	{ out: 'og.png', badge: 'documentation', title: 'Documentation', subtitle: 'Guides, API reference and examples for the waveform family.' },
	{ out: 'og/getting-started.png', badge: 'docs · getting started', title: 'Getting Started', subtitle: 'Install and add a waveform player to any page in minutes.' },
	{ out: 'og/player.png', badge: 'docs · player', title: 'Player API', subtitle: 'Options, methods, events, styling and waveform data.' },
	{ out: 'og/frameworks.png', badge: 'docs · frameworks', title: 'Frameworks', subtitle: 'React, Vue, Svelte, Astro, WordPress, Shopify & plain HTML.' },
	{ out: 'og/bar.png', badge: 'docs · @arraypress/waveform-bar', title: 'WaveformBar', subtitle: 'The persistent bar — configuration, triggers, features, API.' },
	{ out: 'og/playlist.png', badge: 'docs · @arraypress/waveform-playlist', title: 'WaveformPlaylist', subtitle: 'Multi-track playlists — chapters, options and API.' },
	{ out: 'og/tracker.png', badge: 'docs · @arraypress/waveform-tracker', title: 'WaveformTracker', subtitle: 'Privacy-first listen analytics — config, payload, privacy.' },
	{ out: 'og/gen.png', badge: 'docs · @arraypress/waveform-gen', title: 'WaveformGen', subtitle: 'Build-time peaks — CLI, library, output and notes.' },
	{ out: 'og/changelog.png', badge: 'docs · changelog', title: 'Changelog', subtitle: 'Release history for the player, bar and framework wrappers.' },
];

for (const c of CARDS) {
	await sharp(Buffer.from(cardSvg(c))).png().toFile(resolve(IMG, c.out));
	console.log(`✓ ${c.out}  (${c.title})`);
}
console.log(`\n${CARDS.length} cards written (${W}×${H})`);
