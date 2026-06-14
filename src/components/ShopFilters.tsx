"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SHOP_BRANDS, PRODUCT_CATEGORIES } from "@/lib/constants";
import type { Locale } from "@/lib/i18n/config";

export function ShopFilters({
  basePath = "/shop",
  locale = "en",
}: {
  basePath?: string;
  locale?: Locale;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const q = params.get("q") || "";
  const category = params.get("category") || "";
  const isZh = locale === "zh";

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`${basePath}?${next.toString()}`);
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm text-slate-600">
          {isZh ? "搜索产品" : "Search products"}
        </label>
        <input
          type="search"
          defaultValue={q}
          placeholder={isZh ? "型号、CPU、品牌…" : "Model, CPU, brand…"}
          className="mt-1 w-full max-w-md rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          onKeyDown={(e) => {
            if (e.key === "Enter") update("q", (e.target as HTMLInputElement).value);
          }}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => router.push(basePath)}
          className={`rounded-full px-3 py-1.5 text-sm transition ${!category ? "bg-sky-600 text-white shadow-sm" : "border border-slate-300 text-slate-600 hover:border-sky-400 hover:text-sky-700"}`}
        >
          {isZh ? "全部" : "All"}
        </button>
        {SHOP_BRANDS.map((b) => (
          <button
            key={b.slug}
            type="button"
            onClick={() => update("category", b.slug)}
            className={`rounded-full px-3 py-1.5 text-sm transition ${category === b.slug ? "bg-sky-600 text-white shadow-sm" : "border border-slate-300 text-slate-600 hover:border-sky-400 hover:text-sky-700"}`}
          >
            {b.name}
          </button>
        ))}
        {PRODUCT_CATEGORIES.filter(
          (c) => !SHOP_BRANDS.some((b) => b.slug === c.slug) && c.slug !== "mirror-vip"
        ).slice(0, 5).map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => update("category", c.slug)}
            className={`rounded-full px-3 py-1 text-sm ${category === c.slug ? "bg-sky-600 text-white" : "border border-slate-300 text-slate-600 hover:border-sky-400"}`}
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  );
}
