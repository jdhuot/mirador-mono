// src/pages/rss-mirador-feed.xml.js
import rss from '@astrojs/rss';
import { sanityClient } from '../lib/sanity.js';

// --- helpers ---
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
    *[_type == "socialPost" && defined(publishedAt) && publishedAt <= now() && rss == true]
      | order(publishedAt desc)[0...30]{
        _id,
        title,
        "slug": slug.current,
        publishedAt,
        tags,
        rss,
        ctaLink,
        // Plain text for title/excerpt
        "plaintext": pt::text(text),
        // Hero image: prefer explicit image, else first inline image in text[]
        "imageUrl": coalesce(image.asset->url, text[_type=="image"][0].asset->url),
        "imageMime": coalesce(image.asset->mimeType, text[_type=="image"][0].asset->mimeType)
      }
  `);

  const site = ctx.site; // ensure astro.config.mjs has `site: 'https://yourdomain.com'`

  return rss({
    title: 'The Mirador Feed',
    description: 'Quick takes and observations from Mirador.',
    site,
    items: posts.map((p) => {
      const titleText = p.title || truncateAtWord(p.plaintext || '', 80) || 'Update';
      const excerpt    = truncateAtWord(p.plaintext || '', 240);

      const baseImg = p.imageUrl || '';
      const img  = imageForEmail(baseImg);
      const mime = p.imageMime || mimeFromUrlOrDefault(baseImg);

      // Prefer external CTA if provided; otherwise link to your feed page
      const path = p.ctaLink || '/mirador-feed'; // change to '/feed' if that’s your route
      const url  = new URL(path, site).toString();

      const descriptionHtml = `
        ${img ? `<p><img src="${img}" alt="${escapeHtml(titleText)}" /></p>` : ''}
        <p>${escapeHtml(excerpt)}</p>
        ${p.ctaLink ? `<p><a href="${p.ctaLink}" target="_blank" rel="noopener">Read more →</a></p>` : ''}
      `.trim();

      return {
        title: titleText,
        pubDate: new Date(p.publishedAt),
        link: url,
        description: descriptionHtml,
        customData: `
          ${img ? `<enclosure url="${img}" type="${mime}" />` : ''}
          <guid isPermaLink="false">${p._id}</guid>
        `,
      };
    }),
  });
}
