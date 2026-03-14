'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { features } from '@/lib/prereg-data';

export function FeatureCards() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(2);

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('[data-card]');
    if (!cards[index]) return;
    const card = cards[index] as HTMLElement;
    const containerWidth = el.offsetWidth;
    const scrollTo = card.offsetLeft - (containerWidth - card.offsetWidth) / 2;
    el.scrollTo({ left: scrollTo, behavior });
  }, []);

  const updateActiveIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('[data-card]');
    const containerCenter = el.scrollLeft + el.offsetWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    cards.forEach((card, i) => {
      const cardEl = card as HTMLElement;
      const cardCenter = cardEl.offsetLeft + cardEl.offsetWidth / 2;
      const dist = Math.abs(containerCenter - cardCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateActiveIndex, { passive: true });
    return () => el.removeEventListener('scroll', updateActiveIndex);
  }, [updateActiveIndex]);

  // 초기 스크롤: 3번째 카드(Real Event) 중앙 정렬
  useEffect(() => {
    const timer = setTimeout(() => scrollToIndex(2, 'instant'), 500);
    return () => clearTimeout(timer);
  }, [scrollToIndex]);

  // 윈도우 리사이즈 시 현재 활성 카드 재정렬
  useEffect(() => {
    const handleResize = () => scrollToIndex(activeIndex, 'instant');
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [scrollToIndex, activeIndex]);

  const goLeft = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const goRight = () => scrollToIndex(Math.min(features.length - 1, activeIndex + 1));

  return (
    <section className="py-16 md:py-20 bg-[#0A0A0A]">
      <h2 className="text-2xl font-bold text-white text-center mb-10">Features</h2>

      <div className="relative">
        {/* 좌측 화살표 */}
        {activeIndex > 0 && (
          <button
            type="button"
            onClick={goLeft}
            className="hidden md:flex absolute left-4 lg:left-8 top-[45%] -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 backdrop-blur border border-white/20 text-white items-center justify-center hover:bg-black/80 transition-colors"
            aria-label="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
        )}

        {/* 우측 화살표 */}
        {activeIndex < features.length - 1 && (
          <button
            type="button"
            onClick={goRight}
            className="hidden md:flex absolute right-4 lg:right-8 top-[45%] -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 backdrop-blur border border-white/20 text-white items-center justify-center hover:bg-black/80 transition-colors"
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        )}

        {/* 캐러셀 wrapper + 스크롤 영역 */}
        <div className="w-full overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              WebkitOverflowScrolling: 'touch',
              scrollPaddingInline: '50%',
            }}
          >
            {/* 앞 spacer — 화면 절반에서 카드 절반 뺀 만큼 */}
            <div className="flex-shrink-0 w-[calc(50vw-140px)] md:w-[calc(50vw-150px)]" />

            {features.map((feature, i) => (
              <div
                key={feature.titleEn}
                data-card
                className="flex-shrink-0 w-[260px] md:w-[280px] lg:w-[300px] snap-center"
              >
                <div
                  className={`relative aspect-[9/16] rounded-2xl overflow-hidden border transition-all duration-500 cursor-pointer ${
                    i === activeIndex
                      ? 'border-[#FF6B35]/40 scale-100 opacity-100 shadow-[0_0_30px_rgba(255,107,53,0.15)]'
                      : 'border-white/10 scale-[0.88] opacity-50'
                  }`}
                  onClick={() => scrollToIndex(i)}
                >
                  <Image
                    src={feature.image}
                    alt={feature.titleKo}
                    fill
                    sizes="300px"
                    className="object-cover"
                    loading="eager"
                  />
                </div>
                <p className={`text-center mt-3 text-sm transition-opacity duration-500 ${
                  i === activeIndex ? 'text-white/70' : 'text-white/25'
                }`}>
                  {feature.titleKo}
                </p>
              </div>
            ))}

            {/* 뒤 spacer */}
            <div className="flex-shrink-0 w-[calc(50vw-140px)] md:w-[calc(50vw-150px)]" />
          </div>
        </div>
      </div>

      {/* 도트 */}
      <div className="flex justify-center gap-2 mt-6">
        {features.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollToIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIndex ? 'bg-[#FF6B35] w-6' : 'bg-white/20 w-2 hover:bg-white/40'
            }`}
            aria-label={`Feature ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
