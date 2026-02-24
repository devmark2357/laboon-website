'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ROADMAP_ITEMS = ['q1', 'q2', 'q3', 'q4'] as const;

export function Roadmap() {
  const t = useTranslations('roadmap');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="roadmap"
      ref={ref}
      className="py-20 md:py-28 bg-surface"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-heading text-3xl md:text-4xl font-bold text-center mb-16 md:mb-20"
        >
          {t('title')}
        </motion.h2>

        <div className="relative">
          {/* 타임라인 라인 - 데스크톱 */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/20 via-accent/50 to-accent/20 -translate-y-1/2" />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-4">
            {ROADMAP_ITEMS.map((key, index) => {
              const hasNow = key === 'q1';
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  className="relative flex-1 md:max-w-[240px]"
                >
                  <div
                    className={`relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-glow ${
                      hasNow
                        ? 'border-accent/50 bg-accent/5 shadow-glow'
                        : 'border-white/10 bg-surface-elevated/50 hover:border-accent/30'
                    }`}
                  >
                    {hasNow && (
                      <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-accent text-white text-xs font-bold shadow-glow">
                        {t('items.q1.now')}
                      </span>
                    )}
                    <p className="text-accent text-sm font-semibold mb-1">
                      {t(`items.${key}.period`)}
                    </p>
                    <h3 className="font-heading text-lg font-semibold text-text mb-2">
                      {t(`items.${key}.label`)}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {t(`items.${key}.description`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
