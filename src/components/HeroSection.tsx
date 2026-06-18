"use client";

import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "./Navbar";

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = ["Home", "About Us", "Services", "Packages"];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const primaryBtnRef = useRef<HTMLButtonElement>(null);
  const mobileBtnRef = useRef<HTMLButtonElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        gsap.from(".gold-strip-1", {
          xPercent: 100,
          duration: 1.0,
          ease: "power3.out",
          delay: 0.2,
        });

        gsap.from(".gold-strip-2", {
          xPercent: 100,
          duration: 1.1,
          ease: "power3.out",
          delay: 0.35,
        });

        gsap.from(".hero-image-wrapper", {
          scale: 1.08,
          opacity: 0,
          duration: 1.4,
          ease: "power2.out",
          delay: 0.4,
        });
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.from(".mobile-gold-corner", {
          scale: 0.6,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          delay: 0.15,
        });

        gsap.from(".hero-image-wrapper-mobile", {
          opacity: 0,
          scale: 1.04,
          duration: 1.1,
          ease: "power2.out",
        });

        gsap.from(".mobile-stat-card", {
          y: 24,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.5,
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".gold-strip-1",
            ".gold-strip-2",
            ".hero-image-wrapper",
            ".mobile-gold-corner",
            ".hero-image-wrapper-mobile",
            ".mobile-stat-card",
          ],
          { clearProps: "all" },
        );
      });

      gsap.from(".ghost-text", {
        opacity: 0,
        yPercent: 10,
        duration: 1.6,
        ease: "power2.out",
        delay: 0.3,
      });

      gsap.to(".ghost-text", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleBtnHover = (ref: React.RefObject<HTMLButtonElement | null>) => {
    if (ref.current) {
      gsap.to(ref.current, {
        boxShadow: "0 0 24px var(--gold-mid)",
        duration: 0.3,
      });
    }
  };

  const handleBtnLeave = (ref: React.RefObject<HTMLButtonElement | null>) => {
    if (ref.current) {
      gsap.to(ref.current, { boxShadow: "none", duration: 0.3 });
    }
  };

  const headingLines = [
    { text: "Transform Your", isGold: false },
    { text: "Body &", isGold: false },
    { text: "MINDSET", isGold: true },
  ];

  const stats = [
    { num: "4.6 ★", label: "Rating" },
    { num: "1K+", label: "Reviews" },
    { num: "15+", label: "Coaches" },
  ];

  return (
    <section
      ref={sectionRef}
      className="hero-section relative w-full min-h-screen flex flex-col lg:flex-row overflow-hidden bg-background-base">
      {/* ── MOBILE FULL-SCREEN MENU OVERLAY ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 z-[200] overflow-hidden"
            style={{ background: "rgba(10,8,6,0.97)" }}>
            {/* Diagonal gold slash — mirrors strip motif */}
            <div
              className="absolute -top-20 -right-24 w-64 h-[110vh] -skew-x-[20deg] pointer-events-none"
              style={{ background: "var(--gold-mid)", opacity: 0.18 }}
            />
            <div
              className="absolute -top-20 -right-8 w-20 h-[110vh] -skew-x-[20deg] pointer-events-none"
              style={{ background: "var(--gold-mid)", opacity: 0.55 }}
            />

            {/* Close button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="absolute top-5 right-6 z-10 w-10 h-10 flex items-center justify-center text-text-primary hover:text-gold-mid transition-colors duration-200">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-7 h-7">
                <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>

            {/* Logo inside menu */}
            <div className="absolute top-5 left-6">
              <Image
                src="/logo.png"
                alt="Rayhaan Fitness"
                width={120}
                height={38}
                className="object-contain"
                priority
              />
            </div>

            {/* Nav links */}
            <nav className="absolute inset-0 flex flex-col justify-center pl-10 gap-1">
              <span
                className="text-[0.6rem] tracking-[0.35em] uppercase mb-6"
                style={{ color: "var(--gold-mid)", opacity: 0.7 }}>
                Navigation
              </span>
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, delay: 0.08 * i }}
                  onClick={() => {
                    setActiveNav(item);
                    setMobileMenuOpen(false);
                  }}
                  className="group text-left relative w-fit">
                  {/* Index number */}
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
                    {activeNav === item ? item : item}
                  </span>
                  {/* Active underline */}
                  {activeNav === item && (
                    <motion.div
                      layoutId="mobile-nav-indicator"
                      className="h-px w-full mt-0.5"
                      style={{ background: "var(--gold-mid)" }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>

            {/* Bottom social / CTA hint */}
            <div className="absolute bottom-10 left-10 right-20 flex items-center justify-between">
              <span className="text-text-muted text-xs tracking-widest uppercase">
                Rayhaan Fitness
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-semibold px-5 py-2.5 rounded-sm"
                style={{
                  background: "var(--gold-mid)",
                  color: "var(--text-inverse)",
                }}>
                Start Training →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── BOTTOM GRADIENT OVERLAYS ── */}
      <div
        className="absolute inset-x-0 bottom-0 w-full h-1/2 pointer-events-none z-40"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)",
        }}
      />
      <div
        className="hidden lg:block absolute inset-x-0 bottom-0 w-full h-3/5 pointer-events-none z-40"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)",
        }}
      />

      {/* ── GHOST TEXT ── */}
      <div
        className="absolute z-30 inset-0 overflow-hidden pointer-events-none select-none"
        aria-hidden="true">
        <span
          className="ghost-text absolute top-[.4em] left-0 right-0 text-center lg:text-left lg:left-80 text-[clamp(6rem,20vw,18rem)] font-black leading-none text-white/5"
          style={{
            maskImage:
              "linear-gradient(to bottom, white 0%, white 20%, transparent 55%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, white 0%, white 20%, transparent 55%)",
          }}>
          FITNESS
        </span>
      </div>

      <Navbar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        setMobileMenuOpen={setMobileMenuOpen}
        navItems={NAV_ITEMS}
      />

      {/* ========== LEFT CONTENT PANEL ========== */}
      <div className="relative z-10 w-full lg:w-[40%] flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:pl-36 lg:pr-12 xl:pl-44 xl:pr-16 pt-10 pb-8 lg:pb-0 lg:pt-32 order-2 lg:order-1">
        <div
          className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 0% 100%, var(--gold-muted) 0%, transparent 60%)",
            opacity: 0.15,
          }}
        />

        <motion.span
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 inline-flex items-center text-[0.65rem] sm:text-xs tracking-[0.3em] uppercase text-gold-mid mb-4 sm:mb-6">
          <span className="inline-block w-6 sm:w-8 h-px bg-gold-mid mr-2.5 sm:mr-3 align-middle" />
          ELITE PERFORMANCE
        </motion.span>

        <div className="relative z-10">
          {headingLines.map((line, i) => (
            <motion.h1
              key={line.text}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.15 }}
              className={`text-[2.5rem] sm:text-5xl md:text-6xl font-bold leading-[1.05] sm:leading-none ${
                line.isGold ? "text-gold-light italic" : "text-text-primary"
              }`}>
              {line.text}
            </motion.h1>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="relative z-10 mt-4 text-[0.95rem] sm:text-base text-text-muted max-w-sm leading-relaxed">
          Join 1,000+ members at our Lalbag facility. Expert coaches, modern
          equipment, sauna & steam — built for real results.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="relative z-10 mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            ref={primaryBtnRef}
            onMouseEnter={() => handleBtnHover(primaryBtnRef)}
            onMouseLeave={() => handleBtnLeave(primaryBtnRef)}
            className="bg-gold-mid text-text-inverse font-semibold px-6 sm:px-8 py-3.5 sm:py-4 hover:bg-gold-deep active:bg-gold-deep transition-colors duration-300 rounded-sm inline-flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto text-[0.95rem] sm:text-base">
            Start Training
            <span className="inline-block">→</span>
          </button>

          <button
            ref={mobileBtnRef}
            onMouseEnter={() => handleBtnHover(mobileBtnRef)}
            onMouseLeave={() => handleBtnLeave(mobileBtnRef)}
            className="border border-border-default text-gold-mid px-6 sm:px-8 py-3.5 sm:py-4 hover:bg-background-overlay active:bg-background-overlay transition-colors duration-300 rounded-sm inline-flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto text-[0.95rem] sm:text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 shrink-0">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch Story
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="hidden lg:relative lg:z-10 lg:mt-12 lg:flex lg:flex-row lg:gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col ${i > 0 ? "pl-8 border-l border-border-subtle" : ""}`}>
              <span className="text-gold-light text-2xl font-bold">
                {stat.num}
              </span>
              <span className="text-text-muted text-xs uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ========== RIGHT VISUAL PANEL — DESKTOP ========== */}
      <div className="hidden lg:block relative w-[60%] min-h-screen overflow-hidden  order-1 lg:order-2">
        {/* Gold-light strip (bottom layer) */}
        <div className="gold-strip-2 pointer-events-none absolute inset-y-0 left-[28%] w-[55%] -skew-x-[28deg] origin-left bg-[#181511] z-0" />

        {/* Hero image (middle layer) */}
        <div className="hero-image-wrapper absolute inset-0 z-40 -left-20 overflow-hidden">
          <Image
            src="/hero.png"
            alt="Elite athlete"
            fill
            className="object-contain object-bottom"
            priority
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, var(--bg-base) 0%, transparent 25%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, var(--bg-base) 0%, transparent 20%)",
            }}
          />
        </div>

        {/* ── GOLD STRIP (decorative, top layer) ── */}
        <div className="gold-strip-1 pointer-events-none absolute inset-y-0 left-[70%] w-[100%] -skew-x-[28deg] origin-left bg-[#af8a38] z-50" />
      </div>

      {/* ========== VISUAL PANEL — MOBILE & TABLET ========== */}
      <div className="lg:hidden relative w-full order-1 overflow-hidden bg-background-base">
        <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] overflow-hidden">
          <div className="mobile-gold-corner pointer-events-none absolute -top-10 -right-16 w-44 h-44 sm:w-56 sm:h-56 -skew-x-[28deg] bg-gold-mid/90 z-0" />

          <div className="hero-image-wrapper-mobile absolute inset-0 z-40">
            <Image
              src="/hero.png"
              alt="Athlete training"
              fill
              className="object-cover object-top"
              priority
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, var(--bg-base) 0%, transparent 35%)",
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 30%)",
              }}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mobile-stat-card relative z-50 -mt-10 sm:-mt-12 mx-4 sm:mx-8 bg-background-surface border border-border-subtle rounded-sm px-4 sm:px-5 py-4 flex items-center justify-between shadow-lg">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center flex-1 ${i > 0 ? "border-l border-border-subtle" : ""}`}>
              <span className="text-gold-light text-xl sm:text-2xl font-bold leading-tight">
                {stat.num}
              </span>
              <span className="text-text-muted text-[0.6rem] sm:text-xs uppercase tracking-wider mt-0.5">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Gold accent bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gold-mid z-50" />
      </div>
    </section>
  );
}
