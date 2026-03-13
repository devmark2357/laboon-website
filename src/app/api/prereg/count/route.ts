import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.rpc('get_prereg_count');

    if (error) throw error;

    const count =
      typeof data === 'number' ?
        data
      : typeof (data as { count?: number })?.count === 'number'
        ? (data as { count: number }).count
        : 0;

    return NextResponse.json(
      { count },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, max-age=30, s-maxage=30',
        },
      }
    );
  } catch (err) {
    console.error('[prereg/count] GET error:', err);
    return NextResponse.json(
      { error: 'internal_error' },
      { status: 500 }
    );
  }
}
