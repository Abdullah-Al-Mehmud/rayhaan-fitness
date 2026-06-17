"use client";

import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const primaryBtnRef = useRef<HTMLButtonElement>(null);
  const mobileBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop / large screens — full diagonal strip choreography
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

      // Mobile / tablet — lighter entrance, respects smaller viewport + perf budget
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

      // Respect reduced motion preference across all breakpoints
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

  const handleBtnHover = (ref: React.RefObject<HTMLButtonElement>) => {
    if (ref.current) {
      gsap.to(ref.current, {
        boxShadow: "0 0 24px var(--gold-mid)",
        duration: 0.3,
      });
    }
  };

  const handleBtnLeave = (ref: React.RefObject<HTMLButtonElement>) => {
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
    { num: "1200+", label: "Members" },
    { num: "15+", label: "Coaches" },
    { num: "8 Yr", label: "Experience" },
  ];

  return (
    <section
      ref={sectionRef}
      className="hero-section relative w-full min-h-screen flex flex-col lg:flex-row overflow-hidden bg-background-base">
      {/* Bottom ghost overlay — dark gradient creeping upward */}
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
      {/* ========== LEFT CONTENT PANEL (40% desktop, full width mobile) ========== */}
      <div className="relative z-10 w-full lg:w-[40%] flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:pl-36 lg:pr-12 xl:pl-44 xl:pr-16 pt-10 pb-8 lg:py-0 order-2 lg:order-1">
        {/* Bottom-left warm glow vignette */}
        <div
          className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 0% 100%, var(--gold-muted) 0%, transparent 60%)",
            opacity: 0.15,
          }}
        />

        {/* Overline label */}
        <motion.span
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 inline-flex items-center text-[0.65rem] sm:text-xs tracking-[0.3em] uppercase text-gold-mid mb-4 sm:mb-6">
          <span className="inline-block w-6 sm:w-8 h-px bg-gold-mid mr-2.5 sm:mr-3 align-middle" />
          ELITE PERFORMANCE
        </motion.span>

        {/* Main heading */}
        <div className="relative z-10">
          {headingLines.map((line, i) => (
            <motion.h1
              key={line.text}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-[2.5rem] sm:text-5xl md:text-6xl font-bold leading-[1.05] sm:leading-none ${
                line.isGold ? "text-gold-light italic" : "text-text-primary"
              }`}>
              {line.text}
            </motion.h1>
          ))}
        </div>

        {/* Body paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="relative z-10 mt-4 text-[0.95rem] sm:text-base text-text-muted max-w-sm leading-relaxed">
          Join thousands of athletes who train with purpose. Our expert coaches
          and state-of-the-art facility are built for results.
        </motion.p>

        {/* CTA buttons */}
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

        {/* Stats row — desktop/tablet inline version */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="hidden lg:relative lg:z-10 lg:mt-12 lg:flex lg:flex-row lg:gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col ${
                i > 0 ? "pl-8 border-l border-border-subtle" : ""
              }`}>
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

      {/* ========== RIGHT VISUAL PANEL — DESKTOP (60%, lg and up) ========== */}
      <div className="hidden lg:block relative w-[60%] min-h-screen overflow-hidden bg-transparent order-1 lg:order-2">
        {/* Gold-light strip — BOTTOM layer (behind image) */}
        <div className="gold-strip-2 pointer-events-none absolute inset-y-0 left-[28%] w-[55%] -skew-x-[28deg] origin-left bg-[#181511] z-0" />

        {/* Image — MIDDLE layer (above gold-light, below gold-mid) */}
        <div className="hero-image-wrapper absolute inset-0 z-10 -left-20 overflow-hidden">
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

        {/* Gold-mid strip — TOP layer (in front of image) */}
        <div className="gold-strip-1 pointer-events-none absolute inset-y-0 left-[70%] w-[100%] -skew-x-[28deg] origin-left bg-gold-mid z-20" />
      </div>

      {/* ========== VISUAL PANEL — MOBILE & TABLET (< lg) ========== */}
      <div className="lg:hidden relative w-full order-1 overflow-hidden bg-background-base">
        {/* Aspect-ratio box keeps the image well-framed across phone/tablet widths
            without relying on a hardcoded vh value that breaks on short viewports */}
        <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] overflow-hidden">
          {/* Small skewed gold accent tucked into the top-right corner —
              a scaled-down echo of the desktop strip motif, not a literal shrink */}
          <div className="mobile-gold-corner pointer-events-none absolute -top-10 -right-16 w-44 h-44 sm:w-56 sm:h-56 -skew-x-[28deg] bg-gold-mid/90 z-0" />

          <div className="hero-image-wrapper-mobile absolute inset-0 z-10">
            <Image
              src="/hero.png"
              alt="Athlete training"
              fill
              className="object-cover object-top "
              priority
            />

            {/* Bottom fade into the content panel */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, var(--bg-base) 0%, transparent 35%)",
              }}
            />
            {/* Top fade so the gold corner accent reads through softly */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 30%)",
              }}
            />
          </div>
        </div>

        {/* Floating stat card — overlaps the image/content seam.
            This is the mobile-specific signature device: instead of three
            equal-width numbers in a row (cramped on narrow screens), the
            stats become one solid card that bridges visual and content
            sections, reinforcing credibility right where the eye lands. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mobile-stat-card relative z-20 -mt-10 sm:-mt-12 mx-6 sm:mx-8 bg-background-surface border border-border-subtle rounded-sm px-5 py-4 flex items-center justify-between shadow-lg">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center flex-1 ${
                i > 0 ? "border-l border-border-subtle" : ""
              }`}>
              <span className="text-gold-light text-xl sm:text-2xl font-bold leading-tight">
                {stat.num}
              </span>
              <span className="text-text-muted text-[0.6rem] sm:text-xs uppercase tracking-wider mt-0.5">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Gold accent bar at very top of the visual panel */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gold-mid z-20" />
      </div>
    </section>
  );
}
