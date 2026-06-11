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
    <figure className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain p-1 transition duration-500 group-hover:scale-[1.02]"
        sizes="(max-width:768px) 100vw, 33vw"
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent px-5 py-4 text-sm font-medium text-white">
        {label}
      </figcaption>
    </figure>
  );
}
