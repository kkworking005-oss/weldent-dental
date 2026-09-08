import {
  Outlet,
  Link,
  createRootRoute,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { Toaster } from "sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileActionBar, WhatsAppButton } from "@/components/FloatingActions";
import { BookingProvider } from "@/components/BookingContext";
import { clinic } from "@/lib/site-core";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "Weldent Dental Clinic — Bengaluru" },
      {
        name: "description",
        content:
          "Multispeciality dental care in Kalena Agrahara, Bannerghatta Road, Bengaluru. Implants, aligners, crowns and gentle family dentistry.",
      },
      { name: "author", content: "Weldent Dental Clinic" },
      { name: "theme-color", content: "#194c75" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Weldent Dental Clinic" },
      { property: "og:image", content: "/images/clinic-front.webp" },
      { property: "og:image:alt", content: "Weldent Dental Clinic in Kalena Agrahara, Bengaluru" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preload",
        href: "/fonts/plus-jakarta-sans-latin-400-normal.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/cormorant-garamond-latin-300-normal.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dentist",
              "@id": "/#clinic",
              name: clinic.name,
              url: "/",
              image: "/images/clinic-front.webp",
              telephone: clinic.phone,
              email: clinic.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: "B1, First Floor, Eastern Enclave, MLA Layout Main Road",
                addressLocality: "Kalena Agrahara, Bengaluru",
                addressRegion: "Karnataka",
                postalCode: "560076",
                addressCountry: "IN",
              },
              hasMap: clinic.mapUrl,
              areaServed: "South Bengaluru",
              priceRange: "₹₹",
            }),
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function Aurora() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden md:block"
    >
      <div className="absolute -top-40 -left-32 size-[38rem] rounded-full bg-primary/25 blur-[120px] animate-float" />
      <div
        className="absolute top-1/3 -right-40 size-[34rem] rounded-full bg-accent/35 blur-[130px] animate-float"
        style={{ animationDelay: "-3s" }}
      />
      <div
        className="absolute bottom-0 left-1/4 size-[30rem] rounded-full bg-rose/20 blur-[140px] animate-float"
        style={{ animationDelay: "-6s" }}
      />
    </div>
  );
}

function RootComponent() {
  return (
    <BookingProvider>
      <Aurora />
      <Header />
      <main className="site-main pt-24 md:pt-28">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <Footer />
      <MobileActionBar />
      <WhatsAppButton />
      <Toaster position="top-center" />
    </BookingProvider>
  );
}
