import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tanstackStart({
      // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
      server: { entry: "server" },
      prerender: { enabled: true, autoStaticPathsDiscovery: false, crawlLinks: false },
      pages: [
        // Do NOT prerender the homepage. It contains year-dependent stats (experience/smiles),
        // so `/` must be SSR-rendered by the Worker at request/runtime instead of freezing the
        // current year's values into static HTML at build time. Crawlers still receive complete
        // HTML; no client-side JavaScript is required to see the current values.
        { path: "/about" },
        { path: "/services" },
        { path: "/services/check-ups" },
        { path: "/services/teeth-cleaning-gum-care" },
        { path: "/services/x-ray" },
        { path: "/services/preventive-restorations" },
        { path: "/services/root-canal" },
        { path: "/services/crown-veneers-bridges" },
        { path: "/services/dentures" },
        { path: "/services/teeth-whitening-cosmetic" },
        { path: "/services/braces-aligners" },
        { path: "/services/surgical-extraction" },
        { path: "/services/dental-implants" },
        { path: "/services/periodontal-gum-care" },
        { path: "/services/laser-dentistry" },
        { path: "/services/pediatric-dentistry" },
        { path: "/doctors" },
        { path: "/doctors/dr-sheetal-kumar-g" },
        { path: "/doctors/dr-lakshmi-bhardawaj" },
        { path: "/doctors/dr-karthik-p" },
        { path: "/doctors/dr-niharika-k-g" },
        { path: "/gallery" },
        { path: "/blog" },
        { path: "/blog/braces-treatment-guide" },
        { path: "/blog/implant-aftercare" },
        { path: "/blog/bleeding-gums" },
        { path: "/blog/kids-first-visit" },
        { path: "/faq" },
        { path: "/book" },
        { path: "/testimonials" },
        { path: "/privacy" },
        { path: "/terms" },
      ],
    }),
    react(),
    tailwindcss(),
  ],
});
