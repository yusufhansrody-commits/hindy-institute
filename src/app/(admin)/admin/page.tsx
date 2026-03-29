import { createClient } from '@/lib/supabase/server';

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
  const { count: completionCount } = await supabase
    .from('lesson_completions')
    .select('*', { count: 'exact', head: true });

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
        Overview
      </h1>
      <p style={{ color: 'var(--text-mid)', marginBottom: '32px', maxWidth: '560px', lineHeight: 1.6 }}>
        Instructor tools: review learners and (soon) edit published lessons. Promote staff in Supabase:{' '}
        <code style={{ fontSize: '0.85em' }}>update profiles set role = &apos;instructor&apos; where email = &apos;…&apos;;</code>
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
        <div
          style={{
            background: 'white',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: 'var(--shadow)',
          }}
        >
          <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Accounts
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--navy)', marginTop: '6px' }}>
            {userCount ?? '—'}
          </div>
        </div>
        <div
          style={{
            background: 'white',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: 'var(--shadow)',
          }}
        >
          <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Lesson completions
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--navy)', marginTop: '6px' }}>
            {completionCount ?? '—'}
          </div>
        </div>
      </div>
    </div>
  );
}
