import { DEPLOYMENT_STEPS } from "@/lib/constants";

export function DeploymentTimeline() {
  return (
    <ol className="relative mt-10 space-y-0 border-l border-cyan-800/50 pl-8">
      {DEPLOYMENT_STEPS.map((s) => (
        <li key={s.step} className="relative pb-10 last:pb-0">
          <span className="absolute -left-[2.35rem] flex h-8 w-8 items-center justify-center rounded-full bg-cyan-600 text-sm font-bold text-white">
            {s.step}
          </span>
          <h3 className="text-lg font-semibold text-white">{s.title}</h3>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">{s.desc}</p>
        </li>
      ))}
    </ol>
  );
}
