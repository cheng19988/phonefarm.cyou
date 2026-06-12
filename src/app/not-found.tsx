import Link from "next/link";

export default function NotFound() {
  return (
    <div className="site-container py-16 max-w-lg">
      <h1 className="page-title">Page not found</h1>
      <p className="mt-3 text-slate-600">
        This URL does not exist. Browse the shop, help center, or contact our Guangzhou sales team for a quote.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/shop" className="btn-primary">Shop catalog</Link>
        <Link href="/help" className="btn-secondary">Help center</Link>
        <Link href="/contact" className="btn-secondary">Request quote</Link>
      </div>
    </div>
  );
}
