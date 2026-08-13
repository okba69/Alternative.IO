-- =========================================================================
-- Table de liste d'attente pour la landing page Alternative.IO.
-- À exécuter dans Supabase → SQL Editor → New query → Run.
-- =========================================================================

create table if not exists waitlist_signups (
  id         bigserial primary key,
  email      text not null unique,
  created_at timestamptz default now()
);

create index if not exists waitlist_signups_created_at_idx
  on waitlist_signups (created_at desc);
