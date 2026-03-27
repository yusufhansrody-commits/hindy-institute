export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="font-heading text-4xl text-[var(--midnight)]">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-[var(--border)] bg-white p-4">Streak: 0 days</article>
        <article className="rounded-xl border border-[var(--border)] bg-white p-4">XP: 0</article>
        <article className="rounded-xl border border-[var(--border)] bg-white p-4">Completed lessons: 0</article>
      </div>
    </div>
  );
}
