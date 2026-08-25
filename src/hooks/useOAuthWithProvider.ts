'use client';

import type { Provider } from '@supabase/supabase-js';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

type OAuthProvider = Extract<Provider, 'google' | 'github'>;

type UseOAuthWithProviderOptions = {
  redirectPath?: string;
};

type UseOAuthWithProviderReturn = {
  error: string | null;
  loadingProvider: OAuthProvider | null;
  signInWithProvider: (provider: OAuthProvider) => Promise<void>;
};

export default function useOAuthWithProvider({
  redirectPath = '/dashboard'
}: UseOAuthWithProviderOptions = {}): UseOAuthWithProviderReturn {
  const [loadingProvider, setLoadingProvider] = useState<OAuthProvider | null>(null);
  const [error, setError] = useState<string | null>(null);

  const signInWithProvider = async (provider: OAuthProvider): Promise<void> => {
    setError(null);
    setLoadingProvider(provider);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectPath)}`
      }
    });

    if (authError) {
      setError(authError.message);
      setLoadingProvider(null);
    }
  };

  return { error, loadingProvider, signInWithProvider };
}
