"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const NAV_ITEMS = ["Home", "About", "Packages", "Review", "Contact"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");

  const scrollToSection = (item: string) => {
    const id = item.toLowerCase();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActiveNav(item);
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
            // Solid, fully opaque color — no alpha channel, so nothing
            // underneath (hero buttons, stats, images) can ever bleed
            // through the overlay, even at 1% on some mobile GPUs.
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

            <nav className="absolute inset-0 flex flex-col justify-center pl-10 gap-1">
              <span
                className="text-[0.6rem] tracking-[0.35em] uppercase mb-6"
                style={{ color: "var(--gold-mid)", opacity: 0.7 }}>
                Navigation
              </span>
              {NAV_ITEMS.map((item, i) => (
                <button
                  key={item}
                  onClick={() => {
                    scrollToSection(item);
                    setMobileMenuOpen(false);
                  }}
                  className="group text-left relative w-fit ">
                  <span
                    className="absolute -left-6 top-1/2 -translate-y-1/2 text-[0.6rem] font-mono"
                    style={{ color: "var(--gold-mid)", opacity: 0.5 }}>
                    0{i + 1}
                  </span>
                  <span
                    className={`block text-[2.6rem] sm:text-[3.2rem] font-bold leading-tight tracking-tight transition-colors duration-200 ${
                      activeNav === item
                        ? "text-transparent bg-clip-text"
                        : "text-text-primary group-hover:text-transparent group-hover:bg-clip-text"
                    }`}
                    style={{
                      WebkitTextStroke:
                        activeNav === item
                          ? "0px"
                          : "1px rgba(255,255,255,0.15)",
                      backgroundImage:
                        "linear-gradient(135deg, var(--gold-light) 0%, var(--gold-mid) 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}>
                    {item}
                  </span>
                  {activeNav === item && (
                    <div
                      className="h-px w-full mt-0.5"
                      style={{ background: "var(--gold-mid)" }}
                    />
                  )}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[999] px-4 sm:px-6 lg:px-[180px] transition-all duration-300 ${
          scrolled ? "bg-background-base/90 backdrop-blur-md shadow-lg" : ""
        }`}>
        <div className="grid grid-cols-2 md:grid-cols-3 items-center py-4 lg:py-5 px-5 md:px-0">
          <Image
            src="/logo.png"
            alt="Rayhaan Fitness"
            width={80}
            height={26}
            className="object-contain justify-self-start w-[70px] h-auto"
            priority
          />

          <nav className="hidden lg:flex justify-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`px-3 text-[0.8rem] font-bold tracking-[0.2em] uppercase transition-colors cursor-pointer duration-200 ${
                  activeNav === item
                    ? "text-gold-mid"
                    : "text-text-primary/60 hover:text-gold-mid"
                }`}>
                {item}
              </button>
            ))}
          </nav>

          <div className="justify-self-end flex items-center">
            <button className="hidden lg:inline-flex bg-gold-mid text-text-inverse font-semibold text-[0.7rem] tracking-wider uppercase px-5 py-2.5 rounded-sm hover:bg-gold-deep transition-colors duration-300">
              Buy Package
            </button>

            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className="relative lg:hidden z-[999] flex items-center justify-center w-10 h-10 ml-auto -mr-4 sm:-mr-6">
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
