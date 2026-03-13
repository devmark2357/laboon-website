'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { features } from '@/lib/prereg-data';

export function FeatureCards() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateActiveIndex = () => {
      const scrollLeft = el.scrollLeft;
      const first = el.querySelector<HTMLElement>('[data-feature-card]');
      const step = first ? first.offsetWidth + 16 : 296; // card width + gap-4
      const index = Math.round(scrollLeft / step);
      setActiveIndex(Math.max(0, Math.min(index, features.length - 1)));
    };

    el.addEventListener('scroll', updateActiveIndex, { passive: true });
    const ro = new ResizeObserver(updateActiveIndex);
    ro.observe(el);
    updateActiveIndex();
    return () => {
      el.removeEventListener('scroll', updateActiveIndex);
      ro.disconnect();
    };
  }, []);

  return (
    <section className="py-16 md:py-24 bg-[#0A0A0A]">
      <h2 className="text-2xl font-bold text-white text-center mb-8">
        Features
      </h2>

      <div
        ref={scrollRef}
        className="overflow-x-auto flex gap-4 pb-4 scrollbar-none px-[10vw] md:px-[25vw]"
        style={{
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {features.map((f) => (
          <div
            key={f.image}
            data-feature-card
            className="flex-shrink-0 w-[280px] md:w-[320px] snap-center rounded-2xl overflow-hidden border border-white/10 transition-transform duration-300"
          >
            <div className="aspect-[9/16] relative">
              <Image
                src={f.image}
                alt={f.titleKo}
                fill
                sizes="(max-width: 768px) 280px, 320px"
                className="object-cover"
              />
            </div>
            <p className="text-white/50 text-sm text-center mt-2 pb-3 px-1">
              {f.titleKo}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {features.map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full transition-colors"
            style={{
              backgroundColor: i === activeIndex ? '#FF6B35' : 'rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </div>
    </section>
  );
}
