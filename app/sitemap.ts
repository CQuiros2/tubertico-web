import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/siteConfig';

const routes = ['', '/productos', '/galeria', '/contacto'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of siteConfig.locales) {
    for (const route of routes) {
      entries.push({
        url: `${siteConfig.url}/${locale}${route}`,
        lastModified: new Date(),
        alternates: {
          languages: Object.fromEntries(
            siteConfig.locales.map((l) => [l, `${siteConfig.url}/${l}${route}`])
          ),
        },
      });
    }
  }

  return entries;
}
