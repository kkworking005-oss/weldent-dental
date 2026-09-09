import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { DoctorCard } from "@/components/cards";
import { Reveal } from "@/components/motion";
import { doctors } from "@/lib/site";
import { canonicalLinks } from "@/lib/seo";

export const Route = createFileRoute("/doctors/")({
  head: () => ({
    meta: [
      { title: "Dentists at Weldent Dental | Kalena Agrahara, Bengaluru" },
      {
        name: "description",
        content:
          "Meet the principal and consultant dentists at Weldent Multispeciality Dental Clinic in Kalena Agrahara, Bengaluru.",
      },
      { property: "og:title", content: "Dentists at Weldent Dental" },
      {
        property: "og:description",
        content:
          "Meet the dental team consulting at Weldent Multispeciality Dental Clinic in Kalena Agrahara.",
      },
    ],
    links: canonicalLinks("/doctors"),
  }),
  component: DoctorsPage,
});

function DoctorsPage() {
  const principalDentists = doctors.filter((doctor) => !doctor.role.startsWith("Consultant"));
  const consultantDentists = doctors.filter((doctor) => doctor.role.startsWith("Consultant"));

  return (
    <>
      <PageHero
        eyebrow="Your dentist"
        title="Meet our dental team in Kalena Agrahara"
        copy="Meet the principal and consultant dentists at Weldent Dental. Contact the clinic to confirm each consultant's availability and treatment assignment."
      />
      <section className="shell pb-8 md:pb-10" aria-labelledby="principal-dentist-heading">
        <h2 id="principal-dentist-heading" className="sr-only">
          Principal dentist
        </h2>
        <div className="grid max-w-sm gap-4 sm:grid-cols-2 md:gap-5">
          {principalDentists.map((d, i) => (
            <Reveal key={d.slug} delay={i * 90}>
              <DoctorCard doctor={d} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell pb-8 md:pb-10" aria-labelledby="consultant-dentists-heading">
        <div className="max-w-2xl">
          <p className="eyebrow">Specialist support</p>
          <h2
            id="consultant-dentists-heading"
            className="mt-3 text-[2rem] leading-tight md:text-[3rem]"
          >
            Consultant Dentists
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Select a consultant to view their qualifications, consultation focus and full profile.
          </p>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {consultantDentists.map((d, i) => (
            <Reveal key={d.slug} delay={i * 90}>
              <DoctorCard doctor={d} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
