'use client';

import { useEffect, useState } from 'react';
import { getBrowserSupabase } from '@/lib/supabase-browser';

export function SessionPanel() {
  const [email, setEmail] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    async function loadSession() {
      try {
        const { data } = await getBrowserSupabase().auth.getUser();
        if (active) setEmail(data.user?.email ?? null);
      } catch {
        if (active) setEmail(null);
      } finally {
        if (active) setReady(true);
      }
    }
    void loadSession();
    return () => { active = false; };
  }, []);

  async function signOut() {
    await getBrowserSupabase().auth.signOut();
    setEmail(null);
  }

  if (!ready) return <span className="session-status">Session…</span>;
  if (!email) return <span className="session-status">Connexion Google requise pour contribuer</span>;
  return <span className="session-status">{email}<button type="button" onClick={signOut}>Se déconnecter</button></span>;
}
