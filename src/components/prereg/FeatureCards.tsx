'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { features } from '@/lib/prereg-data';

export function FeatureCards() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(2);
  const [sidePadding, setSidePadding] = useState(0);
  const initialScrollDoneRef = useRef(false);

  const getCardMetrics = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return { cardWidth: 280, gap: 16 };
    const card = el.querySelector('[data-card]') as HTMLElement | null;
    return { cardWidth: card?.offsetWidth || 280, gap: 16 };
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

  // 캐러셀 좌우 패딩: 컨테이너 너비와 카드 너비로 중앙 정렬되도록 동적 계산
  useEffect(() => {
    const calculate = () => {
      const el = scrollRef.current;
      if (!el) return;
      const card = el.querySelector('[data-card]') as HTMLElement | null;
      if (!card?.offsetWidth) return;
      const containerWidth = el.parentElement?.offsetWidth ?? window.innerWidth;
      const cardWidth = card.offsetWidth;
      const padding = (containerWidth - cardWidth) / 2;
      setSidePadding(Math.max(16, padding));
    };
    requestAnimationFrame(calculate);
    const t = setTimeout(calculate, 100);
    window.addEventListener('resize', calculate);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', calculate);
    };
  }, []);

  // sidePadding 적용 후 3번째 카드(Real Event) 중앙 정렬 (최초 1회만)
  useEffect(() => {
    if (sidePadding > 0 && !initialScrollDoneRef.current) {
      initialScrollDoneRef.current = true;
      requestAnimationFrame(() => scrollToIndex(2, 'instant'));
    }
  }, [sidePadding, scrollToIndex]);

  // 윈도우 리사이즈 시 재정렬
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

        {/* 캐러셀 */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-none"
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            paddingLeft: `${sidePadding}px`,
            paddingRight: `${sidePadding}px`,
          }}
        >
          {features.map((feature, i) => (
            <div
              key={feature.titleEn}
              data-card
              className="flex-shrink-0 w-[260px] md:w-[280px] lg:w-[300px]"
              style={{ scrollSnapAlign: 'center' }}
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
