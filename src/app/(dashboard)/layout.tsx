import Link from "next/link";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[220px_1fr]">
      <aside className="border-r border-[var(--border)] bg-white p-4">
        <h2 className="font-heading text-2xl">Student</h2>
        <nav className="mt-4 space-y-2 text-sm">
          <Link href="/dashboard" className="block text-[var(--text-mid)] hover:text-[var(--midnight)]">
            Dashboard
          </Link>
          <Link href="/profile" className="block text-[var(--text-mid)] hover:text-[var(--midnight)]">
            Profile
          </Link>
          <Link href="/learn/mastery" className="block text-[var(--text-mid)] hover:text-[var(--midnight)]">
            Continue learning
          </Link>
        </nav>
      </aside>
      <main className="bg-[var(--parchment)] p-6">{children}</main>
    </div>
  );
}
