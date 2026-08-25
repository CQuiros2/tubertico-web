import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Del Llano',
  robots: { index: false, follow: true },
};

export default function DelLlanoRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
