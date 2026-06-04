"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SHOP_BRANDS, PRODUCT_CATEGORIES } from "@/lib/constants";

export function ShopFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const q = params.get("q") || "";
  const category = params.get("category") || "";

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const base = window.location.pathname.startsWith("/products") ? "/products" : "/shop";
    router.push(`${base}?${next.toString()}`);
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm text-slate-400">Search products</label>
        <input
          type="search"
          defaultValue={q}
          placeholder="Model, CPU, brand…"
          className="mt-1 w-full max-w-md rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white"
          onKeyDown={(e) => {
            if (e.key === "Enter") update("q", (e.target as HTMLInputElement).value);
          }}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => router.push(window.location.pathname.startsWith("/products") ? "/products" : "/shop")}
          className={`rounded-full px-3 py-1 text-sm ${!category ? "bg-cyan-600 text-white" : "border border-slate-700 text-slate-400"}`}
        >
          All
        </button>
        {SHOP_BRANDS.map((b) => (
          <button
            key={b.slug}
            type="button"
            onClick={() => update("category", b.slug)}
            className={`rounded-full px-3 py-1 text-sm ${category === b.slug ? "bg-cyan-600 text-white" : "border border-slate-700 text-slate-400"}`}
          >
            {b.name}
          </button>
        ))}
        {PRODUCT_CATEGORIES.filter((c) => !SHOP_BRANDS.some((b) => b.slug === c.slug)).slice(0, 5).map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => update("category", c.slug)}
            className={`rounded-full px-3 py-1 text-sm ${category === c.slug ? "bg-cyan-600 text-white" : "border border-slate-700 text-slate-400"}`}
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}
