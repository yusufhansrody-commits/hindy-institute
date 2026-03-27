import Link from "next/link";
import { ABC_CURRICULUM } from "@/data/abc-curriculum";
import { MASTERY_CURRICULUM } from "@/data/mastery-curriculum";
import { ArabicText } from "@/components/arabic/ArabicText";

type ProgramPageProps = {
  params: Promise<{ program: string }>;
};

export default async function ProgramLessonsPage({ params }: ProgramPageProps) {
  const { program } = await params;
  const isAbc = program === "abc";
  const lessons = isAbc ? ABC_CURRICULUM : MASTERY_CURRICULUM;

  return (
    <section>
      <h1 className="font-heading text-4xl capitalize text-[var(--midnight)]">{program} lessons</h1>
      <p className="mt-2 text-sm text-[var(--text-mid)]">Preview is open for lessons 1-3 in the current starter.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {lessons.slice(0, 12).map((lesson) => {
          const locked = lesson.id > 3;
          return (
            <article key={lesson.id} className="rounded-xl border border-[var(--border)] bg-white p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-[var(--text-light)]">Lesson {lesson.id}</p>
                <p className="rounded-full bg-[var(--gold-pale)] px-2 py-1 text-xs text-[var(--gold)]">
                  {lesson.xp} XP
                </p>
              </div>
              <h2 className="mt-2 font-semibold text-[var(--text-dark)]">{lesson.title}</h2>
              <ArabicText className="text-xl">{lesson.arabic}</ArabicText>
              {locked ? (
                <p className="mt-3 text-sm text-[var(--warning)]">Locked (trial gate)</p>
              ) : (
                <Link href={`/learn/${program}/${lesson.id}`} className="mt-3 inline-block text-sm underline">
                  Open lesson
                </Link>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
