export const siteConfig = {
  name: "Rayhaan Fitness",
  tagline: "Unleash Your Inner Strength",
  description:
    "Expert coaching, modern equipment, and a community that pushes you further. Transform your body and mind with Rayhaan Fitness.",
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
      "Join Rayhaan Fitness and unlock your full potential with personalized training programs, state-of-the-art equipment, and a supportive community.",
    cta: "Get Started Today",
    secondaryCta: "Learn More",
  },
  features: [
    {
      title: "Personal Training",
      description:
        "One-on-one coaching tailored to your goals, fitness level, and schedule.",
      icon: "BoltIcon",
    },
    {
      title: "Modern Equipment",
      description:
        "Top-of-the-line machines and free weights for the most effective workouts.",
      icon: "WrenchScrewdriverIcon",
    },
    {
      title: "Nutrition Guidance",
      description:
        "Custom meal plans and nutrition coaching to fuel your progress.",
      icon: "HeartIcon",
    },
    {
      title: "Community Support",
      description:
        "Train alongside motivated members who push you to be your best.",
      icon: "UserGroupIcon",
    },
    {
      title: "Flexible Scheduling",
      description:
        "Open 24/7 with bookable sessions that fit your busy lifestyle.",
      icon: "ClockIcon",
    },
    {
      title: "Progress Tracking",
      description:
        "Track every rep, set, and milestone with our digital platform.",
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
        "24/7 gym access",
        "All equipment",
        "2 personal training sessions",
        "Nutrition guide",
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
        "Custom meal plans",
        "Recovery & massage",
        "Exclusive events",
      ],
    },
  ],
};
