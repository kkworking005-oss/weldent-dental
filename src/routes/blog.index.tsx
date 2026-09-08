import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion";
import { posts } from "@/lib/site";
import { absoluteUrl, canonicalLinks, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Dental Journal | Weldent Dental Clinic Bengaluru" },
      {
        name: "description",
        content:
          "Dentist-reviewed guidance from Weldent Dental in Kalena Agrahara on braces, implant aftercare, bleeding gums and children's first dental visits.",
      },
      { property: "og:title", content: "Dental Journal | Weldent Dental Clinic" },
      {
        property: "og:description",
        content: "Practical dental guidance reviewed by Dr. Sheetal Kumar G, BDS.",
      },
    ],
    links: canonicalLinks("/blog"),
  }),
  component: BlogPage,
});

function BlogPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${absoluteUrl("/blog")}#journal`,
    name: "Weldent Dental Journal",
    url: absoluteUrl("/blog"),
    inLanguage: "en-IN",
    publisher: { "@type": "Dentist", "@id": `${SITE_URL}/#clinic` },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      url: absoluteUrl(`/blog/${post.slug}`),
      author: {
        "@type": "Person",
        "@id": `${absoluteUrl("/doctors/dr-sheetal-kumar-g")}#doctor`,
      },
    })),
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
        eyebrow="Journal"
        title="Straight answers, no scare tactics."
        copy="Practical dental guidance reviewed by Dr. Sheetal Kumar G, BDS. General information cannot replace an in-person examination."
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
