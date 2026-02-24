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
        {/* 캐릭터 주변 퍼플 글로우 (오른쪽 영역, 펄스 애니메이션) - 오버레이 위에 표시 */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{ willChange: 'transform' }}
        >
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[70%] h-[120%] min-w-[400px]"
            style={{
              background:
                'radial-gradient(ellipse at 85% 50%, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 40%, transparent 70%)',
              animation: 'hero-glow-pulse 3.5s ease-in-out infinite',
              willChange: 'transform, opacity',
            }}
          />
        </div>
        {/* 떠다니는 파티클 효과 (캐릭터 주변) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
          <div
            className="absolute right-[15%] top-[35%] w-2 h-2 rounded-full bg-accent/60 blur-[4px]"
            style={{
              animation: 'hero-particle-float-1 4s ease-in-out infinite',
              willChange: 'transform',
            }}
          />
          <div
            className="absolute right-[25%] top-[45%] w-1.5 h-1.5 rounded-full bg-accent/50 blur-[4px]"
            style={{
              animation: 'hero-particle-float-2 3.2s ease-in-out infinite 0.5s',
              willChange: 'transform',
            }}
          />
          <div
            className="absolute right-[20%] top-[55%] w-[6px] h-[6px] rounded-full bg-accent/70 blur-[4px]"
            style={{
              animation: 'hero-particle-float-3 3.8s ease-in-out infinite 1s',
              willChange: 'transform',
            }}
          />
          <div
            className="absolute right-[10%] top-[50%] w-[5px] h-[5px] rounded-full bg-accent/55 blur-[4px]"
            style={{
              animation: 'hero-particle-float-4 4.2s ease-in-out infinite 0.2s',
              willChange: 'transform',
            }}
          />
          <div
            className="absolute right-[18%] top-[40%] w-[3px] h-[3px] rounded-full bg-accent/65 blur-[4px]"
            style={{
              animation: 'hero-particle-float-5 3.5s ease-in-out infinite 1.5s',
              willChange: 'transform',
            }}
          />
        </div>
        {/* 하단 퍼플 라이트 반사 효과 */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(139, 92, 246, 0.25) 0%, rgba(139, 92, 246, 0.1) 30%, transparent 100%)',
            opacity: 0.3,
            animation: 'hero-bottom-glow-blink 2.5s ease-in-out infinite',
            willChange: 'opacity',
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
              textShadow: '0 0 40px rgba(139, 92, 246, 0.3)',
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

          {/* 스토어 배지 - 텍스트 아래, static position */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8"
          >
            <StoreButtons variant="default" />
          </motion.div>
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
