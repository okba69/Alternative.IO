'use client';

import { useState } from 'react';
import { getBrowserSupabase } from '@/lib/supabase-browser';

type GoogleAuthButtonProps = {
  compact?: boolean;
};

export function GoogleAuthButton({ compact = false }: GoogleAuthButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSignIn() {
    if (loading) return;
    setLoading(true);
    setError('');
    try {
      const supabase = getBrowserSupabase();
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (authError) throw authError;
    } catch {
      setError('Connexion Google indisponible pour le moment. Vérifie la configuration Supabase Auth.');
      setLoading(false);
    }
  }

  return (
    <span className={compact ? 'google-auth-wrap compact' : 'google-auth-wrap'}>
      <button className={compact ? 'google-auth-button compact' : 'google-auth-button'} onClick={handleSignIn} disabled={loading} type="button">
        <span className="google-icon" aria-hidden="true">G</span>
        {loading ? 'Connexion…' : 'Continuer avec Google'}
      </button>
      {error && <span className="google-auth-error" role="alert">{error}</span>}
    </span>
  );
}
