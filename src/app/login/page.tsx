import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";
import { B2BQuotationGate } from "@/components/B2BQuotationGate";
import { buildNoIndexMetadata } from "@/lib/seo";

export const metadata = buildNoIndexMetadata(
  "Sign in",
  "Sign in to view standard configuration orders placed online after sales confirmation.",
  "/login"
);

export default function LoginPage() {
  return (
    <B2BQuotationGate title="Account access" checkoutLabel="Sign in for standard online orders">
      <div className="mx-auto max-w-lg px-4 py-12">
        <h1 className="page-title">Sign in</h1>
        <p className="page-lead text-sm">
          Access order history for standard configurations placed online after sales confirmation.
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
    </B2BQuotationGate>
  );
}
