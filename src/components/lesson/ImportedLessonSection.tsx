import type {
  LessonImportActivity,
  LessonImportPayload,
  LessonImportQuizItem,
} from '@/types/lesson-import';

type Props = {
  payload: LessonImportPayload;
};

const cardStyle: React.CSSProperties = {
  background: 'var(--white)',
  borderRadius: 'var(--radius-lg)',
  border: '1px solid var(--border)',
  boxShadow: 'var(--shadow)',
  padding: '22px 24px',
  marginBottom: '20px',
};

const sectionTitle: React.CSSProperties = {
  fontFamily: 'var(--font-cormorant, Cormorant Garamond, serif)',
  fontSize: '1.25rem',
  color: 'var(--navy)',
  marginBottom: '12px',
};

const subTitle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--gold)',
  marginBottom: '6px',
};

export function ImportedLessonSection({ payload }: Props) {
  const {
    title,
    title_ar: titleAr,
    objectives = [],
    slides = [],
    dialogue,
    grammar,
    activities = [],
    quiz = [],
    writing_prompt: writing,
  } = payload;

  if (
    !title &&
    !titleAr &&
    objectives.length === 0 &&
    slides.length === 0 &&
    !dialogue &&
    !grammar &&
    activities.length === 0 &&
    quiz.length === 0 &&
    !writing
  ) {
    return null;
  }

  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={cardStyle}>
        <div style={subTitle}>Imported lesson pack</div>
        {title ? (
          <h2 className="font-heading" style={{ fontSize: '1.55rem', color: 'var(--navy)', margin: 0 }}>
            {title}
          </h2>
        ) : null}
        {titleAr ? (
          <p className="arabic" style={{ fontSize: '1.35rem', color: 'var(--gold-light)', margin: '6px 0 0' }}>
            {titleAr}
          </p>
        ) : null}
      </div>

      {objectives.length > 0 ? (
        <div style={cardStyle}>
          <h3 style={sectionTitle}>Objectives</h3>
          <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-mid)', lineHeight: 1.7 }}>
            {objectives.map((o, i) => (
              <li key={`${i}-${o.slice(0, 20)}`}>{o}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {slides.length > 0 ? (
        <div style={cardStyle}>
          <h3 style={sectionTitle}>Slides</h3>
          <ol
            style={{
              margin: 0,
              paddingLeft: '22px',
              color: 'var(--text-dark)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            {slides.map((s) => (
              <li key={s.id} style={{ lineHeight: 1.6 }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-light)', marginBottom: '2px' }}>
                  {s.title}
                  {s.exposure ? (
                    <span style={{ marginLeft: '8px', color: 'var(--success)', fontWeight: 600 }}>· exposure</span>
                  ) : null}
                </div>
                <div
                  className="arabic"
                  dir="rtl"
                  style={{ fontSize: '1.05rem', color: 'var(--text-dark)' }}
                  dangerouslySetInnerHTML={{ __html: sanitizeSlide(s.content ?? '') }}
                />
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {dialogue && dialogue.lines && dialogue.lines.length > 0 ? (
        <div style={cardStyle}>
          <h3 style={sectionTitle}>Dialogue{dialogue.title ? ` — ${dialogue.title}` : ''}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {dialogue.lines.map((line, i) => (
              <div
                key={`${i}-${(line.text ?? '').slice(0, 16)}`}
                style={{
                  background: 'var(--cream)',
                  borderRadius: 'var(--radius)',
                  padding: '10px 14px',
                }}
              >
                {line.speaker ? (
                  <div style={{ fontSize: '0.78rem', color: 'var(--gold)', fontWeight: 700, marginBottom: '2px' }}>
                    {line.speaker}
                  </div>
                ) : null}
                <div className="arabic" dir="rtl" style={{ fontSize: '1.1rem' }}>
                  {line.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {grammar && (grammar.title || (grammar.points && grammar.points.length > 0)) ? (
        <div style={cardStyle}>
          <h3 style={sectionTitle}>{grammar.title ?? 'Grammar'}</h3>
          <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-mid)', lineHeight: 1.7 }}>
            {(grammar.points ?? []).map((p, i) => (
              <li key={`${i}-${p.slice(0, 20)}`}>{p}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {activities.length > 0 ? (
        <div style={cardStyle}>
          <h3 style={sectionTitle}>Practice activities</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {activities.map((a, i) => (
              <ActivityRow key={`activity-${i}`} activity={a} />
            ))}
          </div>
        </div>
      ) : null}

      {quiz.length > 0 ? (
        <div style={cardStyle}>
          <h3 style={sectionTitle}>Quiz</h3>
          <ol
            style={{
              margin: 0,
              paddingLeft: '22px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            {quiz.map((q, i) => (
              <QuizRow key={`quiz-${i}`} item={q} />
            ))}
          </ol>
        </div>
      ) : null}

      {writing?.text ? (
        <div style={cardStyle}>
          <h3 style={sectionTitle}>Writing prompt</h3>
          <p style={{ margin: 0, color: 'var(--text-mid)', lineHeight: 1.6 }}>{writing.text}</p>
          {writing.auto_checks && writing.auto_checks.length > 0 ? (
            <p style={{ marginTop: '10px', fontSize: '0.82rem', color: 'var(--text-light)' }}>
              Auto-checks: {writing.auto_checks.join(', ')}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function ActivityRow({ activity }: { activity: LessonImportActivity }) {
  const prompt = 'prompt' in activity ? activity.prompt : undefined;
  return (
    <div style={{ paddingLeft: '12px', borderLeft: '3px solid var(--gold-subtle)' }}>
      <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--navy-light)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {activity.type.replace(/_/g, ' ')}
      </div>
      {prompt ? (
        <div style={{ color: 'var(--text-dark)', marginTop: '4px', lineHeight: 1.55 }}>{prompt}</div>
      ) : null}
      {activity.type === 'drag_match' && 'pairs' in activity && activity.pairs ? (
        <ul style={{ margin: '6px 0 0', paddingLeft: '20px', color: 'var(--text-mid)' }}>
          {activity.pairs.map((p, i) => (
            <li key={i} dir="rtl" className="arabic" style={{ textAlign: 'right' }}>
              <span style={{ color: 'var(--navy)' }}>{p.greeting}</span>
              {' ← '}
              <span style={{ color: 'var(--text-mid)' }}>{p.response}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {activity.type === 'fill_blank' && 'answer' in activity && activity.answer ? (
        <div style={{ marginTop: '6px', color: 'var(--text-light)', fontSize: '0.85rem' }}>
          Answer: <span className="arabic">{activity.answer}</span>
        </div>
      ) : null}
      {activity.type === 'true_false' && 'correct' in activity ? (
        <div style={{ marginTop: '6px', color: 'var(--text-light)', fontSize: '0.85rem' }}>
          Answer: {activity.correct ? 'True' : 'False'}
        </div>
      ) : null}
      {activity.type === 'exposure_audio' && 'options' in activity && activity.options ? (
        <div style={{ marginTop: '6px', color: 'var(--text-mid)', fontSize: '0.88rem' }}>
          Options: {activity.options.join(' / ')}
        </div>
      ) : null}
    </div>
  );
}

function QuizRow({ item }: { item: LessonImportQuizItem }) {
  return (
    <li style={{ lineHeight: 1.55 }}>
      <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--navy-light)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {item.type.replace(/_/g, ' ')}
      </div>
      {item.prompt ? (
        <div style={{ color: 'var(--text-dark)', marginTop: '2px' }}>{item.prompt}</div>
      ) : null}
      {'options' in item && Array.isArray(item.options) ? (
        <ul style={{ margin: '6px 0 0', paddingLeft: '20px', color: 'var(--text-mid)' }}>
          {item.options.map((o, i) => (
            <li key={i} className="arabic" dir="rtl" style={{ textAlign: 'right' }}>
              {o}
            </li>
          ))}
        </ul>
      ) : null}
      {'answer' in item && item.answer ? (
        <div style={{ marginTop: '4px', color: 'var(--text-light)', fontSize: '0.85rem' }}>
          Answer: <span className="arabic">{item.answer}</span>
        </div>
      ) : null}
      {'correct' in item && typeof item.correct === 'string' ? (
        <div style={{ marginTop: '4px', color: 'var(--text-light)', fontSize: '0.85rem' }}>
          Correct: <span className="arabic">{item.correct}</span>
        </div>
      ) : null}
      {'correct_order' in item && Array.isArray(item.correct_order) ? (
        <div style={{ marginTop: '4px', color: 'var(--text-light)', fontSize: '0.85rem' }}>
          Order: <span className="arabic">{item.correct_order.join(' ')}</span>
        </div>
      ) : null}
    </li>
  );
}

/** Allow only a minimal, known-safe set of tags from imported JSON. */
function sanitizeSlide(html: string): string {
  return html.replace(/<(?!\/?br\b)[^>]*>/gi, '');
}
