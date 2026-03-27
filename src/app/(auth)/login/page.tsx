import Link from "next/link";

export default function LoginPage() {
  return (
    <div>
      <h1 className="font-heading text-3xl text-[var(--midnight)]">Login</h1>
      <p className="mt-2 text-sm text-[var(--text-mid)]">Supabase auth UI comes in the next phase.</p>
      <form className="mt-6 space-y-3">
        <input className="w-full rounded-md border border-[var(--border)] p-2" placeholder="Email" />
        <input className="w-full rounded-md border border-[var(--border)] p-2" placeholder="Password" type="password" />
        <button type="button" className="w-full rounded-md bg-[var(--midnight)] px-4 py-2 text-white">
          Continue
        </button>
      </form>
      <p className="mt-4 text-sm text-[var(--text-mid)]">
        No account? <Link href="/signup" className="underline">Sign up</Link>
      </p>
    </div>
  );
}
