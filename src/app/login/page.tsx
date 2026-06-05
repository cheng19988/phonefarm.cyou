import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";
import { PUBLIC_CHECKOUT_ENABLED } from "@/lib/features";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Login",
  description: "Account login for Cyou Phone Farm order tracking.",
  path: "/login",
});

export default function LoginPage() {
  if (!PUBLIC_CHECKOUT_ENABLED) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-white">Contact sales to order</h1>
        <p className="mt-4 text-slate-400">
          We handle quotes and invoices through WhatsApp, Telegram, and email — not public self-checkout.
        </p>
        <Link href="/contact" className="mt-6 inline-block rounded-lg bg-cyan-600 px-6 py-3 text-white">
          Request a Quote
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-bold text-white">Login</h1>
      <AuthForm mode="login" />
      <p className="mt-4 text-sm text-slate-400">
        No account? <Link href="/register" className="text-cyan-400">Register</Link>
      </p>
    </div>
  );
}
