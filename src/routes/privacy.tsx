import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { clinic } from "@/lib/site";
import { canonicalLinks } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Weldent Dental Clinic" },
      {
        name: "description",
        content:
          "How Weldent Dental Clinic collects, stores and protects patient information submitted through this website.",
      },
      { property: "og:title", content: "Privacy Policy | Weldent Dental Clinic" },
      {
        property: "og:description",
        content: "How we handle the information you share with the clinic.",
      },
    ],
    links: canonicalLinks("/privacy"),
  }),
  component: PrivacyPage,
});

const sections = [
  {
    h: "What we collect",
    p: "When you submit an appointment request or contact form, we store the name, phone number, email address, treatment preference and any notes you provide. We do not use tracking advertising cookies.",
  },
  {
    h: "Why we collect it",
    p: "Solely to confirm your appointment, answer your enquiry and maintain your clinical record as required by dental practice regulations.",
  },
  {
    h: "Who can see it",
    p: "Only the clinic's treating and administrative staff. We never sell or rent your information, and we do not share it with third-party marketers.",
  },
  {
    h: "How long we keep it",
    p: "Clinical records are retained as required by Indian medical record-keeping norms. Website enquiries that do not become appointments are removed within twelve months.",
  },
  {
    h: "Your choices",
    p: `Write to ${clinic.email} at any time to request a copy of your data, correct it, or ask us to delete non-clinical records.`,
  },
];

function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        copy="Plain-language summary of what we collect and why. Last updated June 2026."
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
