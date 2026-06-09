import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <h1 className="text-2xl font-bold text-white">Create account</h1>
      <p className="mt-2 text-sm text-slate-400">
        Register to place orders for standard products and track USDT payment status.
      </p>
      <div className="mt-8">
        <Suspense fallback={<p className="text-slate-500">Loading…</p>}>
          <AuthForm mode="register" />
        </Suspense>
      </div>
      <p className="mt-6 text-sm text-slate-500">
        Already registered?{" "}
        <Link href="/login" className="text-cyan-400 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
