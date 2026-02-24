'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export function CTA() {
  const t = useTranslations('cta');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 폼 submit 기능 나중에 연결
  };

  return (
    <section
      id="cta"
      ref={ref}
      className="py-20 md:py-28 bg-background"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text mb-12">
            {t('title')}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('emailPlaceholder')}
              className="flex-1 px-5 py-4 rounded-xl bg-surface-elevated border border-white/10 text-text placeholder:text-text-muted/60 focus:outline-none focus:border-accent/50 transition-colors"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-xl bg-gradient-accent text-white font-semibold hover:opacity-90 transition-opacity shadow-glow whitespace-nowrap"
            >
              {t('button')}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
