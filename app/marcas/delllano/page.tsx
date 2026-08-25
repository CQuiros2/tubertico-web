'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DelLlanoRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const lang = (navigator.language || navigator.languages?.[0] || '').toLowerCase();
    const match = ['en', 'fr', 'nl'].find((l) => lang.startsWith(l));
    const locale = match ?? 'es';
    router.replace(`/${locale}/marcas/delllano`);
  }, [router]);

  return null;
}
