import Link from "next/link";
import { Suspense } from "react";
import { AuthForm } from "@/components/AuthForm";
import { B2BQuotationGate } from "@/components/B2BQuotationGate";

export default function RegisterPage() {
  return (
    <B2BQuotationGate title="Create account" checkoutLabel="Register for standard online orders">
      <div className="mx-auto max-w-lg px-4 py-12">
        <h1 className="page-title">Create account</h1>
        <p className="page-lead text-sm">
          Register to track standard configuration orders placed online after sales confirms payment instructions.
        </p>
        <div className="mt-8">
          <Suspense fallback={<p className="text-slate-500">Loading…</p>}>
            <AuthForm mode="register" />
          </Suspense>
        </div>
        <p className="mt-6 text-sm text-slate-600">
          Already registered?{" "}
          <Link href="/login" className="link-accent">
            Sign in
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
