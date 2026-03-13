import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { createSupabaseServerClient } from '@/lib/supabase-server';

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1분
const RATE_LIMIT_MAX_REQUESTS = 5;

const rateLimitMap = new Map<string, number[]>();

function getClientIp(): string {
  const headersList = headers();
  const forwarded = headersList.get('x-forwarded-for');
  const realIp = headersList.get('x-real-ip');
  if (forwarded) return forwarded.split(',')[0].trim();
  if (realIp) return realIp.trim();
  return 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  let timestamps = rateLimitMap.get(ip) ?? [];
  timestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) return false;
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return true;
}

function validatePhone(phone: unknown): string | null {
  if (typeof phone !== 'string') return null;
  const digits = phone.replace(/-/g, '');
  if (!/^010\d{8}$/.test(digits)) return null;
  return digits;
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp();
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'too_many_requests' },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const phone = validatePhone(body.phone);
    if (!phone) {
      return NextResponse.json(
        { error: 'invalid_phone' },
        { status: 400 }
      );
    }

    const interested_characters =
      Array.isArray(body.interested_characters) ?
        body.interested_characters
      : typeof body.interested_characters === 'string'
        ? [body.interested_characters]
        : [];
    const marketing_agreed = Boolean(body.marketing_agreed);
    const utm_source =
      typeof body.utm_source === 'string' ? body.utm_source : null;
    const utm_medium =
      typeof body.utm_medium === 'string' ? body.utm_medium : null;
    const utm_campaign =
      typeof body.utm_campaign === 'string' ? body.utm_campaign : null;

    const supabase = createSupabaseServerClient();

    const { error: insertError } = await supabase.from('pre_registrations').insert({
      phone,
      interested_characters,
      marketing_agreed,
      utm_source,
      utm_medium,
      utm_campaign,
    });

    if (insertError) {
      if (insertError.code === '23505') {
        return NextResponse.json(
          { error: 'already_registered' },
          { status: 409 }
        );
      }
      throw insertError;
    }

    const { data: countData, error: rpcError } = await supabase.rpc(
      'get_prereg_count'
    );

    if (rpcError) throw rpcError;

    const count =
      typeof countData === 'number' ?
        countData
      : typeof (countData as { count?: number })?.count === 'number'
        ? (countData as { count: number }).count
        : 0;

    return NextResponse.json({ success: true, count }, { status: 200 });
  } catch (err) {
    console.error('[prereg] POST error:', err);
    return NextResponse.json(
      { error: 'internal_error' },
      { status: 500 }
    );
  }
}
