import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const productionOrigin = "https://weldentdental.com";
const failures = [];

function read(filePath) {
  return fs.readFileSync(path.join(repoRoot, filePath), "utf8");
}

function check(condition, message) {
  if (!condition) failures.push(message);
}

function sitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
}

function sourceAudit() {
  const services = read("src/lib/services.ts");
  const siteCore = read("src/lib/site-core.ts");
  const rootRoute = read("src/routes/__root.tsx");
  const viteConfig = read("vite.config.ts");
  const sitemapEntries = sitemapUrls(read("public/sitemap.xml"));
  const slugs = [...services.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);

  check(slugs.length === new Set(slugs).size, "Duplicate service slug found");
  check(!slugs.includes("emergency-dentist"), "Emergency service was reintroduced");
  check(
    !services.toLowerCase().includes("conscious sedation"),
    "Service-level sedation claim found",
  );
  check(!viteConfig.includes('{ path: "/contact" }'), "/contact is being prerendered");
  check(!viteConfig.includes('{ path: "/booking" }'), "/booking is being prerendered");
  check(!rootRoute.includes('foundingDate: "2023"'), "Unverified clinic foundingDate found");
  check(!rootRoute.includes('name: "Smiles treated"'), "Generated smile count found in schema");
  check(siteCore.includes("+91 90359 95828"), "Canonical display phone is missing");
  check(siteCore.includes("sheetal@weldentdental.com"), "Canonical email is missing");

  const forbiddenSitemapUrls = new Set([
    `${productionOrigin}/contact`,
    `${productionOrigin}/booking`,
    `${productionOrigin}/services/emergency-dentist`,
    `${productionOrigin}/services/crown-bridge`,
    `${productionOrigin}/services/braces`,
  ]);
  check(sitemapEntries.length === new Set(sitemapEntries).size, "Duplicate sitemap URL found");
  for (const url of sitemapEntries) {
    check(
      url.startsWith(`${productionOrigin}/`) || url === `${productionOrigin}/`,
      `Wrong sitemap host: ${url}`,
    );
    check(!forbiddenSitemapUrls.has(url), `Forbidden sitemap URL: ${url}`);
    check(!url.includes(".workers.dev"), `Preview URL found in sitemap: ${url}`);
    check(!url.startsWith("https://www."), `www URL found in sitemap: ${url}`);
  }
  for (const slug of slugs) {
    check(
      sitemapEntries.includes(`${productionOrigin}/services/${slug}`),
      `Service missing from sitemap: ${slug}`,
    );
  }

  const frontendFiles = [
    "src/components/Header.tsx",
    "src/components/Footer.tsx",
    "src/routes/index.tsx",
    "src/routes/about.tsx",
    "src/routes/book.tsx",
    "src/routes/services.index.tsx",
    "src/routes/services.$slug.tsx",
    "src/routes/doctors.index.tsx",
    "src/routes/doctors.$slug.tsx",
    "src/routes/blog.index.tsx",
    "src/routes/blog.$slug.tsx",
  ];
  const legacyTargets = [
    'to="/contact"',
    'href="/contact"',
    "/services/crown-bridge",
    "/services/teeth-whitening",
    "/services/braces",
    "/services/extractions",
  ];
  for (const file of frontendFiles) {
    const content = read(file);
    for (const target of legacyTargets)
      check(!content.includes(target), `${file} contains legacy target ${target}`);
  }
}

function buildAudit() {
  const outputPath = "dist/client/index.html";
  check(fs.existsSync(path.join(repoRoot, outputPath)), `${outputPath} is missing`);
  if (!fs.existsSync(path.join(repoRoot, outputPath))) return;

  const html = read(outputPath).replaceAll("\0", "");
  check(
    html.includes("Dental Clinic in Kalena Agrahara, Bengaluru | Weldent Dental"),
    "Built homepage contains a stale title",
  );
  check(!html.includes("/contact"), "Built homepage contains the removed contact route");
  check(
    !html.includes("emergency-dentist"),
    "Built homepage contains the removed emergency service",
  );
  check(!html.includes('"foundingDate"'), "Built homepage contains an unverified founding date");
  check(
    !html.includes('"name":"Smiles treated"'),
    "Built homepage contains a smile-count schema claim",
  );
  check(!/-\d+\+/.test(html), "Built homepage contains a negative animated statistic");

  for (const url of sitemapUrls(read("public/sitemap.xml"))) {
    const pathname = new URL(url).pathname;
    const pagePath = pathname === "/" ? "index.html" : `${pathname.slice(1)}/index.html`;
    check(
      fs.existsSync(path.join(repoRoot, "dist/client", pagePath)),
      `Prerendered page is missing: ${pathname}`,
    );
  }
}

function htmlValue(html, expression) {
  return html.match(expression)?.[1]?.trim() ?? "";
}

async function fetchManual(url) {
  return fetch(url, { redirect: "manual", signal: AbortSignal.timeout(15_000) });
}

async function liveAudit(baseUrl) {
  const origin = new URL(baseUrl).origin;
  const robots = await fetch(`${origin}/robots.txt`);
  const robotsText = await robots.text();
  check(robots.status === 200, `robots.txt returned ${robots.status}`);
  check(
    robots.headers.get("content-type")?.includes("text/plain"),
    "robots.txt content type is wrong",
  );
  check(
    robotsText.includes("User-agent: *\nAllow: /"),
    "Production robots does not allow crawling",
  );
  check(
    robotsText.includes(`Sitemap: ${productionOrigin}/sitemap.xml`),
    "robots.txt sitemap is wrong",
  );

  const sitemapResponse = await fetch(`${origin}/sitemap.xml`);
  const urls = sitemapUrls(await sitemapResponse.text());
  check(sitemapResponse.status === 200, `sitemap.xml returned ${sitemapResponse.status}`);
  check(
    sitemapResponse.headers.get("content-type")?.includes("xml"),
    "sitemap content type is wrong",
  );

  for (const url of urls) {
    const response = await fetch(url, { signal: AbortSignal.timeout(15_000) });
    const html = await response.text();
    const canonical = htmlValue(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i);
    check(response.status === 200, `${url} returned ${response.status}`);
    check(!response.headers.get("x-robots-tag")?.includes("noindex"), `${url} has noindex header`);
    check(Boolean(htmlValue(html, /<title[^>]*>([^<]+)/i)), `${url} is missing a title`);
    check(
      Boolean(htmlValue(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)/i)),
      `${url} is missing a description`,
    );
    check(Boolean(htmlValue(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i)), `${url} is missing an H1`);
    check(canonical === url, `${url} canonical is ${canonical || "missing"}`);
  }

  const redirects = new Map([
    ["/contact", "/book"],
    ["/booking", "/book"],
    ["/services/emergency-dentist", "/services/check-ups"],
    ["/services/crown-bridge", "/services/crown-veneers-bridges"],
    ["/services/braces", "/services/braces-aligners"],
  ]);
  for (const [from, to] of redirects) {
    const response = await fetchManual(`${origin}${from}`);
    check(response.status === 301, `${from} did not return 301`);
    check(
      response.headers.get("location") === `${productionOrigin}${to}`,
      `${from} redirects incorrectly`,
    );
  }

  const missing = await fetch(`${origin}/seo-audit-definitely-missing-page`);
  check(missing.status === 404, `Random missing URL returned ${missing.status}, expected 404`);
  const api = await fetch(`${origin}/api/book`);
  check(api.headers.get("x-robots-tag")?.includes("noindex"), "/api/book is not marked noindex");
}

sourceAudit();
const buildArg = process.argv.includes("--build");
if (buildArg) buildAudit();
const baseArg = process.argv.find((value) => value.startsWith("--base-url="));
if (baseArg) await liveAudit(baseArg.slice("--base-url=".length));

if (failures.length) {
  console.error(`SEO audit failed with ${failures.length} issue(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  const scope = ["source", buildArg && "build", baseArg && "live URLs"]
    .filter(Boolean)
    .join(" and ");
  console.log(`SEO audit passed for ${scope}.`);
}
