export const siteConfig = {
  name: "Rayhaan Fitness",
  nameBengali: "রায়হান ফিটনেস",
  tagline: "Unleash Your Inner Strength",
  description:
    "One of the best affordable gyms in Puran Dhaka — modern equipment, expert trainers, sauna & steam, and a welcoming community since 2016. Located at 21/c Nur Fattah Lane, Lalbag.",
  contact: {
    address: "21/c Nur Fattah Lane, Dhaka 1211",
    area: "Lalbag, Puran Dhaka",
    landmark: "Ashiyana Tower",
    phone: "02-55155028",
    hours: "Opens 6 AM daily · Closed Friday",
    rating: "4.6",
    reviews: "1,002",
  },
  navLinks: [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ],
  hero: {
    title: "Transform Your Body, Transform Your Life",
    subtitle:
      "Join Rayhaan Fitness in the heart of Lalbag, Puran Dhaka — modern equipment, expert trainers, sauna & steam, and a community that pushes you further. Budget-friendly, hygienic, and built for results.",
    cta: "Get Started Today",
    secondaryCta: "Learn More",
  },
  features: [
    {
      title: "Personal Training",
      description:
        "Friendly, expert trainers who guide you every step — from beginner to advanced.",
      icon: "BoltIcon",
    },
    {
      title: "Modern Equipment",
      description:
        "Top-of-the-line machines, free weights, and the latest gym equipment for effective workouts.",
      icon: "WrenchScrewdriverIcon",
    },
    {
      title: "Sauna & Steam",
      description:
        "Unwind after your workout with our relaxing sauna and steam facilities — a member favourite.",
      icon: "HeartIcon",
    },
    {
      title: "Community Support",
      description:
        "Train alongside motivated members in a clean, workout-friendly environment.",
      icon: "UserGroupIcon",
    },
    {
      title: "Flexible Scheduling",
      description:
        "Open daily from 6 AM (except Friday). Early mornings to late evenings, we fit your routine.",
      icon: "ClockIcon",
    },
    {
      title: "Female Friendly",
      description:
        "Dedicated 2-hour female hours plus yoga and zumba classes for our women members.",
      icon: "ChartBarIcon",
    },
  ],
  pricing: [
    {
      name: "Basic",
      price: 29,
      period: "/month",
      features: [
        "Gym access (6 AM - 10 PM)",
        "Basic equipment",
        "Locker room access",
        "Mobile app access",
      ],
    },
    {
      name: "Pro",
      price: 59,
      period: "/month",
      features: [
        "Gym access (6 AM - 10 PM)",
        "All equipment",
        "2 personal training sessions",
        "Sauna & steam access",
        "Priority support",
      ],
      popular: true,
    },
    {
      name: "Elite",
      price: 99,
      period: "/month",
      features: [
        "Everything in Pro",
        "Unlimited personal training",
        "Nutrition guide",
        "Recovery & massage",
        "Female hour & yoga access",
      ],
    },
  ],
};
