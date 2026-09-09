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
          "Read patient feedback about explanations, comfort, hygiene and dental treatment at Weldent Dental Clinic in Kalena Agrahara, Bengaluru.",
      },
      { property: "og:title", content: "Patient Reviews | Weldent Dental Clinic" },
      {
        property: "og:description",
        content: "Patient experiences shared with Weldent Dental Clinic.",
      },
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
        title="What patients say about Weldent Dental"
        copy="Unedited words from patients treated at Kalena Agrahara."
      />
      <div className="shell grid items-start gap-4 pb-8 md:pb-10 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 70}>
            <TestimonialCard t={t} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
