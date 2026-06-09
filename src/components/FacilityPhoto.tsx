import Image from "next/image";

export function FacilityPhoto({
  src,
  alt,
  label,
}: {
  src: string;
  alt: string;
  label: string;
}) {
  return (
    <figure className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/5 card-premium !transform-none hover:!transform-none">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition duration-500 group-hover:scale-105"
        sizes="(max-width:768px) 100vw, 33vw"
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent px-5 py-4 text-sm font-medium text-white">
        {label}
      </figcaption>
    </figure>
  );
}
