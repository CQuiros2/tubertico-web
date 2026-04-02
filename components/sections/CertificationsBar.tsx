import { useTranslations } from 'next-intl';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const certs = [
  {
    name: 'GlobalGAP V6.0 GFSI',
    logo: '/images/certs/logo-globalgap.png',
    description: 'Good Agricultural Practices',
  },
  {
    name: 'FSMA — FDA',
    logo: '/images/certs/logo-fsma.png',
    description: 'Food Safety Modernization Act',
  },
];

export function CertificationsBar() {
  const t = useTranslations('certifications');

  return (
    <section className="w-full bg-white border-y border-gray-100 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10">
          <p className="eyebrow">{t('title')}</p>
        </AnimatedSection>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16">
          {certs.map((cert, i) => (
            <AnimatedSection key={cert.name} delay={i * 0.1} direction="up">
              <div className="flex flex-col items-center gap-3 group">
                <div className="h-16 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cert.logo}
                    alt={cert.name}
                    className="h-14 w-auto object-contain"
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-800">{cert.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{cert.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
