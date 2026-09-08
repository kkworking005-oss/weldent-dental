import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";


export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tanstackStart(),
    react(),
    tailwindcss(),
  ],
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
    prerender: { enabled: true, autoStaticPathsDiscovery: false, crawlLinks: false },
    pages: [
      { path: "/" },
      { path: "/about" },
      { path: "/services" },
      { path: "/services/preventive-care" },
      { path: "/services/root-canal" },
      { path: "/services/crown-bridge" },
      { path: "/services/smile-correction" },
      { path: "/services/teeth-whitening" },
      { path: "/services/dentures" },
      { path: "/services/dental-implants" },
      { path: "/services/braces" },
      { path: "/services/extractions" },
      { path: "/services/pediatric-dentistry" },
      { path: "/services/geriatric-dentistry" },
      { path: "/services/gum-therapy" },
      { path: "/doctors" },
      { path: "/doctors/dr-sheetal-kumar-g" },
      { path: "/gallery" },
      { path: "/blog" },
      { path: "/blog/aligners-vs-braces" },
      { path: "/blog/implant-aftercare" },
      { path: "/blog/bleeding-gums" },
      { path: "/blog/kids-first-visit" },
      { path: "/contact" },
      { path: "/faq" },
      { path: "/book" },
      { path: "/booking" },
      { path: "/testimonials" },
      { path: "/privacy" },
      { path: "/terms" },
    ],
  },
});
