import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './routing';

const NEXT_LOCALE_COOKIE = 'NEXT_LOCALE';
const LOCALES = ['ko', 'en'] as const;

function getLocaleFromRequest(request: NextRequest): 'ko' | 'en' {
  const pathname = request.nextUrl.pathname;

  // 이미 /ko 또는 /en 경로에 있으면 리다이렉트하지 않음 (무한 루프 방지)
  const hasLocalePrefix = LOCALES.some((loc) => pathname.startsWith(`/${loc}`) || pathname === `/${loc}`);
  if (hasLocalePrefix) {
    return pathname.startsWith('/en') ? 'en' : 'ko';
  }

  // 1. 쿠키에 저장된 사용자 선택 locale (최우선)
  const cookieLocale = request.cookies.get(NEXT_LOCALE_COOKIE)?.value;
  if (cookieLocale && LOCALES.includes(cookieLocale as 'ko' | 'en')) {
    return cookieLocale as 'ko' | 'en';
  }

  // 2. x-vercel-ip-country 헤더 기반 감지 (Vercel 배포 시)
  // 로컬 개발 환경에서는 헤더가 없으므로 기본값 "ko"로 폴백
  const countryCode = request.headers.get('x-vercel-ip-country');
  if (countryCode === 'KR') {
    return 'ko';
  }
  if (countryCode) {
    return 'en';
  }

  // 3. 기본값: ko (localhost 등 헤더가 없는 경우)
  return 'ko';
}

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 루트 경로 "/" 접속 시: IP/쿠키 기반 locale로 리다이렉트
  if (pathname === '/') {
    const locale = getLocaleFromRequest(request);
    const response = NextResponse.redirect(new URL(`/${locale}`, request.url));

    // 쿠키가 없었던 경우 locale 쿠키 설정 (다음 방문 시 우선 사용)
    if (!request.cookies.get(NEXT_LOCALE_COOKIE)) {
      response.cookies.set(NEXT_LOCALE_COOKIE, locale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1년
        sameSite: 'lax',
      });
    }

    return response;
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(ko|en)', '/(ko|en)/:path*'],
};
