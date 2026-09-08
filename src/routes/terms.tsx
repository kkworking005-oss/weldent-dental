import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { canonicalLinks } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use | Weldent Dental Clinic" },
      {
        name: "description",
        content:
          "Terms governing use of the Weldent Dental Clinic website, appointment requests and the medical information published here.",
      },
      { property: "og:title", content: "Terms of Use | Weldent Dental Clinic" },
      { property: "og:description", content: "The terms that apply when you use this website." },
    ],
    links: canonicalLinks("/terms"),
  }),
  component: TermsPage,
});

const sections = [
  {
    h: "Information, not diagnosis",
    p: "Content on this website is general dental information. It is not a diagnosis and cannot replace an in-person clinical examination.",
  },
  {
    h: "Appointment requests",
    p: "Submitting the booking form is a request, not a confirmed appointment. Your slot is confirmed only when clinic staff acknowledge it by phone or message.",
  },
  {
    h: "Treatment outcomes",
    p: "Before-and-after cases shown here are real patients treated at the clinic. Individual results vary with anatomy, healing and home care, and are never guaranteed.",
  },
  {
    h: "Fees",
    p: "Indicative costs discussed online are subject to clinical examination. A written, itemised estimate is always provided before treatment begins.",
  },
  {
    h: "Intellectual property",
    p: "All text, photography and clinical case imagery on this site belongs to Weldent Dental Clinic and may not be reproduced without written permission.",
  },
];

function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        copy="The short version of what this website is and isn't. Last updated June 2026."
      />
      <div className="shell max-w-3xl space-y-3 pb-8 md:space-y-4 md:pb-10">
        {sections.map((s) => (
          <div key={s.h} className="rounded-3xl glass p-5 md:p-7">
            <h2 className="text-2xl">{s.h}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.p}</p>
          </div>
        ))}
      </div>
    </>
  );
}
