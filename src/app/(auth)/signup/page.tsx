import Link from "next/link";

export default function SignupPage() {
  return (
    <div>
      <h1 className="font-heading text-3xl text-[var(--midnight)]">Create Account</h1>
      <p className="mt-2 text-sm text-[var(--text-mid)]">Registration form placeholder for Supabase auth.</p>
      <form className="mt-6 space-y-3">
        <input className="w-full rounded-md border border-[var(--border)] p-2" placeholder="Full name" />
        <input className="w-full rounded-md border border-[var(--border)] p-2" placeholder="Email" />
        <input className="w-full rounded-md border border-[var(--border)] p-2" placeholder="Password" type="password" />
        <button type="button" className="w-full rounded-md bg-[var(--gold)] px-4 py-2 text-white">
          Create account
        </button>
      </form>
      <p className="mt-4 text-sm text-[var(--text-mid)]">
        Already registered? <Link href="/login" className="underline">Login</Link>
      </p>
    </div>
  );
}
