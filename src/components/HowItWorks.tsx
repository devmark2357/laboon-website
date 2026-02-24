'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const STEPS = ['01', '02', '03', '04', '05', '06'] as const;

export function HowItWorks() {
  const t = useTranslations('howItWorks');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="features"
      ref={ref}
      className="py-20 md:py-28 bg-background"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {STEPS.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden border border-white/5 hover:border-accent/30 transition-all duration-300 hover:shadow-glow">
                {/* TODO: 앱 스크린샷으로 교체 */}
                <div className="aspect-video bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                  <span className="font-heading text-4xl font-bold text-accent/40">
                    {step}
                  </span>
                </div>
                <div className="p-6 bg-surface-elevated/50">
                  <span className="text-accent text-sm font-medium">
                    Step {step}
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-text mt-2 mb-2">
                    {t(`steps.${step}.title`)}
                  </h3>
                  <p className="text-text-muted text-sm">
                    {t(`steps.${step}.description`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
