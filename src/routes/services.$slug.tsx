import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Clock, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button, ButtonLink, Panel } from "@/components/kit";
import { Reveal } from "@/components/motion";
import { DoctorCard } from "@/components/cards";
import { useBooking } from "@/components/BookingContext";
import { ServiceImage } from "@/components/ServiceImage";
import { doctors, services, type Service } from "@/lib/site";
import { absoluteUrl, canonicalLinks, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Treatment unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const s = loaderData.service;
    return {
      meta: [
        { title: `${s.title} in Kalena Agrahara, Bengaluru | Weldent Dental` },
        {
          name: "description",
          content: `${s.short} Consultation available at Weldent Dental in Kalena Agrahara, Bengaluru.`,
        },
        { property: "og:title", content: `${s.title} | Weldent Dental` },
        { property: "og:description", content: s.short },
      ],
      links: canonicalLinks(`/services/${s.slug}`),
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData() as { service: Service };
  const booking = useBooking();
  const team = doctors.filter((doctor) => service.doctors.includes(doctor.slug));
  const pageUrl = absoluteUrl(`/services/${service.slug}`);
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Treatments", item: absoluteUrl("/services") },
        { "@type": "ListItem", position: 3, name: service.title, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.short,
      url: pageUrl,
      dateModified: service.dateModified,
      areaServed: [
        { "@type": "Place", name: "Kalena Agrahara" },
        { "@type": "Place", name: "Bannerghatta Road" },
        { "@type": "City", name: "Bengaluru" },
      ],
      provider: { "@type": "Dentist", "@id": `${SITE_URL}/#clinic` },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <nav aria-label="Breadcrumb" className="shell pt-3 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>
        <span aria-hidden="true"> / </span>
        <Link to="/services" className="hover:text-primary">
          Treatments
        </Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{service.title}</span>
      </nav>
      <PageHero eyebrow={service.category} title={service.title} copy={service.short}>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" onClick={booking.open}>
            Book this treatment
          </Button>
          <ButtonLink to="/services" variant="glass" size="lg">
            All treatments
          </ButtonLink>
        </div>
      </PageHero>

      <section className="shell pb-5 md:pb-6">
        <Reveal>
          <div className="glass overflow-hidden rounded-3xl p-2.5 md:p-3">
            <div className="aspect-4/3 overflow-hidden rounded-[1.15rem] bg-primary/5">
              <ServiceImage
                service={service}
                priority
                sizes="(max-width: 767px) calc(100vw - 44px), (max-width: 1279px) calc(100vw - 80px), 1200px"
                className="size-full object-contain bg-white"
              />
            </div>
          </div>
        </Reveal>
      </section>

      <div className="shell grid gap-4 pb-5 md:gap-5 md:pb-6 md:grid-cols-2">
        <Reveal>
          <Panel className="h-full">
            <Users className="size-5 text-primary" />
            <h2 className="mt-4 text-2xl">Who it's for</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.who}</p>
          </Panel>
        </Reveal>
        <Reveal delay={80}>
          <Panel className="h-full">
            <Clock className="size-5 text-primary" />
            <h2 className="mt-4 text-2xl">Time involved</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.duration}</p>
          </Panel>
        </Reveal>
      </div>

      <section className="shell py-10">
        <Reveal>
          <h2 className="text-[1.75rem] md:text-[2.6rem]">How the treatment runs</h2>
        </Reveal>
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {service.steps.map((step, i) => (
            <Reveal key={step} delay={i * 70}>
              <li className="flex gap-4 rounded-3xl glass p-6">
                <span className="grid size-9 shrink-0 place-items-center rounded-pill bg-primary font-medium text-primary-foreground">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-foreground/85">{step}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      {service.guidance?.length ? (
        <section className="shell py-10" aria-labelledby="treatment-guidance">
          <Reveal>
            <h2 id="treatment-guidance" className="text-[1.75rem] md:text-[2.6rem]">
              What to know before treatment
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {service.guidance.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <Panel className="h-full">
                  <h3 className="text-xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </Panel>
              </Reveal>
            ))}
          </div>
          {service.sources?.length ? (
            <Reveal>
              <div className="mt-5 rounded-3xl border border-border/70 p-5">
                <h3 className="font-medium">Reliable patient guidance</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {service.sources.map((source) => (
                    <li key={source.url}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary underline decoration-primary/35 underline-offset-4 hover:decoration-primary"
                      >
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : null}
        </section>
      ) : null}

      <section className="shell py-10">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <Panel tone="quiet" className="h-full">
              <h2 className="text-2xl">Aftercare</h2>
              <ul className="mt-5 space-y-3">
                {service.aftercare.map((a) => (
                  <li key={a} className="flex gap-3 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {a}
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>
          <Reveal delay={80}>
            <Panel className="h-full">
              <h2 className="text-2xl">Questions patients ask</h2>
              <div className="mt-5 space-y-5">
                {service.faqs.map((f) => (
                  <div key={f.q}>
                    <p className="font-medium">{f.q}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                  </div>
                ))}
              </div>
            </Panel>
          </Reveal>
        </div>
      </section>

      {team.length ? (
        <section className="shell py-10">
          <Reveal>
            <h2 className="text-[1.75rem] md:text-[2.6rem]">Clinician profile</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((d, i) => (
              <Reveal key={d.slug} delay={i * 80}>
                <DoctorCard doctor={d} />
              </Reveal>
            ))}
          </div>
        </section>
      ) : (
        <section className="shell py-10">
          <Reveal>
            <Panel tone="quiet">
              <h2 className="text-2xl">Treating clinician</h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                The clinic will confirm the appropriately qualified treating clinician after
                reviewing your case. No individual clinician is attributed to this treatment on the
                website until their role is verified.
              </p>
            </Panel>
          </Reveal>
        </section>
      )}

      <section className="shell py-10">
        <Reveal>
          <div className="rounded-3xl glass-dark p-6 text-center md:p-14">
            <h2 className="text-[1.75rem] md:text-[2.8rem]">
              Ready to start with {service.title}?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm text-primary-foreground/80">
              Book a consultation and get a written plan with costs before anything begins.
            </p>
            <Button variant="gold" size="lg" className="mt-8" onClick={booking.open}>
              Book an appointment
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
