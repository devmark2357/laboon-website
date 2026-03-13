'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PreregForm } from './PreregForm';
import { getDisplayCount } from '@/lib/prereg-data';

interface SecondCTAProps {
  selectedCharacters: string[];
  isRegistered: boolean;
  onSuccess: () => void;
}

export function SecondCTA({
  selectedCharacters,
  isRegistered,
  onSuccess,
}: SecondCTAProps) {
  const [count, setCount] = useState(0);
  const displayCount = getDisplayCount(count);

  useEffect(() => {
    fetch('/api/prereg/count', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => setCount(typeof data.count === 'number' ? data.count : 0))
      .catch(() => setCount(0));
  }, []);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* 블러 배경 */}
      <div className="absolute inset-0">
        <Image
          src="/images/prereg/feature-1.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover blur-[30px] brightness-[0.3] scale-110"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center max-w-lg">
        <h2 className="text-2xl font-bold text-white mb-2">
          지금 시작하기
        </h2>
        <p className="text-[#CCCCCC] text-sm mb-8">
          무료 사전예약 · 출시 시 문자 알림
        </p>
        <PreregForm
          selectedCharacters={selectedCharacters}
          displayCount={displayCount}
          onSuccess={onSuccess}
          isRegistered={isRegistered}
          variant="cta"
        />
        <p className="text-[#FF6B35] text-sm font-medium mt-4">
          🔥 {displayCount.toLocaleString('ko-KR')}명이 함께하고 있어요
        </p>
      </div>
    </section>
  );
}
