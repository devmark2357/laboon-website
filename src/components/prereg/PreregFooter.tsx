'use client';

const LEGAL_LINKS = [
  { href: 'https://laboon.online/terms-of-service.html', label: '이용약관' },
  { href: 'https://laboon.online/privacy-policy.html', label: '개인정보처리방침' },
  { href: 'https://laboon.online/refund-policy.html', label: '환불정책' },
] as const;

export function PreregFooter() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5 py-8 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-white/40 text-sm font-semibold mb-4">LABOON</p>
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {LEGAL_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 text-xs hover:text-white/50 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
        <p className="text-white/30 text-xs mb-1">
          문의: dev.mark2357@gmail.com
        </p>
        <p className="text-white/30 text-xs">© 2026 LABOON. All rights reserved.</p>
      </div>
    </footer>
  );
}
