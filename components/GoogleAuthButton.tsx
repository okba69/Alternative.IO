'use client';

import { useEffect, useState } from 'react';
import { getBrowserSupabase } from '@/lib/supabase-browser';
import type { User } from '@supabase/supabase-js';

type GoogleAuthButtonProps = {
  compact?: boolean;
  redirectPath?: string;
};

export function GoogleAuthButton({ compact = false, redirectPath = '/catalogue' }: GoogleAuthButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let active = true;
    let supabase: ReturnType<typeof getBrowserSupabase>;
    try {
      supabase = getBrowserSupabase();
    } catch {
      return () => { active = false; };
    }

    void supabase.auth.getUser().then(({ data }) => {
      if (active) setUser(data.user ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setUser(session?.user ?? null);
    });
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleSignOut() {
    setLoading(true);
    try {
      await getBrowserSupabase().auth.signOut();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignIn() {
    if (loading) return;
    setLoading(true);
    setError('');
    try {
      const supabase = getBrowserSupabase();
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectPath)}`,
        },
      });
      if (authError) throw authError;
    } catch (error) {
      setError(error instanceof Error && error.message === 'Connexion Google non configurée.'
        ? 'La connexion Google doit encore être configurée sur le site.'
        : 'Connexion Google indisponible pour le moment. Vérifie la configuration Supabase Auth.');
      setLoading(false);
    }
  }

  return (
    <span className={compact ? 'google-auth-wrap compact' : 'google-auth-wrap'}>
      <button className={compact ? 'google-auth-button compact' : 'google-auth-button'} onClick={user ? handleSignOut : handleSignIn} disabled={loading} type="button">
        <svg className="google-icon" aria-hidden="true" viewBox="0 0 24 24" role="img">
          <path fill="#4285F4" d="M21.35 12.27c0-.74-.07-1.45-.22-2.13H12v4.03h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.7 2.91-4.2 2.91-7.29Z" />
          <path fill="#34A853" d="M12 21.8c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.8Z" />
          <path fill="#FBBC05" d="M6.54 13.88A5.85 5.85 0 0 1 6.23 12c0-.65.11-1.28.31-1.88V7.59H3.3A9.74 9.74 0 0 0 2.27 12c0 1.57.38 3.05 1.03 4.41l3.24-2.53Z" />
          <path fill="#EA4335" d="M12 6.09c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.18 14.63 2.2 12 2.2a9.74 9.74 0 0 0-8.7 5.39l3.24 2.53C7.31 7.81 9.46 6.09 12 6.09Z" />
        </svg>
        {loading ? 'Connexion…' : user ? (compact ? 'Se déconnecter' : 'Connecté avec Google') : 'Continuer avec Google'}
      </button>
      {error && <span className="google-auth-error" role="alert">{error}</span>}
    </span>
  );
}
