import { BUYER_TRUST_ITEMS } from "@/lib/delivery";
import { HOME_TRUST_PHOTOS } from "@/lib/images";
import { SITE } from "@/lib/constants";
import { FacilityPhoto } from "./FacilityPhoto";
import { SectionHeading } from "./ui/SectionHeading";

export function BuyerTrustSection() {
  const siteName = SITE.name;
  return (
    <section className="section-alt py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          title={`Why buyers work with ${siteName}`}
          subtitle="Practical reasons overseas QA teams, device labs, and hardware buyers choose a Guangzhou-based supplier."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {BUYER_TRUST_ITEMS.map((item) => (
            <article key={item.title} className="card-premium p-6">
              <h3 className="font-display text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.desc}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {HOME_TRUST_PHOTOS.map((photo) => (
            <FacilityPhoto key={photo.label} src={photo.src} alt={photo.alt} label={photo.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
