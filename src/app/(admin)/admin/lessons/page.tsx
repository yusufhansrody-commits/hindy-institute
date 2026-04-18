import { LessonImportForm } from '@/components/admin/LessonImportForm';
import Link from 'next/link';

export default function AdminLessonsPage() {
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
        Lessons
      </h1>
      <p style={{ color: 'var(--text-mid)', marginBottom: '20px', maxWidth: '560px', lineHeight: 1.7 }}>
        Core lesson shell (video, quiz bank, XP) still comes from{' '}
        <code style={{ fontSize: '0.85em' }}>src/data/*-curriculum.ts</code>. You can attach an optional{' '}
        <strong>imported JSON pack</strong> per lesson in Supabase (objectives, slides, etc.) — learners see it on the
        lesson page after you run the <code style={{ fontSize: '0.85em' }}>lesson_imports</code> migration.
      </p>
      <LessonImportForm />
      <ul style={{ color: 'var(--text-dark)', lineHeight: 1.8, paddingLeft: '20px' }}>
        <li>
          <Link href="/learn/abc" style={{ color: 'var(--navy)', fontWeight: 600 }}>
            Arabic ABC&apos;s
          </Link>{' '}
          (learner view)
        </li>
        <li>
          <Link href="/learn/mastery" style={{ color: 'var(--navy)', fontWeight: 600 }}>
            Arabic Mastery
          </Link>{' '}
          (learner view)
        </li>
      </ul>
      <p style={{ marginTop: '28px', fontSize: '0.85rem', color: 'var(--text-light)' }}>
        <Link href="/admin" style={{ color: 'var(--navy)' }}>
          ← Overview
        </Link>
      </p>
    </div>
  );
}
