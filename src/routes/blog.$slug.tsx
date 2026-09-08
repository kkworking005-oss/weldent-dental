import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ButtonLink, Eyebrow } from "@/components/kit";
import { posts } from "@/lib/site";
import { absoluteUrl, canonicalLinks, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.post;
    return {
      meta: [
        { title: `${p.title} | Weldent Dental Clinic` },
        { name: "description", content: p.excerpt },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: p.datePublished },
        { property: "article:modified_time", content: p.dateModified },
        { property: "article:author", content: "Dr. Sheetal Kumar G" },
      ],
      links: canonicalLinks(`/blog/${p.slug}`),
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();
  const pageUrl = absoluteUrl(`/blog/${post.slug}`);
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Dental Journal", item: absoluteUrl("/blog") },
        { "@type": "ListItem", position: 3, name: post.title, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.excerpt,
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      mainEntityOfPage: pageUrl,
      image: absoluteUrl("/images/clinic-front.webp"),
      author: {
        "@type": "Person",
        "@id": `${absoluteUrl("/doctors/dr-sheetal-kumar-g")}#doctor`,
        name: "Dr. Sheetal Kumar G",
        url: absoluteUrl("/doctors/dr-sheetal-kumar-g"),
      },
      publisher: { "@type": "Dentist", "@id": `${SITE_URL}/#clinic` },
    },
  ];

  return (
    <article className="shell max-w-3xl pt-5 pb-8 md:pt-12 md:pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span aria-hidden="true"> / </span>
        <Link to="/blog" className="hover:text-primary">Dental Journal</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{post.title}</span>
      </nav>
      <Eyebrow>
        {post.category} · <time dateTime={post.datePublished}>{post.date}</time>
      </Eyebrow>
      <h1 className="mt-5 text-[2rem] leading-[1.05] md:text-[3.6rem]">{post.title}</h1>
      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
        Written and reviewed by{" "}
        <Link
          to="/doctors/$slug"
          params={{ slug: "dr-sheetal-kumar-g" }}
          className="font-medium text-primary hover:underline"
        >
          Dr. Sheetal Kumar G, BDS
        </Link>
        {" "}· KSDC Reg No. 59793 A · Updated{" "}
        <time dateTime={post.dateModified}>8 September 2026</time>
      </p>
      <div className="mt-8 rounded-3xl glass p-5 md:p-10">
        <p className="font-display text-[1.5rem] leading-snug text-primary">{post.excerpt}</p>
        <div className="mt-6 space-y-5">
          {post.body.map((para: string) => (
            <p key={para} className="text-[0.95rem] leading-relaxed text-muted-foreground">
              {para}
            </p>
          ))}
        </div>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
        This article provides general information and does not replace a dental examination or
        personalised treatment advice.
      </p>
      <div className="mt-6">
        <Link
          to="/services/$slug"
          params={{ slug: post.serviceSlug }}
          className="text-sm font-medium text-primary hover:underline"
        >
          Related treatment: learn more
        </Link>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink to="/book" size="lg">
          Book a consultation
        </ButtonLink>
        <ButtonLink to="/blog" variant="glass" size="lg">
          More articles
        </ButtonLink>
      </div>
    </article>
  );
}
