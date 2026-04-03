export const siteConfig = {
  name: 'Tubertico',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tubertico.com',
  defaultLocale: 'es',
  locales: ['es', 'en'] as const,

  contact: {
    contactName: 'Pablo Quirós',
    email: 'pablo.quiros@tubertico.com',
    emailOffice: 'oficina@tubertico.com',
    phone: '(+506) 8948-4292',
    address: 'Roxana, Pococí, Limón, Costa Rica',
    addressDetail: '248, Provincia de Limón, Roxana, 70204',
    mapsQuery: 'Tuberculos+Ticos+SRL+Roxana+Pococi',
  },

  social: {
    linkedin: 'https://cr.linkedin.com/company/tubertico',
    instagram: 'https://www.instagram.com/tubertico.cr',
    facebook: 'https://www.facebook.com/profile.php?id=61575158159946',
    whatsapp: 'https://wa.me/50689484292',
  },

  stats: {
    years: 20,
    products: 17,
  },

  certifications: ['GlobalGAP V6.0 GFSI', 'FSMA (FDA)'],
} as const;

export type SiteConfig = typeof siteConfig;
