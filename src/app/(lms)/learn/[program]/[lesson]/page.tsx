import { notFound } from "next/navigation";
import { VocabCard } from "@/components/arabic/VocabCard";
import { LessonStepper } from "@/components/lesson/LessonStepper";
import { ABC_CURRICULUM } from "@/data/abc-curriculum";
import { MASTERY_CURRICULUM } from "@/data/mastery-curriculum";
import { ArabicText } from "@/components/arabic/ArabicText";

type LessonPageProps = {
  params: Promise<{ program: string; lesson: string }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { program, lesson } = await params;
  const lessonId = Number(lesson);
  const isAbc = program === "abc";
  const lessons = isAbc ? ABC_CURRICULUM : MASTERY_CURRICULUM;
  const entry = lessons.find((item) => item.id === lessonId);

  if (!entry) {
    notFound();
  }

  const steps = isAbc
    ? ["🎬 Video", "🎯 Slides", "🔤 Letter Forms", "🎧 Listening", "🗣️ Speaking", "❓ Quiz"]
    : ["🎬 Video", "🎯 Slides", "📖 Vocabulary", "📄 Reading", "📐 Grammar", "🎧 Listening", "🗣️ Speaking", "❓ Quiz"];

  const previewVocab = "vocab" in entry ? entry.vocab.slice(0, 3) : [];

  return (
    <section className="space-y-6">
      <header className="rounded-xl border border-[var(--border)] bg-white p-5">
        <p className="text-sm text-[var(--text-light)]">
          {program.toUpperCase()} • Lesson {entry.id}
        </p>
        <h1 className="mt-1 font-heading text-4xl text-[var(--midnight)]">{entry.title}</h1>
        <ArabicText className="text-2xl text-[var(--navy)]">{entry.arabic}</ArabicText>
      </header>

      <LessonStepper steps={steps} />

      {!isAbc ? (
        <div>
          <h2 className="mb-3 font-heading text-2xl text-[var(--midnight)]">Vocabulary Preview</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {previewVocab.map((word) => (
              <VocabCard key={word.ar} word={word} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
