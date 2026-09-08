export const clinic = {
  name: "Weldent Dental",
  businessName: "Weldent Multispeciality Dental Clinic",
  short: "Weldent.",
  tagline: "Your smile, in expert hands.",
  domain: "weldentdental.com",
  address:
    "B1, First Floor, Eastern Enclave, MLA Layout Main Road, Kalena Agrahara, Bengaluru, Karnataka 560076, India",
  phone: "+91 90359 95828",
  phoneHref: "tel:+919035995828",
  whatsapp: "https://wa.me/919035995828",
  email: "sheetal@weldentdental.com",
  emailSecondary: "sheetalkumarg1@gmail.com",
  googleReview: "https://g.page/r/CQ1-6xxnOmpzEBM/review",
  instagram:
    "https://www.instagram.com/weldent_dentalclinic?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
  mapEmbed:
    "https://www.google.com/maps?q=Weldent%20Multispeciality%20Dental%20Clinic%2C%20B1%20First%20Floor%2C%20Eastern%20Enclave%2C%20MLA%20Layout%20Main%20Road%2C%20Kalena%20Agrahara%2C%20Bengaluru%20560076&output=embed",
  mapUrl: "https://maps.app.goo.gl/iiuNEunvqffEoXsb9?g_st=ac",
  hours: [
    { day: "Monday – Saturday", time: "10:30 AM – 09:00 PM" },
    { day: "Sunday", time: "10:30 AM – 03:30 PM" },
  ],
};

export const nav = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Doctor", to: "/doctors" },
  { label: "Gallery", to: "/gallery" },
  { label: "About", to: "/about" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export const serviceNav = [
  { slug: "root-canal", title: "Root Canal Treatment" },
  { slug: "crown-bridge", title: "Crown & Bridge" },
  { slug: "braces", title: "Braces" },
  { slug: "dental-implants", title: "Dental Implants" },
  { slug: "teeth-whitening", title: "Teeth Whitening" },
  { slug: "pediatric-dentistry", title: "Kids Dentistry" },
];

export function responsiveImageSet(name: string) {
  return `/images/${name}-480.webp 480w, /images/${name}-768.webp 768w`;
}
