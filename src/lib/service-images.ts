import type { Service } from "@/lib/site";

const serviceImages: Record<string, string> = {
  "preventive-care": "/images/services/s1.webp",
  "root-canal": "/images/services/s3.webp",
  "crown-bridge": "/images/services/s4.webp",
  "smile-correction": "/images/services/s5.webp",
  "teeth-whitening": "/images/services/s6.webp",
  dentures: "/images/services/s7.webp",
  "dental-implants": "/images/services/s8.webp",
  braces: "/images/services/s9.webp",
  extractions: "/images/services/s10.webp",
  "pediatric-dentistry": "/images/services/s11.webp",
  "geriatric-dentistry": "/images/services/s12.webp",
  "gum-therapy": "/images/services/s2.webp",
};

export function getServiceImage(service: Pick<Service, "slug">) {
  return serviceImages[service.slug] ?? "/images/services/s1.webp";
}

export function getServiceImageSrcSet(service: Pick<Service, "slug">) {
  const source = getServiceImage(service).replace(/\.webp$/, "");
  return `${source}-480.webp 480w, ${source}-640.webp 640w, ${source}-768.webp 768w, ${source}.webp 1200w`;
}

export function getServiceImageAlt(service: Pick<Service, "title">) {
  return `${service.title} treatment information from Weldent Dental`;
}
