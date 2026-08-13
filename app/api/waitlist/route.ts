import { addToWaitlist, isValidEmail } from '@/lib/supabase';

export async function POST(req: Request) {
  let body: { email?: string; company?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Corps de requête invalide.' }, { status: 400 });
  }

  // Honeypot anti-spam : un champ "company" rempli signale un bot,
  // on répond succès sans rien enregistrer.
  if (body.company) {
    return Response.json({ ok: true });
  }

  const email = (body.email ?? '').trim();
  if (!isValidEmail(email)) {
    return Response.json({ error: 'Adresse email invalide.' }, { status: 400 });
  }

  try {
    const { alreadyRegistered } = await addToWaitlist(email);
    return Response.json({ ok: true, alreadyRegistered });
  } catch (e) {
    return Response.json({ error: (e as Error).message }, { status: 500 });
  }
}
