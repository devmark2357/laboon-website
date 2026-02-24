'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Apple, Play, Gamepad2 } from 'lucide-react';

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

export function StoreButtons({
  variant = 'default',
  className = '',
}: StoreButtonsProps) {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  useEffect(() => {
    if (!activeTooltip) return;
    const timer = setTimeout(() => setActiveTooltip(null), 2000);
    return () => clearTimeout(timer);
  }, [activeTooltip]);

  const buttonClass = `
    flex items-center justify-center rounded-lg
    transition-all duration-300
    ${variant === 'default' ? 'w-12 h-12' : 'w-10 h-10'}
    bg-surface-elevated/50 border border-white/10
    text-text-muted hover:text-accent-glow hover:border-accent/30
    hover:shadow-glow
  `;

  return (
    <div
      className={`flex items-center gap-3 ${variant === 'compact' ? 'gap-2' : ''} ${className}`}
    >
      {STORE_ITEMS.map(({ key, icon: Icon, label }) => (
        <div key={key} className="relative">
          <button
            type="button"
            onClick={() => setActiveTooltip(key)}
            className={buttonClass}
            aria-label={`${label} - Coming Soon`}
          >
            <Icon
              className={variant === 'default' ? 'w-6 h-6' : 'w-5 h-5'}
              strokeWidth={1.5}
            />
          </button>
          <AnimatePresence>
            {activeTooltip === key && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50"
              >
                <div className="max-w-[200px] px-3 py-2 rounded-lg bg-surface-elevated border border-accent/30 shadow-glow text-accent text-sm font-medium whitespace-nowrap">
                  Coming Soon
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
