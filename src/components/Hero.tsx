'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { StoreButtons } from './StoreButtons';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* 데스크톱: 왼쪽 어둡게(텍스트 가독성), 오른쪽 투명(캐릭터 노출) */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              'linear-gradient(to right, rgba(10, 10, 15, 0.95) 0%, rgba(10, 10, 15, 0.7) 40%, rgba(10, 10, 15, 0.3) 70%, transparent 100%)',
          }}
        />
        {/* 모바일: 전체적으로 더 어두운 오버레이 (텍스트 가독성) */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10, 10, 15, 0.85) 0%, rgba(10, 10, 15, 0.75) 50%, rgba(10, 10, 15, 0.9) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl lg:max-w-[50%] text-left"
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

        {/* 스토어 배지 - 왼쪽 하단 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute bottom-24 left-4 md:left-6 lg:left-8"
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
