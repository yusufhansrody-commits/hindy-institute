import { Navbar } from '@/components/layout/Navbar';
import { MASTERY_CURRICULUM } from '@/data/mastery-curriculum';
import { getSessionProfile } from '@/lib/auth/session-profile';

export default async function GrammarReferencePage() {
  const { user, profile } = await getSessionProfile();
  // Collect all grammar entries across all mastery lessons
  const allGrammar = MASTERY_CURRICULUM.flatMap((lesson) =>
    (lesson.grammar || []).map((g) => ({
      ...g,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      quarter: lesson.id <= 15 ? 'q1' : lesson.id <= 30 ? 'q2' : lesson.id <= 45 ? 'q3' : 'q4',
    }))
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--parchment)' }}>
      <Navbar initialUser={user} initialRole={profile?.role ?? null} />
      <main style={{ paddingTop: '68px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontFamily: 'var(--font-cormorant, Cormorant Garamond, serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--navy)', margin: 0 }}>
                📚 Grammar Reference
              </h1>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-mid)', marginTop: '4px' }}>
                All grammar points — filterable by quarter
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { label: 'All', value: 'all' },
                { label: 'Q1 (L1–15)', value: 'q1' },
                { label: 'Q2 (L16–30)', value: 'q2' },
                { label: 'Q3 (L31–45)', value: 'q3' },
                { label: 'Q4 (L46–60)', value: 'q4' },
              ].map((f, i) => (
                <button
                  key={f.value}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '20px',
                    border: i === 0 ? '1.5px solid var(--gold)' : '1.5px solid var(--border)',
                    background: i === 0 ? 'var(--gold)' : 'white',
                    color: i === 0 ? 'var(--midnight)' : 'var(--navy)',
                    fontWeight: i === 0 ? 700 : 600,
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* I'rab colour key */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '18px', padding: '12px 16px', background: 'var(--cream)', borderRadius: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Iʿrāb colour key:</span>
            <span className="irab-pill irab-raf-pill">Rafʿ — Nominative</span>
            <span className="irab-pill irab-nasb-pill">Nasb — Accusative</span>
            <span className="irab-pill irab-jarr-pill">Jarr — Genitive</span>
            <span className="irab-pill irab-jazm-pill">Jazm — Jussive</span>
          </div>

          {/* Search */}
          <div style={{ marginBottom: '24px' }}>
            <input
              type="text"
              placeholder="🔍  Search grammar topics, examples, rules..."
              style={{
                width: '100%',
                padding: '10px 16px',
                border: '1.5px solid var(--border)',
                borderRadius: '10px',
                fontSize: '0.9rem',
                outline: 'none',
                fontFamily: 'inherit',
                background: 'white',
              }}
            />
          </div>

          {/* Hans Wehr Dictionary panel */}
          <div style={{ background: 'var(--cream)', borderRadius: '14px', border: '1px solid var(--border)', padding: '20px 24px', marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ fontSize: '1.4rem' }}>📖</div>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '0.95rem' }}>Hans Wehr Dictionary Lookup</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: '1px' }}>
                  Enter any Arabic word or 3-letter root to find meanings, derived forms &amp; examples
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="e.g. كَتَبَ or ك ت ب"
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  border: '1.5px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-noto-naskh-arabic, Noto Naskh Arabic, serif)',
                  direction: 'rtl',
                  background: 'white',
                  outline: 'none',
                }}
                dir="rtl"
              />
              <button className="btn btn-primary btn-sm">Search</button>
            </div>
          </div>

          {/* Grammar cards */}
          <div>
            {allGrammar.slice(0, 20).map((g, i) => (
              <div key={i} className="gram-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span
                    style={{
                      background: 'var(--navy)',
                      color: 'var(--gold-light)',
                      padding: '2px 10px',
                      borderRadius: '100px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                    }}
                  >
                    L{g.lessonId}
                  </span>
                  <span
                    style={{
                      background: 'var(--gold-pale)',
                      color: 'var(--gold)',
                      border: '1px solid var(--border-gold)',
                      padding: '2px 10px',
                      borderRadius: '100px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    {g.type}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginLeft: 'auto' }}>{g.lessonTitle}</span>
                </div>
                <div className="gram-card-title">{g.title}</div>
                {g.note && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-mid)', marginBottom: '14px', lineHeight: 1.6 }}>{g.note}</p>
                )}
                {g.rows && g.rows.length > 0 && (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                      {g.headers && g.headers.length > 0 && (
                        <thead>
                          <tr style={{ background: 'var(--cream)' }}>
                            {g.headers.map((h, hi) => (
                              <th
                                key={hi}
                                style={{
                                  padding: '8px 14px',
                                  textAlign: hi === 0 ? 'left' : 'center',
                                  fontWeight: 700,
                                  fontSize: '0.78rem',
                                  color: 'var(--navy)',
                                  borderBottom: '1px solid var(--border)',
                                }}
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                      )}
                      <tbody>
                        {g.rows.map((row, ri) => (
                          <tr key={ri} style={{ borderBottom: '1px solid var(--border)' }}>
                            {row.map((cell, ci) => (
                              <td
                                key={ci}
                                style={{
                                  padding: '9px 14px',
                                  textAlign: ci === 0 ? 'left' : 'center',
                                  color: 'var(--text-dark)',
                                  fontFamily: ci > 0 ? 'var(--font-noto-naskh-arabic, Noto Naskh Arabic, serif)' : 'inherit',
                                  direction: ci > 0 ? 'rtl' : 'ltr',
                                  fontSize: ci > 0 ? '1.05rem' : '0.88rem',
                                }}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
            {allGrammar.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-light)' }}>
                No grammar entries found.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
