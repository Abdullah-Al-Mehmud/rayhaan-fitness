// Centralized gym data — single source of truth for all components

export const WHATSAPP_NUMBER = "8801736574900";
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export function getGymTourWhatsAppUrl(branchId?: string): string {
  const branchMap: Record<string, string> = {
    lalbagh: "Lalbagh",
    dhanmondi: "Dhanmondi",
    mirpur: "Mirpur",
  };
  const branchName =
    (branchId && branchMap[branchId.toLowerCase()]) || branchId || "[Select Branch]";
  const message = `Hi Rayhan Fitness, I would like to book a free gym tour and fitness assessment for the ${branchName} outlet.`;
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_PREFILLED = encodeURIComponent(
  "Hi Rayhan Fitness, I would like to book a free gym tour and fitness assessment."
);
export const WHATSAPP_FEMALE_PREFILLED = encodeURIComponent(
  "Hi Rayhan Fitness, I'd like to inquire about the female fitness program and dedicated hours."
);
export const PHONE_NUMBER = "+880 1736-574900";
export const PHONE_TEL = "tel:+8801736574900";
export const EMAIL = "rayhanfitnessgym@gmail.com";

export type BranchId = "lalbagh" | "dhanmondi" | "mirpur";

export interface Branch {
  id: BranchId;
  name: string;
  label: string; // Short label for pills/tabs
  address: string;
  phone: string;
  phoneTel: string;
  email: string;
  facebook: string;
  hours: {
    combined: string;
    femaleSlot: string;
  };
  features: string[];
  pricing: {
    "3months": number;
    "6months": number;
    "12months": number;
  };
  mapUrl: string; // TODO: Replace with actual Google Maps URLs
}

export const BRANCHES: Branch[] = [
  {
    id: "lalbagh",
    name: "Lalbagh Branch",
    label: "Lalbagh",
    address: "21/C, Nur Fatah Lane, 2nd Floor, Lalbagh, Dhaka - 1211",
    phone: PHONE_NUMBER,
    phoneTel: PHONE_TEL,
    email: EMAIL,
    facebook: "https://facebook.com/rayhanfitnessgym",
    hours: {
      combined: "6:00 AM – 1:00 PM | 3:00 PM – 11:30 PM",
      femaleSlot: "1:00 PM – 3:00 PM (Daily)",
    },
    features: [
      "Massive free weights section",
      "Championship-winning coach lineup",
      "Vibrant fitness community",
      "Flagship / Main Branch",
    ],
    pricing: { "3months": 1700, "6months": 3200, "12months": 5700 },
    mapUrl: "https://maps.google.com/?q=21/C+Nur+Fatah+Lane+Lalbagh+Dhaka",
  },
  {
    id: "dhanmondi",
    name: "Dhanmondi Branch",
    label: "Dhanmondi",
    address: "24/3 Taj Mahal Road, Dhanmondi, Dhaka - 1207",
    phone: PHONE_NUMBER,
    phoneTel: PHONE_TEL,
    email: EMAIL,
    facebook: "https://facebook.com/profile.php?id=61551898169968",
    hours: {
      combined: "6:00 AM – 11:30 PM",
      femaleSlot: "1:00 PM – 3:00 PM (Daily)",
    },
    features: [
      "Belt squat machines",
      "Modern biomechanics equipment",
      "Premium aesthetic ambiance",
      "Dedicated personal training pods",
    ],
    pricing: { "3months": 3450, "6months": 6300, "12months": 9800 },
    mapUrl: "https://maps.google.com/?q=24/3+Taj+Mahal+Road+Dhanmondi+Dhaka",
  },
  {
    id: "mirpur",
    name: "Mirpur Branch",
    label: "Mirpur",
    address: "Mirpur Shopping Center Complex, Lift 11, Mirpur-2, Dhaka - 1216",
    phone: PHONE_NUMBER,
    phoneTel: PHONE_TEL,
    email: EMAIL,
    facebook: "https://facebook.com/RayhanFitnessMirpur",
    hours: {
      combined: "6:00 AM – 1:00 PM | 3:00 PM – 11:30 PM",
      femaleSlot: "1:00 PM – 3:00 PM (Daily)",
    },
    features: [
      "High-rise panoramic view from Lift-11",
      "Imported international-grade machinery",
      "Certified female trainers",
      "Spacious stretching area",
    ],
    pricing: { "3months": 3500, "6months": 6000, "12months": 10000 },
    mapUrl: "https://maps.google.com/?q=Mirpur+Shopping+Center+Lift+11+Mirpur-2+Dhaka",
  },
];

export const TRUST_METRICS = [
  { num: "3", label: "Strategic Outlets", suffix: "" },
  { num: "65,000", label: "Community Members", suffix: "+" },
  { num: "100%", label: "Intl. Equipment", suffix: "" },
  { num: "15", label: "Certified Coaches", suffix: "+" },
];

export interface Review {
  name: string;
  quote: string;
  branch: BranchId;
}

export const REVIEWS: Review[] = [
  {
    name: "M J U Patwary",
    quote:
      "After Gold's Gym, Rayhan Fitness is the finest gym in BD. The equipment quality at Mirpur Lift-11 is unmatched!",
    branch: "mirpur",
  },
  {
    name: "Newaaz Andy",
    quote:
      "Super impressed with the Dhanmondi Branch. Respectful environment, top tier trainers, and enough space between sets.",
    branch: "dhanmondi",
  },
  {
    name: "Abhi Zit",
    quote:
      "5 years of my fitness journey, I've never trained anywhere else. Rayhan Fitness is like family.",
    branch: "lalbagh",
  },
];

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Can I access all 3 branches with one membership?",
    a: "Memberships are branch-specific. Contact us to inquire about multi-branch access options.",
  },
  {
    q: "How strictly are the female-only slots (1 PM - 3 PM) maintained?",
    a: "Very strictly. During female-only hours, only female members and certified female trainers are allowed on the workout floor. This policy is enforced across all 3 branches daily.",
  },
  {
    q: "Do you provide customized diet and workout charts?",
    a: "Yes! All membership tiers include a free initial body composition assessment, customized workout routine, and nutritional diet plan from our certified trainers.",
  },
  {
    q: "What are the admission fees vs monthly renewal fees?",
    a: "Our listed prices cover membership fees for 3, 6, or 12-month plans. Contact your preferred branch for admission fee details.",
  },
];

export const MEMBERSHIP_INCLUSIONS: string[] = [
  "Free initial body composition, BMI, and fitness assessment",
  "Customized workout routine chart and nutritional diet plan",
  "Full floor access during regular combined operational hours",
  "Continuous guidance from certified floor fitness instructors",
];

export const getBranch = (id: BranchId): Branch =>
  BRANCHES.find((b) => b.id === id) || BRANCHES[0];

export const formatPrice = (amount: number): string =>
  `৳${amount.toLocaleString("en-BD")}`;
