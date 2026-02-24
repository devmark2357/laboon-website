import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/routing';

export const metadata: Metadata = {
  metadataBase: new URL('https://laboon.online'),
  title: 'REALMATE | AI x Real Fan Economy Platform',
  description:
    '실존 인플루언서 기반 AI 캐릭터와 대화하고, 관계를 쌓고, 특별한 콘텐츠를 경험하세요. Chat with AI characters based on real influencers.',
  openGraph: {
    title: 'REALMATE | AI x Real Fan Economy Platform',
    description:
      '실존 인플루언서 기반 AI 캐릭터와 대화하고, 관계를 쌓고, 특별한 콘텐츠를 경험하세요.',
    url: 'https://laboon.online',
    siteName: 'REALMATE',
    type: 'website',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'REALMATE | AI x Real Fan Economy Platform',
    description: 'AI 캐릭터와 진짜 팬덤이 만나는 곳',
    images: ['/images/og-image.png'],
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'ko' | 'en')) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}
