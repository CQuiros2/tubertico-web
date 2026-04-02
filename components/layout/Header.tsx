'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { LangSwitcher } from '@/components/ui/LangSwitcher';

interface HeaderProps {
  locale: string;
}

export function Header({ locale }: HeaderProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Only home page gets the transparent-to-solid transition.
  // All inner pages start solid immediately.
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    // Trigger once on mount so inner pages that start mid-page are correct
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const solid = !isHome || scrolled;

  const navLinks = [
    { href: `/${locale}`,           label: t('home')     },
    { href: `/${locale}/productos`, label: t('products') },
    { href: `/${locale}/galeria`,   label: t('gallery')  },
    { href: `/${locale}/contacto`,  label: t('contact')  },
  ];

  const isActive = (href: string) =>
    href === `/${locale}` ? pathname === href || pathname === `/${locale}/` : pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid
          ? 'bg-brand-green-dark/96 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.06),0_4px_24px_rgba(0,0,0,0.18)]'
          : 'bg-gradient-to-b from-black/40 to-transparent'
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
              className="inline-flex items-center rounded-full bg-brand-orange hover:bg-brand-orange-light text-white text-sm font-semibold px-5 py-[9px] transition-colors duration-150 shadow-sm"
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

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/55 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[272px] bg-brand-green-dark z-50 flex flex-col shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 240 }}
            >
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

              <div className="px-5 pb-8 flex flex-col gap-3 border-t border-white/8 pt-5">
                <LangSwitcher locale={locale} />
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
    </header>
  );
}
