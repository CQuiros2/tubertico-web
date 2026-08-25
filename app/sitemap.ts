import type { MetadataRoute } from 'next';
import { localeUrl } from '@/lib/alternates';
import { siteConfig } from '@/lib/siteConfig';

// '/news' resolves to the locale-specific segment (/noticias, /news, /actualites).
const routes = ['', '/productos', '/galeria', '/news', '/contacto', '/privacidad', '/marcas/delllano'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of siteConfig.locales) {
    for (const route of routes) {
      entries.push({
        url: localeUrl(locale, route),
        lastModified: new Date(),
        alternates: {
          languages: Object.fromEntries(
            siteConfig.locales.map((l) => [l, localeUrl(l, route)])
          ),
        },
      });
    }
  }

  return entries;
}
