import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { siteConfig } from '../site.config';

export async function GET(context) {
	const posts = await getCollection('blog', ({ data }) => !data.draft);
	return rss({
		title: siteConfig.author.shortName,
		description: siteConfig.description,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
      		pubDate: post.data.pubDate,
			link: `/blog/${post.id}/`,
		})),
	});
}
