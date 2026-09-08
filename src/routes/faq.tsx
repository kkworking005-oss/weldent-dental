import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion";
import { faqs } from "@/lib/site";
import { cn } from "@/lib/utils";
import { canonicalLinks } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Dental FAQs | Weldent Dental Bengaluru" },
      {
        name: "description",
        content:
          "Answers on appointment confirmation, costs, sterilisation protocols, equipment and treatment comfort at Weldent Multispeciality Dental Clinic, Bengaluru.",
      },
      { property: "og:title", content: "Frequently Asked Questions | Weldent Dental" },
      {
        property: "og:description",
        content:
          "Appointments, costs, sterilisation and treatment — answered plainly by the Weldent Dental team.",
      },
    ],
    links: canonicalLinks("/faq"),
  }),
  component: FaqPage,
});

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-3xl glass px-6">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-[1.05rem] font-medium">{q}</span>
        <ChevronDown className={cn("size-4 shrink-0 transition-transform", open && "rotate-180")} />
      </button>
      {open ? <p className="pb-6 text-sm leading-relaxed text-muted-foreground">{a}</p> : null}
    </div>
  );
}

function FaqPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <PageHero
        eyebrow="FAQ"
        title="Questions, answered without the sales pitch."
        copy="If something isn't here, call the clinic — the front desk answers rather than routing you through a menu."
      />
      <div className="shell space-y-8 pb-8 md:space-y-12 md:pb-10">
        {faqs.map((group) => (
          <section key={group.group}>
            <Reveal>
              <h2 className="text-2xl md:text-3xl">{group.group}</h2>
            </Reveal>
            <div className="mt-5 grid gap-3">
              {group.items.map((item, i) => (
                <Reveal key={item.q} delay={i * 60}>
                  <Item q={item.q} a={item.a} />
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
