import { Syne } from 'next/font/google';
import './globals.css';
import { MetaPixel } from '@/components/MetaPixel';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={syne.variable} suppressHydrationWarning>
      <body className="min-h-screen font-sans">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
