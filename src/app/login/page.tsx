import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Login",
  description: "Login to manage phone farm hardware orders and USDT payments.",
  path: "/login",
});

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-center text-2xl font-bold text-white">Login</h1>
      <Suspense>
        <div className="mt-8">
          <AuthForm mode="login" />
        </div>
      </Suspense>
      <p className="mt-4 text-center text-sm text-slate-400">
        No account? <Link href="/register" className="text-cyan-400">Register</Link>
      </p>
    </div>
  );
}
