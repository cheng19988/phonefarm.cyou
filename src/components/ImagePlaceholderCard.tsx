export function ImagePlaceholderCard({ label }: { label: string }) {
  const normalized = label.replace(/^\[Image placeholder:\s*/i, "").replace(/\]$/, "").trim();

  return (
    <figure className="not-prose my-6 overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50">
      <div className="flex aspect-[16/9] flex-col items-center justify-center px-6 py-10 text-center">
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-500">
          Diagram pending
        </span>
        <p className="mt-4 text-sm font-medium text-slate-700">Recommended image type</p>
        <p className="mt-2 max-w-md text-sm text-sky-800">{normalized}</p>
        <p className="mt-3 text-xs text-slate-500">
          Replace with a real photo or diagram when available — not a stock image.
        </p>
      </div>
      <figcaption className="border-t border-slate-200 px-4 py-2 text-center text-xs text-slate-500">
        [Image placeholder: {normalized}]
      </figcaption>
    </figure>
  );
}
