// Business contact details — supplied by the owner (from the Fruti Pop Bali Facebook page).
export const CONTACT = {
  whatsappNumber: "6287841480116",
  phoneDisplay: "+62 878-4148-0116",
  phoneHref: "tel:+6287841480116",
  email: "frutipopbali@gmail.com",
  address: "Jl. Raya Semer No.59A, Kerobokan, Kec. Kuta Utara, Badung, Bali 80361, Indonesia",
};

export const SNOWWAVE = {
  url: "https://thesnowwavebali.com/",
  label: "Snowwave Bali: Frozen Fruit & Fruit Purées",
  blurb: "for hospitality, wholesale, villas and poolside",
};

export const FAMILY_PACK = { pops: 20, price: "Rp250,000" };

export function waLink(message = "Hi Fruti Pop! I'd like to order some pops.") {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mailLink(subject: string, body = "") {
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const ENQUIRY_TYPES = [
  "Family pack (20 pops)",
  "Birthday party",
  "School or sports club",
  "Event",
  "Villa or poolside",
  "Where can I buy Fruti Pop?",
  "Something else",
] as const;
