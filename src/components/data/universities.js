/* EduTrade — recognised South African public universities & TVET colleges.
   Registration is restricted to official institutional (.ac.za) emails;
   generic providers (Gmail, Yahoo, etc.) are blocked. */

export const UNIVERSITIES = [
  { domain: "tut4life.ac.za", name: "Tshwane University of Technology", short: "TUT", type: "university" },
  { domain: "uj.ac.za", name: "University of Johannesburg", short: "UJ", type: "university" },
  { domain: "up.ac.za", name: "University of Pretoria", short: "UP", type: "university" },
  { domain: "wits.ac.za", name: "University of the Witwatersrand", short: "Wits", type: "university" },
  { domain: "sun.ac.za", name: "Stellenbosch University", short: "Maties", type: "university" },
  { domain: "ufs.ac.za", name: "University of the Free State", short: "UFS", type: "university" },
  { domain: "ukzn.ac.za", name: "University of KwaZulu-Natal", short: "UKZN", type: "university" },
  { domain: "nwu.ac.za", name: "North-West University", short: "NWU", type: "university" },
  { domain: "mandela.ac.za", name: "Nelson Mandela University", short: "Mandela", type: "university" },
  { domain: "ru.ac.za", name: "Rhodes University", short: "RU", type: "university" },
  { domain: "cut.ac.za", name: "Central University of Technology", short: "CUT", type: "university" },
  { domain: "dut.ac.za", name: "Durban University of Technology", short: "DUT", type: "university" },
  { domain: "cput.ac.za", name: "Cape Peninsula University of Technology", short: "CPUT", type: "university" },
  { domain: "mut.ac.za", name: "Mangosuthu University of Technology", short: "MUT", type: "university" },
  { domain: "unisa.ac.za", name: "University of South Africa", short: "UNISA", type: "university" },
  { domain: "vut.ac.za", name: "Vaal University of Technology", short: "VUT", type: "university" },
  { domain: "ufh.ac.za", name: "University of Fort Hare", short: "UFH", type: "university" },
  { domain: "wsu.ac.za", name: "Walter Sisulu University", short: "WSU", type: "university" },
  { domain: "ul.ac.za", name: "University of Limpopo", short: "UL", type: "university" },
  { domain: "spu.ac.za", name: "Sol Plaatje University", short: "SPU", type: "university" },
  /* Selected public TVET colleges */
  { domain: "ctc.edu.za", name: "Central Technical College", short: "CTC", type: "tvet" },
  { domain: "swgc.edu.za", name: "South West Gauteng TVET College", short: "SWG", type: "tvet" },
  { domain: "tsc.edu.za", name: "Tshwane South TVET College", short: "TSC", type: "tvet" },
];

export const POPULAR_UNIVERSITIES = UNIVERSITIES.slice(0, 12);

const BLOCKED_PROVIDERS = [
  "gmail.com", "yahoo.com", "outlook.com", "hotmail.com",
  "icloud.com", "live.com", "aol.com", "proton.me", "protonmail.com",
];

export function emailDomain(email = "") {
  return (email.split("@")[1] || "").toLowerCase().trim();
}

export function detectUniversity(email = "") {
  const domain = emailDomain(email);
  if (!domain) return null;
  return UNIVERSITIES.find((u) => u.domain === domain) || null;
}

/* Returns { ok, university, reason } — ok=true when the email is an accepted
   institutional address. Any known .ac.za / .edu.za domain is accepted even if
   not in our curated list. */
export function validateStudentEmail(email = "") {
  const domain = emailDomain(email);
  if (!domain) return { ok: false, reason: "Enter a valid email address." };
  if (BLOCKED_PROVIDERS.includes(domain)) {
    return { ok: false, reason: "Please use your official university email — Gmail, Yahoo and other personal providers are not accepted." };
  }
  const uni = detectUniversity(email);
  if (uni) return { ok: true, university: uni };
  if (domain.endsWith(".ac.za") || domain.endsWith(".edu.za")) {
    return { ok: true, university: { name: "Recognised SA institution", short: "SA", type: "institution" } };
  }
  return { ok: false, reason: "Use your official university or public college email (ending in .ac.za)." };
}