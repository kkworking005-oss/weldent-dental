import type { Service } from "@/lib/site";

const serviceImages: Record<string, string> = {
  "check-ups": "/images/services/s1.webp",
  "teeth-cleaning-gum-care": "/images/services/s2.webp",
  "x-ray": "/images/services/s3.webp",
  "preventive-restorations": "/images/services/s1.webp",
  "root-canal": "/images/services/s3.webp",
  "crown-veneers-bridges": "/images/services/s4.webp",
  "teeth-whitening-cosmetic": "/images/services/s6.webp",
  dentures: "/images/services/s7.webp",
  "dental-implants": "/images/services/s8.webp",
  "braces-aligners": "/images/services/s9.webp",
  "surgical-extraction": "/images/services/s10.webp",
  "pediatric-dentistry": "/images/services/s11.webp",
  "periodontal-gum-care": "/images/services/s2.webp",
  "laser-dentistry": "/images/services/s5.webp",
  "emergency-dentist": "/images/services/s12.webp",
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
