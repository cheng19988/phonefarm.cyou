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
    <figure className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-800">
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent px-4 py-3 text-sm font-medium text-white">
        {label}
      </figcaption>
    </figure>
  );
}
