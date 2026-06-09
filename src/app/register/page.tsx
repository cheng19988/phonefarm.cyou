import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <h1 className="page-title">Create account</h1>
      <p className="page-lead text-sm">
        Register to place orders for standard products and track USDT payment status.
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-slate-500">Loading…</p>}>
          <AuthForm mode="register" />
        </Suspense>
      </div>
      <p className="mt-6 text-sm text-slate-600">
        Already registered?{" "}
        <Link href="/login" className="link-accent">
          Log in
        </Link>
      </p>
    </div>
  );
}
