'use client';

import { useState, useEffect } from 'react';
import { HeroWithForm } from './HeroWithForm';
import { CharacterShowcase } from './CharacterShowcase';
import { MilestoneRewards } from './MilestoneRewards';
import { FeatureCards } from './FeatureCards';
import { SecondCTA } from './SecondCTA';
import { PreregFooter } from './PreregFooter';
import { getDisplayCount } from '@/lib/prereg-data';

export function PreregPageClient() {
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const done = localStorage.getItem('prereg_done');
    if (done === 'true') setIsRegistered(true);
  }, []);

  useEffect(() => {
    fetch('/api/prereg/count', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => setCount(typeof data.count === 'number' ? data.count : 0))
      .catch(() => setCount(0));
  }, []);

  const displayCount = getDisplayCount(count);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      <HeroWithForm
        selectedCharacters={selectedCharacters}
        isRegistered={isRegistered}
        onSuccess={() => setIsRegistered(true)}
      />
      <CharacterShowcase
        selectedCharacters={selectedCharacters}
        onSelectChange={setSelectedCharacters}
      />
      <MilestoneRewards displayCount={displayCount} />
      <FeatureCards />
      <SecondCTA
        selectedCharacters={selectedCharacters}
        isRegistered={isRegistered}
        onSuccess={() => setIsRegistered(true)}
      />
      <PreregFooter />
    </main>
  );
}
