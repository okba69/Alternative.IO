'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getBrowserSupabase } from '@/lib/supabase-browser';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [message, setMessage] = useState('Connexion Google en cours…');

  useEffect(() => {
    let active = true;

    async function finishAuth() {
      try {
        const supabase = getBrowserSupabase();
        const searchParams = new URLSearchParams(window.location.search);
        const oauthError = searchParams.get('error_description') || searchParams.get('error');
        if (oauthError) throw new Error(decodeURIComponent(oauthError.replace(/\+/g, ' ')));

        const code = searchParams.get('code');
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        }

        // Supporte aussi le retour implicite OAuth (tokens placés dans le hash).
        const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        if (!code && accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
          if (error) throw error;
        }

        const { data, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        if (!data.session) throw new Error('Session Google introuvable. Réessaie depuis le bouton Google.');
        router.replace('/catalogue');
      } catch (error) {
        if (active) {
          setMessage(error instanceof Error
            ? `Connexion Google impossible : ${error.message}`
            : 'Connexion Google indisponible pour le moment.');
        }
      }
    }

    void finishAuth();
    return () => {
      active = false;
    };
  }, [router]);

  return (
    <main className="auth-callback-page">
      <p className="eyebrow">UseInstead</p>
      <h1>{message}</h1>
      <Link className="text-link" href="/">Retour à l’accueil</Link>
    </main>
  );
}
