import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Client Supabase créé à la première utilisation (évite un plantage au build
// si les variables d'environnement ne sont pas encore présentes).
let _supabase: SupabaseClient | null = null;
export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      throw new Error('SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY doivent être définis dans .env.local');
    }
    _supabase = createClient(url, key);
  }
  return _supabase;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return typeof email === 'string' && email.length <= 320 && EMAIL_RE.test(email.trim());
}

/**
 * Ajoute un email à la liste d'attente. Idempotent : un email déjà inscrit
 * renvoie alreadyRegistered=true au lieu d'échouer (contrainte unique en base).
 */
export async function addToWaitlist(email: string): Promise<{ alreadyRegistered: boolean }> {
  const normalized = email.trim().toLowerCase();
  const { error } = await getSupabase().from('waitlist_signups').insert({ email: normalized });
  if (error) {
    if (error.code === '23505') return { alreadyRegistered: true }; // violation de contrainte unique
    throw new Error('Inscription à la liste d’attente échouée.');
  }
  return { alreadyRegistered: false };
}
