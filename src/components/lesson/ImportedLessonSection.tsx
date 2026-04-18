import type { LessonImportPayload } from '@/types/lesson-import';

type Props = {
  payload: LessonImportPayload;
};

export function ImportedLessonSection({ payload }: Props) {
  const objectives = payload.objectives ?? [];
  const slides = payload.slides ?? [];
  const titleAr = payload.title_ar;
  const title = payload.title;

  if (objectives.length === 0 && slides.length === 0 && !title) {
    return null;
  }

  return (
    <div
      style={{
        marginBottom: '32px',
        padding: '24px',
        background: 'var(--white)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow)',
      }}
    >
      <div
        style={{
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          marginBottom: '8px',
        }}
      >
        Imported lesson pack
      </div>
      {(title || titleAr) && (
        <h2
          className="font-heading"
          style={{ fontSize: '1.45rem', color: 'var(--navy)', marginBottom: '6px' }}
        >
          {title}
        </h2>
      )}
      {titleAr ? (
        <p className="arabic" style={{ fontSize: '1.35rem', color: 'var(--gold-light)', marginBottom: '16px' }}>
          {titleAr}
        </p>
      ) : null}

      {objectives.length > 0 ? (
        <div style={{ marginBottom: '20px' }}>
          <h3 className="font-heading" style={{ fontSize: '1.05rem', color: 'var(--navy)', marginBottom: '10px' }}>
            Objectives
          </h3>
          <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-mid)', lineHeight: 1.65 }}>
            {objectives.map((o, i) => (
              <li key={`${i}-${o.slice(0, 24)}`}>{o}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {slides.length > 0 ? (
        <div>
          <h3 className="font-heading" style={{ fontSize: '1.05rem', color: 'var(--navy)', marginBottom: '12px' }}>
            Slides
          </h3>
          <ol
            style={{
              margin: 0,
              paddingLeft: '22px',
              color: 'var(--text-dark)',
              lineHeight: 1.7,
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            {slides.map((s) => (
              <li key={s.id} dir="rtl" style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', textAlign: 'left', marginBottom: '4px' }}>
                  {s.title}
                  {s.exposure ? (
                    <span style={{ marginLeft: '8px', color: 'var(--success)', fontWeight: 600 }}>· exposure</span>
                  ) : null}
                </div>
                <div className="arabic" style={{ fontSize: '1.05rem' }}>
                  {s.content?.replace(/<br\s*\/?>/gi, ' · ') ?? ''}
                </div>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
}
