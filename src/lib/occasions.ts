import { P, type Photo } from "@/lib/photos";

export type Occasion = {
  slug: "birthday-parties" | "schools-sports-clubs" | "events" | "villas-poolside";
  label: string;
  hook: string;
  intro: string;
  enquiryType: string;
  cover: Photo;
  gallery: Photo[];
  tips: string[];
};

export const OCCASIONS: Occasion[] = [
  {
    slug: "birthday-parties",
    label: "Birthday Parties",
    hook: "The moment the cooler opens.",
    intro: "Cake is great. But nothing gets a squeal quite like a cooler full of bright, fruity pops on a hot Bali afternoon.",
    enquiryType: "Birthday party",
    cover: P.heroCoolerGroup,
    gallery: [P.heroCoolerGroup, P.heroCoolerPair, P.kioskGirl],
    tips: ["Your party date", "Where the party is", "How many kids (and grown-ups!)"],
  },
  {
    slug: "schools-sports-clubs",
    label: "Schools & Sports Clubs",
    hook: "Final whistle. Fruity reward.",
    intro: "After training, match day or a school fun day, a cold pop is the easiest way to cool down a crowd of happy, hot kids.",
    enquiryType: "School or sports club",
    cover: P.footballKidsKiosk,
    gallery: [P.footballKidsKiosk, P.footballBoy, P.footballPair, P.footballAdults],
    tips: ["School or club name", "Date of the day or event", "Number of children"],
  },
  {
    slug: "events",
    label: "Events",
    hook: "A little joy for a big crowd.",
    intro: "Markets, community nights and celebrations. Fruti Pop brings a splash of colour and a queue of smiling faces.",
    enquiryType: "Event",
    cover: P.mnm[0]!,
    gallery: [P.eventStrawHat, P.eventStrawberry, P.eventNight],
    tips: ["Event date", "Venue or area", "Expected number of guests"],
  },
  {
    slug: "villas-poolside",
    label: "Villas & Poolside",
    hook: "Pool day, sorted.",
    intro: "Staying in a villa? Ask us about a cooler of pops for lazy pool days with the family.",
    enquiryType: "Villa or poolside",
    cover: P.villaDelivery,
    gallery: [P.villaDelivery, P.heroCoolerPair, P.beachCouple],
    tips: ["Villa name and area", "Dates of your stay", "How many pops you'd like"],
  },
];

export const getOccasion = (slug: Occasion["slug"]) => OCCASIONS.find((o) => o.slug === slug)!;

// Named by the owner as Fruti Pop customers. Relationship type not confirmed — do not call them partners or stockists.
export const COMMUNITY_NAMES = [
  "Mookeyland",
  "Bali Bulldogs Football Club",
  "Tangu Community School",
  "Australian International School",
  "ProEd",
  "Umalas",
];
