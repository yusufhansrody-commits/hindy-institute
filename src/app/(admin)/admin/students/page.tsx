import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

type ProfileRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: string;
  created_at: string;
};

export default async function AdminStudentsPage() {
  const supabase = await createClient();
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id, email, full_name, role, created_at')
    .order('created_at', { ascending: false });

  const { data: completions } = await supabase.from('lesson_completions').select('user_id');

  const countByUser = new Map<string, number>();
  for (const row of completions ?? []) {
    const uid = (row as { user_id: string }).user_id;
    countByUser.set(uid, (countByUser.get(uid) ?? 0) + 1);
  }

  const rows = (profiles ?? []) as ProfileRow[];

  return (
    <div>
      <h1
        style={{
          fontFamily: 'var(--font-cormorant, Cormorant Garamond, serif)',
          fontSize: '2rem',
          fontWeight: 700,
          color: 'var(--navy)',
          marginBottom: '8px',
        }}
      >
        Students
      </h1>
      <p style={{ color: 'var(--text-mid)', marginBottom: '24px' }}>
        Everyone with an account. Lesson completions are counted across ABC&apos;s and Mastery.
      </p>

      {profilesError ? (
        <p style={{ color: 'var(--error)' }}>Could not load profiles. Apply the SQL migration in Supabase if you haven&apos;t yet.</p>
      ) : null}

      <div
        style={{
          background: 'white',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          overflow: 'auto',
          boxShadow: 'var(--shadow)',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', background: 'var(--cream)' }}>
              <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--navy)' }}>Email</th>
              <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--navy)' }}>Name</th>
              <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--navy)' }}>Role</th>
              <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--navy)' }}>Lessons done</th>
              <th style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--navy)' }}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px 16px', color: 'var(--text-dark)' }}>{p.email ?? '—'}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-mid)' }}>{p.full_name?.trim() || '—'}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '2px 10px',
                      borderRadius: '100px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      background:
                        p.role === 'instructor' || p.role === 'admin' ? 'rgba(200,151,42,0.2)' : 'rgba(10,22,40,0.06)',
                      color: 'var(--navy)',
                    }}
                  >
                    {p.role}
                  </span>
                </td>
                <td style={{ padding: '12px 16px', color: 'var(--text-dark)' }}>{countByUser.get(p.id) ?? 0}</td>
                <td style={{ padding: '12px 16px', color: 'var(--text-light)', whiteSpace: 'nowrap' }}>
                  {p.created_at ? new Date(p.created_at).toLocaleDateString() : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && !profilesError ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-light)' }}>No profiles yet.</div>
        ) : null}
      </div>

      <p style={{ marginTop: '20px', fontSize: '0.85rem', color: 'var(--text-light)' }}>
        <Link href="/admin" style={{ color: 'var(--navy)' }}>
          ← Overview
        </Link>
      </p>
    </div>
  );
}
