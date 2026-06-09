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
  fullWidth?: boolean;
};

export function AddToCartButton({
  productId,
  slug,
  name,
  priceUsd,
  imageCard,
  variant = "primary",
  label = "Add to Cart",
  fullWidth = false,
}: Props) {
  const router = useRouter();
  const [added, setAdded] = useState(false);

  function onClick() {
    addToCart({ productId, slug, name, priceUsd, imageCard });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const width = fullWidth ? "w-full" : "";
  const className =
    variant === "primary"
      ? `btn-primary text-sm !py-2.5 ${width}`
      : `btn-secondary text-sm !py-2.5 ${width}`;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${fullWidth ? "w-full" : ""}`}>
      <button type="button" onClick={onClick} className={className}>
        {added ? "✓ Added to cart" : label}
      </button>
      {added && !fullWidth && (
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
