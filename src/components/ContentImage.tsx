import Image from "next/image";

export function ContentImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="not-prose my-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="relative aspect-[16/10]">
        <Image src={src} alt={alt} fill className="object-contain p-2" sizes="(max-width:768px) 100vw, 768px" />
      </div>
      {caption ? (
        <figcaption className="border-t border-slate-200 px-4 py-2 text-center text-xs text-slate-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
