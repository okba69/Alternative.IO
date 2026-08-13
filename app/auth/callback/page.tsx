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
        const code = new URLSearchParams(window.location.search).get('code');
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        }
        const { data } = await supabase.auth.getSession();
        if (!data.session) throw new Error('Session Google introuvable.');
        router.replace('/catalogue');
      } catch {
        if (active) setMessage('Connexion Google indisponible pour le moment. Vérifie la configuration Supabase Auth.');
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
