import { getSupabase } from '@/lib/supabase';

const recentSubmissions = new Map<string, number>();
const MAX_TEXT = 2000;

function text(value: unknown, max = MAX_TEXT) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function validUrl(value: string) {
  if (!value) return true;
  try { const url = new URL(value); return url.protocol === 'https:' || url.protocol === 'http:'; } catch { return false; }
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now = Date.now();
  const last = recentSubmissions.get(ip) ?? 0;
  if (now - last < 20_000) return Response.json({ error: 'Attends quelques secondes avant de renvoyer une proposition.' }, { status: 429 });
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return Response.json({ error: 'Requête invalide.' }, { status: 400 }); }
  if (text(body.company, 100)) return Response.json({ ok: true });
  const alternativeName = text(body.alternative_name, 160);
  const alternativeUrl = text(body.alternative_url, 500);
  const alternativeDescription = text(body.alternative_description, 1000);
  const alternativeType = text(body.alternative_type, 40);
  const category = text(body.category, 80);
  const tags = Array.isArray(body.tags) ? body.tags.map((tag) => text(tag, 40)).filter(Boolean).slice(0, 20) : [];
  const products = Array.isArray(body.paid_products) ? body.paid_products.slice(0, 8).map((product) => ({
    name: text((product as Record<string, unknown>).name, 160),
    url: text((product as Record<string, unknown>).url, 500),
    description: text((product as Record<string, unknown>).description, 1000),
    price: text((product as Record<string, unknown>).price, 60),
    amount: Number((product as Record<string, unknown>).amount),
    currency: text((product as Record<string, unknown>).currency, 3),
    billing: text((product as Record<string, unknown>).billing, 10),
  })) : [];
  if (!alternativeName || !alternativeDescription || !category || !products.length || products.some((product) => !product.name || !product.description || !validUrl(product.url) || !Number.isFinite(product.amount) || product.amount < 0)) return Response.json({ error: 'Complète les champs obligatoires avec des valeurs valides.' }, { status: 400 });
  if (!validUrl(alternativeUrl)) return Response.json({ error: 'L’URL de l’alternative est invalide.' }, { status: 400 });
  recentSubmissions.set(ip, now);
  const first = products[0];
  const { error } = await getSupabase().from('alternative_pairs').insert({
    paid_name: first.name, paid_url: first.url, paid_description: first.description, paid_price: first.price,
    paid_price_amount: first.amount, paid_currency: first.currency, paid_billing_period: first.billing,
    paid_products: products, alternative_name: alternativeName, alternative_url: alternativeUrl,
    alternative_description: alternativeDescription, alternative_type: alternativeType, category, tags,
    limits: [], platforms: [], created_by: null, status: 'pending',
  } as never);
  if (error) return Response.json({ error: 'La proposition n’a pas pu être enregistrée.' }, { status: 503 });
  return Response.json({ ok: true, message: 'Proposition reçue. Elle sera visible après validation.' });
}
