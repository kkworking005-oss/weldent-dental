import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill text-sm font-medium tracking-tight transition-all duration-300 active:scale-[0.97] disabled:opacity-60 disabled:pointer-events-none";

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5",
  lg: "px-7 py-3.5 text-[0.95rem]",
};

const variants = {
  solid:
    "bg-primary text-primary-foreground shadow-lift hover:brightness-115 hover:-translate-y-0.5",
  glass: "glass glass-sheen text-foreground hover:-translate-y-0.5",
  gold: "bg-accent text-accent-foreground shadow-soft hover:-translate-y-0.5 hover:brightness-105",
  ghost: "text-foreground/80 hover:text-foreground hover:bg-glass",
};

type Style = { variant?: keyof typeof variants | undefined; size?: keyof typeof sizes | undefined };

export function btnClass({ variant = "solid", size = "md" }: Style = {}, className?: string) {
  return cn(base, sizes[size], variants[variant], className);
}

export function Button({
  variant,
  size,
  className,
  ...props
}: ComponentProps<"button"> & Style) {
  return <button className={btnClass({ variant, size }, className)} {...props} />;
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: ComponentProps<typeof Link> & Style) {
  return <Link className={btnClass({ variant, size }, className)} {...props} />;
}

export function Panel({
  className,
  children,
  tone = "light",
}: {
  className?: string;
  children: ReactNode;
  tone?: "light" | "quiet" | "dark";
}) {
  return (
    <div
      className={cn(
        "rounded-3xl p-5 md:p-8",
        tone === "light" && "glass",
        tone === "quiet" && "glass-quiet",
        tone === "dark" && "glass-dark",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-pill glass-quiet px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-primary">
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  action,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2 className="mt-4 text-[1.8rem] leading-[1.1] md:text-[2.9rem]">{title}</h2>
        {copy ? <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">{copy}</p> : null}
      </div>
      {action}
    </div>
  );
}
