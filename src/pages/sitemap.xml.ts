import { getCollection } from 'astro:content';
import site from '../data/site.json';

export async function GET() {
  const products = await getCollection('products');
  const posts = await getCollection('blog');
  const projects = await getCollection('projects');

  /* Static pages, products and projects have no recorded revision date, so they
     carry no lastmod at all. Stamping every build date on them claimed that all
     nineteen pages changed on every deploy, which is a false freshness signal:
     crawlers discount lastmod when it moves without the content moving.
     Blog posts do have real dates, so they keep theirs. */
  const staticPages: Array<{ path: string; priority: string }> = [
    { path: '', priority: '1.0' },
    { path: 'products/', priority: '0.9' },
    { path: 'solutions/', priority: '0.9' },
    { path: 'projects/', priority: '0.8' },
    { path: 'technology/', priority: '0.7' },
    { path: 'about/', priority: '0.7' },
    { path: 'resources/', priority: '0.6' },
    { path: 'blog/', priority: '0.6' },
    { path: 'contact/', priority: '0.8' },
    { path: 'privacy/', priority: '0.3' },
  ];

  type Entry = { path: string; lastmod: string | null; priority: string };

  /* Paginated blog pages exist as real files, so list them; otherwise the only
     route to page 7 would be a chain of "Next" links. Page one is already in
     staticPages, so this starts at two. Keep in step with PAGE_SIZE in
     src/pages/blog/[...page].astro. */
  const archivePages = (base: string, count: number, priority: string): Entry[] => {
    const pageSize = 12; // mirrors pageSize in each [...page].astro route
    const pages = Math.ceil(count / pageSize);
    return Array.from({ length: Math.max(0, pages - 1) }, (_, i) => ({
      path: `${base}${i + 2}/`,
      lastmod: null,
      priority,
    }));
  };
  const archiveEntries: Entry[] = [
    ...archivePages('blog/', posts.length, '0.4'),
    ...archivePages('products/', products.length, '0.5'),
    ...archivePages('projects/', projects.length, '0.5'),
  ];

  const entries: Entry[] = [
    ...archiveEntries,
    ...staticPages.map((page) => ({
      path: page.path,
      lastmod: null,
      priority: page.priority,
    })),
    ...products.map((entry) => ({
      path: `products/${entry.data.slug}/`,
      lastmod: null,
      priority: '0.8',
    })),
    ...projects.map((entry) => ({
      path: `projects/${entry.data.slug}/`,
      lastmod: null,
      priority: '0.6',
    })),
    ...posts.map((entry) => ({
      /* lastmod tells a crawler the page changed, so it has to be the real
         revision date, not the publication date. */
      path: `blog/${entry.id}/`,
      lastmod: (entry.data.updatedDate ?? entry.data.publishDate).toISOString().slice(0, 10),
      priority: '0.6',
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map((entry) => {
    const lastmod = entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : '';
    return `  <url><loc>${new URL(entry.path, site.domain).toString()}</loc>${lastmod}<priority>${entry.priority}</priority></url>`;
  })
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
