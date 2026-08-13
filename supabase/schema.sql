-- =========================================================================
-- UseInstead MVP : waiting list, catalogue, requests et contributions.
-- À exécuter dans Supabase > SQL Editor > Run.
-- Les contributions et requests sont publiques après authentification Google.
-- La modération est volontairement hors périmètre du MVP initial.
-- La promotion admin reste une opération explicite dans SQL Editor.
-- =========================================================================

create extension if not exists pgcrypto;

create table if not exists profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url   text,
  role         text not null default 'user' check (role in ('user', 'admin')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

alter table profiles add column if not exists role text not null default 'user';
alter table profiles drop constraint if exists profiles_role_check;
alter table profiles add constraint profiles_role_check check (role in ('user', 'admin'));

alter table profiles enable row level security;

-- L’admin est piloté par le rôle du profil, jamais par un contrôle visuel côté client.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- Le rôle ne peut jamais être augmenté depuis l’espace utilisateur. La
-- promotion initiale doit être faite manuellement par le propriétaire du
-- projet dans SQL Editor.
create or replace function public.current_profile_role()
returns text
language sql
stable
security definer set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

revoke all on function public.current_profile_role() from public;
grant execute on function public.current_profile_role() to authenticated;

create or replace function public.prevent_profile_role_escalation()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if new.role is distinct from old.role and not public.is_admin() then
    raise exception 'profile role changes require an existing admin';
  end if;
  return new;
end;
$$;

drop trigger if exists protect_profile_role on profiles;
create trigger protect_profile_role
before update on profiles
for each row execute procedure public.prevent_profile_role_escalation();
drop policy if exists "profiles_owner_read" on profiles;
create policy "profiles_owner_read" on profiles
  for select to authenticated
  using (auth.uid() = id);

drop policy if exists "profiles_owner_update" on profiles;
create policy "profiles_owner_update" on profiles
  for update to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id and role = public.current_profile_role());

drop policy if exists "profiles_admin_read" on profiles;
create policy "profiles_admin_read" on profiles
  for select to authenticated
  using (public.is_admin());


create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create table if not exists waitlist_signups (
  id         bigserial primary key,
  email      text not null unique,
  created_at timestamptz default now()
);

create index if not exists waitlist_signups_created_at_idx
  on waitlist_signups (created_at desc);

create table if not exists alternative_pairs (
  id                         uuid primary key default gen_random_uuid(),
  paid_name                  text not null,
  paid_url                   text not null,
  paid_description           text not null,
  paid_price                 text not null,
  alternative_name           text not null,
  alternative_url            text not null,
  alternative_description    text not null,
  alternative_type           text not null,
  category                   text not null,
  tags                       text[] not null default '{}',
  limits                     text[] not null default '{}',
  platforms                  text[] not null default '{}',
  created_by                 uuid references auth.users(id) on delete set null,
  created_at                 timestamptz not null default now(),
  updated_at                 timestamptz not null default now()
);

create index if not exists alternative_pairs_category_idx
  on alternative_pairs (category);
create index if not exists alternative_pairs_created_at_idx
  on alternative_pairs (created_at desc);

create table if not exists requests (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null,
  category    text not null,
  created_by  uuid not null references auth.users(id) on delete cascade,
  created_at  timestamptz not null default now()
);

create index if not exists requests_created_at_idx
  on requests (created_at desc);

create table if not exists request_comments (
  id         uuid primary key default gen_random_uuid(),
  request_id uuid not null references requests(id) on delete cascade,
  body       text not null,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists request_comments_request_idx
  on request_comments (request_id, created_at asc);

create table if not exists request_proposals (
  id               uuid primary key default gen_random_uuid(),
  request_id       uuid not null references requests(id) on delete cascade,
  alternative_name text not null,
  alternative_url  text not null,
  explanation      text not null,
  created_by       uuid not null references auth.users(id) on delete cascade,
  created_at       timestamptz not null default now()
);

create index if not exists request_proposals_request_idx
  on request_proposals (request_id, created_at asc);

alter table alternative_pairs enable row level security;
alter table requests enable row level security;
alter table request_comments enable row level security;
alter table request_proposals enable row level security;

 drop policy if exists "catalogue_public_read" on alternative_pairs;
create policy "catalogue_public_read" on alternative_pairs
  for select using (true);

 drop policy if exists "catalogue_authenticated_insert" on alternative_pairs;
create policy "catalogue_authenticated_insert" on alternative_pairs
  for insert to authenticated
  with check (auth.uid() = created_by);

 drop policy if exists "catalogue_owner_update" on alternative_pairs;
create policy "catalogue_owner_update" on alternative_pairs
  for update to authenticated
  using (auth.uid() = created_by)
  with check (auth.uid() = created_by);

 drop policy if exists "catalogue_owner_delete" on alternative_pairs;
create policy "catalogue_owner_delete" on alternative_pairs
  for delete to authenticated
  using (auth.uid() = created_by);

drop policy if exists "catalogue_admin_update" on alternative_pairs;
create policy "catalogue_admin_update" on alternative_pairs
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "catalogue_admin_delete" on alternative_pairs;
create policy "catalogue_admin_delete" on alternative_pairs
  for delete to authenticated
  using (public.is_admin());

 drop policy if exists "requests_public_read" on requests;
create policy "requests_public_read" on requests
  for select using (true);

 drop policy if exists "requests_authenticated_insert" on requests;
create policy "requests_authenticated_insert" on requests
  for insert to authenticated
  with check (auth.uid() = created_by);

 drop policy if exists "requests_owner_update" on requests;
create policy "requests_owner_update" on requests
  for update to authenticated
  using (auth.uid() = created_by)
  with check (auth.uid() = created_by);

 drop policy if exists "requests_owner_delete" on requests;
create policy "requests_owner_delete" on requests
  for delete to authenticated
  using (auth.uid() = created_by);

drop policy if exists "requests_admin_update" on requests;
create policy "requests_admin_update" on requests
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "requests_admin_delete" on requests;
create policy "requests_admin_delete" on requests
  for delete to authenticated
  using (public.is_admin());

 drop policy if exists "comments_public_read" on request_comments;
create policy "comments_public_read" on request_comments
  for select using (true);

 drop policy if exists "comments_authenticated_insert" on request_comments;
create policy "comments_authenticated_insert" on request_comments
  for insert to authenticated
  with check (auth.uid() = created_by);

 drop policy if exists "comments_owner_delete" on request_comments;
create policy "comments_owner_delete" on request_comments
  for delete to authenticated
  using (auth.uid() = created_by);

 drop policy if exists "proposals_public_read" on request_proposals;
create policy "proposals_public_read" on request_proposals
  for select using (true);

 drop policy if exists "proposals_authenticated_insert" on request_proposals;
create policy "proposals_authenticated_insert" on request_proposals
  for insert to authenticated
  with check (auth.uid() = created_by);

 drop policy if exists "proposals_owner_delete" on request_proposals;
create policy "proposals_owner_delete" on request_proposals
  for delete to authenticated
  using (auth.uid() = created_by);
