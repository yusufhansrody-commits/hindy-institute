import Link from "next/link";
import { ArabicText } from "@/components/arabic/ArabicText";
import { ABC_CURRICULUM } from "@/data/abc-curriculum";
import { MASTERY_CURRICULUM } from "@/data/mastery-curriculum";

export default function MarketingHomePage() {
  return (
    <main>
      <section className="bg-[var(--midnight)] text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 md:px-10">
          <h1 className="font-heading text-5xl md:text-7xl">Master Arabic</h1>
          <p className="mt-4">
            <ArabicText className="text-2xl text-[var(--gold)]">العَرَبِيَّة كَمَا يَتَكَلَّمُهَا العَرَب</ArabicText>
          </p>
          <p className="mt-6 max-w-2xl text-slate-200">
            Production migration starter with extracted curriculum data and route architecture.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/learn/abc" className="rounded-md bg-[var(--gold)] px-5 py-2 text-white">
              Start ABC&apos;s
            </Link>
            <Link href="/learn/mastery" className="rounded-md border border-white px-5 py-2">
              Explore Mastery
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-12 md:grid-cols-2 md:px-10">
        <article className="rounded-[20px] border border-[var(--border)] bg-white p-6">
          <h2 className="font-heading text-3xl">Arabic ABC&apos;s</h2>
          <p className="text-[var(--text-mid)]">{ABC_CURRICULUM.length} lessons</p>
        </article>
        <article className="rounded-[20px] border border-[var(--border)] bg-white p-6">
          <h2 className="font-heading text-3xl">Arabic Mastery</h2>
          <p className="text-[var(--text-mid)]">{MASTERY_CURRICULUM.length} lessons</p>
        </article>
      </section>
    </main>
  );
}
