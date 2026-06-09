import Link from "next/link";
import { CheckoutForm } from "@/components/CheckoutForm";

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Link href="/cart" className="text-sm text-cyan-400 hover:underline">
        ← Back to cart
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-white">Checkout</h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-400">
        Complete your details for standard online orders. Bulk or custom deployments should go through{" "}
        <Link href="/contact" className="text-cyan-400 hover:underline">
          sales inquiry
        </Link>{" "}
        first.
      </p>
      <div className="mt-10">
        <CheckoutForm />
      </div>
    </div>
  );
}
