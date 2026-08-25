import { createServerClient } from '@supabase/ssr';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from '@/constants/envs';
import { ROUTERS } from '@/enums/router';

export const updateSession = async (request: NextRequest) => {
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    throw new Error('Missing Supabase environment variables');
  }

  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers
    }
  });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      }
    }
  });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();

  if (!user && request.nextUrl.pathname.startsWith(ROUTERS.DASHBOARD)) {
    url.pathname = ROUTERS.LOGIN;
    return NextResponse.redirect(url);
  }

  if (user && request.nextUrl.pathname === ROUTERS.LOGIN) {
    url.pathname = ROUTERS.DASHBOARD;
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
};
