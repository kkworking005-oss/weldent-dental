import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Panel } from "@/components/kit";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion";
import { clinic } from "@/lib/site";
import { canonicalLinks } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Weldent Dental | Kalena Agrahara, Bengaluru" },
      {
        name: "description",
        content:
          "Call +91 90359 95828, message us on WhatsApp or visit Weldent Multispeciality Dental Clinic in Kalena Agrahara, Bannerghatta Road, Bengaluru.",
      },
      { property: "og:title", content: "Contact Weldent Dental" },
      {
        property: "og:description",
        content: "Phone, WhatsApp, email, directions and clinic hours.",
      },
    ],
    links: canonicalLinks("/contact"),
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to a human, not a menu."
        copy="Our front desk answers during clinic hours. For anything non-urgent, leave a message and we'll come back to you."
      />

      <div className="shell grid gap-4 pb-5 md:gap-5 md:pb-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <Panel>
            <h2 className="text-2xl">Send a message</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </Panel>
        </Reveal>
        <Reveal delay={90}>
          <div className="grid gap-4 md:gap-5">
            <Panel tone="dark">
              <h2 className="text-2xl">Reach us directly</h2>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0" />
                  <a href={clinic.phoneHref}>{clinic.phone}</a>
                </li>
                <li className="flex gap-3">
                  <MessageCircle className="mt-0.5 size-4 shrink-0" />
                  <a href={clinic.whatsapp} target="_blank" rel="noreferrer">
                    WhatsApp us
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0" />
                  <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0" />
                  {clinic.address}
                </li>
              </ul>
            </Panel>
            <Panel tone="quiet">
              <Clock className="size-5 text-primary" />
              <h2 className="mt-4 text-2xl">Hours</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {clinic.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4">
                    <span>{h.day}</span>
                    <span className="text-foreground/80">{h.time}</span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </Reveal>
      </div>

      <div className="shell pb-8 md:pb-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl glass p-2.5">
            <iframe
              title="Weldent Dental Clinic location map"
              src={clinic.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="pointer-events-none h-[280px] w-full rounded-2xl border-0 md:pointer-events-auto md:h-[360px]"
            />
            <a
              href={clinic.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-5 bottom-5 inline-flex items-center gap-2 rounded-pill bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-lift"
            >
              <Navigation className="size-4" /> Open directions
            </a>
          </div>
        </Reveal>
      </div>
    </>
  );
}
