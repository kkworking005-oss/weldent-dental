import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Sparkles, Clock, Quote } from "lucide-react";
import { Button, ButtonLink, Eyebrow, Panel, SectionHeading, btnClass } from "@/components/kit";
import { Counter, Reveal } from "@/components/motion";
import { DoctorCard, ServiceCard, TestimonialCard } from "@/components/cards";
import { BeforeAfter } from "@/components/BeforeAfter";
import { HeroCarousel } from "@/components/HeroCarousel";
import { useBooking } from "@/components/BookingContext";
import {
  cases,
  clinic,
  doctors,
  heroImages,
  posts,
  services,
  stats,
  testimonials,
} from "@/lib/site";
import { canonicalLinks } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Dental Clinic in Kalena Agrahara, Bengaluru | Weldent Dental",
      },
      {
        name: "description",
        content:
          "Visit Weldent Dental, a dental clinic in Kalena Agrahara near Bannerghatta Road, Bengaluru, for check-ups, teeth cleaning, root canals, crowns and family dental care.",
      },
      {
        property: "og:title",
        content: "Dental Clinic in Kalena Agrahara, Bengaluru | Weldent Dental",
      },
      {
        property: "og:description",
        content:
          "Preventive, restorative and specialised dental care near Bannerghatta Road in South Bengaluru.",
      },
      { property: "og:url", content: "https://weldentdental.com/" },
      {
        name: "twitter:title",
        content: "Dental Clinic in Kalena Agrahara, Bengaluru | Weldent Dental",
      },
      {
        name: "twitter:description",
        content:
          "Preventive, restorative and specialised dental care near Bannerghatta Road in South Bengaluru.",
      },
    ],
    links: canonicalLinks("/"),
  }),
  component: Home,
});

function Home() {
  const booking = useBooking();
  const featured = services.slice(0, 2);

  return (
    <>
      <section className="shell pt-4 pb-10 md:pt-10 md:pb-16">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="md:animate-fade-up">
            <Eyebrow>Weldent Multispeciality Dental Clinic</Eyebrow>
            <h1 className="mt-7 text-[2.6rem] leading-[1] sm:text-[3.3rem] md:text-[5rem]">
              Complete dental care in
              <br />
              <span className="italic text-primary">Kalena Agrahara, Bengaluru.</span>
            </h1>
            <p className="mt-6 max-w-lg text-[1.02rem] leading-relaxed text-muted-foreground">
              Dentistry that feels quietly effortless. {clinic.tagline} Visit our neighbourhood
              dental clinic near Bannerghatta Road for clear explanations, careful diagnosis and
              treatment options tailored to your needs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" onClick={booking.open}>
                Book an appointment <ArrowRight className="size-4" />
              </Button>
              <ButtonLink to="/services" variant="glass" size="lg">
                Explore treatments
              </ButtonLink>
            </div>
            <div className="mt-10 flex flex-wrap gap-2">
              {[
                { icon: ShieldCheck, label: "Documented sterilisation protocols" },
                { icon: Sparkles, label: "Digital X-rays" },
                { icon: Clock, label: "Open 7 days" },
              ].map((b) => (
                <span
                  key={b.label}
                  className="inline-flex items-center gap-2 rounded-pill glass-quiet px-4 py-2 text-xs text-foreground/80"
                >
                  <b.icon className="size-3.5 text-primary" />
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          <Reveal delay={120}>
            <div className="relative">
              <div className="overflow-hidden rounded-3xl glass p-2.5 shadow-lift">
                <HeroCarousel images={heroImages} />
              </div>
              <div className="absolute -bottom-6 -left-4 hidden rounded-3xl glass px-6 py-5 shadow-lift sm:block">
                <p className="font-display text-4xl text-primary">
                  <Counter to={stats[1]!.value} suffix="+" />
                </p>
                <p className="mt-1 text-xs tracking-wide text-muted-foreground">
                  smiles treated with care
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell py-6 md:py-8">
        <Reveal>
          <Panel tone="dark" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-[2.7rem] leading-none">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-xs tracking-wide text-primary-foreground/70">{s.label}</p>
                {s.detail ? (
                  <p className="mt-1 text-[0.68rem] leading-relaxed text-primary-foreground/55">
                    {s.detail}
                  </p>
                ) : null}
              </div>
            ))}
          </Panel>
        </Reveal>
      </section>

      <section className="shell py-10 md:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Treatments"
            title="Care planned in detail, delivered gently"
            copy="Explore preventive, restorative and specialised dental care. Your options, expected visits and costs are explained before treatment begins."
            action={
              <ButtonLink to="/services" variant="glass">
                All services
              </ButtonLink>
            }
          />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {featured.map((s, i) => (
            <Reveal key={s.slug} delay={i * 70}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <ButtonLink to="/services" variant="glass">
            View all treatments
          </ButtonLink>
        </div>
      </section>

      <section className="shell py-10 md:py-16">
        <Reveal>
          <div className="grid gap-8 rounded-3xl glass p-5 md:p-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="overflow-hidden rounded-3xl">
              <img
                src={doctors[0]!.photo}
                srcSet={`${doctors[0]!.photo.replace(/\.webp$/, "-480.webp")} 480w, ${doctors[0]!.photo} 768w`}
                sizes="(max-width: 1023px) calc(100vw - 40px), 42vw"
                width="768"
                height="1024"
                alt="Dr. Sheetal Kumar G, Principal Dental Surgeon at Weldent Dental"
                loading="lazy"
                className="aspect-[4/5] size-full object-cover object-[50%_28%] sm:aspect-4/3"
              />
            </div>
            <div className="flex flex-col justify-center">
              <Eyebrow>Meet your dentist</Eyebrow>
              <h2 className="mt-5 text-[2.2rem] leading-tight md:text-[3rem]">
                {doctors[0]!.name}
              </h2>
              <p className="mt-2 text-sm text-primary">{doctors[0]!.qualifications}</p>
              <Quote className="mt-6 size-6 text-accent" />
              <p className="mt-3 font-display text-[1.6rem] leading-snug">
                {doctors[0]!.philosophy}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {doctors[0]!.bio[0]}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/doctors/$slug"
                  params={{ slug: doctors[0]!.slug }}
                  className={btnClass()}
                >
                  Full profile
                </Link>
                <ButtonLink to="/gallery" variant="glass">
                  See results
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="shell py-10 md:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Results"
            title="Before and after, unretouched"
            copy="Drag the handle to compare treatment photographs shared by Weldent Dental. Individual results vary."
            action={
              <ButtonLink to="/gallery" variant="glass">
                Full gallery
              </ButtonLink>
            }
          />
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {cases.slice(0, 2).map((c, i) => (
            <Reveal key={c.id} delay={i * 90}>
              <div className="rounded-3xl glass p-3">
                <BeforeAfter
                  before={c.before}
                  after={c.after}
                  beforeSrcSet={c.beforeSrcSet}
                  afterSrcSet={c.afterSrcSet}
                  alt={c.title}
                />
                <div className="px-3 py-4">
                  <h3 className="text-xl">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.note}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell py-10 md:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="In their words"
            title="What our patients say"
            action={
              <ButtonLink to="/testimonials" variant="glass">
                View all patient testimonials
              </ButtonLink>
            }
          />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {testimonials.slice(0, 3).map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <TestimonialCard t={t} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell py-10 md:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Journal"
            title="Reading worth five minutes"
            action={
              <ButtonLink to="/blog" variant="glass">
                All articles
              </ButtonLink>
            }
          />
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {posts.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="glass glass-sheen flex h-full flex-col rounded-3xl p-6 transition hover:-translate-y-1.5"
              >
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary/70">
                  {p.category} · {p.date}
                </span>
                <h3 className="mt-3 text-2xl leading-tight">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="shell py-10 md:py-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl glass-dark p-7 text-center md:p-16">
            <h2 className="mx-auto max-w-2xl text-[2.2rem] leading-tight md:text-[3.2rem]">
              Your smile deserves an unhurried hour.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-primary-foreground/80">
              Book a consultation and leave with a written plan, itemised costs and no pressure.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button variant="gold" size="lg" onClick={booking.open}>
                Book an appointment
              </Button>
              <a
                href={clinic.phoneHref}
                className="inline-flex items-center justify-center rounded-pill border border-white/30 px-7 py-3.5 text-[0.95rem] text-primary-foreground transition hover:bg-white/10"
              >
                Call {clinic.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="shell pb-10 md:pb-16" aria-labelledby="clinic-location">
        <Reveal>
          <div className="overflow-hidden rounded-3xl glass p-2.5 md:p-3">
            <div className="flex flex-col gap-3 px-3 pb-4 pt-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <div>
                <Eyebrow>Visit Weldent</Eyebrow>
                <h2 id="clinic-location" className="mt-2 text-2xl md:text-3xl">
                  Find the clinic
                </h2>
              </div>
              <a
                href={clinic.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center justify-center rounded-pill bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:brightness-110"
              >
                Open in Google Maps
              </a>
            </div>
            <iframe
              title="Weldent Multispeciality Dental Clinic location on Google Maps"
              src={clinic.mapEmbed}
              className="h-72 w-full rounded-[1.25rem] border-0 sm:h-80 md:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
