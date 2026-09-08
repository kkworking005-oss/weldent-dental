import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { TestimonialCard } from "@/components/cards";
import { Reveal } from "@/components/motion";
import { testimonials } from "@/lib/site";
import { canonicalLinks } from "@/lib/seo";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Patient Reviews | Weldent Dental Clinic Bengaluru" },
      {
        name: "description",
        content:
          "Read what patients say about implants, aligners, root canals and children's dentistry at Weldent Dental Clinic, Bengaluru.",
      },
      { property: "og:title", content: "Patient Reviews | Weldent Dental Clinic" },
      { property: "og:description", content: "Rated 4.9 by more than 9,200 patients." },
    ],
    links: canonicalLinks("/testimonials"),
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Rated 4.9 by the people who sat in the chair."
        copy="Unedited words from patients treated at Kalena Agrahara."
      />
      <div className="shell grid gap-4 pb-8 md:pb-10 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 70}>
            <TestimonialCard t={t} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
