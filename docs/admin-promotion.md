# Promotion admin UseInstead

La promotion admin n’est pas exposée dans l’interface publique et aucun rôle
ne peut être augmenté depuis l’espace utilisateur. Le rôle est protégé par
RLS et par un trigger SQL.

Procédure contrôlée :

1. Se connecter une première fois avec Google pour créer le profil.
2. Ouvrir le SQL Editor du projet Supabase avec un compte propriétaire.
3. Identifier le compte cible dans `auth.users`.
4. Exécuter une mise à jour ciblée du profil en remplaçant la valeur entre
   crochets par l’identifiant vérifié :

```sql
update public.profiles
set role = 'admin', updated_at = now()
where id = '[UUID vérifié]';
```

5. Relire le rôle dans `public.profiles`, puis ouvrir `/admin` avec le compte
   concerné.

Cette opération ne nécessite aucun secret dans l’application. Ne pas ajouter
de clé service dans le navigateur, dans Git ou dans le fichier `.env.example`.