'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { LangSwitcher } from '@/components/ui/LangSwitcher';
import { getLocalizedHref } from '@/lib/localeRoutes';

interface HeaderProps {
  locale: string;
}

export function Header({ locale }: HeaderProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  // Scroll listener — runs once, passive
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll lock while drawer is open.
  // Both body and documentElement are set for iOS Safari compatibility.
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [mobileOpen]);

  // Close drawer on any route change (handles back button, programmatic nav, etc.)
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Force solid background when drawer is open so the bar never
  // appears transparent while the panel is sliding out from it.
  const solid = !isHome || scrolled || mobileOpen;

  const navLinks = [
    { href: `/${locale}`,           label: t('home')     },
    { href: `/${locale}/productos`, label: t('products') },
    { href: `/${locale}/galeria`,   label: t('gallery')  },
    { href: `/${locale}/${locale === 'es' ? 'noticias' : 'news'}`, label: t('news') },
    { href: `/${locale}/contacto`,  label: t('contact')  },
  ];

  const isActive = (href: string) =>
    href === `/${locale}`
      ? pathname === href || pathname === `/${locale}/`
      : pathname.startsWith(href);

  return (
    <>
      {/* ── Header bar ─────────────────────────────────────────────────────
          z-40 keeps it above page content. The backdrop (z-[55]) and
          drawer (z-[60]) are siblings rendered below — not inside this
          element — to avoid fixed-in-fixed stacking context issues on iOS. */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          solid
            ? 'bg-brand-green-dark backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.06),0_4px_24px_rgba(0,0,0,0.18)]'
            : 'bg-gradient-to-b from-black/65 to-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 md:h-[72px] items-center justify-between gap-8">

            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="shrink-0 hover:opacity-90 transition-opacity"
            >
              <img src="/images/logo-white.png" alt="Tubertico" className="h-8 w-auto" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                    isActive(link.href)
                      ? 'text-white'
                      : 'text-white/65 hover:text-white hover:bg-white/8'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-brand-orange rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right: lang switcher + CTA */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <LangSwitcher locale={locale} />
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex items-center rounded-full bg-brand-orange hover:bg-brand-orange-light text-white text-sm font-semibold px-5 py-[9px] transition-all duration-150 shadow-[0_2px_8px_rgba(199,92,25,0.30)] hover:shadow-[0_3px_12px_rgba(199,92,25,0.40)] hover:-translate-y-px"
              >
                {t('cta')}
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex items-center justify-center w-10 h-10 text-white rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={21} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ──────────────────────────────────────────────────
          Rendered as a sibling of <header>, not inside it.
          Stacking order: header (z-40) < backdrop (z-[55]) < drawer (z-[60]).
          This avoids fixed-in-fixed stacking context bugs on iOS Safari. */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop — tapping closes the drawer */}
            <motion.div
              className="fixed inset-0 z-[55] bg-black/55 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[272px] bg-brand-green-dark z-[60] flex flex-col shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 240 }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-5 border-b border-white/8">
                <img src="/images/logo-white.png" alt="Tubertico" className="h-7 w-auto" />
                <button
                  className="flex items-center justify-center w-9 h-9 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={19} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col flex-1 px-3 pt-3 pb-4 gap-0.5 overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] font-medium transition-colors ${
                      isActive(link.href)
                        ? 'bg-white/12 text-white'
                        : 'text-white/65 hover:bg-white/8 hover:text-white'
                    }`}
                  >
                    {isActive(link.href) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0" />
                    )}
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Drawer footer — pb-10 gives clearance for iPhone home indicator */}
              <div className="px-5 pb-10 flex flex-col gap-3 border-t border-white/8 pt-5">

                {/* Mobile language switcher — full-width segmented control.
                    The desktop header uses LangSwitcher (compact pill).
                    Here we need a wider, taller touch target that fills
                    the drawer width and reads as a deliberate mobile control. */}
                <div className="flex w-full rounded-xl overflow-hidden border border-white/20 bg-white/8">
                  {(['es', 'en'] as const).map((lang) => (
                    <Link
                      key={lang}
                      href={getLocalizedHref(pathname, locale, lang)}
                      onClick={() => setMobileOpen(false)}
                      className={`flex-1 py-3 text-center text-sm font-semibold uppercase tracking-widest transition-colors duration-200 ${
                        locale === lang
                          ? 'bg-white text-brand-green'
                          : 'text-white/50 hover:text-white/80'
                      }`}
                    >
                      {lang}
                    </Link>
                  ))}
                </div>

                <Link
                  href={`/${locale}/contacto`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center rounded-full bg-brand-orange hover:bg-brand-orange-light text-white text-sm font-semibold py-3 transition-colors"
                >
                  {t('cta')}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
