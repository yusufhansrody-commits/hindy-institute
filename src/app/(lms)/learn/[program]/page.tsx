import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ABC_CURRICULUM } from '@/data/abc-curriculum';
import { MASTERY_CURRICULUM } from '@/data/mastery-curriculum';
import { fetchCompletedLessonIds } from '@/lib/progress/lesson-completions';
import { createClient } from '@/lib/supabase/server';

type ProgramPageProps = {
  params: Promise<{ program: string }>;
};

export default async function ProgramLessonsPage({ params }: ProgramPageProps) {
  const { program } = await params;
  if (program !== 'abc' && program !== 'mastery') {
    notFound();
  }
  const isAbc = program === 'abc';
  const lessons = isAbc ? ABC_CURRICULUM : MASTERY_CURRICULUM;
  const totalLessons = lessons.length;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const prog = isAbc ? 'abc' : 'mastery';
  const completedIds = user ? await fetchCompletedLessonIds(user.id, prog) : new Set<number>();
  const completedCount = completedIds.size;
  const pct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const firstIncomplete = lessons.find((l) => !completedIds.has(l.id));
  const resumeLessonId = firstIncomplete?.id ?? lessons[lessons.length - 1]!.id;

  return (
    <div className="lms-layout">
      {/* Sidebar */}
      <aside className="lms-sidebar">
        <div className="sidebar-header">
          <div className={`sidebar-course-badge ${isAbc ? 'abc' : 'mastery'}`}>
            {isAbc ? '📖 Foundation' : '🌟 Advanced'}
          </div>
          <div className="sidebar-course-title">
            {isAbc ? "Arabic ABC's" : 'Arabic Mastery'}
          </div>
          <div className="sidebar-progress-wrap">
            <div className="sidebar-prog-bar">
              <div className="sidebar-prog-fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="sidebar-prog-label">{completedCount} of {totalLessons} lessons complete</div>
          </div>
        </div>

        {/* Lesson list */}
        <div>
          {lessons.map((lesson) => {
            const isCompleted = completedIds.has(lesson.id);
            const isCurrent = lesson.id === resumeLessonId;
            return (
              <Link
                key={lesson.id}
                href={`/learn/${program}/${lesson.id}`}
                className={`sidebar-lesson ${isCurrent ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                style={{ textDecoration: 'none' }}
              >
                <div className={`lesson-status ${isCompleted ? 'done' : isCurrent ? 'current' : ''}`}>
                  {isCompleted ? '✓' : lesson.id}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: isCurrent ? 600 : 400 }}>
                    {lesson.title}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', marginTop: '2px' }}>
                    {lesson.xp} XP
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Main area */}
      <main className="lms-main" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 68px)', padding: '40px 24px' }}>
        <div style={{ maxWidth: '560px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>
            {isAbc ? '📖' : '🌟'}
          </div>
          <h1 style={{ fontFamily: 'var(--font-cormorant, Cormorant Garamond, serif)', fontSize: '2rem', color: 'var(--navy)', marginBottom: '12px' }}>
            {isAbc ? "Arabic ABC's" : 'Arabic Mastery'}
          </h1>
          <p style={{ color: 'var(--text-mid)', marginBottom: '32px', lineHeight: 1.7 }}>
            {isAbc
              ? 'Master all 28 Arabic letters, vowels and Tajweed rules. Select a lesson from the sidebar to begin.'
              : 'Build full conversational fluency through structured lessons. Select a lesson from the sidebar to begin.'}
          </p>
          <Link href={`/learn/${program}/${resumeLessonId}`} className="btn btn-primary btn-lg">
            {completedCount > 0 ? 'Continue' : 'Start'} lesson {resumeLessonId} →
          </Link>
        </div>
      </main>
    </div>
  );
}
