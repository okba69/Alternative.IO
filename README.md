# UseInstead

UseInstead est un catalogue communautaire d’alternatives aux outils payants. Le MVP permet de rechercher des comparaisons, filtrer le catalogue, consulter les requests, proposer une alternative et accéder à un espace utilisateur.

## Développement local

```bash
npm install
npm run dev
```

L’application est ensuite disponible sur `http://localhost:3000`.

## Configuration Supabase

1. Créer ou sélectionner le projet Supabase.
2. Exécuter [`supabase/schema.sql`](./supabase/schema.sql) dans SQL Editor.
3. Configurer Google dans Supabase Auth avec l’URL de callback suivante :

```text
https://useinstead.xyz/auth/callback
```

Variables publiques nécessaires au navigateur :

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

La route serveur de liste d’attente utilise séparément les variables serveur déjà prévues :

```text
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
```

La clé `SUPABASE_SERVICE_ROLE_KEY` est strictement serveur. Elle ne doit jamais être exposée dans le navigateur, le dépôt ou les logs.

## Tests et validation

```bash
npm test
npm run lint
npm run build
git diff --check
```

## Structure principale

| Chemin | Rôle |
|---|---|
| `app/page.tsx` | Accueil et exploration du catalogue |
| `app/catalogue` | Catalogue complet et détails des comparaisons |
| `app/requests` | Requests et détails des demandes |
| `app/account` | Espace utilisateur authentifié |
| `app/admin` | Espace administrateur protégé par le rôle Supabase |
| `app/auth/callback` | Retour OAuth Google |
| `components` | Interfaces Catalogue, Requests, Auth, compte et admin |
| `lib` | Clients Supabase, modèles et règles métier |
| `supabase/schema.sql` | Tables, rôles, fonction admin et politiques RLS |
| `tests` | Tests de catalogue, requests, accès et pages secondaires |

Les fichiers `.env*` sont ignorés par Git. Ne jamais committer de secret.