-- Run in Supabase SQL Editor (or supabase db push) after linking the project.
-- Creates profiles (with auth trigger), lesson_completions, RLS, and role immutability for normal users.

-- ── Profiles ───────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  role text not null default 'learner' check (role in ('learner', 'instructor', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_email_idx on public.profiles (lower(email));

-- New signups get a profile row
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    nullif(
      trim(both ' ' from coalesce(new.raw_user_meta_data->>'first_name', '') || ' ' ||
      coalesce(new.raw_user_meta_data->>'last_name', '')),
      ''
    ),
    'learner'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Learners cannot escalate role via the API (service role / SQL still can)
create or replace function public.profiles_lock_role_for_users()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'update' and new.role is distinct from old.role and auth.uid() is not null then
    new.role := old.role;
  end if;
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists profiles_lock_role on public.profiles;
create trigger profiles_lock_role
  before update on public.profiles
  for each row execute function public.profiles_lock_role_for_users();

-- ── Lesson completions ─────────────────────────────────────────────────────
create table if not exists public.lesson_completions (
  user_id uuid not null references public.profiles (id) on delete cascade,
  program text not null check (program in ('abc', 'mastery')),
  lesson_id integer not null check (lesson_id > 0),
  completed_at timestamptz not null default now(),
  primary key (user_id, program, lesson_id)
);

create index if not exists lesson_completions_user_program_idx
  on public.lesson_completions (user_id, program);

-- ── RLS ───────────────────────────────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.lesson_completions enable row level security;

drop policy if exists "profiles_select_own_or_staff" on public.profiles;
create policy "profiles_select_own_or_staff"
  on public.profiles for select
  using (
    id = (select auth.uid())
    or exists (
      select 1 from public.profiles p
      where p.id = (select auth.uid())
        and p.role in ('instructor', 'admin')
    )
  );

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

drop policy if exists "lesson_completions_select_own_or_staff" on public.lesson_completions;
create policy "lesson_completions_select_own_or_staff"
  on public.lesson_completions for select
  using (
    user_id = (select auth.uid())
    or exists (
      select 1 from public.profiles p
      where p.id = (select auth.uid())
        and p.role in ('instructor', 'admin')
    )
  );

drop policy if exists "lesson_completions_insert_own" on public.lesson_completions;
create policy "lesson_completions_insert_own"
  on public.lesson_completions for insert
  with check (user_id = (select auth.uid()));

drop policy if exists "lesson_completions_delete_own" on public.lesson_completions;
create policy "lesson_completions_delete_own"
  on public.lesson_completions for delete
  using (user_id = (select auth.uid()));

-- Backfill profiles for users created before this migration (run once)
insert into public.profiles (id, email, full_name, role)
select u.id, u.email, null, 'learner'
from auth.users u
where not exists (select 1 from public.profiles p where p.id = u.id)
on conflict (id) do nothing;
