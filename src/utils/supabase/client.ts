import { createBrowserClient } from '@supabase/ssr';
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from '@/constants/envs';

export const createClient = () => {
  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    throw new Error('Missing Supabase environment variables');
  }

  return createBrowserClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
};
