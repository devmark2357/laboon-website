import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://laboon.online'),
  title: 'Realmate 사전예약 | Real AI, Real Connection',
  description:
    '실제 인플루언서 기반 AI 캐릭터와 리얼한 연애 시뮬레이션. 사전예약하고 무료 출시 혜택 받기.',
  openGraph: {
    title: 'Realmate 사전예약 | 실제 인플루언서 기반 AI 연애 시뮬레이션',
    description:
      '8명의 AI 캐릭터와 진짜 같은 관계를 경험하세요. 지금 사전예약하면 출시 혜택 지급!',
    url: 'https://laboon.online/prereg',
    siteName: 'Realmate',
    locale: 'ko_KR',
    type: 'website',
    images: [
      { url: '/images/prereg/hero-desktop.png', width: 1200, height: 630 },
    ],
  },
  robots: { index: true, follow: true },
};

export default function PreregLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
