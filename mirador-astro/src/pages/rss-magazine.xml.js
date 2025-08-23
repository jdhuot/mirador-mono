// src/pages/rss-magazine.xml.js
import rss from '@astrojs/rss';
import { sanityClient } from '../lib/sanity.js';

function escapeHtml(s = '') {
  return s.replace(/[&<>"']/g, (ch) =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])
  );
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
  const issues = await sanityClient.fetch(`
    *[_type == "magazinePage"].issues[]
      [defined(publishedAt) && publishedAt <= now() && rss == true]
      | order(publishedAt desc)[0...10]{
        title,
        "slug": slug.current,
        publishedAt,
        rss,
        image{ asset->{ url, mimeType } }
      }
  `);

  const site = ctx.site; // ensure astro.config.mjs has site set

  return rss({
    title: 'Mirador — Magazine',
    description: 'Latest issues of the Interactive Magazine.',
    site,
    items: issues.map((i) => {
      // Prefer explicit issue URL; else link to your magazine page with a query param
      const path = `/magazine?issue=${i.slug}`;
      const absoluteUrl = new URL(path, site).toString();

      const baseImg = i.image?.asset?.url || '';
      const img  = imageForEmail(baseImg);
      const mime = i.image?.asset?.mimeType || mimeFromUrlOrDefault(baseImg);

      const descriptionHtml = `
        ${img ? `<p><img src="${img}" alt="${escapeHtml(i.title)}" /></p>` : ''}
        <p>${escapeHtml(i.title)}</p>
      `.trim();

      return {
        title: i.title,
        pubDate: new Date(i.publishedAt),
        link: absoluteUrl,
        description: descriptionHtml,
        customData: `
          ${img ? `<enclosure url="${img}" type="${mime}" />` : ''}
          <guid isPermaLink="true">${absoluteUrl}</guid>
        `,
      };
    }),
  });
}
