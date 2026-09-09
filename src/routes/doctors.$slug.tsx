import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Award, Quote } from "lucide-react";
import { Button, ButtonLink, Eyebrow, Panel } from "@/components/kit";
import { Reveal } from "@/components/motion";
import { ServiceCard } from "@/components/cards";
import { useBooking } from "@/components/BookingContext";
import { doctors, services, type Doctor } from "@/lib/site";
import { absoluteUrl, canonicalLinks, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/doctors/$slug")({
  loader: ({ params }) => {
    const doctor = doctors.find((d) => d.slug === params.slug);
    if (!doctor) throw notFound();
    return { doctor };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Profile unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const d = loaderData.doctor;
    return {
      meta: [
        { title: `${d.name}, Dentist in Kalena Agrahara | Weldent Dental` },
        { name: "description", content: `${d.name}, ${d.qualifications}. ${d.philosophy}` },
        { property: "og:title", content: `${d.name} | Weldent Dental Clinic` },
        { property: "og:description", content: d.philosophy },
      ],
      links: canonicalLinks(`/doctors/${d.slug}`),
    };
  },
  component: DoctorDetail,
});

function DoctorDetail() {
  const { doctor } = Route.useLoaderData() as { doctor: Doctor };
  const booking = useBooking();
  const treatments = services.filter((service) => service.doctors.includes(doctor.slug));
  const pageUrl = absoluteUrl(`/doctors/${doctor.slug}`);
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Doctors", item: absoluteUrl("/doctors") },
        { "@type": "ListItem", position: 3, name: doctor.name, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${pageUrl}#doctor`,
      name: doctor.name,
      jobTitle: doctor.role,
      description: doctor.qualifications,
      image: absoluteUrl(doctor.photo),
      url: pageUrl,
      ...(doctor.registration ? { identifier: doctor.registration } : {}),
      worksFor: { "@type": "Dentist", "@id": `${SITE_URL}/#clinic` },
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
        <Link to="/doctors" className="hover:text-primary">
          Doctors
        </Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{doctor.name}</span>
      </nav>
      <section className="shell pt-5 pb-8 md:pt-12 md:pb-10">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="overflow-hidden rounded-3xl glass p-2.5">
              <img
                src={doctor.photo}
                srcSet={`${doctor.photo.replace(/\.webp$/, "-480.webp")} 480w, ${doctor.photo} 768w`}
                sizes="(max-width: 1023px) calc(100vw - 40px), 38vw"
                width="768"
                height="1024"
                alt={`${doctor.name}, dentist at Weldent Dental in Kalena Agrahara, Bengaluru`}
                className="aspect-3/4 w-full rounded-2xl object-cover object-top"
              />
            </div>
          </Reveal>
          <div className="md:animate-fade-up">
            <Eyebrow>{doctor.role}</Eyebrow>
            <h1 className="mt-5 text-[2.1rem] leading-[1.02] md:text-[4rem]">{doctor.name}</h1>
            <p className="mt-3 text-sm text-primary">{doctor.qualifications}</p>
            <section className="mt-6" aria-labelledby="specialties-heading">
              <h2 id="specialties-heading" className="text-sm font-semibold text-foreground">
                Specialties and consultation focus
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {doctor.specialties.map((specialty) => (
                  <li
                    key={specialty}
                    className="rounded-full bg-primary/8 px-3 py-1.5 text-xs text-primary"
                  >
                    {specialty}
                  </li>
                ))}
              </ul>
            </section>
            <div className="mt-6 space-y-4">
              {doctor.bio.map((p) => (
                <p key={p} className="text-sm leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" onClick={booking.open}>
                Book with {doctor.name.split(" ")[1]}
              </Button>
              <ButtonLink to="/doctors" variant="glass" size="lg">
                All doctors
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <div className="shell grid gap-4 pb-5 md:gap-5 md:pb-6 md:grid-cols-2">
        <Reveal>
          <Panel className="h-full">
            <Quote className="size-5 text-accent" />
            <h2 className="mt-4 text-2xl">Philosophy</h2>
            <p className="mt-3 font-display text-[1.5rem] leading-snug">{doctor.philosophy}</p>
          </Panel>
        </Reveal>
        <Reveal delay={80}>
          <Panel tone="quiet" className="h-full">
            <Award className="size-5 text-primary" />
            <h2 className="mt-4 text-2xl">
              {doctor.memberships.length ? "Memberships" : "Consultation"}
            </h2>
            {doctor.memberships.length ? (
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {doctor.memberships.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                Contact Weldent Dental to confirm availability and treatment assignment.
              </p>
            )}
          </Panel>
        </Reveal>
      </div>

      {treatments.length ? (
        <section className="shell py-10">
          <Reveal>
            <h2 className="text-[1.75rem] md:text-[2.6rem]">
              Treatments {doctor.name.split(" ")[1]} handles
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {treatments.map((s, i) => (
              <Reveal key={s.slug} delay={i * 70}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
