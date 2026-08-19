// Path segment of the News & Blog page per locale. This is the only route
// whose segment is translated; every other page shares the Spanish segment.
const newsPath: Record<string, string> = {
  es: '/noticias',
  en: '/news',
  fr: '/actualites',
  nl: '/nieuws',
}

// Any of the localized news segments maps back to the whole set, so the
// language switcher can jump between them from whichever one you are on.
const routeMap: Record<string, Record<string, string>> = Object.fromEntries(
  Object.values(newsPath).map((segment) => [segment, newsPath]),
)

export function getNewsPath(locale: string): string {
  return newsPath[locale] ?? newsPath.en
}

export function getLocalizedHref(
  pathname: string,
  currentLocale: string,
  targetLocale: string,
): string {
  const withoutLocale = pathname.slice(`/${currentLocale}`.length).replace(/\/$/, '') || '/'
  const mapped = routeMap[withoutLocale]?.[targetLocale]
  if (mapped) return `/${targetLocale}${mapped}`
  return pathname.replace(`/${currentLocale}`, `/${targetLocale}`) || `/${targetLocale}`
}
