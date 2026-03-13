'use client';

import { useRef, useState, useEffect } from 'react';
import { milestones, getDisplayCount } from '@/lib/prereg-data';

interface MilestoneRewardsProps {
  displayCount: number;
}

export function MilestoneRewards({ displayCount }: MilestoneRewardsProps) {
  const ref = useRef<HTMLElement>(null);
  const [animated, setAnimated] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (inView && !animated) {
      const t = setTimeout(() => setAnimated(true), 100);
      return () => clearTimeout(t);
    }
  }, [inView, animated]);

  const progressPercent = Math.min(100, (displayCount / 9000) * 100);

  return (
    <section
      ref={ref}
      className="py-12 md:py-16 px-4 bg-[#1A1A1A] border border-[#FF6B35]/30 rounded-2xl mx-4 md:mx-auto md:max-w-4xl shadow-[0_0_40px_rgba(255,107,53,0.15)]"
    >
      <h2 className="text-2xl font-bold text-white text-center mb-1">
        사전예약 보상
      </h2>
      <p className="text-[#888888] text-sm text-center mb-8">
        예약자가 많아질수록 더 큰 혜택!
      </p>

      <div className="h-3 rounded-full bg-white/10 overflow-hidden mb-8">
        <div
          className="h-full rounded-full relative overflow-hidden transition-[width] duration-[1500ms] ease-out"
          style={{ width: animated ? `${progressPercent}%` : '0%' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35] to-[#FF4500]" />
          <div
            className="absolute inset-0 prereg-progress-shimmer"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              backgroundSize: '200% 100%',
            }}
          />
        </div>
      </div>

      <div className="flex md:grid grid-cols-1 md:grid-cols-5 gap-4 mb-8 overflow-x-auto pb-2 md:overflow-visible scrollbar-none" style={{ WebkitOverflowScrolling: 'touch' }}>
        {milestones.map((m) => {
          const achieved = displayCount >= m.target;
          return (
            <div
              key={m.target}
              className={`rounded-xl border p-4 text-center transition-colors ${
                achieved
                  ? 'border-[#FF6B35]/50 bg-white/5'
                  : 'border-white/10 bg-white/[0.02]'
              }`}
            >
              <span className={`text-2xl mb-2 block ${achieved ? 'text-[#FF6B35] prereg-milestone-check-pulse' : ''}`}>{achieved ? '✓' : '🔒'}</span>
              <p className="text-white font-semibold text-sm">{m.label}</p>
              <p className="text-[#CCCCCC] text-xs mt-1">{m.reward}</p>
            </div>
          );
        })}
      </div>

      <p className="text-[#888888] text-xs text-center">
        모든 보상은 누적 지급됩니다 · 출시 후 사전예약 번호로 자동 지급
      </p>
    </section>
  );
}
