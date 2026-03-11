'use client';

import { useTranslations } from 'next-intl';
import { StoreButtons } from './StoreButtons';
import { LEGAL_URLS, SOCIAL_URLS } from '@/lib/constants';
import { Twitter, Instagram } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="py-12 md:py-16 bg-surface border-t border-[rgba(255,107,53,0.3)]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-heading font-bold text-lg tracking-[0.2em] text-text">
              {t('logo')}
            </span>
          </div>

          <StoreButtons variant="compact" />

          <div className="flex items-center gap-4">
            <a
              href={SOCIAL_URLS.x}
              className="p-2 rounded-lg text-[#999] hover:text-accent transition-colors"
              aria-label="X (Twitter)"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href={SOCIAL_URLS.instagram}
              className="p-2 rounded-lg text-[#999] hover:text-accent transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={SOCIAL_URLS.discord}
              className="px-3 py-1.5 rounded-lg text-[#999] hover:text-accent transition-colors text-sm font-medium"
              aria-label="Discord"
            >
              Discord
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col items-center gap-3 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
            <a
              href={LEGAL_URLS.terms}
              className="text-[#999] hover:text-accent transition-colors"
            >
              {t('terms')}
            </a>
            <span className="text-[#999]/50">|</span>
            <a
              href={LEGAL_URLS.privacy}
              className="text-[#999] hover:text-accent transition-colors"
            >
              {t('privacy')}
            </a>
            <span className="text-[#999]/50">|</span>
            <a
              href={LEGAL_URLS.refund}
              className="text-[#999] hover:text-accent transition-colors"
            >
              {t('refund')}
            </a>
          </div>
          <p className="text-[#999] text-sm">{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
