'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { features } from '@/lib/prereg-data';

export function FeatureCards() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(2); // Real Event (index 2) 중앙 시작
  const totalItems = features.length;

  // 스크롤 위치로 활성 인덱스 감지
  const updateActiveIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.querySelector('[data-card]')?.clientWidth || 300;
    const gap = 16;
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.max(0, Math.min(index, totalItems - 1)));
  }, [totalItems]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateActiveIndex, { passive: true });
    return () => el.removeEventListener('scroll', updateActiveIndex);
  }, [updateActiveIndex]);

  // 초기 스크롤: Real Event (index 2)를 중앙에
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const timer = setTimeout(() => {
      const card = el.querySelector('[data-card]');
      if (!card) return;
      const cardWidth = card.clientWidth;
      const gap = 16;
      const containerWidth = el.clientWidth;
      const scrollTo = (cardWidth + gap) * 2 - (containerWidth - cardWidth) / 2;
      el.scrollTo({ left: Math.max(0, scrollTo), behavior: 'instant' });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // 도트 클릭으로 이동
  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector('[data-card]');
    if (!card) return;
    const cardWidth = card.clientWidth;
    const gap = 16;
    const containerWidth = el.clientWidth;
    const scrollTo = (cardWidth + gap) * index - (containerWidth - cardWidth) / 2;
    el.scrollTo({ left: Math.max(0, scrollTo), behavior: 'smooth' });
  };

  return (
    <section className="py-16 md:py-20 bg-[#0A0A0A]">
      <h2 className="text-2xl font-bold text-white text-center mb-10">
        Features
      </h2>

      {/* 캐러셀 */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-none px-[calc(50vw-140px)] md:px-[calc(50vw-160px)]"
        style={{
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {features.map((feature, i) => (
          <div
            key={feature.titleEn}
            data-card
            className="flex-shrink-0 w-[280px] md:w-[320px] snap-center"
            style={{ scrollSnapAlign: 'center' }}
          >
            <div
              className={`relative aspect-[9/16] rounded-2xl overflow-hidden border transition-all duration-500 ${
                i === activeIndex
                  ? 'border-[#FF6B35]/40 scale-100 opacity-100'
                  : 'border-white/10 scale-[0.92] opacity-60'
              }`}
            >
              <Image
                src={feature.image}
                alt={feature.titleKo}
                fill
                sizes="(max-width: 768px) 280px, 320px"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <p className={`text-center mt-3 text-sm transition-opacity duration-500 ${
              i === activeIndex ? 'text-white/70' : 'text-white/30'
            }`}>
              {feature.titleKo}
            </p>
          </div>
        ))}
      </div>

      {/* 도트 인디케이터 */}
      <div className="flex justify-center gap-2 mt-6">
        {features.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollToIndex(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'bg-[#FF6B35] w-6'
                : 'bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Feature ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
