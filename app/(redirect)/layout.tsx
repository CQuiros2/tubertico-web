import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tubertico',
  robots: { index: false, follow: true },
};

// Root layout for "/" only — a bare shell for the client-side language
// redirect. The localized site has its own root layout under [locale],
// which is what lets each locale emit its own <html lang>.
export default function RedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
