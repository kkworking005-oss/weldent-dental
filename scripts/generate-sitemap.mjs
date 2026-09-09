import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const siteUrl = "https://weldentdental.com";

function read(filePath) {
  return fs.readFileSync(path.join(repoRoot, filePath), "utf8");
}

function toIsoDate(filePath) {
  const absolute = path.join(repoRoot, filePath);
  const { mtime } = fs.statSync(absolute);
  return new Date(mtime).toISOString().slice(0, 10);
}

function extractQuotedValues(filePath, key) {
  const text = read(filePath);
  const matches = [...text.matchAll(new RegExp(`${key}\\s*:\\s*"([^"]+)"`, "g"))];
  return [...new Set(matches.map((match) => match[1]))];
}

const staticRoutes = [
  ["/", "src/routes/index.tsx", "weekly", "1.0"],
  ["/about", "src/routes/about.tsx", "monthly", "0.8"],
  ["/book", "src/routes/book.tsx", "monthly", "0.8"],
  ["/faq", "src/routes/faq.tsx", "monthly", "0.6"],
  ["/gallery", "src/routes/gallery.tsx", "weekly", "0.8"],
  ["/testimonials", "src/routes/testimonials.tsx", "weekly", "0.8"],
  ["/services", "src/routes/services.index.tsx", "weekly", "0.9"],
  ["/doctors", "src/routes/doctors.index.tsx", "monthly", "0.8"],
  ["/blog", "src/routes/blog.index.tsx", "weekly", "0.8"],
  ["/privacy", "src/routes/privacy.tsx", "yearly", "0.3"],
  ["/terms", "src/routes/terms.tsx", "yearly", "0.3"],
];

const dynamicRoutes = [];

for (const service of extractQuotedValues("src/lib/services.ts", "slug")) {
  dynamicRoutes.push({
    url: `/services/${service}`,
    source: "src/lib/services.ts",
    changefreq: "monthly",
    priority: "0.7",
  });
}

for (const doctor of extractQuotedValues("src/lib/site.ts", "slug")) {
  if (doctor.startsWith("dr-")) {
    dynamicRoutes.push({
      url: `/doctors/${doctor}`,
      source: "src/lib/site.ts",
      changefreq: "monthly",
      priority: "0.7",
    });
  }
}

for (const post of extractQuotedValues("src/lib/site.ts", "slug")) {
  if (post.includes("-") && !post.startsWith("dr-")) {
    const isService = post.includes("treatment") || post.includes("aftercare") || post.includes("gums") || post.includes("visit");
    if (isService) {
      dynamicRoutes.push({
        url: `/blog/${post}`,
        source: "src/lib/site.ts",
        changefreq: "monthly",
        priority: "0.6",
      });
    }
  }
}

const combinedRoutes = [
  ...staticRoutes.map(([url, source, changefreq, priority]) => ({
    url,
    source,
    changefreq,
    priority,
  })),
  ...dynamicRoutes,
];

const xmlEntries = combinedRoutes
  .filter(({ url }) => url !== "/booking")
  .map(({ url, source, changefreq, priority }) => {
    const lastmod = toIsoDate(source);
    return `  <url>\n    <loc>${siteUrl}${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlEntries}\n</urlset>\n`;

const outputPath = path.join(repoRoot, "public", "sitemap.xml");
fs.writeFileSync(outputPath, sitemap, "utf8");
console.log(`Wrote ${outputPath} with ${combinedRoutes.length} entries.`);
