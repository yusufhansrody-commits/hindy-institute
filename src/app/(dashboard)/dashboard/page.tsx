import Link from 'next/link';
import { displayNameFromUser } from '@/lib/auth/display-name';
import { createClient } from '@/lib/supabase/server';

const LEADERBOARD = [
  { rank: '🥇', rankClass: 'gold', initials: 'ZA', name: 'Zara Ahmed', sub: "ABC's · Lesson 8", xp: '3,840 XP' },
  { rank: '🥈', rankClass: 'silver', initials: 'MH', name: 'Malik Hassan', sub: 'Mastery · Lesson 4', xp: '3,200 XP' },
  { rank: '🥉', rankClass: 'bronze', initials: 'LK', name: 'Leila Karimi', sub: "ABC's · Lesson 6", xp: '2,750 XP' },
  { rank: '13', rankClass: '', initials: 'RT', name: 'Rania Taher', sub: 'Mastery · Lesson 2', xp: '1,180 XP' },
];

const ACHIEVEMENTS = [
  { icon: '🌟', name: 'First Steps', earned: true },
  { icon: '🔥', name: '7-Day Streak', earned: true },
  { icon: '📖', name: 'Reader', earned: true },
  { icon: '🏆', name: 'ABC Complete', earned: false },
  { icon: '💬', name: 'First Speech', earned: false },
  { icon: '⚡', name: 'Speed Learner', earned: false },
];

const DAILY_CHALLENGES = [
  'Write the letter ب in all 4 forms from memory',
  'Translate 5 vocabulary words from Lesson 1 without looking',
  'Record yourself saying the Arabic greeting "Assalamu Alaikum"',
  'Identify the correct vowel sound in 3 sample words',
];

const todayChallenge = DAILY_CHALLENGES[new Date().getDay() % DAILY_CHALLENGES.length];

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const greet = displayNameFromUser(user);

  return (
    <div style={{ background: 'var(--parchment)', minHeight: 'calc(100vh - 68px)' }}>
      <div className="dash-inner">
        {/* ── Hero Banner ── */}
        <div className="dash-hero">
          <div className="dash-hero-bg" />
          <div style={{ zIndex: 1 }}>
            <div className="dash-greeting">
              Ahlan, <span>{greet}</span>! 👋
            </div>
            <div className="dash-sub">You&apos;re making great progress. Keep it up!</div>
            <div style={{ marginTop: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/learn/abc" className="btn btn-primary btn-sm">Continue ABC&apos;s →</Link>
              <Link href="/learn/mastery" className="btn btn-outline-white btn-sm">Arabic Mastery →</Link>
            </div>
          </div>
          <div className="dash-streak-pill">
            <div style={{ fontSize: '2rem' }}>🔥</div>
            <div>
              <div className="streak-num">7</div>
              <div className="streak-label">Day Streak</div>
            </div>
          </div>
        </div>

        {/* ── Quick Stats ── */}
        <div className="quick-stats" style={{ marginBottom: '28px' }}>
          <div className="stat-mini">
            <div className="stat-mini-num">1,240</div>
            <div className="stat-mini-label">Total XP</div>
          </div>
          <div className="stat-mini">
            <div className="stat-mini-num">5</div>
            <div className="stat-mini-label">Lessons Done</div>
          </div>
          <div className="stat-mini">
            <div className="stat-mini-num">84%</div>
            <div className="stat-mini-label">Avg. Score</div>
          </div>
          <div className="stat-mini">
            <div className="stat-mini-num">#12</div>
            <div className="stat-mini-label">Leaderboard</div>
          </div>
        </div>

        {/* ── Quick Access ── */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ fontFamily: 'var(--font-cormorant, Cormorant Garamond, serif)', fontSize: '1.1rem', color: 'var(--navy)', marginBottom: '14px' }}>
            🚀 Quick Access
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
            {[
              { href: '/learn/abc/1', label: 'ABC Lesson 1', icon: '📖' },
              { href: '/learn/abc/2', label: 'ABC Lesson 2', icon: '📖' },
              { href: '/learn/mastery/1', label: 'Mastery L1', icon: '🌟' },
              { href: '/grammar', label: 'Grammar', icon: '📚' },
              { href: '/profile', label: 'Profile', icon: '👤' },
              { href: '/programs', label: 'Programs', icon: '🎓' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  background: 'white',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '14px 10px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  transition: 'var(--transition)',
                  cursor: 'pointer',
                  display: 'block',
                }}
              >
                <div style={{ fontSize: '1.4rem', marginBottom: '6px' }}>{item.icon}</div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.3 }}>{item.label}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Main Grid ── */}
        <div className="dash-grid">
          {/* Main column */}
          <div className="dash-main">
            {/* Course Progress */}
            <div className="dash-card">
              <div className="dash-card-title">📚 My Courses</div>
              <div className="prog-course">
                <div className="prog-course-header">
                  <div className="prog-course-name">Arabic ABC&apos;s</div>
                  <div className="prog-course-pct">7%</div>
                </div>
                <div className="prog-bar">
                  <div className="prog-fill" style={{ width: '7%' }} />
                </div>
                <div className="prog-lesson-label">In progress · Lesson 1 of 14</div>
                <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                  <Link href="/learn/abc" className="btn btn-primary btn-sm">Continue Learning →</Link>
                  <button className="btn btn-outline btn-sm">🎓 Certificate</button>
                </div>
              </div>
              <div className="prog-course" style={{ paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                <div className="prog-course-header">
                  <div className="prog-course-name">Arabic Mastery</div>
                  <div className="prog-course-pct">0%</div>
                </div>
                <div className="prog-bar">
                  <div className="prog-fill" style={{ width: '0%' }} />
                </div>
                <div className="prog-lesson-label">Not started · Lesson 1 of 60</div>
                <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                  <Link href="/learn/mastery" className="btn btn-primary btn-sm">Start Learning →</Link>
                  <button className="btn btn-outline btn-sm">🎓 Certificate</button>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="dash-card">
              <div className="dash-card-title">📋 Recent Activity</div>
              {[
                { text: <>Completed <strong>Arabic ABC&apos;s — Lesson 1</strong> with a score of 87%</>, time: '2 hours ago' },
                { text: <>Earned achievement: <strong>🌟 First Steps</strong></>, time: '2 hours ago' },
                { text: <>Maintained a <strong>7-day streak!</strong> 🔥</>, time: 'Today' },
              ].map((item, i) => (
                <div key={i} className="activity-item">
                  <div className="activity-dot" />
                  <div>
                    <div className="activity-text">{item.text}</div>
                    <div className="activity-time">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar column */}
          <div className="dash-sidebar">
            {/* Daily Challenge */}
            <div className="daily-challenge-card">
              <div style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(200,151,42,0.9)', marginBottom: '8px' }}>
                ⚡ Daily Challenge
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '10px' }}>
                {todayChallenge}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>+50 XP reward</span>
                <button
                  style={{
                    padding: '6px 14px',
                    background: 'var(--gold)',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: 'var(--midnight)',
                    cursor: 'pointer',
                  }}
                >
                  Do it →
                </button>
              </div>
            </div>

            {/* Weekly Goals */}
            <div className="dash-card">
              <div className="dash-card-title">🎯 Weekly Goals</div>
              {[
                { label: 'XP Earned', current: 1240, target: 2000 },
                { label: 'Lessons Completed', current: 5, target: 10 },
                { label: 'Vocabulary Learned', current: 12, target: 20 },
              ].map((goal) => {
                const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
                return (
                  <div key={goal.label} className="goal-bar-wrap">
                    <div className="goal-bar-label">
                      <span>{goal.label}</span>
                      <span style={{ color: 'var(--text-light)' }}>{goal.current} / {goal.target}</span>
                    </div>
                    <div className="goal-bar-track">
                      <div className={`goal-bar-fill${pct >= 100 ? ' complete' : ''}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
              <button
                style={{
                  width: '100%',
                  padding: '8px',
                  background: 'var(--cream)',
                  border: '1.5px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  color: 'var(--navy)',
                  marginTop: '8px',
                }}
              >
                ⚙️ Set Goals
              </button>
            </div>

            {/* Leaderboard */}
            <div className="dash-card">
              <div className="dash-card-title">🏆 Weekly Leaderboard</div>
              {LEADERBOARD.map((item) => (
                <div key={item.name} className="leaderboard-item">
                  <div className={`lb-rank ${item.rankClass}`}>{item.rank}</div>
                  <div className="lb-avatar">{item.initials}</div>
                  <div className="lb-name">{item.name}<span>{item.sub}</span></div>
                  <div className="lb-xp">{item.xp}</div>
                </div>
              ))}
              {/* You */}
              <div className="leaderboard-item lb-you">
                <div className="lb-rank">12</div>
                <div className="lb-avatar" style={{ borderColor: 'var(--gold)' }}>S</div>
                <div className="lb-name">You<span>ABC&apos;s · Lesson 1</span></div>
                <div className="lb-xp">1,240 XP</div>
              </div>
            </div>

            {/* Achievements */}
            <div className="dash-card">
              <div className="dash-card-title">🎖️ Achievements</div>
              <div className="achievements-grid">
                {ACHIEVEMENTS.map((a) => (
                  <div key={a.name} className={`achievement ${a.earned ? 'earned' : 'locked'}`}>
                    <div className="achievement-icon">{a.icon}</div>
                    <div className="achievement-name">{a.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
