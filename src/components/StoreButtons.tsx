'use client';

import { STORE_URLS } from '@/lib/constants';
import { Apple, Play, Gamepad2 } from 'lucide-react';
import Link from 'next/link';

const STORE_ITEMS = [
  { key: 'appStore' as const, icon: Apple, label: 'App Store' },
  { key: 'googlePlay' as const, icon: Play, label: 'Google Play' },
  { key: 'steam' as const, icon: Gamepad2, label: 'Steam' },
  { key: 'epicGames' as const, icon: Gamepad2, label: 'Epic Games' },
];

interface StoreButtonsProps {
  variant?: 'default' | 'compact';
  className?: string;
}

export function StoreButtons({ variant = 'default', className = '' }: StoreButtonsProps) {
  return (
    <div
      className={`flex items-center gap-3 ${variant === 'compact' ? 'gap-2' : ''} ${className}`}
    >
      {STORE_ITEMS.map(({ key, icon: Icon, label }) => (
        <Link
          key={key}
          href={STORE_URLS[key]}
          className={`
            flex items-center justify-center rounded-lg
            transition-all duration-300
            ${variant === 'default' ? 'w-12 h-12' : 'w-10 h-10'}
            bg-surface-elevated/50 border border-white/10
            text-text-muted hover:text-accent-glow hover:border-accent/30
            hover:shadow-glow
          `}
          aria-label={`${label} - Coming Soon`}
        >
          <Icon
            className={variant === 'default' ? 'w-6 h-6' : 'w-5 h-5'}
            strokeWidth={1.5}
          />
        </Link>
      ))}
    </div>
  );
}
