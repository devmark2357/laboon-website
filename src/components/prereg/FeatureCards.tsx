'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { features } from '@/lib/prereg-data';

export function FeatureCards() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(2);

  const getCardMetrics = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return { cardWidth: 300, gap: 16 };
    const card = el.querySelector('[data-card]') as HTMLElement | null;
    const cardWidth = card?.offsetWidth || 300;
    return { cardWidth, gap: 16 };
  }, []);

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const el = scrollRef.current;
    if (!el) return;
    const { cardWidth, gap } = getCardMetrics();
    const containerWidth = el.offsetWidth;
    const scrollTo = (cardWidth + gap) * index - (containerWidth - cardWidth) / 2;
    el.scrollTo({ left: Math.max(0, scrollTo), behavior });
  }, [getCardMetrics]);

  const updateActiveIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { cardWidth, gap } = getCardMetrics();
    const containerWidth = el.offsetWidth;
    const centerOffset = el.scrollLeft + containerWidth / 2;
    const index = Math.round((centerOffset - cardWidth / 2) / (cardWidth + gap));
    setActiveIndex(Math.max(0, Math.min(index, features.length - 1)));
  }, [getCardMetrics]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateActiveIndex, { passive: true });
    return () => el.removeEventListener('scroll', updateActiveIndex);
  }, [updateActiveIndex]);

  // 초기: Real Event(index 2) 중앙
  useEffect(() => {
    const timer = setTimeout(() => scrollToIndex(2, 'instant'), 150);
    return () => clearTimeout(timer);
  }, [scrollToIndex]);

  const goLeft = () => {
    const next = Math.max(0, activeIndex - 1);
    scrollToIndex(next);
  };

  const goRight = () => {
    const next = Math.min(features.length - 1, activeIndex + 1);
    scrollToIndex(next);
  };

  return (
    <section className="py-16 md:py-20 bg-[#0A0A0A]">
      <h2 className="text-2xl font-bold text-white text-center mb-10">
        Features
      </h2>

      <div className="relative">
        {/* 좌측 화살표 (데스크톱) */}
        <button
          type="button"
          onClick={goLeft}
          className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 backdrop-blur border border-white/20 text-white items-center justify-center hover:bg-black/80 transition-colors"
          aria-label="Previous"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>

        {/* 우측 화살표 (데스크톱) */}
        <button
          type="button"
          onClick={goRight}
          className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 backdrop-blur border border-white/20 text-white items-center justify-center hover:bg-black/80 transition-colors"
          aria-label="Next"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>

        {/* 캐러셀 */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-none"
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            paddingLeft: 'calc(50vw - 150px)',
            paddingRight: 'calc(50vw - 150px)',
          }}
        >
          {features.map((feature, i) => (
            <div
              key={feature.titleEn}
              data-card
              className="flex-shrink-0 w-[260px] md:w-[300px] snap-center"
              style={{ scrollSnapAlign: 'center' }}
            >
              <div
                className={`relative aspect-[9/16] rounded-2xl overflow-hidden border transition-all duration-500 ${
                  i === activeIndex
                    ? 'border-[#FF6B35]/40 scale-100 opacity-100 shadow-[0_0_30px_rgba(255,107,53,0.15)]'
                    : 'border-white/10 scale-[0.88] opacity-50'
                }`}
              >
                <Image
                  src={feature.image}
                  alt={feature.titleKo}
                  fill
                  sizes="300px"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <p className={`text-center mt-3 text-sm transition-opacity duration-500 ${
                i === activeIndex ? 'text-white/70' : 'text-white/25'
              }`}>
                {feature.titleKo}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 도트 인디케이터 */}
      <div className="flex justify-center gap-2 mt-6">
        {features.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollToIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'bg-[#FF6B35] w-6'
                : 'bg-white/20 w-2 hover:bg-white/40'
            }`}
            aria-label={`Feature ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
