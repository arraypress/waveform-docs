import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLlmsTxt from 'starlight-llms-txt';
import sitemap from '@astrojs/sitemap';

// Site-wide structured data: the publisher, the docs site, and the product.
const JSON_LD = JSON.stringify([
	{
		'@context': 'https://schema.org',
		'@type': 'Organization',
		name: 'ArrayPress',
		url: 'https://github.com/arraypress',
		sameAs: ['https://github.com/arraypress', 'https://www.npmjs.com/org/arraypress'],
	},
	{
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'WaveformPlayer Docs',
		url: 'https://docs.waveformplayer.com',
	},
	{
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'WaveformPlayer',
		applicationCategory: 'MultimediaApplication',
		operatingSystem: 'Web',
		url: 'https://waveformplayer.com',
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
		author: { '@type': 'Organization', name: 'ArrayPress', url: 'https://github.com/arraypress' },
	},
]);

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.waveformplayer.com',
	integrations: [
		starlight({
			title: 'WaveformPlayer',
			description:
				'Documentation for the @arraypress waveform family — a small, zero-dependency set of vanilla-JS audio components: a canvas waveform player, a persistent bottom bar, playlists, listen analytics, and build-time peak tooling.',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/arraypress/waveform-player' },
			],
			editLink: {
				baseUrl: 'https://github.com/arraypress/waveform-docs/edit/main/',
			},
			customCss: ['./src/styles/custom.css'],
			components: {
				// Header "Copy page" dropdown (Markdown / Claude / ChatGPT), next to the theme toggle.
				SocialIcons: './src/overrides/SocialIcons.astro',
				// Per-section og:image — picks a card by the page's top-level section.
				Head: './src/overrides/Head.astro',
			},
			// llms.txt / llms-full.txt are generated from these docs by the
			// starlight-llms-txt plugin (see plugins below); link agents to them.
			head: [
				{
					tag: 'link',
					attrs: { rel: 'alternate', type: 'text/plain', href: '/llms.txt' },
				},
				// Live <PlayerDemo> embeds — load the real runtime (CDN) and re-init
				// after Starlight view-transition navigations.
				{ tag: 'link', attrs: { rel: 'stylesheet', href: 'https://unpkg.com/@arraypress/waveform-player/dist/waveform-player.css' } },
				{ tag: 'script', attrs: { src: 'https://unpkg.com/@arraypress/waveform-player/dist/waveform-player.min.js', defer: true } },
				{ tag: 'script', content: "document.addEventListener('astro:page-load',function(){window.WaveformPlayer&&WaveformPlayer.init&&WaveformPlayer.init()});" },
				// og:image is per-section — see src/overrides/Head.astro. Site-wide JSON-LD:
				{ tag: 'script', attrs: { type: 'application/ld+json' }, content: JSON_LD },
			],
			plugins: [
				// Generates /llms.txt (index) and /llms-full.txt (all docs concatenated)
				// from this content at build time, so they stay in sync automatically.
				starlightLlmsTxt({
					projectName: 'WaveformPlayer',
					description:
						'A small, zero-dependency family of vanilla-JS audio components: a canvas waveform player, a persistent bottom bar, playlists, listen analytics, and build-time peak tooling. Auto-initializes from HTML data-* attributes; ships typed Astro and React wrappers.',
					details:
						'These docs cover the core player, its extensions (Bar, Playlist, Tracker, Generator), and framework/platform integrations. Full site: https://waveformplayer.com',
					// Changelogs are noisy for the abridged set — keep them out of
					// llms-small.txt (they remain in the complete llms-full.txt).
					exclude: ['changelog', 'changelog/**'],
				}),
			],
			sidebar: [
				{ label: 'Getting Started', items: [{ autogenerate: { directory: 'getting-started' } }] },
				{ label: 'Core Player', items: [{ autogenerate: { directory: 'player' } }] },
				{ label: 'Bar', collapsed: true, items: [{ autogenerate: { directory: 'extensions/bar' } }] },
				{ label: 'Playlist', collapsed: true, items: [{ autogenerate: { directory: 'extensions/playlist' } }] },
				{ label: 'Tracker', collapsed: true, items: [{ autogenerate: { directory: 'extensions/tracker' } }] },
				{ label: 'Generator', collapsed: true, items: [{ autogenerate: { directory: 'extensions/gen' } }] },
				{ label: 'Frameworks & Platforms', collapsed: true, items: [{ autogenerate: { directory: 'frameworks' } }] },
				{ label: 'Changelog', collapsed: true, items: [{ autogenerate: { directory: 'changelog' } }] },
			],
		}),
		sitemap(),
	],
});
