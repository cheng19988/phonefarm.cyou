import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";
import { PUBLIC_CHECKOUT_ENABLED } from "@/lib/features";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Register",
  description: "Create an account for Cyou Phone Farm order tracking.",
  path: "/register",
});

export default function RegisterPage() {
  if (!PUBLIC_CHECKOUT_ENABLED) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-white">Start with a quote</h1>
        <p className="mt-4 text-slate-400">
          New buyers should contact sales first. We will create any account needed when your order is confirmed.
        </p>
        <Link href="/contact" className="mt-6 inline-block rounded-lg bg-cyan-600 px-6 py-3 text-white">
          Contact Sales
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-bold text-white">Register</h1>
      <AuthForm mode="register" />
      <p className="mt-4 text-sm text-slate-400">
        Have an account? <Link href="/login" className="text-cyan-400">Login</Link>
      </p>
    </div>
  );
}
