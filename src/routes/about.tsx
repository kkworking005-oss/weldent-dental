import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, Panel } from "@/components/kit";
import { Counter, Reveal } from "@/components/motion";
import { clinic, photos, qualifications, stats } from "@/lib/site";
import { canonicalLinks } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Weldent Dental | Kalena Agrahara, Bengaluru" },
      {
        name: "description",
        content:
          "Weldent Multispeciality Dental Clinic in Kalena Agrahara, Bengaluru — complete multispeciality dental care by Dr. Sheetal Kumar G, BDS.",
      },
      { property: "og:title", content: "About Weldent Dental" },
      {
        property: "og:description",
        content:
          "A calm, multispeciality dental practice on Bannerghatta Road, South Bengaluru, run by Dr. Sheetal Kumar G.",
      },
    ],
    links: canonicalLinks("/about"),
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="Built around one uncommon idea: unhurried dentistry."
        copy={`${clinic.businessName} is a neighbourhood multispeciality practice on Bannerghatta Road, run by Dr. Sheetal Kumar G. One dentist, one clear rule: nobody is rushed and nobody is sold treatment they don't genuinely need.`}
      />

      <div className="shell pb-6">
        <Reveal>
          <div className="overflow-hidden rounded-3xl glass p-2.5">
            <img
              src={photos.front}
              width="1448"
              height="1086"
              alt="Shopfront of Weldent Dental Clinic in Kalena Agrahara, Bengaluru"
              loading="lazy"
              className="aspect-16/9 w-full rounded-2xl object-cover"
            />
          </div>
        </Reveal>
      </div>

      <section className="shell py-8">
        <Reveal>
          <Panel tone="dark" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-[2.7rem] leading-none">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-xs text-primary-foreground/70">{s.label}</p>
              </div>
            ))}
          </Panel>
        </Reveal>
      </section>

      <section className="shell grid gap-4 py-6 md:gap-5 md:py-8 lg:grid-cols-2">
        <Reveal>
          <Panel className="h-full">
            <h2 className="text-2xl md:text-3xl">What we do here</h2>
            <ul className="mt-6 space-y-3">
              {qualifications.map((q) => (
                <li key={q} className="flex gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                  {q}
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>
        <Reveal delay={90}>
          <Panel tone="quiet" className="h-full">
            <h2 className="text-2xl md:text-3xl">Inside the clinic</h2>
            <div className="mt-6 overflow-hidden rounded-2xl">
              <img
                src={photos.operatory}
                width="1160"
                height="1356"
                alt="Treatment room at Weldent Dental Clinic"
                loading="lazy"
                className="aspect-16/9 w-full object-cover"
              />
            </div>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              A single, calm treatment room — daylight, no queue and the same familiar face at every
              visit.
            </p>
          </Panel>
        </Reveal>
      </section>

      <section className="shell py-10">
        <Reveal>
          <div className="rounded-3xl glass p-6 text-center md:p-14">
            <h2 className="mx-auto max-w-2xl text-[1.75rem] leading-tight md:text-[2.8rem]">
              Come see the clinic before you commit to anything.
            </h2>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink to="/book" size="lg">
                Book a visit
              </ButtonLink>
              <ButtonLink to="/contact" variant="glass" size="lg">
                Contact us
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
