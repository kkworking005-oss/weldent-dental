import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    // Fail-safe: never leave content hidden for long.
    const timer = window.setTimeout(() => setShown(true), 700);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "300px 0px 200px 0px" },
    );
    io.observe(el);
    return () => {
      window.clearTimeout(timer);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("site-reveal self-start transition-all duration-[450ms] ease-out", className)}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(14px)",
        transitionDelay: `${shown ? Math.min(delay, 160) : 0}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const decimals = to % 1 !== 0 ? 1 : 0;

  return (
    <span>
      {to.toFixed(decimals)}
      {suffix}
    </span>
  );
}
