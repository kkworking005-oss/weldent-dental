import type { Service } from "@/lib/site";

const dateModified = "2026-09-09";
const standardAftercare = [
  "Follow the personalised instructions given after your appointment",
  "Maintain gentle brushing and interdental cleaning as advised",
  "Contact the clinic if symptoms worsen or you are concerned",
];

export const services: Service[] = [
  {
    slug: "check-ups",
    dateModified,
    title: "Check-ups",
    category: "Preventive & Diagnostic Care",
    short:
      "Comprehensive dental examinations to identify tooth, gum and bite concerns early and plan appropriate care.",
    who: "Children and adults attending routine reviews or seeking an assessment of a dental concern.",
    duration: "Usually 20–40 minutes",
    steps: [
      "Discuss symptoms and medical history",
      "Examine teeth, gums and bite",
      "Recommend X-rays only when clinically indicated",
      "Explain findings and suitable next steps",
    ],
    aftercare: standardAftercare,
    faqs: [
      {
        q: "How often should I have a dental check-up?",
        a: "The interval depends on your oral health and risk factors. Your dentist will recommend a suitable recall schedule after examining you.",
      },
    ],
    doctors: ["dr-sheetal-kumar-g"],
  },
  {
    slug: "teeth-cleaning-gum-care",
    dateModified,
    title: "Teeth cleaning and gum care",
    category: "Preventive & Diagnostic Care",
    short:
      "Professional scaling, polishing and personalised gum care to remove deposits and support healthier gums.",
    who: "People with plaque, tartar, staining, bleeding gums or a clinician-recommended cleaning schedule.",
    duration: "Usually 30–60 minutes",
    steps: [
      "Assess teeth and gums",
      "Remove plaque and hardened deposits",
      "Polish selected tooth surfaces",
      "Explain home-care and recall advice",
    ],
    aftercare: standardAftercare,
    faqs: [
      {
        q: "Can cleaning help bleeding gums?",
        a: "Cleaning may be part of care when plaque and tartar contribute to inflammation, but persistent bleeding needs an examination to identify the cause.",
      },
    ],
    doctors: ["dr-sheetal-kumar-g"],
  },
  {
    slug: "x-ray",
    dateModified,
    title: "X-Ray",
    category: "Preventive & Diagnostic Care",
    short:
      "Digital dental X-rays used when clinically indicated to support diagnosis and treatment planning.",
    who: "Patients whose examination suggests that imaging would provide useful diagnostic information.",
    duration: "Usually 5–20 minutes",
    steps: [
      "Review the clinical reason for imaging",
      "Position the sensor and protective equipment",
      "Capture the required image",
      "Explain relevant findings in context",
    ],
    aftercare: [
      "No special aftercare is normally required",
      "Keep the image available for future comparison",
      "Continue with the treatment plan discussed",
    ],
    faqs: [
      {
        q: "Will I need an X-ray at every visit?",
        a: "No. Dental X-rays should be selected according to your symptoms, examination findings, history and clinical need.",
      },
    ],
    doctors: ["dr-sheetal-kumar-g"],
  },
  {
    slug: "preventive-restorations",
    dateModified,
    title: "Preventive care and restorations",
    category: "Restorative Dentistry",
    short:
      "Preventive treatment and tooth-coloured restorations planned to protect teeth and repair areas affected by decay or damage.",
    who: "Patients who need cavity prevention, sealants, fillings or repair of a chipped or worn tooth.",
    duration: "Usually 30–60 minutes per visit",
    steps: [
      "Examine and diagnose the tooth",
      "Discuss preventive or restorative options",
      "Prepare and restore the area when required",
      "Check the bite and provide care advice",
    ],
    aftercare: standardAftercare,
    faqs: [
      {
        q: "Are tooth-coloured fillings suitable for every cavity?",
        a: "Suitability depends on the tooth, cavity size, remaining structure, bite and moisture control. Your dentist will explain the appropriate options.",
      },
    ],
    doctors: ["dr-sheetal-kumar-g"],
  },
  {
    slug: "root-canal",
    dateModified,
    title: "Root canal treatment",
    category: "Restorative Dentistry",
    short:
      "Treatment for an infected or inflamed tooth, followed by an appropriate final restoration when the tooth can be predictably retained.",
    who: "Patients with deep decay, a cracked or traumatised tooth, persistent pain or other signs requiring pulp assessment.",
    duration: "Often 45–90 minutes across one or more visits",
    steps: [
      "Examination and diagnostic imaging",
      "Local anaesthesia and tooth isolation",
      "Clean, shape and seal the root canals",
      "Plan the final filling or crown according to remaining tooth structure",
    ],
    aftercare: standardAftercare,
    faqs: [
      {
        q: "Is a crown always needed after root canal treatment?",
        a: "Not always. The final restoration depends on the tooth, remaining healthy structure and functional load.",
      },
    ],
    doctors: ["dr-sheetal-kumar-g"],
  },
  {
    slug: "crown-veneers-bridges",
    dateModified,
    title: "Crown, veneers and bridges",
    category: "Restorative Dentistry",
    short:
      "Custom fixed restorations used to rebuild damaged teeth, improve selected tooth surfaces or replace suitable missing teeth.",
    who: "Patients with damaged, heavily restored, aesthetically compromised or missing teeth after clinical assessment.",
    duration: "Commonly two or more visits",
    steps: [
      "Assess the teeth, gums and bite",
      "Discuss materials and suitable options",
      "Prepare records and the treatment area",
      "Fit and adjust the final restoration",
    ],
    aftercare: standardAftercare,
    faqs: [
      {
        q: "Which option is right for me?",
        a: "A crown, veneer or bridge serves a different purpose. The choice depends on the tooth condition, missing-tooth space, bite and your priorities.",
      },
    ],
    doctors: ["dr-sheetal-kumar-g"],
  },
  {
    slug: "dentures",
    dateModified,
    title: "Partial and complete dentures",
    category: "Restorative Dentistry",
    short:
      "Removable partial or complete dentures made to replace missing teeth and support chewing, speech and appearance.",
    who: "Patients missing several or all teeth who are considering a removable replacement option.",
    duration: "Usually several appointments over 2–4 weeks",
    steps: [
      "Assess the mouth and remaining teeth",
      "Take impressions and bite records",
      "Review a trial arrangement where appropriate",
      "Fit the denture and schedule adjustments",
    ],
    aftercare: standardAftercare,
    faqs: [
      {
        q: "Do new dentures need adjustments?",
        a: "Small adjustments are common while the mouth adapts. Attend reviews if an area feels sore or the fit is unstable.",
      },
    ],
    doctors: ["dr-sheetal-kumar-g"],
  },
  {
    slug: "teeth-whitening-cosmetic",
    dateModified,
    title: "Teeth whitening and cosmetic",
    category: "Cosmetic & Orthodontics",
    short:
      "Dentist-supervised whitening and conservative cosmetic options planned after assessing teeth, gums, restorations and sensitivity.",
    who: "Patients seeking an informed assessment of tooth colour, shape, spacing or selected cosmetic concerns.",
    duration: "Varies by the selected treatment plan",
    steps: [
      "Assess oral health and cosmetic goals",
      "Record shade and clinical photographs where useful",
      "Discuss realistic options and limitations",
      "Complete treatment and review the result",
    ],
    aftercare: standardAftercare,
    faqs: [
      {
        q: "Will whitening change crowns or fillings?",
        a: "Whitening affects natural tooth structure differently from existing restorations, so colour matching and sequencing should be planned before treatment.",
      },
    ],
    doctors: ["dr-sheetal-kumar-g"],
  },
  {
    slug: "braces-aligners",
    dateModified,
    title: "Orthodontic braces and aligners",
    category: "Cosmetic & Orthodontics",
    short:
      "Assessment and treatment planning for braces or clear aligners to improve tooth alignment and bite where appropriate.",
    who: "Children, teenagers and adults concerned about crowding, spacing, tooth position or their bite.",
    duration: "Varies according to diagnosis and treatment complexity",
    steps: [
      "Clinical orthodontic assessment",
      "Collect photographs, X-rays or other records as indicated",
      "Compare suitable appliance options",
      "Begin treatment with scheduled monitoring",
    ],
    aftercare: standardAftercare,
    faqs: [
      {
        q: "Are aligners suitable for everyone?",
        a: "No. Suitability depends on the required tooth movement, bite, gum health, oral hygiene and ability to wear the appliance as directed.",
      },
    ],
    doctors: ["dr-karthik-p"],
  },
  {
    slug: "surgical-extraction",
    dateModified,
    title: "Surgical extraction",
    category: "Oral Surgery & Implants",
    short:
      "Planned removal of a tooth that cannot be predictably retained, using an approach based on its condition and position.",
    who: "Patients with severely damaged, non-restorable or otherwise indicated teeth after examination and imaging when required.",
    duration: "Often 20–60 minutes depending on complexity",
    steps: [
      "Examine the tooth and relevant history",
      "Review imaging when indicated",
      "Provide local anaesthesia and remove the tooth",
      "Give written aftercare and arrange review when needed",
    ],
    aftercare: standardAftercare,
    faqs: [
      {
        q: "How long does recovery take?",
        a: "Recovery varies with the tooth, procedure complexity and individual healing. Follow your clinician's instructions and contact the clinic if symptoms worsen.",
      },
    ],
    doctors: ["dr-lakshmi-bhardawaj"],
  },
  {
    slug: "dental-implants",
    dateModified,
    title: "Dental implants",
    category: "Oral Surgery & Implants",
    short:
      "Assessment and staged implant treatment for suitable missing-tooth situations, including planning for the final restoration.",
    who: "Adults considering a fixed or implant-supported replacement for one or more missing teeth.",
    duration: "Staged treatment over several months in many cases",
    steps: [
      "Assess health, gums, bone and bite",
      "Obtain appropriate diagnostic imaging",
      "Plan and place the implant when suitable",
      "Review healing and fit the final restoration",
    ],
    aftercare: standardAftercare,
    faqs: [
      {
        q: "Is everyone suitable for an implant?",
        a: "No. Suitability depends on oral and general health, bone, gums, medicines, smoking, bite and the proposed restoration.",
      },
    ],
    doctors: ["dr-niharika-k-g"],
  },
  {
    slug: "periodontal-gum-care",
    dateModified,
    title: "Periodontal gum care",
    category: "Periodontics & Advanced Care",
    short:
      "Assessment and treatment of gum inflammation and periodontal disease, with maintenance planned to match individual risk.",
    who: "Patients with bleeding, swelling, recession, persistent bad breath, loose teeth or diagnosed periodontal disease.",
    duration: "Varies by gum condition and treatment extent",
    steps: [
      "Measure and assess gum health",
      "Review X-rays when clinically indicated",
      "Provide appropriate non-surgical or referred care",
      "Set a personalised maintenance schedule",
    ],
    aftercare: standardAftercare,
    faqs: [
      {
        q: "Can gum disease return after treatment?",
        a: "Periodontal disease can recur or progress. Consistent home care, risk-factor control and professional maintenance are important.",
      },
    ],
    doctors: ["dr-niharika-k-g"],
  },
  {
    slug: "laser-dentistry",
    dateModified,
    title: "Laser",
    category: "Periodontics & Advanced Care",
    short:
      "Laser-assisted dental procedures offered only when the technique is suitable for the diagnosed condition and treatment goal.",
    who: "Patients whose planned gum or soft-tissue procedure may appropriately use a dental laser.",
    duration: "Depends on the procedure",
    steps: [
      "Diagnose the condition and discuss alternatives",
      "Confirm whether laser assistance is appropriate",
      "Complete the planned procedure with protective measures",
      "Provide procedure-specific aftercare",
    ],
    aftercare: standardAftercare,
    faqs: [
      {
        q: "Is laser always better than conventional treatment?",
        a: "No. A laser is one clinical tool. The appropriate technique depends on the diagnosis, procedure, evidence and clinician's judgement.",
      },
    ],
    doctors: ["dr-sheetal-kumar-g"],
  },
  {
    slug: "pediatric-dentistry",
    dateModified,
    title: "Pediatric dentistry and child care",
    category: "Specialized Dental Care",
    short:
      "Child-focused dental visits, prevention and treatment planned around age, development, comfort and clinical need.",
    who: "Infants, children and teenagers requiring preventive, diagnostic or restorative dental care.",
    duration: "Usually 20–45 minutes",
    steps: [
      "Introduce the child to the clinic",
      "Complete an age-appropriate examination",
      "Discuss prevention or treatment with the parent or guardian",
      "Plan follow-up according to need",
    ],
    aftercare: standardAftercare,
    faqs: [
      {
        q: "When should a child first see a dentist?",
        a: "Early visits help establish preventive care. Contact the clinic for advice based on the child's age, teeth and any current concern.",
      },
    ],
    doctors: [],
  },
];
