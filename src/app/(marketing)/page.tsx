import { SiteLogo } from '@/components/layout/SiteLogo';
import Link from 'next/link';

const TESTIMONIALS = [
  {
    initials: 'FA',
    name: 'Fatima Al-Ansari',
    role: 'Dubai, UAE · Arabic ABC\'s',
    text: '"I had tried to learn Arabic before but always gave up at the alphabet. The way Arabic ABC\'s groups similar letters together made it click immediately. After 4 weeks I was reading!"',
  },
  {
    initials: 'MR',
    name: 'Mohammed Rahman',
    role: 'London, UK · Arabic Mastery',
    text: '"The grammar explanations are exceptional. Masculine/feminine, verb conjugations explained so clearly with beautiful tables. My Arabic reading improved dramatically within months."',
  },
  {
    initials: 'SB',
    name: 'Sarah Bouchard',
    role: 'Toronto, Canada · Arabic ABC\'s',
    text: '"The leaderboard makes me compete with myself every day. I love the streak system. My son and I are in the same class and we race each other through the lessons!"',
  },
  {
    initials: 'AK',
    name: 'Ahmed Khalil',
    role: 'Cairo, Egypt · Arabic Mastery',
    text: '"The hover translations for Arabic text are genius. I can read the authentic Arabic and immediately see what any word means. Best learning tool I\'ve encountered."',
  },
  {
    initials: 'JL',
    name: 'James Lawson',
    role: 'Chicago, USA · Arabic ABC\'s',
    text: '"I converted to Islam two years ago and always wanted to read Quran in Arabic. Within 6 weeks of Arabic ABC\'s, I was reading Surah Al-Fatiha correctly. Emotional moment."',
  },
  {
    initials: 'NI',
    name: 'Nadia Ibrahim',
    role: 'Paris, France · Arabic Mastery',
    text: '"The speaking exercises with recording are genuinely challenging and fun. I sent my recording to my Arab friends and they were impressed. Real confidence builder."',
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-pattern" />
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-label">🌙 Online Arabic Language Institute</div>
            <h1>
              Learn Arabic<br />
              the <em>Right Way</em>
            </h1>
            <p className="hero-sub">
              From your very first letter to full conversational fluency — structured, immersive,
              and guided by proven Quranic pedagogy.
            </p>
            <div className="hero-actions">
              <Link href="/signup" className="btn btn-primary btn-lg">
                Start Learning Free
              </Link>
              <Link href="/programs" className="btn btn-outline-white btn-lg">
                View Programs
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-num">2,400+</div>
                <div className="hero-stat-label">Students</div>
              </div>
              <div>
                <div className="hero-stat-num">24</div>
                <div className="hero-stat-label">Lessons</div>
              </div>
              <div>
                <div className="hero-stat-num">4.9★</div>
                <div className="hero-stat-label">Rating</div>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <Link href="/signup" className="course-card-hero featured" style={{ textDecoration: 'none', display: 'block' }}>
              <div className="course-card-tag">✦ Foundation</div>
              <div className="course-card-title">Arabic ABC&apos;s</div>
              <div className="course-card-desc">
                Master all 28 letters, vowels &amp; basic Tajweed rules. Read the Quran from scratch.
              </div>
              <div className="course-card-meta">
                <div className="course-card-price">$400<span> · 4 months</span></div>
                <span className="btn btn-primary btn-sm">Enroll Now →</span>
              </div>
            </Link>

            <Link href="/signup" className="course-card-hero" style={{ textDecoration: 'none', display: 'block' }}>
              <div className="course-card-tag">🎓 Advanced</div>
              <div className="course-card-title">Arabic Mastery</div>
              <div className="course-card-desc">
                Full conversational fluency — speaking, listening, reading and writing with real Arabic content.
              </div>
              <div className="course-card-meta">
                <div className="course-card-price">$1,200<span> · 1 year</span></div>
                <span className="btn btn-primary btn-sm">Enroll Now →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section how-it-works">
        <div className="section-inner">
          <div className="section-label">How It Works</div>
          <h2 className="section-title">
            A clear path to <em>Arabic fluency</em>
          </h2>
          <p className="section-sub">
            Our methodology combines classical Islamic pedagogy with modern language learning science.
          </p>
          <div className="steps-grid">
            {[
              { num: '١', title: 'Letters & Sounds', desc: 'Learn all 28 Arabic letters in their 4 forms with expert pronunciation guidance and Tajweed rules.' },
              { num: '٢', title: 'Words & Vocabulary', desc: 'Build vocabulary through contextual themes, spaced repetition, and authentic Arabic texts.' },
              { num: '٣', title: 'Grammar & Structure', desc: 'Understand Arabic grammar organically — gender, number, verb conjugation, sentence structure.' },
              { num: '٤', title: 'Real Conversations', desc: 'Apply everything through speaking exercises, listening practice, and authentic reading texts.' },
            ].map((step) => (
              <div key={step.num} className="step-card">
                <div className="step-num">{step.num}</div>
                <div className="step-title">{step.title}</div>
                <div className="step-desc">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      <section className="section" id="programs-section">
        <div className="section-inner">
          <div className="section-label">Our Programs</div>
          <h2 className="section-title">Two paths, one <em>destination</em></h2>
          <div className="programs-grid">
            {/* ABC Card */}
            <div className="program-card">
              <div className="program-card-header abc">
                <div className="program-card-arabic">أبجد</div>
                <div className="program-card-icon">📖</div>
                <div className="program-card-name">Arabic ABC&apos;s</div>
                <div className="program-card-tagline">From zero to reading Arabic fluently</div>
              </div>
              <div className="program-card-body">
                <ul className="program-features">
                  {[
                    'All 28 Arabic letters in 4 writing forms',
                    'Short & long vowels, Sukoon, Shaddah, Tanween',
                    'Tajweed rules: Qalqalah, Ghunnah, Idghaam',
                    'Grouped by shape similarity (ب ت ث together)',
                    'AI-powered listening & pronunciation testing',
                    'Competitive quizzes & leaderboard',
                    'Slide presentations for every lesson',
                    'Certificate upon completion',
                  ].map((f) => <li key={f}>{f}</li>)}
                </ul>
                <div className="program-price-row">
                  <div className="program-price">$400<sub> total</sub></div>
                  <Link href="/signup" className="btn btn-primary">Enroll →</Link>
                </div>
              </div>
            </div>

            {/* Mastery Card */}
            <div className="program-card">
              <div className="program-card-header mastery">
                <div className="program-card-arabic">إتقان</div>
                <div className="program-card-icon">🌟</div>
                <div className="program-card-name">Arabic Mastery</div>
                <div className="program-card-tagline">Full conversational Arabic fluency</div>
              </div>
              <div className="program-card-body">
                <ul className="program-features">
                  {[
                    '12 rich content lessons across real topics',
                    'Vocabulary with hover translations',
                    'Grammar: gender, number, verbs, pronouns',
                    'Recorded speaking presentations',
                    'Fill-in-blank, reading comprehension quizzes',
                    'Biographies, geography, daily life topics',
                    'All 4 language skills: LSRW',
                    'Prerequisite: Arabic ABC\'s or equivalent',
                  ].map((f) => <li key={f}>{f}</li>)}
                </ul>
                <div className="program-price-row">
                  <div className="program-price">$1,200<sub> total</sub></div>
                  <Link href="/signup" className="btn btn-primary">Enroll →</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section testimonials-section">
        <div className="section-inner">
          <div className="section-label" style={{ color: 'var(--gold)' }}>Student Stories</div>
          <h2 className="section-title" style={{ color: 'white' }}>
            What our <em>students say</em>
          </h2>
          <div className="testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="testimonial-card">
                <div className="testimonial-stars">★★★★★</div>
                <div className="testimonial-text">{t.text}</div>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.initials}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <SiteLogo href="/" className="nav-logo" style={{ marginBottom: '12px', textDecoration: 'none' }} />
              <p className="footer-brand-desc">
                A modern Arabic language institution combining classical pedagogy with cutting-edge learning
                technology. We believe every Muslim deserves to read the Quran in its original language.
              </p>
            </div>
            <div>
              <div className="footer-col-title">Programs</div>
              <ul className="footer-links">
                <li><Link href="/signup">Arabic ABC&apos;s</Link></li>
                <li><Link href="/signup">Arabic Mastery</Link></li>
                <li><Link href="/programs">Compare Plans</Link></li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Learn</div>
              <ul className="footer-links">
                <li><a href="#">Curriculum</a></li>
                <li><a href="#">Methodology</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Free Resources</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Support</div>
              <ul className="footer-links">
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">© 2025 Hindy Institute. All rights reserved.</div>
            <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.3)' }}>
              Powered by ❤️ &amp; Arabic pedagogy
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
