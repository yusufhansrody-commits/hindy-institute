import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--parchment)] p-6">
      <div className="w-full max-w-md rounded-[20px] border border-[var(--border)] bg-white p-6 shadow-sm">
        {children}
      </div>
    </main>
  );
}
