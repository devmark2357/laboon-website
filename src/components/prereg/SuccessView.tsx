'use client';

import { useEffect } from 'react';

interface SuccessViewProps {
  onShareClick?: () => void;
}

export function SuccessView({ onShareClick }: SuccessViewProps) {
  useEffect(() => {
    let cancelled = false;
    import('canvas-confetti').then(({ default: confetti }) => {
      if (cancelled) return;
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#FF6B35', '#FF8C5A', '#FFD700', '#FFFFFF'],
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleCopyLink = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    try {
      await navigator.clipboard.writeText(url);
      onShareClick?.();
    } catch {
      // fallback
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      onShareClick?.();
    }
  };

  return (
    <div className="flex flex-col items-center text-center py-4 opacity-100 transition-opacity duration-300">
      <p className="text-2xl md:text-3xl font-bold text-white mb-2">
        🎉 사전예약 완료!
      </p>
      <p className="text-[#CCCCCC] text-sm mb-6">
        출시 시 문자로 알려드릴게요.
      </p>
      <button
        type="button"
        onClick={handleCopyLink}
        className="w-full h-14 rounded-xl bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/15 transition-colors"
      >
        링크 복사
      </button>
    </div>
  );
}
