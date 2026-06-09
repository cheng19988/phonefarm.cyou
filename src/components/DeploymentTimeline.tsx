import { DEPLOYMENT_STEPS } from "@/lib/constants";

export function DeploymentTimeline() {
  return (
    <ol className="relative mt-10 space-y-0 border-l-2 border-sky-200 pl-8">
      {DEPLOYMENT_STEPS.map((s) => (
        <li key={s.step} className="relative pb-10 last:pb-0">
          <span className="absolute -left-[2.35rem] flex h-8 w-8 items-center justify-center rounded-full bg-sky-600 text-sm font-bold text-white shadow-sm">
            {s.step}
          </span>
          <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">{s.desc}</p>
        </li>
      ))}
    </ol>
  );
}
