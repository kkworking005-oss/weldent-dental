import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Reveal } from "@/components/motion";
import { cases } from "@/lib/site";
import { cn } from "@/lib/utils";
import { canonicalLinks } from "@/lib/seo";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Before & After Smile Gallery | Weldent Dental Clinic" },
      {
        name: "description",
        content:
          "Real before-and-after dental cases from Weldent Dental Clinic, Bengaluru — veneers, aligners, implants and gum therapy.",
      },
      { property: "og:title", content: "Before & After Gallery | Weldent Dental Clinic" },
      { property: "og:description", content: "Unretouched results from cases treated in-house." },
    ],
    links: canonicalLinks("/gallery"),
  }),
  component: GalleryPage,
});

const PAGE = 6;

function GalleryPage() {
  const categories = ["All", ...new Set(cases.map((c) => c.category))];
  const [active, setActive] = useState("All");
  const [limit, setLimit] = useState(PAGE);
  const filtered = active === "All" ? cases : cases.filter((c) => c.category === active);
  const shown = filtered.slice(0, limit);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Results you can drag through."
        copy="Nothing whitened in software. Slide each case to compare the day one photograph with the finished result."
      />
      <div className="shell pb-8 md:pb-10">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => {
                setActive(c);
                setLimit(PAGE);
              }}
              className={cn(
                "rounded-pill px-4 py-2 text-sm transition",
                active === c
                  ? "bg-primary text-primary-foreground"
                  : "glass-quiet hover:text-primary",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:mt-8 md:grid-cols-2 md:gap-5">
          {shown.map((c, i) => (
            <Reveal key={c.id} delay={(i % PAGE) * 60}>
              <div className="rounded-3xl glass p-3">
                <BeforeAfter
                  before={c.before}
                  after={c.after}
                  beforeSrcSet={c.beforeSrcSet}
                  afterSrcSet={c.afterSrcSet}
                  alt={c.title}
                />
                <div className="flex flex-wrap items-start justify-between gap-2 px-3 py-4">
                  <div className="min-w-0">
                    <h2 className="text-xl leading-tight">{c.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{c.note}</p>
                  </div>
                  <span className="shrink-0 rounded-pill glass-quiet px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-primary">
                    {c.category}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {limit < filtered.length && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setLimit((l) => l + PAGE)}
              className="rounded-pill glass px-6 py-3 text-sm font-semibold text-primary transition hover:text-primary"
            >
              Load more cases
            </button>
          </div>
        )}
      </div>
    </>
  );
}
