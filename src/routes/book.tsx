import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Panel } from "@/components/kit";
import { AppointmentForm } from "@/components/AppointmentForm";
import { Reveal } from "@/components/motion";
import { clinic } from "@/lib/site";
import { canonicalLinks } from "@/lib/seo";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Request a Dental Appointment | Weldent Dental Bengaluru" },
      {
        name: "description",
        content:
          "Request an appointment at Weldent Multispeciality Dental Clinic, Kalena Agrahara, Bengaluru. Choose your treatment, doctor and preferred time. We follow up manually to confirm.",
      },
      { property: "og:title", content: "Request an Appointment | Weldent Dental" },
      {
        property: "og:description",
        content:
          "Pick a treatment, doctor and preferred time — our team will follow up personally to confirm your slot.",
      },
    ],
    links: canonicalLinks("/book"),
  }),
  component: BookPage,
});

function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Appointments"
        title="Reserve an unhurried hour."
        copy="Fill this in and our team confirms your slot by phone or WhatsApp, usually within clinic hours. (Appointment requests are not instant.)"
      />
      <div className="shell grid gap-4 pb-8 md:gap-5 md:pb-10 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <Panel>
            <AppointmentForm />
          </Panel>
        </Reveal>
        <Reveal delay={90}>
          <div className="grid gap-4 md:gap-5">
            <Panel tone="dark">
              <Clock className="size-5" />
              <h2 className="mt-4 text-2xl">Clinic hours</h2>
              <ul className="mt-4 space-y-2 text-sm text-primary-foreground/85">
                {clinic.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4">
                    <span>{h.day}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel tone="quiet">
              <MapPin className="size-5 text-primary" />
              <h2 className="mt-4 text-2xl">Where we are</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{clinic.address}</p>
              <a
                href={clinic.phoneHref}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary"
              >
                <Phone className="size-4" /> {clinic.phone}
              </a>
            </Panel>
          </div>
        </Reveal>
      </div>
    </>
  );
}
