import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { DoctorCard } from "@/components/cards";
import { Reveal } from "@/components/motion";
import { doctors } from "@/lib/site";
import { canonicalLinks } from "@/lib/seo";

export const Route = createFileRoute("/doctors/")({
  head: () => ({
    meta: [
      { title: "Dr. Sheetal Kumar G | Weldent Dental Bengaluru" },
      {
        name: "description",
        content:
          "Meet Dr. Sheetal Kumar G, BDS — principal dental surgeon at Weldent Multispeciality Dental Clinic, Kalena Agrahara, Bengaluru. KSDC registered (59793 A).",
      },
      { property: "og:title", content: "Dr. Sheetal Kumar G | Weldent Dental" },
      {
        property: "og:description",
        content:
          "BDS from Bangalore Institute of Dental Sciences, Certified Laser Practitioner and Conscious Sedation trained.",
      },
    ],
    links: canonicalLinks("/doctors"),
  }),
  component: DoctorsPage,
});

function DoctorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Your dentist"
        title="One dentist, start to finish."
        copy="Your plan is written and carried out by Dr. Sheetal Kumar G himself — no handovers, no guesswork."
      />
      <div className="shell grid max-w-xl gap-4 pb-8 md:gap-5 md:pb-10">
        {doctors.map((d, i) => (
          <Reveal key={d.slug} delay={i * 90}>
            <DoctorCard doctor={d} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
