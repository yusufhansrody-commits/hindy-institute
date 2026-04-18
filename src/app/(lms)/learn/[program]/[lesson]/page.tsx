import { GreetingExposureMap } from '@/components/lesson/GreetingExposureMap';
import { ImportedLessonSection } from '@/components/lesson/ImportedLessonSection';
import { MarkLessonCompleteButton } from '@/components/lesson/MarkLessonCompleteButton';
import { ArabicText } from '@/components/arabic/ArabicText';
import { VocabCard } from '@/components/arabic/VocabCard';
import { LessonStepper } from '@/components/lesson/LessonStepper';
import { ABC_CURRICULUM } from '@/data/abc-curriculum';
import { MASTERY_CURRICULUM } from '@/data/mastery-curriculum';
import { fetchLessonImportPayload } from '@/lib/lesson-imports/fetch-import';
import { createClient } from '@/lib/supabase/server';
import { fetchCompletedLessonIds } from '@/lib/progress/lesson-completions';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type LessonPageProps = {
  params: Promise<{ program: string; lesson: string }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { program, lesson } = await params;
  const lessonId = Number(lesson);
  const isAbc = program === 'abc';
  const lessons = isAbc ? ABC_CURRICULUM : MASTERY_CURRICULUM;
  const entry = lessons.find((item) => item.id === lessonId);

  if (!entry) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const prog = isAbc ? 'abc' : 'mastery';
  const lessonImport = await fetchLessonImportPayload(supabase, prog, lessonId);
  const completedIds = user ? await fetchCompletedLessonIds(user.id, prog) : new Set<number>();
  const completedCount = completedIds.size;
  const totalLessons = lessons.length;
  const pct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const isCurrentLessonDone = completedIds.has(lessonId);
  const prevLesson = lessonId > 1 ? lessonId - 1 : null;
  const nextLesson = lessonId < totalLessons ? lessonId + 1 : null;

  const steps = isAbc
    ? ['🎬 Video', '🎯 Slides', '🔤 Letter Forms', '🎧 Listening', '🗣️ Speaking', '❓ Quiz']
    : ['🎬 Video', '🎯 Slides', '📖 Vocabulary', '📄 Reading', '📐 Grammar', '🎧 Listening', '🗣️ Speaking', '❓ Quiz'];

  const previewVocab = 'vocab' in entry ? entry.vocab.slice(0, 6) : [];

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

        {lessons.map((l) => {
          const isCompleted = completedIds.has(l.id);
          const isCurrent = l.id === lessonId;
          return (
            <Link
              key={l.id}
              href={`/learn/${program}/${l.id}`}
              className={`sidebar-lesson ${isCurrent ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              style={{ textDecoration: 'none' }}
            >
              <div className={`lesson-status ${isCompleted ? 'done' : isCurrent ? 'current' : ''}`}>
                {isCompleted ? '✓' : l.id}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: isCurrent ? 600 : 400, color: 'inherit' }}>
                  {l.title}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', marginTop: '2px' }}>
                  {l.xp} XP
                </div>
              </div>
            </Link>
          );
        })}
      </aside>

      {/* Main lesson area */}
      <main className="lms-main">
        {/* Lesson Panel */}
        <div className="lesson-panel">
          <div className="lesson-panel-header">
            <div className="lesson-panel-step">
              {program.toUpperCase()} · Lesson {entry.id} of {totalLessons}
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '20px' }}>
              <div>
                <div className="lesson-panel-title">{entry.title}</div>
                <ArabicText style={{ fontSize: '1.6rem', color: 'var(--gold-light)', marginTop: '8px', display: 'block' }}>
                  {entry.arabic}
                </ArabicText>
              </div>
              <span
                style={{
                  background: 'rgba(200,151,42,0.2)',
                  border: '1px solid rgba(200,151,42,0.4)',
                  color: 'var(--gold-light)',
                  padding: '6px 14px',
                  borderRadius: '100px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                +{entry.xp} XP
              </span>
            </div>
            {entry.desc && (
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginTop: '12px', lineHeight: 1.6 }}>
                {entry.desc}
              </p>
            )}
          </div>

          <div className="lesson-panel-body">
            {lessonImport ? <ImportedLessonSection payload={lessonImport} /> : null}

            {/* Steps */}
            <div style={{ marginBottom: '32px' }}>
              <LessonStepper steps={steps} />
            </div>

            {/* Vocabulary Preview (Mastery only) */}
            {!isAbc && previewVocab.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontFamily: 'var(--font-cormorant, Cormorant Garamond, serif)', fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '16px' }}>
                  📖 Vocabulary
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                  {previewVocab.map((word) => (
                    <VocabCard key={word.ar} word={word} />
                  ))}
                </div>
              </div>
            )}

            {/* ABC Letter Forms */}
            {!isAbc && lessonId === 1 && (
              <div style={{ marginBottom: '32px' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-cormorant, Cormorant Garamond, serif)',
                    fontSize: '1.4rem',
                    color: 'var(--navy)',
                    marginBottom: '12px',
                  }}
                >
                  🗺️ Regional greetings map
                </h2>
                <p style={{ color: 'var(--text-mid)', fontSize: '0.9rem', marginBottom: '16px', lineHeight: 1.55 }}>
                  MSA is the focus of this course; tap a region to hear a sample. Dialect phrases are for exposure
                  only — you will not be tested on them.
                </p>
                <GreetingExposureMap />
              </div>
            )}

            {isAbc && 'letterForms' in entry && entry.letterForms.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontFamily: 'var(--font-cormorant, Cormorant Garamond, serif)', fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '16px' }}>
                  🔤 Letter Forms
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
                  {entry.letterForms.map((lf) => (
                    <div
                      key={lf.name}
                      style={{
                        background: 'white',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        padding: '16px',
                        textAlign: 'center',
                        boxShadow: 'var(--shadow)',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: 'var(--font-noto-naskh-arabic, Noto Naskh Arabic, serif)',
                          fontSize: '2rem',
                          color: 'var(--navy)',
                          direction: 'rtl',
                          marginBottom: '8px',
                        }}
                      >
                        {lf.end} {lf.mid} {lf.beg}
                      </div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--navy)' }}>{lf.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>{lf.sound} · /{lf.iso}/</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
              <MarkLessonCompleteButton
                program={program}
                lessonId={lessonId}
                defaultCompleted={isCurrentLessonDone}
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="step-nav" style={{ justifyContent: 'space-between' }}>
            <div>
              {prevLesson && (
                <Link href={`/learn/${program}/${prevLesson}`} className="btn btn-ghost btn-sm">
                  ← Lesson {prevLesson}
                </Link>
              )}
            </div>
            <Link href={`/learn/${program}`} style={{ fontSize: '0.82rem', color: 'var(--text-light)', textDecoration: 'none' }}>
              Back to course
            </Link>
            <div>
              {nextLesson && (
                <Link href={`/learn/${program}/${nextLesson}`} className="btn btn-primary btn-sm">
                  Lesson {nextLesson} →
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
