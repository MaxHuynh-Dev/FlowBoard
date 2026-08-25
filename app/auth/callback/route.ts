import { NextResponse } from 'next/server';
import { ROUTERS } from '@/enums/router';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request): Promise<NextResponse> {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const requestedNext = requestUrl.searchParams.get('next') ?? ROUTERS.DASHBOARD;
  const next =
    requestedNext.startsWith('/') && !requestedNext.startsWith('//')
      ? requestedNext
      : ROUTERS.DASHBOARD;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL(next, requestUrl.origin));
    }
  }

  return NextResponse.redirect(new URL(`${ROUTERS.LOGIN}?error=auth`, requestUrl.origin));
}
