'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useTransition } from 'react';

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = () => {
    const newLocale = locale === 'ko' ? 'en' : 'ko';
    const newPath = pathname === '/' ? `/${newLocale}` : `/${newLocale}${pathname}`;
    startTransition(() => {
      router.replace(newPath);
    });
  };

  return (
    <button
      onClick={toggleLocale}
      disabled={isPending}
      className="flex items-center gap-1 text-sm font-medium text-text-muted hover:text-text transition-colors disabled:opacity-50"
      aria-label={locale === 'ko' ? 'Switch to English' : '한국어로 전환'}
    >
      <span
        className={
          locale === 'ko'
            ? 'text-accent font-semibold'
            : 'text-text-muted hover:text-text'
        }
      >
        KO
      </span>
      <span className="text-text-muted/50">|</span>
      <span
        className={
          locale === 'en'
            ? 'text-accent font-semibold'
            : 'text-text-muted hover:text-text'
        }
      >
        EN
      </span>
    </button>
  );
}
