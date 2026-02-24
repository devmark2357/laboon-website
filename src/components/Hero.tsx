'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { StoreButtons } from './StoreButtons';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-hero bg-grid-pattern">
      {/* TODO: 메인 키비주얼 이미지 또는 영상으로 교체 */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10" />
      <div className="absolute inset-0 bg-noise" />

      {/* 기하학적 라인 패턴 */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="lines"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 0 50 L 100 50"
                stroke="url(#lineGradient)"
                strokeWidth="0.5"
                fill="none"
              />
              <path
                d="M 50 0 L 50 100"
                stroke="url(#lineGradient)"
                strokeWidth="0.5"
                fill="none"
              />
            </pattern>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#C084FC" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#lines)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <p className="text-accent-light text-sm font-medium tracking-widest uppercase mb-4">
            {t('tagline')}
          </p>
          <h1
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-[0.15em] uppercase mb-6"
            style={{
              background: 'linear-gradient(135deg, #7C3AED 0%, #C084FC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-text font-medium mb-4">
            {t('subtitle')}
          </p>
          <p className="text-text-muted text-base md:text-lg max-w-2xl mb-12">
            {t('description')}
          </p>
        </motion.div>

        {/* 스토어 배지 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute bottom-24 right-4 md:right-8 lg:right-16"
        >
          <StoreButtons variant="default" />
        </motion.div>
      </div>

      {/* 스크롤 유도 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-1 text-text-muted"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
