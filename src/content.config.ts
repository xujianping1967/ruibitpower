import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/* Astro 6 removed the legacy `type: 'content' | 'data'` collections, so every
   collection now declares a loader. Both products and projects are one JSON
   file per entry and already carry their own `slug` field, which the routes
   read from `entry.data.slug`; the loader name is therefore only used to find
   the files. Blog posts are markdown, and their entry id (filename without the
   extension) is the public slug. */

const seo = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
  })
  .optional();

const source = z.object({
  label: z.string(),
  url: z.string().url(),
  note: z.string().optional(),
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    category: z.string(),
    summary: z.string(),
    heroImage: z.string(),
    gallery: z.array(z.string()).default([]),
    metrics: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    specs: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    applications: z.array(z.string()).default([]),
    downloads: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
    publishDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    sources: z.array(source).default([]),
    featured: z.boolean().default(false),
    seo,
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    excerpt: z.string(),
    publishDate: z.coerce.date(),
    /* When the source record was actually last revised. Optional because a post
       that has never been edited has no honest value for it. */
    updatedDate: z.coerce.date().optional(),
    author: z.string().optional(),
    sources: z.array(source).default([]),
    featuredImage: z.string().optional(),
    relatedProducts: z.array(z.string()).default([]),
    seo,
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    country: z.string(),
    application: z.string(),
    capacity: z.string(),
    summary: z.string(),
    image: z.string(),
    imageCaption: z.string().optional(),
    /* Intrinsic pixel dimensions of `image`, used to reserve layout space and
       avoid a shift while the photo loads. Keep in sync with the real file. */
    imageWidth: z.number().optional(),
    imageHeight: z.number().optional(),
    /* How the card should fit the image into its 3:2 band. Generated product
       reframes and renders are white-backgrounded, so "contain" is invisible and
       never crops. Real field photographs use "cover" to fill the band. */
    imageFit: z.enum(['contain', 'cover']).optional(),
    productUsed: z.string().optional(),
    /* At-a-glance parameters. All optional: the six reference entries written
       before the Publii migration state a capacity and an architecture but no
       completion date or inverter model, and inventing those would be worse than
       omitting the row. The detail page only renders rows that carry a value. */
    systemType: z.string().optional(),
    inverterPcs: z.string().optional(),
    completed: z.string().optional(),
    publishDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    sourceUrl: z.string().url().optional(),
    sourceLabel: z.string().optional(),
    evidenceType: z.enum(['manufacturer-published-reference', 'client-authorized', 'public-record', 'internal-project-record']).optional(),
    challenge: z.string(),
    solution: z.string(),
    result: z.string(),
    seo,
  }),
});

export const collections = { products, blog, projects };
