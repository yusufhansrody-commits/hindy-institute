import Link from "next/link";
import { ReactNode } from "react";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--parchment)]">
      <header className="border-b border-[var(--border)] bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <Link href="/" className="font-heading text-2xl text-[var(--midnight)]">
            Hindy Institute
          </Link>
          <div className="flex gap-4 text-sm">
            <Link href="/programs" className="text-[var(--text-mid)] hover:text-[var(--midnight)]">
              Programs
            </Link>
            <Link href="/login" className="text-[var(--text-mid)] hover:text-[var(--midnight)]">
              Login
            </Link>
            <Link href="/signup" className="rounded-md bg-[var(--gold)] px-3 py-1.5 text-white">
              Sign up
            </Link>
          </div>
        </nav>
      </header>
      {children}
    </div>
  );
}
