-- Optional JSON lesson packs (imported from admin). Readable by anyone with anon key; writes restricted to staff.

create table if not exists public.lesson_imports (
  program text not null check (program in ('abc', 'mastery')),
  lesson_id integer not null check (lesson_id > 0),
  payload jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (program, lesson_id)
);

create index if not exists lesson_imports_updated_idx on public.lesson_imports (updated_at desc);

alter table public.lesson_imports enable row level security;

drop policy if exists "lesson_imports_select_all" on public.lesson_imports;
create policy "lesson_imports_select_all"
  on public.lesson_imports for select
  using (true);

drop policy if exists "lesson_imports_insert_staff" on public.lesson_imports;
create policy "lesson_imports_insert_staff"
  on public.lesson_imports for insert to authenticated
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = (select auth.uid())
        and p.role in ('instructor', 'admin')
    )
  );

drop policy if exists "lesson_imports_update_staff" on public.lesson_imports;
create policy "lesson_imports_update_staff"
  on public.lesson_imports for update to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = (select auth.uid())
        and p.role in ('instructor', 'admin')
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = (select auth.uid())
        and p.role in ('instructor', 'admin')
    )
  );

drop policy if exists "lesson_imports_delete_staff" on public.lesson_imports;
create policy "lesson_imports_delete_staff"
  on public.lesson_imports for delete to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = (select auth.uid())
        and p.role in ('instructor', 'admin')
    )
  );
