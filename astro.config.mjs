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
			components: {
				// Header "Copy page" dropdown (Markdown / Claude / ChatGPT), next to the theme toggle.
				SocialIcons: './src/overrides/SocialIcons.astro',
			},
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
				{ label: 'Bar', collapsed: true, items: [{ autogenerate: { directory: 'extensions/bar' } }] },
				{ label: 'Playlist', collapsed: true, items: [{ autogenerate: { directory: 'extensions/playlist' } }] },
				{ label: 'Tracker', collapsed: true, items: [{ autogenerate: { directory: 'extensions/tracker' } }] },
				{ label: 'Gen', collapsed: true, items: [{ autogenerate: { directory: 'extensions/gen' } }] },
				{ label: 'Frameworks & Platforms', collapsed: true, items: [{ autogenerate: { directory: 'frameworks' } }] },
			],
		}),
	],
});
