import type { User } from '@supabase/supabase-js';

export function displayNameFromUser(user: User | null): string {
  if (!user) return 'Student';
  const meta = user.user_metadata as Record<string, string | undefined>;
  const first = meta.first_name?.trim();
  const last = meta.last_name?.trim();
  if (first && last) return `${first} ${last}`;
  if (first) return first;
  const email = user.email;
  if (email) return email.split('@')[0] ?? 'Student';
  return 'Student';
}

export function initialsFromUser(user: User | null): string {
  if (!user) return 'S';
  const meta = user.user_metadata as Record<string, string | undefined>;
  const first = meta.first_name?.trim();
  const last = meta.last_name?.trim();
  if (first && last) return `${first[0] ?? ''}${last[0] ?? ''}`.toUpperCase() || 'S';
  if (first) return (first[0] ?? 'S').toUpperCase();
  const email = user.email;
  if (email) return email[0]!.toUpperCase();
  return 'S';
}
