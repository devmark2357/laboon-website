'use client';

import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CountdownTimer } from './CountdownTimer';
import { SuccessView } from './SuccessView';
import { PrivacyModal } from './PrivacyModal';

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

function phoneToDigits(phone: string): string {
  return phone.replace(/-/g, '');
}

export interface PreregFormProps {
  selectedCharacters: string[];
  displayCount: number;
  onSuccess: () => void;
  isRegistered: boolean;
  variant?: 'hero' | 'cta';
}

export function PreregForm({
  selectedCharacters,
  displayCount,
  onSuccess,
  isRegistered,
  variant = 'hero',
}: PreregFormProps) {
  const searchParams = useSearchParams();
  const [phone, setPhone] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [marketingAgreed, setMarketingAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [animatedCount, setAnimatedCount] = useState(0);

  useEffect(() => {
    if (displayCount <= 0) return;
    const duration = 1500;
    const start = performance.now();
    let raf: number;
    const step = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      setAnimatedCount(Math.round(displayCount * t));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [displayCount]);

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
    setError(null);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!privacyAgreed || phoneToDigits(phone).length !== 11) return;
      setError(null);
      setLoading(true);

      const utm_source = searchParams.get('utm_source') ?? undefined;
      const utm_medium = searchParams.get('utm_medium') ?? undefined;
      const utm_campaign = searchParams.get('utm_campaign') ?? undefined;

      try {
        const res = await fetch('/api/prereg', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone: phoneToDigits(phone),
            interested_characters: selectedCharacters,
            marketing_agreed: marketingAgreed,
            utm_source: utm_source || undefined,
            utm_medium: utm_medium || undefined,
            utm_campaign: utm_campaign || undefined,
          }),
        });

        if (res.ok) {
          if (typeof window !== 'undefined') {
            localStorage.setItem('prereg_done', 'true');
          }
          onSuccess();
          return;
        }

        if (res.status === 409) setError('already_registered');
        else if (res.status === 400) setError('invalid_phone');
        else if (res.status === 429) setError('rate_limit');
        else setError('unknown');
      } catch {
        setError('unknown');
      } finally {
        setLoading(false);
      }
    },
    [phone, privacyAgreed, marketingAgreed, selectedCharacters, searchParams, onSuccess]
  );

  if (isRegistered) {
    return <SuccessView />;
  }

  const digits = phoneToDigits(phone);
  const canSubmit = privacyAgreed && digits.length === 11 && /^010\d{8}$/.test(digits);

  const isHero = variant === 'hero';

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto space-y-3 md:space-y-4">
        {isHero && (
          <div className="space-y-2 md:space-y-3 mb-2">
            <p className="text-[#FF6B35] text-sm md:text-lg tracking-[0.15em] md:tracking-[0.2em] uppercase font-semibold">
              Real AI, Real Connection
            </p>
            <h1 className="text-[22px] md:text-[36px] lg:text-[42px] font-bold text-white leading-[1.25]">
              실제 인플루언서 기반 AI와<br />진짜 같은 연애 시뮬레이션
            </h1>
            <p className="text-white/50 text-sm md:text-base">사전예약하고 출시 혜택 받기</p>
          </div>
        )}

        <input
          type="tel"
          inputMode="numeric"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="010-0000-0000"
          className="w-full h-12 px-4 text-base rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/50 focus:shadow-[0_0_20px_rgba(255,107,53,0.15)] transition-colors"
        />

        <div className="space-y-1.5 text-xs text-white/60">
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={privacyAgreed}
              onChange={(e) => setPrivacyAgreed(e.target.checked)}
              className="rounded border-white/30 text-[#FF6B35] focus:ring-[#FF6B35] mt-0.5"
            />
            <span>
              (필수){' '}
              <button
                type="button"
                onClick={() => setShowPrivacyModal(true)}
                className="underline hover:text-white"
              >
                개인정보 수집·이용 동의
              </button>
            </span>
          </label>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={marketingAgreed}
              onChange={(e) => setMarketingAgreed(e.target.checked)}
              className="rounded border-white/30 text-[#FF6B35] focus:ring-[#FF6B35] mt-0.5"
            />
            <span>(선택) 마케팅 정보 수신 동의</span>
          </label>
        </div>

        {error && (
          <p
            className={`text-sm ${
              error === 'already_registered'
                ? 'text-[#FF6B35]'
                : error === 'invalid_phone'
                  ? 'text-red-400'
                  : error === 'rate_limit'
                    ? 'text-yellow-400'
                    : 'text-red-400'
            }`}
          >
            {error === 'already_registered' && '이미 사전예약이 완료된 번호입니다 😊'}
            {error === 'invalid_phone' && '올바른 휴대폰 번호를 입력해주세요'}
            {error === 'rate_limit' && '잠시 후 다시 시도해주세요'}
            {error === 'unknown' && '오류가 발생했어요. 잠시 후 다시 시도해주세요.'}
          </p>
        )}

        <button
          type="submit"
          disabled={!canSubmit || loading}
          className={`w-full h-14 rounded-xl font-bold text-base md:text-lg text-white disabled:bg-gray-600 disabled:cursor-not-allowed transition-all hover:shadow-[0_0_30px_rgba(255,107,53,0.5)] hover:scale-[1.02] disabled:hover:scale-100 disabled:hover:shadow-none ${canSubmit && !loading ? 'prereg-cta-heartbeat' : ''}`}
          style={{
            background: canSubmit && !loading
              ? 'linear-gradient(to right, #FF6B35, #FF4500)'
              : undefined,
          }}
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden>
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              처리 중...
            </span>
          ) : (
            '사전예약 하기 🔥'
          )}
        </button>

        {isHero && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <p className="text-[#FF6B35] text-sm font-medium">
              🔥 현재 {animatedCount.toLocaleString('ko-KR')}명이 사전예약했어요
            </p>
            <CountdownTimer compact />
          </div>
        )}
      </form>

      <PrivacyModal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} />
    </>
  );
}
