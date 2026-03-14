'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { characters } from '@/lib/prereg-data';

const MAX_SELECT = 3;

interface CharacterShowcaseProps {
  selectedCharacters: string[];
  onSelectChange: (ids: string[]) => void;
}

export function CharacterShowcase({
  selectedCharacters,
  onSelectChange,
}: CharacterShowcaseProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [unmutedCharacterId, setUnmutedCharacterId] = useState<string | null>(null);

  const toggle = (id: string) => {
    if (selectedCharacters.includes(id)) {
      onSelectChange(selectedCharacters.filter((c) => c !== id));
      return;
    }
    if (selectedCharacters.length >= MAX_SELECT) {
      if (typeof window !== 'undefined') {
        window.alert('최대 3명까지 선택 가능합니다');
      }
      return;
    }
    onSelectChange([...selectedCharacters, id]);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const scrollLeft = el.scrollLeft;
      const cardWidth = el.offsetWidth * 0.75;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.max(0, Math.min(index, characters.length - 1)));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="py-12 md:py-16 bg-[#0A0A0A] px-4">
      <h2 className="text-3xl font-bold text-white text-center mb-1">
        Characters
      </h2>
      <p className="text-[#888888] text-sm text-center mb-8">
        실제 인플루언서 기반 AI 캐릭터
      </p>

      {/* 캐러셀: 모바일 가로 스크롤, 데스크톱 그리드 */}
      <div
        ref={scrollRef}
        className="md:hidden overflow-x-auto snap-x snap-mandatory flex gap-4 pb-4 scrollbar-none"
        style={{
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {characters.map((c) => (
          <CharacterCard
            key={c.id}
            character={c}
            selected={selectedCharacters.includes(c.id)}
            onToggle={() => toggle(c.id)}
            unmutedCharacterId={unmutedCharacterId}
            onSoundToggle={setUnmutedCharacterId}
            isMobileCarousel
            className="flex-shrink-0 w-[75vw] snap-center"
          />
        ))}
      </div>

      <div className="hidden md:grid grid-cols-4 gap-4 max-w-5xl mx-auto">
        {characters.map((c) => (
          <CharacterCard
            key={c.id}
            character={c}
            selected={selectedCharacters.includes(c.id)}
            onToggle={() => toggle(c.id)}
            unmutedCharacterId={unmutedCharacterId}
            onSoundToggle={setUnmutedCharacterId}
          />
        ))}
      </div>

      {/* 도트 인디케이터 (모바일만) */}
      <div className="flex justify-center gap-2 mt-6 md:hidden">
        {characters.map((_, i) => (
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

function CharacterCard({
  character,
  selected,
  onToggle,
  unmutedCharacterId,
  onSoundToggle,
  isMobileCarousel = false,
  className = '',
}: {
  character: (typeof characters)[0];
  selected: boolean;
  onToggle: () => void;
  unmutedCharacterId: string | null;
  onSoundToggle: (id: string | null) => void;
  isMobileCarousel?: boolean;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isInView, setIsInView] = useState(!isMobileCarousel);
  const isUnmuted = unmutedCharacterId === character.id;

  // 뷰포트에 보이면 play, 안 보이면 pause (모바일 autoplay 대응)
  useEffect(() => {
    const video = videoRef.current;
    const el = isMobileCarousel ? containerRef.current : videoRef.current;
    if (!el || !character.video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (video) video.play().catch(() => {});
        } else {
          if (isMobileCarousel) setIsInView(false);
          if (video) video.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [character.video, isMobileCarousel]);

  useEffect(() => {
    if (!videoRef.current || !character.video) return;
    videoRef.current.muted = !isUnmuted;
  }, [isUnmuted, character.video]);

  // 구형 iOS webkit-playsinline
  useEffect(() => {
    const video = videoRef.current;
    if (video) video.setAttribute('webkit-playsinline', 'true');
  }, [isInView]);

  const toggleMute = () => {
    onSoundToggle(isUnmuted ? null : character.id);
  };

  const showVideo = character.video && !videoError;
  const loadVideo = showVideo && (!isMobileCarousel || isInView);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl border border-white/10 aspect-[9/16] group transition-transform duration-300 md:hover:scale-[1.03] md:hover:border-[#FF6B35]/40 md:hover:shadow-[0_0_20px_rgba(255,107,53,0.15)] ${className}`}
    >
      <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden">
        {showVideo ? (
          <>
            <video
              ref={videoRef}
              src={loadVideo ? character.video : undefined}
              poster={`/images/characters/${character.id}.png`}
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setVideoError(true)}
              onLoadedData={() => videoRef.current?.play().catch(() => {})}
            />
            <button
              type="button"
              onClick={toggleMute}
              className="absolute top-3 right-3 z-10 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1.5 flex items-center gap-1.5 text-white"
              aria-label={isUnmuted ? '음소거' : '소리 켜기'}
            >
              <span className="text-xs">{isUnmuted ? '🔊' : '🔇'}</span>
              {!isUnmuted && (
                <div className="flex items-end gap-[2px] h-3">
                  <div className="sound-wave-bar" />
                  <div className="sound-wave-bar" />
                  <div className="sound-wave-bar" />
                </div>
              )}
            </button>
          </>
        ) : (
          <>
            {imageError ? (
              <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
                <span className="text-white font-bold text-lg">{character.name}</span>
              </div>
            ) : (
              <Image
                src={`/images/characters/${character.id}.png`}
                alt={character.name}
                fill
                sizes="(max-width: 768px) 75vw, 25vw"
                className="object-cover"
                onError={() => setImageError(true)}
              />
            )}
          </>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white text-xl font-bold">{character.name}</p>
        <p className="text-white/60 text-sm">{character.nameEn}</p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {character.tags.map((tag) => (
            <span
              key={tag}
              className="bg-[rgba(255,107,53,0.15)] text-[#FF8C5A] text-xs px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-white/80 text-xs line-clamp-2 mt-1">{character.bio}</p>
        <button
          type="button"
          onClick={onToggle}
          className={`mt-3 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
            selected
              ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF4500] text-white shadow-[0_0_20px_rgba(255,107,53,0.4)]'
              : 'border border-white/30 text-white/60 hover:border-white/50'
          }`}
        >
          💕 관심 있어요
        </button>
      </div>
    </div>
  );
}
