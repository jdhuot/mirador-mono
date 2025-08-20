// src/pages/rss-real-advice.xml.js
import rss from '@astrojs/rss';
import { sanityClient } from '../lib/sanity.js';

// ---- helpers ----
function blocksToPlainText(blocks = []) {
  return blocks
    .filter((b) => b && b._type === 'block')
    .map((b) => (b.children || []).map((c) => c.text || '').join(''))
    .join('\n\n');
}

function truncateAtWord(str = '', max = 240) {
  const s = str.replace(/\s+/g, ' ').trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const i = cut.lastIndexOf(' ');
  return ((i > 0 ? cut.slice(0, i) : cut).trim()) + '…';
}

function escapeHtml(s = '') {
  return s.replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
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

// ---- endpoint ----
export async function GET(ctx) {
  const posts = await sanityClient.fetch(`
    *[
      _type == "blog" &&
      category->title == "Real Advice Blog" &&
      defined(slug.current) &&
      publishedAt <= now()
    ] | order(publishedAt desc)[0...10]{
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      body,
      featuredImage{ asset->{ url, mimeType } }
    }
  `);

  const site = ctx.site; // make sure "site" is set in astro.config.mjs

  
  return rss({
    title: 'Mirador — Real Advice Blog',
    description: 'Latest posts from the Real Advice Blog.',
    site,
    items: posts.map((p) => {
      const path = `/blog/${p.slug}/`;
      const url  = new URL(path, site).toString();
      const link = `/blog/${p.slug}/`;

      const excerptText = (p.excerpt?.length
        ? blocksToPlainText(p.excerpt)
        : blocksToPlainText(p.body)) || '';

      const excerpt = truncateAtWord(excerptText, 240);

      const baseImg = p.featuredImage?.asset?.url || '';
      const img = imageForEmail(baseImg);
      const mime = p.featuredImage?.asset?.mimeType || mimeFromUrlOrDefault(baseImg);

      const descriptionHtml = `
        ${img ? `<p><img src="${img}" alt="${escapeHtml(p.title)}" /></p>` : ''}
        <p>${escapeHtml(excerpt)}</p>
        <p><a href="${url}">Read the full article →</a></p>
      `.trim();

      return {
        title: p.title,
        pubDate: new Date(p.publishedAt),
        link,
        description: descriptionHtml,
        // Helps some readers; MailerLite will use the inline <img> in description.
        customData: `
          ${img ? `<enclosure url="${img}" type="${mime}" />` : ''}
          <guid isPermaLink="true">${url}</guid>
        `

      };
    }),
  });
}
