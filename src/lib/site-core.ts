export const clinic = {
  name: "Weldent Dental",
  businessName: "Weldent Multispeciality Dental Clinic",
  short: "Weldent.",
  tagline: "Your smile, in expert hands.",
  domain: "weldentdental.com",
  address:
    "B1, First Floor, Eastern Enclave, MLA Layout Main Road, Kothnur, Kalena Agrahara, Bengaluru, Karnataka 560076, India",
  streetAddress: "B1, First Floor, Eastern Enclave, MLA Layout Main Road, Kothnur, Kalena Agrahara",
  addressLocality: "Bengaluru",
  addressRegion: "Karnataka",
  postalCode: "560076",
  addressCountry: "IN",
  latitude: 12.865192,
  longitude: 77.5920558,
  phone: "+91 90359 95828",
  phoneHref: "tel:+919035995828",
  whatsapp: "https://wa.me/919035995828",
  email: "sheetal@weldentdental.com",
  emailSecondary: "sheetalkumarg1@gmail.com",
  googleReview: "https://g.page/r/CQ1-6xxnOmpzEBM/review",
  instagram: "https://www.instagram.com/weldent_dentalclinic/",
  mapEmbed:
    "https://www.google.com/maps?q=12.865192%2C77.5920558&z=17&output=embed",
  mapUrl: "https://maps.app.goo.gl/iiuNEunvqffEoXsb9?g_st=ac",
  hours: [
    { day: "Monday – Saturday", time: "10:30 AM – 09:00 PM" },
    { day: "Sunday", time: "10:30 AM – 03:30 PM" },
  ],
};

export const nav = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Doctors", to: "/doctors" },
  { label: "Gallery", to: "/gallery" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
];

export const serviceNav = [
  { slug: "check-ups", title: "Check-ups" },
  { slug: "root-canal", title: "Root canal treatment" },
  { slug: "crown-veneers-bridges", title: "Crown, veneers and bridges" },
  { slug: "braces-aligners", title: "Orthodontic braces and aligners" },
  { slug: "dental-implants", title: "Dental implants" },
  { slug: "teeth-whitening-cosmetic", title: "Teeth whitening and cosmetic" },
  { slug: "pediatric-dentistry", title: "Pediatric dentistry and child care" },
];

export function responsiveImageSet(name: string) {
  return `/images/${name}-480.webp 480w, /images/${name}-768.webp 768w`;
}
