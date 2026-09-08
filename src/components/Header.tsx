import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, Navigation } from "lucide-react";
import { clinic, nav } from "@/lib/site-core";
import { Button, ButtonLink } from "@/components/kit";
import { useBooking } from "@/components/BookingContext";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const booking = useBooking();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    let last = window.scrollY > 12;
    setScrolled(last);
    const onScroll = () => {
      const next = window.scrollY > 12;
      if (next === last) return;
      last = next;
      setScrolled(next);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="site-header fixed inset-x-0 top-0 z-90 pt-3 md:pt-5">
      <div className="shell">
        <div
          className={cn(
            "flex items-center justify-between gap-4 rounded-pill px-4 py-2.5 transition-all duration-500 md:px-6",
            scrolled ? "glass shadow-glass" : "glass-quiet",
          )}
        >
          <Link to="/" className="font-display text-2xl leading-none tracking-tight">
            Weldent<span className="text-accent">.</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="rounded-pill px-3.5 py-2 text-sm text-foreground/75 transition hover:bg-white/50 hover:text-foreground data-[status=active]:bg-white/70 data-[status=active]:text-primary data-[status=active]:font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={clinic.phoneHref}
              className="hidden items-center gap-2 rounded-pill px-3 py-2 text-sm text-foreground/80 transition hover:text-primary md:inline-flex"
            >
              <Phone className="size-4" />
              {clinic.phone}
            </a>
            <Button onClick={booking.open} className="hidden md:inline-flex">
              Book Now
            </Button>
            <a
              href={clinic.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Directions"
              className="grid size-10 place-items-center rounded-pill glass-quiet transition hover:text-primary lg:hidden"
            >
              <Navigation className="size-4" />
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="grid size-10 place-items-center rounded-pill glass-quiet lg:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        {open ? (
          <div className="mt-2 rounded-3xl glass p-4 shadow-lift lg:hidden animate-fade-up">
            <div className="grid gap-1">
              {[
                ...nav,
                { label: "Testimonials", to: "/testimonials" },
                { label: "FAQ", to: "/faq" },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className="rounded-2xl px-4 py-3 text-sm transition data-[status=active]:bg-white/70 data-[status=active]:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <ButtonLink to="/book" size="lg" className="mt-3 w-full">
              Book an appointment
            </ButtonLink>
          </div>
        ) : null}
      </div>
    </header>
  );
}
