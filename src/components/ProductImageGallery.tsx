"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductImageGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const list = images.length ? images : [];
  const [active, setActive] = useState(0);
  const current = list[active] ?? list[0];

  if (!current) return null;

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
        <Image
          src={current}
          alt={name}
          fill
          className="object-contain p-2"
          sizes="(max-width:768px) 100vw, 40vw"
          priority
        />
      </div>
      {list.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {list.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-white ${
                i === active ? "border-sky-600" : "border-slate-200 hover:border-sky-300"
              }`}
            >
              <Image src={src} alt="" fill className="object-contain p-0.5" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
