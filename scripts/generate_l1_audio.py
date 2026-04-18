#!/usr/bin/env python3
"""Generate public/audio/L1/*.mp3 using gTTS (pip install gTTS). Run: npm run generate:audio-l1"""

from __future__ import annotations

import sys
from pathlib import Path

try:
    from gtts import gTTS
except ImportError:
    print("Install gTTS: pip install gTTS", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "audio" / "L1"

# Arabic phrases (MSA / exposure). gTTS uses one Arabic voice; dialect lines are still correct text.
CLIPS: list[tuple[str, str]] = [
    ("universal.mp3", "السَّلَامُ عَلَيْكُمْ"),
    ("morning.mp3", "صَبَاحُ الخَيْر"),
    ("evening.mp3", "مَسَاءُ الخَيْر"),
    ("ahlan.mp3", "أَهْلاً"),
    ("marhaban.mp3", "مَرْحَباً"),
    ("ahlan_wa_sahlan.mp3", "أَهْلاً وَسَهْلاً"),
    ("how_are_you_m.mp3", "كَيْفَ حَالُكَ؟"),
    ("bikhayr.mp3", "بِخَيْر، الحَمْدُ لِلَّه"),
    ("izzayyak_masculine.mp3", "إزَّيَّك؟"),
    ("ya_hala.mp3", "يَا هَلَا، كِيفَك؟"),
    ("hala_wa_ghala.mp3", "هَلَا وَغَلَا، شَلونَك؟"),
    ("la_bas.mp3", "لا بَأْس، أشْبَارَك؟"),
]


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for filename, text in CLIPS:
        dest = OUT / filename
        gTTS(text=text, lang="ar").save(str(dest))
        print(f"Wrote {dest.relative_to(ROOT)}")
    print("Done.")


if __name__ == "__main__":
    main()
