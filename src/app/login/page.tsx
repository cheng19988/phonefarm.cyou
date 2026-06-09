import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <h1 className="text-2xl font-bold text-white">Account login</h1>
      <p className="mt-2 text-sm text-slate-400">
        Sign in to view orders and complete checkout for standard configurations.
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-slate-500">Loading…</p>}>
          <AuthForm mode="login" />
        </Suspense>
      </div>
      <p className="mt-6 text-sm text-slate-500">
        No account?{" "}
        <Link href="/register" className="text-cyan-400 hover:underline">
          Register
        </Link>
        {" · "}
        <Link href="/contact" className="text-cyan-400 hover:underline">
          Request a quote instead
        </Link>
      </p>
    </div>
  );
}
