import { createFileRoute, notFound } from "@tanstack/react-router";
import { ButtonLink, Eyebrow } from "@/components/kit";
import { posts } from "@/lib/site";
import { canonicalLinks } from "@/lib/seo";

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
      ],
      links: canonicalLinks(`/blog/${p.slug}`),
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();

  return (
    <article className="shell max-w-3xl pt-5 pb-8 md:pt-12 md:pb-10">
      <Eyebrow>
        {post.category} · {post.date}
      </Eyebrow>
      <h1 className="mt-5 text-[2rem] leading-[1.05] md:text-[3.6rem]">{post.title}</h1>
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
