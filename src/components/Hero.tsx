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
        {/* 코럴-오렌지 글로우 오브 1 - 메인 (크고 강하게) */}
        <div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full pointer-events-none z-10"
          style={{
            background:
              'radial-gradient(circle, rgba(255,107,53,0.4) 0%, transparent 70%)',
            animation: 'pulseGlow 3s ease-in-out infinite',
          }}
        />
        {/* 코럴-오렌지 글로우 오브 2 - 라이트 (엇갈린 타이밍) */}
        <div
          className="absolute top-[35%] right-[20%] w-[400px] h-[400px] rounded-full pointer-events-none z-10"
          style={{
            background:
              'radial-gradient(circle, rgba(255,140,90,0.3) 0%, transparent 70%)',
            animation: 'pulseGlow2 4s ease-in-out infinite 0.5s',
          }}
        />
        {/* 떠다니는 빛 점 5개 - 크고 밝게 */}
        <div
          className="absolute top-[28%] right-[38%] w-[8px] h-[8px] bg-orange-400 rounded-full pointer-events-none z-10"
          style={{
            filter: 'blur(6px)',
            animation: 'floatOne 4s ease-in-out infinite',
          }}
        />
        <div
          className="absolute top-[48%] right-[22%] w-[14px] h-[14px] bg-orange-300 rounded-full pointer-events-none z-10"
          style={{
            filter: 'blur(10px)',
            animation: 'floatTwo 5s ease-in-out infinite 0.3s',
          }}
        />
        <div
          className="absolute top-[38%] right-[48%] w-[10px] h-[10px] bg-orange-400 rounded-full pointer-events-none z-10"
          style={{
            filter: 'blur(8px)',
            animation: 'floatThree 3.5s ease-in-out infinite 0.6s',
          }}
        />
        <div
          className="absolute top-[55%] right-[35%] w-[6px] h-[6px] bg-orange-300 rounded-full pointer-events-none z-10"
          style={{
            filter: 'blur(6px)',
            animation: 'floatFour 4.5s ease-in-out infinite 0.2s',
          }}
        />
        <div
          className="absolute top-[32%] right-[28%] w-[12px] h-[12px] bg-orange-300 rounded-full pointer-events-none z-10"
          style={{
            filter: 'blur(8px)',
            animation: 'floatFive 3.8s ease-in-out infinite 0.8s',
          }}
        />
        {/* 캐릭터 림 라이트 효과 */}
        <div
          className="absolute top-[20%] right-[42%] w-[2px] h-[60%] pointer-events-none z-10"
          style={{
            background:
              'linear-gradient(to bottom, transparent, rgb(255, 107, 53), transparent)',
            animation: 'rimLightPulse 2s ease-in-out infinite',
          }}
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
        {/* 하단 바닥 반사 라이트 */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[20%] min-h-[120px] pointer-events-none z-10"
          style={{
            background:
              'linear-gradient(to top, rgba(255,107,53,0.25), transparent)',
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
            className="font-sans font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-[0.15em] uppercase mb-6 break-words"
            style={{
              background: 'linear-gradient(135deg, #FF6B35 0%, #FF4500 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow:
                '0 0 60px rgba(255,107,53,0.5), 0 0 120px rgba(255,107,53,0.2), 0 0 200px rgba(255,107,53,0.1)',
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
          className="flex flex-col items-center gap-1 text-accent"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
