# Alternative.IO — Landing page & liste d'attente

Landing page Next.js pour valider l'intérêt avant de construire le produit décrit
dans [`PRD.md`](./PRD.md) : un catalogue communautaire d'alternatives gratuites,
freemium, open source ou auto-hébergées aux outils payants.

## Mise en route

### 1. Installer les dépendances
```bash
npm install
```

### 2. Créer le projet Supabase (pour stocker les emails de la liste d'attente)
1. Sur [supabase.com](https://supabase.com), crée un projet (plan gratuit).
2. **SQL Editor** → **New query** → colle le contenu de `supabase/schema.sql` → **Run**.
3. **Project Settings → API** → note :
   - **Project URL** → `SUPABASE_URL`
   - clé **`service_role`** (secrète) → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Variables d'environnement
Crée un fichier `.env.local` :
```bash
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### 4. Lancer en local
```bash
npm run dev           # http://localhost:3000
```

### 5. Déployer sur Vercel
1. Pousse le repo sur GitHub (déjà fait si tu lis ce fichier depuis GitHub).
2. Sur [vercel.com](https://vercel.com) → **Import Project** → sélectionne le repo.
3. Dans **Environment Variables**, ajoute `SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY` → **Deploy**.

## Structure

| Fichier | Rôle |
|---|---|
| `app/page.tsx` | Landing page (hero, bénéfices, comment ça marche, CTA) |
| `components/WaitlistForm.tsx` | Formulaire d'inscription (client) avec honeypot anti-spam |
| `app/api/waitlist/route.ts` | Route API qui valide et enregistre l'email |
| `lib/supabase.ts` | Client Supabase + validation email + insertion idempotente |
| `supabase/schema.sql` | Table `waitlist_signups` |
| `PRD.md` | Spécification produit complète du MVP à construire ensuite |

## Personnaliser le texte

Tout le contenu éditorial (accroche, bénéfices, étapes) est dans `app/page.tsx`,
dans les tableaux `FEATURES` et `STEPS` en haut du fichier — facile à modifier
sans toucher au reste.

## Consulter les emails inscrits

Dans Supabase → **Table Editor** → `waitlist_signups`, ou via SQL :
```sql
select email, created_at from waitlist_signups order by created_at desc;
```
