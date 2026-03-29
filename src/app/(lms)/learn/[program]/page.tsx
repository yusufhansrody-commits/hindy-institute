import Link from 'next/link';
import { ABC_CURRICULUM } from '@/data/abc-curriculum';
import { MASTERY_CURRICULUM } from '@/data/mastery-curriculum';

type ProgramPageProps = {
  params: Promise<{ program: string }>;
};

export default async function ProgramLessonsPage({ params }: ProgramPageProps) {
  const { program } = await params;
  const isAbc = program === 'abc';
  const lessons = isAbc ? ABC_CURRICULUM : MASTERY_CURRICULUM;
  const totalLessons = lessons.length;
  const completedLessons = 1; // mock
  const pct = Math.round((completedLessons / totalLessons) * 100);

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
            <div className="sidebar-prog-label">{completedLessons} of {totalLessons} lessons complete</div>
          </div>
        </div>

        {/* Lesson list */}
        <div>
          {lessons.map((lesson) => {
            const isCompleted = lesson.id < completedLessons;
            const isCurrent = lesson.id === completedLessons;
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
          <Link
            href={`/learn/${program}/${completedLessons}`}
            className="btn btn-primary btn-lg"
          >
            {completedLessons > 1 ? 'Continue' : 'Start'} Lesson {completedLessons} →
          </Link>
        </div>
      </main>
    </div>
  );
}
