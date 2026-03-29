import Link from 'next/link';

export default function ProgramsPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--midnight)', padding: '80px 0 60px' }}>
        <div className="section-inner">
          <div className="section-label" style={{ color: 'var(--gold)' }}>Our Programs</div>
          <h1 className="section-title" style={{ color: 'white' }}>
            Two paths, one <em>destination</em>
          </h1>
          <p className="section-sub" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Choose the program that fits your level. Both lead to genuine Arabic literacy.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="section">
        <div className="section-inner">
          <div className="programs-grid">
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
                    "Prerequisite: Arabic ABC's or equivalent",
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

      {/* Compare Table */}
      <section className="section" style={{ background: 'var(--cream)', paddingTop: '60px', paddingBottom: '80px' }}>
        <div className="section-inner">
          <div className="section-label">Compare</div>
          <h2 className="section-title">What&apos;s <em>included</em></h2>
          <div style={{ marginTop: '40px', background: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--midnight)' }}>
                  <th style={{ padding: '16px 24px', textAlign: 'left', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', fontWeight: 600 }}>Feature</th>
                  <th style={{ padding: '16px 24px', textAlign: 'center', color: 'var(--gold-light)', fontSize: '0.88rem', fontWeight: 700 }}>Arabic ABC&apos;s</th>
                  <th style={{ padding: '16px 24px', textAlign: 'center', color: '#86efac', fontSize: '0.88rem', fontWeight: 700 }}>Arabic Mastery</th>
                </tr>
              </thead>
              <tbody>
                {([
                  ['Letter-by-letter lessons', '✓', '—'],
                  ['Tajweed rules', '✓', '—'],
                  ['Vocabulary building', '✓', '✓'],
                  ['Grammar explanations', 'Basic', 'Full'],
                  ['Reading comprehension', '—', '✓'],
                  ['Speaking exercises', '—', '✓'],
                  ['Listening practice', '—', '✓'],
                  ['Hans Wehr dictionary', '—', '✓'],
                  ['Certificate', '✓', '✓'],
                  ['Leaderboard', '✓', '✓'],
                  ['Duration', '4 months', '1 year'],
                  ['Price', '$400', '$1,200'],
                ] as [string, string, string][]).map(([feature, abc, mastery], i) => (
                  <tr key={feature} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'white' : 'var(--parchment)' }}>
                    <td style={{ padding: '13px 24px', fontSize: '0.88rem', color: 'var(--text-dark)' }}>{feature}</td>
                    <td style={{ padding: '13px 24px', textAlign: 'center', fontSize: '0.88rem', color: abc === '✓' ? 'var(--success)' : abc === '—' ? 'var(--text-light)' : 'var(--navy)', fontWeight: (abc === '✓' || abc === '—') ? 700 : 500 }}>{abc}</td>
                    <td style={{ padding: '13px 24px', textAlign: 'center', fontSize: '0.88rem', color: mastery === '✓' ? 'var(--success)' : mastery === '—' ? 'var(--text-light)' : 'var(--navy)', fontWeight: (mastery === '✓' || mastery === '—') ? 700 : 500 }}>{mastery}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
