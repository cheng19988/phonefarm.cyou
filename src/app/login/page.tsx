import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <h1 className="page-title">Account login</h1>
      <p className="page-lead text-sm">
        Sign in to view orders and complete checkout for standard configurations.
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-slate-500">Loading…</p>}>
          <AuthForm mode="login" />
        </Suspense>
      </div>
      <p className="mt-6 text-sm text-slate-600">
        No account?{" "}
        <Link href="/register" className="link-accent">
          Register
        </Link>
        {" · "}
        <Link href="/contact" className="link-accent">
          Request a quote instead
        </Link>
      </p>
    </div>
  );
}
