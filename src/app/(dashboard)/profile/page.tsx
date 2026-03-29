import { SignOutButton } from '@/components/auth/SignOutButton';
import { displayNameFromUser, initialsFromUser } from '@/lib/auth/display-name';
import { ABC_CURRICULUM } from '@/data/abc-curriculum';
import { MASTERY_CURRICULUM } from '@/data/mastery-curriculum';
import { fetchAllCompletionsForUser } from '@/lib/progress/lesson-completions';
import { totalXpFromCompletions } from '@/lib/progress/total-xp';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const ACHIEVEMENTS = [
  { icon: '🌟', name: 'First Steps', earned: true, desc: 'Complete your first lesson' },
  { icon: '🔥', name: '7-Day Streak', earned: true, desc: 'Study 7 days in a row' },
  { icon: '📖', name: 'Reader', earned: true, desc: 'Read 5 Arabic texts' },
  { icon: '🏆', name: 'ABC Complete', earned: false, desc: 'Complete all ABC lessons' },
  { icon: '💬', name: 'First Speech', earned: false, desc: 'Submit your first recording' },
  { icon: '⚡', name: 'Speed Learner', earned: false, desc: 'Complete 3 lessons in one day' },
  { icon: '📚', name: 'Vocab Master', earned: false, desc: 'Learn 100+ vocabulary words' },
  { icon: '🎯', name: 'Perfect Score', earned: false, desc: 'Get 100% on a quiz' },
  { icon: '🌙', name: 'Night Owl', earned: false, desc: 'Study after midnight' },
];

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/profile');
  }

  const meta = user.user_metadata as Record<string, string | undefined>;
  const fullName = displayNameFromUser(user);
  const initials = initialsFromUser(user);
  const firstDefault = meta.first_name ?? '';
  const lastDefault = meta.last_name ?? '';

  const completions = await fetchAllCompletionsForUser(user.id);
  const totalXp = totalXpFromCompletions(completions);
  const lessonsDoneTotal = completions.length;

  const abcTotal = ABC_CURRICULUM.length;
  const masteryTotal = MASTERY_CURRICULUM.length;
  const abcIds = new Set(completions.filter((c) => c.program === 'abc').map((c) => c.lesson_id));
  const masteryIds = new Set(completions.filter((c) => c.program === 'mastery').map((c) => c.lesson_id));
  const abcDone = abcIds.size;
  const masteryDone = masteryIds.size;
  const abcPct = abcTotal ? Math.round((abcDone / abcTotal) * 100) : 0;
  const masteryPct = masteryTotal ? Math.round((masteryDone / masteryTotal) * 100) : 0;
  const abcResume = ABC_CURRICULUM.find((l) => !abcIds.has(l.id))?.id ?? (abcDone > 0 ? abcTotal : 0);
  const masteryResume =
    MASTERY_CURRICULUM.find((l) => !masteryIds.has(l.id))?.id ?? (masteryDone > 0 ? masteryTotal : 0);

  const courseRows = [
    {
      name: "Arabic ABC's",
      pct: abcPct,
      current: abcDone,
      total: abcTotal,
      href: '/learn/abc',
      resumeId: abcResume,
    },
    {
      name: 'Arabic Mastery',
      pct: masteryPct,
      current: masteryDone,
      total: masteryTotal,
      href: '/learn/mastery',
      resumeId: masteryResume,
    },
  ];

  const achievements = ACHIEVEMENTS.map((a) => {
    if (a.name === 'First Steps') return { ...a, earned: lessonsDoneTotal > 0 };
    if (a.name === 'ABC Complete') return { ...a, earned: abcTotal > 0 && abcDone >= abcTotal };
    return a;
  });

  return (
    <div style={{ background: 'var(--parchment)', minHeight: 'calc(100vh - 68px)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>

        <div className="profile-card">
          <div className="profile-header">
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at center, rgba(200,151,42,0.12), transparent 70%)',
                pointerEvents: 'none',
              }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div className="profile-avatar">{initials}</div>
              <div className="profile-name">{fullName}</div>
              <div className="profile-email">{user.email ?? ''}</div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(200,151,42,0.2)',
                  border: '1px solid rgba(200,151,42,0.35)',
                  color: 'var(--gold-light)',
                  padding: '4px 14px',
                  borderRadius: '100px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  marginTop: '10px',
                }}
              >
                🌱 Beginner
              </div>
              <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button type="button" className="btn btn-primary btn-sm">
                  ✏️ Edit Name
                </button>
                <Link href="/learn/abc" className="btn btn-outline-white btn-sm">Continue Learning →</Link>
                <SignOutButton
                  className="btn btn-ghost btn-sm"
                  style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem' }}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              borderTop: '1px solid var(--border)',
            }}
          >
            {[
              { num: totalXp.toLocaleString(), label: 'Total XP' },
              { num: '—', label: 'Day Streak 🔥' },
              { num: String(lessonsDoneTotal), label: 'Lessons Done' },
              { num: '—', label: 'Avg. Quiz Score' },
            ].map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: '20px 16px',
                  textAlign: 'center',
                  borderRight: i < 3 ? '1px solid var(--border)' : 'none',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-cormorant, Cormorant Garamond, serif)',
                    fontSize: '1.8rem',
                    fontWeight: 600,
                    color: 'var(--navy)',
                  }}
                >
                  {s.num}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-card">
          <div style={{ padding: '28px 32px' }}>
            <div
              style={{
                fontFamily: 'var(--font-cormorant, Cormorant Garamond, serif)',
                fontSize: '1.3rem',
                fontWeight: 700,
                color: 'var(--navy)',
                marginBottom: '24px',
              }}
            >
              👤 Account Details
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input className="form-input" type="text" placeholder="First name" defaultValue={firstDefault} />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input className="form-input" type="text" placeholder="Last name" defaultValue={lastDefault} />
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Email Address</label>
              <input
                className="form-input"
                type="email"
                defaultValue={user.email ?? ''}
                readOnly
                style={{ opacity: 0.85 }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div className="form-group">
                <label className="form-label">Native Language</label>
                <select className="form-input" defaultValue="English">
                  <option>English</option>
                  <option>Urdu</option>
                  <option>French</option>
                  <option>Turkish</option>
                  <option>Bengali</option>
                  <option>Indonesian</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Learning Goal</label>
                <select className="form-input" defaultValue="Read the Quran">
                  <option>Read the Quran</option>
                  <option>Travel to Arab countries</option>
                  <option>Connect with heritage</option>
                  <option>Academic / University</option>
                  <option>Business Arabic</option>
                  <option>General interest</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Bio (optional)</label>
              <textarea
                className="form-input"
                rows={2}
                placeholder="Tell us a bit about yourself…"
                style={{ resize: 'vertical' }}
              />
            </div>
            <button type="button" className="btn btn-primary btn-sm">Save Changes</button>
          </div>
        </div>

        <div className="profile-card">
          <div style={{ padding: '28px 32px' }}>
            <div
              style={{
                fontFamily: 'var(--font-cormorant, Cormorant Garamond, serif)',
                fontSize: '1.3rem',
                fontWeight: 700,
                color: 'var(--navy)',
                marginBottom: '24px',
              }}
            >
              📚 Course Progress
            </div>
            {courseRows.map((course) => (
              <div key={course.name} className="prog-course">
                <div className="prog-course-header">
                  <div className="prog-course-name">{course.name}</div>
                  <div className="prog-course-pct">{course.pct}%</div>
                </div>
                <div className="prog-bar">
                  <div className="prog-fill" style={{ width: `${course.pct}%` }} />
                </div>
                <div className="prog-lesson-label">
                  {course.current === 0
                    ? 'Not started'
                    : course.current >= course.total
                      ? 'All lessons complete'
                      : `Next: lesson ${course.resumeId}`}{' '}
                  · {course.total} lessons total
                </div>
                <Link
                  href={`${course.href}/${course.resumeId || 1}`}
                  className="btn btn-primary btn-sm"
                  style={{ marginTop: '10px', display: 'inline-flex' }}
                >
                  {course.current === 0 ? 'Start' : course.current >= course.total ? 'Review' : 'Continue'} →
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-card">
          <div style={{ padding: '28px 32px' }}>
            <div
              style={{
                fontFamily: 'var(--font-cormorant, Cormorant Garamond, serif)',
                fontSize: '1.3rem',
                fontWeight: 700,
                color: 'var(--navy)',
                marginBottom: '24px',
              }}
            >
              🏆 Achievements
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {achievements.map((a) => (
                <div
                  key={a.name}
                  className={`achievement ${a.earned ? 'earned' : 'locked'}`}
                  style={{ padding: '16px 12px' }}
                >
                  <div className="achievement-icon">{a.icon}</div>
                  <div className="achievement-name">{a.name}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-light)', marginTop: '2px', lineHeight: 1.3 }}>{a.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
