import { getSupabase } from '@/lib/supabase';

const recentRequests = new Map<string, number>();

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  if (now - (recentRequests.get(ip) ?? 0) < 20_000) return Response.json({ error: 'Attends quelques secondes avant de renvoyer une demande.' }, { status: 429 });
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return Response.json({ error: 'Requête invalide.' }, { status: 400 }); }
  if (typeof body.company === 'string' && body.company.trim()) return Response.json({ ok: true });
  const title = typeof body.title === 'string' ? body.title.trim().slice(0, 160) : '';
  const description = typeof body.description === 'string' ? body.description.trim().slice(0, 2000) : '';
  const category = typeof body.category === 'string' ? body.category.trim().slice(0, 80) : '';
  if (!title || !description || !category) return Response.json({ error: 'Complète les champs obligatoires.' }, { status: 400 });
  recentRequests.set(ip, now);
  const { error } = await getSupabase().from('requests').insert({ title, description, category, created_by: null, status: 'pending' } as never);
  if (error) return Response.json({ error: 'La demande n’a pas pu être enregistrée.' }, { status: 503 });
  return Response.json({ ok: true });
}
