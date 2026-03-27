import Link from "next/link";

const programs = [
  { id: "abc", title: "Arabic ABC's", price: "$400", access: "4 months" },
  { id: "mastery", title: "Arabic Mastery", price: "$1,200", access: "1 year" },
  { id: "bundle", title: "Bundle", price: "$1,400", access: "Combined" },
];

export default function ProgramsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 md:px-10">
      <h1 className="font-heading text-4xl text-[var(--midnight)]">Programs</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {programs.map((program) => (
          <article key={program.id} className="rounded-[20px] border border-[var(--border)] bg-white p-5">
            <h2 className="font-heading text-2xl">{program.title}</h2>
            <p className="mt-2 text-2xl text-[var(--gold)]">{program.price}</p>
            <p className="text-sm text-[var(--text-mid)]">{program.access} access</p>
            <Link href={`/learn/${program.id === "bundle" ? "mastery" : program.id}`} className="mt-4 inline-block text-sm text-[var(--midnight)] underline">
              Preview lessons
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
