'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PreregForm } from './PreregForm';
import { getDisplayCount } from '@/lib/prereg-data';

interface HeroWithFormProps {
  selectedCharacters: string[];
  isRegistered: boolean;
  onSuccess: () => void;
}

export function HeroWithForm({
  selectedCharacters,
  isRegistered,
  onSuccess,
}: HeroWithFormProps) {
  const [count, setCount] = useState(0);
  const displayCount = getDisplayCount(count);

  useEffect(() => {
    fetch('/api/prereg/count', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => setCount(typeof data.count === 'number' ? data.count : 0))
      .catch(() => setCount(0));
  }, []);

  return (
    <section className="relative min-h-[100dvh] overflow-hidden bg-[#0A0A0A]">

      {/* 배경: 모바일 */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/images/prereg/hero-mobile.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_15%]"
          quality={85}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,0.05) 20%, rgba(10,10,10,0.6) 45%, rgba(10,10,10,0.92) 65%, #0A0A0A 85%)',
          }}
        />
      </div>

      {/* 배경: 데스크톱 */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src="/images/prereg/hero-desktop.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_center]"
          quality={90}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, #0A0A0A 0%, #0A0A0A 20%, rgba(10,10,10,0.92) 35%, rgba(10,10,10,0.5) 55%, rgba(10,10,10,0.1) 75%, rgba(10,10,10,0.25) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, transparent 15%, transparent 85%, rgba(10,10,10,0.5) 100%)',
          }}
        />
      </div>

      {/* 파티클 */}
      <div className="absolute inset-0 z-[5] pointer-events-none" aria-hidden>
        <div className="prereg-float-dot absolute w-1 h-1 rounded-full bg-[#FF6B35]/30" style={{ top: '22%', left: '32%' }} />
        <div className="prereg-float-dot absolute w-1.5 h-1.5 rounded-full bg-[#FF6B35]/20" style={{ top: '48%', left: '18%' }} />
        <div className="prereg-float-dot absolute w-1 h-1 rounded-full bg-[#FF6B35]/25" style={{ top: '35%', left: '52%' }} />
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 min-h-[100dvh] flex flex-col">

        {/* 로고 — 크게 */}
        <div className="shrink-0 pt-8 md:pt-10 px-6 md:px-14 lg:px-20">
          <Image
            src="/images/prereg/realmate_logo_W.png"
            alt="Realmate"
            width={320}
            height={70}
            className="h-10 sm:h-12 md:h-16 lg:h-[72px] w-auto"
            priority
          />
        </div>

        {/* 데스크톱 */}
        <div className="hidden md:flex flex-1 items-center px-14 lg:px-20 xl:px-28">
          <div className="w-full max-w-[480px]">
            <PreregForm
              selectedCharacters={selectedCharacters}
              displayCount={displayCount}
              onSuccess={onSuccess}
              isRegistered={isRegistered}
              variant="hero"
            />
          </div>
        </div>

        {/* 모바일 */}
        <div className="md:hidden flex flex-col flex-1">
          <div className="flex-1 min-h-[100px]" />
          <div className="px-5 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))]">
            <PreregForm
              selectedCharacters={selectedCharacters}
              displayCount={displayCount}
              onSuccess={onSuccess}
              isRegistered={isRegistered}
              variant="hero"
            />
          </div>
          <div className="text-center pb-3">
            <span className="prereg-scroll-bounce inline-block text-white/20 text-[11px] tracking-widest">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
