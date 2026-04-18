-- Fixes "infinite recursion detected in policy for relation \"profiles\"".
-- The original policies referenced profiles inside a policy on profiles.
-- Replace those sub-queries with a SECURITY DEFINER helper that bypasses RLS.

create or replace function public.is_staff(uid uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = uid
      and role in ('instructor', 'admin')
  );
$$;

grant execute on function public.is_staff(uuid) to authenticated, anon;

-- ── profiles ───────────────────────────────────────────────────────────────
drop policy if exists "profiles_select_own_or_staff" on public.profiles;
create policy "profiles_select_own_or_staff"
  on public.profiles for select
  using (
    id = (select auth.uid())
    or public.is_staff((select auth.uid()))
  );

-- ── lesson_completions ────────────────────────────────────────────────────
drop policy if exists "lesson_completions_select_own_or_staff" on public.lesson_completions;
create policy "lesson_completions_select_own_or_staff"
  on public.lesson_completions for select
  using (
    user_id = (select auth.uid())
    or public.is_staff((select auth.uid()))
  );

-- ── lesson_imports (staff-only writes) ────────────────────────────────────
drop policy if exists "lesson_imports_insert_staff" on public.lesson_imports;
create policy "lesson_imports_insert_staff"
  on public.lesson_imports for insert to authenticated
  with check (public.is_staff((select auth.uid())));

drop policy if exists "lesson_imports_update_staff" on public.lesson_imports;
create policy "lesson_imports_update_staff"
  on public.lesson_imports for update to authenticated
  using (public.is_staff((select auth.uid())))
  with check (public.is_staff((select auth.uid())));

drop policy if exists "lesson_imports_delete_staff" on public.lesson_imports;
create policy "lesson_imports_delete_staff"
  on public.lesson_imports for delete to authenticated
  using (public.is_staff((select auth.uid())));
