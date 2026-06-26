import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    /** Short summary shown on the index card */
    description: z.string(),
    category: z.enum(['App', 'Business', 'Side Project', 'Content']),
    status: z.enum(['Live', 'In Progress', 'Planning', 'Paused']),
    stack: z.array(z.string()).optional(),
    /** Matches blog post tags for "Writing about this" auto-pull */
    tags: z.array(z.string()).optional(),
    url: z.string().optional(),
    githubUrl: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().optional(),
    /** Card cover image shown on the index page. Optional — falls back to text-only card. */
    coverImage: z.string().optional(),
    /** Screenshot URLs (CDN or absolute paths). First one is the hero. */
    screenshots: z.array(z.string()).optional(),
    /** Optional captions for each screenshot, matched by index. */
    screenshotCaptions: z.array(z.string()).optional(),
    /** Lower number = higher on index page */
    order: z.number().default(99),
  }),
});

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.optional(image()),
      /** Display category label shown on cards and the post header */
      category: z.string().optional(),
      /** Searchable tags for filtering, e.g. ["travel", "philippines", "budget"] */
      tags: z.array(z.string()).optional(),
      /** Approx reading time, e.g. "5 min read" — fill manually or generate with a remark plugin */
      readingTime: z.string().optional(),
      /** Set true to mark a post as a photo album; enables the gallery layout */
      isAlbum: z.boolean().optional(),
      /** For photo-album posts: list of image URLs or local paths */
      albumImages: z.array(z.string()).optional(),
      /** Set true to hide the post from listings and RSS; it still builds at its URL */
      draft: z.boolean().optional(),
      /** Optional subtitle shown below the title (used in series posts) */
      subtitle: z.string().optional(),
      /** Series name this post belongs to, e.g. "Building Tamelo" */
      series: z.string().optional(),
      /** Position within the series */
      seriesOrder: z.number().optional(),
    }),
});

export const collections = { blog, projects };
