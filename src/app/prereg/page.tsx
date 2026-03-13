import { Suspense } from 'react';
import { PreregPageClient } from '@/components/prereg/PreregPageClient';

export default function PreregPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
          <div className="text-white/50">로딩 중...</div>
        </div>
      }
    >
      <PreregPageClient />
    </Suspense>
  );
}
