// src/pages/rss-portfolio-updates.xml.js
import rss from '@astrojs/rss';
import { sanityClient } from '../lib/sanity.js';

// --- tiny helpers (same style as your other feed) ---
function truncateAtWord(str = '', max = 240) {
  const s = str.replace(/\s+/g, ' ').trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const i = cut.lastIndexOf(' ');
  return ((i > 0 ? cut.slice(0, i) : cut).trim()) + '…';
}
function escapeHtml(s = '') {
  return s.replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[ch]);
}
function imageForEmail(url) {
  return url ? `${url}?w=1200&h=628&fit=fill&auto=format` : '';
}
function mimeFromUrlOrDefault(url, fallback = 'image/jpeg') {
  const ext = (url || '').split('?')[0].split('.').pop()?.toLowerCase();
  if (ext === 'png') return 'image/png';
  if (ext === 'webp') return 'image/webp';
  if (ext === 'gif') return 'image/gif';
  return fallback;
}

export async function GET(ctx) {
  const posts = await sanityClient.fetch(`
    *[
      _type == "blog" &&
      category->title == "Portfolio Updates" &&
      defined(slug.current) &&
      publishedAt <= now()
    ] | order(publishedAt desc)[0...10]{
      title,
      "slug": slug.current,
      publishedAt,
      // Plain text only; ignores inline images in body.
      "excerptPlain": coalesce(pt::text(excerpt), pt::text(body)),
      featuredImage{ asset->{ url, mimeType } }
    }
  `);

  const site = ctx.site; // ensure astro.config.mjs has site: 'https://yourdomain.com'

  return rss({
    title: 'Mirador — Portfolio Updates',
    description: 'Latest Portfolio Update reports.',
    site,
    items: posts.map((p) => {
      const path = `/blog/${p.slug}/`;
      const url  = new URL(path, site).toString();

      const excerpt = truncateAtWord(p.excerptPlain || '', 240);

      const baseImg = p.featuredImage?.asset?.url || '';
      const img  = imageForEmail(baseImg);
      const mime = p.featuredImage?.asset?.mimeType || mimeFromUrlOrDefault(baseImg);

      const descriptionHtml = `
        ${img ? `<p><img src="${img}" alt="${escapeHtml(p.title)}" /></p>` : ''}
        <p>${escapeHtml(excerpt)}</p>
      `.trim();

      return {
        title: p.title,
        pubDate: new Date(p.publishedAt),
        link: url, // absolute
        description: descriptionHtml,
        customData: `
          ${img ? `<enclosure url="${img}" type="${mime}" />` : ''}
          <guid isPermaLink="true">${url}</guid>
        `,
      };
    }),
  });
}
