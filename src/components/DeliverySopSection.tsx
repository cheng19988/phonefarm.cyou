import { DELIVERY_SOP } from "@/lib/delivery";

export function DeliverySopSection({ id }: { id?: string }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">From Configuration to Delivery</h2>
      <p className="mt-2 max-w-3xl text-slate-600 leading-relaxed">
        A practical delivery SOP used for hardware quotes from Guangzhou. Each step lists deliverables—not promises
        without scope confirmation.
      </p>
      <ol className="mt-10 space-y-6">
        {DELIVERY_SOP.map((phase) => (
          <li key={phase.step} className="card-premium p-6">
            <div className="flex items-start gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-600 text-sm font-bold text-white">
                {phase.step}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-semibold text-slate-900">{phase.title}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                  {phase.deliverables.map((d) => (
                    <li key={d} className="flex gap-2">
                      <span className="text-sky-600">·</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
