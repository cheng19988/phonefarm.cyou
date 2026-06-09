"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addToCart } from "@/lib/cart";

type Props = {
  productId: string;
  slug: string;
  name: string;
  priceUsd: number;
  imageCard: string;
  variant?: "primary" | "secondary";
  label?: string;
};

export function AddToCartButton({
  productId,
  slug,
  name,
  priceUsd,
  imageCard,
  variant = "primary",
  label = "Add to Cart",
}: Props) {
  const router = useRouter();
  const [added, setAdded] = useState(false);

  function onClick() {
    addToCart({ productId, slug, name, priceUsd, imageCard });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const className =
    variant === "primary"
      ? "rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white hover:bg-slate-600"
      : "rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-200 hover:border-cyan-500";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={onClick} className={className}>
        {added ? "Added" : label}
      </button>
      {added && (
        <button
          type="button"
          onClick={() => router.push("/cart")}
          className="text-xs text-cyan-400 hover:underline"
        >
          View cart
        </button>
      )}
    </div>
  );
}
