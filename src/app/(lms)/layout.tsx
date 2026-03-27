import Link from "next/link";
import { ReactNode } from "react";

export default function LmsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--parchment)]">
      <header className="border-b border-[var(--border)] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 md:px-10">
          <h1 className="font-heading text-2xl text-[var(--midnight)]">Hindy LMS</h1>
          <nav className="flex gap-4 text-sm">
            <Link href="/learn/abc" className="text-[var(--text-mid)] hover:text-[var(--midnight)]">
              ABC
            </Link>
            <Link href="/learn/mastery" className="text-[var(--text-mid)] hover:text-[var(--midnight)]">
              Mastery
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8 md:px-10">{children}</main>
    </div>
  );
}
