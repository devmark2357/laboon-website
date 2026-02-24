'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageCircle, Heart, Gem } from 'lucide-react';

const CARD_ICONS = {
  ai24: MessageCircle,
  relationship: Heart,
  economy: Gem,
} as const;

export function About() {
  const t = useTranslations('about');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const cards = [
    { key: 'ai24' as const },
    { key: 'relationship' as const },
    { key: 'economy' as const },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 md:py-28 bg-surface"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-heading text-3xl md:text-4xl font-bold text-center mb-6"
        >
          {t('title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-text-muted text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          {t('intro')}
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {cards.map(({ key }, index) => {
            const Icon = CARD_ICONS[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group p-6 md:p-8 rounded-2xl bg-surface-elevated border border-white/5 hover:border-accent/30 transition-all duration-300 hover:shadow-glow"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-text mb-3">
                  {t(`cards.${key}.title`)}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {t(`cards.${key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
