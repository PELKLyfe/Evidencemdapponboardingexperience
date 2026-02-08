export interface Specialty {
  id: string;
  name: string;
  synonyms: string[];
  roles: string[]; // Role keys this specialty applies to
  category?: string;
}

export const SPECIALTIES: Specialty[] = [
  // --- CORE PHYSICIAN (MD/DO, NP, PA) ---
  { id: "family-med", name: "Family Medicine", synonyms: ["primary care", "gp", "general practice"], roles: ["MD / DO", "NP", "PA"] },
  { id: "internal-med", name: "Internal Medicine", synonyms: ["internist", "general medicine"], roles: ["MD / DO", "NP", "PA"] },
  { id: "pediatrics", name: "Pediatrics", synonyms: ["peds", "pediatrician"], roles: ["MD / DO", "NP", "PA"] },
  { id: "emergency-med", name: "Emergency Medicine", synonyms: ["er", "ed", "trauma"], roles: ["MD / DO", "NP", "PA"] },
  { id: "obgyn", name: "Obstetrics and Gynecology (OB/GYN)", synonyms: ["womens health", "gynecology"], roles: ["MD / DO", "NP", "PA"] },
  { id: "general-surgery", name: "General Surgery", synonyms: ["surgeon"], roles: ["MD / DO", "NP", "PA"] },
  { id: "orthopedic-surgery", name: "Orthopedic Surgery", synonyms: ["ortho", "bones"], roles: ["MD / DO", "NP", "PA"] },
  { id: "neurology", name: "Neurology", synonyms: ["neuro", "brain"], roles: ["MD / DO", "NP", "PA"] },
  { id: "neurosurgery", name: "Neurosurgery", synonyms: ["brain surgery"], roles: ["MD / DO", "NP", "PA"] },
  { id: "psychiatry", name: "Psychiatry", synonyms: ["psych"], roles: ["MD / DO", "NP", "PA"] },
  { id: "radiology", name: "Radiology", synonyms: ["imaging"], roles: ["MD / DO", "NP", "PA"] },
  { id: "anesthesiology", name: "Anesthesiology", synonyms: ["anesthesia"], roles: ["MD / DO", "NP", "PA"] },
  { id: "pathology", name: "Pathology", synonyms: ["lab"], roles: ["MD / DO", "NP", "PA"] },
  { id: "dermatology", name: "Dermatology", synonyms: ["derm", "skin"], roles: ["MD / DO", "NP", "PA"] },
  { id: "ophthalmology", name: "Ophthalmology", synonyms: ["eyes", "vision"], roles: ["MD / DO", "NP", "PA"] },
  { id: "ent", name: "Otolaryngology (ENT)", synonyms: ["ear nose throat"], roles: ["MD / DO", "NP", "PA"] },
  { id: "urology", name: "Urology", synonyms: ["bladder"], roles: ["MD / DO", "NP", "PA"] },
  { id: "pmr", name: "Physical Medicine and Rehabilitation (PM&R)", synonyms: ["physiatry"], roles: ["MD / DO", "NP", "PA"] },
  
  // --- ALLIED HEALTH ROLES & SPECIALTIES ---
  { id: "resp-therapy", name: "Respiratory Therapy", synonyms: ["rt", "breathing"], roles: ["Respiratory Therapy"] },
  { id: "slp", name: "Speech-Language Pathology", synonyms: ["speech therapist", "slp"], roles: ["Speech-Language Pathology"] },
  { id: "ot", name: "Occupational Therapy", synonyms: ["ot"], roles: ["Occupational Therapy"] },
  { id: "audiology", name: "Audiology", synonyms: ["hearing"], roles: ["Audiology"] },
  { id: "nutrition", name: "Nutrition / Dietetics", synonyms: ["dietitian", "rd"], roles: ["Nutrition / Dietetics"] },
  { id: "athletic-training", name: "Athletic Training", synonyms: ["atc"], roles: ["Athletic Training"] },
  { id: "clin-psych", name: "Clinical Psychology", synonyms: ["psychologist"], roles: ["Clinical Psychology"] },
  { id: "genetic-counseling", name: "Genetic Counseling", synonyms: ["genetics"], roles: ["Genetic Counseling"] },

  // --- ADMINISTRATIVE / NON-CLINICAL SPECIALTIES ---
  { id: "um", name: "Utilization Management (UM)", synonyms: ["um"], roles: ["Administrative"], category: "Operations" },
  { id: "pa", name: "Prior Authorization (PA)", synonyms: ["auths"], roles: ["Administrative"], category: "Operations" },
  { id: "claims", name: "Claims Review", synonyms: ["claims"], roles: ["Administrative"], category: "Operations" },
  { id: "case-mgmt", name: "Case Management", synonyms: ["case manager"], roles: ["Administrative"], category: "Operations" },
  { id: "care-coord", name: "Care Coordination", synonyms: ["coordinator"], roles: ["Administrative"], category: "Operations" },
  { id: "social-work", name: "Social Work", synonyms: ["lmsw"], roles: ["Administrative"], category: "Operations" },
  { id: "benefits-admin", name: "Benefits Administration", synonyms: ["hr"], roles: ["Administrative"], category: "Insurance & Benefits" },
  { id: "employer-health", name: "Employer Health Benefits", synonyms: [], roles: ["Administrative"], category: "Insurance & Benefits" },
  { id: "ins-broker", name: "Insurance Brokerage", synonyms: ["broker"], roles: ["Administrative"], category: "Insurance & Benefits" },
  { id: "medicare-adv", name: "Medicare Advantage Operations", synonyms: ["ma ops"], roles: ["Administrative"], category: "Insurance & Benefits" },
  { id: "medicaid-managed", name: "Medicaid Managed Care Ops", synonyms: ["managed care"], roles: ["Administrative"], category: "Insurance & Benefits" },
  { id: "provider-rel", name: "Provider Relations", synonyms: [], roles: ["Administrative"], category: "Operations" },
  { id: "credentialing", name: "Credentialing", synonyms: [], roles: ["Administrative"], category: "Operations" },
  { id: "billing", name: "RCM / Billing", synonyms: ["billing"], roles: ["Administrative"], category: "RCM & Documentation" },
  { id: "coding", name: "Coding (ICD-10/CPT)", synonyms: ["coding"], roles: ["Administrative"], category: "RCM & Documentation" },
  { id: "compliance", name: "Compliance / Audit", synonyms: ["audit"], roles: ["Administrative"], category: "Quality & Compliance" },
  { id: "quality-hedis", name: "Quality Improvement (HEDIS/Stars)", synonyms: ["hedis", "stars"], roles: ["Administrative"], category: "Quality & Compliance" },
  { id: "pop-health", name: "Population Health", synonyms: [], roles: ["Administrative"], category: "Quality & Compliance" },
  { id: "cdi", name: "Clinical Documentation Integrity (CDI)", synonyms: ["cdi"], roles: ["Administrative"], category: "RCM & Documentation" },

  // --- PUBLIC HEALTH / RESEARCH ---
  { id: "epidemiology", name: "Epidemiology", synonyms: [], roles: ["Administrative"], category: "Public Health & Research" },
  { id: "biostats", name: "Biostatistics", synonyms: [], roles: ["Administrative"], category: "Public Health & Research" },
  { id: "health-policy", name: "Health Policy", synonyms: ["policy"], roles: ["Administrative"], category: "Public Health & Research" },
  { id: "clin-research", name: "Clinical Research", synonyms: ["research"], roles: ["Administrative"], category: "Public Health & Research" },
  { id: "trans-research", name: "Translational Research", synonyms: [], roles: ["Administrative"], category: "Public Health & Research" },
  { id: "health-econ", name: "Health Economics", synonyms: [], roles: ["Administrative"], category: "Public Health & Research" },
  { id: "outcomes-res", name: "Outcomes Research", synonyms: [], roles: ["Administrative"], category: "Public Health & Research" },
  { id: "impl-science", name: "Implementation Science", synonyms: [], roles: ["Administrative"], category: "Public Health & Research" },
];

export const ROLE_TOP_CHIPS: Record<string, string[]> = {
  "MD / DO": ["Family Medicine", "Internal Medicine", "Emergency Medicine", "Pediatrics", "Psychiatry", "General Surgery", "Cardiology", "OB/GYN", "Radiology", "Orthopedic Surgery"],
  "NP": ["Family Medicine", "Internal Medicine", "Emergency Medicine", "Pediatrics", "Psychiatry", "OB/GYN", "Cardiology", "Oncology", "Geriatric Medicine", "Hospice and Palliative Medicine"],
  "PA": ["Family Medicine", "Internal Medicine", "Emergency Medicine", "Orthopedic Surgery", "General Surgery", "Dermatology", "Cardiology", "Urgent Care", "Psychiatry", "Hospital Medicine"],
  "DDS": ["General Dentistry", "Orthodontics", "Periodontics", "Endodontics", "Prosthodontics", "Oral and Maxillofacial Surgery", "Pediatric Dentistry"],
  "DPM": ["General Podiatry", "Foot and Ankle Surgery", "Wound Care / Limb Salvage", "Diabetic Foot Care", "Sports Podiatry"],
  "OD": ["General Optometry", "Low Vision Rehabilitation", "Contact Lens Specialist", "Ocular Disease", "Vision Therapy"],
  "DC": ["General Chiropractic", "Sports Chiropractic", "Chiropractic Neurology", "Rehabilitation Chiropractic"],
  "DPT": ["Orthopedic PT", "Neurologic PT", "Pediatric PT", "Geriatric PT", "Sports PT", "Pelvic Floor PT", "Cardiac Rehab", "Pulmonary Rehab"],
  "PharmD": ["Ambulatory Care", "Hospital / Inpatient", "Critical Care", "Infectious Disease", "Oncology", "Transplant", "Psychiatric", "Community Pharmacy"],
  "RN": ["Primary Care", "Critical Care / ICU", "Emergency Nursing", "Labor & Delivery", "OR / Perioperative", "Pediatrics Nursing", "Case Management"],
  
  // Allied Health Defaults
  "Respiratory Therapy": ["General RT", "Critical Care RT", "Pediatric RT"],
  "Speech-Language Pathology": ["Pediatric SLP", "Adult Neuro SLP", "Dysphagia"],
  "Occupational Therapy": ["Hand Therapy", "Pediatric OT", "Neuro Rehab"],
  "Audiology": ["Diagnostic Audiology", "Hearing Aids", "Vestibular"],
  "Nutrition / Dietetics": ["Clinical Nutrition", "Diabetes Education", "Renal Nutrition"],
  "Athletic Training": ["Sports Medicine", "Orthopedic Rehab"],
  "Clinical Psychology": ["CBT", "Child Psychology", "Health Psychology"],
  "Genetic Counseling": ["Cancer Genetics", "Prenatal Genetics", "Pediatric Genetics"]
};

export const ADMIN_CATEGORIES = [
  "Operations",
  "Insurance & Benefits",
  "Quality & Compliance",
  "RCM & Documentation",
  "Public Health & Research"
];
