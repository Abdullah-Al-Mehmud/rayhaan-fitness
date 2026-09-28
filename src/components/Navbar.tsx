"use client";

import { BranchSelector } from "@/components/BranchSelector";
import { useBranch } from "@/context/BranchContext";
import { getGymTourWhatsAppUrl } from "@/data/gymData";
import { trackEvent } from "@/lib/analytics";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface NavItem {
  label: string;
  desktopLabel: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", desktopLabel: "Home", id: "hero" },
  { label: "Outlets & Facilities", desktopLabel: "Outlets", id: "outlets" },
  { label: "Pricing & Offers", desktopLabel: "Pricing", id: "packages" },
  {
    label: "Female Fitness",
    desktopLabel: "Female Fitness",
    id: "female-fitness",
  },
  { label: "Trainers & Coaches", desktopLabel: "Trainers", id: "about" },
  { label: "Contact Us", desktopLabel: "Contact", id: "contact" },
];

export function Navbar() {
  const { selectedBranch } = useBranch();
  const whatsAppTourUrl = getGymTourWhatsAppUrl(selectedBranch);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("hero");

  const handleBookTourClick = (e: React.MouseEvent, location: string) => {
    trackEvent("cta_book_gym_tour_click", { location, branch: selectedBranch });
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      e.preventDefault();
      contactEl.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(
        new CustomEvent("set_contact_intent", {
          detail: {
            goal: "Free Gym Tour & Fitness Assessment",
            branch: selectedBranch,
          },
        }),
      );
    } else {
      window.open(whatsAppTourUrl, "_blank", "noopener,noreferrer");
    }
  };

  const scrollToSection = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setActiveNav(id);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 z-[99999] isolate"
            style={{ backgroundColor: "#0a0806" }}>
            <div
              className="absolute -top-20 -right-24 w-64 h-[110vh] -skew-x-[20deg] pointer-events-none"
              style={{
                background: "var(--gold-mid)",
                opacity: 0.18,
              }}
            />
            <div
              className="absolute -top-20 -right-8 w-20 h-[110vh] -skew-x-[20deg] pointer-events-none"
              style={{
                background: "var(--gold-mid)",
                opacity: 0.55,
              }}
            />

            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="absolute top-6 right-6 z-10 flex items-center justify-center w-10 h-10">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                className="w-6 h-6">
                <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>

            <nav className="absolute inset-0 flex flex-col justify-center pl-8 sm:pl-12 pr-6 gap-2">
              <span
                className="text-[0.6rem] tracking-[0.35em] uppercase mb-4"
                style={{ color: "var(--gold-mid)", opacity: 0.7 }}>
                Navigation
              </span>
              {NAV_ITEMS.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className="group text-left relative w-fit">
                  <span
                    className="absolute -left-6 top-1/2 -translate-y-1/2 text-[0.6rem] font-mono"
                    style={{ color: "var(--gold-mid)", opacity: 0.5 }}>
                    0{i + 1}
                  </span>
                  <span
                    className={`block text-[1.8rem] sm:text-[2.6rem] font-bold leading-tight tracking-tight transition-colors duration-200 ${
                      activeNav === item.id
                        ? "text-transparent bg-clip-text"
                        : "text-text-primary group-hover:text-transparent group-hover:bg-clip-text"
                    }`}
                    style={{
                      WebkitTextStroke:
                        activeNav === item.id
                          ? "0px"
                          : "1px rgba(255,255,255,0.15)",
                      backgroundImage:
                        "linear-gradient(135deg, var(--gold-light) 0%, var(--gold-mid) 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}>
                    {item.label}
                  </span>
                  {activeNav === item.id && (
                    <div
                      className="h-px w-full mt-0.5"
                      style={{ background: "var(--gold-mid)" }}
                    />
                  )}
                </button>
              ))}

              <div className="mt-6 flex flex-col gap-4">
                <span className="text-[0.6rem] tracking-[0.2em] uppercase text-text-muted">
                  Select Outlet Branch:
                </span>
                <BranchSelector compact />

                <a
                  href="#contact"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleBookTourClick(e, "navbar_mobile_menu");
                  }}
                  aria-label="Book a free gym tour and fitness assessment"
                  className="mt-2 text-center bg-gold-mid text-text-inverse font-bold text-[0.8rem] tracking-wider uppercase py-3.5 px-4 rounded-sm shadow-md active:bg-gold-deep transition-colors">
                  Book Free Gym Tour
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[999] px-4 sm:px-6 lg:px-8 xl:px-16 transition-all duration-300 ${
          scrolled
            ? "bg-background-base/95 backdrop-blur-md shadow-lg"
            : "bg-gradient-to-b from-black/80 to-transparent"
        }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 lg:py-5">
          <div
            className="cursor-pointer"
            onClick={() => scrollToSection("hero")}>
            <Image
              src="/logo.png"
              alt="Rayhan Fitness"
              width={80}
              height={26}
              className="object-contain w-[72px] h-auto"
              priority
            />
          </div>

          <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-[0.75rem] xl:text-[0.8rem] font-bold tracking-[0.15em] uppercase transition-colors cursor-pointer duration-200 ${
                  activeNav === item.id
                    ? "text-gold-mid"
                    : "text-text-primary/70 hover:text-gold-mid"
                }`}>
                {item.desktopLabel}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden xl:block">
              <BranchSelector compact />
            </div>

            <a
              href="#contact"
              onClick={(e) => handleBookTourClick(e, "navbar")}
              aria-label="Book a free gym tour and fitness assessment"
              className="hidden lg:inline-flex bg-gold-mid text-text-inverse font-bold text-[0.7rem] xl:text-[0.75rem] tracking-wider uppercase px-4 xl:px-5 py-2.5 rounded-sm hover:bg-gold-deep active:bg-gold-deep transition-colors duration-300 shadow-md">
              <span className="hidden xl:inline">Book Free Gym Tour</span>
              <span className="xl:hidden">Book Free Gym Tour</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className="relative lg:hidden z-[999] flex items-center justify-center w-10 h-10 ml-auto -mr-2">
              <span
                className={`absolute flex flex-col justify-center items-end gap-[5px] transition-all duration-300 ${
                  mobileMenuOpen
                    ? "opacity-0 scale-75 rotate-90 pointer-events-none"
                    : "opacity-100 scale-100 rotate-0"
                }`}>
                <span className="block h-[1.5px] w-7 bg-white" />
                <span className="block h-[1.5px] w-7 bg-white" />
                <span className="block h-[1.5px] w-7 bg-white" />
              </span>
              <span
                className={`absolute flex items-center justify-center transition-all duration-300 ${
                  mobileMenuOpen
                    ? "opacity-100 scale-100 rotate-0"
                    : "opacity-0 scale-75 -rotate-90 pointer-events-none"
                }`}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="w-6 h-6">
                  <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
