import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/cards";
import { Reveal } from "@/components/motion";
import { services } from "@/lib/site";
import { canonicalLinks } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Dental Treatments in Bengaluru | Weldent Dental" },
      {
        name: "description",
        content:
          "Preventive care, root canals, crown & bridge, braces, implants, whitening, kids and geriatric dentistry at Weldent Multispeciality Dental Clinic, Bengaluru.",
      },
      { property: "og:title", content: "Dental Treatments | Weldent Dental" },
      {
        property: "og:description",
        content:
          "Preventive, restorative, cosmetic, orthodontic and specialized dentistry under one roof in Kalena Agrahara.",
      },
    ],
    links: canonicalLinks("/services"),
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const categories = [...new Set(services.map((s) => s.category))];

  return (
    <>
      <PageHero
        eyebrow="Treatments"
        title="Every speciality, one calm clinic."
        copy="From a routine polish to a full mouth reconstruction — planned digitally, explained plainly, priced up front."
      />
      <div className="shell space-y-9 pb-8 md:space-y-14 md:pb-10">
        {categories.map((cat) => (
          <section key={cat}>
            <Reveal>
              <h2 className="text-2xl md:text-3xl">
                {cat}
                <span className="ml-3 text-sm text-muted-foreground">
                  {services.filter((s) => s.category === cat).length} treatments
                </span>
              </h2>
            </Reveal>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {services
                .filter((s) => s.category === cat)
                .map((s, i) => (
                  <Reveal key={s.slug} delay={i * 70}>
                    <ServiceCard service={s} />
                  </Reveal>
                ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
