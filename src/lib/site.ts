import { getSmilesTreated, getYearsOfExperience } from "@/lib/dynamicStats";
export { clinic, nav } from "@/lib/site-core";
import { responsiveImageSet } from "@/lib/site-core";

export const photos = {
  front: "/images/clinic-front.webp",
  operatory: "/images/clinic-operatory.webp",
};

export const stats = [
  { value: getYearsOfExperience(), suffix: "+", label: "Years of clinical experience" },
  { value: getSmilesTreated(), suffix: "+", label: "Smiles treated" },
];

export type Service = {
  slug: string;
  dateModified: string;
  title: string;
  category: string;
  short: string;
  who: string;
  duration: string;
  steps: string[];
  aftercare: string[];
  faqs: { q: string; a: string }[];
  guidance?: { title: string; body: string }[];
  sources?: { label: string; url: string }[];
  doctors: string[];
};

const serviceContentDate = "2026-09-08";

export const services: Service[] = [
  {
    slug: "preventive-care",
    dateModified: serviceContentDate,
    title: "Preventive Dental Care & Teeth Cleaning",
    category: "Preventive & General Care",
    short:
      "Routine check-ups, professional teeth cleaning, fillings and gum care focused on prevention and early treatment.",
    who: "Everyone — children, adults and seniors looking to maintain a healthy smile.",
    duration: "30–60 min",
    steps: [
      "Thorough oral examination and diagnosis",
      "Professional cleaning (scaling and polishing)",
      "Fillings (restorations) for cavities if needed",
      "Gum therapy for early periodontal issues",
    ],
    aftercare: [
      "Brush twice daily with fluoride toothpaste",
      "Floss or use interdental brushes daily",
      "Follow the recall interval advised after your examination",
    ],
    faqs: [
      {
        q: "How often should I get a cleaning?",
        a: "The right interval depends on your gum health, plaque and calculus build-up, medical history and home care. Your dentist will recommend a personalised recall interval after examining you.",
      },
      {
        q: "Are fillings painful?",
        a: "Comfort varies by case. Local anaesthesia may be used when a filling would otherwise be uncomfortable.",
      },
    ],
    guidance: [
      {
        title: "Scaling and polishing are different steps",
        body: "Scaling removes plaque and hardened deposits from tooth surfaces and around the gumline. Polishing smooths selected surfaces and removes some external staining after deposits have been cleared.",
      },
      {
        title: "Bleeding gums deserve an assessment",
        body: "Repeated bleeding while brushing can be a sign of gum inflammation. The examination determines whether routine cleaning, deeper periodontal care or another approach is appropriate.",
      },
      {
        title: "Cleaning frequency is individual",
        body: "There is no single schedule for everyone. The recommended interval depends on current gum health, risk factors, home cleaning and how quickly deposits return.",
      },
    ],
    sources: [
      {
        label: "American Dental Association: Scaling and root planing",
        url: "https://www.mouthhealthy.org/all-topics-a-z/scaling-and-root-planing",
      },
      {
        label: "NHS: Dental check-ups",
        url: "https://www.nhs.uk/live-well/healthy-teeth-and-gums/dental-check-ups/",
      },
    ],
    doctors: ["dr-sheetal-kumar-g"],
  },
  {
    slug: "root-canal",
    dateModified: serviceContentDate,
    title: "Root Canal Treatment (RCT) with Crowns",
    category: "Restorative & Cosmetic",
    short:
      "Root canal treatment removes infected tissue, cleans and seals the tooth; a crown may be advised depending on the remaining tooth structure.",
    who: "Deep decay, cracked teeth, persistent throbbing pain or trauma to the tooth.",
    duration: "45–90 min · 1–2 visits",
    steps: [
      "RVG digital X-ray and pulp testing",
      "Local anaesthesia, isolation and access",
      "Cleaning, shaping and sealing of the root canals",
      "Custom crown placement to protect the tooth",
    ],
    aftercare: ["Avoid chewing on that side until crowned", "Mild soreness for 2–3 days is normal"],
    faqs: [
      {
        q: "Is a crown always needed after RCT?",
        a: "A crown is often recommended for a back tooth after root canal treatment, but the decision depends on how much healthy tooth structure remains.",
      },
      {
        q: "Is root canal painful?",
        a: "Local anaesthesia is used to manage discomfort. Your dentist will assess the tooth and explain what to expect for your case.",
      },
    ],
    guidance: [
      {
        title: "When root canal treatment may be considered",
        body: "Persistent toothache, pain when biting, sensitivity, swelling, deep decay, a crack or previous trauma can prompt an assessment. Similar symptoms can have different causes, so diagnosis comes before treatment.",
      },
      {
        title: "Examination and X-rays guide the plan",
        body: "The dentist examines the tooth and surrounding tissues and may take an X-ray to assess the roots and supporting bone. The number of visits depends on the tooth, infection and treatment complexity.",
      },
      {
        title: "Restoring the tooth afterwards",
        body: "After the canals are cleaned, shaped and sealed, the tooth needs a durable final restoration. A crown may be recommended when the remaining tooth is weakened, especially for a heavily loaded back tooth.",
      },
      {
        title: "Alternatives and warning signs",
        body: "If the tooth cannot be predictably restored, extraction and replacement options may be discussed. Contact the clinic promptly if swelling, fever, difficulty swallowing or worsening pain develops.",
      },
    ],
    sources: [
      {
        label: "NHS: Root canal treatment",
        url: "https://www.nhs.uk/tests-and-treatments/root-canal-treatment/",
      },
    ],
    doctors: ["dr-sheetal-kumar-g"],
  },
  {
    slug: "crown-bridge",
    dateModified: serviceContentDate,
    title: "Crown & Bridge",
    category: "Restorative & Cosmetic",
    short:
      "Natural-looking crowns and bridges that restore damaged or missing teeth with strength and beauty.",
    who: "Broken, worn or heavily filled teeth; or one or more missing teeth adjacent to healthy teeth.",
    duration: "2 visits · 1–2 weeks",
    steps: [
      "Tooth preparation and shade matching",
      "Dental impressions and a temporary restoration where needed",
      "Custom ceramic fabrication in the dental lab",
      "Final bonding and bite adjustment",
    ],
    aftercare: [
      "Avoid very hard foods (ice, nuts) directly on the restoration",
      "Regular brushing and flossing around the margins",
      "Yearly check to ensure the fit remains good",
    ],
    faqs: [
      {
        q: "How long do crowns and bridges last?",
        a: "With good hygiene and regular care, typically 10–15 years or longer.",
      },
    ],
    doctors: ["dr-sheetal-kumar-g"],
  },
  {
    slug: "smile-correction",
    dateModified: serviceContentDate,
    title: "Smile Correction",
    category: "Restorative & Cosmetic",
    short:
      "Tailored cosmetic and restorative treatment that reshapes, recolours and rebalances your smile to suit your face.",
    who: "Anyone unhappy with the shape, size, colour or spacing of their front teeth.",
    duration: "Planned over 2–6 weeks depending on the plan",
    steps: [
      "Smile analysis and photo documentation",
      "Clinical discussion and a mock-up preview where appropriate",
      "Phased restorations, whitening or reshaping",
      "Final polish and follow-up",
    ],
    aftercare: [
      "Avoid strongly staining foods and drinks for 48 hours after bonding",
      "Night guard if you grind your teeth",
      "Six-monthly polishing visits",
    ],
    faqs: [
      {
        q: "Will my teeth look fake?",
        a: "No — we match shade, translucency and shape to your face so the result reads as naturally yours.",
      },
    ],
    doctors: ["dr-sheetal-kumar-g"],
  },
  {
    slug: "teeth-whitening",
    dateModified: serviceContentDate,
    title: "Teeth Whitening",
    category: "Restorative & Cosmetic",
    short:
      "Professionally supervised teeth whitening planned after checking your teeth, gums and sensitivity.",
    who: "Stained or yellowed teeth from coffee, tea, tobacco or natural ageing.",
    duration: "60 min in-clinic session",
    steps: [
      "Shade record and initial polish",
      "Gum protection with a liquid dam",
      "Controlled whitening gel application cycles",
      "Desensitising gel finish",
    ],
    aftercare: ["White diet for 48 hours", "Use the top-up kit monthly for maintenance"],
    faqs: [
      {
        q: "Does whitening damage enamel?",
        a: "A dental examination helps determine whether whitening is suitable. Temporary sensitivity can occur and will be discussed before treatment.",
      },
      {
        q: "How long will it last?",
        a: "Usually 6–12 months; longer if you avoid heavy staining habits.",
      },
    ],
    doctors: ["dr-sheetal-kumar-g"],
  },
  {
    slug: "dentures",
    dateModified: serviceContentDate,
    title: "Dentures (Replacement of Missing Teeth)",
    category: "Restorative & Cosmetic",
    short:
      "Well-fitting, natural-looking complete and partial dentures that restore chewing, speech and confidence.",
    who: "Patients with several or all missing teeth who want a removable replacement option.",
    duration: "3–5 appointments · 2–4 weeks",
    steps: [
      "Preliminary impressions and bite records",
      "Try-in to verify fit, shade and tooth position",
      "Final fabrication in the professional dental lab",
      "Delivery, adjustments and follow-up",
    ],
    aftercare: [
      "Clean dentures daily with a soft brush and mild soap",
      "Soak them overnight in a denture cleanser",
      "Come in for yearly relines and check-ups",
    ],
    faqs: [
      {
        q: "Will dentures hurt or fall out?",
        a: "Modern dentures are custom-fitted for comfort and stability; small adjustments are normal in the first weeks.",
      },
    ],
    doctors: ["dr-sheetal-kumar-g"],
  },
  {
    slug: "dental-implants",
    dateModified: serviceContentDate,
    title: "Dental Implants",
    category: "Restorative & Cosmetic",
    short:
      "A fixed tooth-replacement option using an implant and restoration, subject to clinical and radiographic assessment.",
    who: "Adults with one or more missing teeth, or those tired of loose removable dentures.",
    duration: "Staged over 3–5 months total",
    steps: [
      "Examination and digital X-ray planning",
      "Gentle implant placement under local anaesthesia",
      "Healing period for bone to integrate with the implant",
      "Custom crown fabrication and final fitting",
    ],
    aftercare: [
      "Cold compress for the first 24 hours",
      "Soft diet for the first week",
      "Careful daily cleaning around the implant site",
    ],
    faqs: [
      {
        q: "Is the implant procedure painful?",
        a: "Placement is generally performed with local anaesthesia. Recovery varies, and the clinician will explain expected discomfort and aftercare.",
      },
    ],
    guidance: [
      {
        title: "Suitability is assessed first",
        body: "Implant planning considers the missing tooth or teeth, gum health, available bone, bite, medical history, medicines and smoking. X-rays and, when indicated, additional imaging help the treating clinician plan safely.",
      },
      {
        title: "Treatment is completed in stages",
        body: "An implant supports a crown, bridge or denture. Placement, healing and fitting the final restoration happen over separate stages; some patients may also need preparatory care such as gum treatment or bone grafting.",
      },
      {
        title: "Other replacement options remain valid",
        body: "A conventional bridge or removable denture may be appropriate depending on the neighbouring teeth, bone, health, priorities and budget. The consultation should compare reasonable options, benefits, limitations and costs.",
      },
      {
        title: "Aftercare protects the result",
        body: "Follow the treating clinician's written instructions, keep the area clean as demonstrated and attend reviews. Contact the clinic if bleeding does not settle or pain, swelling, fever or discharge is worsening.",
      },
    ],
    sources: [
      {
        label: "Cambridge University Hospitals: Dental implants in restorative dentistry",
        url: "https://www.cuh.nhs.uk/patient-information/dental-implants-in-restorative-dentistry/",
      },
      {
        label: "Guy's and St Thomas': Dental implants overview",
        url: "https://www.guysandstthomas.nhs.uk/health-information/dental-implants",
      },
    ],
    doctors: [],
  },
  {
    slug: "braces",
    dateModified: serviceContentDate,
    title: "Braces (Teeth Alignment)",
    category: "Orthodontics & Surgery",
    short:
      "Traditional and aesthetic braces that straighten crooked teeth, close gaps and correct bites for a healthy, even smile.",
    who: "Teens and adults with crowding, spacing, protruding teeth or bite discrepancies.",
    duration: "Monthly reviews · 12–24 months depending on case",
    steps: [
      "Examination, X-rays and treatment planning",
      "Bonding of brackets and placement of wires",
      "Monthly adjustments to guide teeth into position",
      "Brace removal and fixed/removable retainers",
    ],
    aftercare: [
      "Avoid very hard, sticky or chewy foods while in braces",
      "Extra-strong brushing and flossing around brackets",
      "Wear retainers as instructed to keep teeth straight",
    ],
    faqs: [
      {
        q: "Do braces hurt?",
        a: "Temporary soreness can occur after fitting or adjustments. Contact the treating clinician if discomfort is severe or persistent.",
      },
      {
        q: "What age is best?",
        a: "Orthodontic treatment can be considered for children, teenagers and adults. The right timing depends on dental development, gum health, the bite and the treatment goal.",
      },
    ],
    guidance: [
      {
        title: "Assessment comes before choosing an appliance",
        body: "The clinician checks tooth position, the bite, gum health and oral hygiene. Photographs, X-rays or other records may be advised before deciding whether braces are appropriate and which approach fits the case.",
      },
      {
        title: "The treating clinician must be clear",
        body: "Before starting, the clinic will confirm who is responsible for the orthodontic diagnosis, treatment plan, adjustments and follow-up. No individual clinician is attributed on this page until that role is verified.",
      },
      {
        title: "Timelines vary",
        body: "Treatment length and review frequency depend on the bite, tooth movement, appliance and attendance. A personalised plan is more reliable than a fixed estimate given without records.",
      },
      {
        title: "Retention is part of treatment",
        body: "After active tooth movement, retainers are normally required to help maintain the result. The treating clinician will explain the retainer type, wear schedule and review plan.",
      },
    ],
    sources: [
      {
        label: "American Association of Orthodontists: How braces work",
        url: "https://aaoinfo.org/treatments/braces/",
      },
    ],
    doctors: [],
  },
  {
    slug: "extractions",
    dateModified: serviceContentDate,
    title: "Extractions",
    category: "Orthodontics & Surgery",
    short:
      "Removal of teeth that cannot be predictably restored, with assessment, local anaesthesia and clear aftercare instructions.",
    who: "Severely decayed, fractured, impacted or wisdom teeth; teeth planned for orthodontics.",
    duration: "20–60 min depending on complexity",
    steps: [
      "X-ray evaluation and diagnosis",
      "Local anaesthesia and comfort checks",
      "Removal planned according to the tooth position and case complexity",
      "Post-op instructions, medications and review appointment",
    ],
    aftercare: [
      "Cold compress cycles for the first day",
      "No straws, rinsing or smoking for 5 days",
      "Soft diet and full course of prescribed medications",
    ],
    faqs: [
      {
        q: "How long is the recovery?",
        a: "Most people return to routine in 1–3 days; impaction cases may take 4–7 days for full comfort.",
      },
    ],
    doctors: ["dr-sheetal-kumar-g"],
  },
  {
    slug: "pediatric-dentistry",
    dateModified: serviceContentDate,
    title: "Pediatric (Children's) Dental Care",
    category: "Specialized Care",
    short:
      "Gentle, child-friendly dentistry with tell-show-do visits, preventive treatments and coaching for a lifetime of healthy habits.",
    who: "Children from their very first tooth through the teenage years.",
    duration: "30–45 min",
    steps: [
      "Friendly, play-first introduction to the clinic",
      "Gentle check-up and, if tolerated, cleaning",
      "Fluoride varnish or sealants to prevent cavities",
      "Brushing and diet coaching for parents",
    ],
    aftercare: ["No food or drink 30 minutes after fluoride", "Supervised brushing twice a day"],
    faqs: [
      {
        q: "When should my child's first visit be?",
        a: "By the first birthday, or within six months of the first tooth appearing.",
      },
    ],
    doctors: [],
  },
  {
    slug: "geriatric-dentistry",
    dateModified: serviceContentDate,
    title: "Geriatric Dental Care",
    category: "Specialized Care",
    short:
      "Compassionate, senior-friendly dental care focused on comfort, function and preserving natural teeth for as long as possible.",
    who: "Older adults with specific needs, medical considerations, missing teeth or worn dentition.",
    duration: "30–90 min, tailored to comfort",
    steps: [
      "Unhurried comprehensive examination with medical history review",
      "Treatment plan prioritising comfort and function",
      "Gentle preventive, restorative or replacement care",
      "Scheduled maintenance to keep things stable long-term",
    ],
    aftercare: [
      "Adapted oral hygiene aids where dexterity is limited",
      "Denture care instructions if applicable",
      "Shorter, more frequent recall visits as needed",
    ],
    faqs: [
      {
        q: "Can you treat patients with complex medical conditions?",
        a: "Treatment planning considers your medical history, and coordination with your physician may be advised when needed.",
      },
    ],
    doctors: ["dr-sheetal-kumar-g"],
  },
  {
    slug: "gum-therapy",
    dateModified: serviceContentDate,
    title: "Gum Therapy (Periodontal Treatment)",
    category: "Preventive & General Care",
    short:
      "Assessment, professional cleaning and periodontal care for bleeding, swollen or receding gums.",
    who: "Bleeding, swollen, receding gums, persistent bad breath or early-to-moderate periodontitis.",
    duration: "45–60 min per visit",
    steps: [
      "Pocket charting and diagnostic evaluation",
      "Ultrasonic scaling and root planing",
      "Additional periodontal treatment where clinically indicated",
      "Re-evaluation and maintenance programme",
    ],
    aftercare: [
      "Warm saline rinses for a few days",
      "Soft brushing until tenderness settles",
      "Follow-up visits to monitor healing",
    ],
    faqs: [
      {
        q: "My gums don't hurt — do I still need treatment?",
        a: "Gum disease is usually painless at first. Bleeding when you brush is the early warning sign.",
      },
    ],
    doctors: ["dr-sheetal-kumar-g"],
  },
];

export type Doctor = {
  slug: string;
  name: string;
  role: string;
  qualifications: string;
  photo: string;
  bio: string[];
  memberships: string[];
  philosophy: string;
};

export const doctors: Doctor[] = [
  {
    slug: "dr-sheetal-kumar-g",
    name: "Dr. Sheetal Kumar G",
    role: "Principal Dental Surgeon",
    qualifications:
      "BDS (Bangalore Institute of Dental Sciences, RGUHS) · Certified Laser Practitioner · Conscious Sedation trained",
    photo: "/images/dr-sheetal-kumar-g.webp",
    bio: [
      "Dr. Sheetal Kumar G earned his Bachelor of Dental Surgery (BDS) from Bangalore Institute of Dental Sciences & Hospital under RGUHS, Karnataka in August 2023. He is registered with the Karnataka State Dental Council (KSDC Reg No: 59793 A, issued 19 November 2024).",
      "He served as Junior Resident Dental Surgeon at Sri Shirdi Sai Baba Anand Ashram Charitable Dental Clinic, Bengaluru from November 2023 to January 2025, gaining hands-on experience in diagnosis, extractions, fillings, dental X-rays, periodontal treatment, root canals, impactions and laser-assisted surgical procedures.",
      "His additional certifications include a Laser Dentistry Course as a Certified Laser Practitioner and a Conscious Sedation Workshop. He speaks English and believes in clear explanations, gentle treatment and doing only what each patient truly needs.",
    ],
    memberships: ["Karnataka State Dental Council (KSDC) — Reg No: 59793 A"],
    philosophy:
      "Explain everything clearly, treat gently, and never recommend what a patient doesn't genuinely need.",
  },
];

const galleryCases = [
  {
    id: "1p",
    title: "Removable Partial Denture",
    category: "Restorative",
    note: "Replacement of missing lower teeth with a custom removable appliance featuring metal clasps.",
  },
  {
    id: "2p",
    title: "Tooth Extraction",
    category: "Surgical",
    note: "Surgical removal of a severely decayed and structurally compromised lower molar.",
  },
  {
    id: "3p",
    title: "Teeth Scaling and Polishing",
    category: "Gum Care",
    note: "Professional cleaning to remove heavy tartar buildup and treat inflamed, bleeding gums.",
  },
  {
    id: "4p",
    title: "Lower Dental Bridge",
    category: "Restorative",
    note: "Placement of a fixed ceramic bridge to replace missing lower posterior teeth.",
  },
  {
    id: "5p",
    title: "Cosmetic Dental Bonding",
    category: "Cosmetic",
    note: "Aesthetic repair of chipped and worn upper front teeth using tooth-coloured composite resin.",
  },
  {
    id: "6p",
    title: "Upper Dental Bridge",
    category: "Restorative",
    note: "Restoration of missing upper side teeth with a custom-fitted fixed ceramic bridge.",
  },
  {
    id: "7p",
    title: "Posterior Ceramic Bridge",
    category: "Restorative",
    note: "Replacement of missing lower back teeth utilising a multi-unit fixed dental bridge.",
  },
  {
    id: "8p",
    title: "Anterior Tooth Restoration",
    category: "Cosmetic",
    note: "Cosmetic reshaping and repair of a chipped upper central incisor to restore natural contours.",
  },
  {
    id: "9p",
    title: "Deep Dental Cleaning",
    category: "Gum Care",
    note: "Periodontal treatment to remove plaque and tartar, significantly reducing gum inflammation.",
  },
  {
    id: "10p",
    title: "Composite Cavity Filling",
    category: "Restorative",
    note: "Application of a tooth-coloured resin restoration to treat localised decay on an upper front tooth.",
  },
  {
    id: "11p",
    title: "Cosmetic Anterior Crowns",
    category: "Cosmetic",
    note: "Restoration of broken upper front teeth using custom-matched ceramic crowns to improve smile aesthetics.",
  },
  {
    id: "12p",
    title: "Lower Anterior Ceramic Bridge",
    category: "Restorative",
    note: "Extensive replacement of missing and damaged lower front teeth with a multi-unit fixed dental bridge.",
  },
  {
    id: "13p",
    title: "Cosmetic Dental Bonding",
    category: "Cosmetic",
    note: "Direct composite resin application to repair a chipped upper central incisor and restore its natural shape.",
  },
  {
    id: "14p",
    title: "Upper Anterior Dental Bridge",
    category: "Restorative",
    note: "Complex rehabilitation of severely compromised and missing upper front teeth using a custom fixed ceramic bridge.",
  },
  {
    id: "15p",
    title: "Professional Teeth Scaling",
    category: "Gum Care",
    note: "Thorough removal of heavy calculus and plaque buildup from the lower teeth to treat inflammation and restore gum health.",
  },
];

export const cases = galleryCases.map((c) => ({
  ...c,
  doctor: "Dr. Sheetal Kumar G",
  before: `/images/gallery/${c.id}-before-768.webp`,
  after: `/images/gallery/${c.id}-after-768.webp`,
  beforeSrcSet: responsiveImageSet(`gallery/${c.id}-before`),
  afterSrcSet: responsiveImageSet(`gallery/${c.id}-after`),
}));

export const testimonials = [
  {
    name: "Puja Upadhyay",
    treatment: "General dental problems",
    rating: 5,
    quote:
      "One of best clinic I visited for dental problems I was having continuous problem for an year or 2 and the doctor advised solutions which felt right and effective. I recommend this clinic all nearby patient Thankyou doctor Sheetal",
  },
  {
    name: "Venkateswara Rao Kavala",
    treatment: "General treatment (adult & child)",
    rating: 5,
    quote:
      "Expert & Friendly Dentist...at reasonable level and I am very much satisfied with the treatment we recieved for my son and myself. Highly recommend this dentist",
  },
  {
    name: "Alisha Zakkir",
    treatment: "General procedure",
    rating: 5,
    quote:
      "This is my trusted dental clinic in Bangalore. Been visiting since last year and recent visit with Dr. Sheetal was very comfortable. He explained the procedure well and supported with doctor notes even after my visit.",
  },
  {
    name: "Dharshan G",
    treatment: "General procedure",
    rating: 5,
    quote:
      "I had a wonderful experience at this dental clinic. Dr. Sheetal is incredibly skilled, patient, and thorough. He took the time to explain the entire procedure and made sure I was completely comfortable throughout. The clinic is clean, hygienic, and well-maintained. Highly recommend Dr. Sheetal for anyone looking for gentle, top-tier dental care.",
  },
  {
    name: "Dhivyapriya KS",
    treatment: "Tooth filling",
    rating: 5,
    quote:
      "I randomly walked into Dr.Sheetal clinic today and explained about my tooth filling issue. He was kind in understanding, filled-in that exactly matches my tooth color. Best sevice by doctor and Clinic is very hygienic.",
  },
];

export const posts = [
  {
    slug: "braces-treatment-guide",
    title: "Braces treatment: what to expect before you begin",
    category: "Orthodontics",
    date: "8 Sep 2026",
    datePublished: "2026-09-08",
    dateModified: "2026-09-08",
    serviceSlug: "braces",
    excerpt:
      "A practical guide to assessment, treatment planning, daily care and the questions to ask before starting braces.",
    sources: [
      {
        label: "American Association of Orthodontists: Braces",
        url: "https://aaoinfo.org/treatments/braces/",
      },
    ],
    body: [
      "Braces move teeth gradually and can be used to address crowding, spacing and some bite problems. The right plan depends on an examination and records such as photographs or X-rays when clinically indicated.",
      "Before treatment begins, ask who will provide the orthodontic care, what type of appliance is proposed, the expected treatment range and what is included in the quoted fee. A personalised assessment matters more than choosing an appliance from photographs alone.",
      "Appointments are required during treatment so progress can be reviewed and the appliance adjusted. The exact schedule and total duration vary with the complexity of the case and how the teeth respond.",
      "Cleaning around brackets takes extra care. Use fluoride toothpaste, clean around the gumline and brackets, and follow the treating clinician's advice about floss or interdental brushes.",
      "Hard or sticky foods can damage brackets and wires. If part of the appliance becomes loose or sharp, contact the treating clinic for advice rather than attempting a permanent repair at home.",
      "After active treatment, retainers are normally needed to help maintain the new tooth positions. The clinician will explain the appropriate retainer type and wear schedule for your case.",
    ],
  },
  {
    slug: "implant-aftercare",
    title: "Dental implant aftercare: the early healing period",
    category: "Implants",
    date: "28 May 2026",
    datePublished: "2026-05-28",
    dateModified: "2026-09-08",
    serviceSlug: "dental-implants",
    excerpt:
      "General guidance on early healing, oral hygiene and when to contact your treating dental team after implant treatment.",
    sources: [
      {
        label: "Guy's and St Thomas' NHS Foundation Trust: After having a dental implant",
        url: "https://www.guysandstthomas.nhs.uk/health-information/dental-implants/after-having-dental-implant",
      },
      {
        label: "Cambridge University Hospitals: Dental implants in restorative dentistry",
        url: "https://www.cuh.nhs.uk/patient-information/dental-implants-in-restorative-dentistry/",
      },
    ],
    body: [
      "Your treating clinician's written instructions take priority because implant procedures vary. Some swelling, bruising or discomfort can occur during early healing, but the pattern differs from person to person.",
      "Use any prescribed or recommended medicines only as directed by your treating clinician. Do not add or change medication based on general online advice.",
      "Keep the area clean using the method demonstrated by the clinic. Avoid disturbing the surgical site, and follow the specific guidance you receive about brushing, rinsing and food.",
      "Smoking can interfere with healing and is a recognised risk factor for implant complications. Tell your clinician about tobacco use so it can be considered in treatment planning and aftercare.",
      "Contact the treating clinic if bleeding does not settle, swelling or pain is worsening rather than improving, or you develop fever, an unpleasant discharge or another symptom that concerns you.",
      "Long-term implant care includes careful daily cleaning and regular professional review. An implant restoration can still develop problems in the surrounding gums and supporting tissues if plaque is not controlled.",
    ],
  },
  {
    slug: "bleeding-gums",
    title: "Bleeding gums: possible causes and when to see a dentist",
    category: "Gum Care",
    date: "9 May 2026",
    datePublished: "2026-05-09",
    dateModified: "2026-09-08",
    serviceSlug: "gum-therapy",
    excerpt:
      "Bleeding while brushing can be a sign of gum inflammation and deserves attention when it persists or returns.",
    sources: [
      {
        label: "NHS: Gum disease",
        url: "https://www.nhs.uk/conditions/gum-disease/",
      },
    ],
    body: [
      "Gums that bleed during brushing are often inflamed, commonly because plaque has collected around the gumline. Redness, swelling, tenderness or persistent bad breath may occur at the same time.",
      "Bleeding can also have other causes, so a website cannot identify the reason in an individual case. Persistent, unexplained or heavy bleeding should be assessed rather than self-diagnosed.",
      "A dental visit may include an examination of the gums, measurement of gum pockets and X-rays when clinically needed. The findings determine whether routine cleaning, periodontal treatment or another approach is appropriate.",
      "Continue gentle daily cleaning unless your clinician advises otherwise. Stopping brushing completely can allow more plaque to collect, while aggressive scrubbing may irritate the tissues.",
      "Seek prompt dental advice if bleeding is accompanied by loose teeth, swelling, pus, severe pain or rapidly worsening symptoms. Mention any medical conditions or medicines that may affect bleeding.",
      "After treatment, consistent home care and review intervals based on your gum health help reduce the chance of the problem returning.",
    ],
  },
  {
    slug: "kids-first-visit",
    title: "Preparing your child for their first dental visit",
    category: "Children's Dental Care",
    date: "21 Apr 2026",
    datePublished: "2026-04-21",
    dateModified: "2026-09-08",
    serviceSlug: "pediatric-dentistry",
    excerpt:
      "Simple ways to make a child's first dental appointment calm, familiar and focused on prevention.",
    sources: [
      {
        label: "American Academy of Pediatric Dentistry: Parent FAQ",
        url: "https://www.aapd.org/resources/parent/faq/",
      },
    ],
    body: [
      "Early dental visits help parents receive guidance on cleaning, diet and tooth development before a problem becomes painful. Professional recommendations commonly support a first visit by the first birthday.",
      "Use simple, neutral language at home. You can say the dentist will count the teeth and help keep them clean. Avoid promising that nothing will happen, because the visit depends on what the clinician finds.",
      "Choose a time when your child is usually rested and bring information about medical conditions, medicines, allergies and any dental symptoms.",
      "A first visit may be mostly an introduction, conversation and gentle examination. The pace depends on the child's age, comfort and clinical needs.",
      "Parents can ask about brushing with fluoride toothpaste, snacks and drinks, thumb or pacifier habits, injury prevention and how often reviews are appropriate.",
      "If your child has facial swelling, dental trauma, uncontrolled bleeding or significant pain, call the clinic promptly rather than waiting for a routine first-visit appointment.",
    ],
  },
];

export const faqs = [
  {
    group: "Appointments",
    items: [
      {
        q: "Are appointments confirmed instantly?",
        a: "No. Appointment requests require manual follow-up — our team will contact you by phone or WhatsApp to confirm your slot, usually within clinic hours.",
      },
      {
        q: "Do you offer emergency services?",
        a: "We do not offer dedicated emergency services. For urgent concerns during clinic hours, please call the clinic directly.",
      },
      {
        q: "How early should I arrive?",
        a: "Ten minutes before your slot for first visits, five minutes for reviews.",
      },
      {
        q: "Can I book for a family member?",
        a: "Absolutely. Add their name in the notes field when you request an appointment.",
      },
    ],
  },
  {
    group: "Costs & Payment",
    items: [
      {
        q: "Will you tell me the cost before treatment?",
        a: "Always. You receive a written plan with itemised costs before anything begins. Consultation fees are discussed directly during your visit.",
      },
      {
        q: "Do you offer EMI or payment plans?",
        a: "Please call the clinic to discuss payment options for your specific treatment plan.",
      },
      {
        q: "Do you accept insurance?",
        a: "We provide all documentation needed for reimbursement claims.",
      },
    ],
  },
  {
    group: "Treatment & Safety",
    items: [
      {
        q: "Is treatment painful?",
        a: "Modern local anaesthesia, and conscious sedation where appropriate, means most procedures are genuinely comfortable.",
      },
      {
        q: "How often should I have a check-up?",
        a: "Every six months for most people, every three months during active gum therapy.",
      },
      {
        q: "Do you follow sterilisation protocols?",
        a: "Yes — we use a Class N autoclave, UV chamber for disinfection, ultrasonic cleaning and single-use disposables for every patient.",
      },
      {
        q: "What equipment do you use?",
        a: "Complete dental chair setup, RVG digital X-ray, pneumatic suction, Class N autoclave, UV chamber, ultrasonic scaler, compressor unit and a professional dental lab setup.",
      },
    ],
  },
];

export const qualifications = [
  "Complete dental chair setup",
  "RVG digital X-ray imaging",
  "Pneumatic suction unit",
  "Class N autoclave sterilisation",
  "UV chamber for disinfection",
  "Ultrasonic scaler unit",
  "Compressor unit",
  "Professional dental lab setup",
];
