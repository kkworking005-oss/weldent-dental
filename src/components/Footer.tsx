import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, Phone, Mail } from "lucide-react";
import { clinic, nav, serviceNav } from "@/lib/site-core";
import { getCurrentYear } from "@/lib/dynamicStats";

export function Footer() {
  return (
    <footer className="site-footer relative mt-10 pb-24 md:mt-24 md:pb-10">
      <div className="shell">
        <div className="rounded-3xl glass p-5 sm:p-7 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1.3fr_1fr_1fr_1.1fr] md:gap-10">
            <div>
              <p className="font-display text-2xl leading-none md:text-3xl">
                Weldent<span className="text-accent">.</span>
              </p>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground md:mt-3">
                {clinic.tagline} A calm, digital-first dental practice in South Bengaluru.
              </p>
              <div className="mt-4 flex gap-2 md:mt-5">
                <a
                  href={clinic.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="grid size-9 place-items-center rounded-pill glass-quiet transition hover:text-primary md:size-10"
                >
                  <Instagram className="size-4" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 md:contents">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Explore
                </h3>
                <ul className="mt-3 space-y-1.5 text-[13px] text-muted-foreground md:mt-4 md:space-y-2 md:text-sm">
                  {[
                    ...nav,
                    { label: "Testimonials", to: "/testimonials" },
                    { label: "FAQ", to: "/faq" },
                  ].map((i) => (
                    <li key={i.to}>
                      <Link to={i.to} className="transition hover:text-primary">
                        {i.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Treatments
                </h3>
                <ul className="mt-3 space-y-1.5 text-[13px] text-muted-foreground md:mt-4 md:space-y-2 md:text-sm">
                  {serviceNav.map((s) => (
                    <li key={s.slug}>
                      <Link
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        className="transition hover:text-primary"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Visit us
              </h3>
              <ul className="mt-3 space-y-2 text-[13px] text-muted-foreground md:mt-4 md:space-y-3 md:text-sm">
                <li className="flex gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                  {clinic.address}
                </li>
                <li className="flex gap-2">
                  <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
                  <a href={clinic.phoneHref} className="hover:text-primary">
                    {clinic.phone}
                  </a>
                </li>
                <li className="flex gap-2">
                  <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
                  <a href={`mailto:${clinic.email}`} className="hover:text-primary">
                    {clinic.email}
                  </a>
                </li>
              </ul>
              <ul className="mt-4 max-w-sm space-y-1.5 text-[11px] text-muted-foreground md:mt-4">
                {clinic.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4">
                    <span>{h.day}</span>
                    <span className="text-foreground/80">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-hair pt-5 text-[11px] leading-relaxed text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:mt-10 md:pt-6 md:text-xs">
            <p>© {getCurrentYear()} Weldent Multispeciality Dental Clinic. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-primary">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
