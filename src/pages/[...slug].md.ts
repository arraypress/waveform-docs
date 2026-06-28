import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

/**
 * Serves a raw-Markdown version of every docs page at `<page>.md` — so a reader
 * (or their AI agent) can grab clean text instead of scraping the HTML.
 * e.g. /player/options/  →  /player/options.md
 */
export async function getStaticPaths() {
	const docs = await getCollection('docs');
	return docs.map((entry) => {
		// Drop a trailing "/index" so the .md path mirrors the page URL.
		const slug = entry.id.replace(/\/?index$/, '') || 'index';
		return { params: { slug }, props: { entry } };
	});
}

export const GET: APIRoute = ({ props }) => {
	const { entry } = props as { entry: { data: { title?: string; description?: string }; body?: string } };
	const title = entry.data?.title ?? '';
	const desc = entry.data?.description ?? '';
	// Raw markdown body with the MDX component imports stripped for readability.
	const body = String(entry.body ?? '')
		.replace(/^\s*import .*$/gm, '')
		.replace(/\n{3,}/g, '\n\n')
		.trim();
	const md = `# ${title}\n\n${desc ? `> ${desc}\n\n` : ''}${body}\n`;
	return new Response(md, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
			'X-Robots-Tag': 'noindex',
		},
	});
};
