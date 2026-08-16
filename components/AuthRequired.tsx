'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { GoogleAuthButton } from '@/components/GoogleAuthButton';
import { getBrowserSupabase } from '@/lib/supabase-browser';

type AuthRequiredProps = { title: string; description: string; redirectPath?: string; children: ReactNode };

export function AuthRequired({ title, description, redirectPath = '/catalogue', children }: AuthRequiredProps) {
  const [ready, setReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    let active = true;
    const supabase = getBrowserSupabase();
    void supabase.auth.getUser().then(({ data }) => { if (active) { setSignedIn(Boolean(data.user)); setReady(true); } });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => { if (active) setSignedIn(Boolean(session?.user)); });
    return () => { active = false; listener.subscription.unsubscribe(); };
  }, []);

  if (!ready) return <div className="auth-required"><p>Vérification de la connexion…</p></div>;
  if (signedIn) return <>{children}</>;
  return <div className="auth-required"><p className="account-kicker">CONNEXION REQUISE</p><h2>{title}</h2><p>{description}</p><GoogleAuthButton redirectPath={redirectPath} /></div>;
}
