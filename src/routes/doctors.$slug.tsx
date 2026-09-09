import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button, ButtonLink, Eyebrow } from "@/components/kit";
import { Reveal } from "@/components/motion";
import { DoctorCard } from "@/components/cards";
import { useBooking } from "@/components/BookingContext";
import { doctors, type Doctor } from "@/lib/site";
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
  const isPrincipalDoctor = doctor.slug === "dr-sheetal-kumar-g";
  const consultants = doctors.filter((candidate) => candidate.role.startsWith("Consultant"));
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
              {isPrincipalDoctor ? (
                <Button size="lg" onClick={booking.open}>
                  Book with {doctor.name.split(" ")[1]}
                </Button>
              ) : null}
              <ButtonLink to="/doctors" variant="glass" size="lg">
                All doctors
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {isPrincipalDoctor ? (
        <section className="shell py-10 md:py-14" aria-labelledby="consultant-dentists-heading">
          <Reveal>
            <div className="max-w-2xl">
              <Eyebrow>Our specialist team</Eyebrow>
              <h2 id="consultant-dentists-heading" className="mt-4 text-[1.75rem] md:text-[2.6rem]">
                Consultant Dentists
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Meet the consultant dentists who provide specialist care at Weldent Dental.
              </p>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {consultants.map((consultant, index) => (
              <Reveal key={consultant.slug} delay={index * 70}>
                <DoctorCard doctor={consultant} />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
