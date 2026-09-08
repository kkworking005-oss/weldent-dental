import type { ReactNode } from "react";
import { Eyebrow } from "@/components/kit";

export function PageHero({
  eyebrow,
  title,
  copy,
  children,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  children?: ReactNode;
}) {
  return (
    <section className="shell pt-4 pb-6 md:pt-14 md:pb-14">
      <div className="max-w-3xl md:animate-fade-up">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-4 text-[2.15rem] leading-[1.04] sm:text-[2.7rem] md:text-[4.2rem]">
          {title}
        </h1>
        {copy ? (
          <p className="mt-4 max-w-2xl text-[0.95rem] md:text-[1rem] leading-relaxed text-muted-foreground">
            {copy}
          </p>
        ) : null}
        {children ? <div className="mt-6 md:mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
