import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

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
			// llms.txt lives on the marketing site; link agents there.
			head: [
				{
					tag: 'link',
					attrs: { rel: 'alternate', type: 'text/plain', href: 'https://waveformplayer.com/llms.txt' },
				},
			],
			sidebar: [
				{ label: 'Getting Started', items: [{ autogenerate: { directory: 'getting-started' } }] },
				{ label: 'Core Player', items: [{ autogenerate: { directory: 'player' } }] },
				{ label: 'WaveformBar', collapsed: true, items: [{ autogenerate: { directory: 'extensions/bar' } }] },
				{ label: 'WaveformPlaylist', collapsed: true, items: [{ autogenerate: { directory: 'extensions/playlist' } }] },
				{ label: 'WaveformTracker', collapsed: true, items: [{ autogenerate: { directory: 'extensions/tracker' } }] },
				{ label: 'WaveformGen', collapsed: true, items: [{ autogenerate: { directory: 'extensions/gen' } }] },
				{ label: 'Frameworks & Platforms', collapsed: true, items: [{ autogenerate: { directory: 'frameworks' } }] },
			],
		}),
	],
});
