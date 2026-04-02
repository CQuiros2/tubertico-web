'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { LangSwitcher } from '@/components/ui/LangSwitcher';
import { Button } from '@/components/ui/Button';

interface HeaderProps {
  locale: string;
}

export function Header({ locale }: HeaderProps) {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/productos`, label: t('products') },
    { href: `/${locale}/galeria`, label: t('gallery') },
    { href: `/${locale}/contacto`, label: t('contact') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-green/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between gap-8">
          {/* Logo */}
          <Link href={`/${locale}`} className="shrink-0">
            <img
              src="/images/logo-white.png"
              alt="Tubertico"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/90 hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <LangSwitcher locale={locale} />
            <Button href={`/${locale}/contacto`} variant="primary" size="sm">
              {t('cta')}
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-72 bg-brand-green z-50 flex flex-col p-6 shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex items-center justify-between mb-8">
                <img src="/images/logo-white.png" alt="Tubertico" className="h-8 w-auto" />
                <button
                  className="text-white p-1"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col gap-4 flex-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-white text-lg font-medium py-2 border-b border-white/10"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 flex flex-col gap-3">
                <LangSwitcher locale={locale} />
                <Button
                  href={`/${locale}/contacto`}
                  variant="primary"
                  className="w-full justify-center"
                >
                  {t('cta')}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
