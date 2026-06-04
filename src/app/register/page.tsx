import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Register",
  description: "Create an account to order phone farm hardware and track USDT payments.",
  path: "/register",
});

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-center text-2xl font-bold text-white">Register</h1>
      <Suspense>
        <div className="mt-8">
          <AuthForm mode="register" />
        </div>
      </Suspense>
      <p className="mt-4 text-center text-sm text-slate-400">
        Have an account? <Link href="/login" className="text-cyan-400">Login</Link>
      </p>
    </div>
  );
}
