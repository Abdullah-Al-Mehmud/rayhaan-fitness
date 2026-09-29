"use client";

import { useBranch } from "@/context/BranchContext";
import { getGymTourWhatsAppUrl } from "@/data/gymData";
import { trackEvent } from "@/lib/analytics";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const { selectedBranch } = useBranch();
  const whatsAppTourUrl = getGymTourWhatsAppUrl(selectedBranch);
  const sectionRef = useRef<HTMLElement>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);
  const mobileBtnRef = useRef<HTMLAnchorElement>(null);

  const handlePrimaryCtaClick = (e: React.MouseEvent) => {
    trackEvent("cta_book_gym_tour_click", {
      location: "hero",
      branch: selectedBranch,
    });
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

        // .mobile-stat-card is animated by Framer Motion — GSAP would race it
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".gold-strip-1",
            ".gold-strip-2",
            ".hero-image-wrapper",
            ".mobile-gold-corner",
            ".hero-image-wrapper-mobile",
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

  const handleBtnHover = (ref: React.RefObject<HTMLAnchorElement | null>) => {
    if (ref.current) {
      gsap.to(ref.current, {
        boxShadow: "0 0 24px var(--gold-mid)",
        duration: 0.3,
      });
    }
  };

  const handleBtnLeave = (ref: React.RefObject<HTMLAnchorElement | null>) => {
    if (ref.current) {
      gsap.to(ref.current, { boxShadow: "none", duration: 0.3 });
    }
  };

  const headingLines = [
    { text: "Transform Your Body,", isGold: false },
    { text: "Elevate Your", isGold: false },
    { text: "LIFE", isGold: true },
  ];

  const stats = [
    { num: "3", label: "Outlets" },
    { num: "65K+", label: "Members" },
    { num: "15+", label: "Coaches" },
  ];

  return (
    <section
      ref={sectionRef}
      className="hero-section relative w-full min-h-screen flex flex-col lg:flex-row overflow-hidden bg-background-base">
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
          className="ghost-text absolute top-[20vh] lg:top-[.4em] left-0 right-0 text-center lg:text-left lg:left-80 text-[clamp(6rem,20vw,18rem)] font-black leading-none text-white/[0.08] lg:text-white/5"
          style={{
            maskImage:
              "linear-gradient(to bottom, white 0%, white 30%, transparent 65%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, white 0%, white 30%, transparent 65%)",
          }}>
          FITNESS
        </span>
      </div>

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
          🏆 NATIONAL CHAMPION TRAINERS
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
          Join over 65,000+ fitness enthusiasts across Lalbagh, Dhanmondi, and
          Mirpur. World-class imported equipment, certified trainers, and
          customized diet plans.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="relative z-10 mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a
            href="#contact"
            onClick={handlePrimaryCtaClick}
            aria-label="Book a free gym tour and fitness assessment"
            ref={primaryBtnRef}
            onMouseEnter={() => handleBtnHover(primaryBtnRef)}
            onMouseLeave={() => handleBtnLeave(primaryBtnRef)}
            className="bg-gold-mid text-text-inverse font-bold px-5 sm:px-8 py-3.5 sm:py-4 hover:bg-gold-deep active:bg-gold-deep transition-colors duration-300 rounded-sm inline-flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto text-[0.95rem] sm:text-base text-center shadow-lg shadow-gold-mid/20">
            <span className="sm:hidden">Book Free Tour</span>
            <span className="hidden sm:inline lg:hidden">
              Book Free Gym Tour
            </span>
            <span className="hidden lg:inline">Book Free Gym Tour</span>
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>

          <a
            href={whatsAppTourUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent("cta_chat_whatsapp_click", {
                location: "hero",
                branch: selectedBranch,
              })
            }
            ref={mobileBtnRef}
            onMouseEnter={() => handleBtnHover(mobileBtnRef)}
            onMouseLeave={() => handleBtnLeave(mobileBtnRef)}
            className="border border-border-default text-gold-mid px-6 sm:px-8 py-3.5 sm:py-4 hover:bg-background-overlay active:bg-background-overlay transition-colors duration-300 rounded-sm inline-flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto text-[0.95rem] sm:text-base text-center">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
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
