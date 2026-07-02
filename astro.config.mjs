import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
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
			// llms.txt lives on the marketing site; link agents there.
			head: [
				{
					tag: 'link',
					attrs: { rel: 'alternate', type: 'text/plain', href: 'https://waveformplayer.com/llms.txt' },
				},
				// Live <PlayerDemo> embeds — load the real runtime (CDN) and re-init
				// after Starlight view-transition navigations.
				{ tag: 'link', attrs: { rel: 'stylesheet', href: 'https://unpkg.com/@arraypress/waveform-player/dist/waveform-player.css' } },
				{ tag: 'script', attrs: { src: 'https://unpkg.com/@arraypress/waveform-player/dist/waveform-player.min.js', defer: true } },
				{ tag: 'script', content: "document.addEventListener('astro:page-load',function(){window.WaveformPlayer&&WaveformPlayer.init&&WaveformPlayer.init()});" },
				// og:image is per-section — see src/overrides/Head.astro. Site-wide JSON-LD:
				{ tag: 'script', attrs: { type: 'application/ld+json' }, content: JSON_LD },
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
