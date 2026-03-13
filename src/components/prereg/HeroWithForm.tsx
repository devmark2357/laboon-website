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
      {/* ===== 배경 이미지 ===== */}
      {/* 모바일 */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/images/prereg/hero-mobile.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_20%]"
        />
        {/* 모바일 그라데이션: 캐릭터 얼굴 보이고 하단은 짙게 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,0.1) 25%, rgba(10,10,10,0.7) 50%, rgba(10,10,10,0.95) 70%, #0A0A0A 100%)',
          }}
        />
      </div>

      {/* 데스크톱 */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src="/images/prereg/hero-desktop.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
        {/* 데스크톱 그라데이션: 좌측을 강하게 가려서 이미지 속 로고를 숨김 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, #0A0A0A 0%, #0A0A0A 25%, rgba(10,10,10,0.85) 40%, rgba(10,10,10,0.4) 60%, rgba(10,10,10,0.15) 80%, rgba(10,10,10,0.3) 100%)',
          }}
        />
        {/* 상하 비네팅 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, transparent 20%, transparent 80%, rgba(10,10,10,0.6) 100%)',
          }}
        />
      </div>

      {/* ===== 떠다니는 파티클 ===== */}
      <div className="absolute inset-0 z-[5] pointer-events-none" aria-hidden>
        <div
          className="prereg-float-dot absolute w-1 h-1 rounded-full bg-[#FF6B35]/40"
          style={{ top: '25%', left: '35%' }}
        />
        <div
          className="prereg-float-dot absolute w-1.5 h-1.5 rounded-full bg-[#FF6B35]/25"
          style={{ top: '45%', left: '20%' }}
        />
        <div
          className="prereg-float-dot absolute w-1 h-1 rounded-full bg-[#FF6B35]/35"
          style={{ top: '55%', left: '50%' }}
        />
      </div>

      {/* ===== 콘텐츠 ===== */}
      <div className="relative z-10 min-h-[100dvh] flex flex-col">

        {/* ── 데스크톱 레이아웃 ── */}
        <div className="hidden md:flex flex-1 items-center pl-12 lg:pl-20 xl:pl-28 pr-8">
          <div className="w-full max-w-[420px]">
            {/* 로고 이미지 */}
            <div className="mb-6">
              <Image
                src="/images/prereg/realmate_logo_W.png"
                alt="Realmate"
                width={240}
                height={52}
                className="h-12 w-auto"
              />
            </div>

            {/* 폼 패널 */}
            <div className="bg-black/50 backdrop-blur-lg rounded-2xl p-7 border border-white/[0.06]">
              <PreregForm
                selectedCharacters={selectedCharacters}
                displayCount={displayCount}
                onSuccess={onSuccess}
                isRegistered={isRegistered}
                variant="hero"
              />
            </div>
          </div>
        </div>

        {/* ── 모바일 레이아웃 ── */}
        <div className="md:hidden flex flex-col flex-1">
          {/* 상단 로고 */}
          <div className="pt-8 px-5 shrink-0">
            <Image
              src="/images/prereg/realmate_logo_W.png"
              alt="Realmate"
              width={180}
              height={40}
              className="h-10 w-auto"
            />
          </div>

          {/* 캐릭터 보이는 영역 (자연스러운 여백) */}
          <div className="flex-1" />

          {/* 하단 폼 */}
          <div className="px-5 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))]">
            <PreregForm
              selectedCharacters={selectedCharacters}
              displayCount={displayCount}
              onSuccess={onSuccess}
              isRegistered={isRegistered}
              variant="hero"
            />
          </div>

          {/* 스크롤 유도 */}
          <div className="text-center pb-4">
            <span className="prereg-scroll-bounce inline-block text-white/25 text-[11px] tracking-wider">
              ↓ Explore
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
