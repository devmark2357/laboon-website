'use client';

import { useEffect, useState } from 'react';
import { LAUNCH_DATE } from '@/lib/prereg-data';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft | null {
  const end = new Date(LAUNCH_DATE).getTime();
  const now = Date.now();
  const diff = Math.max(0, end - now);
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

function Pad({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center bg-white/10 rounded-lg p-2 min-w-[52px]">
      <span className="text-xl font-bold text-white tabular-nums">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-xs text-[#888888] mt-0.5">{label}</span>
    </div>
  );
}

interface CountdownTimerProps {
  compact?: boolean;
}

export function CountdownTimer({ compact = false }: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setTime(getTimeLeft());
    const t = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, [mounted]);

  if (!mounted) {
    if (compact) {
      return (
        <span className="text-xs text-white/70 tabular-nums">
          D-00 00:00:00
        </span>
      );
    }
    return (
      <div className="flex gap-2 justify-center flex-wrap">
        <Pad value={0} label="일" />
        <Pad value={0} label="시간" />
        <Pad value={0} label="분" />
        <Pad value={0} label="초" />
      </div>
    );
  }

  if (!time) {
    if (compact) {
      return (
        <span className="text-xs text-white/70 tabular-nums">
          D-00 00:00:00
        </span>
      );
    }
    return (
      <div className="flex gap-2 justify-center flex-wrap">
        <Pad value={0} label="일" />
        <Pad value={0} label="시간" />
        <Pad value={0} label="분" />
        <Pad value={0} label="초" />
      </div>
    );
  }

  if (compact) {
    const hh = String(time.hours).padStart(2, '0');
    const mm = String(time.minutes).padStart(2, '0');
    const ss = String(time.seconds).padStart(2, '0');
    return (
      <span className="text-xs text-white/70 tabular-nums">
        D-{time.days} {hh}:{mm}:{ss}
      </span>
    );
  }

  return (
    <div className="flex gap-2 justify-center flex-wrap">
      <Pad value={time.days} label="일" />
      <Pad value={time.hours} label="시간" />
      <Pad value={time.minutes} label="분" />
      <Pad value={time.seconds} label="초" />
    </div>
  );
}
