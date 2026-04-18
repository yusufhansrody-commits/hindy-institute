'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Region = {
  id: string;
  name: string;
  nameAr: string;
  greetingMSA?: string;
  greetingDialect?: string;
  audioUrl: string;
  isMSA: boolean;
};

const REGIONS: Region[] = [
  {
    id: 'msa_universal',
    name: 'Pan-Arab (MSA)',
    nameAr: 'العربية الفصحى',
    greetingMSA: 'السَّلَامُ عَلَيْكُمْ',
    audioUrl: '/audio/L1/universal.mp3',
    isMSA: true,
  },
  {
    id: 'egypt',
    name: 'Egypt (exposure)',
    nameAr: 'مِصْر',
    greetingDialect: 'إزَّيَّك',
    audioUrl: '/audio/L1/izzayyak_masculine.mp3',
    isMSA: false,
  },
  {
    id: 'levant',
    name: 'Levant (exposure)',
    nameAr: 'الشَّام',
    greetingDialect: 'يَا هَلَا',
    audioUrl: '/audio/L1/ya_hala.mp3',
    isMSA: false,
  },
  {
    id: 'gulf',
    name: 'Gulf (exposure)',
    nameAr: 'الخَلِيج',
    greetingDialect: 'هَلَا وَغَلَا',
    audioUrl: '/audio/L1/hala_wa_ghala.mp3',
    isMSA: false,
  },
  {
    id: 'maghreb',
    name: 'Maghreb (exposure)',
    nameAr: 'المَغْرِب',
    greetingDialect: 'لا بَأْس',
    audioUrl: '/audio/L1/la_bas.mp3',
    isMSA: false,
  },
];

export function GreetingExposureMap() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlaying(false);
    setActiveRegion(null);
  }, []);

  useEffect(() => () => stopAudio(), [stopAudio]);

  const playAudio = (region: Region) => {
    stopAudio();
    const audio = new Audio(region.audioUrl);
    audioRef.current = audio;
    setActiveRegion(region.id);
    setIsPlaying(true);
    void audio.play().catch(() => {
      setIsPlaying(false);
      setActiveRegion(null);
    });
    audio.onended = () => {
      setIsPlaying(false);
      setActiveRegion(null);
      audioRef.current = null;
    };
  };

  const active = activeRegion ? REGIONS.find((r) => r.id === activeRegion) : null;
  const playingLabel = active
    ? active.isMSA
      ? active.greetingMSA
      : active.greetingDialect
    : null;

  return (
    <div
      dir="rtl"
      className="font-arabic"
      style={{
        maxWidth: '840px',
        margin: '0 auto',
        padding: '20px',
        background: 'var(--white)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow)',
      }}
    >
      <h2
        className="font-heading"
        style={{ fontSize: '1.35rem', color: 'var(--navy)', marginBottom: '8px', textAlign: 'center' }}
      >
        استمع إلى التحيات — Listen to greetings
      </h2>
      <p style={{ fontSize: '0.88rem', color: 'var(--text-mid)', textAlign: 'center', lineHeight: 1.55 }}>
        <strong style={{ color: 'var(--navy-light)' }}>Blue:</strong> MSA (core lesson){' '}
        <span style={{ color: 'var(--text-light)' }}>·</span>{' '}
        <strong style={{ color: 'var(--success)' }}>Green:</strong> dialect (exposure only — not assessed)
      </p>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '14px',
          justifyContent: 'center',
          marginTop: '22px',
        }}
      >
        {REGIONS.map((region) => {
          const isActive = activeRegion === region.id;
          return (
            <button
              key={region.id}
              type="button"
              onClick={() => playAudio(region)}
              style={{
                cursor: 'pointer',
                backgroundColor: region.isMSA ? 'var(--navy-light)' : 'var(--success)',
                color: 'var(--white)',
                border: 'none',
                borderRadius: 'var(--radius)',
                padding: '16px 20px',
                textAlign: 'center',
                transition: 'var(--transition)',
                transform: isActive ? 'scale(1.02)' : 'scale(1)',
                boxShadow: isActive ? '0 0 0 3px var(--gold)' : 'var(--shadow)',
                minWidth: '148px',
                font: 'inherit',
              }}
            >
              <div style={{ fontSize: '1.35rem', fontWeight: 700 }}>{region.nameAr}</div>
              <div style={{ fontSize: '0.82rem', marginTop: '6px', opacity: 0.92 }}>{region.name}</div>
              <div className="arabic" style={{ fontSize: '1.15rem', marginTop: '10px' }}>
                {region.isMSA ? region.greetingMSA : region.greetingDialect}
              </div>
              <span
                style={{
                  fontSize: '0.68rem',
                  backgroundColor: region.isMSA ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.15)',
                  padding: '3px 8px',
                  borderRadius: '100px',
                  marginTop: '10px',
                  display: 'inline-block',
                }}
              >
                {region.isMSA ? 'MSA' : 'Exposure only'}
              </span>
            </button>
          );
        })}
      </div>

      {activeRegion && isPlaying && playingLabel ? (
        <div
          style={{
            marginTop: '20px',
            padding: '12px 14px',
            background: 'var(--gold-pale)',
            borderRadius: 'var(--radius)',
            textAlign: 'center',
            border: '1px solid var(--border-gold)',
          }}
        >
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-dark)' }}>
            Playing: <strong className="arabic">{playingLabel}</strong>
          </p>
          <button
            type="button"
            onClick={stopAudio}
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--navy)',
              background: 'var(--white)',
              color: 'var(--navy)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Stop
          </button>
        </div>
      ) : null}

      <p
        style={{
          marginTop: '18px',
          fontSize: '0.78rem',
          color: 'var(--text-light)',
          textAlign: 'center',
          lineHeight: 1.5,
        }}
      >
        Audio lives under <code style={{ fontSize: '0.85em' }}>public/audio/L1/</code>. Regenerate with{' '}
        <code style={{ fontSize: '0.85em' }}>npm run generate:audio-l1</code> (requires <code style={{ fontSize: '0.85em' }}>pip install gTTS</code>
        ). Dialect lines use the same engine; treat them as exposure only.
      </p>
    </div>
  );
}
