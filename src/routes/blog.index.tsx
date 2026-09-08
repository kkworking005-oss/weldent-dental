import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion";
import { posts } from "@/lib/site";
import { canonicalLinks } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Dental Journal | Weldent Dental Clinic Bengaluru" },
      {
        name: "description",
        content:
          "Practical dental reading from Weldent Dental Clinic: aligners vs braces, implant aftercare, gum health and children's first visits.",
      },
      { property: "og:title", content: "Dental Journal | Weldent Dental Clinic" },
      {
        property: "og:description",
        content: "Straight answers from practising dentists in Bengaluru.",
      },
    ],
    links: canonicalLinks("/blog"),
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Straight answers, no scare tactics."
        copy="Short pieces written by the dentists who treat these cases every week."
      />
      <div className="shell grid gap-4 pb-8 md:pb-10 md:grid-cols-2">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 70}>
            <Link
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="glass glass-sheen flex h-full flex-col rounded-3xl p-5 transition md:p-7 hover:-translate-y-1.5"
            >
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary/70">
                {p.category} · {p.date}
              </span>
              <h2 className="mt-3 text-2xl leading-tight md:text-3xl">{p.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
              <span className="mt-6 text-sm font-medium text-primary">Read article</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}
