import type { Service } from "@/lib/site";

const serviceImages: Record<string, string> = {
  "check-ups": "/images/services/check ups.webp",
  "teeth-cleaning-gum-care": "/images/services/s2.webp",
  "x-ray": "/images/services/X-Ray.webp",
  "preventive-restorations": "/images/services/preventative care and restoration.webp",
  "root-canal": "/images/services/s3.webp",
  "crown-veneers-bridges": "/images/services/s4.webp",
  "teeth-whitening-cosmetic": "/images/services/s6.webp",
  dentures: "/images/services/s7.webp",
  "dental-implants": "/images/services/s8.webp",
  "braces-aligners": "/images/services/s9.webp",
  "surgical-extraction": "/images/services/s10.webp",
  "pediatric-dentistry": "/images/services/pediatric dentistry and child care.webp",
  "periodontal-gum-care": "/images/services/s2.webp",
  "laser-dentistry": "/images/services/Laser.webp",
  "emergency-dentist": "/images/services/Emergency.webp",
};

export function getServiceImage(service: Pick<Service, "slug">) {
  return serviceImages[service.slug] ?? "/images/services/s1.webp";
}

export function getServiceImageSrcSet(service: Pick<Service, "slug">) {
  const source = getServiceImage(service);

  if (!source.includes("/images/services/s") && !source.includes("/images/services/s")) {
    return `${source} 1200w`;
  }

  const base = source.replace(/\.webp$/, "");
  return `${base}-480.webp 480w, ${base}-640.webp 640w, ${base}-768.webp 768w, ${base}.webp 1200w`;
}

export function getServiceImageAlt(service: Pick<Service, "title">) {
  return `${service.title} treatment information from Weldent Dental`;
}
