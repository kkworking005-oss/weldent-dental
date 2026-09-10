"use client";

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Star } from "lucide-react";
import type { Doctor, Service } from "@/lib/site";
import { ServiceImage } from "@/components/ServiceImage";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      to="/services/$slug"
      params={{ slug: service.slug }}
      className="glass glass-sheen group flex h-full flex-col overflow-hidden rounded-3xl p-2.5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
    >
      <div className="aspect-4/3 overflow-hidden rounded-[1.15rem] bg-primary/5">
        <ServiceImage
          service={service}
          className="size-full object-cover group-hover:scale-[1.025]"
        />
      </div>
      <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-5 md:px-4 md:pb-4">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary/70">
          {service.category}
        </span>
        <h3 className="mt-3 text-[clamp(1.5rem,2vw,2.25rem)] font-black leading-[1.08] tracking-[-0.05em] text-foreground">
          {service.title}
        </h3>
        <p className="mt-3 text-sm font-medium leading-snug text-foreground/75">
          {service.short}
        </p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-primary">
          Explore
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function DoctorCard({
  doctor,
  variant = "default",
}: {
  doctor: Doctor;
  variant?: "default" | "featured";
}) {
  const isFeatured = variant === "featured";

  return (
    <Link
      to="/doctors/$slug"
      params={{ slug: doctor.slug }}
      aria-label={`View ${doctor.name}'s full profile, qualifications and specialties`}
      className={[
        "glass group h-full min-w-0 overflow-hidden rounded-[2rem] p-2.5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift",
        isFeatured ? "flex flex-col md:flex-row md:items-stretch" : "flex flex-col",
      ].join(" ")}
    >
      <div
        className={[
          "shrink-0 overflow-hidden rounded-[1.5rem] bg-primary/5",
          isFeatured ? "w-full md:w-[46%] md:max-w-[480px] aspect-[4/5]" : "aspect-3/4 w-full",
        ].join(" ")}
      >
        <img
          src={doctor.photo}
          srcSet={`${doctor.photo.replace(/\.webp$/, "-480.webp")} 480w, ${doctor.photo} 768w`}
          sizes={
            isFeatured
              ? "(max-width: 767px) 100vw, 480px"
              : "(max-width: 639px) calc(100vw - 44px), (max-width: 1023px) 46vw, 280px"
          }
          alt={doctor.name}
          loading="lazy"
          width="768"
          height="1024"
          className="block size-full object-cover object-top transition-transform duration-[1200ms] group-hover:scale-[1.025]"
        />
      </div>
      <div
        className={[
          "flex min-w-0 flex-1 flex-col",
          isFeatured ? "justify-center px-5 py-6 md:px-8 md:py-8 lg:px-10" : "px-4 py-5",
        ].join(" ")}
      >
        <h3
          className={[
            "break-words leading-tight",
            isFeatured ? "text-[clamp(2.2rem,4vw,4rem)] tracking-[-0.04em]" : "text-2xl",
          ].join(" ")}
        >
          {doctor.name}
        </h3>
        <p
          className={
            isFeatured ? "mt-2 text-base text-primary md:text-lg" : "mt-1 text-sm text-primary"
          }
        >
          {doctor.role}
        </p>
        <p
          className={[
            "leading-relaxed text-muted-foreground",
            isFeatured ? "mt-4 max-w-xl text-base md:text-lg" : "mt-2 text-xs",
          ].join(" ")}
        >
          {doctor.qualifications}
        </p>
        <span
          className={[
            "font-medium text-primary",
            isFeatured ? "mt-6 text-xl md:text-2xl" : "mt-4 text-sm",
          ].join(" ")}
        >
          View profile →
        </span>
      </div>
    </Link>
  );
}

export function TestimonialCard({
  t,
}: {
  t: { name: string; treatment: string; rating: number; quote: string };
}) {
  const [expanded, setExpanded] = useState(false);
  const shouldTruncate = t.quote.length > 220;
  const displayQuote =
    shouldTruncate && !expanded ? `${t.quote.slice(0, 220).trimEnd()}…` : t.quote;

  return (
    <figure className="glass flex h-full flex-col self-start rounded-3xl p-5 md:p-6">
      <div className="flex gap-1 text-accent">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="size-4 fill-current" />
        ))}
      </div>

      <blockquote className="mt-4 flex-1 font-display text-[1.2rem] leading-snug text-foreground/90 md:text-[1.35rem]">
        “{displayQuote}”
      </blockquote>

      {shouldTruncate && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-3 self-start text-sm font-medium text-primary underline-offset-4 transition hover:underline"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}

      <figcaption className="mt-5 border-t border-hair pt-4 text-sm">
        <span className="font-medium">{t.name}</span>
        <span className="text-muted-foreground"> · {t.treatment}</span>
      </figcaption>
    </figure>
  );
}
