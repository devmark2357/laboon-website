'use client';

import { useTranslations } from 'next-intl';
import { StoreButtons } from './StoreButtons';
import { LEGAL_URLS, SOCIAL_URLS } from '@/lib/constants';
import { Twitter, Instagram } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="py-12 md:py-16 bg-surface border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-heading font-bold text-lg tracking-[0.2em] text-text">
              {t('logo')}
            </span>
            <p className="text-text-muted text-sm">{t('copyright')}</p>
          </div>

          <StoreButtons variant="compact" />

          <div className="flex items-center gap-4">
            <a
              href={SOCIAL_URLS.x}
              className="p-2 rounded-lg text-text-muted hover:text-accent transition-colors"
              aria-label="X (Twitter)"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href={SOCIAL_URLS.instagram}
              className="p-2 rounded-lg text-text-muted hover:text-accent transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={SOCIAL_URLS.discord}
              className="px-3 py-1.5 rounded-lg text-text-muted hover:text-accent transition-colors text-sm font-medium"
              aria-label="Discord"
            >
              Discord
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 flex justify-center gap-6">
          <a
            href={LEGAL_URLS.privacy}
            className="text-text-muted text-sm hover:text-text transition-colors"
          >
            {t('privacy')}
          </a>
          <span className="text-text-muted/50">|</span>
          <a
            href={LEGAL_URLS.terms}
            className="text-text-muted text-sm hover:text-text transition-colors"
          >
            {t('terms')}
          </a>
        </div>
      </div>
    </footer>
  );
}
