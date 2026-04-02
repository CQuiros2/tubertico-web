import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

function LinkedinIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

const socialLinks = [
  { href: siteConfig.social.linkedin,  Icon: LinkedinIcon,  label: 'LinkedIn'  },
  { href: siteConfig.social.instagram, Icon: InstagramIcon, label: 'Instagram' },
  { href: siteConfig.social.whatsapp,  Icon: WhatsAppIcon,  label: 'WhatsApp'  },
  { href: siteConfig.social.facebook,  Icon: FacebookIcon,  label: 'Facebook'  },
];

const certifications = [
  { name: 'GlobalGAP V6.0 GFSI', logo: '/images/certs/logo-globalgap.png' },
  { name: 'FSMA (FDA)',           logo: '/images/certs/logo-fsma.png'      },
];

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations();

  const navLinks = [
    { href: `/${locale}`,           label: t('nav.home')     },
    { href: `/${locale}/productos`, label: t('nav.products') },
    { href: `/${locale}/galeria`,   label: t('nav.gallery')  },
    { href: `/${locale}/contacto`,  label: t('nav.contact')  },
  ];

  return (
    <footer className="bg-brand-green-dark text-white">

      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <img src="/images/logo-white.png" alt="Tubertico" className="h-9 w-auto mb-3" />
            <p className="text-white/55 text-sm leading-relaxed mb-5 max-w-[220px]">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-1">
              {socialLinks.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-4">
              {t('footer.nav_title')}
            </p>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/65 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-4">
              {t('footer.contact_title')}
            </p>
            <ul className="flex flex-col gap-3.5">
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-start gap-2.5 text-white/65 hover:text-white transition-colors group"
                >
                  <Mail size={14} className="mt-0.5 shrink-0 text-brand-orange/80 group-hover:text-brand-orange transition-colors" />
                  <span className="text-sm">{siteConfig.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex items-start gap-2.5 text-white/65 hover:text-white transition-colors group"
                >
                  <Phone size={14} className="mt-0.5 shrink-0 text-brand-orange/80 group-hover:text-brand-orange transition-colors" />
                  <span className="text-sm">{siteConfig.contact.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-white/65">
                <MapPin size={14} className="mt-0.5 shrink-0 text-brand-orange/80" />
                <div>
                  <p className="text-sm">{siteConfig.contact.address}</p>
                  <p className="text-xs text-white/40 mt-0.5">{siteConfig.contact.addressDetail}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4 — Certifications */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40 mb-4">
              {t('footer.certs_title')}
            </p>
            <div className="flex flex-col gap-3">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="flex items-center gap-3 bg-white/5 rounded-xl p-3 border border-white/5"
                >
                  <div className="bg-white rounded-lg p-1.5 shrink-0">
                    <img
                      src={cert.logo}
                      alt={cert.name}
                      className="h-7 w-auto object-contain"
                    />
                  </div>
                  <span className="text-xs text-white/60 leading-tight">{cert.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-xs text-white/35">{t('footer.rights')}</span>
          <Link
            href={`/${locale}/privacidad`}
            className="text-xs text-white/35 hover:text-white/70 transition-colors"
          >
            {t('footer.legal')}
          </Link>
        </div>
      </div>

    </footer>
  );
}
